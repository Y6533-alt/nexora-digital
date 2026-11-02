import { useEffect, useRef, useState } from 'react'
import { FRAGMENT_SHADER, VERTEX_SHADER } from './heroShader'

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Hero shader failed to compile:', gl.getShaderInfoLog(shader))
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

/**
 * Hero 3D background, written directly in WebGL so the page does not carry a 3D library.
 * It pauses off screen, lowers its resolution on slow devices, draws one still frame for
 * reduced motion, and falls back to a CSS gradient when WebGL is unavailable.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })
    const program = gl && createProgram(gl)
    if (!gl || !program) {
      setFailed(true)
      return
    }

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.clearColor(0, 0, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      center: gl.getUniformLocation(program, 'uCenter'),
      scale: gl.getUniformLocation(program, 'uScale'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let quality = Math.min(window.devicePixelRatio || 1, 1.5) * (window.innerWidth < 768 ? 0.6 : 0.75)
    let visible = true
    let raf = 0
    let last = 0
    let slowFrames = 0
    let time = 8
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * quality))
      const h = Math.max(1, Math.round(canvas.clientHeight * quality))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      // Object sits on the text-free side on wide screens, above the headline on narrow ones.
      const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight)
      if (aspect > 1.15) {
        gl.uniform2f(u.center, -aspect * 0.5, 0.04)
        gl.uniform1f(u.scale, Math.min(0.95, aspect * 0.52))
      } else {
        gl.uniform2f(u.center, 0, 0.56)
        gl.uniform1f(u.scale, Math.min(0.72, aspect * 1.05))
      }
    }

    const draw = () => {
      resize()
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, time)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.uniform1f(u.scroll, Math.min(window.scrollY / Math.max(1, window.innerHeight), 1.5))
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = last ? now - last : 16
      last = now
      time += Math.min(dt, 50) / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      // Drop resolution rather than frame rate when the device struggles.
      slowFrames = dt > 30 ? slowFrames + 1 : Math.max(0, slowFrames - 1)
      if (slowFrames > 24 && quality > 0.4) {
        quality *= 0.8
        slowFrames = 0
      }

      draw()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (reduced || raf || !visible || document.hidden) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onVisibility = () => start()
    const onResize = () => {
      if (reduced) draw()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })

    const onContextLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      raf = 0
      setFailed(true)
    }

    canvas.addEventListener('webglcontextlost', onContextLost)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    observer.observe(canvas)

    draw()
    setReady(true)
    start()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (failed) return <div className="hero-fallback absolute inset-0" aria-hidden="true" />

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 size-full transition-opacity duration-[1400ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
