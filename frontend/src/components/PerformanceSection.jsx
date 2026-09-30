import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StatBar = ({ title, fps, delay }) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-widest text-gray-400">
      <span>{title}</span>
      <span className="text-white font-bold">{fps} FPS</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 overflow-hidden">
      <motion.div 
        key={fps}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full bg-accent"
      ></motion.div>
    </div>
  </div>
);

const performanceData = {
  '4K': {
    bench: 'HIGH-END CONFIGURATION',
    specs: 'Intel Core i9-14900K + RTX 4090 24GB',
    games: [
      { title: 'Cyberpunk 2077 (RT Overdrive)', fps: '92' },
      { title: 'Alan Wake 2 (High Settings)', fps: '105' },
      { title: 'Valorant (Comp Settings)', fps: '500+' }
    ],
    analysis: {
      target: 'Enthusiast / Extreme',
      bottleneck: 'GPU Bound (Expected)',
      features: [
        { name: 'Ray Tracing', value: 'Ultimate' },
        { name: 'Texture Detail', value: 'Cinematic' },
        { name: 'Upscaling', value: 'DLSS Quality' }
      ],
      summary: 'At 4K, the RTX 4090 utilizes its massive 24GB VRAM buffer to effortlessly push path-traced lighting without compromising frame pacing.'
    }
  },
  '1440P': {
    bench: 'BALANCED CONFIGURATION',
    specs: 'AMD Ryzen 5 7600 + RTX 4070 SUPER 12GB',
    games: [
      { title: 'Cyberpunk 2077 (Ultra, RT Off)', fps: '115' },
      { title: 'Forza Horizon 5 (Extreme)', fps: '144' },
      { title: 'Apex Legends (Comp Settings)', fps: '280' }
    ],
    analysis: {
      target: 'Competitive / Sweet Spot',
      bottleneck: 'Balanced',
      features: [
        { name: 'Ray Tracing', value: 'High' },
        { name: 'Texture Detail', value: 'Ultra' },
        { name: 'Upscaling', value: 'DLSS Auto' }
      ],
      summary: '1440P is the current sweet spot. The RTX 4070 SUPER provides enough horsepower to max out modern titles while the Ryzen 7600 prevents CPU bottlenecks.'
    }
  },
  '1080P': {
    bench: 'ENTRY CONFIGURATION',
    specs: 'Intel Core i3-12100F + RX 6600 8GB',
    games: [
      { title: 'Cyberpunk 2077 (Medium)', fps: '75' },
      { title: 'Hogwarts Legacy (Medium)', fps: '85' },
      { title: 'CS2 (Comp Settings)', fps: '240+' }
    ],
    analysis: {
      target: 'Budget / Esports',
      bottleneck: 'CPU Bound (High FPS)',
      features: [
        { name: 'Ray Tracing', value: 'Off / Low' },
        { name: 'Texture Detail', value: 'High' },
        { name: 'Upscaling', value: 'Native' }
      ],
      summary: 'Optimized for raw frames per second. The RX 6600 easily handles esports titles at maximum refresh rates while staying incredibly power efficient.'
    }
  }
};

const PerformanceSection = () => {
  const [resolution, setResolution] = useState('4K');
  const currentData = performanceData[resolution];

  return (
    <section id="performance" className="py-32 px-6 bg-surface relative border-y border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Left Side: FPS Metrics */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-accent w-12"></div>
              <h2 className="text-accent text-[10px] font-mono tracking-[0.3em] uppercase">System Metrics</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-8 text-white">
              UNCOMPROMISED<br/>POWER.
            </h3>
            <p className="text-gray-400 font-sans mb-12 max-w-md text-sm leading-relaxed">
              Real-world benchmark estimations based on our curated systems. See exactly how different tiers perform across various resolutions.
            </p>
          </motion.div>

          <div className="flex gap-6 border-b border-white/10 mb-6 pb-4">
            {['4K', '1440P', '1080P'].map(res => (
              <button 
                key={res}
                onClick={() => setResolution(res)}
                className={`font-mono text-[10px] uppercase tracking-widest transition-colors relative ${
                  resolution === res ? 'text-accent' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {res} GAMING
                {resolution === res && (
                  <motion.div layoutId="res-indicator" className="absolute -bottom-[17px] left-0 right-0 h-[1px] bg-accent"></motion.div>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={resolution}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-[#0a0a0a] border border-white/5 p-4 flex flex-col gap-1 border-l-2 border-l-accent">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent">Tested On: {currentData.bench}</span>
                  <span className="text-xs font-mono text-gray-300">{currentData.specs}</span>
                </div>

                {currentData.games.map((game, i) => (
                  <StatBar key={game.title} title={game.title} fps={game.fps} delay={0.1 + (i * 0.1)} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Dynamic Analysis */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={resolution}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0a0a0a] border border-white/5 p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-8">
                
                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Config Analysis</span>
                    <h4 className="text-xl font-mono text-white tracking-widest uppercase">{resolution} PROFILE</h4>
                  </div>
                  <div className="text-accent/40 font-mono text-4xl">
                    {resolution === '4K' ? '01' : resolution === '1440P' ? '02' : '03'}
                  </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Target Audience</span>
                    <span className="text-sm font-mono text-gray-200">{currentData.analysis.target}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">System Bottleneck</span>
                    <span className="text-sm font-mono text-gray-200">{currentData.analysis.bottleneck}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Expected Settings</span>
                  <div className="flex flex-col gap-2">
                    {currentData.analysis.features.map(feat => (
                      <div key={feat.name} className="flex justify-between items-center bg-white/5 px-4 py-2 border border-white/5">
                        <span className="text-[11px] font-mono text-gray-400">{feat.name}</span>
                        <span className="text-[11px] font-mono text-white">{feat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-accent/5 border border-accent/20 p-4">
                  <p className="text-[12px] font-sans text-gray-300 leading-relaxed">
                    {currentData.analysis.summary}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default PerformanceSection;
