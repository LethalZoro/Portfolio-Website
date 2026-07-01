import type { Certification, Education, Publication } from "@/lib/types";

export const education: Education[] = [
  {
    school: "National University of Sciences and Technology (NUST), Islamabad",
    degree: "B.E. Electrical & Electronics Engineering",
    period: "Nov 2021 – Jun 2025",
    detail: [
      "CGPA 3.5",
      "Final Year Project: Hardware Trojan Detection using Graph Neural Networks",
      "Coursework: AI, Computer Vision, NLP, Embedded Systems, Digital System Design, DSA, DSP",
    ],
  },
  {
    school: "Cadet College Hasanabdal",
    degree: "FSc Pre-Engineering",
    period: "Apr 2019 – Jul 2021",
    detail: ["Abdalian '63"],
  },
];

export const publication: Publication = {
  title:
    "Speaker Recognition: A Comparative Analysis Between Deep Learning and Non-Deep Learning Methodologies",
  venue: "Asian Bulletin of Big Data Management",
  authors: "Muhammad Mustafa, Ahmad Faisal Mirza, Zoha Ahmed, Sakhi Usman Akbar",
};

export const certifications: Certification[] = [
  { title: "Neural Networks and Deep Learning", provider: "DeepLearning.AI" },
  { title: "Structuring Machine Learning Projects", provider: "DeepLearning.AI" },
  { title: "Sequence Models", provider: "DeepLearning.AI" },
  { title: "Supervised ML: Regression and Classification", provider: "DeepLearning.AI" },
  { title: "Unsupervised Learning, Recommenders, RL", provider: "DeepLearning.AI" },
];
