import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BentoProductivity: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-6 lg:px-0">
            {/* DESKTOP LAYOUT */}
            <div className="hidden lg:block w-full max-w-[85vw] mx-auto h-[70vh]">
                <div className="grid grid-cols-2 gap-6 h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm h-full group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
                        <img src="/media/4.png" alt="Knob 1 Profile" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-10 left-10 z-20">
                            <span className="px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs font-mono text-white/80">
                                Low Profile
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-10 flex flex-col justify-center h-full"
                    >
                        <div className="space-y-8 text-left max-w-lg">
                            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                High<br />Productivity
                            </h3>

                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <h4 className="text-sm font-bold text-white mb-1">Connectivity</h4>
                                    <p className="text-sm text-white/60 font-mono">Type-C / Bluetooth 5.1</p>
                                    <div className="flex gap-2 mt-2">
                                        {['Mac', 'Win', 'Linux', 'iOS'].map(os => (
                                            <span key={os} className="text-[10px] uppercase px-2 py-0.5 rounded bg-white/10 text-white/50">{os}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <h4 className="text-sm font-bold text-white mb-1">Layout Support</h4>
                                    <p className="text-sm text-white/60 font-mono">ANSI & ISO Native</p>
                                    <p className="text-xs text-white/40 mt-1">UK • IT • DE • ES • FR • NR</p>
                                </div>
                            </div>

                            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                                Support for QMK and VIA allows you to remap every key and rotation to fit your workflow.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="lg:hidden w-full h-full flex flex-col gap-4 justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 h-[35vh]"
                >
                    <img src="/media/4.png" alt="Knob 1 Profile" className="w-full h-full object-cover" />
                </motion.div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6 flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">Productivity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-sm text-white/50">Connectivity</span>
                            <span className="text-sm text-white">BT & Type-C</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-sm text-white/50">OS</span>
                            <span className="text-sm text-white">All Platforms</span>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-white/40 leading-relaxed">
                                Full QMK/VIA support for persistent key remapping.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
