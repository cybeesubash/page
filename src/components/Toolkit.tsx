import { motion } from "motion/react";
import { 
  Shield, 
  Code2, 
  Search, 
  Terminal, 
  Layers, 
  Cpu,
  BrainCircuit,
  Globe
} from "lucide-react";

const tools = [
  {
    category: "Software Dev",
    icon: Code2,
    items: ["React.js", "Node.js", "Django", "Flask", "React Native", "Firebase", "Supabase"]
  },
  {
    category: "AI / Gen AI",
    icon: BrainCircuit,
    items: ["LLM API", "Prompt Engineering", "OpenCV", "Imagga AI", "Google Vision", "FaceNet", "CLIP"]
  },
  {
    category: "AI Security",
    icon: Shield,
    items: ["Threat Detection", "Malware Classification", "OSINT AI", "Deepfake Detection", "VirusTotal API"]
  },
  {
    category: "Automation",
    icon: Terminal,
    items: ["n8n Workflows", "AI Agents", "REST APIs", "Webhooks", "Security Alert Pipelines"]
  },
  {
    category: "IoT / Hardware",
    icon: Cpu,
    items: ["ESP32 Marauder", "Arduino", "Raspberry Pi", "Digispark USB", "NRF24", "Sensors"]
  },
  {
    category: "Languages & Core",
    icon: Globe,
    items: ["Python", "JavaScript", "Bash", "C/C++", "MySQL", "SQLite", "Linux CLI"]
  }
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-40 px-6 relative">
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/30">
                ARSENAL_01
              </span>
            </motion.div>
            <h3 className="text-8xl md:text-[10rem] font-black leading-[0.75] tracking-[-0.06em] uppercase text-white">
              CORE.<br />
              <span className="text-white/10 outline-text">02</span>
            </h3>
          </div>

          <div className="flex flex-col gap-8 lg:text-right lg:items-end">
            <p className="max-w-md text-2xl text-white/40 font-medium leading-tight tracking-tight uppercase">
              A precise selection of advanced frameworks and protocols for high-integrity mission profiles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="group p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-1000 relative overflow-hidden cinematic-glow backdrop-blur-3xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity duration-1000 grayscale">
                <group.icon size={150} />
              </div>

              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                    <group.icon size={28} />
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tighter text-white">{group.category}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {group.items.map((item) => (
                    <span 
                      key={item}
                      className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white hover:border-white/40 transition-all duration-500 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
