import { SITE } from '@/lib/site'
import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: `${SITE.name} — Custom digital solutions`,
    description:
      'Flow designs and builds custom websites, business apps and digital platforms to turn your ideas and processes into working products.',
    keywords: [
      'Flow',
      'custom website',
      'business application',
      'digital platform',
      'web development',
      'Next.js',
    ],
    ogTitle: `${SITE.name} — Build digital. Make it flow.`,
    ogDescription:
      'Websites, business apps and digital platforms built to move your activity forward.',
  },
  nav: {
    cta: 'Talk about my project',
    ctaHref: '/#projet',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    links: [
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Work', href: '/#realisations' },
      { label: 'Method', href: '/#methode' },
      { label: 'About', href: '/#apropos' },
    ],
  },
  language: {
    label: 'Language',
    switchTo: {
      fr: 'Passer en français',
      en: 'Switch to English',
    },
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    light: 'Light theme',
    dark: 'Dark theme',
  },
  hero: {
    lead: 'We design custom digital solutions to simplify your processes, improve customer journeys and grow your business.',
    secondaryCta: 'See our work',
    underCta: ['Website', 'Business app', 'Platform', 'Automation'],
  },
  problems: {
    kicker: 'Your context',
    title: 'Your activity is evolving. Your tools should too.',
    intro: 'Your company is growing, but your tools are becoming too limited?',
    closing: `${SITE.name} turns these needs into concrete digital solutions.`,
    items: [
      {
        key: 'idea',
        title: 'You have an idea',
        description: 'You want to launch a platform, a service or a new digital product.',
      },
      {
        key: 'manual',
        title: 'Your processes are too manual',
        description: 'Spreadsheets, emails, forms and repetitive tasks are slowing you down.',
      },
      {
        key: 'site',
        title: 'Your website is no longer enough',
        description:
          'You need a client area, payments, bookings or a real operational tool.',
      },
      {
        key: 'partner',
        title: 'You need a technical partner',
        description:
          'You want someone who can design and build the solution end to end.',
      },
    ],
  },
  offers: {
    kicker: 'Solutions',
    title: 'Three entry points. One standard: a solution that fits.',
    unsureTitle: 'Not sure exactly what you need?',
    unsureBody:
      'Describe your idea, your problem or your process. We will help you choose the right solution.',
  },
  services: {
    label: 'Solution',
    back: 'All solutions',
    for: 'For:',
    readyTitle: 'Ready to move forward?',
    readyBody: 'Describe your need: we will help you frame the most suitable solution.',
    fallbackTitle: 'Service',
    items: [
      {
        slug: 'site-web',
        number: '01',
        title: 'Websites',
        headline: 'Your digital presence becomes a real commercial tool.',
        cta: 'Build my website',
        items: [
          'Corporate websites',
          'Showcase sites',
          'Landing pages',
          'Institutional sites',
          'Sites with admin',
          'SEO',
          'Booking',
          'Payments',
          'Multilingual',
        ],
      },
      {
        slug: 'application-web',
        number: '02',
        title: 'Business apps',
        headline: 'Digitize the way you work.',
        cta: 'Transform my process',
        items: [
          'Client portals',
          'Back-office',
          'User management',
          'Workflows',
          'Dashboards',
          'Automation',
          'Document management',
          'Internal tools',
          'API integrations',
        ],
      },
      {
        slug: 'plateforme-web',
        number: '03',
        title: 'Digital platforms',
        headline: 'Build your own digital product.',
        cta: 'Build my platform',
        items: [
          'SaaS',
          'Marketplaces',
          'Subscription platforms',
          'E-learning',
          'Booking',
          'B2B platforms',
          'Multi-user platforms',
        ],
      },
    ],
  },
  realisations: {
    kicker: 'Work',
    title: 'Concrete proof, not just a gallery.',
    intro:
      'Each project demonstrates a precise skill: product, journey, monetization or operational tooling.',
    viewProject: 'View project',
    viewSite: 'View website',
    label: 'Case study',
    back: 'Back to work',
    fallbackTitle: 'Work',
    problem: 'The problem',
    objectives: 'Objectives',
    solution: 'The solution',
    features: 'Features',
    result: 'Result',
    similarTitle: 'A similar need?',
    similarBody: 'Let’s talk about your project and build the right solution.',
    items: [
      {
        slug: 'objectif-tcf',
        title: 'Objectif TCF',
        headline: 'A learning platform with subscriptions',
        description:
          'A platform where users follow a personalised path, train, take mock exams and access content based on their subscription.',
        image: '/objectif-tcf.png',
        images: [
          '/objectif-tcf.png',
          '/objectif-tcf-dashboard.png',
          '/objectif-tcf-analytics.png',
        ],
        alt: 'Objectif TCF platform',
        tags: ['Subscription', 'Payments', 'AI', 'E-learning', 'Access control'],
        siteLink: 'https://objectif-tcf-blue.vercel.app/',
        githubLink: 'https://github.com/adams598/objectif_tcf',
        problem:
          'Deliver complete preparation for TCF, TEF and IELTS exams, with subscription tracking and admin tools.',
        objectives: [
          'Multi-exam candidate journeys',
          'Subscription-based monetization',
          'Business operations via back-office',
        ],
        solution:
          'An immersive web platform (simulations, feedback) and a back-office for offers, payments, users, exams, series and analytics.',
        features: [
          'Exam simulations',
          'Subscriptions and payments',
          'Admin dashboard',
          'Series and examiner management',
          'Activity and revenue analytics',
        ],
        result:
          'A clear multi-exam candidate journey and centralised operations for the team.',
      },
      {
        slug: 'bai-consulting',
        title: 'BAI Consulting & Formation',
        headline: 'A multi-role B2B platform',
        description:
          'Public site, learner space and administration in one solution, with differentiated user and organisation management.',
        image: '/bai-project-2.png',
        alt: 'BAI Formation Consulting platform',
        tags: ['B2B', 'Role management', 'E-learning', 'Administration'],
        siteLink: 'https://bai-consultingetformation.com/',
        githubLink: 'https://github.com/adams598/bai-consulting-et-formation',
        problem: 'Modernise banking training and make learning paths more digital.',
        objectives: [
          'Digitize team training',
          'Centralise administration',
          'Separate public / learner / admin spaces',
        ],
        solution:
          'A complete e-learning platform, with an admin dashboard and journeys tailored to teams.',
        features: [
          'Public website',
          'Learner space',
          'Multi-role administration',
          'Training journeys',
        ],
        result:
          'Better access, a smoother experience and a foundation ready to grow with the business.',
      },
      {
        slug: 'drivin-chill',
        title: 'Drivin & Chill',
        headline: 'An online booking and payment experience',
        description:
          'Booking, Stripe payments and QR code generation in a journey designed for the end customer.',
        image: '/drivinchill.png',
        alt: 'DrivinChill booking app',
        tags: ['Booking', 'Stripe', 'QR Code', 'Payments'],
        siteLink: 'https://drivinnchill.fr/',
        githubLink: 'https://github.com/adams598/drivin-chill',
        problem: 'Simplify booking and deliver a smooth mobile experience.',
        objectives: [
          'Reduce booking friction',
          'Secure payments',
          'Simplify access control with QR codes',
        ],
        solution:
          'A fast booking flow, a payment system and a mobile-first interface.',
        features: ['Online booking', 'Stripe payments', 'QR codes', 'Dashboard'],
        result: 'Less user friction and a stronger digital brand.',
      },
    ],
  },
  difference: {
    kicker: `Why ${SITE.name}`,
    title: 'An engineer’s vision. A product approach.',
    intro: `${SITE.name} does more than ship an interface. We think through the whole system: users, data, journeys, business logic, security, scalability and maintenance.`,
    items: [
      {
        key: 'understand',
        title: 'Understand',
        description: 'We start from your business need, not from the technology.',
      },
      {
        key: 'design',
        title: 'Design',
        description: 'We define the experience, the features and the architecture.',
      },
      {
        key: 'build',
        title: 'Build',
        description: 'We develop a robust solution that fits your context.',
      },
      {
        key: 'evolve',
        title: 'Evolve',
        description: 'Your solution can keep growing with your activity.',
      },
    ],
  },
  method: {
    kicker: 'Method',
    title: 'From idea to production.',
    steps: [
      {
        number: '01',
        title: 'Discovery',
        description: 'Understanding your activity, your users and the problem to solve.',
      },
      {
        number: '02',
        title: 'Design',
        description: 'Defining features, journeys and architecture.',
      },
      {
        number: '03',
        title: 'Development',
        description: 'Building the solution step by step.',
      },
      {
        number: '04',
        title: 'Launch',
        description: 'Deployment, setup and support at go-live.',
      },
      {
        number: '05',
        title: 'Evolution',
        description: 'Maintenance, improvements and new features.',
      },
    ],
  },
  why: {
    kicker: 'What changes',
    title: 'Why work with us',
    items: [
      {
        key: 'custom',
        title: 'Custom-built',
        description:
          'No generic product forced on you when your activity needs something specific.',
      },
      {
        key: 'scale',
        title: 'Built to evolve',
        description: 'A solution designed to support your growth.',
      },
      {
        key: 'contact',
        title: 'A technical counterpart',
        description:
          'You talk directly with the person who understands and builds your solution.',
      },
      {
        key: 'business',
        title: 'Business-first',
        description: 'Technology stays in service of your goals.',
      },
    ],
  },
  about: {
    kicker: 'About',
    title: 'Engineering expertise, with the flexibility of an independent structure.',
    photoAlt: `Adams, founder of ${SITE.name}`,
    p1: `${SITE.name} is led by Adams, an independent software engineer, and relies on a rigorous approach to software development to design solutions that fit each project.`,
    p2: 'Expertise involved in every project: from understanding the need to production, you talk with the person building your solution.',
    p3Before: 'A call is enough:',
  },
  form: {
    kicker: 'Get started',
    title: 'Have a project in mind?',
    intro: 'An idea, a business need or a process you want to digitize? Let’s talk.',
    orCall: 'Or call directly at',
    stepLabel: 'Step',
    back: 'Back',
    continue: 'Continue',
    submit: 'Send my project',
    submitting: 'Sending…',
    sentTitle: 'Message received',
    sentBody:
      'Thank you. We will get back to you within 1–2 business days. A confirmation email has also been sent.',
    errorTitle: 'Could not send',
    errorBody: 'Something went wrong. Please try again in a moment, or email us directly.',
    errorRetry: 'Try again',
    needPlaceholder: 'Describe your idea, your problem or the process to digitize…',
    name: 'Name *',
    email: 'Email *',
    phone: 'Phone (optional)',
    phoneEmpty: 'Not provided',
    mailSubject: `[${SITE.name}] New project`,
    mailFields: {
      product: 'Product',
      need: 'Need',
      stage: 'Stage',
      budget: 'Budget',
      timeline: 'Start',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
    },
    questions: [
      'What do you want to build?',
      'What is your need?',
      'Where do you stand?',
      'What budget do you have in mind?',
      'When would you like to start?',
      'Your details',
    ],
    products: [
      'Website',
      'Business app',
      'Platform',
      'E-commerce',
      'I don’t know yet',
    ],
    stages: [
      'Just an idea',
      'Defined project',
      'Existing specifications',
      'Existing solution to improve',
    ],
    budgets: ['< €2,000', '€2,000 – €5,000', '€5,000 – €10,000', '€10,000 – €20,000', '€20,000+'],
    timelines: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Later'],
  },
  footer: {
    blurb: 'Custom websites, business apps and digital platforms.',
    rights: 'All rights reserved.',
  },
}
