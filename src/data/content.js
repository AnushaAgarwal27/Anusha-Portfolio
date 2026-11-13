// ============================================================================
//  ALL SITE CONTENT LIVES IN THIS FILE.
//  Edit text, links, and images here. You never need to touch a component.
//
//  Images: paths are relative to the /assets folder, for example
//  'projects/docket/docket-desk.png'. After adding or replacing an image,
//  restart `npm run dev` (or run `npm run images`) so it gets compressed.
//
//  Links: any url that starts with 'TODO' is shown as a dashed "coming soon"
//  chip instead of a real link. Set site.showPlaceholderLinks to false to hide
//  those chips completely.
//
//  Search this file for "TODO" to find everything that still needs you.
// ============================================================================

export const site = {
  name: 'Anusha Agarwal',
  title: 'Anusha Agarwal | Software engineer who paints',
  description:
    'Portfolio of Anusha Agarwal, a Penn State computer science junior who builds software and paints. Software engineering intern at PNC (SRE), hackathon builder, and learning assistant.',
  // TODO: after you deploy, paste your live address here (no trailing slash),
  // for example 'https://anusha.vercel.app'. Link previews need the full URL.
  url: '',
  showPlaceholderLinks: true,
  footerNote: 'Illustrations made with AI-assisted painting tools.',
}

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
  // The site serves a copy of the PDF found in /assets (see README).
  resume: '/assets/resume.pdf',
}

export const hero = {
  eyebrow: 'Penn State · Computer Science · Class of May 2028',
  name: ['Anusha', 'Agarwal'],
  // TAGLINE OPTIONS. Pick one and paste it into `tagline` below.
  //   1. 'I build software and I paint. Both start from wanting things to feel considered.'
  //   2. 'Software engineer with a painter’s eye: APIs, agents, and tools that feel considered.'
  //   3. 'CS junior at Penn State who ships agentic tools on weekdays and paints on weekends.'
  tagline: 'I build software and I paint. Both start from wanting things to feel considered.',
  primaryButton: { label: 'See my work', href: '#projects' },
  secondaryButton: { label: 'Resume', href: contact.resume },
  image: { src: 'hero', alt: 'Painted self portrait of Anusha, hands on hips, wearing glasses and hoop earrings' },
  // Three facts a recruiter should catch in the first few seconds.
  facts: [
    { label: 'Most recent', text: 'Software Engineering Intern, PNC (SRE Team)' },
    { label: 'Studying', text: 'CS junior, Math minor, Penn State' },
    { label: 'Lately', text: 'Mana Sponsor Track Winner, Cal Hacks 13.0' },
  ],
}

// Small "Now building" note with the cassette. Set show to false to remove it.
export const nowBuilding = {
  show: true,
  label: 'Now building',
  // TODO: replace with whatever you are working on this week.
  text: 'Something new. (Edit me in content.js)',
}

export const about = {
  heading: 'About',
  image: { src: 'portrait-2', alt: 'Oil style painting of a woman resting her chin on her hand, in a blue and white shirt' },
  imageCaption: 'portrait study',
  paragraphs: [
    'Hi, I’m Anusha. I’m a computer science junior at Penn State with a math minor, graduating in May 2028.',
    'I build software and I paint, and both come from the same place: wanting to make things that feel considered. In code that means APIs that are easy to reason about, tools that save people real steps, and agents that can show their work. On paper it means color, texture, and the small details you only notice when they are missing.',
    'Most recently I was a software engineering intern on the SRE team at PNC. At school I build with the HackPSU technology team, help teach CMPSC 200, and spend a good number of weekends at hackathons.',
  ],
  signoff: 'Currently looking for software engineering internships.',
}

