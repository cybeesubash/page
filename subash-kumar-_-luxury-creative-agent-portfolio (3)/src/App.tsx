/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Toolkit from "./components/Toolkit";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Connect from "./components/Connect";
import Background3D from "./components/Background3D";
import { useEffect, useState } from "react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.group') !== null ||
        target.classList.contains('cursor-pointer')
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative selection:bg-white selection:text-black min-h-screen bg-black font-sans">
      <Background3D />
      <div className="cinematic-smoke" />
      
      {/* Cinematic Custom Cursor - Orbit */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/20 pointer-events-none z-[100] hidden md:flex items-center justify-center backdrop-blur-[2px]"
        animate={{ 
          x: mousePosition.x - 24, 
          y: mousePosition.y - 24,
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      >
        <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" />
      </motion.div>
      
      {/* Cinematic Cursor Atmosphere */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 bg-white/[0.04] rounded-full blur-[60px] pointer-events-none z-[99] hidden md:block"
        animate={{ 
          x: mousePosition.x - 80, 
          y: mousePosition.y - 80,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: "spring", damping: 40, stiffness: 100, mass: 2 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="space-y-0">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <About />
        </motion.div>

        <Experience />
        
        <Toolkit />
        
        <Certifications />
        
        <Projects />
        
        <Connect />
      </main>

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      <div className="fixed inset-0 pointer-events-none z-[998] bg-gradient-radial from-transparent via-transparent to-black" />
    </div>
  );
}

