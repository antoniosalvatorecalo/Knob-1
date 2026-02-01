import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      // Valori Target (devono combaciare con il CSS per fluidità)
      const squareFinalScale = 0.82;
      const squareFinalY = "-0.01em";

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          // Avvia uscita dopo 1.5s di attesa
          gsap.delayedCall(1.5, exitAnimation);
        }
      });

      // Selettori
      const charWrappers = ".char-wrapper";
      const separator = ".word-separator";
      const chars = ".char";

      // --- SETUP INIZIALE ---
      gsap.set(charWrappers, { width: 0 });
      gsap.set(separator, { width: 0 });

      gsap.set(".slot-cross .shape-inner", { rotate: -180, scale: 0, opacity: 0 });
      gsap.set(".slot-square .shape-inner", { rotate: -135, scale: 0, opacity: 0 });
      gsap.set(".slot-circle .shape-inner", { rotate: 30, scale: 0, opacity: 0 });


      // --- FASE 1: POP (Spin In) ---

      // Croce
      tl.to(".slot-cross .shape-inner", {
        rotate: 0, scale: 1.15, opacity: 1, duration: 0.9, ease: "back.out(1.2)"
      }, 0);

      // Quadrato (Pop grande -> Assestamento piccolo)
      tl.to(".slot-square .shape-inner", {
        rotate: 45,
        scale: 0.95, // Pop iniziale visibile
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.2)"
      }, 0);

      // Semicerchio
      tl.to(".slot-circle .shape-inner", {
        rotate: 210, scale: 1.15, opacity: 1, duration: 0.9, ease: "back.out(1.2)"
      }, 0);

      // Assestamento (Bounce back)
      tl.to(".slot-cross .shape-inner, .slot-circle .shape-inner", {
        scale: 1, duration: 0.4, ease: "power2.out"
      }, "-=0.4");

      // Il quadrato torna alla scala calibrata (0.82)
      tl.to(".slot-square .shape-inner", {
        scale: squareFinalScale,
        duration: 0.4,
        ease: "power2.out"
      }, "<");


      // --- FASE 2: EXPAND ---
      tl.add("expand");

      tl.to(charWrappers, { width: "auto", duration: 1.4, ease: "expo.inOut" }, "expand");
      tl.to(separator, { width: "0.6em", duration: 1.4, ease: "expo.inOut" }, "expand");

      tl.to(chars, { opacity: 1, y: 0, duration: 1.2, stagger: 0.04, ease: "expo.out" }, "expand+=0.2");

      // Rotazione Extra
      tl.to(".slot-cross .shape-inner", {
        rotate: 360, duration: 1.4, ease: "expo.inOut"
      }, "expand");

      tl.to(".slot-square .shape-inner", {
        rotate: 405,
        y: squareFinalY, // Usa il valore calibrato (-0.01em)
        duration: 1.4,
        ease: "expo.inOut"
      }, "expand");

      tl.to(".slot-circle .shape-inner", {
        rotate: 570, duration: 1.4, ease: "expo.inOut"
      }, "expand");


      // --- FASE 3: EXIT ---
      function exitAnimation() {
        const exitTl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        exitTl.add("exitStart");

        // Elementi via verso l'alto
        exitTl.to(".shape-inner", {
          y: -80, scale: 0, rotate: "+=90", opacity: 0,
          duration: 0.6, stagger: 0.04, ease: "power4.in"
        }, "exitStart");

        exitTl.to(".char", {
          y: -80, opacity: 0,
          duration: 0.6, stagger: 0.03, ease: "power4.in"
        }, "exitStart+=0.05");

        // Slide up del background
        exitTl.to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "expo.inOut"
        }, "+=0.1");
      }

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader-container">
      <div className="typographic-wrapper">

        {/* W */}
        <span className="char-wrapper"><span className="char">w</span></span>

        {/* CROCE */}
        <div className="shape-slot slot-cross">
          <div className="shape-inner">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="9.5" y="0" width="5" height="24" fill="#FFFFFF" />
              <rect x="0" y="9.5" width="24" height="5" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* RK */}
        <span className="char-wrapper"><span className="char">rk</span></span>

        <div className="word-separator"></div>

        {/* L */}
        <span className="char-wrapper"><span className="char">l</span></span>

        {/* QUADRATO */}
        <div className="shape-slot slot-square">
          <div className="shape-inner">
            <svg viewBox="0 0 24 24">
              <rect x="0" y="0" width="24" height="24" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* UD */}
        <span className="char-wrapper"><span className="char">ud</span></span>

        {/* SEMICERCHIO */}
        <div className="shape-slot slot-circle">
          <div className="shape-inner">
            <svg viewBox="0 0 24 24">
              <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0V24Z" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* R */}
        <span className="char-wrapper"><span className="char">r</span></span>

      </div>
    </div>
  );
};
