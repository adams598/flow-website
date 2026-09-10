'use client'

import { FormEvent, useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp } from './AnimationWrappers'
import { SITE } from '@/lib/site'

const productOptions = [
  'Site web',
  'Application métier',
  'Plateforme',
  'E-commerce',
  'Je ne sais pas encore',
]

const stageOptions = [
  'Simple idée',
  'Projet défini',
  'Cahier des charges existant',
  'Solution existante à améliorer',
]

const budgetOptions = [
  '< 2 000 €',
  '2 000 – 5 000 €',
  '5 000 – 10 000 €',
  '10 000 – 20 000 €',
  '20 000 €+',
]

const timelineOptions = [
  'Dès que possible',
  'Dans 1–3 mois',
  'Dans 3–6 mois',
  'Plus tard',
]

type FormState = {
  product: string
  need: string
  stage: string
  budget: string
  timeline: string
  name: string
  email: string
  phone: string
}

const initialState: FormState = {
  product: '',
  need: '',
  stage: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`text-left rounded-xl border px-4 py-3.5 font-body text-sm transition-colors ${
              selected
                ? 'border-primary-container bg-primary-container/10 text-on-surface'
                : 'border-outline-variant/15 bg-surface-container-low text-on-surface-variant hover:border-primary/30'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export const ProjectForm = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [sent, setSent] = useState(false)

  const steps = [
    {
      title: 'Que souhaitez-vous construire ?',
      valid: Boolean(form.product),
    },
    {
      title: 'Quel est votre besoin ?',
      valid: form.need.trim().length > 10,
    },
    {
      title: 'Où en êtes-vous ?',
      valid: Boolean(form.stage),
    },
    {
      title: 'Quel budget avez-vous prévu ?',
      valid: Boolean(form.budget),
    },
    {
      title: 'Quand souhaitez-vous démarrer ?',
      valid: Boolean(form.timeline),
    },
    {
      title: 'Vos coordonnées',
      valid: Boolean(form.name.trim() && form.email.trim()),
    },
  ]

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!steps[step].valid) return

    const body = [
      `Produit : ${form.product}`,
      `Besoin : ${form.need}`,
      `Avancement : ${form.stage}`,
      `Budget : ${form.budget}`,
      `Démarrage : ${form.timeline}`,
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.phone || 'Non renseigné'}`,
    ].join('\n')

    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `[Flow] Nouveau projet — ${form.product}`
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setSent(true)
  }

  return (
    <section className="mt-32 md:mt-40 scroll-mt-24" id="projet">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Démarrer
            </p>
            <h2 className="font-headline font-bold text-3xl md:text-4xl tracking-tight text-on-surface mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Une idée, un besoin métier ou un processus que vous souhaitez digitaliser ? Parlons-en.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-6 md:p-10"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 text-primary-container">
                  <Check size={22} />
                </div>
                <h3 className="font-headline font-semibold text-xl text-on-surface mb-2">
                  Votre client mail est prêt
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-md mx-auto">
                  Un message prérempli s’ouvre avec les détails de votre projet. Envoyez-le pour que
                  nous puissions vous répondre rapidement.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                      Étape {step + 1} / {steps.length}
                    </span>
                    <span className="font-label text-xs text-primary-container">
                      {Math.round(((step + 1) / steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-primary-container transition-all duration-300"
                      style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-headline font-semibold text-xl text-on-surface mb-6">
                      {steps[step].title}
                    </h3>

                    {step === 0 && (
                      <OptionGrid
                        options={productOptions}
                        value={form.product}
                        onChange={(value) => update('product', value)}
                      />
                    )}

                    {step === 1 && (
                      <textarea
                        value={form.need}
                        onChange={(e) => update('need', e.target.value)}
                        rows={5}
                        placeholder="Décrivez votre idée, votre problème ou le processus à digitaliser…"
                        className="w-full rounded-xl border border-outline-variant/15 bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container"
                      />
                    )}

                    {step === 2 && (
                      <OptionGrid
                        options={stageOptions}
                        value={form.stage}
                        onChange={(value) => update('stage', value)}
                      />
                    )}

                    {step === 3 && (
                      <OptionGrid
                        options={budgetOptions}
                        value={form.budget}
                        onChange={(value) => update('budget', value)}
                      />
                    )}

                    {step === 4 && (
                      <OptionGrid
                        options={timelineOptions}
                        value={form.timeline}
                        onChange={(value) => update('timeline', value)}
                      />
                    )}

                    {step === 5 && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="Nom *"
                          required
                          className="w-full rounded-xl border border-outline-variant/15 bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container"
                        />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="Email *"
                          required
                          className="w-full rounded-xl border border-outline-variant/15 bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container"
                        />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="Téléphone (optionnel)"
                          className="w-full rounded-xl border border-outline-variant/15 bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container"
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-label text-sm text-on-surface-variant disabled:opacity-30 hover:text-primary transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Retour
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => steps[step].valid && setStep((s) => s + 1)}
                      disabled={!steps[step].valid}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold disabled:opacity-40"
                    >
                      Continuer
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!steps[step].valid}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-fixed text-on-primary px-5 py-2.5 rounded-lg font-label text-sm font-semibold disabled:opacity-40"
                    >
                      Envoyer mon projet
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </>
            )}
          </form>
        </FadeInUp>
      </div>
    </section>
  )
}
