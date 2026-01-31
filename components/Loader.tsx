import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  isLoading: boolean;
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesWrapperRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const spacer1Ref = useRef<HTMLDivElement>(null);
  const spacer2Ref = useRef<HTMLDivElement>(null);
  const spacer3Ref = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context;

    // Attendiamo che il font sia caricato per calcoli precisi
    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        const s1 = spacer1Ref.current;
        const s2 = spacer2Ref.current;
        const s3 = spacer3Ref.current;

        const cross = document.getElementById('shape-cross');
        const square = document.getElementById('shape-square');
        const circle = document.getElementById('shape-circle');

        const shapes = [cross, square, circle];
        const textParts = gsap.utils.toArray<HTMLElement>('.text-part');

        if (!s1 || !s2 || !s3 || !cross || !square || !circle || textParts.length === 0) return;

        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
        });

        // --- ALLINEAMENTO PRECISO ALLE LETTERE MINUSCOLE ---
        /**
         * Calcola lo spostamento per allineare le forme alla baseline delle lettere minuscole.
         * Per + e rombo: il punto più basso deve toccare la baseline.
         * Per semicerchio: la base piatta poggia sulla baseline.
         * @param shape La forma da muovere
         * @param spacerTarget Il div spaziatore per l'allineamento orizzontale
         * @param referenceText L'elemento di testo per calcolare l'altezza di riferimento
         * @param nudgeY Offset verticale manuale in pixel (negativo sposta in alto)
         */
        const getDelta = (
          shape: HTMLElement,
          spacerTarget: HTMLElement,
          referenceText: HTMLElement,
          nudgeY: number = 0
        ) => {
          const sRect = shape.getBoundingClientRect();
          const tRect = spacerTarget.getBoundingClientRect();
          const textRect = referenceText.getBoundingClientRect();

          // X: Centra orizzontalmente nel div spaziatore
          const deltaX = (tRect.left + tRect.width / 2) - (sRect.left + sRect.width / 2);

          // Y: Calcola dove poggia la parte inferiore delle lettere minuscole
          // Usiamo circa 58% dell'altezza dal top per alzare le forme
          const lowerCaseBaseline = textRect.top + (textRect.height * 0.58);
          const shapeBottom = sRect.bottom;

          let deltaY = lowerCaseBaseline - shapeBottom;

          // Applica la correzione manuale
          deltaY += nudgeY;

          return { x: deltaX, y: deltaY };
        };

        // Stato Iniziale
        gsap.set(shapes, { scale: 0, opacity: 0, rotate: 0 });
        gsap.set(textParts, { opacity: 0, y: 40 });

        // Fase 1: Comparsa
        tl.to(shapes, {
          scale: 1.15,
          opacity: 1,
          rotate: 180,
          duration: 1.4,
          stagger: 0.1,
          ease: "back.out(1.5)"
        });

        tl.add("land", "-=0.6");

        // Correzioni verticali finissime per ciascuna forma (in pixel)
        const crossNudge = 0;        // Croce va bene così
        const squareNudge = -2;      // Rombo leggermente più in alto
        const circleNudge = 2;       // Cerchio leggermente più in basso

        // Fase 2: Atterraggio e Rivelazione Testo

        // Croce -> Allineata alla baseline della 'w'
        tl.to(cross, {
          x: () => getDelta(cross, s1, textParts[0], crossNudge).x,
          y: () => getDelta(cross, s1, textParts[0], crossNudge).y,
          rotation: 360,
          scale: 1,
          duration: 1.5,
        }, "land");

        // Rombo (Quadrato ruotato) -> Leggermente più in alto
        tl.to(square, {
          x: () => getDelta(square, s2, textParts[3], squareNudge).x,
          y: () => getDelta(square, s2, textParts[3], squareNudge).y,
          rotation: 405,
          scale: 1,
          duration: 1.5
        }, "land");

        // Cerchio -> Leggermente più in basso
        tl.to(circle, {
          x: () => getDelta(circle, s3, textParts[3], circleNudge).x,
          y: () => getDelta(circle, s3, textParts[3], circleNudge).y,
          rotation: 240,
          scale: 1,
          duration: 1.5
        }, "land");

        tl.to(textParts, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "expo.out"
        }, "land+=0.3");

      }, containerRef);
    });

    return () => ctx?.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isLoading && containerRef.current) {
      setIsExiting(true);

      const ctx = gsap.context(() => {
        const shapes = gsap.utils.toArray('.shape');
        const textParts = gsap.utils.toArray('.text-part');

        const exitTl = gsap.timeline({
          onComplete: onComplete
        });

        // Sequenza di Uscita
        exitTl.to(shapes, {
          scale: 0.5,
          rotate: "+=90",
          opacity: 0,
          duration: 0.6,
          ease: "power4.in",
          stagger: 0.05
        });

        exitTl.to(textParts, {
          y: -60,
          opacity: 0,
          duration: 0.7,
          ease: "power4.in",
          stagger: 0.03
        }, "-=0.4");

        exitTl.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        }, "-=0.3");
      });

      return () => ctx.revert();
    }
  }, [isLoading, onComplete]);

  // --- COSTANTI DI STILE (KERNING STRETTO & DIMENSIONI) ---
  const fontSizeClass = "text-[9.5vw] md:text-[85px]";
  const shapeSizeClass = "w-[4.4vw] h-[4.4vw] md:w-[43px] md:h-[43px]";
  // Semicerchio più grande per meglio bilanciare visivamente
  const circleSizeClass = "w-[5.2vw] h-[5.2vw] md:w-[51px] md:h-[51px]";
  const spacerBaseClass = "relative flex items-center justify-center opacity-0 pointer-events-none";
  const spacerStandard = `${spacerBaseClass} w-[4.8vw] md:w-[48px] h-[4.5vw] md:h-[44px] mx-[0.2vw] md:mx-[2px]`;
  const spacerDiamond = `${spacerBaseClass} w-[6.5vw] md:w-[64px] h-[4.5vw] md:h-[44px] mx-[0.1vw] md:mx-[1px]`;
  // Spacer del semicerchio più largo per la forma più grande
  const spacerCircle = `${spacerBaseClass} w-[5.5vw] md:w-[54px] h-[4.5vw] md:h-[44px] mx-[0.2vw] md:mx-[2px]`;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden transition-colors duration-500 ${isExiting ? 'pointer-events-none' : 'cursor-wait'}`}
    >
      <div ref={contentWrapperRef} className="relative flex flex-col items-center justify-center w-full h-full select-none">
        {/* Contenitore Testo - Tracking stretto e padding-top per centratura visiva */}
        <div ref={textContainerRef} className={`flex items-center font-bold tracking-[-0.04em] text-white leading-none ${fontSizeClass} lowercase pt-[1.5vh]`}>

          <span className="text-part">w</span>
          <div ref={spacer1Ref} className={spacerStandard} />
          <span className="text-part">rk</span>
          {/* Gap tra le parole */}
          <div className="w-[3vw] md:w-[24px]" />
          <span className="text-part">l</span>
          <div ref={spacer2Ref} className={spacerDiamond} />
          {/* Usiamo 'u' come riferimento principale per l'altezza-x */}
          <span className="text-part">ud</span>
          <div ref={spacer3Ref} className={spacerCircle} />
          <span className="text-part">r</span>
        </div>
      </div>

      {/* Forme Fluttuanti - Inizialmente centrate assolutamente */}
      <div
        ref={shapesWrapperRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 pointer-events-none"
      >
        <div id="shape-cross" className={`shape ${shapeSizeClass} flex items-center justify-center mx-2`}>
          <svg viewBox="0 0 24 24" className="w-[85%] h-[85%] overflow-visible" fill="none">
            <rect x="9" y="0" width="6" height="24" fill="#FFFFFF" />
            <rect x="0" y="9" width="24" height="6" fill="#FFFFFF" />
          </svg>
        </div>

        <div id="shape-square" className={`shape ${shapeSizeClass} flex items-center justify-center mx-2`}>
          <svg viewBox="0 0 24 24" className="w-[82%] h-[82%] overflow-visible">
            <rect x="0" y="0" width="24" height="24" fill="#FFFFFF" />
          </svg>
        </div>

        <div id="shape-circle" className={`shape ${circleSizeClass} flex items-center justify-center mx-2`}>
          <svg viewBox="0 0 24 24" className="w-[85%] h-[85%] overflow-visible">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0V24Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>
    </div>
  );
};
