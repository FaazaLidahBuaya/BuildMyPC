import React from 'react';
import { motion } from 'framer-motion';

const FeatureNode = ({ number, title, description, delay = 0, align = "left" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`flex flex-col gap-4 max-w-[320px] ${align === "right" ? "ml-auto" : ""}`}
  >
    <div className="flex items-center gap-3">
      <span className="text-accent font-mono text-[10px] tracking-widest">{number}</span>
      <h3 className="text-white font-mono uppercase tracking-[0.1em] text-sm">{title}</h3>
    </div>
    <div className="h-[1px] w-full bg-white/10">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full bg-white origin-left"
      ></motion.div>
    </div>
    <p className="text-gray-400 font-sans text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const CompatibilitySection = () => {
  return (
    <section id="compatibility" className="py-32 px-[24px] md:px-[60px] bg-background relative border-t border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1320px] mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl lg:text-[100px] font-display font-semibold tracking-tighter leading-[0.85] mb-40 text-white"
        >
          BUILD<br/>
          WITHOUT<br/>
          GUESSWORK.
        </motion.h2>

        <div className="flex flex-col gap-32 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>

          <FeatureNode 
            number="01" 
            title="COMPATIBILITY" 
            description="Our logic engine validates physical dimensions, socket types, PCIe generations, and firmware requirements in real-time."
            delay={0.1}
          />
          
          <FeatureNode 
            number="02" 
            title="PERFORMANCE" 
            description="Algorithmic bottleneck detection ensures your GPU and CPU are perfectly matched for your target resolution."
            delay={0.2}
            align="right"
          />
          
          <FeatureNode 
            number="03" 
            title="POWER" 
            description="Precise TDP calculations combined with transient spike overhead margins guarantee absolute system stability."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default CompatibilitySection;
