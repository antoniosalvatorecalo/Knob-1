import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BentoCNC: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-6 lg:px-0">
            {/* DESKTOP LAYOUT */}
            <div className="hidden lg:block w-full max-w-[85vw] mx-auto h-[70vh]">
                <div className="grid grid-cols-12 gap-6 h-full">

                    {/* Main Text Card - 4 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-4 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-10 flex flex-col justify-between h-full"
                    >
                        <div className="space-y-2">
                            <div className="w-10 h-1 bg-[#FD7F18] mb-6" />
                            <h3 className="text-4xl font-bold text-white leading-tight tracking-tight">
                                Full CNC<br />Build
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <p className="text-lg text-white/80 leading-relaxed">
                                Milled from a solid block of aluminum. Anodized for a finish that is as durable as it is beautiful.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Shell</p>
                                    <p className="text-sm text-white font-medium">6060 Aluminum</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Switches</p>
                                    <p className="text-sm text-white font-medium">Work Louder®</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image 1 - 4 cols */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-4 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 h-full group"
                    >
                        <img src="/media/2.png" alt="Knob 1 Detail" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </motion.div>

                    {/* Image 2 - 4 cols */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-4 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 h-full group"
                    >
                        <img src="/media/3.png" alt="Knob 1 Build Quality" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </motion.div>
                </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="lg:hidden w-full h-full flex flex-col gap-4 justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6"
                >
                    <h3 className="text-2xl font-bold text-white mb-2">CNC Precision</h3>
                    <p className="text-white/70 text-sm">Aluminum top and bottom shell.</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 h-full">
                        <img src="/media/2.png" alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 h-full">
                        <img src="/media/3.png" alt="Build" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};
