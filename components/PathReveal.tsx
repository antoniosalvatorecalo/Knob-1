import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- Camera Rig (Matching Hero.tsx) ---
const CameraRig = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;

        // Match Hero settings exactly for consistent visual quality
        // Type guard for PerspectiveCamera
        if ('fov' in camera) {
            if (isMobile) {
                camera.position.set(0, 0.65, 2.2);
                camera.fov = 32;
            } else {
                camera.position.set(0, 0.65, 2.05);
                camera.fov = 26;
            }
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
        }
    }, [size.width, camera]);

    return null;
};

// --- 3D Model Component ---
const PathModel = ({ innerRef }: { innerRef: React.RefObject<THREE.Group> }) => {
    const { scene } = useGLTF('/knob1_mechanical_keyboard.glb');

    useLayoutEffect(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        scene.position.sub(center);
    }, [scene]);

    return (
        <group ref={innerRef}>
            <primitive object={scene} />
        </group>
    );
};

// --- Main Path Reveal Component ---
export const PathReveal: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const holeRef = useRef<HTMLDivElement>(null);
    const modelGroupRef = useRef<THREE.Group>(null);

    const [useStaticFallback, setUseStaticFallback] = useState(false);
    const [perfTier, setPerfTier] = useState<'high' | 'low'>('high');

    useEffect(() => {
        const isLowEnd = window.navigator.hardwareConcurrency <= 4 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isLowEnd) {
            setPerfTier('low');
        }
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!triggerRef.current || !modelGroupRef.current || !holeRef.current) return;

            // Target 'Hero' Scale logic
            const isMobile = window.innerWidth < 768;
            const finalScale = isMobile ? 2.2 : 3.4;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=2500",
                    pin: true,
                    scrub: 1.5, // slightly smoother scrubbing
                    anticipatePin: 1,
                }
            });

            // 1. Mask Animation (Opening the portal)
            tl.to(holeRef.current, {
                width: '150vmax',
                height: '150vmax',
                duration: 5,
                ease: "power2.inOut"
            }, 0);

            // 2. 3D Model Cinematic Entrance
            // Start State: Far away, rotated, small
            gsap.set(modelGroupRef.current.position, { x: 0, y: -2, z: -5 });
            gsap.set(modelGroupRef.current.rotation, { x: Math.PI / 3, y: -Math.PI / 4, z: 0 });
            gsap.set(modelGroupRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });

            // Animation: Moves to match the Hero's "ideal" position
            // Position: (0,0,0) - centered
            // Rotation: Slight tilt (x: 0.15, y: 0.3) matching the Hero idle state approx
            // Scale: finalScale

            tl.to(modelGroupRef.current.position, {
                x: 0,
                y: 0,
                z: 0, // Lands perfectly at origin
                duration: 5,
                ease: "power2.out"
            }, 0)
                .to(modelGroupRef.current.rotation, {
                    x: 0.15,
                    y: 0.3 + (Math.PI * 2), // Full spin + settling at angle
                    z: 0,
                    duration: 5,
                    ease: "power1.inOut"
                }, 0)
                .to(modelGroupRef.current.scale, {
                    x: finalScale,
                    y: finalScale,
                    z: finalScale,
                    duration: 4.5,
                    ease: "power2.out"
                }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full z-40 bg-black">
            <div ref={triggerRef} className="h-screen w-full relative overflow-hidden">

                {/* 3D Scene Layer */}
                <div className="absolute inset-0 z-10 w-full h-full">
                    {!useStaticFallback ? (
                        <Canvas
                            dpr={perfTier === 'high' ? [1, 2] : [0.5, 1]}
                            gl={{ antialias: perfTier === 'high' }}
                        >
                            <CameraRig />

                            {/* AWWWARDS 3-POINT LIGHTING SETUP (Copied from Hero) */}
                            <spotLight position={[5, 7, 3]} intensity={1.4} angle={0.5} penumbra={0.5} castShadow />
                            <spotLight position={[-4, 3, 5]} intensity={0.6} angle={0.4} penumbra={0.7} />
                            <spotLight position={[0, 5, -5]} intensity={1.0} angle={0.35} penumbra={0.6} />
                            <ambientLight intensity={0.2} />
                            <Environment preset="city" />

                            <PathModel innerRef={modelGroupRef as any} />
                            <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
                        </Canvas>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <img src="/media/1.png" alt="Knob 1" className="object-contain w-1/2" />
                        </div>
                    )}
                </div>

                {/* Mask / Path Overlay Layer */}
                <div
                    className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                >
                    <div
                        ref={holeRef}
                        className="path-hole absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            width: '5vw', // Start smaller for dramatic effect
                            height: '5vw',
                            boxShadow: '0 0 100px 100vmax black',
                            background: 'transparent',
                        }}
                    />
                </div>

                {/* Text / Overlay UI */}
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                    <h2 className="text-white text-4xl md:text-7xl font-bold opacity-0 path-text mix-blend-difference tracking-tighter">
                        Crafting the Future
                    </h2>
                </div>

            </div>
        </section>
    );
};
