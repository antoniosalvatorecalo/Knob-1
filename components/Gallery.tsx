import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://picsum.photos/id/1/800/800",
  "https://picsum.photos/id/10/800/800",
  "https://picsum.photos/id/20/800/800",
  "https://picsum.photos/id/30/800/800",
  "https://picsum.photos/id/40/800/800",
  "https://picsum.photos/id/50/800/800",
  "https://picsum.photos/id/60/800/800",
  "https://picsum.photos/id/70/800/800",
];

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSection = stripRef.current;
      const portfolio = containerRef.current;

      if (!horizontalSection || !portfolio) return;

      const pinSt = ScrollTrigger.create({
        trigger: portfolio,
        start: "center center",
        end: "+=200%",
        pin: true,
        anticipatePin: 1, // Fixes mobile pinning jitter
      });

      gsap.to(horizontalSection, {
        x: () => -(horizontalSection.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: portfolio,
          start: "center center",
          end: () => pinSt.end!,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <div className="py-24 text-center px-6">
        <h3 className="text-xl md:text-3xl text-gray-500 uppercase tracking-widest font-mono">Gallery</h3>
        <p className="text-white mt-2 text-lg">Every angle crafted with extreme attention to detail.</p>
      </div>

      <section
        id="portfolio"
        ref={containerRef}
        className="h-screen w-full flex items-center overflow-hidden bg-black"
      >
        <div className="w-full">
          <div
            ref={stripRef}
            className="flex flex-nowrap will-change-transform gap-8 md:gap-12 px-8 md:px-12"
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] aspect-square relative group"
              >
                <div className="absolute inset-0 border border-white/10 group-hover:border-[#FD7F18] transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-[#FD7F18] opacity-0 group-hover:opacity-100 transition-opacity">
                  REF_0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-24 text-center px-6">
        <h3 className="text-xl text-gray-500 font-mono italic">"The details are not the details. They make the design."</h3>
      </div>
    </div>
  );
};