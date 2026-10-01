import { useMemo, forwardRef } from 'react';
import * as THREE from 'three';
import type { IDCardConfig } from './types';

interface IDCardBadgeProps {
  config: IDCardConfig;
  frontTexture: THREE.CanvasTexture;
  backTexture: THREE.CanvasTexture;
  isMobile?: boolean;
}

export const IDCardBadge = forwardRef<THREE.Group, IDCardBadgeProps>(
  ({ config, frontTexture, backTexture, isMobile = false }, ref) => {
    const { width: w, height: h, thickness: t, cornerRadius: r, slotWidth: sw, slotHeight: sh, slotYOffset: sy } =
      config.dimensions;

    // 1. Extruded Base Card Geometry with Punch Hole
    const { cardGeometry, faceGeometry } = useMemo(() => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;

      // Outer rounded rectangle
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);

      // Punch out top slot hole
      const hole = new THREE.Path();
      const hx = -sw / 2;
      const hy = sy - sh / 2;
      const hr = sh / 2;
      hole.moveTo(hx + hr, hy);
      hole.lineTo(hx + sw - hr, hy);
      hole.quadraticCurveTo(hx + sw, hy, hx + sw, hy + hr);
      hole.lineTo(hx + sw, hy + sh - hr);
      hole.quadraticCurveTo(hx + sw, hy + sh, hx + sw - hr, hy + sh);
      hole.lineTo(hx + hr, hy + sh);
      hole.quadraticCurveTo(hx, hy + sh, hx, hy + sh - hr);
      hole.lineTo(hx, hy + hr);
      hole.quadraticCurveTo(hx, hy, hx + hr, hy);
      shape.holes.push(hole);

      // Extrude for realistic solid physical thickness
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: t,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.008,
        bevelThickness: 0.008,
      };

      const cardGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      cardGeom.center(); // Center geometry around origin

      // Plane geometry for Front and Back texture surfaces
      // Using ShapeGeometry with UVs mapped 0 to 1
      const faceShape = new THREE.Shape();
      faceShape.moveTo(x + r, y);
      faceShape.lineTo(x + w - r, y);
      faceShape.quadraticCurveTo(x + w, y, x + w, y + r);
      faceShape.lineTo(x + w, y + h - r);
      faceShape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      faceShape.lineTo(x + r, y + h);
      faceShape.quadraticCurveTo(x, y + h, x, y + h - r);
      faceShape.lineTo(x, y + r);
      faceShape.quadraticCurveTo(x, y, x + r, y);

      // Add slot hole to face geometry too
      const faceHole = new THREE.Path();
      faceHole.moveTo(hx + hr, hy);
      faceHole.lineTo(hx + sw - hr, hy);
      faceHole.quadraticCurveTo(hx + sw, hy, hx + sw, hy + hr);
      faceHole.lineTo(hx + sw, hy + sh - hr);
      faceHole.quadraticCurveTo(hx + sw, hy + sh, hx + sw - hr, hy + sh);
      faceHole.lineTo(hx + hr, hy + sh);
      faceHole.quadraticCurveTo(hx, hy + sh, hx, hy + sh - hr);
      faceHole.lineTo(hx, hy + hr);
      faceHole.quadraticCurveTo(hx, hy, hx + hr, hy);
      faceShape.holes.push(faceHole);

      const faceGeom = new THREE.ShapeGeometry(faceShape);
      // Compute planar UVs accurately normalized [0, 1]
      const posAttr = faceGeom.attributes.position;
      const uvs = new Float32Array(posAttr.count * 2);
      for (let i = 0; i < posAttr.count; i++) {
        const px = posAttr.getX(i);
        const py = posAttr.getY(i);
        uvs[i * 2] = (px + w / 2) / w;
        uvs[i * 2 + 1] = (py + h / 2) / h;
      }
      faceGeom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      return { cardGeometry: cardGeom, faceGeometry: faceGeom };
    }, [w, h, t, r, sw, sh, sy]);

    // Hardware materials & positioning
    const hardwareY = sy;

    return (
      <group ref={ref}>
        {/* Solid Polycarbonate Core & Edge */}
        <mesh geometry={cardGeometry} castShadow receiveShadow>
          <meshStandardMaterial
            color={config.materials.edgeColor}
            roughness={config.materials.cardRoughness}
            metalness={config.materials.cardMetalness}
          />
        </mesh>

        {/* Front Face with Texture */}
        <mesh
          geometry={faceGeometry}
          position={[0, 0, t / 2 + 0.009]}
          receiveShadow
        >
          <meshStandardMaterial
            map={frontTexture}
            roughness={isMobile ? 0.68 : 0.22}
            metalness={0.0}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Back Face with Texture */}
        <mesh
          geometry={faceGeometry}
          position={[0, 0, -t / 2 - 0.009]}
          rotation={[0, Math.PI, 0]}
          receiveShadow
        >
          <meshStandardMaterial
            map={backTexture}
            roughness={0.28}
            metalness={0.06}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Hardware: Metal D-Ring / Swivel Clasp passing through the slot hole */}
        <group position={[0, hardwareY, 0]}>
          {/* Metal D-Ring Loop */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.024, 16, 24, Math.PI]} />
            <meshStandardMaterial
              color={config.materials.hardwareColor}
              metalness={config.materials.hardwareMetalness}
              roughness={config.materials.hardwareRoughness}
            />
          </mesh>

          {/* Swivel Body */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.12, 16]} />
            <meshStandardMaterial
              color={config.materials.hardwareColor}
              metalness={config.materials.hardwareMetalness}
              roughness={config.materials.hardwareRoughness}
            />
          </mesh>

          {/* Strap Clamp Jaw */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.16, 0.09, 0.05]} />
            <meshStandardMaterial
              color="#2a2a34"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Clamp Rivet / Fastener */}
          <mesh position={[0, 0.25, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 12]} />
            <meshStandardMaterial
              color={config.lanyard.accentColor || '#e63946'}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>
    );
  }
);

IDCardBadge.displayName = 'IDCardBadge';
