import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TactilePoetry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // FIX: Scope selector to containerRef to prevent selecting elements outside or before mount
      const scrollingText = gsap.utils.toArray('.rail h4', containerRef.current);

      // Safety check to ensure elements exist before attempting loop
      if (scrollingText.length === 0) return;

      // Safely get margin
      const sampleElement = scrollingText[0] as HTMLElement;
      const paddingRightVal = sampleElement
        ? parseFloat(gsap.getProperty(sampleElement, "marginRight", "px") as string)
        : 0;

      const tl = horizontalLoop(scrollingText, {
        repeat: -1,
        speed: 1.5,
        paddingRight: paddingRightVal
      });

      let loopTween: gsap.core.Tween | undefined;
      let lastDirection = 1;

      const timer = gsap.delayedCall(0.2, () => {
        if (loopTween) loopTween.kill();
        loopTween = gsap.to(tl, {
          timeScale: lastDirection * 1.5, // Return to base speed
          duration: 0.5,
          ease: "power2.out",
        });
      }).pause();

      ScrollTrigger.create({
        trigger: ".scrolling-text",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          lastDirection = self.direction;
          const velocity = Math.abs(self.getVelocity());

          const boost = velocity / 100;

          if (loopTween) loopTween.kill();
          tl.timeScale(lastDirection * (1.5 + boost));

          timer.restart(true);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'PPMondwest';
            src: url('/font/ppmondwest-regular.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
      <div ref={containerRef} className="w-full bg-black overflow-hidden">
        <div className="scrolling-text relative w-full h-[60vh] flex items-center overflow-hidden bg-black">
          <div className="rail flex items-center">
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Tactile Poetry
            </h4>
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Precision Tools
            </h4>
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Work Louder
            </h4>
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Make It Yours
            </h4>
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Tactile Poetry
            </h4>
            <h4 className="text-[15vw] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-wide mr-12 select-none" style={{ fontFamily: 'PPMondwest, sans-serif' }}>
              Precision Tools
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

/*
 * Helper function from GreenSock to create seamless horizontal loops
 */
function horizontalLoop(items: any[], config: any) {
  items = gsap.utils.toArray(items);

  // FIX: Safety check for empty items to prevent crash
  if (!items || items.length === 0) {
    return gsap.timeline();
  }

  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    }
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: any, i: number;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + (gsap.getProperty(el, "xPercent") as number));
      return xPercents[i];
    }
  });

  gsap.set(items, { x: 0 });

  totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(item, {
      xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0)
      .fromTo(item, {
        xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  return tl;
}