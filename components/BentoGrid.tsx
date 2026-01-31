import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BentoGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="w-full h-full">

            {/* DESKTOP LAYOUT (lg and up) - Uniform Heights */}
            <div className="hidden lg:block max-w-[85vw] mx-auto px-6 py-6">
                <div className="flex flex-col gap-4 h-full">

                    {/* FIRST ROW - Two Columns - 30vh */}
                    <div className="grid grid-cols-2 gap-4 h-[30vh]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-full"
                        >
                            <img src="/media/1.png" alt="Knob 1 Display" className="w-full h-full object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-6 flex flex-col justify-center h-full"
                        >
                            <div className="space-y-3 text-left">
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                    Pixel perfect<br />crispy display
                                </h3>
                                <p className="text-base text-white/90 leading-relaxed">
                                    A 100x310px full color screen with customisable software features
                                </p>
                                <p className="text-base text-white/90 leading-relaxed">
                                    Timer / Custom Wallpapers / In-keyboard settings / More to come
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* SECOND ROW - Three Equal Columns - 30vh */}
                    <div className="grid grid-cols-3 gap-4 h-[30vh]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-5 flex flex-col justify-center h-full"
                        >
                            <div className="space-y-2 text-left">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    Full CNC<br />high grade build
                                </h3>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Built with an aluminum top and bottom shell for maximum durability.
                                </p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    The k•no•b•1 have uniquely designed keycaps mounted on custom tuned Work Louder® hotswap switches and two multi-function knobs.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-full"
                        >
                            <img src="/media/2.png" alt="Knob 1 Detail" className="w-full h-full object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-full"
                        >
                            <img src="/media/3.png" alt="Knob 1 Build Quality" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>

                    {/* THIRD ROW - Two Columns - 30vh */}
                    <div className="grid grid-cols-2 gap-4 h-[30vh]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-full"
                        >
                            <img src="/media/4.png" alt="Knob 1 Profile" className="w-full h-full object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-6 flex flex-col justify-center h-full"
                        >
                            <div className="space-y-3 text-left">
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                    Low profile,<br />high productivity
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-base font-semibold text-white/90">Connectivity:</p>
                                    <p className="text-sm text-white/90">Type-C / Bluetooth</p>
                                    <p className="text-sm text-white/90">Mac, Pc, Linux & iOS devices</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-base font-semibold text-white/90">Language:</p>
                                    <p className="text-sm text-white/90">ANSI layout: US</p>
                                    <p className="text-sm text-white/90">ISO layout: UK/IT/DE/ES/FR/NR</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* MOBILE LAYOUT - Vertical Scroll (below lg) */}
            <div className="lg:hidden w-full px-4 py-6">
                <div className="flex flex-col gap-6 max-w-md mx-auto">

                    {/* CARD 1 - Pixel Perfect Display */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-[240px]">
                            <img src="/media/1.png" alt="Knob 1 Display" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-5">
                            <div className="space-y-2 text-left">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    Pixel perfect<br />crispy display
                                </h3>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    A 100x310px full color screen with customisable software features
                                </p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Timer / Custom Wallpapers / In-keyboard settings / More to come
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 2 - CNC Build */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-5">
                            <div className="space-y-2 text-left">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    Full CNC<br />high grade build
                                </h3>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Built with an aluminum top and bottom shell for maximum durability.
                                </p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    The k•no•b•1 have uniquely designed keycaps mounted on custom tuned Work Louder® hotswap switches and two multi-function knobs.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-[160px]">
                                <img src="/media/2.png" alt="Knob 1 Detail" className="w-full h-full object-cover" />
                            </div>
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-[160px]">
                                <img src="/media/3.png" alt="Knob 1 Build Quality" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 3 - Connectivity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 h-[240px]">
                            <img src="/media/4.png" alt="Knob 1 Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-5">
                            <div className="space-y-2 text-left">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    Low profile,<br />high productivity
                                </h3>
                                <div>
                                    <p className="text-sm font-semibold text-white/90">Connectivity:</p>
                                    <p className="text-sm text-white/90">Type-C / Bluetooth</p>
                                    <p className="text-sm text-white/90">Mac, Pc, Linux & iOS devices</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white/90">Language:</p>
                                    <p className="text-sm text-white/90">ANSI layout: US</p>
                                    <p className="text-sm text-white/90">ISO layout: UK/IT/DE/ES/FR/NR</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

        </div>
    );
};
