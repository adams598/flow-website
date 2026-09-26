'use client'

import { useState } from 'react'
import { Check, Copy, Moon, Sun } from 'lucide-react'
import {
  ACCENT_RULE,
  ARCHIVED_COLORS,
  BRAND,
  COLD_COLORS,
  DARK_TOKENS,
  LAYOUT,
  LIGHT_TOKENS,
  LOGO_RULES,
  PAIRINGS,
  THEMES,
  TYPE_SCALE,
  VOICE,
  WARM_COLORS,
} from '@/lib/brand'
import { FlowMark } from '@/components/FlowMark'
import { HqShell } from './HqShell'

const TOC = [
  { href: '#identite', label: 'Identité' },
  { href: '#themes', label: 'Thèmes' },
  { href: '#logo', label: 'Logo' },
  { href: '#couleurs', label: 'Couleurs' },
  { href: '#typo', label: 'Typo' },
  { href: '#voix', label: 'Voix' },
  { href: '#composants', label: 'Composants' },
  { href: '#usages', label: 'Usages' },
]

function HexButton({ hex, ink = false }: { hex: string; ink?: boolean }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 font-label text-xs transition-colors ${
        ink ? 'text-[#6B5348] hover:text-[#3F2C24]' : 'text-on-surface-variant hover:text-primary'
      }`}
      aria-label={`Copier ${hex}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {hex}
    </button>
  )
}

function Swatch({
  name,
  hex,
  role,
  token,
}: {
  name: string
  hex: string
  role: string
  token?: string
}) {
  return (
    <div className="min-w-0">
      <div className="h-20 rounded-2xl border border-outline-variant/15" style={{ background: hex }} />
      <p className="font-headline font-semibold mt-3">{name}</p>
      {token ? <p className="font-label text-xs text-primary-container">{token}</p> : null}
      <HexButton hex={hex} />
      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{role}</p>
    </div>
  )
}

function TokenRow({ token, hex, role }: { token: string; hex: string; role: string }) {
  return (
    <li className="flex items-center gap-3 py-2 border-b border-outline-variant/10">
      <span
        className="h-8 w-8 shrink-0 rounded-lg border border-outline-variant/20"
        style={{ background: hex }}
      />
      <code className="font-label text-xs text-primary-fixed w-44 shrink-0 truncate">{token}</code>
      <span className="text-sm text-on-surface-variant flex-1 min-w-0">{role}</span>
      <HexButton hex={hex} />
    </li>
  )
}

