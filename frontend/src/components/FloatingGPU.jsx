import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const FloatingGPU = ({ mouseX, mouseY }) => {
  const springConfig = { damping: 15, stiffness: 45, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const x = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      style={{ x, y }}
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
    >
      {/* Ambient glow — subtle radial light di tengah hero */}
      <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] blur-[160px] rounded-full" />
      <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-white/[0.04] blur-[80px] rounded-full" />
    </motion.div>
  );
};

export default FloatingGPU;
