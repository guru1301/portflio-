import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowUpRight, Download, X } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

export const ResumeSection: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleDownload = () => {
    const resumeText = `
===================================================================
                       GURU PRASATH
   B.Tech Computer Science & Business Systems (2022 - 2026)
   Software / Data / Full-Stack Developer | Location: India
   Email: ${DEVELOPER_INFO.email}
===================================================================

[ EDUCATION ]
1. B.Tech Computer Science & Business Systems (2022 - 2026)
   Institution: Saranathan College of Engineering
   Score: 7.98 CGPA

2. Higher Secondary / Class XII (2021 - 2022)
   Institution: AKKV Aarunadu Matriculation Higher Secondary School
   Score: 86%

3. SSLC / Class X (2019 - 2020)
   Institution: AKKV Aarunadu Matriculation Higher Secondary School
   Score: 94%

[ TECHNICAL SKILLS ]
- Programming: Python, Java, SQL, JavaScript/TypeScript
- Frameworks: Spring Boot, React, Express, FastAPI, Tailwind CSS
- Data & Analytics: Power BI, DAX, Pandas, Data Cleansing
- Databases: PostgreSQL, MongoDB, SQL Server
- Tools: Git, GitHub, Postman, Docker, Razorpay Integration

[ PROJECTS ]
1. RailGo - Online Railway Reservation System (Spring Boot, Node.js, MongoDB, Razorpay)
2. FlowAI - Digital Twin for Remote Work (Spring Boot, PostgreSQL, React, Recharts)
3. The People's Ledger - Tamil Nadu Election Analytics (Power BI, DAX, Python, SQL)
4. AgniWatts - Predictive Load Management (FastAPI, React, Telemetry ML)
5. Museum Booking Platform - (Java, Spring Boot, React, QR Engine)

[ EXPERIENCE ]
- 2026: ICT Academy / Infosys Foundation - Data Analytics & Azure AI Trainee
- 2024: Dovyo Technologies - CRM Developer Intern
- 2024: CipherByte - Software Development Intern
===================================================================
    `;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Guru_Prasath_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 border-t border-b border-current/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10">
        <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-widest uppercase border border-[#e63946]/40 px-3.5 py-1.5 rounded-full">
          [ AVAILABILITY & CAREER TARGET ]
        </span>

        <h2 className="font-display text-3xl sm:text-5xl md:text-8xl font-black tracking-tight uppercase">
          OPEN TO <br />
          <span className="text-[#e63946]">OPPORTUNITY.</span>
        </h2>

        {/* Roles Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl">
          {['SOFTWARE ENGINEERING', 'DATA ANALYTICS', 'FULL-STACK DEVELOPMENT'].map((role) => (
            <span
              key={role}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-current/20 font-mono-custom text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
          <MagneticButton
            onClick={() => setShowResumeModal(true)}
            cursorLabel="RESUME"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#e63946] text-white font-mono-custom text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors min-h-[48px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-3">
              <FileText className="w-4 h-4" /> DOWNLOAD RESUME
            </span>
          </MagneticButton>

          <a
            href={DEVELOPER_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="LINKEDIN"
            className="w-full sm:w-auto"
          >
            <MagneticButton className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-current/30 bg-transparent text-current font-mono-custom text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-[#e63946] hover:text-[#e63946] transition-all min-h-[48px] flex items-center justify-center">
              <span className="flex items-center justify-center gap-3">
                VIEW LINKEDIN <ArrowUpRight className="w-4 h-4" />
              </span>
            </MagneticButton>
          </a>
        </div>
      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl domain-card-bg border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#e63946]" />
                  <h3 className="font-display text-xl font-bold uppercase text-white">
                    GURU PRASATH — RESUME SUMMARY
                  </h3>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-2 rounded-full border border-white/20 hover:border-white text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono-custom text-xs text-white/80 max-h-[50vh] overflow-y-auto p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white font-semibold">EDUCATION TIMELINE:</p>
                <p>• 2022 - 2026: B.Tech CSBS — Saranathan College of Engineering [ 7.98 CGPA ]</p>
                <p>• 2021 - 2022: Class XII — AKKV Aarunadu Matric Higher Secondary School [ 86% ]</p>
                <p>• 2019 - 2020: Class X — AKKV Aarunadu Matric Higher Secondary School [ 94% ]</p>

                <p className="text-white font-semibold pt-2">CORE COMPETENCIES:</p>
                <p>Python, SQL, Java, Spring Boot, React, Power BI, DAX, PostgreSQL, MongoDB, FastAPI, Git, Postman</p>

                <p className="text-white font-semibold pt-2">KEY PROJECTS:</p>
                <p>• RailGo (Railway Booking Engine)</p>
                <p>• FlowAI (Digital Twin Remote Telemetry)</p>
                <p>• The People's Ledger (TN Election Analytics)</p>

                <p className="text-white font-semibold pt-2">EXPERIENCE:</p>
                <p>• 2026: ICT Academy / Infosys Foundation Trainee</p>
                <p>• 2024: Dovyo Technologies Intern</p>
                <p>• 2024: CipherByte Intern</p>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#e63946] text-black font-mono-custom text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Save Copy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
