import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BentoDisplay: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-6 lg:px-0">
            {/* DESKTOP LAYOUT */}
            <div className="hidden lg:block w-full max-w-[85vw] mx-auto h-[70vh]">
                <div className="grid grid-cols-2 gap-6 h-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img src="/media/1.png" alt="Knob 1 Display" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-10 flex flex-col justify-center h-full"
                    >
                        <div className="space-y-6 text-left max-w-xl">
                            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                Pixel perfect<br />crispy display
                            </h3>
                            <div className="space-y-4">
                                <p className="text-xl text-white/80 leading-relaxed font-light">
                                    A 100x310px full color screen crafted for instant visual feedback.
                                </p>
                                <div className="flex flex-wrap gap-2 text-sm text-white/50 font-mono">
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Timer</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Custom Wallpapers</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Settings</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="lg:hidden w-full h-full flex flex-col justify-center gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 card-shadow h-[40vh]"
                >
                    <img src="/media/1.png" alt="Knob 1 Display" className="w-full h-full object-cover" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6 flex-1"
                >
                    <h3 className="text-2xl font-bold text-white mb-2">Display</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        100x310px full color screen. Customizable. Beautiful.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
