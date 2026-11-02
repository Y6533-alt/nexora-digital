import { channels } from '../data/content'

function Row() {
  return (
    <>
      {channels.map((channel) => (
        <span key={channel} className="flex items-center">
          <span className="px-7 font-display text-2xl font-bold whitespace-nowrap text-fg-soft/80 lg:text-3xl">{channel}</span>
          <span className="size-1.5 rounded-full bg-gradient-to-br from-cyan to-violet" />
        </span>
      ))}
    </>
  )
}

export function ChannelMarquee() {
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  )
}
