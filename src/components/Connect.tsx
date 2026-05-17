import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Instagram, Twitter, Mail, MessageSquare, ArrowRight, MapPin, Globe, Shield, Send, RotateCcw, User, Bot, Sparkles } from 'lucide-react';
import Magnetic from './ui/Magnetic';

const SocialIcon = ({ Icon, href, label }: { Icon: any, href: string, label: string }) => {
  return (
    <Magnetic strength={0.3}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 transition-all duration-700 bg-white/5 backdrop-blur-xl hover:border-white/40 hover:bg-white/10"
        whileHover={{ 
          y: -8, 
          scale: 1.15,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
           whileHover={{ rotate: 15 }}
           transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />
        </motion.div>
        
        <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[10px] uppercase font-black tracking-widest text-white/40 whitespace-nowrap pointer-events-none">
          {label}
        </span>
        
        {/* Soft Glow Pulse */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 -z-10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Physical Reflection Shine */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 animate-shine" />
        </div>
      </motion.a>
    </Magnetic>
  );
};

const MagneticButton = ({ children, className, type = "button", disabled = false }: { children: React.ReactNode, className?: string, type?: "button" | "submit" | "reset", disabled?: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative py-5 px-10 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] overflow-hidden group shadow-2xl transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Liquid Metal Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#e2e2e2] to-[#ffffff] transition-transform duration-1000 group-hover:scale-110" />
      
      {/* High Contrast Metal Highlights */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1),transparent_70%)] opacity-40 blur-sm" />
      </div>

      {/* Cinematic Lighting Sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
      </div>
      
      {/* Inner Shadow for Depth */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.5),inset_0_-2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center gap-3">
        {children}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
};

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+{}:\"<>?|ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Connect() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, parts: {text: string}[]}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isSending, setIsSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "fa6609c6-8937-4a56-8f4a-9859611dc17b");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            setSubmitMessage("Success! Your message has been sent.");
            (e.target as HTMLFormElement).reset();
        } else {
            setSubmitMessage("Error: " + data.message);
        }
    } catch (error) {
        setSubmitMessage("Something went wrong. Please try again.");
    } finally {
        setIsSending(false);
        setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isTyping) return;

    const userMsg = { role: 'user', parts: [{ text: chatMessage }] };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: chatMessage, 
          history: chatHistory 
        }),
      });

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: "Communication link unstable. Please retry signal relay." }] }]);
    } finally {
      setIsTyping(false);
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, 20]);

  return (
    <section 
      ref={containerRef}
      id="connect" 
      className="relative min-h-[140vh] py-32 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Cinematic Fog & Smoke Effects */}
      <div className="cinematic-smoke opacity-30" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />
      
      {/* Volumetric Spotlights */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[120%] bg-white/[0.03] blur-[150px] rotate-[35deg] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[120%] bg-white/[0.02] blur-[150px] rotate-[-35deg] pointer-events-none" />

      <motion.div 
        style={{ opacity, scale, filter: `blur(${blur}px)` }}
        className="relative z-20 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center"
      >
        {/* Left Side: Elite Editorial Layout */}
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-10">
            {/* Live Availability Status Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-6"
            >
              <div className="glass px-6 py-3 rounded-full border-white/5 flex items-center gap-3 silver-glow">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Available Worldwide_</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hidden md:block">
                Open for Elite Partnerships
              </div>
            </motion.div>

            <h2 className="text-8xl md:text-9xl lg:text-[14rem] font-black leading-[0.75] tracking-[-0.08em] text-white uppercase perspective-1000">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%", rotateX: 30 }}
                  whileInView={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="block origin-bottom"
                >
                  Innovate
                </motion.span>
              </div>
              <div className="overflow-hidden mt-2">
                <motion.span
                  initial={{ y: "110%", rotateX: 30 }}
                  whileInView={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                  className="block origin-bottom outline-text !opacity-10 hover:opacity-100 transition-all duration-700 cursor-default"
                >
                  Together
                </motion.span>
              </div>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-2xl md:text-4xl text-white/30 max-w-2xl font-medium leading-[1.15] tracking-tight"
            >
              For those who demand the absolute <span className="text-white">pinnacle</span> of technology and <span className="italic font-serif text-white/60">avant-garde</span> design.
            </motion.p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('form')}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${activeTab === 'form' ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}
            >
              Transmission_Form
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border flex items-center gap-3 ${activeTab === 'chat' ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}
            >
              <Sparkles size={14} />
              AI_Agent_Secure
            </button>
          </div>

          {/* Luxury Social Connect Capsules */}
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-16 bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">DIGITAL_NODES_</span>
            </div>
            <div className="flex flex-wrap gap-8">
              <SocialIcon Icon={Github} href="https://github.com/masssubash240" label="GitHUB" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com/in/subash-kumar-8a07ab344" label="LINKEDin" />
              <SocialIcon Icon={Shield} href="https://tryhackme.com/p/masssubash240" label="TRYHACKME" />
              <SocialIcon Icon={Instagram} href="https://www.instagram.com/god_of_cyber_/" label="INSTAGRAM" />
              <SocialIcon Icon={Mail} href="mailto:m.subashkumar3@gmail.com" label="ENCRYPTED_MAIL" />
            </div>
          </div>

          {/* Premium Status Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex flex-wrap gap-12 pt-10 border-t border-white/5"
          >
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 block">Protocol_</span>
              <p className="text-xs font-medium tracking-widest text-white/60">END-TO-END ENCRYPTED</p>
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 block">Latency_</span>
              <p className="text-xs font-medium tracking-widest text-white/60">GLOBAL_RESPONSE {"<"} 24H</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tabbed Interface */}
        <div className="lg:col-span-5 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -40 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="group relative"
              >
                {/* Multi-layered Glass Panel with Highlights */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px] rounded-[3.5rem] -z-10 transition-all duration-1000 group-hover:bg-white/[0.04] shadow-2xl border border-white/10" />
                <div className="absolute inset-x-[15%] -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-y-[15%] -left-[1px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                
                <div className="relative p-10 md:p-16 space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-medium tracking-tight holographic-text">Transmission.</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] holographic-text-dim">
                      <ScrambleText text="SECURE_SIGNAL_INITIATED_v4.0" />
                    </p>
                  </div>

                  <form className="space-y-8" onSubmit={handleFormSubmit}>
                    <div className="space-y-3 group/field">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 ml-1 transition-colors group-focus-within/field:text-white">The_Identity</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Signature or Name"
                        className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 placeholder:text-white/20"
                      />
                    </div>

                    <div className="space-y-3 group/field">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 ml-1 transition-colors group-focus-within/field:text-white">Digital_Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="email@vault.com"
                        className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 placeholder:text-white/20"
                      />
                    </div>

                    <div className="space-y-3 group/field">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 ml-1 transition-colors group-focus-within/field:text-white">Mission_Scope</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        placeholder="Brief us on your visionary project description..."
                        className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 placeholder:text-white/20 resize-none min-h-[160px]"
                      />
                    </div>

                    <div className="pt-6 relative">
                      <MagneticButton type="submit" disabled={isSending} className="w-full group">
                        <span className="group-hover:tracking-[0.3em] transition-all duration-700">
                          {isSending ? "Transmitting..." : "Send Encrypted Base_"}
                        </span>
                      </MagneticButton>
                      {submitMessage && (
                        <p className="absolute -bottom-8 left-0 right-0 text-center text-xs font-medium tracking-widest text-white/60">
                          {submitMessage}
                        </p>
                      )}
                    </div>
                  </form>
                </div>

                {/* Floating Holographic Labels Attached to Form */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-12 glass px-5 py-3 rounded-2xl border-white/10 silver-glow backdrop-blur-3xl hidden xl:block"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-3 h-3 text-white/40" />
                    <span className="text-[9px] font-black tracking-[0.3em] text-white/60">NODE_BENGALURU_01</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-12 glass px-5 py-4 rounded-2xl border-white/10 silver-glow backdrop-blur-3xl hidden xl:block"
                >
                  <div className="space-y-1">
                    <span className="text-[7px] block font-black uppercase text-white/20 tracking-widest">Signal_Strength</span>
                    <div className="flex gap-1">
                      {[1,1,1,1,0.5].map((op, i) => (
                        <div key={i} className="w-1 h-3 bg-white rounded-full" style={{ opacity: op * 0.5 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -40 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="group relative h-[700px] flex flex-col"
              >
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px] rounded-[3.5rem] -z-10 transition-all duration-1000 group-hover:bg-white/[0.04] shadow-2xl border border-white/10" />
                
                <div className="p-10 pb-6 flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium tracking-tight text-white flex items-center gap-3">
                      AI_Security_Agent
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </h3>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-white/30">Secure_Neural_Link_v5.0</p>
                  </div>
                  <button 
                    onClick={() => setChatHistory([])}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all text-white/30 hover:text-white"
                    title="Reset Link"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-10 space-y-6 scrollbar-hide py-4 relative z-10"
                >
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                      <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center bg-white/5">
                        <Bot size={32} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed max-w-[200px]">
                        Link standby. Awaiting mission parameters...
                      </p>
                    </div>
                  )}

                  {chatHistory.map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                         <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${msg.role === 'user' ? 'text-white' : 'text-white/40'}`}>
                           {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                         </div>
                         <div className={`p-5 rounded-2xl text-[13px] leading-relaxed tracking-tight ${msg.role === 'user' ? 'bg-white text-black' : 'bg-white/5 border border-white/5 text-white/80'}`}>
                           {msg.parts[0].text}
                         </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40">
                          <Bot size={12} />
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-1.5">
                          {[1,2,3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-white/40"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="p-10 pt-6 relative z-10">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input 
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Protocol inquiry..."
                      disabled={isTyping}
                      className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-5 pr-16 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-white/20 disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!chatMessage.trim() || isTyping}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white text-black rounded-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating 3D-like Objects (Foreground Decor) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-32 h-32 rounded-full border border-white/10 glass silver-glow opacity-20 blur-[1px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 60, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-48 h-48 rounded-[2rem] border border-white/5 glass silver-glow opacity-10 blur-[2px] rotate-12" 
        />
      </div>

      {/* Cinematic Grain Overlay handled by body::after in CSS */}
    </section>
  );
}
