'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Rendu Markdown pour les réponses des agents HQ
 * (titres, gras, listes, tableaux, code) stylé Flow.
 */
export function HqMarkdown({ content }: { content: string }) {
  return (
    <div className="hq-markdown text-sm leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-headline text-base font-bold mt-3 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-headline text-base font-bold mt-3 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-headline text-sm font-bold mt-3 first:mt-0 text-primary-fixed">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-label text-xs font-bold uppercase tracking-wide mt-2 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="my-1.5">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc pl-5 my-1.5 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 my-1.5 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="marker:text-primary-container">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary-container/50 pl-3 my-2 text-on-surface-variant italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-outline-variant/30 my-3" />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-primary-fixed underline underline-offset-2"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className) || String(children).includes('\n')
            return isBlock ? (
              <code className="block bg-surface-container-highest/80 rounded-lg p-3 my-2 text-xs overflow-x-auto whitespace-pre">
                {children}
              </code>
            ) : (
              <code className="bg-surface-container-highest/80 rounded px-1.5 py-0.5 text-xs">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <pre className="my-2">{children}</pre>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-2">
              <table className="w-full text-xs border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-outline-variant/30 px-2 py-1.5 text-left font-label bg-surface-container-high">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-outline-variant/30 px-2 py-1.5 align-top">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
