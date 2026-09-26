'use client'

import { HQ_AGENTS } from '@/lib/hq/org'
import { CuteAvatar, HqShell } from './HqShell'

export function CoulissesPage() {
  return (
    <HqShell>
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
        <header>
          <p className="font-label text-xs uppercase tracking-widest text-primary-container">Coulisses</p>
          <h1 className="font-headline text-3xl font-bold">Comment l&apos;équipe est câblée</h1>
          <p className="text-on-surface-variant text-sm mt-2">
            Même architecture que la plateforme de Zineb (Néom), calée sur Flow : un orchestrateur, des cerveaux
            par agent, des règles de routage.
          </p>
        </header>

        <section className="space-y-3 text-sm leading-relaxed text-on-surface-variant">
          <p>
            <strong className="text-on-surface">Fichier global</strong> — le « CLAUDE.md » de Flow vit dans{' '}
            <code className="text-primary-fixed">lib/hq/org.ts</code> + le contexte CA. Il est lu à chaque
            mission. On y met seulement ce qui concerne toute l&apos;entreprise (sinon ça coûte des tokens).
          </p>
          <p>
            <strong className="text-on-surface">Un cerveau par agent</strong> — chaque employé a son prompt
            système (rôle, process, garde-fous). Il n&apos;est chargé que quand Victor lui délègue, ou quand tu
            ouvres son bureau.
          </p>
          <p>
            <strong className="text-on-surface">Règles de routage</strong> — contenu LinkedIn → marketing ;
            lead / inbox → Olivia ; devis → Philippe ; code / produit → delivery ; veille → Zoé / Karim. Victor
            est le manager : tu lui parles, il redirige.
          </p>
          <p>
            <strong className="text-on-surface">Plan puis génération</strong> — dans un bureau, le premier
            envoi produit un plan. Tu valides, ensuite le livrable (comme le carrousel dans la vidéo).
          </p>
          <p>
            <strong className="text-on-surface">Garde-fous Flow</strong> — pas de publication LinkedIn, pas
            d&apos;envoi d&apos;email client, pas de dépense. Trésorerie réelle = compte Indy.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-xl font-bold mb-4">Les cerveaux</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {HQ_AGENTS.map((a) => (
              <li
                key={a.id}
                className="flex gap-3 items-center rounded-2xl border border-outline-variant/20 p-3"
              >
                <CuteAvatar agentId={a.id} name={a.name} size={48} />
                <div>
                  <p className="font-headline font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-on-surface-variant">{a.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </HqShell>
  )
}
