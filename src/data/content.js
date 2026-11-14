// ============================================================================
//  ALL SITE CONTENT LIVES IN THIS FILE.
//  Edit text, links, and images here. You never need to touch a component.
//
//  Images: paths are relative to the /assets folder, for example
//  'projects/docket/docket-desk.png'. After adding or replacing an image,
//  restart `npm run dev` (or run `npm run images`) so it gets compressed.
//
//  Links: a link with an empty url (or one that starts with 'TODO') is simply
//  not shown on the site. Fill in the url and the button appears.
//
//  Optional extras (the site works without any of them, see README):
//    assets/events/<project id>/   event photos for a project
//    assets/art/                   your own painted art
//    assets/signature.png          replaces the text name in the nav
//    assets/fonts/handwriting.woff2  replaces Caveat for handwritten notes
//
//  Search this file for "TODO" to find everything that still needs you.
// ============================================================================

export const site = {
  name: 'Anusha Agarwal',
  title: 'Anusha Agarwal | Software engineer',
  description:
    'Personal site of Anusha Agarwal, a computer science junior at Penn State who builds APIs, agents, and tools that feel considered.',
  // Short lines used on the link preview image (npm run og).
  ogEyebrow: 'Software engineer',
  ogLine: 'Penn State CS · APIs, agents, and tools',
  // TODO: after you deploy, paste your live address here (no trailing slash),
  // for example 'https://anusha.vercel.app'. Link previews need the full URL.
  url: '',
  // Leave this false. Links without a url stay hidden. (Setting it to true
  // shows them as dashed "coming soon" chips, which is only useful as a
  // checklist while you are editing.)
  showPlaceholderLinks: false,
  footerNote: 'Portrait made with AI-assisted painting tools.',
}

// The Gallery link is hidden automatically while /assets/gallery/ is empty.
export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const contact = {
  email: 'anusha.agarwal027@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anushaagarwal10',
  linkedinLabel: 'linkedin.com/in/anushaagarwal10',
  github: 'https://github.com/AnushaAgarwal27',
  githubLabel: 'github.com/AnushaAgarwal27',
  // Vite bundles the source PDF and resolves its URL for the deployment base.
  resume: new URL('../../assets/Resume-Anusha Agarwal.pdf', import.meta.url).href,
}

export const hero = {
  eyebrow: 'Penn State · Computer Science · Class of May 2028',
  name: ['Anusha', 'Agarwal'],
  // TAGLINE OPTIONS. Pick one and paste it into `tagline` below.
  //   1. 'I build software, and I care about the details that make things feel considered.'
  //   2. 'APIs, agents, and tools, built so they feel considered.'
  //   3. 'CS junior at Penn State building agentic tools and the APIs behind them.'
  tagline: 'I build software, and I care about the details that make things feel considered.',
  // Handwritten note with an arrow pointing at the portrait. '' removes it.
  note: 'hi, that’s me',
  primaryButton: { label: 'See my work', href: '#projects' },
  secondaryButton: { label: 'Resume', href: contact.resume },
  image: { src: 'hero', alt: 'Painted portrait of Anusha, hands on hips, wearing glasses and hoop earrings' },
  // Three quick facts shown on the torn strip under the portrait.
  facts: [
    { label: 'Most recent', text: 'Software Engineering Intern, PNC (SRE Team)' },
    { label: 'Studying', text: 'CS junior, Math minor, Penn State' },
    { label: 'Lately', text: 'Mana Sponsor Track Winner, Cal Hacks 13.0' },
  ],
}

export const about = {
  heading: 'About',
  // ALTERNATE OPENERS for the second paragraph. To use one, swap it in for
  // the first sentence ("I build software, and I care about ...").
  //   a. 'Software is how I make things work. Color is how I make them feel.'
  //   b. 'I’m happiest when something I built looks and feels like someone cared.'
  paragraphs: [
    'Hi, I’m Anusha. I’m a computer science junior at Penn State with a math minor, graduating in May 2028.',
    'I build software, and I care about the details that make things feel considered. In code that means APIs that are easy to reason about, tools that save people real steps, and agents that can show their work.',
    'Most recently I was a software engineering intern on the SRE team at PNC. At school I build with the HackPSU technology team, help teach CMPSC 200, and spend a good number of weekends at hackathons.',
  ],
  // The small torn paper card next to the bio.
  glance: {
    heading: 'At a glance',
    items: [
      { label: 'Penn State', text: 'B.S. Computer Science, Math minor, May 2028' },
      { label: 'Currently', text: 'HackPSU tech team and CMPSC 200 Learning Assistant' },
    ],
  },
}

