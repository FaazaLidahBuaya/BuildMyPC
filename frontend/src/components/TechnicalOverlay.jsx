import React from 'react';
import { motion } from 'framer-motion';

const Line = ({ className, delay = 0.8, vertical = false }) => (
  <motion.div
    initial={vertical ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 }}
    animate={vertical ? { scaleY: 1, opacity: 0.25 } : { scaleX: 1, opacity: 0.25 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className={`absolute bg-white origin-top-left hidden md:block ${className}`}
  />
);

const Label = ({ children, className, delay = 1 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.8 }}
    className={`absolute text-[9px] md:text-[10px] font-mono uppercase tracking-[0.05em] text-gray-400 hidden md:block ${className}`}
  >
    {children}
  </motion.div>
);

const TechnicalOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      
      {/* Structural Guide Lines */}
      <Line className="w-full h-[1px] top-[120px] left-0" delay={0.8} />
      <Line className="w-full h-[1px] top-[160px] left-0" delay={0.85} />
      <Line className="w-full h-[1px] top-[650px] left-0" delay={0.9} />
      <Line className="w-full h-[1px] top-[760px] left-0" delay={0.95} />
      
      <Line className="h-full w-[1px] left-[60px] top-0" vertical delay={0.85} />
      <Line className="h-full w-[1px] right-[60px] top-0" vertical delay={0.9} />
      
      {/* 12 Column invisible grid overlays are handled in CSS, but let's add specific tech markers */}

      {/* GPU Annotations - Left Side */}
      <div className="absolute top-[40%] right-[60%] lg:right-[55%] hidden md:flex flex-col items-end">
        <Label className="-top-4 right-0 text-right whitespace-nowrap" delay={1.1}>
          01<br/>BLACKWELL ARCHITECTURE
        </Label>
        <Line className="w-24 h-[1px] right-0 top-0 origin-right" delay={0.9} />
        <Line className="h-8 w-[1px] right-0 top-0" vertical delay={0.95} />
      </div>

      <div className="absolute bottom-[30%] right-[60%] lg:right-[55%] hidden md:flex flex-col items-end">
        <Label className="-top-4 right-0 text-right whitespace-nowrap" delay={1.15}>
          04<br/>PCIe 5.0
        </Label>
        <Line className="w-32 h-[1px] right-0 top-0 origin-right" delay={0.95} />
        <div className="absolute right-[128px] -top-[1.5px] w-[4px] h-[4px] rounded-full bg-accent"></div>
      </div>

      {/* GPU Annotations - Right Side */}
      <div className="absolute top-[35%] left-[65%] lg:left-[75%] hidden md:block">
        <Label className="-top-4 left-0 whitespace-nowrap" delay={1.2}>
          02<br/>32GB GDDR7
        </Label>
        <Line className="w-32 h-[1px] left-0 top-0" delay={1.0} />
        <div className="absolute left-[128px] -top-[1.5px] w-[4px] h-[4px] border border-white bg-background"></div>
      </div>

      <div className="absolute bottom-[35%] left-[65%] lg:left-[75%] hidden md:block">
        <Label className="-top-4 left-0 whitespace-nowrap" delay={1.25}>
          03<br/>575W TGP
        </Label>
        <Line className="w-20 h-[1px] left-0 top-0" delay={1.05} />
      </div>
      
      <div className="absolute top-[50%] right-[60px] translate-x-1/2 rotate-90 origin-center hidden md:block">
         <Label className="text-white tracking-[0.1em] text-[11px]" delay={1.3}>
           NVIDIA RTX 5090
         </Label>
      </div>

      {/* Coordinates / Metadata */}
      <Label className="bottom-[40px] left-[60px]" delay={1.4}>
        X: 024 Y: 118
      </Label>
      
      <Label className="bottom-[40px] right-[60px] text-right" delay={1.4}>
        03° 42' 19"<br/>SYSTEM 01
      </Label>

      <Label className="top-[180px] right-[60px] text-right" delay={1.45}>
        GPU / 5090 / 001
      </Label>
    </div>
  );
};

export default TechnicalOverlay;
