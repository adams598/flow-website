import type { HqAgentId, HqAgentProfile } from './types'

/**
 * Apparence et raccourcis des agents dans HQ.
 * Le comportement (prompt, outils) est défini dans `.claude/agents/<id>.md`,
 * le même fichier que celui utilisé par Claude Code.
 */
export const HQ_PROFILES: HqAgentProfile[] = [
  {
    id: 'agent-acquisition',
    name: 'Axel',
    role: 'Agent d’acquisition',
    tagline: 'Pipeline, relances, appels et rapport du jour.',
    look: {
      skin: '#B9784F',
      hair: '#2B1D16',
      hairStyle: 'short',
      jacket: '#00A8B2',
      pants: '#1C1B1B',
      accessory: 'headset',
    },
    quickPrompts: [
      { label: 'Point pipeline', prompt: 'Fais-moi le point pipeline : statuts, paliers, prospects chauds et relances à faire aujourd’hui.' },
      { label: 'Relances du jour', prompt: 'Prépare les relances à envoyer aujourd’hui (J+2 et J+5) dans le fichier relances du jour, puis résume-les.' },
      { label: 'Fiche d’appels', prompt: 'Prépare ma fiche d’appels du jour, du plus chaud au moins chaud, avec numéro publié et script de 30 secondes.' },
      { label: 'Rapport du jour', prompt: 'Rédige le rapport du jour dans jour/ et résume-le en 5 lignes.' },
    ],
  },
  {
    id: 'chasseur-contrats',
    name: 'Nora',
    role: 'Chasseuse de contrats',
    tagline: 'Trouve les entreprises prêtes à payer, en Express ou en Projet.',
    look: {
      skin: '#F1C9A5',
      hair: '#6B4226',
      hairStyle: 'bun',
      jacket: '#E5E2E1',
      pants: '#00A8B2',
      accessory: 'cap-magnifier',
    },
    quickPrompts: [
      { label: '10 prospects Projet', prompt: 'Trouve 10 prospects qualifiés palier Projet (5 000 à 20 000 € et plus), avec preuves et brouillons de messages.' },
      { label: '10 prospects Express', prompt: 'Trouve 10 prospects qualifiés palier Express (moins de 1 000 €), avec preuves et brouillons de messages.' },
      { label: 'Filon offres d’emploi', prompt: 'Cherche dans les offres d’emploi de moins de 7 jours des PME dont le poste révèle des tâches automatisables, et qualifie les 8 meilleures.' },
      { label: 'Revoir l’offre', prompt: 'Relis offre-2-paliers.md et dis-moi comment rendre notre offre encore plus imbattable face aux concurrents.' },
    ],
  },
]

export const HQ_PROFILE_MAP = Object.fromEntries(HQ_PROFILES.map((p) => [p.id, p])) as Record<
  HqAgentId,
  HqAgentProfile
>

export function isHqAgentId(id: string): id is HqAgentId {
  return id in HQ_PROFILE_MAP
}
