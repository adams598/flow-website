export const SITE = {
  name: 'Flow',
  tagline: 'Build digital. Make it flow.',
  taglineFr: 'Construire. Simplifier. Faire évoluer.',
  email: 'adamsdexter3@gmail.com',
  github: 'https://github.com/adams598',
  repo: 'https://github.com/adams598/flow-website',
  linkedin: 'https://www.linkedin.com/in/adams-dexter-tchatchoua-3609931a9/',
  cta: 'Parler de mon projet',
  ctaHref: '/#projet',
} as const

export type Realisation = {
  slug: string
  title: string
  headline: string
  description: string
  image: string
  images?: string[]
  alt: string
  tags: string[]
  siteLink: string
  githubLink?: string
  problem: string
  objectives: string[]
  solution: string
  features: string[]
  result: string
}

export const realisations: Realisation[] = [
  {
    slug: 'objectif-tcf',
    title: 'Objectif TCF',
    headline: 'Une plateforme d’apprentissage avec abonnement',
    description:
      'Une plateforme permettant aux utilisateurs de suivre un parcours personnalisé, s’entraîner, réaliser des simulations et accéder à du contenu selon leur abonnement.',
    image: '/objectif-tcf.png',
    images: ['/objectif-tcf.png', '/objectif-tcf-dashboard.png', '/objectif-tcf-analytics.png'],
    alt: 'Plateforme Objectif TCF',
    tags: ['Abonnement', 'Paiement', 'IA', 'E-learning', 'Gestion des accès'],
    siteLink: 'https://objectif-tcf-blue.vercel.app/',
    githubLink: 'https://github.com/adams598/objectif_tcf',
    problem:
      'Proposer une préparation complète aux examens TCF, TEF et IELTS, avec suivi des abonnements et outils d’administration.',
    objectives: [
      'Parcours candidat multi-examens',
      'Monétisation par abonnement',
      'Pilotage métier via back-office',
    ],
    solution:
      'Développement d’une plateforme web immersive (simulations, feedback) et d’un back-office : offres, paiements, utilisateurs, examens, séries et analytics.',
    features: [
      'Simulations d’examen',
      'Abonnements et paiements',
      'Dashboard admin',
      'Gestion des séries et correcteurs',
      'Analytics d’activité et de revenus',
    ],
    result: 'Parcours candidat clair multi-examens et pilotage métier centralisé pour l’équipe.',
  },
  {
    slug: 'bai-consulting',
    title: 'BAI Consulting & Formation',
    headline: 'Une plateforme B2B multi-rôles',
    description:
      'Site public, espace apprenant et administration réunis dans une même solution avec gestion différenciée des utilisateurs et organisations.',
    image: '/bai-project-2.png',
    alt: 'Plateforme BAI Formation Consulting',
    tags: ['B2B', 'Gestion des rôles', 'E-learning', 'Administration'],
    siteLink: 'https://bai-consultingetformation.com/',
    githubLink: 'https://github.com/adams598/bai-consulting-et-formation',
    problem: 'Moderniser la formation bancaire et rendre les parcours plus digitaux.',
    objectives: [
      'Digitaliser la formation des équipes',
      'Centraliser l’administration',
      'Séparer les espaces public / apprenant / admin',
    ],
    solution:
      'Création d’une plateforme e-learning complète, avec tableau de bord administrateur et parcours adaptés aux équipes.',
    features: [
      'Site public',
      'Espace apprenant',
      'Administration multi-rôles',
      'Parcours de formation',
    ],
    result: 'Meilleure accessibilité, expérience plus fluide et une base prête à évoluer avec l’activité.',
  },
  {
    slug: 'drivin-chill',
    title: 'Drivin & Chill',
    headline: 'Une expérience de réservation et paiement en ligne',
    description:
      'Réservation, paiement Stripe et génération de QR code dans un parcours pensé pour le client final.',
    image: '/drivinchill.png',
    alt: 'Application de réservation DrivinChill',
    tags: ['Réservation', 'Stripe', 'QR Code', 'Paiement'],
    siteLink: 'https://drivinnchill.fr/',
    githubLink: 'https://github.com/adams598/drivin-chill',
    problem: 'Simplifier la réservation et offrir une expérience mobile fluide.',
    objectives: [
      'Réduire les frictions de réservation',
      'Sécuriser les paiements',
      'Simplifier le contrôle d’accès via QR code',
    ],
    solution:
      'Mise en place d’un parcours de réservation rapide, d’un système de paiement et d’une interface pensée pour le mobile.',
    features: ['Réservation en ligne', 'Paiement Stripe', 'QR codes', 'Tableau de bord'],
    result: 'Réduction des frictions utilisateur et meilleure image de marque digitale.',
  },
]

export const services = [
  {
    slug: 'site-web',
    number: '01',
    title: 'Sites web',
    headline: 'Votre présence digitale devient un véritable outil commercial.',
    cta: 'Créer mon site',
    items: [
      'Sites corporate',
      'Sites vitrines',
      'Landing pages',
      'Sites institutionnels',
      'Sites avec administration',
      'SEO',
      'Réservation',
      'Paiement',
      'Multilingue',
    ],
  },
  {
    slug: 'application-web',
    number: '02',
    title: 'Applications métier',
    headline: 'Digitalisez votre façon de travailler.',
    cta: 'Transformer mon processus',
    items: [
      'Espaces clients',
      'Back-office',
      'Gestion utilisateurs',
      'Workflows',
      'Tableaux de bord',
      'Automatisation',
      'Gestion documentaire',
      'Outils internes',
      'Intégrations API',
    ],
  },
  {
    slug: 'plateforme-web',
    number: '03',
    title: 'Plateformes digitales',
    headline: 'Construisez votre propre produit digital.',
    cta: 'Construire ma plateforme',
    items: [
      'SaaS',
      'Marketplaces',
      'Plateformes d’abonnement',
      'E-learning',
      'Réservation',
      'Plateformes B2B',
      'Plateformes multi-utilisateurs',
    ],
  },
] as const

export function getRealisation(slug: string) {
  return realisations.find((item) => item.slug === slug)
}

export function getService(slug: string) {
  return services.find((item) => item.slug === slug)
}