// The wide painted banner between About and Experience.
export const eyesBanner = {
  note: 'an eye for the details',
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
//  PROJECTS (shown in this order)
//
//  award:   red stamp tags. Leave as [] if there is no award.
//  event:   where it was built (small grey line).
//  images:  screenshots from /assets/projects/<name>/. Leave as [] to show a
//           painted title plate instead.
//  links:   { label, url }. A url starting with 'TODO' renders as a placeholder.
//  details: paragraphs shown when the card is expanded.
//
//  Tech tags were checked against the GitHub repos and Devpost pages in
//  November 2026. Notes on what could not be checked are next to each project.
// ----------------------------------------------------------------------------
export const projects = {
  heading: 'Projects',
  intro: 'Mostly built at hackathons, usually with agents, always with a real person in mind.',
  items: [
    {
      id: 'docket',
      title: 'Docket',
      featured: true,
      event: 'Cal Hacks 13.0',
      award: ['Mana Sponsor Track Winner', 'Fetch.ai Special Mention'],
      summary:
        'Autonomous caseworker that helps F-1 students with tax, payroll, and visa compliance.',
      stats: ['8 Fetch.ai uAgents', '25/25 accuracy', '0 false alarms', '248 passing tests'],
      tech: ['Fetch.ai uAgents', 'Claude', 'Convex', 'Python', 'TypeScript', 'React'],
      images: [
        {
          src: 'projects/docket/docket-desk.png',
          alt: 'Docket: The Case start screen, a wooden desk with six blocky agent characters and two student case files',
          caption: 'The Case: pick a file',
        },
        {
          src: 'projects/docket/docket-hearing.png',
          alt: 'Docket hearing round, a judge at the bench between the Advocate and the Auditor with $440.64 at stake',
          caption: 'Round 1: the hearing',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/docket-ezaum8' },
        // This address comes from the README of your Docket repo and was live
        // when the site was built. Swap it if the game moves.
        { label: 'Play Docket: The Case', url: 'https://docket-game.vercel.app/' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/Docket' },
      ],
      details: [
        'Docket is built from 8 Fetch.ai uAgents with Claude and Convex. It reads a student’s paystubs, flags money they are owed, backs every flag with the exact clause from an official source, and follows up until the case is closed. In evaluation it reached 25/25 accuracy with 0 false alarms, backed by 248 passing tests.',
        'Docket: The Case is a second way in: an interactive 3 round game prototype with a hearing, a phone call, and the money landing in the bank. Six agents (Advocate, Auditor, Judge, Guardian, Payroll clerk, Ledger) argue over an F-1 student’s money, while a live quote checker loads IRS Publication 519 from IRS.gov.',
        'To be plain about it: the game is a prototype. It is scripted and places no real call.',
      ],
    },
    {
      id: 'guardian',
      title: 'Guardian',
      event: 'LA Hacks',
      award: ['CREAO Runner-Up'],
      quote: 'Life on their terms. A little help on the line.',
      summary:
        'Voice-first grocery and pharmacy platform for seniors, with scam screening, spending limits, and family approvals.',
      // Stack checked against the Devpost page only (no public repo found).
      tech: ['CREAO agents', 'ElevenLabs', 'Photon', 'Next.js', 'TypeScript'],
      images: [
        {
          src: 'projects/guardian/guardian-home.png',
          alt: 'Guardian landing page with the headline Life on their terms, a little help on the line, beside a painted kitchen',
          caption: 'guardian, home page',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/guardian-yeq76p' },
        { label: 'GitHub', url: 'TODO: add the Guardian repo link (no public repo found on your GitHub)' },
        { label: 'Live demo', url: 'TODO: add the Guardian Vercel link' },
      ],
      details: [
        'Seniors order groceries and pharmacy items over a regular phone call, with no app to learn. Guardian screens every request for scams, enforces spending limits, and sends anything unusual to family for approval.',
        'Under the hood: 4 CREAO agents, ElevenLabs for voice, Photon for messaging, and a Next.js dashboard where family can review requests and approvals.',
      ],
    },
    {
      id: 'nod',
      title: 'Nod',
      event: 'AWS AI Hackathon Startup Summit',
      award: ['Top 5 Finalist'],
      quote: 'From customer interview to finished feature.',
      summary:
        'Autonomous software development platform that turns customer interviews into shipped, secure features.',
      tech: ['Multi-agent', 'Python', 'Flask', 'Cognee', 'Snyk'],
      images: [
        {
          src: 'projects/nod/nod-home.png',
          alt: 'Nod title screen with the tagline From customer interview to finished feature',
          caption: 'nod, title card',
        },
      ],
      links: [
        { label: 'LinkedIn post', url: 'https://lnkd.in/g4ZERnYJ' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/Nod' },
        { label: 'Live demo', url: 'TODO: add the Nod Vercel link' },
      ],
      details: [
        'Five agents work as a small product team: they extract customer needs from interviews, resolve conflicting feedback, prioritize features, and generate secure code.',
        'The agents share one long term memory (Cognee), and every finished feature is scanned with Snyk before it counts as done.',
      ],
    },
    {
      id: 'splicesentinel',
      title: 'SpliceSentinel',
      event: 'Cal Hacks, UC Berkeley',
      award: [],
      summary:
        'Clinical drug-interaction decision support tool that analyzes FDA FAERS data with a PRR ≥ 2 threshold.',
      tech: ['React', 'FastAPI', 'Claude API', 'FDA FAERS', 'Sentry'],
      // TODO: add a screenshot at assets/projects/splicesentinel/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/splice-sentinel' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/SpliceSentinel' },
        { label: 'Live demo', url: 'TODO: add the SpliceSentinel Vercel link' },
      ],
      details: [
        'A clinician enters a drug combination and patient context. SpliceSentinel queries FDA FAERS adverse event reports and flags signals where the proportional reporting ratio (PRR) is 2 or higher.',
        'Built with React, FastAPI, and the Claude API, with a document ingestion pipeline, a network graph visualization of interactions, and Sentry observability.',
      ],
    },
    {
      id: 'wyj',
      title: 'Would You Jump',
      short: 'WYJ',
      event: 'Built at Super{set}, October 2026',
      award: [],
      quote: 'Find your co-founder before you quit, without telling anyone you might leave.',
      summary: 'Private founder matchmaking for people who have not announced their next move yet.',
      // Stack checked against the Devpost page only (no public repo found).
      tech: ['Next.js', 'React', 'TypeScript', 'Supabase'],
      images: [
        {
          src: 'projects/wyj/wyj-home.png',
          alt: 'Would You Jump landing page, a small plane in a pale blue sky above the words Would you jump?',
          caption: 'wyj, at 30,000 ft',
        },
      ],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/would-you-jump' },
        { label: 'GitHub', url: 'TODO: add the WYJ repo link (no public repo found on your GitHub)' },
        { label: 'Live demo', url: 'TODO: add the WYJ Vercel link' },
      ],
      details: [
        'WYJ lets you look for a co-founder under a pseudonymous brief that you review before it is published. An introduction needs two independent approvals, and only then does each person see the name and contact details the other chose to share.',
        'Built with Next.js at Super{set} in October 2026.',
      ],
    },
    {
      id: 'kerdos',
      title: 'Kerdos',
      event: 'Bitcamp 2026',
      award: [],
      summary:
        'AI-powered credit card optimization and reward investing platform: the best card for every purchase, and a plan for the cashback.',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Plaid'],
      // TODO: add a screenshot at assets/projects/kerdos/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/kerdos' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/kerdos' },
        // The repo lists kerdos-nine.vercel.app, but it returned "not found"
        // when this site was built.
        { label: 'Live demo', url: 'TODO: add a working Kerdos Vercel link' },
      ],
      details: [
        'Kerdos has three parts. SmartSwipe finds the best credit card for each purchase based on cashback rates, points, miles, and merchant category. RewardVest turns cashback into suggested ETF allocations. WealthSplit is a dashboard for rewards earned, expense splits, and investment growth.',
        'Built with a team of four at Bitcamp 2026.',
      ],
    },
    {
      id: 'watchcare',
      title: 'WatchCare AI',
      event: 'NexHacks',
      award: [],
      summary:
        'Real-time fall detection that reads existing camera feeds with pose estimation and alerts nurses through an Android app.',
      tech: ['Python', 'OpenCV', 'MediaPipe Pose', 'Firebase Firestore', 'Kotlin'],
      // TODO: add a screenshot at assets/projects/watchcare/ and list it here.
      images: [],
      links: [
        { label: 'Devpost', url: 'https://devpost.com/software/watchcareai' },
        { label: 'GitHub', url: 'https://github.com/AnushaAgarwal27/WatchCare-AI' },
        { label: 'Live demo', url: 'TODO: add a WatchCare AI demo link (it is an Android app, so maybe a video)' },
      ],
      details: [
        'WatchCare AI watches for the quiet incidents that get missed in a busy waiting room, like slumping, fainting while seated, or sliding off a chair. A Python pipeline with OpenCV and MediaPipe Pose tracks body angle and motion, and flags a possible fall when someone stays motionless for more than 4 seconds.',
        'Alerts sync through Firebase Firestore to a Kotlin Android app where nurses can claim and resolve each incident, which avoids duplicate responses and leaves a clear record.',
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
//  GALLERY
//  The gallery shows every image you drop into /assets/gallery/ (sorted by
//  file name) and nothing else. While that folder is empty, the "Studio coming
//  soon" card is shown instead.
//
//  Optional captions: add an entry keyed by file name, for example
//    'blue-vase.jpg': { title: 'Blue vase', note: 'Gouache on paper, 2026', alt: 'A blue vase with lemons' },
// ----------------------------------------------------------------------------
export const gallery = {
  heading: 'Gallery',
  intro: 'Original paintings and studies.',
  emptyTitle: 'Studio coming soon',
  emptyText: 'The paint is still drying. Original pieces will be hung here shortly.',
  captions: {},
}

export const skills = {
  heading: 'Skills',
  groups: [
    { label: 'Languages', items: ['Python', 'Java', 'C++', 'Go', 'SQL', 'JavaScript', 'TypeScript', 'C', 'MATLAB'] },
    { label: 'Frameworks', items: ['React', 'FastAPI', 'Node.js'] },
    { label: 'AI', items: ['Claude API', 'RAG', 'Multi-agent systems'] },
    { label: 'DevOps', items: ['Jenkins', 'Ansible', 'Docker', 'CI/CD', 'Git'] },
    { label: 'Observability', items: ['Sentry', 'LogScale'] },
  ],
}

export const contactSection = {
  heading: 'Let’s talk',
  text: 'Internships, hackathon teams, or a painting you want to argue about. Coffee is on me.',
  image: { src: 'coffee', alt: 'Painted cup of coffee in a blue and white floral cup and saucer' },
}

// Alt text for the decorative stickers.
export const stickers = {
  strawberry: 'Painted strawberry',
  laptop: 'Painted beige vintage laptop',
  coffee: 'Painted cup of coffee in a blue and white cup',
  cassette: 'Painted blue cassette player',
  'eyes-banner': 'Painted close up of a pair of brown eyes glancing sideways',
}
