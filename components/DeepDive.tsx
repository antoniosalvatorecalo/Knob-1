import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BentoDisplay } from './BentoDisplay';
import { BentoCNC } from './BentoCNC';
import { BentoProductivity } from './BentoProductivity';

gsap.registerPlugin(ScrollTrigger);

const descriptionText = "The Knob / k\u2022no\u2022b\u20221 is a low-profile mechanical keyboard being designed by 3D Artist and Motion Designer Ben Fryc, and developed by Work Louder.";

export const DeepDive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !triggerRef.current) return;

      const sections = gsap.utils.toArray(".panel", containerRef.current);
      const chars = gsap.utils.toArray(".panel-1-text .char", containerRef.current);

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
          end: "+=4000",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      if (chars.length > 0) {
        masterTl.to(chars, {
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "none",
        }
        );
      }

      masterTl.to({}, { duration: 0.2 });

      if (sections.length > 0) {
        masterTl.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          duration: 4,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white overflow-hidden z-30">

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:block">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <div className="w-2 h-2 bg-[#FD7F18] rounded-full animate-pulse" />
          SCROLL TO READ
        </div>
      </div>

      {/* Main Container Pinned */}
      <div ref={triggerRef} className="deep-dive-container h-screen w-full flex flex-nowrap overflow-hidden">

        {/* PANEL 1: Text Reveal */}
        <section className="panel min-w-[100vw] h-full flex flex-col justify-center items-center border-r border-white/5 relative bg-black z-10">
          <div className="panel-1-text w-full max-w-[90vw] md:max-w-4xl lg:max-w-5xl px-6 md:px-0 flex flex-col justify-center text-left mx-auto">
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
              {descriptionText.split(" ").map((word, wIndex) => (
                <span key={wIndex} className="inline-block mr-3 md:mr-4 whitespace-nowrap pb-1">
                  {word.split("").map((char, cIndex) => (
                    <span key={cIndex} className="char inline-block text-white opacity-20">{char}</span>
                  ))}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* PANEL 2 - DISPLAY */}
        <section className="panel min-w-[100vw] h-full flex justify-center items-center border-r border-white/5 bg-black relative">
          <BentoDisplay />
        </section>

        {/* PANEL 3 - CNC / ENGINEERING */}
        <section className="panel min-w-[100vw] h-full flex justify-center items-center border-r border-white/5 bg-black">
          <BentoCNC />
        </section>

        {/* PANEL 4 - PRODUCTIVITY / CUSTOMIZATION */}
        <section className="panel panel-4 min-w-[100vw] h-full flex justify-center items-center bg-black relative">
          <BentoProductivity />
        </section>

      </div>
    </div>
  );
};