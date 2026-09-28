import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { IDCardConfig } from './types';

interface LanyardRopeProps {
  config: IDCardConfig;
  cardGroupRef: React.RefObject<THREE.Group | null>;
  lanyardTexture: THREE.CanvasTexture;
}

export const LanyardRope: React.FC<LanyardRopeProps> = ({
  config,
  cardGroupRef,
  lanyardTexture,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = config.lanyard.segments || 36;
  const strapHalfWidth = (config.lanyard.width || 0.075) * 0.5;

  // Fixed top anchor point
  const anchorPoint = useMemo(
    () => new THREE.Vector3(...config.lanyard.anchor),
    [config.lanyard.anchor]
  );

  // Dynamic lag control points for fluid inertial bending
  const lagP1 = useRef(anchorPoint.clone().add(new THREE.Vector3(0, -0.8, 0)));
  const lagP2 = useRef(anchorPoint.clone().add(new THREE.Vector3(0, -1.8, 0)));
  const lagP3 = useRef(anchorPoint.clone().add(new THREE.Vector3(0, -2.6, 0)));

  // Pre-allocated BufferGeometry for stable ribbon strap (NO geometry reallocations)
  const ribbonGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertexCount = (segments + 1) * 2;
    const positions = new Float32Array(vertexCount * 3);
    const normals = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    const indices: number[] = [];

    // Pre-calculate UVs and quad strip indices
    for (let i = 0; i <= segments; i++) {
      const v = i / segments;
      const idx = i * 2;

      // UVs: [0, v * repeat] and [1, v * repeat]
      uvs[idx * 2] = 0;
      uvs[idx * 2 + 1] = v * 3.5;
      uvs[(idx + 1) * 2] = 1;
      uvs[(idx + 1) * 2 + 1] = v * 3.5;

      // Standard initial normals pointing towards viewer (+Z)
      normals[idx * 3] = 0;
      normals[idx * 3 + 1] = 0;
      normals[idx * 3 + 2] = 1;

      normals[(idx + 1) * 3] = 0;
      normals[(idx + 1) * 3 + 1] = 0;
      normals[(idx + 1) * 3 + 2] = 1;

      // Indices for two triangles per segment
      if (i < segments) {
        const a = idx;
        const b = idx + 1;
        const c = idx + 2;
        const d = idx + 3;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.setIndex(indices);

    return geom;
  }, [segments]);

  // Clean up geometry on unmount
  useEffect(() => {
    return () => {
      ribbonGeometry.dispose();
    };
  }, [ribbonGeometry]);

  useFrame((_, delta) => {
    if (!meshRef.current || !cardGroupRef.current) return;

    const dt = Math.min(delta, 0.05);

    // Calculate exact attachment point at the top of the metal clamp on the card
    const cardGroup = cardGroupRef.current;
    const clampLocalPos = new THREE.Vector3(0, config.dimensions.slotYOffset + 0.22, 0);
    const clampWorldPos = clampLocalPos.applyMatrix4(cardGroup.matrixWorld);

    // Tension / distance calculation
    const dist = anchorPoint.distanceTo(clampWorldPos);
    const slackFactor = Math.max(0, 1 - dist / (config.lanyard.restLength * 1.1));

    // Dynamic lag interpolation along the lanyard spine (catenary sag + inertial delay)
    const targetP1 = anchorPoint.clone().lerp(clampWorldPos, 0.25);
    targetP1.x += (clampWorldPos.x - anchorPoint.x) * 0.08;
    lagP1.current.lerp(targetP1, Math.min(1, dt * 26));

    const targetP2 = anchorPoint.clone().lerp(clampWorldPos, 0.52);
    // Gravity sag: sags downward when slack
    targetP2.y -= slackFactor * 0.45 + 0.03;
    targetP2.z += Math.sin(slackFactor * Math.PI) * 0.12;
    lagP2.current.lerp(targetP2, Math.min(1, dt * 20));

    const targetP3 = anchorPoint.clone().lerp(clampWorldPos, 0.78);
    targetP3.x += (clampWorldPos.x - anchorPoint.x) * 0.12;
    lagP3.current.lerp(targetP3, Math.min(1, dt * 28));

    // Sample points along the CatmullRom spline
    const curve = new THREE.CatmullRomCurve3([
      anchorPoint,
      lagP1.current,
      lagP2.current,
      lagP3.current,
      clampWorldPos,
    ]);

    const posAttr = ribbonGeometry.attributes.position as THREE.BufferAttribute;
    const normAttr = ribbonGeometry.attributes.normal as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const normArray = normAttr.array as Float32Array;

    // Stable reference vector: viewer direction +Z
    const refForward = new THREE.Vector3(0, 0, 1);
    const splinePoints = curve.getPoints(segments);

    for (let i = 0; i <= segments; i++) {
      const p = splinePoints[i];

      // Calculate tangent vector
      let tangent: THREE.Vector3;
      if (i === 0) {
        tangent = splinePoints[1].clone().sub(p).normalize();
      } else if (i === segments) {
        tangent = p.clone().sub(splinePoints[segments - 1]).normalize();
      } else {
        tangent = splinePoints[i + 1].clone().sub(splinePoints[i - 1]).normalize();
      }

      // Calculate stable side vector perpendicular to tangent and +Z
      // Side = Tangent x RefForward
      let side = new THREE.Vector3().crossVectors(tangent, refForward);
      if (side.lengthSq() < 0.0001) {
        side.set(1, 0, 0);
      } else {
        side.normalize();
      }
      side.multiplyScalar(strapHalfWidth);

      // Normal = Side x Tangent
      const normal = new THREE.Vector3().crossVectors(side, tangent).normalize();

      const idx = i * 2;

      // Left vertex
      posArray[idx * 3] = p.x - side.x;
      posArray[idx * 3 + 1] = p.y - side.y;
      posArray[idx * 3 + 2] = p.z - side.z;

      normArray[idx * 3] = normal.x;
      normArray[idx * 3 + 1] = normal.y;
      normArray[idx * 3 + 2] = normal.z;

      // Right vertex
      posArray[(idx + 1) * 3] = p.x + side.x;
      posArray[(idx + 1) * 3 + 1] = p.y + side.y;
      posArray[(idx + 1) * 3 + 2] = p.z + side.z;

      normArray[(idx + 1) * 3] = normal.x;
      normArray[(idx + 1) * 3 + 1] = normal.y;
      normArray[(idx + 1) * 3 + 2] = normal.z;
    }

    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={ribbonGeometry} castShadow receiveShadow>
      <meshStandardMaterial
        map={lanyardTexture}
        roughness={0.6}
        metalness={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