export const experience = {
  heading: 'Experience',
  items: [
    {
      org: 'PNC',
      role: 'Software Engineering Intern, SRE Team',
      place: 'Pittsburgh',
      dates: 'Jun to Aug 2026',
      bullets: [
        'Built a Job Details REST API endpoint in Go for MaaS (Monitoring as a Service), integrating with the Ansible API to surface execution STDOUT in-platform and eliminate 10+ manual steps per job lookup.',
        'Scoped a CI/CD pipeline for MaaS, comparing Jenkins and GitHub Actions across build, test, and deployment stages.',
        'Built an agentic AI assistant (RAG + LLM APIs) that tracks updates across 4 to 5 change-management documents and generates testing, documentation, and approval guidance, reducing standards lookup from hours to minutes.',
      ],
      tags: ['Go', 'REST APIs', 'Ansible', 'CI/CD', 'RAG'],
    },
    {
      org: 'HackPSU',
      role: 'Technology Team Member',
      place: '',
      dates: 'Sep 2025 to present',
      bullets: [
        'Build full-stack features across the website, mobile app, and internal tools used by 1000+ users.',
        'Integrate REST APIs and handle testing, debugging, and optimization in an Agile workflow.',
      ],
      tags: ['Full-stack', 'REST APIs', 'Agile'],
    },
    {
      org: 'Penn State',
      role: 'CMPSC 200 Learning Assistant',
      place: '',
      dates: 'Aug 2026 to present',
      bullets: [
        'Support 500+ students through recitations, office hours, and grading MATLAB assignments.',
      ],
      tags: ['MATLAB', 'Teaching'],
    },
  ],
}

