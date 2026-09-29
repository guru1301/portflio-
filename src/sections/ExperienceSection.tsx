import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { LoopingLabel } from '../components/LoopingLabel';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-16 sm:py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f8f7f3]">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex justify-between items-center text-xs font-mono-custom text-[#555560] tracking-widest uppercase border-b border-black/10 pb-4">
          <LoopingLabel
            text="[ 04 — INDUSTRY EXPERIENCE & TRAININGS ]"
            className="font-mono-custom text-xs text-[#555560] tracking-widest uppercase"
          />
          <span>CHRONOLOGICAL TIMELINE</span>
        </div>

        <div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#111115] tracking-tighter uppercase">
            EXPERIENCE & <br />
            <span className="text-[#e63946]">PROFESSIONAL TRAININGS</span>
          </h2>
        </div>

        {/* Editorial Timeline */}
        <div className="space-y-10 relative before:absolute before:left-3 md:before:left-12 before:top-4 before:bottom-4 before:w-[1px] before:bg-black/10">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 sm:pl-10 md:pl-24 group"
            >
              {/* Timeline marker node */}
              <div className="absolute left-3 md:left-12 top-3 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white/40 bg-[#f8f7f3] group-hover:border-[#e63946] group-hover:bg-[#e63946] transition-colors" />

              <div className="p-5 sm:p-7 md:p-8 rounded-3xl domain-card-bg border border-white/15 group-hover:border-[#e63946]/50 shadow-2xl transition-all space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-widest">
                      {exp.period} — {exp.type}
                    </span>
                    <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white uppercase mt-1">
                      {exp.company}
                    </h3>
                  </div>

                  <span className="font-display text-3xl md:text-5xl font-black text-white/30 group-hover:text-[#e63946] transition-colors">
                    {exp.year}
                  </span>
                </div>

                <p className="font-mono-custom text-sm font-semibold text-white">
                  ROLE: {exp.role}
                </p>

                <p className="font-mono-custom text-xs md:text-sm text-white/75 leading-relaxed">
                  {exp.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-white/15 bg-white/10 text-[11px] font-mono-custom text-white/90"
                    >
                      ✓ {h}
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
};
