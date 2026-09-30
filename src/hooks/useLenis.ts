import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll: silky wheel on laptop, pure native 120Hz/60Hz touch on mobile
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 0,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Expose lenis instance globally for jump links and debugging
    if (typeof window !== 'undefined') {
      (window as unknown as { lenis: Lenis }).lenis = lenis;
    }

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateGSAP = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAP);

    // Smooth frame pacing without freezing
    gsap.ticker.lagSmoothing(500, 33);

    // Force ScrollTrigger to refresh after Lenis initialization and on resize
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateGSAP);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
