const SRC = {
  cyan: '/brand/flow-mark.png',
  ink: '/brand/flow-mark-ink.png',
  ombre: '/brand/flow-mark-ombre.png',
} as const

export function FlowMark({
  tone = 'cyan',
  className = 'h-24 w-24',
  alt = '',
}: {
  tone?: keyof typeof SRC
  className?: string
  alt?: string
}) {
  return <img src={SRC[tone]} alt={alt} className={`object-contain ${className}`} />
}
