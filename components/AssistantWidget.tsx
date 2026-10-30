'use client'

import { MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useI18n } from './LocaleProvider'

type Turn = { role: 'user' | 'assistant'; content: string }

const TEXT = {
  fr: {
    open: "Poser une question à l'assistant",
    close: "Fermer l'assistant",
    title: 'Assistant Flow',
    badge: 'IA',
    disclosure:
      "Vous échangez avec une intelligence artificielle. Elle peut se tromper : pour un devis ou un engagement, Adams vous répond personnellement.",
    welcome:
      "Bonjour ! Je suis l'assistant IA de Flow. Dites-moi ce que vous aimeriez améliorer dans votre activité (site, réservations, devis, outils internes…) et je vous oriente.",
    placeholder: 'Votre question…',
    send: 'Envoyer',
    error: "L'assistant n'est pas disponible pour le moment. Écrivez-nous via le formulaire de contact.",
    limited: 'Vous avez atteint la limite de messages pour la démo. Le formulaire de contact reste ouvert !',
    tooLong: 'La conversation est longue : pour aller plus loin, le formulaire de contact est le meilleur canal.',
  },
  en: {
    open: 'Ask the assistant a question',
    close: 'Close the assistant',
    title: 'Flow assistant',
    badge: 'AI',
    disclosure:
      'You are chatting with an AI. It can make mistakes: for a quote or any commitment, Adams answers you personally.',
    welcome:
      "Hello! I'm Flow's AI assistant. Tell me what you would like to improve in your business (website, bookings, quotes, internal tools…) and I'll point you in the right direction.",
    placeholder: 'Your question…',
    send: 'Send',
    error: 'The assistant is unavailable right now. Please write to us through the contact form.',
    limited: 'You have reached the message limit for this demo. The contact form is still open!',
    tooLong: 'This conversation is getting long: the contact form is the best way to go further.',
  },
} as const

const MAX_TURNS = 12

export function AssistantWidget() {
  const { locale } = useI18n()
  const t = TEXT[locale === 'en' ? 'en' : 'fr']
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [turns, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(event?: FormEvent) {
    event?.preventDefault()
    const text = input.trim().slice(0, 1000)
    if (!text || busy) return
    if (turns.length + 1 > MAX_TURNS) {
      setNotice(t.tooLong)
      return
    }

    const history: Turn[] = [...turns, { role: 'user', content: text }]
    setTurns([...history, { role: 'assistant', content: '' }])
    setInput('')
    setBusy(true)
    setNotice(null)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, locale }),
      })
      if (!res.ok || !res.body) {
        throw new Error(res.status === 429 ? 'limited' : 'error')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        setTurns([...history, { role: 'assistant', content: answer }])
      }
      if (!answer.trim()) throw new Error('error')
    } catch (error) {
      // On retire la réponse vide et on garde la question, pour que le visiteur puisse réessayer.
      setTurns(history.slice(0, -1))
      setInput(text)
      setNotice(error instanceof Error && error.message === 'limited' ? t.limited : t.error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-body">
      {open && (
        <section
          role="dialog"
          aria-label={t.title}
          className="mb-3 flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-outline-variant/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-headline text-base font-bold text-on-surface">{t.title}</span>
              <span className="rounded-full bg-primary/15 px-2 py-0.5 font-label text-[11px] font-semibold tracking-wide text-primary">
                {t.badge}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:text-primary"
              aria-label={t.close}
            >
              <X size={18} />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            <p className="rounded-lg bg-surface-container px-3 py-2 text-xs leading-relaxed text-on-surface-variant">
              {t.disclosure}
            </p>
            <Bubble role="assistant" content={t.welcome} />
            {turns.map((turn, i) => (
              <Bubble key={i} role={turn.role} content={turn.content} pending={busy && i === turns.length - 1} />
            ))}
            {notice && <p className="text-center text-xs text-on-surface-variant">{notice}</p>}
          </div>

          <form onSubmit={send} className="flex items-end gap-2 border-t border-outline-variant/20 p-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void send()
                }
              }}
              rows={1}
              maxLength={1000}
              placeholder={t.placeholder}
              className="max-h-28 flex-1 resize-none rounded-lg border border-outline-variant/30 bg-background px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-fixed text-on-primary transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label={t.send}
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-fixed text-on-primary shadow-xl transition-transform hover:scale-105"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}

function Bubble({ role, content, pending = false }: Turn & { pending?: boolean }) {
  const mine = role === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          mine ? 'rounded-br-md bg-primary text-on-primary' : 'rounded-bl-md bg-surface-container text-on-surface'
        }`}
      >
        {content || (pending ? '…' : '')}
      </p>
    </div>
  )
}
