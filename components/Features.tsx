import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "The Knob",
    copy: "CNC-milled aluminum. Infinite rotation. 24 detents of pure tactile feedback."
  },
  {
    title: "WRK Profile",
    copy: "Ultra-flat keycaps for speed, precision, and minimal footprint."
  },
  {
    title: "Kailh Choc",
    copy: "Low-profile mechanical switches. Less travel, more rhythm."
  },
  {
    title: "Fully Custom",
    copy: "VIA/QMK compatible. Map every rotation, click, and tap to your workflow."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="bg-[#1a1a1a] py-32 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a1a1a] p-12 md:p-16 hover:bg-[#1f1f1f] transition-colors group border border-transparent hover:border-[#FD7F18]/20"
            >
              <div className="text-[#FD7F18] font-mono text-sm mb-4">0{i + 1}</div>
              <h3 className="text-3xl font-bold text-white mb-4">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg max-w-sm group-hover:text-gray-200 transition-colors">
                {feat.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};