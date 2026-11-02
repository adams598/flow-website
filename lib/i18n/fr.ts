import { SITE } from '@/lib/site'

export const fr = {
  meta: {
    title: `${SITE.name} — Création de site internet à Limoges`,
    description:
      'Sites, applications et agents IA sur mesure à Limoges, en Haute-Vienne. Visibles sur Google, avec réservation et paiement. Premier mois de maintenance offert.',
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
      'agent IA sur mesure',
      'agent IA entreprise',
      'création site internet Limoges',
      'développeur web Limoges',
    ],
    ogTitle: `${SITE.name} — Sites sur mesure à Limoges`,
    ogDescription:
      'Sites, applications et agents IA sur mesure à Limoges. De l’idée à la mise en ligne. Premier mois de maintenance offert.',
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
    lead: 'Nous concevons des solutions digitales sur mesure pour simplifier vos processus, améliorer vos parcours clients et développer votre activité. À Limoges, ou à distance.',
    secondaryCta: 'Voir les réalisations',
    underCta: ['Site web', 'Application métier', 'Plateforme', 'Agents IA'],
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
    title: 'Quatre portes d’entrée. Une même exigence : une solution adaptée.',
    unsureTitle: 'Vous ne savez pas exactement ce dont vous avez besoin ?',
    unsureBody:
      'Décrivez-nous votre idée, votre problème ou votre processus. Nous vous aiderons à déterminer la solution la plus adaptée.',
    start: {
      kicker: 'Comment démarrer',
      title: 'Commencer petit, au juste prix.',
      intro:
        'On part de votre problème, pas d’un catalogue. Chaque projet commence par un diagnostic offert, puis la formule la plus légère qui règle le problème.',
      steps: [
        {
          name: 'Diagnostic',
          price: 'Offert',
          detail: '20 à 30 minutes, sur place à Limoges ou en visio',
          description:
            'Vous nous dites ce qui vous fait perdre du temps ou des clients. Vous recevez une page : la solution recommandée et son prix.',
        },
        {
          name: 'Express',
          price: 'Dès 490 €',
          detail: 'Prêt en une semaine, à prix fixe',
          description:
            'Un problème réglé : réservation avec acompte, inscription et paiement, commande en ligne, calendrier à jour, site vitrine refait ou une tâche administrative automatisée.',
        },
        {
          name: 'Sur mesure',
          price: 'Sur devis, par lots',
          detail: '2 à 10 semaines',
          description:
            'Application métier, espace client, plateforme ou agent IA, construit par étapes. Une démo avant de signer, un prix ferme pour chaque lot.',
        },
        {
          name: 'Suivi',
          price: 'Dès 29 € / mois',
          detail: 'Facultatif, premier mois offert',
          description:
            'Hébergement, sauvegardes, sécurité et petites corrections, sans engagement. Les évolutions se chiffrent à part.',
        },
      ],
      ownership:
        'Sans abonnement obligatoire : vous restez propriétaire de ce que nous construisons, code et données compris.',
      cta: 'Demander mon diagnostic offert',
    },
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
    tiersTitle: 'Trois façons de commencer',
    tiersNote:
      'Ces montants cadrent le premier jet, pas un devis ferme. Après la mise en route, l’usage des modèles et le suivi se chiffrent à part, en général quelques centaines d’euros par mois.',
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
        sections: [
          {
            title: 'Pour qui',
            paragraphs: [
              'Pour une activité qui doit être trouvée et contactée : artisan, cabinet, commerce, formation, organisme. Vous n’avez pas encore de site, ou celui que vous avez ne transforme pas les visites en demandes.',
            ],
          },
          {
            title: 'Ce que votre site fait',
            paragraphs: [
              'Il présente votre activité avec vos mots, puis il fait avancer le visiteur : écrire, réserver ou payer. Les titres et les pages sont écrits pour vos clients, et pour être compris par Google.',
              'Selon le besoin : administration, plusieurs langues, réservation, paiement. Rien n’est imposé quand votre activité demande autre chose qu’un modèle prêt à l’emploi.',
            ],
          },
          {
            title: 'Comment ça se passe',
            paragraphs: [
              'On cadre le parcours ensemble, on le construit, on le met en ligne. Vous échangez avec la personne qui développe. Le premier mois de maintenance est offert.',
            ],
          },
        ],
        example: {
          slug: 'drivin-chill',
          text: 'Réservation et paiement en ligne pour Drivin & Chill',
        },
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
        sections: [
          {
            title: 'Pour qui',
            paragraphs: [
              'Pour une équipe dont le travail passe encore par Excel, les emails et les formulaires. Vous voulez un outil qui suit votre façon de faire, pas l’inverse.',
            ],
          },
          {
            title: 'Ce que l’application remplace',
            paragraphs: [
              'Les fichiers qui circulent, les relances oubliées, les informations éparpillées. L’application centralise le parcours : espace client, back-office, droits d’accès, tableaux de bord.',
              'Elle se connecte à ce que vous utilisez déjà quand c’est utile. Vous gardez un interlocuteur technique, de la compréhension du besoin jusqu’à la mise en production.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'Espace apprenant et administration pour BAI Consulting & Formation',
        },
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
        sections: [
          {
            title: 'Pour qui',
            paragraphs: [
              'Vous voulez lancer un produit : formation en ligne, abonnement, mise en relation, outil utilisé par plusieurs types de comptes. Ce n’est plus un site vitrine, c’est le service lui-même.',
            ],
          },
          {
            title: 'Ce que la plateforme porte',
            paragraphs: [
              'Des comptes, des rôles, un parcours, souvent un paiement ou un abonnement. L’administration vous permet de piloter offres, utilisateurs et contenu sans dépendre d’un tableur à côté.',
              'Elle est conçue pour évoluer quand les usages grandissent, pas pour être refaite à la première nouvelle idée.',
            ],
          },
        ],
        example: {
          slug: 'objectif-tcf',
          text: 'Plateforme d’abonnement et de simulations pour Objectif TCF',
        },
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
      {
        slug: 'agents-ia',
        number: '04',
        title: 'Agents IA',
        h1: 'Agents IA sur mesure',
        headline: 'Un agent qui avance le travail, avec vos règles.',
        seoDescription:
          'Agents IA sur mesure : un assistant sur vos contenus, un agent connecté à vos outils, ou plusieurs agents sur un processus. Fourchettes indicatives, devis après un appel.',
        body: [
          'Vos équipes répondent aux mêmes questions, relancent à la main, ou cherchent l’information dans plusieurs outils. Un agent reprend cette part du travail.',
          'Il est cadré sur ce qu’il a le droit de faire. Quand la demande est sensible ou qu’il ne sait pas, il passe la main. Les montants ci-dessous cadrent le premier jet : le devis vient après un appel.',
        ],
        sections: [
          {
            title: 'Pour qui',
            paragraphs: [
              'Pour une activité où le même geste revient : répondre, qualifier, relancer, classer, préparer un dossier, mettre à jour un outil. Vous voulez que ça parte, sans lâcher la relation ni les décisions qui engagent.',
            ],
          },
          {
            title: 'Ce que l’agent fait',
            paragraphs: [
              'Il répond à partir de vos contenus, prépare une action, ou l’exécute dans les outils que vous utilisez déjà. Il ne se fait pas passer pour vous.',
              'Deux agents qui portent le même nom n’ont pas le même coût. Un assistant sur votre FAQ n’a rien à voir avec un agent qui met à jour un dossier et envoie une relance. On cadre d’abord ce qu’il fait seul.',
            ],
          },
          {
            title: 'Comment ça se passe',
            paragraphs: [
              'Un appel pour décrire le processus. On choisit le niveau, on le construit, on le met entre les mains de l’équipe. Vous échangez avec la personne qui le développe.',
            ],
          },
        ],
        example: {
          slug: '',
          text: '',
        },
        cta: 'Cadrer mon agent',
        items: [
          'Réponses à partir de vos contenus',
          'Qualification et relances',
          'Tri des demandes',
          'Recherche dans vos documents',
          'Mise à jour de vos outils',
          'Passage à une personne',
        ],
        tiers: [
          {
            name: 'Assistant',
            range: '1 500 – 4 000 €',
            summary:
              'Il répond à partir de vos contenus, avec votre ton. Il oriente, et il passe la main dès qu’il ne sait pas.',
            points: [
              'Vos pages, une FAQ ou vos documents',
              'Un canal : le site ou un outil interne',
              'Les limites de ce qu’il peut dire',
              'Passage à une personne',
            ],
          },
          {
            name: 'Agent métier',
            range: '4 000 – 9 000 €',
            summary:
              'Il suit un processus qui se répète : relances, qualification, tri, préparation d’un dossier. Ce qui engage reste validé par quelqu’un.',
            points: [
              'Un processus, pas toute l’entreprise',
              'Connexion à vos outils : mails, dossiers, agenda, CRM',
              'Ce qu’il fait seul, et ce qu’il vous soumet',
              'Une trace de ce qu’il a fait',
            ],
          },
          {
            name: 'Équipe d’agents',
            range: '9 000 – 20 000 €',
            summary:
              'Plusieurs agents se répartissent un parcours : comprendre, chercher, préparer, agir. Un humain reste sur les cas sensibles. Au-delà de 20 000 € si le processus l’exige.',
            points: [
              'Plusieurs rôles sur un même processus',
              'Vos sources et vos outils',
              'Validation humaine aux étapes qui engagent',
              'Un cadre pour le faire évoluer',
            ],
          },
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
    viewCode: 'Voir le code',
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
        siteLink: 'https://objectif-tcf.org/',
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
        siteLink: '',
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
    p1: `${SITE.name} est porté par Adams, ingénieur informatique indépendant, basé à Limoges, en Haute-Vienne. La même exigence sur chaque projet : une solution adaptée.`,
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
      'Agent IA',
      'E-commerce',
      'Je ne sais pas encore',
    ],
    stages: [
      'Simple idée',
      'Projet défini',
      'Cahier des charges existant',
      'Solution existante à améliorer',
    ],
    budgets: ['< 1 000 €', '1 000 – 2 000 €', '2 000 – 5 000 €', '5 000 – 10 000 €', '10 000 – 20 000 €', '20 000 €+'],
    timelines: ['Dès que possible', 'Dans 1–3 mois', 'Dans 3–6 mois', 'Plus tard'],
  },
  guides: {
    label: 'Guides',
    items: [
      {
        slug: 'reservation-paiement',
        title: 'Réservation et paiement en ligne',
        h1: 'Site internet avec réservation et paiement en ligne',
        seoDescription:
          'Un site qui prend les réservations et les paiements, sans aller-retour par email. Parcours mobile, paiement sécurisé, et le premier mois de maintenance offert.',
        intro:
          'Vos clients veulent réserver et payer quand ils y pensent, pas après un échange d’emails. Le site devient le parcours, du choix jusqu’au paiement.',
        related: ['site-web'],
        sections: [
          {
            title: 'Ce que le visiteur fait',
            paragraphs: [
              'Il choisit un créneau ou une offre, paie, et reçoit une confirmation. De votre côté, la réservation est enregistrée : plus de double saisie, plus de créneau vendu deux fois.',
            ],
          },
          {
            title: 'Ce qu’on met en place',
            paragraphs: [
              'Le parcours, le paiement, et si besoin un QR code ou un tableau de bord pour suivre les réservations. Le tout est pensé d’abord pour le téléphone, là où la décision se prend.',
              'C’est le type de site réalisé pour Drivin & Chill : réservation, paiement et contrôle d’accès dans un même parcours.',
            ],
          },
        ],
        example: {
          slug: 'drivin-chill',
          text: 'Voir la réalisation Drivin & Chill',
        },
      },
      {
        slug: 'refonte-site',
        title: 'Refonte de site internet',
        h1: 'Refonte de site internet',
        seoDescription:
          'Votre site ne vous amène plus de demandes. On le refond pour qu’il présente votre activité et fasse avancer le visiteur : contact, réservation ou paiement.',
        intro:
          'Un site qui existe déjà mais qui ne travaille plus pour vous : pages floues, parcours cassé, rien qui ne se passe après la visite. La refonte reprend ce qui est juste, et remplace ce qui bloque.',
        related: ['site-web'],
        sections: [
          {
            title: 'Quand une refonte est le bon geste',
            paragraphs: [
              'Les gens ne comprennent pas ce que vous faites, le téléphone ne sonne pas, ou vous ne pouvez pas ajouter une réservation, un paiement, un espace client. Reprendre le même modèle en changeant les couleurs ne règle pas ça.',
            ],
          },
          {
            title: 'Ce qu’on garde, ce qu’on change',
            paragraphs: [
              'On part de votre activité d’aujourd’hui : ce que le visiteur doit comprendre, et l’action qu’il doit pouvoir faire. Le référencement est repris dans les titres et la structure, pour ne pas disparaître de Google au moment de la bascule.',
              'Vous échangez avec la personne qui construit le nouveau site. Le premier mois de maintenance est offert après la mise en ligne.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'Voir la réalisation BAI Consulting & Formation',
        },
      },
      {
        slug: 'site-ou-application',
        title: 'Site ou application',
        h1: 'Site vitrine ou application métier',
        seoDescription:
          'Un site présente et fait agir le visiteur. Une application métier reprend le travail de l’équipe. On vous aide à choisir avant de construire.',
        intro:
          'Les deux se ressemblent de l’extérieur. La différence est simple : le site sert vos clients qui arrivent. L’application sert votre équipe, ou vos clients une fois qu’ils ont un compte.',
        related: ['site-web', 'application-web'],
        sections: [
          {
            title: 'Choisissez le site si',
            paragraphs: [
              'Vous devez être trouvé, expliquer votre activité, et recevoir une demande, une réservation ou un paiement. C’est la porte d’entrée. Elle peut suffire longtemps.',
            ],
          },
          {
            title: 'Choisissez l’application si',
            paragraphs: [
              'Le travail quotidien est le sujet : dossiers, validations, espaces clients, tableaux de bord. Un site vitrine ne rangera pas ça. L’application reprend le processus tel que vous le faites.',
            ],
          },
          {
            title: 'Si vous hésitez',
            paragraphs: [
              'Décrivez le problème, pas l’outil. Un appel suffit pour dire si vous avez besoin d’une vitrine, d’un outil interne, ou des deux. Rien n’oblige à tout construire d’un coup.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'Voir un cas qui mêle site public et espace apprenant',
        },
      },
    ],
  },
  places: {
    label: 'Villes',
    items: [
      {
        slug: 'limoges',
        city: 'Limoges',
        region: 'Haute-Vienne',
        title: 'Limoges',
        h1: 'Création de site internet à Limoges',
        seoDescription:
          'Création de site internet, application métier et agent IA à Limoges. Adams, ingénieur basé en Haute-Vienne, conçoit la solution et la met en ligne. Premier mois de maintenance offert.',
        intro:
          'Flow est à Limoges. Pour une activité de la Haute-Vienne qui doit être trouvée, qui veut prendre des réservations, ou dont le travail passe encore par les mails et les tableurs.',
        related: ['site-web', 'application-web', 'agents-ia'],
        sections: [
          {
            title: 'Pour une activité de Limoges',
            paragraphs: [
              'Artisan, cabinet, commerce, formation, TPE : le besoin est souvent le même. On vous cherche sur Google, le site ne donne pas envie d’appeler, ou la réservation se fait encore par message.',
              'Le site est écrit pour vos clients de Limoges et de l’agglomération, et pour être compris par Google. Le titre, les pages et le parcours disent ce que vous faites, puis ils font avancer le visiteur : écrire, réserver ou payer.',
            ],
          },
          {
            title: 'Ce qu’on construit sur place',
            paragraphs: [
              'Un site, une application métier, une plateforme, ou un agent IA branché sur vos outils. Rien n’est imposé quand votre façon de travailler ne rentre pas dans un modèle.',
              'Adams est basé à Limoges. On peut se voir pour cadrer le besoin, puis le projet avance avec la personne qui le développe, jusqu’à la mise en ligne. Le premier mois de maintenance est offert.',
            ],
          },
          {
            title: 'Comment démarrer à Limoges',
            paragraphs: [
              'Décrivez l’activité et ce qui bloque aujourd’hui : pas assez de demandes, un parcours de réservation trop long, une équipe qui ressaisit les mêmes informations. Un cahier des charges n’est pas nécessaire.',
              `Un appel au ${SITE.phoneDisplay} suffit. On cadre ensemble si vous avez besoin d’un site, d’un outil interne, d’un agent, ou des deux.`,
            ],
          },
        ],
      },
    ],
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
        a: 'Flow conçoit des sites internet, des applications métier, des plateformes digitales et des agents IA sur mesure, de la compréhension du besoin jusqu’à la mise en production.',
      },
      {
        q: 'Combien coûte un projet ?',
        a: 'Tout commence par un diagnostic offert. Une formule Express, qui règle un problème précis à prix fixe, coûte de 490 à 990 € et elle est prête en une semaine. Un projet sur mesure se chiffre par lots après le diagnostic, avec une démo avant de signer. Il n’y a pas d’abonnement obligatoire : vous restez propriétaire de ce qui est construit, et le suivi est facultatif, à partir de 29 € par mois.',
      },
      {
        q: 'Combien coûte un agent IA ?',
        a: 'Trois niveaux, en indicatif : un assistant sur vos contenus, de 1 500 à 4 000 € ; un agent métier connecté à vos outils, de 4 000 à 9 000 € ; une équipe d’agents sur un processus, de 9 000 à 20 000 €, et au-delà si le périmètre l’exige. Ce n’est pas un devis. L’usage des modèles et le suivi se chiffrent à part. Un appel suffit pour cadrer le vôtre.',
      },
      {
        q: 'À qui s’adresse Flow ?',
        a: 'Aux entreprises dont l’activité évolue : vous avez une idée de produit, des processus trop manuels, un site qui ne suffit plus, ou vous cherchez un partenaire technique.',
      },
      {
        q: 'Où intervient Flow ?',
        a: 'Flow est à Limoges, en Haute-Vienne. Le projet se fait sur place ou à distance, ailleurs en France. Un appel suffit pour cadrer.',
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
    blurb: 'Sites, applications et agents IA sur mesure, à Limoges.',
    rights: 'Tous droits réservés.',
    explore: 'Explorer',
    links: [
      { label: 'Sites web', href: '/services/site-web' },
      { label: 'Applications métier', href: '/services/application-web' },
      { label: 'Plateformes digitales', href: '/services/plateforme-web' },
      { label: 'Agents IA', href: '/services/agents-ia' },
      { label: 'Réservation et paiement', href: '/guides/reservation-paiement' },
      { label: 'Refonte de site', href: '/guides/refonte-site' },
      { label: 'Site ou application', href: '/guides/site-ou-application' },
      { label: 'Limoges', href: '/villes/limoges' },
      { label: 'Questions fréquentes', href: '/faq' },
    ],
  },
} as const
