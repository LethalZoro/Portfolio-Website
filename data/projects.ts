import type { Project } from "@/lib/types";

/**
 * Single source of truth for the Projects section.
 *
 * - Array order = display order on the site.
 * - `featured: true`  -> big showcase card with cover art.
 * - `featured: false` -> compact row in the "More on GitHub" list.
 *
 * To add, remove, or reorder a project, edit ONLY this file.
 */
export const projects: Project[] = [
  {
    slug: "contract-summary-ai",
    title: "Contract Summary AI",
    summary:
      "Full-stack app that summarizes and answers questions over UK construction contracts.",
    bullets: [
      "Flask REST API wired to LangChain, OpenAI GPT-4o, and ChromaDB for document processing.",
      "Retrieval-Augmented Generation over uploaded PDF contracts: detailed summaries plus free-form Q&A.",
      "Responsive React frontend for uploading documents, viewing summaries, and chatting with the assistant.",
    ],
    tech: ["Flask", "React", "LangChain", "GPT-4o", "ChromaDB", "RAG"],
    category: "ai",
    image: "/contract-summary.png",
    live: "https://react-contract-chatbot.vercel.app/",
    repo: "https://github.com/LethalZoro/Contracts-summary-Flask",
    featured: true,
  },
  {
    slug: "langgraph-chatbot",
    title: "LangGraph Chatbot Workflow",
    summary:
      "Stateful chatbot system on LangGraph with real-time WebSocket synchronization.",
    bullets: [
      "Dynamically manages conversation flows based on user input and graph state.",
      "Real-time client-server communication over WebSockets with instant state sync.",
      "Frontend visualizes conversation history and the structured JSON state live.",
    ],
    tech: ["LangGraph", "LangChain", "Local LLM", "WebSockets"],
    category: "ai",
    image: "/langgraph-ai.png",
    live: "https://langgraph-chatbot-wtth.onrender.com/",
    repo: "https://github.com/LethalZoro/LangGraph-Chatbot",
    featured: true,
  },
  {
    slug: "trailmind",
    title: "TrailMind",
    summary:
      "Fully offline voice and camera assistant running on a Raspberry Pi 5.",
    bullets: [
      "Voice interaction and camera understanding with zero cloud dependency: everything runs on-device.",
      "Built for the trail: works where there is no connectivity at all.",
      "AI on the edge, where the hardware and ML sides of the stack meet.",
    ],
    tech: ["Python", "Raspberry Pi 5", "Edge AI", "Speech", "Vision"],
    category: "ai",
    repo: "https://github.com/LethalZoro/TrailMind",
    featured: true,
  },
  {
    slug: "interviewer-ai",
    title: "Interviewer AI",
    summary:
      "AI interviewer that reads a job description and CV, then runs the interview.",
    bullets: [
      "Generates role-specific interview questions from the job description and the candidate's CV.",
      "Evaluates answers automatically and scores candidates against the role.",
      "End-to-end hiring assistant: from posting to structured candidate evaluation.",
    ],
    tech: ["Python", "LLMs", "Prompt Engineering", "Evaluation"],
    category: "ai",
    repo: "https://github.com/LethalZoro/Interviewer-AI",
    featured: true,
  },
  {
    slug: "federated-recommender",
    title: "Federated Movie Recommender",
    summary:
      "Privacy-preserving recommendation engine: the data never leaves the device.",
    bullets: [
      "User-based and item-based collaborative filtering on the MovieLens 20M dataset.",
      "Federated learning shares model updates only, never raw user data.",
      "Tackled scalability and cold-start challenges of large-scale recommenders.",
    ],
    tech: ["Federated Learning", "Collaborative Filtering", "Python"],
    category: "ai",
    image: "/Federated-Recommender-System.png",
    repo: "https://github.com/LethalZoro/Federated-Recommender-System",
    featured: true,
  },
  {
    slug: "rl-mario",
    title: "Reinforcement Learning Mario",
    summary:
      "A Gym Mario agent trained with DQN, CNN, and MobileNet-V2 policies.",
    bullets: [
      "Compared Deep Q-Network, CNN, and MobileNet-V2 approaches on the same environment.",
      "Best results with a Deep Q-Neural Network after reward shaping and frame stacking.",
    ],
    tech: ["Reinforcement Learning", "DQN", "PyTorch", "OpenAI Gym"],
    category: "ai",
    image: "/mario.png",
    repo: "https://github.com/LethalZoro/Gym-Mario-RL",
    featured: true,
  },
  {
    slug: "fpga-cnn",
    title: "Neural Network FPGA Inference",
    summary:
      "A CNN noise detector running real-time inference on a XILINX FPGA.",
    bullets: [
      "Converted 1-D time-series signals into 2-D image-like data and trained a CNN to separate noisy from clean signals.",
      "Deployed on a XILINX FPGA using High-Level Synthesis for optimized real-time inference.",
    ],
    tech: ["CNN", "XILINX FPGA", "HLS", "PyTorch"],
    category: "hardware",
    featured: true,
  },
  {
    slug: "hospital-website",
    title: "Hospital Platform",
    summary:
      "Full MERN hospital site with patient ticketing and an expense database.",
    bullets: [
      "Responsive UI with an integrated patient-ticket workflow and expense tracking.",
      "MERN stack, deployed on Firebase.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Firebase"],
    category: "web",
    image: "/hospital-website.png",
    live: "https://hospital-hassaan.web.app/",
    repo: "https://github.com/LethalZoro/Hospital-Website",
    featured: true,
  },
  {
    slug: "4bit-microprocessor",
    title: "4-Bit Microprocessor",
    summary:
      "A from-scratch 4-bit microprocessor with 8 instructions and 16 registers.",
    bullets: [
      "Supports arithmetic, branching, and looping; simulated end-to-end in Proteus.",
      "Digital design from the instruction set up: registers, ALU, and control logic.",
    ],
    tech: ["Digital Design", "Proteus"],
    category: "hardware",
    image: "/4-bit-microprocessor.gif",
    repo: "https://github.com/LethalZoro/4Bit-Microprocessor",
    featured: true,
  },
  {
    slug: "vision-transformer",
    title: "Vision Transformer (CIFAR-10)",
    summary:
      "A ViT image classifier built with PyTorch and the Hugging Face API.",
    bullets: [
      "Self-attention for vision: classifies the 10 CIFAR-10 classes with a Vision Transformer.",
    ],
    tech: ["PyTorch", "Hugging Face", "ViT"],
    category: "ai",
    featured: false,
  },
  {
    slug: "dental-voice-agent",
    title: "Dental Voice Agent",
    summary: "Voice-enabled assistant for dental practices.",
    bullets: [],
    tech: ["Voice AI"],
    category: "ai",
    repo: "https://github.com/LethalZoro/Dental-Voice-Agent",
    featured: false,
  },
  {
    slug: "chitral-concierge",
    title: "Chitral Concierge",
    summary: "AI concierge assistant application.",
    bullets: [],
    tech: ["Python", "LLMs"],
    category: "ai",
    repo: "https://github.com/LethalZoro/Chitral-Concierge",
    featured: false,
  },
  {
    slug: "riscv-pipelined",
    title: "RISC-V Pipelined Processor",
    summary: "Pipelined RISC-V processor architecture in Verilog.",
    bullets: [],
    tech: ["Verilog", "RISC-V"],
    category: "hardware",
    repo: "https://github.com/LethalZoro/RISC-V-Pipelined-Processor",
    featured: false,
  },
  {
    slug: "image-text-matching",
    title: "Image-Text Matching",
    summary: "Cross-modal matching between images and text.",
    bullets: [],
    tech: ["Deep Learning", "Multimodal"],
    category: "ai",
    repo: "https://github.com/LethalZoro/Image-Text-Matching",
    featured: false,
  },
  {
    slug: "chatbot-streamlit",
    title: "Chatbot Streamlit",
    summary: "Chatbot built with the OpenAI API and Streamlit.",
    bullets: [],
    tech: ["Python", "OpenAI API", "Streamlit"],
    category: "ai",
    repo: "https://github.com/LethalZoro/Chatbot-Streamlit",
    featured: false,
  },
  {
    slug: "bms-nodemcu",
    title: "BMS on NodeMCU",
    summary: "Battery-management system on NodeMCU.",
    bullets: [],
    tech: ["C++", "NodeMCU", "Embedded"],
    category: "hardware",
    repo: "https://github.com/LethalZoro/BMS_nodeMCU",
    featured: false,
  },
];
