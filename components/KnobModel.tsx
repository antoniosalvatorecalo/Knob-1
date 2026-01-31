import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';

// Fix for R3F types
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      primitive: any;
      directionalLight: any;
    }
  }
}

// Preload the GLB file for better performance
useGLTF.preload('/knob1_mechanical_keyboard.glb');

export const KnobModel: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/knob1_mechanical_keyboard.glb');
  const { size } = useThree();

  // ✅ Calculate geometric center of the model and offset to origin
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center); // Move model so center is at (0,0,0)
  }, [scene]);

  // ✅ AWWWARDS APPROACH: Fixed numeric scale
  const isMobile = size.width < 768;
  const baseScale = isMobile ? 2.2 : 3.4; // HERO scale - aggressive and clear

  // Entrance animation
  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.scale.set(0, 0, 0);

    gsap.to(groupRef.current.scale, {
      x: baseScale,
      y: baseScale,
      z: baseScale,
      duration: 1.4,
      ease: 'power3.out',
    });
  }, [baseScale]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Floating animation - minimal offset, centered
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    // Mouse parallax
    const mouseX = state.mouse.x * 0.15;
    const mouseY = state.mouse.y * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY + 0.15,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX + 0.3,
      0.05
    );

    // Hover scale lerp
    const targetScale = isHovered ? baseScale * 1.05 : baseScale;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
};