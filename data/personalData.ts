import { PageInfo, Social, Skill, Experience, Project } from "../typings";

// Static timestamp to avoid hydration issues
const STATIC_TIMESTAMP = '2024-01-01T00:00:00.000Z';

// Your personal information
export const pageInfo: PageInfo = {
  _type: 'pageInfo',
  _id: 'pageInfo',
  _createdAt: STATIC_TIMESTAMP,
  _updatedAt: STATIC_TIMESTAMP,
  _rev: '',
  name: 'Mustafa',
  role: 'AI Engineer & Software Developer',
  email: 'muhammadmustafakhakwani@gmail.com',
  phoneNumber: '+92 309 3243363', // You can update this
  address: 'Islamabad, Pakistan',
  backgroundInformation: "Hey 👋🏼 I'm Muhammad Mustafa, an AI Engineer currently working at Salik Labs in Pakistan. I completed my undergraduate degree in Electrical Engineering with a focus on Embedded Systems and AI. I have hands-on experience working across the AI stack, from developing machine learning models to building full-stack AI-powered applications. I'm passionate about leveraging technology to solve real-world problems and have experience with modern AI/ML frameworks, web development, and system optimization. When I'm not coding or working on AI projects, you'll probably find me deep into One Piece lore or dodging bosses in Elden Ring 🎮.",
  heroImage: null as any,
  profilePic: null as any
};

// Your social media links
export const socials: Social[] = [
  {
    _type: 'social',
    _id: 'linkedin',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/muhammad-mustafa-633216a6/' // Update with your LinkedIn
  },
  {
    _type: 'social',
    _id: 'github',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'GitHub',
    url: 'https://github.com/lethalzoro' // Update with your GitHub
  },
    {
    _type: 'social',
    _id: 'instagram',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Instagram',
    url: 'https://www.instagram.com/mustafa_3d2y/'
  },

  {
    _type: 'social',
    _id: 'email',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Email',
    url: 'mailto:muhammadmustafakhakwani@gmail.com'
  }
];

// Your skills based on AI Engineer role
export const skills: Skill[] = [
  {
    _type: 'skill',
    _id: 'python',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Python',
    progress: 95,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'tensorflow',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'TensorFlow',
    progress: 95,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'pytorch',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'PyTorch',
    progress: 95,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'aws',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'AWS',
    progress: 80,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'gcp',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Google Cloud',
    progress: 85,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'javascript',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'JavaScript',
    progress: 75,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'react',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'React',
    progress: 70,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'data-science',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Data Science',
    progress: 80,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'docker',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Docker',
    progress: 75,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'git',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Git',
    progress: 85,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'sql',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'SQL',
    progress: 80,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        _type: 'reference'
      }
    }
  },
  {
    _type: 'skill',
    _id: 'embedded-systems',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Embedded Systems',
    progress: 95,
    image: {
      _type: 'image',
      asset: {
        _ref: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
        _type: 'reference'
      }
    }
  }
];

