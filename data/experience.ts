import type { Experience, LeadershipRole } from "@/lib/types";

// Listed most-recent first. Array order = display order.
export const experiences: Experience[] = [
  {
    company: "Beresfords Wealth Management",
    url: "https://beresfords.com.au/",
    role: "AI Innovation Specialist",
    roles: [
      { title: "AI Innovation Specialist", period: "Jul 2026 – Present", type: "Full-time" },
      { title: "AI Consultant", period: "Aug 2025 – Jun 2026", type: "Part-time" },
    ],
    period: "Aug 2025 – Present",
    location: "Sydney, NSW",
    mode: "Remote",
    bullets: [
      "Guiding and implementing AI solutions across business processes to improve efficiency, accuracy, and client experience.",
      "Collaborating with management to identify where AI can deliver measurable value and streamline workflows.",
      "Developing and integrating AI tools for data-driven decision-making, predictive analytics, and process automation.",
      "Providing strategic consultation on AI adoption, feasibility assessment, and responsible deployment.",
    ],
  },
  {
    company: "Salik Labs",
    url: "https://www.saliklabs.com/",
    role: "AI Engineer",
    period: "Jun 2025 – Jun 2026",
    location: "Islamabad",
    mode: "On-site",
    logo: "/saliklabs.png",
    bullets: [
      "Worked on building a startup in the hiring and recruitment space.",
      "Worked with multiple founders to take products from zero to one.",
      "Built AI agents, voice agents, AI automations, and chatbots for various startups.",
    ],
  },
  {
    company: "AI Data House",
    url: "https://aidatahouse.com/",
    role: "Junior AI Engineer",
    period: "Feb 2025 – Apr 2025",
    location: "Islamabad",
    mode: "On-site",
    logo: "/ai-data-house.jpeg",
    bullets: [
      "Developed a handball game statistics program using computer vision for real-time sports analytics.",
      "Created, tested, and fine-tuned LLMs for diverse chatbot applications.",
      "Integrated machine-learning backends into websites to enhance functionality and UX.",
    ],
  },
  {
    company: "ROMI Lab, NUST SEECS",
    url: "https://romi.seecs.nust.edu.pk/",
    role: "Researcher",
    period: "Apr 2024 – May 2025",
    location: "Islamabad",
    mode: "Hybrid",
    logo: "/rumi-lab-nust.png",
    bullets: [
      "Hardware-security research in collaboration with professors at Tennessee Tech, USA.",
      "Detected Trojans in IP cores at the SoC development stage; basis of the NUST Final Year Project.",
      "Converted Verilog into graph structures capturing IP module hierarchy, then classified them with Graph Neural Networks.",
    ],
  },
  {
    company: "NCAI TUKL Deep Learning Lab, NUST",
    url: "https://dll.seecs.nust.edu.pk/",
    role: "Research Intern",
    period: "Jun 2023 – Feb 2024",
    location: "Islamabad",
    mode: "On-site",
    logo: "/tukl.png",
    bullets: [
      "Worked on several ML architectures, focused on Vision Transformers and ViT-based object detection.",
      "Reduced the computation required to run a ViT so it could run on edge devices.",
      "Goal: a Vision Transformer for an ADAS system used in autonomous vehicles.",
    ],
  },
];

export const leadership: LeadershipRole[] = [
  { org: "Google Developer Student Clubs", role: "HR Executive", period: "Sep 2023 – Jun 2024" },
  { org: "Hack Club NUST", role: "Event Coordinator", period: "Dec 2021 – Jun 2023" },
];
