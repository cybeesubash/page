import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const skills = [
    "AI / Gen AI", "Cyber Security", "Full-Stack Dev", "IoT Architecture", 
    "Software Development", "Ethical Hacking", "Automation Pipelines", "OSINT", "LLM Integration", "Security Auditing"
  ];

  return (
    <section id="about" ref={containerRef} className="py-40 px-6 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1700px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          <motion.div
            style={{ y, opacity, scale }}
            className="relative group perspective-2000"
          >
            {/* Multi-layered cinematic glow */}
            <div className="absolute -inset-20 bg-white/5 blur-[140px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-[2000ms]" />
            <div className="absolute -inset-10 bg-white/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-[1500ms]" />
            
            <motion.div 
              whileHover={{ rotateY: -12, rotateX: 6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden grayscale contrast-[1.15] brightness-[0.9] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] preserve-3d"
            >
              <img 
                src="/king.png" 
                alt="Subash Kumar Portrait" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Dynamic light overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/10 opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              
              {/* Floating ID Tag with advanced glassmorphism */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-10 left-10 right-10 p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">ENCRYPTED_ID_</span>
                    <span className="text-[15px] font-black uppercase text-white tracking-[0.2em] flex items-center gap-3">
                      S.KUMAR_V5.0
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" />
                    </span>
                  </div>
                  <div className="px-5 py-2.5 rounded-full border border-white/10 bg-black/40 text-[9px] font-black text-white/40 tracking-[0.3em] uppercase">
                    Active
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-8">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[1px] bg-white/20" 
                />
                <span className="text-[11px] font-black tracking-[0.8em] uppercase text-white/20">
                  PROTOCOL_ARCHIVE
                </span>
              </div>
              
              <div className="relative">
                <h3 className="text-[10vw] lg:text-[7.5rem] font-black leading-[0.8] tracking-[-0.05em] uppercase text-white">
                  GOD OF<br />
                  <span className="text-white/5 outline-text-thick transition-all duration-700 hover:text-white/10">CYBER.</span>
                </h3>
                <div className="absolute -top-10 -right-10 w-24 h-24 border-t border-r border-white/5 pointer-events-none" />
              </div>
            </div>

            <p className="text-2xl lg:text-3xl font-medium leading-[1.4] text-white/40 max-w-2xl tracking-tight">
              Architecting <span className="text-white">autonomous intelligence</span> systems and high-entropy defensive frameworks. Bridging the gap between <span className="italic font-serif text-white/70">neural computation</span> and kinetic security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {[
                { title: "Strategic Vision", desc: "Developing adaptive threat intelligence for hyper-scale autonomous ecosystems." },
                { title: "Technical Mastery", desc: "Expertise in full-spectrum offensive security and neural network hardening." }
              ].map((item, idx) => (
                <div key={idx} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 group">
                  <span className="block text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-4 group-hover:text-white/40 transition-colors">0{idx + 1}_MODE</span>
                  <h4 className="text-[13px] font-black uppercase text-white tracking-widest mb-4">{item.title}</h4>
                  <p className="text-[12px] font-medium leading-[1.8] text-white/40 group-hover:text-white/60 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-6">
              {skills.map((skill, index) => (
                <motion.span 
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="px-8 py-3 bg-white/[0.03] border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#555] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-500 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