// Your actual experience data from resume
export const experiences: Experience[] = [
  {
    _type: 'experience',
    _id: 'romi-lab-research-assistant',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    company: 'Robotics and Machine Intelligence (ROMI) Lab',
    jobTitle: 'Research Assistant',
    dateStarted: 'Feb 2024' as any,
    dateEnded: 'May 2025' as any,
    isCurrentlyWorkingHere: false,
    points: [
      'Working on a research-based project in collaboration with professors at Tennessee Tech, USA',
      'Focused on detecting Trojans in IP (Intellectual Property) and at the SOC (System on Chip) development stage',
      'Utilizing Graph Neural Networks (GNNs) for Trojan detection by converting Verilog code into graph structures',
      'Developing innovative approaches that capture hierarchical structure of IP modules through graph representations',
      'Implementing advanced machine learning techniques for cybersecurity applications in hardware design'
    ],
    companyImage: {
      _type: 'image',
      asset: {
        _ref: '/rumi-lab-nust.png',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  },
  {
    _type: 'experience',
    _id: 'salik-labs-ai-engineer',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    company: 'Salik Labs',
    jobTitle: 'AI Engineer',
    dateStarted: 'Jun 2025' as any,
    dateEnded: null as any,
    isCurrentlyWorkingHere: true,
    points: [
      'Lead development and deployment of machine learning models for production environments, ensuring scalability and reliability',
      'Architect and build AI-powered applications using cutting-edge frameworks including TensorFlow, PyTorch, and modern web technologies',
      'Design and implement end-to-end AI solutions from data preprocessing to model deployment and monitoring',
      'Research and implement state-of-the-art AI/ML algorithms to solve complex business problems and drive innovation'
    ],
    companyImage: {
      _type: 'image',
      asset: {
        _ref: '/saliklabs.png',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  },
  {
    _type: 'experience',
    _id: 'ncai-deep-learning-intern',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    company: 'Deep Learning Lab, National Centre of Artificial Intelligence (NCAI)',
    jobTitle: 'Deep Learning Research Intern',
    dateStarted: 'Jun 2023' as any,
    dateEnded: 'Feb 2024' as any,
    isCurrentlyWorkingHere: false,
    points: [
      'Implemented transformer models on edge devices using FPGA to reduce computation and enable local execution',
      'Focused on optimizing transformer model performance for deployment on resource-constrained edge devices',
      'Conducted research on efficient deep learning architectures for embedded systems and IoT applications',
      'Collaborated with research teams to develop novel approaches for model compression and acceleration',
      'Contributed to advancing the field of edge AI through practical implementation and performance optimization'
    ],
    companyImage: {
      _type: 'image',
      asset: {
        _ref: '/tukl.jpeg',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  },
  {
    _type: 'experience',
    _id: 'ai-data-house-junior-ai-developer',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    company: 'AI Data House (SMC-PVT) LTD',
    jobTitle: 'Junior AI Developer',
    dateStarted: 'Feb 2025' as any,
    dateEnded: 'Apr 2025' as any,
    isCurrentlyWorkingHere: false,
    points: [
      'Developed a Handball Game statistics program using Computer Vision (CV) applications for real-time sports analytics',
      'Created, tested and fine-tuned various Large Language Models (LLMs) for diverse chatbot applications',
      'Integrated machine learning backends into websites to enhance functionality and user experience',
      'Delivered cutting-edge AI solutions for sports analytics and web applications in an on-site environment',
      'Collaborated with cross-functional teams to implement AI-driven features and optimize model performance'
    ],
    companyImage: {
      _type: 'image',
      asset: {
        _ref: '/ai-data-house.jpeg',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  }
];

// Your AI/ML projects
export const projects: Project[] = [

      {
    _type: 'project',
    _id: 'contract-summary-ai',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Contract Summary AI',
    summary: 'Built a full-stack application using Flask and React to summarize and analyze UK construction contracts. Implemented RAG with LangChain, GPT-4o, and ChromaDB for document processing and conversational AI.',
    linkToBuild: 'https://react-contract-chatbot.vercel.app/',
    image: {
      _type: 'image',
      asset: {
        _ref: '/contract-summary.png',
        _type: 'reference'
      }
    },
    technologies: []
  },
  {
    _type: 'project',
    _id: 'langgraph-chatbot',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'LangGraph Chatbot Workflow',
    summary: 'Developed an interactive chatbot system leveraging LangGraph, LangChain, and Local LLM model, deployed on Render. Built conversational flows with real-time WebSocket communication and responsive frontend design.',
    linkToBuild: 'https://langgraph-chatbot-wtth.onrender.com/',
    image: {
      _type: 'image',
      asset: {
        _ref: '/langgraph-ai.png',
        _type: 'reference'
      }
    },
    technologies: []
  },
  {
    _type: 'project',
    _id: 'hospital-website',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Hospital Website',
    summary: 'Developed a fully functional hospital website with patient ticketing system and expense database using MERN stack, deployed on Firebase. Features responsive design and integrated patient management.',
    linkToBuild: 'https://hospital-hassaan.web.app/',
    image: {
      _type: 'image',
      asset: {
        _ref: '/hospital-website.png',
        _type: 'reference'
      }
    },
    technologies: []
  },

  {
    _type: 'project',
    _id: 'federated-learning-recommendation',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Federated Learning Movie Recommendation System',
    summary: 'Developed a privacy-preserving movie recommendation system using Federated Learning and Collaborative Filtering on MovieLens 20M dataset. Addressed scalability and cold start challenges.',
    linkToBuild: 'https://github.com/LethalZoro/Federated-Recommender-System', // Update with actual project link
    image: {
      _type: 'image',
      asset: {
        _ref: '/Federated-Recommender-System.png',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  },
  {
    _type: 'project',
    _id: '4-bit-microprocessor',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: '4-Bit Microprocessor',
    summary: 'Designed a simple 4-bit microprocessor for basic arithmetic and control operations. Includes 8 instructions and 16 4-bit registers, capable of arithmetic, branching, and looping. Simulated in Proteus.',
    linkToBuild: 'https://github.com/LethalZoro/4Bit-Microprocessor', // Update with actual project link
    image: {
      _type: 'image',
      asset: {
        _ref: '/4-bit-microprocessor.gif',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  },
  {
    _type: 'project',
    _id: 'reinforcement-learning-mario',
    _createdAt: STATIC_TIMESTAMP,
    _updatedAt: STATIC_TIMESTAMP,
    _rev: '',
    title: 'Reinforcement Learning Mario Agent',
    summary: 'Trained a Mario agent using various reinforcement learning algorithms including DQNN, CNN, and MobileNet-V2. Achieved optimal results with Deep Q-Neural Network implementation.',
    linkToBuild: 'https://github.com/LethalZoro/Gym-Mario-RL', // Update with actual project link
    image: {
      _type: 'image',
      asset: {
        _ref: '/mario.png',
        _type: 'reference'
      }
    },
    technologies: [] // Will be populated based on your tech stack
  }
];
