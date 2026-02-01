import React, { useEffect, useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { DeepDive } from './components/DeepDive';
import { TactilePoetry } from './components/TactilePoetry';
import { Loader } from './components/Loader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global mobile optimizations
if (typeof window !== 'undefined') {
  // Normalize scroll for mobile - fixes jumpy behavior and ensures smooth pinning
  ScrollTrigger.normalizeScroll(true);

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
  });
}

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Add noise overlay
    const noise = document.createElement('div');
    noise.classList.add('noise-overlay');
    document.body.appendChild(noise);

    return () => {
      document.body.removeChild(noise);
    };
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setShowContent(true);

    // Crucial: Wait for the next tick, then refresh ScrollTrigger
    // This ensures the browser has recognized the new DOM elements and their heights
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.scrollTo(0, 0); // Ensure we start at the top
    }, 100);
  }, []);

  return (
    <>
      {/* Loader always rendered initially to prevent height jumping */}
      {!showContent && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      <div
        key={showContent ? 'content-visible' : 'content-hidden'}
        className={`w-full min-h-screen bg-black selection:bg-[#007AFF] selection:text-white transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{
          // Ensure this container doesn't block vertical scrolling
          touchAction: 'pan-y',
          visibility: showContent ? 'visible' : 'hidden'
        }}
      >
        <Hero />

        <DeepDive />

        <TactilePoetry />
      </div>
    </>
  );
};

export default App;