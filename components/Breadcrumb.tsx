import Link from 'next/link'

export function Breadcrumb({
  label,
  items,
}: {
  label: string
  items: { name: string; href?: string }[]
}) {
  return (
    <nav aria-label={label} className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-sm text-on-surface-variant">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-outline">
                  /
                </span>
              )}
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className={last ? 'text-on-surface' : undefined} aria-current={last ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
