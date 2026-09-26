export const BRAND = {
  name: 'Flow',
  tagline: 'Build digital. Make it flow.',
  line: 'Sites web · Applications métier · Plateformes digitales',
  positioning:
    'Ingénieur qui livre des produits digitaux — fondateur de Flow. Pas « freelance sites vitrine ».',
  personality:
    'Froid la nuit, chaud le jour. Même logo. Le switch dark / light change le mix, pas la marque.',
  markPng: '/brand/flow-mark.png',
  markSvg: '/brand/flow-mark.png',
  markMono: '/brand/flow-mark-ink.png',
  markOmbre: '/brand/flow-mark-ombre.png',
  icon: '/icon.png',
  portrait: '/photo.jpg',
} as const

/** CTA toujours cyan. Terre n’est jamais un bouton. Le mélange chaud n’existe que le jour. */
export const ACCENT_RULE =
  'Même marque, deux mix. Nuit : cyan électrique sur ink, terre quasi absente. Jour : cyan gardé (logo + CTA profond), calcaire et terre pour la chaleur. Jamais de fond beige la nuit. Jamais de texte #00F0FF sur beige.'

export const THEMES = {
  dark: {
    id: 'dark' as const,
    name: 'Nuit',
    idea: 'Produit, précision. Cyan électrique. Presque pas de chaud.',
    page: '#131313',
    surface: '#2A2A2A',
    card: '#201F1F',
    text: '#E5E2E1',
    muted: '#B9CACB',
    line: '#3B494B',
    cyan: '#00F0FF',
    cta: '#00F0FF',
    ctaText: '#00363A',
    kicker: '#00F0FF',
    terre: '#C45E32',
    mark: 'cyan' as const,
    roles: [
      { name: 'Ink', hex: '#131313', use: 'Fond' },
      { name: 'Cyan', hex: '#00F0FF', use: 'Logo, CTA, labels' },
      { name: 'Ice', hex: '#7DF4FF', use: 'Dégradé, lueur' },
      { name: 'Terre', hex: '#C45E32', use: '1 badge preuve max' },
    ],
  },
  light: {
    id: 'light' as const,
    name: 'Jour',
    idea: 'Cyan gardé. Beige et terre chauffent la page — pas le bouton.',
    page: '#FFFCFA',
    surface: '#F3EBE1',
    card: '#FFFFFF',
    text: '#131313',
    muted: '#5C534C',
    line: '#D9C4A8',
    cyan: '#00A8B2',
    cta: '#00A8B2',
    ctaText: '#FFFFFF',
    kicker: '#C45E32',
    terre: '#C45E32',
    mark: 'cyan' as const,
    roles: [
      { name: 'Blanc', hex: '#FFFCFA', use: 'Fond page' },
      { name: 'Calcaire', hex: '#F3EBE1', use: 'Bandes, cartes secondaires' },
      { name: 'Cyan profond', hex: '#00A8B2', use: 'CTA, liens' },
      { name: 'Cyan électrique', hex: '#00F0FF', use: 'Logo seulement' },
      { name: 'Terre', hex: '#C45E32', use: 'Kickers, cadre photo, filet' },
    ],
  },
} as const

export const PAIRINGS = [
  {
    id: 'bad',
    ok: false,
    label: 'À éviter',
    bg: '#F3EBE1',
    mark: 'cyan',
    text: '#00F0FF',
    caption: 'Texte ou gros fill #00F0FF sur beige — ça vibre.',
  },
  {
    id: 'light-ok',
    ok: true,
    label: 'Jour',
    bg: '#FFFCFA',
    mark: 'cyan',
    text: '#131313',
    caption: 'Blanc + logo cyan. Calcaire / terre autour, pas dessus le mot.',
  },
  {
    id: 'band',
    ok: true,
    label: 'Bande chaude',
    bg: '#F3EBE1',
    mark: 'cyan',
    text: '#131313',
    caption: 'Calcaire + picto cyan petit + kicker terre. CTA en #00A8B2.',
  },
] as const

export const COLD_COLORS = [
  {
    name: 'Ink',
    token: 'background',
    hex: '#131313',
    rgb: '19 19 19',
    role: 'Fond sombre, bannières, WhatsApp, texte fort sur blanc.',
  },
  {
    name: 'Cyan',
    token: 'primary-container',
    hex: '#00F0FF',
    rgb: '0 240 255',
    role: 'Accent signature, logo, CTA dark, labels. Jamais en paragraphe sur fond clair.',
  },
  {
    name: 'Ice',
    token: 'primary-fixed',
    hex: '#7DF4FF',
    rgb: '125 244 255',
    role: 'Lueur et fin de dégradé, thème sombre uniquement.',
  },
  {
    name: 'Teal',
    token: 'primary-light',
    hex: '#005F66',
    rgb: '0 95 102',
    role: 'Liens et primary sur fond clair / papier. Le cyan électrique n’y va pas.',
  },
] as const

