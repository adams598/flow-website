import { SITE } from '@/lib/site'
import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: `${SITE.name} — Custom websites and business applications`,
    description:
      'Custom websites and business applications: found on Google, with online booking and payment. End-to-end support and the first month of maintenance included.',
    keywords: [
      'Flow',
      'custom website',
      'business application',
      'digital platform',
      'web development',
      'Next.js',
    ],
    ogTitle: `${SITE.name} — Custom websites and business applications`,
    ogDescription:
      'We support you from idea to launch: a website that brings you customers, an app built around the way you work. First month of maintenance included.',
  },
  nav: {
    cta: 'Talk about my project',
    ctaHref: '/#projet',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    breadcrumb: 'Breadcrumb',
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
    h1: `${SITE.name} — Custom websites and business applications`,
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
    also: 'See also',
    items: [
      {
        slug: 'site-web',
        number: '01',
        title: 'Websites',
        h1: 'Custom website design',
        headline: 'Your digital presence becomes a real commercial tool.',
        seoDescription:
          'Custom website design: showcase, online booking and payment, built to be found on Google. From the idea through to launch.',
        body: [
          'Your website should do more than present your activity: it should bring visitors to write to you, book or pay, without friction.',
          'We frame the journey, then build it for you — admin, several languages, search — and put it online. The first month of maintenance is included.',
        ],
        sections: [
          {
            title: 'Who it is for',
            paragraphs: [
              'For an activity that needs to be found and contacted: a trade, a practice, a shop, training, an organisation. You have no website yet, or the one you have does not turn visits into enquiries.',
            ],
          },
          {
            title: 'What your website does',
            paragraphs: [
              'It presents your activity in your words, then moves the visitor forward: write, book or pay. Titles and pages are written for your customers, and so Google can understand them.',
              'Depending on the need: an admin, several languages, booking, payment. Nothing is imposed when your activity needs more than an off-the-shelf template.',
            ],
          },
          {
            title: 'How it happens',
            paragraphs: [
              'We frame the journey together, build it, and put it online. You talk to the person who develops it. The first month of maintenance is included.',
            ],
          },
        ],
        example: {
          slug: 'drivin-chill',
          text: 'Online booking and payment for Drivin & Chill',
        },
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
        h1: 'Custom business application',
        headline: 'Digitize the way you work.',
        seoDescription:
          'Custom business application: client portal, back-office and process automation. One technical contact, through to production.',
        body: [
          'When spreadsheets, email and forms slow the team down, a business app takes over the process the way you actually work.',
          'Client portal, dashboards, workflows and connections to your tools: you talk to the person who designs and builds the solution, through to production.',
        ],
        sections: [
          {
            title: 'Who it is for',
            paragraphs: [
              'For a team whose work still runs through spreadsheets, email and forms. You want a tool that follows the way you work, not the other way around.',
            ],
          },
          {
            title: 'What the application replaces',
            paragraphs: [
              'Files passed around, forgotten follow-ups, scattered information. The application holds the journey: client portal, back-office, access rights, dashboards.',
              'It connects to what you already use when that helps. You keep one technical contact, from understanding the need through to production.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'Learner space and administration for BAI Consulting & Formation',
        },
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
        h1: 'Custom digital platform',
        headline: 'Build your own digital product.',
        seoDescription:
          'Custom digital platform: SaaS, marketplace or e-learning, with accounts, subscriptions and payment. Built to grow with your activity.',
        body: [
          'A platform is your product: accounts, a journey, often a subscription. It has to hold up as usage grows.',
          'We design it for your users and for you: roles, payment, content and administration, on a base ready to evolve.',
        ],
        sections: [
          {
            title: 'Who it is for',
            paragraphs: [
              'You want to launch a product: online training, a subscription, a marketplace, a tool used by several kinds of accounts. It is no longer a showcase site. It is the service itself.',
            ],
          },
          {
            title: 'What the platform carries',
            paragraphs: [
              'Accounts, roles, a journey, often a payment or a subscription. Administration lets you run offers, users and content without a spreadsheet on the side.',
              'It is designed to evolve as usage grows, not to be rebuilt at the first new idea.',
            ],
          },
        ],
        example: {
          slug: 'objectif-tcf',
          text: 'Subscription and exam-simulation platform for Objectif TCF',
        },
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
    related: 'This kind of solution',
    items: [
      {
        slug: 'objectif-tcf',
        title: 'Objectif TCF',
        headline: 'A learning platform with subscriptions',
        seoDescription:
          'Objectif TCF learning platform: personalised path, exam simulations, subscriptions and a back-office. A Flow project.',
        relatedService: 'plateforme-web',
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
        seoDescription:
          'B2B training platform for BAI Consulting: public site, learner space and multi-role administration. A Flow project.',
        relatedService: 'plateforme-web',
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
        seoDescription:
          'Online booking and payment for Drivin & Chill: a mobile journey, Stripe payments and QR codes. A Flow project.',
        relatedService: 'site-web',
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
    founderName: 'Adams',
    jobTitle: 'Independent software engineer',
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
  guides: {
    label: 'Guides',
    items: [
      {
        slug: 'reservation-paiement',
        title: 'Online booking and payment',
        h1: 'A website with online booking and payment',
        seoDescription:
          'A website that takes bookings and payments, without an email back-and-forth. A mobile journey, secure payment, and the first month of maintenance included.',
        intro:
          'Your customers want to book and pay when they think of it, not after an email thread. The website becomes the journey, from the choice through to payment.',
        related: ['site-web'],
        sections: [
          {
            title: 'What the visitor does',
            paragraphs: [
              'They pick a slot or an offer, pay, and receive a confirmation. On your side the booking is recorded: no double entry, no slot sold twice.',
            ],
          },
          {
            title: 'What we put in place',
            paragraphs: [
              'The journey, the payment, and if you need it a QR code or a dashboard to follow bookings. It is designed for the phone first, where the decision is made.',
              'This is the kind of website built for Drivin & Chill: booking, payment and access control in one journey.',
            ],
          },
        ],
        example: {
          slug: 'drivin-chill',
          text: 'See the Drivin & Chill project',
        },
      },
      {
        slug: 'refonte-site',
        title: 'Website redesign',
        h1: 'Website redesign',
        seoDescription:
          'Your website no longer brings enquiries. We redesign it so it presents your activity and moves the visitor forward: contact, booking or payment.',
        intro:
          'A website that already exists but no longer works for you: vague pages, a broken journey, nothing happens after the visit. A redesign keeps what is right and replaces what blocks people.',
        related: ['site-web'],
        sections: [
          {
            title: 'When a redesign is the right move',
            paragraphs: [
              'People do not understand what you do, the phone does not ring, or you cannot add booking, payment or a client area. Repainting the same template does not fix that.',
            ],
          },
          {
            title: 'What we keep, what we change',
            paragraphs: [
              'We start from your activity today: what the visitor must understand, and the action they must be able to take. Search is carried into the titles and the structure, so you do not disappear from Google at the switch.',
              'You talk to the person who builds the new website. The first month of maintenance is included after launch.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'See the BAI Consulting & Formation project',
        },
      },
      {
        slug: 'site-ou-application',
        title: 'Website or application',
        h1: 'Showcase website or business application',
        seoDescription:
          'A website presents you and moves the visitor. A business application takes over the team’s work. We help you choose before building.',
        intro:
          'The two look similar from the outside. The difference is simple: the website serves customers who arrive. The application serves your team, or your customers once they have an account.',
        related: ['site-web', 'application-web'],
        sections: [
          {
            title: 'Choose a website if',
            paragraphs: [
              'You need to be found, explain your activity, and receive an enquiry, a booking or a payment. It is the front door. It can be enough for a long time.',
            ],
          },
          {
            title: 'Choose an application if',
            paragraphs: [
              'The daily work is the subject: files, approvals, client portals, dashboards. A showcase website will not organise that. The application takes over the process the way you do it.',
            ],
          },
          {
            title: 'If you are unsure',
            paragraphs: [
              'Describe the problem, not the tool. One call is enough to say whether you need a showcase, an internal tool, or both. Nothing forces you to build everything at once.',
            ],
          },
        ],
        example: {
          slug: 'bai-consulting',
          text: 'See a case that combines a public site and a learner space',
        },
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'FAQ — custom websites and business apps',
    h1: 'Frequently asked questions',
    intro: 'What Flow does, how a project runs, and how to start — before the first call.',
    description:
      'Custom websites, business apps or platforms: what Flow does, how a project runs, and how to start.',
    items: [
      {
        q: 'What does Flow build?',
        a: 'Flow designs custom websites, business applications and digital platforms, from understanding the need through to production.',
      },
      {
        q: 'Who is Flow for?',
        a: 'Companies whose activity is changing: you have a product idea, processes that are too manual, a website that is no longer enough, or you need a technical partner.',
      },
      {
        q: 'How is this different from an off-the-shelf template?',
        a: 'Nothing is imposed when your activity needs something specific. The journey, the data and the business logic are designed around the way you work.',
      },
      {
        q: 'Will the website be found on Google?',
        a: 'Search is part of the website: titles, pages and structure are written so Google can understand them. The exact position depends on Google and your market.',
      },
      {
        q: 'Can people book or pay online?',
        a: 'Yes. Booking, payment and client portals are part of the websites and applications we put in place.',
      },
      {
        q: 'Who builds the project?',
        a: 'Adams, a software engineer, is involved in every project. You talk to the person who designs and builds your solution.',
      },
      {
        q: 'Is there maintenance after launch?',
        a: 'The first month of maintenance is included. The solution is then built to evolve with your activity.',
      },
      {
        q: 'How do we start?',
        a: `Describe your need in the form, or call ${SITE.phoneDisplay}. We get back to you within 24 to 48 business hours. An idea is enough: a specification document is not required.`,
      },
    ],
  },
  footer: {
    blurb: 'Custom websites, business apps and digital platforms.',
    rights: 'All rights reserved.',
    explore: 'Explore',
    links: [
      { label: 'Websites', href: '/services/site-web' },
      { label: 'Business apps', href: '/services/application-web' },
      { label: 'Digital platforms', href: '/services/plateforme-web' },
      { label: 'Booking and payment', href: '/guides/reservation-paiement' },
      { label: 'Website redesign', href: '/guides/refonte-site' },
      { label: 'Website or app', href: '/guides/site-ou-application' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
}