// ----------------------------------------------------------------------------
//  PROJECTS
//
//  A new project is one object in `items`. The first 3 in the list are shown
//  as featured rows (with a screenshot). Everything after that goes into the
//  compact "More projects" grid, which shows 6 and tucks the rest behind a
//  "Show all" button. To override the automatic choice, add `featured: true`
//  or `featured: false` to a project.
//
//  id:          short name, also the folder name for assets/events/<id>/.
//  event, year: the small line above the title.
//  award:       small tags. Leave as [] if there is no award.
//  quote:       optional tagline in handwriting (featured rows only).
//  summary:     ONE line. Always visible.
//  details:     longer paragraphs, behind the "Details" toggle.
//  highlights:  short number facts (featured rows only). [] for none.
//  tech:        tech tags.
//  images:      screenshots from /assets/projects/<name>/ (featured rows only).
//               Each can have a `note`: a short handwritten annotation. Only
//               write notes that are true.
//  photos:      optional event photos, for example
//                 photos: [{ src: 'events/docket/team.jpg', caption: 'Demo table at Cal Hacks' }],
//               If you leave this out, every image in assets/events/<id>/ is
//               used automatically (caption = the file name).
//  art:         optional painted art from /assets/art/, for example
//               art: 'art/berkeley.png'. A file named assets/art/<id>.png is
//               picked up automatically.
//  links:       { label, url }. Links with an empty url are not shown.
//
//  Tech tags and years were checked against the GitHub repos and Devpost pages
//  in November 2026. Notes on what could not be checked sit next to each
//  project.
// ----------------------------------------------------------------------------
export const projects = {
  heading: 'Projects',
  intro: 'Mostly built at hackathons, usually with agents, always with a real person in mind.',
  moreHeading: 'More projects',
  items: [
    {
      id: 'docket',
      title: 'Docket',
      event: 'Cal Hacks 13.0',
      year: '2026',
      award: ['Mana Sponsor Track Winner', 'Fetch.ai Special Mention'],
      summary:
        'Autonomous caseworker that helps F-1 students with tax, payroll, and visa compliance, built from 8 Fetch.ai uAgents with Claude and Convex.',
      details: [
        'It reads a student’s paystubs, flags money they are owed, backs every flag with the exact clause from an official source, and follows up until the case is closed.',
        'Docket: The Case is a second way in: an interactive 3 round game prototype with a hearing, a phone call, and the money landing in the bank. Six agents (Advocate, Auditor, Judge, Guardian, Payroll clerk, Ledger) argue over an F-1 student’s money, while a live quote checker loads IRS Publication 519 from IRS.gov. To be plain about it: the game is a prototype. It is scripted and places no real call.',
      ],
      highlights: ['25/25 accuracy', '0 false alarms', '248 passing tests'],
      tech: ['Fetch.ai uAgents', 'Claude', 'Convex', 'Python', 'TypeScript', 'React'],
      images: [
        {
          src: 'projects/docket/docket-desk.png',
          alt: 'Docket: The Case start screen, a wooden desk with six blocky agent characters and two student case files',
          note: 'the game version: scripted, no real call',
        },
        {
          src: 'projects/docket/docket-hearing.png',
          alt: 'Docket hearing round, a judge at the bench between the Advocate and the Auditor with $440.64 at stake',
          note: 'round 1, the hearing',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/docket-ezaum8' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/Docket' },
        // "Docket: The Case". This address comes from the README of your
        // Docket repo and was live when the site was built.
        { label: 'Live demo: The Case', url: 'https://docket-game.vercel.app/' },
      ],
    },
    {
      id: 'guardian',
      title: 'Guardian',
      event: 'LA Hacks',
      year: '2026',
      award: ['CREAO Runner-Up'],
      quote: 'Life on their terms. A little help on the line.',
      summary:
        'Voice-first grocery and pharmacy platform for seniors, with scam screening, spending limits, and family approvals.',
      details: [
        'Seniors order groceries and pharmacy items over a regular phone call, with no app to learn. Under the hood: 4 CREAO agents, ElevenLabs voice, Photon messaging, and a Next.js family dashboard for reviewing requests and approvals.',
      ],
      highlights: ['4 CREAO agents'],
      // Stack checked against the Devpost page only (no public repo found).
      tech: ['CREAO agents', 'ElevenLabs', 'Photon', 'Next.js', 'TypeScript'],
      images: [
        {
          src: 'projects/guardian/guardian-home.png',
          alt: 'Guardian landing page with the headline Life on their terms, a little help on the line, beside a painted kitchen',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/guardian-yeq76p' },
        { label: 'GitHub', url: '' }, // TODO: no public Guardian repo found on your GitHub
        { label: 'Live demo', url: '' }, // TODO: Guardian Vercel link
      ],
    },
    {
      id: 'nod',
      title: 'Nod',
      event: 'AWS AI Hackathon Startup Summit',
      year: '2026',
      award: ['Top 5 Finalist'],
      quote: 'From customer interview to finished feature.',
      summary:
        'Autonomous software development platform that turns customer interviews into shipped, secure features.',
      details: [
        'Five agents work as a small product team: they extract customer needs, resolve conflicting feedback, prioritize features, and generate secure code. The agents share one long term memory (Cognee), and every finished feature is scanned with Snyk before it counts as done.',
      ],
      highlights: ['5 agents'],
      tech: ['Multi-agent', 'Python', 'Flask', 'Cognee', 'Snyk'],
      images: [
        {
          src: 'projects/nod/nod-home.png',
          alt: 'Nod title screen with the tagline From customer interview to finished feature',
        },
      ],
      links: [
        { label: 'LinkedIn post', url: 'https://lnkd.in/g4ZERnYJ' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/Nod' },
        { label: 'Live demo', url: '' }, // TODO: Nod Vercel link
      ],
    },
    {
      id: 'splicesentinel',
      title: 'SpliceSentinel',
      event: 'Cal Hacks, UC Berkeley',
      year: '2026',
      award: [],
      summary:
        'Clinical drug-interaction decision support tool that analyzes FDA FAERS adverse event data with a PRR ≥ 2 threshold.',
      details: [
        'A clinician enters a drug combination and patient context, and SpliceSentinel flags the signals that cross the threshold. Built with React, FastAPI, and the Claude API, with a document ingestion pipeline, a network graph visualization of interactions, and Sentry observability.',
      ],
      highlights: ['PRR ≥ 2 threshold'],
      tech: ['React', 'FastAPI', 'Claude API', 'FDA FAERS', 'Sentry'],
      // To add a screenshot: put it in assets/projects/splicesentinel/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/splice-sentinel' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/SpliceSentinel' },
        { label: 'Live demo', url: '' }, // TODO: SpliceSentinel Vercel link
      ],
    },
    {
      id: 'wyj',
      title: 'Would You Jump',
      short: 'WYJ',
      event: 'Built at Super{set}',
      year: 'October 2026',
      award: [],
      quote: 'Find your co-founder before you quit, without telling anyone you might leave.',
      summary: 'Private founder matchmaking for people who have not announced their next move yet.',
      details: [
        'You look for a co-founder under a pseudonymous brief that you review before it is published. An introduction needs two independent approvals, and only then does each person see the name and contact details the other chose to share. Built with Next.js.',
      ],
      highlights: [],
      // Stack checked against the Devpost page only (no public repo found).
      tech: ['Next.js', 'React', 'TypeScript', 'Supabase'],
      images: [
        {
          src: 'projects/wyj/wyj-home.png',
          alt: 'Would You Jump landing page, a small plane in a pale blue sky above the words Would you jump?',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/would-you-jump' },
        { label: 'GitHub', url: '' }, // TODO: no public WYJ repo found on your GitHub
        { label: 'Live demo', url: '' }, // TODO: WYJ Vercel link
      ],
    },
    {
      id: 'kerdos',
      title: 'Kerdos',
      event: 'Bitcamp',
      year: '2026',
      award: [],
      summary:
        'AI-powered credit card optimization and reward investing platform: the best card for every purchase, and a plan for the cashback.',
      details: [
        'SmartSwipe finds the best credit card for each purchase based on cashback rates, points, miles, and merchant category. RewardVest turns cashback into suggested ETF allocations. WealthSplit is a dashboard for rewards earned, expense splits, and investment growth.',
      ],
      highlights: [],
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Plaid'],
      // To add a screenshot: put it in assets/projects/kerdos/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/kerdos' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/kerdos' },
        // TODO: the repo lists kerdos-nine.vercel.app, but it returned
        // "not found" when this site was built.
        { label: 'Live demo', url: '' },
      ],
    },
    {
      id: 'watchcare',
      title: 'WatchCare AI',
      event: 'NexHacks',
      year: '2026',
      award: [],
      summary:
        'Real-time fall detection that reads existing camera feeds with pose estimation and alerts nurses through an Android app.',
      details: [
        'A Python pipeline with OpenCV and MediaPipe Pose tracks body angle and motion to catch quiet incidents like slumping, fainting while seated, or sliding off a chair. Alerts sync through Firebase Firestore to a Kotlin Android app where nurses claim and resolve each incident.',
      ],
      highlights: [],
      tech: ['Python', 'OpenCV', 'MediaPipe Pose', 'Firebase Firestore', 'Kotlin'],
      // To add a screenshot: put it in assets/projects/watchcare/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/watchcareai' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/WatchCare-AI' },
        { label: 'Live demo', url: '' }, // TODO: it is an Android app, so maybe a demo video
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
//  GALLERY
//  The gallery shows every image you drop into /assets/gallery/ (sorted by
//  file name) and nothing else. While that folder is empty, the whole section
//  and its nav link are hidden. Add a painting and both appear on their own.
//
//  Optional captions: add an entry keyed by file name, for example
//    'blue-vase.jpg': { title: 'Blue vase', note: 'Gouache on paper, 2026', alt: 'A blue vase with lemons' },
// ----------------------------------------------------------------------------
export const gallery = {
  heading: 'Gallery',
  intro: '',
  captions: {},
}

// Each group is one row of tags.
export const skills = {
  heading: 'Skills',
  groups: [
    {
      label: 'Languages',
      items: ['Python', 'Java', 'C++', 'C', 'Go', 'SQL', 'JavaScript', 'TypeScript', 'HTML/CSS', 'MATLAB', 'Kotlin'],
    },
    { label: 'Frontend and mobile', items: ['React', 'Next.js', 'Tailwind CSS', 'Android Studio'] },
    {
      label: 'Backend and data',
      items: ['FastAPI', 'Node.js', 'Flask', 'REST APIs', 'MySQL', 'Firebase/Firestore', 'Supabase', 'Convex', 'Plaid', 'Photon'],
    },
    {
      label: 'AI and agents',
      items: [
        'Claude API',
        'LLM APIs',
        'RAG',
        'Multi-agent systems',
        'AI agent orchestration',
        'Fetch.ai uAgents',
        'OpenCV/MediaPipe',
        'CREAO',
        'ElevenLabs',
        'Cognee',
      ],
    },
    {
      label: 'DevOps and infrastructure',
      items: ['Jenkins', 'GitHub Actions', 'Ansible', 'Docker', 'CI/CD', 'Git/GitHub/Bitbucket', 'YAML', 'Snyk'],
    },
    { label: 'Observability', items: ['Sentry', 'LogScale'] },
    { label: 'Tools and practices', items: ['Jira', 'Agile/Scrum', 'Unix'] },
    {
      label: 'Coursework',
      items: ['Data Structures and Algorithms', 'Systems Programming', 'Machine Learning and AI', 'Theory of Computation'],
    },
  ],
}

export const contactSection = {
  heading: 'Let’s talk',
  text: 'Hackathon teams, side projects, or just to say hi. My inbox is open.',
}

// ----------------------------------------------------------------------------
//  OPTIONAL PAINTED ART (from /assets/art/, nothing shows while it is empty)
//  Leave these as '' to use the automatic file names:
//    assets/art/about.png     shown beside the About text
//    assets/art/divider.png   small tile in the paint divider
//    assets/art/<project id>.png   small header on that project
//  Or point at any file in the folder, for example about: 'art/me-reading.png'.
// ----------------------------------------------------------------------------
export const art = {
  about: '',
  aboutAlt: 'Painted illustration',
  divider: '',
  dividerAlt: 'Small painted tile',
}
