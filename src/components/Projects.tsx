import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Search } from "lucide-react";
import Magnetic from "./ui/Magnetic";

type ProjectCategory = "all" | "ai-security" | "recon" | "network" | "automation";

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  link: string;
  image: string;
  featured?: boolean;
  stars?: number;
}

const projects: Project[] = [
  {
    id: "0",
    title: "Neural Void Kernel",
    category: "ai-security",
    description: "Zero-day autonomous threat hunting algorithm. Detects behavioral anomalies in distributed neural networks before exploitation.",
    tech: ["Rust", "TensorFlow", "Zero-Trust"],
    link: "https://github.com/masssubash240",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    featured: true,
    stars: 5
  },
  {
    id: "1",
    title: "LLM SecurityX",
    category: "ai-security",
    description: "LLM attack detection & monitoring platform. Detects prompt injection, jailbreaks, data poisoning, and model stealing with real-time dashboards.",
    tech: ["Python", "LLM Security", "Threat Detection"],
    link: "https://github.com/masssubash240/LLM--SECURITYX",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    featured: true
  },
  {
    id: "2",
    title: "AI Cyber Defense System",
    category: "ai-security",
    description: "AI-driven cyber defense system with threat detection, real-time monitoring, and automated response capabilities.",
    tech: ["Python", "Flask", "Groq AI", "VirusTotal"],
    link: "https://github.com/masssubash240/-AI-Cyber-Defense-System",
    image: "https://images.unsplash.com/photo-1510511459019-5dee99c48db8?q=80&w=2670&auto=format&fit=crop",
    stars: 1
  },
  {
    id: "3",
    title: "OSINT AI Data Breach Detection",
    category: "ai-security",
    description: "OSINT-powered AI system for detecting data breaches. Aggregates intelligence to identify compromised assets and leaked credentials.",
    tech: ["Python", "Flask", "OpenCV", "Imagga AI", "OSINT"],
    link: "https://github.com/masssubash240/OSINT-AI-driven-Data-Breach-Detection",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "AI Powered Scam Detection",
    category: "ai-security",
    description: "AI-driven scam and phishing detection engine. Analyzes messages and URLs in real time to flag social engineering attempts.",
    tech: ["JavaScript", "AI Security", "NLP"],
    link: "https://github.com/masssubash240/AI--powered--scam-detection",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2606&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Advanced IP Tracer Tool",
    category: "recon",
    description: "Advanced IP geolocation and tracing tool. Maps IP addresses to geographic and network data including ISP and ASN.",
    tech: ["Python", "Geolocation", "OSINT"],
    link: "https://github.com/masssubash240/Advanced-IP-Tracer-Tool",
    image: "https://images.unsplash.com/photo-1551288049-bb25a5f4981d?q=80&w=2670&auto=format&fit=crop",
    stars: 1
  },
  {
    id: "6",
    title: "CyberScan Pro",
    category: "recon",
    description: "Professional-grade cybersecurity scanner. Performs port scanning, service enumeration, and vulnerability assessment.",
    tech: ["Python", "Nmap", "Pentesting"],
    link: "https://github.com/masssubash240/CyberScan-Pro",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "GHOST Matrix RAT",
    category: "recon",
    description: "Remote Access Trojan for security research. Demonstrates C2 communication, remote shell, and stealth persistence.",
    tech: ["Python", "C2", "Cyber Research"],
    link: "https://github.com/masssubash240/GHOST-Matrix-.-RAT-",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop",
    stars: 1
  },
  {
    id: "8",
    title: "WiFi Pentesting Toolkit",
    category: "network",
    description: "Wireless network security testing toolkit covering WPA2 handshake capture and deauthentication attacks.",
    tech: ["HTML", "Aircrack-ng", "Wireless"],
    link: "https://github.com/masssubash240/WIFI-Pentesting",
    image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "9",
    title: "Bluetooth Jammer",
    category: "network",
    description: "Bluetooth security research tool demonstrating BT signal disruption for controlled lab environments.",
    tech: ["HTML", "Arduino", "Wireless"],
    link: "https://github.com/masssubash240/Bluetooth-Jammer",
    image: "https://images.unsplash.com/photo-1558483320-dc69223e75e9?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "10",
    title: "USB Digispark Tools",
    category: "network",
    description: "BadUSB payloads and Digispark microcontroller scripts for hardware-based pentesting HID attack simulations.",
    tech: ["C++", "Rubber Ducky", "Hardware"],
    link: "https://github.com/masssubash240/USB-Digispark-tools",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "11",
    title: "Web Login Bruteforce",
    category: "network",
    description: "Automated credential testing tool for web login forms. Supports dictionary attacks and rate-limit analysis.",
    tech: ["Python", "Hydra", "Automation"],
    link: "https://github.com/masssubash240/Web-Login-Bruteforce",
    image: "https://images.unsplash.com/photo-1531746790731-6c2079ee3922?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "12",
    title: "AI N8n Security Automations",
    category: "automation",
    description: "Security automation workflows built with N8n. Automates threat alert triage and incident response pipelines.",
    tech: ["n8n", "Webhooks", "Automation"],
    link: "https://github.com/masssubash240/AI---N8n-security-automations",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "13",
    title: "Anonymous AI Chatbot",
    category: "automation",
    description: "Privacy-focused AI chatbot with anonymous mode. Context-aware responses with a clean interface for secure communication.",
    tech: ["LLM API", "Prompt Eng.", "UI"],
    link: "https://github.com/masssubash240/Anonymous---Advanced-AI-Chatbot",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2574&auto=format&fit=crop",
    stars: 1
  },
  {
    id: "14",
    title: "Hand Gesture Gaming Suite",
    category: "automation",
    description: "Computer vision gaming controller using MediaPipe hand tracking. Maps real-time gestures to game inputs.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    link: "https://github.com/masssubash240/Hand--Gesture-Gaming-Suite",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "15",
    title: "System Automation",
    category: "automation",
    description: "Cross-platform system automation scripts handling task scheduling, file management, and process monitoring.",
    tech: ["Python", "Bash", "Schedules"],
    link: "https://github.com/masssubash240/System-Automation",
    image: "https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=2670&auto=format&fit=crop",
    stars: 1
  },
  {
    id: "16",
    title: "AI Workflow",
    category: "automation",
    description: "Modular AI workflow pipeline for chaining LLM tasks and automated decision-making in security contexts.",
    tech: ["LangChain", "AI Agents", "Logic"],
    link: "https://github.com/masssubash240/-AI-workflow",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2668&auto=format&fit=crop"
  },
  {
    id: "17",
    title: "Crypto Sentinel",
    category: "ai-security",
    description: "Advanced AI system for monitoring blockchain transactions and detecting fraudulent patterns in real-time. Protects digital assets with high-fidelity threat intelligence.",
    tech: ["Ethereum", "Solidity", "AI Detection"],
    link: "https://github.com/masssubash240/Crypto-Sentinel",
    image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=2670&auto=format&fit=crop",
    stars: 3
  },
  {
    id: "18",
    title: "FinGate AI",
    category: "automation",
    description: "Automated financial gatekeeper for secure transaction processing. Integrates biometric verification with AI-powered risk assessment for institutional security.",
    tech: ["Biometrics", "Deep Learning", "Fintech"],
    link: "https://github.com/masssubash240/FinGate-AI",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop",
    featured: true
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.category === filter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-60 px-6 relative overflow-hidden bg-black">
      {/* Cinematic Top Fade */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-black to-transparent z-10" />
      
      <div className="max-w-[1700px] mx-auto relative z-20">
        <div className="flex flex-col gap-20 mb-40">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/30">
                LATEST REPERTOIRE_
              </span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-[10vw] md:text-[8rem] font-black leading-[0.85] tracking-[-0.06em] uppercase text-white"
            >
              CRAFTED<br />
              <span className="font-serif italic text-white/10 outline-text">MANIFESTOS.</span>
            </motion.h3>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <p className="max-w-xl text-2xl text-white/40 font-medium leading-tight tracking-tight">
              An evolving collection of high-fidelity prototypes and deployed systems within the latent space of security and intelligence.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-md group"
            >
              <input
                type="text"
                placeholder="SEARCH_THE_ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-10 text-xs font-black tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all backdrop-blur-2xl"
              />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 group-focus-within:bg-white transition-colors" />
            </motion.div>
          </div>
        </div>

        {/* Projects Control Bar */}
        <div className="flex justify-center mb-32">
          <div className="inline-flex items-center gap-1 p-2 glass rounded-full border border-white/5 backdrop-blur-3xl cinematic-glow">
            {(["all", "ai-security", "recon", "network", "automation"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 rounded-full relative group ${
                  filter === cat ? "text-black" : "text-white/30 hover:text-white"
                }`}
              >
                <span className="relative z-10">{cat.replace("-", " ")}</span>
                {filter === cat && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start perspective-2000"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isLarge = project.featured || index % 5 === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10, z: 100 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className={`relative group overflow-hidden rounded-[3rem] bg-[#080808] border border-white/5 cinematic-glow transition-all duration-1000 hover:border-white/20 hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:border-white/50 preserve-3d ${
                    isLarge ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5]"
                  }`}
                >
                  {/* Image with Parallax & Zoom */}
                  <div className="absolute inset-0 grayscale contrast-125 brightness-50 group-hover:brightness-90 group-hover:scale-110 transition-all duration-[2000ms] ease-out">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover cyber-glitch-img"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply group-hover:mix-blend-normal transition-all duration-1000" />
                    <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
                  </div>

                  {/* Editorial Content Overlay */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="px-5 py-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                          {project.category.replace("-", ".")}
                        </span>
                      </div>
                      
                      <div className="flex gap-4">
                        <Magnetic strength={0.3}>
                          <a href={project.link} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-500">
                             <Github size={18} />
                          </a>
                        </Magnetic>
                      </div>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                       <h4 className={`font-black leading-tight tracking-tighter uppercase text-white transition-all duration-700 ${
                         isLarge ? "text-5xl md:text-7xl" : "text-3xl"
                       }`}>
                         {project.title}
                       </h4>
                       
                       <p className={`font-medium tracking-tight text-white/40 leading-relaxed transition-all duration-1000 ${
                         isLarge ? "text-xl line-clamp-2" : "text-sm line-clamp-3"
                       }`}>
                         {project.description}
                       </p>

                       <div className="flex flex-wrap gap-2 pt-4">
                         {project.tech.map((t) => (
                           <span key={t} className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 border border-white/5 px-4 py-2 rounded-full">
                             {t}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* Glossy Reflective Overlay */}
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/5 rounded-[3rem]">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-grey animate-pulse">
              No protocol match found_
            </span>
          </div>
        )}
      </div>

    </section>
  );
}
