import { motion } from "motion/react";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";

const certifications = [
  {
    title: "Cyber Security Analyst",
    issuer: "Tata Forge",
    date: "2024",
    link: "#",
    id: "CERT-001"
  },
  {
    title: "Red Teaming Certification",
    issuer: "Red Team CRTM",
    date: "2024",
    link: "#",
    id: "CERT-002"
  },
  {
    title: "Cyber Security Fundamentals",
    issuer: "IBM SkillBuild / LinkedIn",
    date: "2024",
    link: "#",
    id: "CERT-003"
  },
  {
    title: "Linux Advanced",
    issuer: "Capprasec",
    date: "2023",
    link: "#",
    id: "CERT-004"
  },
  {
    title: "Jr. Pen Tester Path",
    issuer: "TryHackMe",
    date: "Ongoing",
    link: "https://tryhackme.com/p/masssubash240",
    id: "THM-PRO"
  },
  {
    title: "Active Security Researcher",
    issuer: "HackTheBox",
    date: "50+ Machines",
    link: "https://app.hackthebox.com/profile/masssubash240",
    id: "HTB-VAL"
  },
  {
    title: "Bug Bounty Researcher",
    issuer: "HackerOne",
    date: "Active",
    link: "#",
    id: "H1-ACTIVE"
  },
  {
    title: "Network Security",
    issuer: "Udemy / Cisco",
    date: "2023",
    link: "#",
    id: "CERT-006"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-brand-grey">
              05 // CREDENTIALS
            </h2>
            <h3 className="text-5xl md:text-6xl font-display font-medium tracking-tighter">
              Verified <span className="text-brand-white italic font-bold">Expertise.</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative p-8 rounded-[2rem] bg-brand-dark-grey border border-brand-white/5 hover:border-brand-white/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={120} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="text-brand-white" size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-grey">
                      Credential {cert.id}
                    </span>
                  </div>
                  <h4 className="text-2xl font-display font-medium tracking-tight">
                    {cert.title}
                  </h4>
                  <p className="text-brand-grey text-sm font-light">
                    Issued by {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-grey">
                    <Calendar size={14} />
                    <span className="text-xs font-mono">{cert.date}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] font-bold uppercase tracking-tight hover:bg-brand-white hover:text-brand-black transition-all"
                  >
                    View Credential <ExternalLink size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
