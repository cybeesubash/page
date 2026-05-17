import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const Stat = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-1">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="block text-4xl md:text-5xl font-black tracking-tighter"
    >
      {value}
    </motion.span>
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40"
    >
      {label}
    </motion.span>
  </div>
);

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Ambience Control */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/[0.02] blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-white/[0.01] blur-[100px] -z-10" />

      <div className="flex-1 max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-12">
          {/* Availability Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-2xl"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,1)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">System Online • v4.0.0</span>
          </motion.div>

          {/* Headline Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="space-y-[-0.1em] text-center lg:text-left"
            >
              <h1 className="text-[clamp(4rem,15vw,14rem)] font-black leading-[0.7] tracking-[-0.07em] uppercase text-white">
                SUBASH
              </h1>
              <h1 className="text-[clamp(3.5rem,13vw,12rem)] font-serif italic leading-[1] text-white/80">
                Kumar
              </h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="pt-8"
              >
                <span className="holographic-text text-lg md:text-2xl font-medium tracking-[0.2em] uppercase">
                  Lead Architect • Cyber Frontiers
                </span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/50 max-w-xl font-medium leading-tight tracking-tight text-center lg:text-left"
            >
              Crafting <span className="text-white">autonomous intelligence</span> & offensive cybersecurity systems for the future vanguard.
            </motion.p>
          </div>

          {/* CTA Row */}
          <motion.div 
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
          >
            <Magnetic strength={0.3}>
              <a href="#projects" className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-[12px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-700 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] block">
                <span className="relative z-10 flex items-center gap-4">
                  View Work
                  <ArrowRight size={14} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </a>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <a 
                href="mailto:m.subashkumar3@gmail.com"
                className="group relative px-8 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[11px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all duration-700 flex items-center gap-4"
              >
                m.subashkumar3@gmail.com
                <div className="w-2 h-2 rounded-full bg-white opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(255,255,255,1)] transition-all duration-700" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Portrait Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 group shadow-2xl"
          >
            <img 
              src="/boss.png" 
              alt="Portrait"
              className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:scale-110 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
              <div className="space-y-1">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40">ENGINEER</span>
                <span className="block text-base font-black uppercase tracking-tight text-white">M. Subash Kumar</span>
              </div>
              <div className="px-3 py-1 border border-white/10 rounded-lg bg-black/40 backdrop-blur-md">
                <span className="text-[8px] font-black text-white/30 tracking-widest">2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className="max-w-[1400px] mx-auto w-full pt-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-32">
        <Stat value="50+" label="HTB Machines" />
        <Stat value="100+" label="THM Rooms" />
        <Stat value="25+" label="CTFs Played" />
      </div>
    </section>
  );
}
