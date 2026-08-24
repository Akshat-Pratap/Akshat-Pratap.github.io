export const profile = {
  name: "Akshat Pratap",
  firstName: "AKSHAT",
  lastName: "PRATAP",
  initials: "AP",
  roles: ["Full-Stack Developer", "AI Application Builder", "Cloud Explorer"],
  location: "Delhi NCR, India",
  email: "akshatpratap2020@gmail.com",
  availability: "Open to internships & opportunities",
  bio: "I'm a computer science undergrad who turns ambitious ideas into shipped products. From an agentic mock-interview platform to an AI startup evaluator, I build full-stack apps end-to-end — React on the front, FastAPI behind, generative AI woven through — and deploy them to the cloud. Right now I'm going deeper into multi-cloud infrastructure and looking for the next hard problem to solve.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Akshat-Pratap", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akshat-pratap-33ap33",
    icon: "linkedin",
  },
  { label: "LeetCode", href: "https://leetcode.com/u/AkshatPratap/", icon: "leetcode" },
  { label: "Email", href: "mailto:akshatpratap2020@gmail.com", icon: "mail" },
] as const;

export const stats = [
  { value: 8.9, decimals: 1, suffix: "", label: "CGPA at SRM" },
  { value: 125, decimals: 0, suffix: "+", label: "LeetCode problems" },
  { value: 3, decimals: 0, suffix: "", label: "National hackathons" },
  { value: 100, decimals: 0, suffix: "-day", label: "Solving streak" },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  points: string[];
  tag?: string;
};

export const experience: TimelineItem[] = [
  {
    period: "Jan 2026 — Mar 2026",
    title: "Virtual Intern — AI/ML & Cloud Infrastructure",
    org: "AICTE × AWS",
    tag: "Internship",
    points: [
      "Completed hands-on modules across AWS core services with a specialised focus on AI/ML.",
      "Deployed and managed machine-learning models in scalable cloud environments.",
    ],
  },
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science Engineering",
    org: "SRM Institute of Science and Technology, Delhi-NCR",
    tag: "Education",
    points: ["CGPA: 8.9 — focusing on systems, algorithms and applied AI."],
  },
  {
    period: "Class of 2024",
    title: "Senior Secondary (CBSE XII)",
    org: "Ryan International School, Ghaziabad",
    tag: "Education",
    points: ["Scored 80% while building my first full-stack projects."],
  },
];

export type Project = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  gradient: string;
  icon: "sparkles" | "messages" | "leaf";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Venture Insight",
    subtitle: "AI Startup Evaluator",
    description:
      "Upload a pitch deck and get an instant viability score, SWOT breakdown and market insights — benchmarked against historical startups. My flagship: full-stack, live, and powered by Google Gemini.",
    tech: ["React", "FastAPI", "Gemini API", "SQLite"],
    github: "https://github.com/Akshat-Pratap/venture-insight",
    live: "https://venture-insight.vercel.app",
    gradient: "from-orange-600 via-red-500 to-rose-500",
    icon: "sparkles",
  },
  {
    index: "02",
    title: "SkillSync AI",
    subtitle: "Agentic Mock-Interview Platform",
    description:
      "An AI interviewer that generates adaptive questions in real time, evaluates your answers and returns scored analytics — a complete conversational feedback loop built on React, FastAPI and Gemini.",
    tech: ["React", "FastAPI", "Gemini API", "Agentic AI"],
    github: "https://github.com/Akshat-Pratap/SkillSync-frontend",
    live: "https://skill-sync-frontend-umber.vercel.app",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    icon: "messages",
  },
  {
    index: "03",
    title: "The Last Garden",
    subtitle: "Interactive Web Experience",
    description:
      "A story-driven interactive website — atmosphere-first design with scene transitions, built from scratch in vanilla HTML, CSS and JavaScript to prove fundamentals matter.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Akshat-Pratap/the-last-garden",
    live: "https://the-last-garden.vercel.app",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
    icon: "leaf",
  },
];

export const skillRows: string[][] = [
  ["C++", "Python", "TypeScript", "JavaScript", "React.js", "Next.js"],
  ["FastAPI", "Gemini API", "REST APIs", "Node.js", "PostgreSQL", "SQLite"],
  ["AWS", "Oracle Cloud", "Git & GitHub", "Vercel", "Tailwind CSS", "OOPS"],
];

export const achievements = [
  {
    icon: "cloud",
    title: "OCI Generative AI Certified",
    detail:
      "Completed Oracle's OCI Generative AI learning path — LLM foundations, prompting and enterprise AI deployment.",
    tag: "Certification",
  },
  {
    icon: "trophy",
    title: "ET GEN AI Hackathon",
    detail:
      "Prototyped VentureInsight, an AI startup-viability ranker, under national competition pressure.",
    tag: "Hackathon",
  },
  {
    icon: "droplets",
    title: "Jal Shakti Hackathon",
    detail:
      "Team-built a working water-conservation prototype against the clock at a national-level event.",
    tag: "Hackathon",
  },
  {
    icon: "flag",
    title: "AI for Bharat Hackathon",
    detail:
      "Competed to build AI-driven solutions designed for India-scale problems.",
    tag: "Hackathon",
  },
  {
    icon: "flame",
    title: "LeetCode 100-Day Badge",
    detail:
      "125+ problems solved in C++ and Python, earned the 100-day consistency badge.",
    tag: "DSA",
  },
];