export const WARM_COLORS = [
  {
    name: 'Blanc',
    token: 'blanc',
    hex: '#FFFCFA',
    rgb: '255 252 250',
    role: 'Page claire, documents, respirations. Blanc chaud, pas le gris-bleu actuel.',
  },
  {
    name: 'Calcaire',
    token: 'calcaire',
    hex: '#F3EBE1',
    rgb: '243 235 225',
    role: 'Thème light : bandes, cartes secondaires. Jamais un fond de page dark.',
  },
  {
    name: 'Sable',
    token: 'sable',
    hex: '#D9C4A8',
    rgb: '217 196 168',
    role: 'Filets, chips, règles. Jamais un fond de page entier.',
  },
  {
    name: 'Terre',
    token: 'terre',
    hex: '#C45E32',
    rgb: '196 94 50',
    role: 'Jour : kickers, cadre photo, chaleur. Nuit : 1 badge preuve max. Jamais un CTA.',
  },
  {
    name: 'Ombre',
    token: 'ombre',
    hex: '#3F2C24',
    rgb: '63 44 36',
    role: 'Marron. Texte sur calcaire, picto hoodie, cadres photo.',
  },
] as const

export const CORE_COLORS = [...COLD_COLORS, ...WARM_COLORS] as const

export const ARCHIVED_COLORS = [
  {
    name: 'Or',
    hex: '#FED639',
    role: 'Ancien tertiary Material. Trop proche de Terre, trop « fintech ». Ne plus utiliser sur les nouveaux écrans.',
  },
  {
    name: 'Paper froid',
    hex: '#F8FBFC',
    role: 'Ancien fond light (bleu-gris). Remplacé par Blanc / Calcaire.',
  },
] as const

export const COMBINATIONS = [
  {
    id: 'nuit',
    name: 'Nuit',
    usage: 'Thème dark — tout le site',
    bg: '#131313',
    text: '#E5E2E1',
    muted: '#B9CACB',
    accent: '#00F0FF',
    mark: 'cyan',
  },
  {
    id: 'jour',
    name: 'Jour',
    usage: 'Thème light — blanc + calcaire + terre, cyan gardé',
    bg: '#FFFCFA',
    text: '#131313',
    muted: '#5C534C',
    accent: '#00A8B2',
    mark: 'cyan',
  },
] as const

export const DARK_TOKENS = [
  { token: 'background', hex: '#131313', role: 'Page' },
  { token: 'surface-container-low', hex: '#1C1B1B', role: 'Footer, panneaux' },
  { token: 'surface-container', hex: '#201F1F', role: 'Surface intermédiaire' },
  { token: 'surface-container-high', hex: '#2A2A2A', role: 'Cartes' },
  { token: 'on-surface', hex: '#E5E2E1', role: 'Titres, texte fort' },
  { token: 'on-surface-variant', hex: '#B9CACB', role: 'Corps, légendes' },
  { token: 'outline-variant', hex: '#3B494B', role: 'Filets discrets' },
  { token: 'primary', hex: '#DBFCFF', role: 'Texte cyan clair' },
  { token: 'primary-container', hex: '#00F0FF', role: 'Accent / CTA' },
  { token: 'primary-fixed', hex: '#7DF4FF', role: 'Fin de dégradé' },
  { token: 'on-primary', hex: '#00363A', role: 'Texte sur CTA' },
  { token: 'secondary', hex: '#96D1D6', role: 'Soutien cyan-gris' },
  { token: 'terre', hex: '#C45E32', role: 'Highlight chaud rare' },
  { token: 'error', hex: '#FFB4AB', role: 'Erreur' },
] as const

export const LIGHT_TOKENS = [
  { token: 'background', hex: '#FFFCFA', role: 'Page (blanc chaud)' },
  { token: 'surface-container', hex: '#F3EBE1', role: 'Bandes papier / calcaire' },
  { token: 'surface-container-high', hex: '#FFFFFF', role: 'Cartes sur papier' },
  { token: 'on-surface', hex: '#131313', role: 'Titres' },
  { token: 'on-surface-variant', hex: '#5C534C', role: 'Corps' },
  { token: 'outline-variant', hex: '#D9C4A8', role: 'Filets sable' },
  { token: 'primary', hex: '#005F66', role: 'Texte / liens' },
  { token: 'primary-container', hex: '#00A8B2', role: 'CTA' },
  { token: 'on-primary', hex: '#FFFFFF', role: 'Texte sur CTA' },
  { token: 'ombre', hex: '#3F2C24', role: 'Texte sur calcaire' },
  { token: 'terre', hex: '#C45E32', role: 'Highlight' },
  { token: 'error', hex: '#BA1A1A', role: 'Erreur' },
] as const

