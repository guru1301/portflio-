import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { IDCardPhysics } from './physics';
import { IDCardBadge } from './IDCardBadge';
import { LanyardRope } from './LanyardRope';
import {
  createFrontCardTexture,
  createBackCardTexture,
  createLanyardTexture,
} from './IDCardTextures';
import type { IDCardConfig, HangingIDCardProps } from './types';

interface IDCardSceneProps extends HangingIDCardProps {
  config: IDCardConfig;
  isReducedMotion?: boolean;
}

export const IDCardScene: React.FC<IDCardSceneProps> = ({
  config,
  photo,
  name,
  role,
  institution,
  degree,
  code,
  isReducedMotion = false,
}) => {
  const cardGroupRef = useRef<THREE.Group>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);
  const specularLightRef = useRef<THREE.PointLight>(null);
  const { gl } = useThree();

  // Initialize Physics instance
  const physics = useMemo(() => {
    const p = new IDCardPhysics(config);
    if (isReducedMotion) {
      p.updateConfig({
        ...config,
        idleMotion: false,
        hoverStrength: 0.1,
      });
    }
    return p;
  }, [config, isReducedMotion]);

  useEffect(() => {
    physics.updateConfig(config);
  }, [config, physics]);

  // Generate textures
  const { texture: frontTexture, updatePhoto } = useMemo(() => {
    return createFrontCardTexture({
      photo,
      name,
      role,
      institution,
      degree,
      code,
      accentColor: config.lanyard.accentColor,
    });
  }, [photo, name, role, institution, degree, code, config.lanyard.accentColor]);

  const backTexture = useMemo(
    () => createBackCardTexture(config.lanyard.accentColor),
    [config.lanyard.accentColor]
  );
  const lanyardTexture = useMemo(
    () => createLanyardTexture(config.lanyard.accentColor),
    [config.lanyard.accentColor]
  );

  // Update photo if prop changes
  useEffect(() => {
    if (photo) {
      updatePhoto(photo);
    }
  }, [photo, updatePhoto]);

  // Clean up textures on unmount
  useEffect(() => {
    return () => {
      frontTexture.dispose();
      backTexture.dispose();
      lanyardTexture.dispose();
    };
  }, [frontTexture, backTexture, lanyardTexture]);

  // Track global pointer events for smooth dragging even outside canvas
  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (physics.isDragging) {
        physics.onPointerMove(e.clientX, e.clientY, window.innerWidth, window.innerHeight);
      }
    };

    const handleWindowPointerUp = (e: PointerEvent) => {
      if (physics.isDragging) {
        try {
          gl.domElement.releasePointerCapture(e.pointerId);
        } catch {}
        physics.onPointerUp();
        gl.domElement.style.cursor = 'grab';
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [physics, gl.domElement]);

  // Dynamic Shadow Texture (Soft blurred circular gradient)
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Main Animation Loop
  useFrame((_, delta) => {
    physics.step(delta);

    if (cardGroupRef.current) {
      // Sync physics position & rotation to card mesh
      cardGroupRef.current.position.copy(physics.pos);
      cardGroupRef.current.rotation.copy(physics.rot);

      // Scale card according to config
      cardGroupRef.current.scale.setScalar(config.scale);
    }

    // Dynamic reactive shadow on background plane
    if (shadowMeshRef.current) {
      const p = physics.pos;
      shadowMeshRef.current.position.set(p.x * 0.75, p.y - 0.45, -0.6);

      // Shadow scales and softens when card is pulled or swung
      const tilt = Math.abs(physics.rot.x) + Math.abs(physics.rot.z);
      const scaleX = 2.4 * config.scale * (1 + tilt * 0.25);
      const scaleY = 3.6 * config.scale * (1 - Math.sin(Math.abs(physics.rot.y)) * 0.45);
      shadowMeshRef.current.scale.set(Math.max(scaleX, 0.5), Math.max(scaleY, 0.5), 1);

      const mat = shadowMeshRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(0.12, 0.45 - (p.z * 0.15));
      }
    }

    // Specular highlight tracks subtle card movement
    if (specularLightRef.current) {
      specularLightRef.current.position.set(
        physics.pos.x * 1.5 + 1.2,
        physics.pos.y * 1.2 + 1.5,
        3.2
      );
    }
  });

  return (
    <>
      {/* 3D Lighting Setup */}
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.85} color="#d5d8e2" />

      {/* Key Directional Light */}
      <directionalLight
        position={[4, 6, 6]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      {/* Soft Cool Fill Light */}
      <directionalLight position={[-4, -1, 4]} intensity={1.1} color="#b0b8d0" />

      {/* Rim Accent Light matching active portfolio theme color */}
      <pointLight position={[0, 2.5, -2.5]} intensity={2.8} color={config.lanyard.accentColor} distance={8} />

      {/* Dynamic Specular Point Light */}
      <pointLight ref={specularLightRef} position={[1.5, 2, 3]} intensity={1.4} color="#ffffff" distance={6} />

      {/* Dynamic Soft Contact Shadow Plane */}
      <mesh ref={shadowMeshRef} position={[0, -0.2, -0.6]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Hanging Dynamic Lanyard Rope */}
      <LanyardRope
        config={config}
        cardGroupRef={cardGroupRef}
        lanyardTexture={lanyardTexture}
      />

      {/* Physical ID Card Badge Group with Pointer Event Handlers */}
      <group
        onPointerDown={(e) => {
          e.stopPropagation();
          try {
            gl.domElement.setPointerCapture(e.pointerId);
          } catch {}
          physics.onPointerDown(e.clientX, e.clientY);
          gl.domElement.style.cursor = 'grabbing';
        }}
        onPointerMove={(e) => {
          if (!physics.isDragging) {
            // Hover tracking
            const rect = gl.domElement.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
            physics.onPointerMove(nx, ny, rect.width, rect.height);
          }
        }}
        onPointerEnter={() => {
          physics.setHovered(true);
          gl.domElement.style.cursor = 'grab';
        }}
        onPointerLeave={() => {
          if (!physics.isDragging) {
            physics.setHovered(false);
            gl.domElement.style.cursor = 'default';
          }
        }}
      >
        <IDCardBadge
          ref={cardGroupRef}
          config={config}
          frontTexture={frontTexture}
          backTexture={backTexture}
        />
      </group>
    </>
  );
};
