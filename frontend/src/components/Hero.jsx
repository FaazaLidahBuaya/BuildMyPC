import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import FloatingGPU from './FloatingGPU';
import TechnicalOverlay from './TechnicalOverlay';

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollY } = useScroll();
  const heroTransformY = useTransform(scrollY, [0, 800], [0, -80]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.85]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -0.5 to 0.5 relative to viewport
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section 
      id="build" 
      style={{ y: heroTransformY, scale: heroScale, opacity: heroOpacity }}
      className="relative w-full h-screen min-h-[760px] overflow-hidden bg-background origin-top"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none"></div>
      
      <TechnicalOverlay />
      
      <FloatingGPU mouseX={mouseX} mouseY={mouseY} />
      
      {/* 
        Maximum content width 1320px
        Hero left area 0-45% width, offset 60px
      */}
      <div className="absolute inset-0 z-40 max-w-[1320px] mx-auto pointer-events-none">
        
        {/* Small Hero Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute left-[24px] md:left-[60px] top-[120px] md:top-[150px] flex items-center gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.08em] uppercase text-gray-400"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-accent"></div>
          BUILDMYPC / SYSTEM CONFIGURATION
        </motion.div>
        
        {/* Main Headline */}
        <div className="absolute left-[24px] md:left-[60px] top-[160px] md:top-[230px] w-full max-w-[500px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-white tracking-tighter leading-[0.85]"
            style={{ fontSize: 'clamp(64px, 8vw, 128px)' }}
          >
            BUILD<br />
            YOUR<br />
            SYSTEM.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 md:mt-8 text-gray-400 font-sans text-[14px] md:text-[15px] leading-[1.5] max-w-[280px]"
          >
            Design your PC.<br/>
            Check compatibility.<br/>
            Build without the guesswork.
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute left-[24px] md:left-[60px] bottom-[40px] md:bottom-auto md:top-[650px] flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <Link to="/build" className="group relative h-[48px] px-[24px] bg-white text-black font-mono text-[11px] tracking-[0.05em] uppercase rounded-[3px] overflow-hidden transition-colors hover:bg-gray-200 flex items-center justify-center gap-2">
            <span className="relative z-10 transition-transform group-hover:translate-x-[2px] duration-300">Start Building</span>
            <svg className="w-3 h-3 relative z-10 transition-transform group-hover:translate-x-[2px] duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <Link to="/build" className="h-[48px] px-[24px] border border-white/20 text-white font-mono text-[11px] tracking-[0.05em] uppercase flex items-center justify-center rounded-[3px] transition-colors hover:border-white/40 hover:bg-white/5">
            Explore Components
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Hero;
