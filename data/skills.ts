import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "C/C++", "JavaScript", "TypeScript", "Verilog", "AVR Assembly", "SQL", "LaTeX"],
  },
  {
    label: "AI / ML",
    skills: [
      "LLM Agents",
      "Voice Agents",
      "RAG",
      "Model Fine-tuning",
      "Computer Vision",
      "Reinforcement Learning",
      "Transformers / ViT",
      "Graph Neural Networks",
      "Federated Learning",
      "AI Automation",
    ],
  },
  {
    label: "Frameworks",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "LangChain",
      "LangGraph",
      "Hugging Face",
      "OpenCV",
      "Scikit-Learn",
      "NumPy",
      "Pandas",
    ],
  },
  {
    label: "Web / Full-Stack",
    skills: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "MERN", "WebSockets"],
  },
  {
    label: "Cloud / DevOps",
    skills: ["Docker", "AWS", "Google Cloud", "Vercel", "Render", "Firebase", "Git"],
  },
  {
    label: "Hardware / Embedded",
    skills: ["FPGA (XILINX, HLS)", "Digital System Design", "Raspberry Pi", "Arduino", "Embedded Systems"],
  },
];

/** Core-tool marquee strip between Projects and Skills. */
export const marqueeTools: string[] = [
  "PyTorch",
  "LangChain",
  "LangGraph",
  "OpenAI",
  "Hugging Face",
  "TensorFlow",
  "React",
  "Next.js",
  "Flask",
  "Docker",
  "AWS",
  "Raspberry Pi",
  "XILINX FPGA",
  "OpenCV",
];
