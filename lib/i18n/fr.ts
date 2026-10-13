import { SITE } from '@/lib/site'

export const fr = {
  meta: {
    title: `${SITE.name} — Création de site internet et application sur mesure`,
    description:
      'Sites internet et applications sur mesure : visibles sur Google, avec réservation et paiement en ligne. Accompagnement de A à Z, 1er mois de maintenance offert.',
    keywords: [
      'Flow',
      'flowsurmesure',
      'création site internet',
      'création site web sur mesure',
      'site internet pour artisan',
      'site avec réservation en ligne',
      'application métier sur mesure',
      'développement application web',
      'refonte site internet',
      'plateforme digitale',
      'développeur freelance',
    ],
    ogTitle: `${SITE.name} — Sites internet et applications sur mesure`,
    ogDescription:
      'On vous accompagne, de l’idée à la mise en ligne : un site qui vous amène des clients, une application pensée pour votre façon de travailler. 1er mois de maintenance offert.',
  },
  nav: {
    cta: 'Parler de mon projet',
    ctaHref: '/#projet',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    breadcrumb: 'Fil d’Ariane',
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
    h1: `${SITE.name} — Création de sites internet et d’applications sur mesure`,
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
    also: 'Voir aussi',
    items: [
      {
        slug: 'site-web',
        number: '01',
        title: 'Sites web',
        h1: 'Création de site internet sur mesure',
        headline: 'Votre présence digitale devient un véritable outil commercial.',
        seoDescription:
          'Création de site internet sur mesure : vitrine, réservation et paiement en ligne, pensé pour être trouvé sur Google. De l’idée à la mise en ligne.',
        body: [
          'Votre site doit faire plus que présenter votre activité : il doit amener le visiteur à vous écrire, réserver ou payer, sans friction.',
          'Nous cadrons le parcours, puis nous le construisons sur mesure — administration, plusieurs langues, référencement — et nous le mettons en ligne. Le premier mois de maintenance est offert.',
        ],
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
        h1: 'Application métier sur mesure',
        headline: 'Digitalisez votre façon de travailler.',
        seoDescription:
          'Application métier sur mesure : espace client, back-office et automatisation de vos processus. Un interlocuteur technique, jusqu’à la mise en production.',
        body: [
          'Quand les tableurs, les emails et les formulaires ralentissent l’équipe, une application métier reprend le processus tel que vous travaillez vraiment.',
          'Espace client, tableaux de bord, workflows et connexions à vos outils : vous échangez avec la personne qui conçoit et développe la solution, jusqu’à la mise en production.',
        ],
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
        h1: 'Plateforme digitale sur mesure',
        headline: 'Construisez votre propre produit digital.',
        seoDescription:
          'Plateforme digitale sur mesure : SaaS, marketplace ou e-learning, avec comptes, abonnement et paiement. Conçue pour évoluer avec votre activité.',
        body: [
          'Une plateforme, c’est votre produit : des comptes, un parcours, souvent un abonnement. Elle doit tenir quand l’usage grandit.',
          'Nous la concevons pour vos utilisateurs et pour vous : rôles, paiement, contenu et administration, sur une base prête à évoluer.',
        ],
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
    related: 'Ce type de solution',
    items: [
      {
        slug: 'objectif-tcf',
        title: 'Objectif TCF',
        headline: 'Une plateforme d’apprentissage avec abonnement',
        seoDescription:
          'Plateforme d’apprentissage Objectif TCF : parcours personnalisé, simulations d’examen, abonnement et back-office. Une réalisation Flow.',
        relatedService: 'plateforme-web',
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
        seoDescription:
          'Plateforme B2B de formation pour BAI Consulting : site public, espace apprenant et administration multi-rôles. Une réalisation Flow.',
        relatedService: 'plateforme-web',
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
        seoDescription:
          'Réservation et paiement en ligne pour Drivin & Chill : parcours mobile, paiement Stripe et QR code. Une réalisation Flow.',
        relatedService: 'site-web',
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
    founderName: 'Adams',
    jobTitle: 'Ingénieur informatique indépendant',
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
    submitting: 'Envoi en cours…',
    sentTitle: 'Message bien reçu',
    sentBody:
      'Merci. Nous revenons vers vous sous 24–48 h ouvrées. Un accusé de réception vous a aussi été envoyé par email.',
    errorTitle: 'Envoi impossible',
    errorBody:
      'Une erreur est survenue. Réessayez dans un instant, ou écrivez-nous directement.',
    errorRetry: 'Réessayer',
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
  faq: {
    label: 'Questions fréquentes',
    title: 'FAQ — création de site et application sur mesure',
    h1: 'Questions fréquentes',
    intro:
      'Ce que fait Flow, comment se passe un projet, et comment le démarrer — avant même le premier appel.',
    description:
      'Création de site internet, application métier ou plateforme : ce que fait Flow, comment se déroule un projet, et comment démarrer.',
    items: [
      {
        q: 'Que construit Flow ?',
        a: 'Flow conçoit des sites internet, des applications métier et des plateformes digitales sur mesure, de la compréhension du besoin jusqu’à la mise en production.',
      },
      {
        q: 'À qui s’adresse Flow ?',
        a: 'Aux entreprises dont l’activité évolue : vous avez une idée de produit, des processus trop manuels, un site qui ne suffit plus, ou vous cherchez un partenaire technique.',
      },
      {
        q: 'En quoi est-ce différent d’un modèle prêt à l’emploi ?',
        a: 'Rien n’est imposé quand votre activité demande quelque chose de spécifique. Le parcours, les données et la logique métier sont conçus pour votre façon de travailler.',
      },
      {
        q: 'Le site sera-t-il trouvable sur Google ?',
        a: 'Le référencement fait partie du site : titres, pages et structure sont pensés pour être compris par Google. La position exacte dépend de Google et de votre marché.',
      },
      {
        q: 'Peut-on réserver ou payer en ligne ?',
        a: 'Oui. La réservation, le paiement et les espaces clients font partie des sites et des applications que nous mettons en place.',
      },
      {
        q: 'Qui réalise le projet ?',
        a: 'Adams, ingénieur informatique, est impliqué sur chaque projet. Vous échangez avec la personne qui conçoit et développe votre solution.',
      },
      {
        q: 'Y a-t-il une maintenance après la mise en ligne ?',
        a: 'Le premier mois de maintenance est offert. La solution est ensuite pensée pour évoluer avec votre activité.',
      },
      {
        q: 'Comment démarrer ?',
        a: `Décrivez votre besoin dans le formulaire, ou appelez le ${SITE.phoneDisplay}. Nous revenons vers vous sous 24 à 48 h ouvrées. Une idée suffit : un cahier des charges n’est pas nécessaire.`,
      },
    ],
  },
  footer: {
    blurb: 'Sites, applications métier et plateformes digitales sur mesure.',
    rights: 'Tous droits réservés.',
    explore: 'Explorer',
    links: [
      { label: 'Sites web', href: '/services/site-web' },
      { label: 'Applications métier', href: '/services/application-web' },
      { label: 'Plateformes digitales', href: '/services/plateforme-web' },
      { label: 'Questions fréquentes', href: '/faq' },
    ],
  },
} as const
