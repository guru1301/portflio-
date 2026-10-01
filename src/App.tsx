import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);
import { CustomCursor } from './components/CustomCursor';
import { BrandIntro } from './components/BrandIntro';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { GrainOverlay } from './components/GrainOverlay';
import { ProjectModal } from './components/ProjectModal';
import { BuildWithMeModal } from './components/BuildWithMeModal';
import { HeroSection } from './sections/HeroSection';
import { HeroToWorkTransition } from './sections/HeroToWorkTransition';
import { SelectedWorkSection } from './sections/SelectedWorkSection';
import { ClientWorkSection } from './sections/ClientWorkSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { TechStackCanvas } from './components/TechStackCanvas';
import { ResumeSection } from './sections/ResumeSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';

import type { Project } from './data/portfolioData';
import { ThemeColorProvider } from './context/ThemeColorContext';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  const lenisRef = useLenis();

  // Scroll to target section handler
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Stop Lenis smooth scroll and freeze background scrolling when ANY modal is open
  useEffect(() => {
    const isModalActive = Boolean(selectedProject || isBuildModalOpen);
    if (isModalActive) {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('lenis-stopped');
    } else {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('lenis-stopped');
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [selectedProject, isBuildModalOpen, lenisRef]);

  // Refresh ScrollTrigger and Lenis layout once intro finishes and content mounts
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Optimized Section Observer with requestAnimationFrame guard to eliminate layout thrashing
  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'work', 'about', 'experience', 'skills', 'contact'];
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection((prev) => (prev !== id ? id : prev));
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <ThemeColorProvider>
      <div className="min-h-screen relative bg-[#f8f7f3] text-[#111115] selection:bg-[#e63946] selection:text-white">
        {/* Noise Texture Overlay */}
        <GrainOverlay />

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Brand Identity Reveal Intro */}
        {isLoading ? (
          <BrandIntro onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            {/* Top Minimal Navigation Bar with Theme Switcher, Dropper & Menu Overlay */}
            <Navigation
              activeSection={activeSection}
              onNavigate={(id) => scrollToSection(id)}
              onOpenBuildModal={() => setIsBuildModalOpen(true)}
            />

            {/* Right side Vertical Scroll Progress Indicator */}
            <ScrollProgress activeSection={activeSection} />

            {/* Main Content Flow */}
            <main>
              {/* 01 - Hero Section */}
              <HeroSection
                onScrollToWork={() => scrollToSection('work')}
                onScrollToContact={() => scrollToSection('contact')}
                onOpenBuildModal={() => setIsBuildModalOpen(true)}
              />

              {/* Transition Title Banner */}
              <HeroToWorkTransition />

              {/* 02 - Selected Work (Horizontal Pinned / Mobile Vertical) */}
              <SelectedWorkSection onSelectProject={(proj) => setSelectedProject(proj)} />

              {/* Client Work (Independent Web Solutions) - Directly below Engineering Projects */}
              <ClientWorkSection
                onSelectProject={(proj) => setSelectedProject(proj)}
                onScrollToContact={() => scrollToSection('contact')}
                onScrollToWork={() => scrollToSection('work')}
                onOpenBuildModal={() => setIsBuildModalOpen(true)}
              />

              {/* 03 - About & Education */}
              <AboutSection />

              {/* 04 - Experience & Timeline */}
              <ExperienceSection />

              {/* 05 - Skills Typography Field */}
              <SkillsSection />

              {/* Interactive Domain & Stack Network Canvas */}
              <TechStackCanvas />

              {/* Resume Call-to-Action */}
              <ResumeSection />


              {/* 06 - Contact Section */}
              <ContactSection onOpenBuildModal={() => setIsBuildModalOpen(true)} />
            </main>

            {/* Minimal Footer */}
            <Footer />

            {/* Case Study Detail Modal */}
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />

            {/* Build With Me Inquiry Form Modal */}
            <BuildWithMeModal
              isOpen={isBuildModalOpen}
              onClose={() => setIsBuildModalOpen(false)}
            />
          </>
        )}
      </div>
    </ThemeColorProvider>
  );
}

export default App;
