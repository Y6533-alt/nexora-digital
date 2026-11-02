export const VERTEX_SHADER = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

/** Raymarched twisted ribbon around a glowing core, shaded with an iridescent violet to blue palette. */
export const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uCenter;
uniform float uScale;
uniform float uScroll;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
  float t = uTime;
  p.xz *= rot(t * 0.14 + uMouse.x * 0.7 + uScroll * 1.6);
  p.xy *= rot(0.5 + t * 0.09 + uMouse.y * 0.5);

  float a = atan(p.z, p.x);
  vec2 q = vec2(length(p.xz) - 1.08, p.y);
  q *= rot(a * 1.5 + t * 0.3);
  float ribbon = length(max(abs(q) - vec2(0.44, 0.075), 0.0)) - 0.055;

  float core = length(p) - 0.36 - 0.05 * sin(t * 1.3);
  float d = smin(ribbon, core, 0.12);
  d += 0.035 * sin(p.x * 4.0 + t) * sin(p.y * 4.4 - t * 0.7) * sin(p.z * 4.0 + t * 0.5);
  return d * 0.68;
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.003, -0.003);
  return normalize(
    e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) +
    e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx)
  );
}

vec3 palette(float x) {
  vec3 violet = vec3(0.50, 0.24, 0.98);
  vec3 blue = vec3(0.13, 0.40, 0.98);
  vec3 cyan = vec3(0.25, 0.80, 1.00);
  float w = 0.5 + 0.5 * sin(x * 6.283);
  return w < 0.5 ? mix(violet, blue, w * 2.0) : mix(blue, cyan, (w - 0.5) * 2.0);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - uRes) / uRes.y;
  uv = (uv - uCenter) / uScale;

  vec3 ro = vec3(0.0, 0.0, 4.2);
  vec3 rd = normalize(vec3(uv, -2.0));

  // Skip pixels whose ray misses the bounding sphere entirely.
  float b = dot(ro, rd);
  float disc = b * b - dot(ro, ro) + 3.6;
  if (disc < 0.0) { gl_FragColor = vec4(0.0); return; }

  float s = max(-b - sqrt(disc), 0.0);
  float end = -b + sqrt(disc);
  float glow = 0.0;
  bool hit = false;
  vec3 p = ro;
  for (int i = 0; i < 56; i++) {
    p = ro + rd * s;
    float d = map(p);
    glow += exp(-max(d, 0.0) * 9.0) * 0.022;
    if (d < 0.0015) { hit = true; break; }
    s += d;
    if (s > end) break;
  }

  vec3 glowCol = palette(uTime * 0.03 + uv.y * 0.25 + 0.2) * glow;
  vec3 col = glowCol;
  float alpha = clamp(glow * 0.9, 0.0, 1.0);

  if (hit) {
    vec3 n = normalAt(p);
    vec3 v = -rd;
    vec3 l1 = normalize(vec3(-0.5, 0.8, 0.6));
    vec3 l2 = normalize(vec3(0.8, -0.35, 0.5));
    float diff = max(dot(n, l1), 0.0);
    float spec = pow(max(dot(reflect(-l1, n), v), 0.0), 42.0);
    float spec2 = pow(max(dot(reflect(-l2, n), v), 0.0), 18.0);
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.6);
    vec3 irid = palette(dot(n, v) * 1.1 + p.y * 0.22 + uTime * 0.04);

    col = irid * (0.10 + 0.55 * diff);
    col += irid * fres * 1.25;
    col += vec3(0.85, 0.92, 1.0) * spec * 0.9;
    col += vec3(0.35, 0.65, 1.0) * spec2 * 0.35;
    col += glowCol * 0.5;
    alpha = 1.0;
  }

  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  // Premultiplied output: the glow adds light over the page instead of covering it.
  gl_FragColor = vec4(col, alpha);
}
`
