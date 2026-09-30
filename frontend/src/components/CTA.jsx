import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-40 px-6 bg-surface border-t border-white/5 relative overflow-hidden flex items-center justify-center text-center">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-accent text-xs font-mono tracking-[0.3em] uppercase mb-8"
        >
          Ready to build?
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-medium tracking-tighter text-white mb-16"
        >
          BUILD YOUR<br/>
          NEXT SYSTEM.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/build"
            className="px-12 py-5 bg-white text-black font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300 block"
          >
            Start Building
          </Link>
        </motion.div>
      </div>

    </section>
  );
};

export default CTA;
