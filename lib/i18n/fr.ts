import { SITE } from '@/lib/site'

export const fr = {
  meta: {
    title: `${SITE.name} — Solutions digitales sur mesure`,
    description:
      'Flow conçoit et développe des sites web, applications métier et plateformes digitales sur mesure pour transformer vos idées et vos processus en solutions concrètes.',
    keywords: [
      'Flow',
      'site web sur mesure',
      'application métier',
      'plateforme digitale',
      'développement web',
      'Next.js',
    ],
    ogTitle: `${SITE.name} — Build digital. Make it flow.`,
    ogDescription:
      'Sites web, applications métier et plateformes digitales conçus pour faire avancer votre activité.',
  },
  nav: {
    cta: 'Parler de mon projet',
    ctaHref: '/#projet',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    links: [
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Réalisations', href: '/#realisations' },
      { label: 'Méthode', href: '/#methode' },
      { label: 'À propos', href: '/#apropos' },
    ],
  },
  language: {
    label: 'Langue',
    switchTo: {
      fr: 'Passer en français',
      en: 'Switch to English',
    },
  },
  theme: {
    toLight: 'Passer au thème clair',
    toDark: 'Passer au thème sombre',
    light: 'Thème clair',
    dark: 'Thème sombre',
  },
  hero: {
    lead: 'Nous concevons des solutions digitales sur mesure pour simplifier vos processus, améliorer vos parcours clients et développer votre activité.',
    secondaryCta: 'Voir les réalisations',
    underCta: ['Site web', 'Application métier', 'Plateforme', 'Automatisation'],
  },
  problems: {
    kicker: 'Votre contexte',
    title: 'Votre activité évolue. Vos outils doivent suivre.',
    intro: 'Votre entreprise grandit, mais vos outils deviennent trop limités ?',
    closing: `${SITE.name} transforme ces besoins en solutions digitales concrètes.`,
    items: [
      {
        key: 'idea',
        title: 'Vous avez une idée',
        description:
          'Vous souhaitez lancer une plateforme, un service ou un nouveau produit digital.',
      },
      {
        key: 'manual',
        title: 'Vos processus sont trop manuels',
        description:
          'Excel, emails, formulaires et tâches répétitives ralentissent votre activité.',
      },
      {
        key: 'site',
        title: 'Votre site ne suffit plus',
        description:
          'Vous avez besoin d’un espace client, d’un paiement, d’une réservation ou d’un véritable outil métier.',
      },
      {
        key: 'partner',
        title: 'Vous avez besoin d’un partenaire technique',
        description:
          'Vous cherchez quelqu’un capable de concevoir et développer la solution de bout en bout.',
      },
    ],
  },
  offers: {
    kicker: 'Solutions',
    title: 'Trois portes d’entrée. Une même exigence : une solution adaptée.',
    unsureTitle: 'Vous ne savez pas exactement ce dont vous avez besoin ?',
    unsureBody:
      'Décrivez-nous votre idée, votre problème ou votre processus. Nous vous aiderons à déterminer la solution la plus adaptée.',
  },
  services: {
    label: 'Solution',
    back: 'Toutes les solutions',
    for: 'Pour :',
    readyTitle: 'Prêt à avancer ?',
    readyBody:
      'Décrivez votre besoin : nous vous aidons à cadrer la solution la plus adaptée.',
    fallbackTitle: 'Service',
    items: [
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
    ],
  },
  realisations: {
    kicker: 'Réalisations',
    title: 'Des preuves concrètes, pas une simple galerie.',
    intro:
      'Chaque projet démontre une compétence précise : produit, parcours, monétisation ou outil métier.',
    viewProject: 'Voir le projet',
    viewSite: 'Voir le site',
    label: 'Réalisation',
    back: 'Retour aux réalisations',
    fallbackTitle: 'Réalisation',
    problem: 'Le problème',
    objectives: 'Les objectifs',
    solution: 'La solution',
    features: 'Fonctionnalités',
    result: 'Résultat',
    similarTitle: 'Un besoin similaire ?',
    similarBody: 'Parlons de votre projet et construisons la solution adaptée.',
    items: [
      {
        slug: 'objectif-tcf',
        title: 'Objectif TCF',
        headline: 'Une plateforme d’apprentissage avec abonnement',
        description:
          'Une plateforme permettant aux utilisateurs de suivre un parcours personnalisé, s’entraîner, réaliser des simulations et accéder à du contenu selon leur abonnement.',
        image: '/objectif-tcf.png',
        images: [
          '/objectif-tcf.png',
          '/objectif-tcf-dashboard.png',
          '/objectif-tcf-analytics.png',
        ],
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
        result:
          'Parcours candidat clair multi-examens et pilotage métier centralisé pour l’équipe.',
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
        result:
          'Meilleure accessibilité, expérience plus fluide et une base prête à évoluer avec l’activité.',
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
    ],
  },
  difference: {
    kicker: `Pourquoi ${SITE.name}`,
    title: 'Une vision d’ingénieur. Une approche produit.',
    intro: `${SITE.name} ne se contente pas de développer une interface. Nous réfléchissons au fonctionnement global de votre solution : utilisateurs, données, parcours, logique métier, sécurité, évolutivité et maintenance.`,
    items: [
      {
        key: 'understand',
        title: 'Comprendre',
        description: 'Nous commençons par votre besoin métier, pas par la technologie.',
      },
      {
        key: 'design',
        title: 'Concevoir',
        description: 'Nous définissons l’expérience, les fonctionnalités et l’architecture.',
      },
      {
        key: 'build',
        title: 'Construire',
        description: 'Nous développons une solution robuste et adaptée à votre contexte.',
      },
      {
        key: 'evolve',
        title: 'Faire évoluer',
        description: 'Votre solution peut continuer à évoluer avec votre activité.',
      },
    ],
  },
  method: {
    kicker: 'Méthode',
    title: 'De l’idée à la mise en production.',
    steps: [
      {
        number: '01',
        title: 'Découverte',
        description:
          'Compréhension de votre activité, de vos utilisateurs et de votre problématique.',
      },
      {
        number: '02',
        title: 'Conception',
        description: 'Définition des fonctionnalités, parcours et architecture.',
      },
      {
        number: '03',
        title: 'Développement',
        description: 'Construction progressive de la solution.',
      },
      {
        number: '04',
        title: 'Mise en ligne',
        description: 'Déploiement, configuration et accompagnement au lancement.',
      },
      {
        number: '05',
        title: 'Évolution',
        description: 'Maintenance, amélioration et nouvelles fonctionnalités.',
      },
    ],
  },
  why: {
    kicker: 'Ce qui change',
    title: 'Pourquoi travailler avec nous',
    items: [
      {
        key: 'custom',
        title: 'Sur mesure',
        description:
          'Pas de solution générique imposée lorsque votre activité nécessite quelque chose de spécifique.',
      },
      {
        key: 'scale',
        title: 'Pensé pour évoluer',
        description: 'Une solution conçue pour accompagner votre croissance.',
      },
      {
        key: 'contact',
        title: 'Un interlocuteur technique',
        description:
          'Un échange direct avec la personne qui comprend et construit votre solution.',
      },
      {
        key: 'business',
        title: 'Orienté business',
        description: 'La technologie reste au service de vos objectifs.',
      },
    ],
  },
  about: {
    kicker: 'À propos',
    title: 'Une expertise d’ingénieur, avec la flexibilité d’une structure indépendante.',
    photoAlt: `Adams, fondateur de ${SITE.name}`,
    p1: `${SITE.name} est porté par Adams, ingénieur informatique indépendant, et s’appuie sur une approche rigoureuse du développement logiciel pour concevoir des solutions adaptées à chaque projet.`,
    p2: 'Une expertise directement impliquée dans chaque projet : de la compréhension du besoin jusqu’à la mise en production, vous échangez avec la personne qui construit votre solution.',
    p3Before: 'Un appel suffit :',
  },
  form: {
    kicker: 'Démarrer',
    title: 'Vous avez un projet en tête ?',
    intro:
      'Une idée, un besoin métier ou un processus que vous souhaitez digitaliser ? Parlons-en.',
    orCall: 'Ou appelez directement au',
    stepLabel: 'Étape',
    back: 'Retour',
    continue: 'Continuer',
    submit: 'Envoyer mon projet',
    sentTitle: 'Votre client mail est prêt',
    sentBody:
      'Un message prérempli s’ouvre avec les détails de votre projet. Envoyez-le pour que nous puissions vous répondre rapidement.',
    needPlaceholder: 'Décrivez votre idée, votre problème ou le processus à digitaliser…',
    name: 'Nom *',
    email: 'Email *',
    phone: 'Téléphone (optionnel)',
    phoneEmpty: 'Non renseigné',
    mailSubject: `[${SITE.name}] Nouveau projet`,
    mailFields: {
      product: 'Produit',
      need: 'Besoin',
      stage: 'Avancement',
      budget: 'Budget',
      timeline: 'Démarrage',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
    },
    questions: [
      'Que souhaitez-vous construire ?',
      'Quel est votre besoin ?',
      'Où en êtes-vous ?',
      'Quel budget avez-vous prévu ?',
      'Quand souhaitez-vous démarrer ?',
      'Vos coordonnées',
    ],
    products: [
      'Site web',
      'Application métier',
      'Plateforme',
      'E-commerce',
      'Je ne sais pas encore',
    ],
    stages: [
      'Simple idée',
      'Projet défini',
      'Cahier des charges existant',
      'Solution existante à améliorer',
    ],
    budgets: ['< 2 000 €', '2 000 – 5 000 €', '5 000 – 10 000 €', '10 000 – 20 000 €', '20 000 €+'],
    timelines: ['Dès que possible', 'Dans 1–3 mois', 'Dans 3–6 mois', 'Plus tard'],
  },
  footer: {
    blurb: 'Sites, applications métier et plateformes digitales sur mesure.',
    rights: 'Tous droits réservés.',
  },
} as const
