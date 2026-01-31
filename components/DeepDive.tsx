import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BentoGrid } from './BentoGrid';

gsap.registerPlugin(ScrollTrigger);

const descriptionText = "The Knob / k\u2022no\u2022b\u20221 is a low-profile mechanical keyboard being designed by 3D Artist and Motion Designer Ben Fryc, and developed by Work Louder.";

export const DeepDive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const sections = gsap.utils.toArray(".panel", containerRef.current);
      const chars = gsap.utils.toArray(".panel-1-text .char", containerRef.current);

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".deep-dive-container",
          pin: true,
          scrub: 1,
          end: "+=4000",
          anticipatePin: 1, // Smooths pinning for mobile users who scroll quickly
          invalidateOnRefresh: true,
        }
      });

      if (chars.length > 0) {
        masterTl.fromTo(chars,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
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
    <div ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:block">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <div className="w-2 h-2 bg-[#FD7F18] rounded-full animate-pulse" />
          SCROLL TO READ
        </div>
      </div>

      {/* Main Container Pinned */}
      <div className="deep-dive-container h-screen w-full flex flex-nowrap overflow-hidden">

        {/* PANEL 1: Text Reveal */}
        <section className="panel min-w-[100vw] h-full flex flex-col justify-center items-center border-r border-white/5 relative bg-black z-10">
          <div className="panel-1-text w-full max-w-[90vw] md:max-w-4xl lg:max-w-5xl px-6 md:px-0 flex flex-col justify-center text-left mx-auto">
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
              {descriptionText.split(" ").map((word, wIndex) => (
                <span key={wIndex} className="inline-block mr-3 md:mr-4 whitespace-nowrap pb-1">
                  {word.split("").map((char, cIndex) => (
                    <span key={cIndex} className="char inline-block text-[#1a1a1a]">{char}</span>
                  ))}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* PANEL 2 - BENTOGRID */}
        <section className="panel min-w-[100vw] h-full flex justify-center items-center border-r border-white/5 bg-black relative">
          <BentoGrid />
        </section>

        {/* PANEL 3 */}
        <section className="panel min-w-[100vw] h-full flex justify-center items-center border-r border-white/5 bg-black">
          <div className="flex flex-col items-center justify-center max-w-2xl px-6">
            <div className="mb-6 text-center">
              <span className="font-mono text-[#FD7F18] text-sm uppercase tracking-widest">02. Engineering</span>
              <h3 className="text-4xl md:text-6xl font-bold mt-4 uppercase">CNC Precision</h3>
            </div>
            <p className="text-gray-500 text-lg md:text-xl text-center leading-relaxed">
              Milled from a solid block of aluminum. Anodized for a finish that is as durable as it is beautiful.
            </p>
          </div>
        </section>

        {/* PANEL 4 */}
        <section className="panel panel-4 min-w-[100vw] h-full flex justify-center items-center bg-black relative">
          <div className="flex flex-col items-center justify-center max-w-2xl px-6">
            <div className="mb-6 text-center">
              <span className="font-mono text-[#FD7F18] text-sm uppercase tracking-widest">03. Customization</span>
              <h3 className="text-4xl md:text-6xl font-bold mt-4 uppercase">Make it Yours</h3>
            </div>
            <p className="text-gray-500 text-lg md:text-xl text-center leading-relaxed">
              Support for QMK and VIA allows you to remap every key and rotation to fit your specific creative workflow perfectly.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};