export const TYPE = {
  headline: { family: 'Manrope', css: 'font-headline', weights: [400, 600, 700, 800] },
  body: { family: 'Inter', css: 'font-body', weights: [400, 500, 600] },
  label: { family: 'Inter', css: 'font-label', weights: [500, 600] },
} as const

export const TYPE_SCALE = [
  {
    name: 'Display',
    sample: 'Build digital.',
    className: 'font-headline font-extrabold text-5xl md:text-6xl tracking-tight',
  },
  {
    name: 'H1',
    sample: 'Make it flow.',
    className: 'font-headline font-extrabold text-4xl md:text-5xl tracking-tight',
  },
  {
    name: 'H2',
    sample: 'Trois portes d’entrée',
    className: 'font-headline font-bold text-3xl md:text-4xl tracking-tight',
  },
  {
    name: 'H3',
    sample: 'Applications métier',
    className: 'font-headline font-bold text-2xl',
  },
  {
    name: 'H4',
    sample: 'Du cadrage au run',
    className: 'font-headline font-semibold text-xl',
  },
  {
    name: 'Body',
    sample: 'Nous concevons des solutions digitales sur mesure pour simplifier vos processus.',
    className: 'font-body text-lg leading-relaxed text-on-surface-variant',
  },
  {
    name: 'Body sm',
    sample: 'Un interlocuteur technique, du besoin jusqu’au run.',
    className: 'font-body text-sm leading-relaxed text-on-surface-variant',
  },
  {
    name: 'Label',
    sample: 'SOLUTIONS',
    className: 'font-label text-sm uppercase tracking-[0.2em] text-primary-container',
  },
] as const

export const RADIUS = {
  button: '8px visé · aujourd’hui rounded-lg (4px via override Tailwind)',
  card: '16px · rounded-2xl',
  input: '8px · rounded-lg',
  pill: '9999px · viser rounded-full natif',
} as const

export const LAYOUT = {
  page: 'max-w-7xl mx-auto px-6 md:px-8',
  hq: 'max-w-6xl mx-auto px-4 md:px-8',
  section: 'mt-32 md:mt-40',
  cardPad: 'p-6 à p-8',
} as const

export const VOICE = {
  adams: {
    dit: 'Je / métier / leçons / preuves vécues',
    but: 'Confiance, réseau, opportunités',
    eviter: 'Catalogue froid, ton agence',
  },
  flow: {
    dit: 'Nous / offre / livraisons / partenaires',
    but: 'Marque, leads, crédibilité entreprise',
    eviter: 'Copier-coller du post perso',
  },
  do: [
    'Phrases courtes, concrètes, une idée par bloc.',
    'Preuve avant promesse : un livrable, un process, un avant/après.',
    'Trois portes : site / app métier / plateforme — pas un catalogue.',
    'Français par défaut. Tagline et nom de marque en anglais, inchangés.',
  ],
  dont: [
    '« Freelance », « auto-entrepreneur », « sites vitrine pas chers ».',
    'Jargon IA / « synergie » / superlatifs vides.',
    'Le même texte sur le profil Adams et la page Flow.',
    'Emojis décoratifs sur le site et les visuels print.',
  ],
} as const

export const LOGO_RULES = {
  official:
    'Chevron : PNG source recopié (public/brand/flow-mark.png). Pas de SVG redessiné. Variantes = recolor pixel à pixel, même forme.',
  meaning: 'Pic de direction — cadrer, avancer, livrer. Ce n’est pas un A, ni un F.',
  clearSpace: 'Autour du picto, laisser au moins la largeur d’une jambe.',
  minSize: '24 px (écran) · 8 mm (print). En dessous : picto seul, jamais le lockup.',
  backgrounds: [
    'Nuit / ink → picto cyan',
    'Jour / blanc → picto cyan (petit, navbar, favicon)',
    'Jour / calcaire → picto cyan petit, ou ombre en print',
    'Fond cyan → picto ink',
  ],
  dont: [
    'Le logo « F » à barres des visuels WhatsApp (non officiel — à retirer).',
    'Étirer, incliner, contourner, ajouter une ombre gratuite.',
    'Recolorier en terre / or / sable : le picto n’est pas terracotta.',
    'Poser le cyan électrique #00F0FF sur du blanc (illisible, cheap).',
    'Cyan et terre tous les deux en grand fill sur la même surface.',
  ],
} as const
