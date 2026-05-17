import { motion } from "motion/react";

const experiences = [
  {
    year: "2024 – 2028",
    role: "B.E. Cyber Security Engineering",
    company: "Sri Sai Ranganathan Engineering College, Coimbatore",
    description: "Currently in 2nd Year with a CGPA of 8.1. Focus areas include AI-driven security, ethical hacking, and network infrastructure.",
  },
  {
    year: "2024",
    role: "HSC (12th Grade)",
    company: "GHSS, Sithayankottai",
    description: "Completed higher secondary education under the Tamil Nadu State Board.",
  },
  {
    year: "2022",
    role: "SSLC (10th Grade)",
    company: "GHSS, Sithayankottai",
    description: "Foundational secondary education with distinction in science and mathematics.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-40 px-6 relative overflow-hidden">
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
                CHRONICLE_01
              </span>
            </motion.div>
            <h3 className="text-8xl md:text-[10rem] font-black leading-[0.75] tracking-[-0.06em] uppercase text-white">
              HISTORY.<br />
              <span className="text-white/10 outline-text">03</span>
            </h3>
          </div>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="group py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-12 border-t border-white/5 bg-transparent hover:bg-white/[0.02] transition-all duration-1000 px-12 rounded-[2.5rem]"
            >
              <div className="flex items-center gap-12 lg:w-1/4">
                <span className="text-[13px] font-black uppercase tracking-[0.4em] text-white/10 group-hover:text-white transition-all duration-700">
                  {exp.year}
                </span>
              </div>

              <div className="flex-grow space-y-6">
                <h4 className="text-5xl md:text-6xl font-black uppercase tracking-[-0.04em] text-white transition-all duration-700 group-hover:tracking-normal group-hover:translate-x-6">
                  {exp.role}
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white transition-all duration-700" />
                  <p className="text-[12px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                    {exp.company}
                  </p>
                </div>
              </div>

              <p className="lg:w-1/3 text-[12px] font-medium leading-relaxed uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-all duration-1000">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
