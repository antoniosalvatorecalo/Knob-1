import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { KnobModel } from './KnobModel';
import { Logo } from './Logo';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Fix for R3F types not being picked up - augmenting both global and module
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
      group: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
      group: any;
    }
  }
}

// Camera Rig Component for Responsive Positioning
const CameraRig = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 768;

    // Type guard for PerspectiveCamera
    if ('fov' in camera) {
      if (isMobile) {
        // Mobile: adjusted for smaller screens
        camera.position.set(0, 0.65, 2.2);
        camera.fov = 32;
      } else {
        // Desktop: AWWWARDS-LEVELProduct Photography
        camera.position.set(0, 0.65, 2.05);
        camera.fov = 26;
      }

      camera.lookAt(0, 0, 0); // Center on origin
      camera.updateProjectionMatrix();
    }
  }, [size.width, camera]);

  return null;
};

export const Hero: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">

      {/* LAYER 1: 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0.65, 2.05], fov: 26 }}
          dpr={[1, 2]}
          style={{
            touchAction: 'pan-y',
            cursor: hovered ? 'pointer' : 'grab'
          }}
        >
          <CameraRig />

          {/* AWWWARDS 3-POINT LIGHTING SETUP */}
          {/* Key Light: Main light source, creates primary shadows */}
          <spotLight
            position={[5, 7, 3]}
            intensity={1.4}
            angle={0.5}
            penumbra={0.5}
            castShadow
          />

          {/* Fill Light: Softens shadows, adds detail */}
          <spotLight
            position={[-4, 3, 5]}
            intensity={0.6}
            angle={0.4}
            penumbra={0.7}
          />

          {/* Rim/Accent Light: Edge definition, separation from background */}
          <spotLight
            position={[0, 5, -5]}
            intensity={1.0}
            angle={0.35}
            penumbra={0.6}
          />

          {/* Subtle ambient for base illumination */}
          <ambientLight intensity={0.2} />

          <Environment preset="city" />

          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <React.Suspense fallback={null}>
              <KnobModel isHovered={hovered} />
            </React.Suspense>
          </group>

          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minDistance={2}
            maxDistance={2.8}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 3}
            makeDefault
          />
        </Canvas>
      </div>

      {/* LAYER 2: UI Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 pointer-events-none">

        {/* Header with New Logo */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
          </div>
          <button className="text-xs font-medium hover:text-[#FD7F18] transition-colors text-white uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
            Menu
          </button>
        </header>

        {/* Main Content */}
        <main className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none px-8 md:px-12">
          <div className="mt-[40vh] md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-left"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                The low-profile <br className="hidden md:block" />
                <span className="text-[#FD7F18]">mechanical keyboard.</span>
              </h2>
            </motion.div>
          </div>
        </main>

        {/* Footer / Scroll Indicator */}
        <footer className="flex justify-start items-end pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-start gap-2 text-white/30"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] ml-1">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-lg ml-3"
            >
              ↓
            </motion.div>
          </motion.div>
        </footer>
      </div>
    </section>
  );
};