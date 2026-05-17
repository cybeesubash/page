import { motion } from "motion/react";
import Magnetic from "./ui/Magnetic";

const navItems = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#toolkit" },
  { name: "Contact", href: "#connect" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full px-6 flex justify-center pointer-events-none"
    >
      <div className="glass rounded-full px-2 py-2 flex items-center gap-1 bg-black/40 border border-white/5 backdrop-blur-3xl cinematic-glow pointer-events-auto overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Logo */}
        <Magnetic strength={0.2}>
          <div className="px-6 py-2.5 bg-black text-white border border-white/10 rounded-full cursor-pointer">
            <span className="font-display font-black tracking-tighter text-sm uppercase">SK.</span>
          </div>
        </Magnetic>

        {/* Global Nav */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Magnetic key={item.name} strength={0.3}>
              <a
                href={item.href}
                className="px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all duration-500 block"
              >
                {item.name}
              </a>
            </Magnetic>
          ))}
        </div>

        <Magnetic strength={0.2}>
          <a href="#connect" className="ml-4 px-8 py-2.5 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-500 hover:scale-[1.02] block">
            Let's Talk
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