function ThemePreview() {
  const [mode, setMode] = useState<'dark' | 'light'>('light')
  const theme = THEMES[mode]

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('dark')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-label text-sm ${
            mode === 'dark'
              ? 'bg-primary-container/20 text-primary-fixed'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <Moon size={14} />
          Nuit
        </button>
        <button
          type="button"
          onClick={() => setMode('light')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-label text-sm ${
            mode === 'light'
              ? 'bg-primary-container/20 text-primary-fixed'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <Sun size={14} />
          Jour
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-outline-variant/15"
        style={{ background: theme.page, color: theme.text }}
      >
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderBottom: `1px solid ${theme.line}` }}
        >
          <FlowMark tone="cyan" className="h-8 w-8" />
          <span className="font-headline font-extrabold text-lg tracking-tight">Flow</span>
          <span className="ml-auto font-label text-xs" style={{ color: theme.muted }}>
            {theme.name}
          </span>
        </div>

        <div className="px-6 md:px-10 py-10">
          <p
            className="font-label text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: theme.kicker }}
          >
            {mode === 'dark' ? 'Flow' : 'À propos'}
          </p>
          <h3 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tight leading-[1.1] mb-4">
            Build digital.
            <br />
            Make it flow.
          </h3>
          <p className="max-w-lg leading-relaxed mb-8" style={{ color: theme.muted }}>
            {theme.idea}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <span
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-label text-sm font-semibold"
              style={{ background: theme.cta, color: theme.ctaText }}
            >
              Parler de mon projet
            </span>
            <span
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-label text-sm font-semibold"
              style={{ border: `1px solid ${theme.cyan}`, color: theme.cyan }}
            >
              Réalisations
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <article
              className="rounded-2xl p-6"
              style={{
                background: theme.card,
                border: `1px solid ${theme.line}`,
              }}
            >
              <p className="font-label text-xs uppercase tracking-[0.2em] mb-3" style={{ color: theme.cyan }}>
                01
              </p>
              <p className="font-headline font-bold text-xl mb-2">Site web</p>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                Carte produit. L’accent reste cyan.
              </p>
            </article>
            <article
              className="rounded-2xl p-6"
              style={{
                background: mode === 'light' ? theme.surface : theme.card,
                border: `1px solid ${theme.line}`,
              }}
            >
              <p
                className="font-label text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: theme.terre }}
              >
                Preuve
              </p>
              <p className="font-headline font-bold text-xl mb-2">Du cadrage au run</p>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                {mode === 'light'
                  ? 'Bande calcaire + kicker terre. Chaleur sans voler le CTA.'
                  : 'Terre au minimum. La nuit reste cyan.'}
              </p>
            </article>
          </div>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {theme.roles.map((role) => (
          <li key={role.hex + role.name}>
            <div
              className="h-12 rounded-xl border border-outline-variant/15"
              style={{ background: role.hex }}
            />
            <p className="font-headline font-semibold text-sm mt-2">{role.name}</p>
            <p className="text-xs text-on-surface-variant">{role.use}</p>
            <HexButton hex={role.hex} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DesignSystemPage() {
  return (
    <HqShell>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12">
          <nav className="hidden lg:block sticky top-24 self-start">
            <p className="font-label text-xs uppercase tracking-widest text-primary-container mb-3">
              Charte
            </p>
            <ul className="space-y-1">
              {TOC.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-label text-sm text-on-surface-variant hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-20">
            <header id="identite" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary-container mb-4">
                {BRAND.name} · charte v2
              </p>
              <h1 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight leading-[1.05]">
                Build digital.
                <br />
                <span className="gradient-text">Make it flow.</span>
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-2xl mt-6 leading-relaxed">
                {BRAND.personality}
              </p>
              <p className="font-label text-sm text-on-surface-variant mt-4">{BRAND.line}</p>
            </header>

            <section id="themes" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Thèmes
              </p>
              <h2 className="font-headline font-bold text-3xl mb-4">Nuit / jour, même marque</h2>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed mb-4">
                Le site switch dark / light. On ne change pas de logo : on change le mix. Nuit =
                cyan sur ink. Jour = cyan gardé, plus calcaire et terre pour la chaleur.
              </p>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed mb-8">{ACCENT_RULE}</p>
              <ThemePreview />
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-12 mb-4">
                Garde-fous
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {PAIRINGS.map((pair) => (
                  <figure
                    key={pair.id}
                    className="rounded-2xl p-6 min-h-[200px] flex flex-col"
                    style={{ background: pair.bg, color: pair.text }}
                  >
                    <p className="font-label text-xs uppercase tracking-widest mb-4 opacity-70">
                      {pair.ok ? 'Oui' : 'Non'} · {pair.label}
                    </p>
                    <FlowMark tone="cyan" className="h-12 w-12 mb-3" />
                    <p className="font-headline font-bold text-lg mb-auto">Flow</p>
                    <figcaption className="text-sm mt-4 leading-relaxed" style={{ opacity: 0.8 }}>
                      {pair.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section id="logo" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">Logo</p>
              <h2 className="font-headline font-bold text-3xl mb-2">Le chevron</h2>
              <p className="text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                {LOGO_RULES.meaning} {LOGO_RULES.clearSpace} Taille min {LOGO_RULES.minSize}.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <figure className="rounded-2xl bg-[#131313] border border-outline-variant/15 p-8 flex flex-col items-center justify-center min-h-[200px]">
                  <FlowMark tone="cyan" alt="Picto Flow cyan" className="h-28 w-28" />
                  <figcaption className="font-label text-xs text-on-surface-variant mt-5">
                    Cyan · nuit
                  </figcaption>
                </figure>
                <figure className="rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] bg-[#F3EBE1]">
                  <FlowMark tone="ombre" className="h-28 w-28" />
                  <figcaption className="font-label text-xs mt-5 text-[#3F2C24]">
                    Ombre · papier
                  </figcaption>
                </figure>
                <figure className="rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] bg-[#FFFCFA] border border-[#D9C4A8]/80">
                  <FlowMark tone="cyan" className="h-28 w-28" />
                  <figcaption className="font-label text-xs mt-5 text-[#5C534C]">
                    Cyan · blanc
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-primary-container p-8 flex flex-col items-center justify-center min-h-[200px]">
                  <FlowMark tone="ink" className="h-28 w-28" />
                  <figcaption className="font-label text-xs text-on-primary mt-5">
                    Ink · fond cyan
                  </figcaption>
                </figure>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-3">Faire</h3>
                  <ul className="space-y-2 text-sm text-on-surface-variant">
                    {LOGO_RULES.backgrounds.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-container shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-3">Ne pas faire</h3>
                  <ul className="space-y-2 text-sm text-on-surface-variant">
                    {LOGO_RULES.dont.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-error shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="couleurs" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Couleurs
              </p>
              <h2 className="font-headline font-bold text-3xl mb-2">Froid + chaud</h2>
              <p className="text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                Cyan inchangé. L’or Material est retiré : Terre le remplace comme highlight rare.
              </p>

              <h3 className="font-headline font-semibold text-lg mb-4">Digital</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {COLD_COLORS.map((color) => (
                  <Swatch key={color.hex} {...color} />
                ))}
              </div>

              <h3 className="font-headline font-semibold text-lg mb-4">Papier</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                {WARM_COLORS.map((color) => (
                  <Swatch key={color.hex} {...color} />
                ))}
              </div>

              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
                Archivé
              </p>
              <ul className="space-y-2 mb-12">
                {ARCHIVED_COLORS.map((color) => (
                  <li key={color.hex} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span
                      className="h-6 w-6 rounded mt-0.5 border border-outline-variant/20 shrink-0"
                      style={{ background: color.hex }}
                    />
                    <span>
                      <strong className="text-on-surface">{color.name}</strong> {color.hex} — {color.role}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">Tokens nuit (actuel)</h3>
                  <p className="text-sm text-on-surface-variant mb-4">Toujours dans globals.css.</p>
                  <ul>
                    {DARK_TOKENS.map((row) => (
                      <TokenRow key={`d-${row.token}`} {...row} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">Tokens clair (cible)</h3>
                  <p className="text-sm text-on-surface-variant mb-4">
                    Blanc chaud + calcaire. Pas encore branché au site.
                  </p>
                  <ul>
                    {LIGHT_TOKENS.map((row) => (
                      <TokenRow key={`l-${row.token}`} {...row} />
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="typo" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Typographie
              </p>
              <h2 className="font-headline font-bold text-3xl mb-2">Manrope + Inter</h2>
              <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                Inchangé. Nuit : kicker cyan. Jour : kicker terre, liens cyan profond.
              </p>
              <div className="space-y-8">
                {TYPE_SCALE.map((row) => (
                  <div
                    key={row.name}
                    className="border-b border-outline-variant/10 pb-6 grid md:grid-cols-[7rem_1fr] gap-4 items-end"
                  >
                    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {row.name}
                    </p>
                    <p className={row.className}>{row.sample}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="voix" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">Voix</p>
              <h2 className="font-headline font-bold text-3xl mb-8">Je / nous</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <article className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-6">
                  <p className="font-label text-xs uppercase tracking-widest text-primary-container mb-2">
                    Profil Adams
                  </p>
                  <p className="font-headline font-semibold text-xl mb-3">{VOICE.adams.dit}</p>
                  <p className="text-sm text-on-surface-variant mb-2">{VOICE.adams.but}</p>
                  <p className="text-sm text-on-surface-variant">Éviter : {VOICE.adams.eviter}.</p>
                </article>
                <article className="rounded-2xl border border-outline-variant/15 p-6">
                  <p className="font-label text-xs uppercase tracking-widest text-primary-container mb-2">
                    Page Flow
                  </p>
                  <p className="font-headline font-semibold text-xl mb-3">{VOICE.flow.dit}</p>
                  <p className="text-sm text-on-surface-variant mb-2">{VOICE.flow.but}</p>
                  <p className="text-sm text-on-surface-variant">Éviter : {VOICE.flow.eviter}.</p>
                </article>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <ul className="space-y-2 text-sm">
                  {VOICE.do.map((item) => (
                    <li key={item} className="flex gap-2 text-on-surface-variant">
                      <span className="text-primary-container shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 text-sm">
                  {VOICE.dont.map((item) => (
                    <li key={item} className="flex gap-2 text-on-surface-variant">
                      <span className="text-error shrink-0">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="composants" className="scroll-mt-28">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Composants
              </p>
              <h2 className="font-headline font-bold text-3xl mb-8">Nuit vs jour</h2>

              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
                Nuit — CTA cyan électrique
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  type="button"
                  className="inline-flex items-center gradient-bg text-on-primary px-6 py-3 rounded-lg font-label text-sm font-semibold"
                >
                  Parler de mon projet
                </button>
                <button
                  type="button"
                  className="inline-flex items-center border border-primary/30 text-primary px-6 py-3 rounded-lg font-label text-sm font-semibold hover:bg-surface-container-high"
                >
                  Voir les réalisations
                </button>
                <span className="inline-flex items-center rounded-full bg-primary-container/15 text-primary-fixed px-3 py-1 font-label text-xs uppercase tracking-widest">
                  En production
                </span>
              </div>

              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
                Jour — CTA cyan profond, chaleur calcaire / terre
              </p>
              <div
                className="rounded-2xl p-8 md:p-10 mb-10"
                style={{ background: '#FFFCFA', color: '#131313' }}
              >
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{ background: '#F3EBE1' }}
                >
                  <p
                    className="font-label text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ color: '#C45E32' }}
                  >
                    À propos
                  </p>
                  <h3 className="font-headline font-extrabold text-2xl tracking-tight mb-2">
                    Un interlocuteur technique.
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C534C' }}>
                    Bande calcaire, kicker terre, logo cyan. Le bouton reste cyan.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 rounded-lg font-label text-sm font-semibold"
                  style={{ background: '#00A8B2', color: '#FFFFFF' }}
                >
                  Parler de mon projet
                </button>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                Conteneur {LAYOUT.page}. Sections {LAYOUT.section}. Glow cyan : nuit seulement.
              </p>
            </section>

            <section id="usages" className="scroll-mt-28 pb-12">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-3">Usages</p>
              <h2 className="font-headline font-bold text-3xl mb-8">Où ça s’applique</h2>
              <div className="space-y-6">
                <div className="border-b border-outline-variant/10 pb-6">
                  <h3 className="font-headline font-semibold text-lg">Site</h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Pas encore. Le switch dark / light du site portera ces deux mix. HQ reste nuit.
                  </p>
                </div>
                <div className="border-b border-outline-variant/10 pb-6">
                  <h3 className="font-headline font-semibold text-lg">LinkedIn / WhatsApp</h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Offre tech = mix nuit. Humain / réseau = mix jour (calcaire + photo + cyan).
                  </p>
                </div>
                <p className="text-sm text-on-surface-variant">
                  Document : <code className="text-primary-fixed">marketing/CHARTE_GRAPHIQUE.md</code>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </HqShell>
  )
}
