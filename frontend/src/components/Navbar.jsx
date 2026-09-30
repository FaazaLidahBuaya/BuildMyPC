import React from 'react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-[24px] md:px-[60px] border-b border-white/5 bg-[#080808]/85 backdrop-blur-md"
    >
      <div className="text-[12px] md:text-[13px] font-mono tracking-[0.05em] uppercase w-1/4 flex items-center gap-3">
        <div className="w-4 h-4 bg-accent"></div>
        <Link to="/" className="hover:text-accent transition-colors font-bold">BuildMyPC</Link>
      </div>

      <div className="hidden lg:flex justify-center gap-10 text-[10px] md:text-[11px] font-mono tracking-[0.05em] uppercase text-gray-400 w-1/2">
        <Link to="/build" className="hover:text-white transition-colors">Configurator</Link>
        <a href="#compatibility" className="hover:text-white transition-colors">Engine</a>
        <a href="#performance" className="hover:text-white transition-colors">Benchmarks</a>
        <a href="#builds" className="hover:text-white transition-colors">Curated Systems</a>
      </div>

      <div className="w-1/4 flex justify-end">
        <Link to="/build" className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] uppercase text-black bg-white hover:bg-accent hover:text-white px-5 py-2.5 transition-all">
          Start Building
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
