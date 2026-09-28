import * as THREE from 'three';
import type { IDCardConfig } from './types';

export class IDCardPhysics {
  public pos: THREE.Vector3;
  public vel: THREE.Vector3;
  public rot: THREE.Euler;
  public rotVel: THREE.Vector3;

  public isDragging: boolean = false;
  public isHovered: boolean = false;

  private config: IDCardConfig;
  private time: number = 0;

  // Pointer tracking for drag & inertia
  private lastPointerPos: { x: number; y: number } = { x: 0, y: 0 };
  private pointerVelocity: { x: number; y: number } = { x: 0, y: 0 };
  private hoverPointer: { x: number; y: number } = { x: 0, y: 0 };

  // Stable resting positions
  public restPos: THREE.Vector3;
  private targetFacingAngleY: number = 0; // 0 for front, Math.PI for back

  constructor(config: IDCardConfig) {
    this.config = config;
    const restX = config.lanyard.anchor[0];
    const restY = config.lanyard.anchor[1] - config.lanyard.restLength;
    this.restPos = new THREE.Vector3(restX, restY, 0);
    this.pos = this.restPos.clone();
    this.vel = new THREE.Vector3(0, 0, 0);
    this.rot = new THREE.Euler(0, 0, 0, 'YXZ');
    this.rotVel = new THREE.Vector3(0, 0, 0);
  }

  public updateConfig(newConfig: IDCardConfig) {
    this.config = newConfig;
    const restX = this.config.lanyard.anchor[0];
    const restY = this.config.lanyard.anchor[1] - this.config.lanyard.restLength;
    this.restPos.set(restX, restY, 0);
  }

  public onPointerDown(screenX: number, screenY: number) {
    this.isDragging = true;
    this.lastPointerPos = { x: screenX, y: screenY };
    this.pointerVelocity = { x: 0, y: 0 };
    // Dampen existing velocity upon grabbing
    this.vel.multiplyScalar(0.2);
    this.rotVel.multiplyScalar(0.2);
  }

  public onPointerMove(screenX: number, screenY: number, viewportWidth: number, viewportHeight: number) {
    if (this.isDragging) {
      const dx = screenX - this.lastPointerPos.x;
      const dy = screenY - this.lastPointerPos.y;

      // Update pointer velocity moving average (in viewport normalized units)
      const vx = dx / (viewportWidth || 1000);
      const vy = dy / (viewportHeight || 1000);
      this.pointerVelocity.x = this.pointerVelocity.x * 0.5 + vx * 0.5;
      this.pointerVelocity.y = this.pointerVelocity.y * 0.5 + vy * 0.5;

      this.lastPointerPos = { x: screenX, y: screenY };

      // Map drag displacement to 3D world units proportionally to viewport aspect
      const aspect = (viewportWidth || 1200) / (viewportHeight || 800);
      const scaleFactorY = 5.2;
      const scaleFactorX = scaleFactorY * aspect;
      const targetDisplacementX = (dx / (viewportWidth || 1200)) * scaleFactorX;
      const targetDisplacementY = -(dy / (viewportHeight || 800)) * scaleFactorY;

      // Tension constraint from anchor
      const anchor = new THREE.Vector3(...this.config.lanyard.anchor);
      const proposedPos = this.pos.clone().add(new THREE.Vector3(targetDisplacementX, targetDisplacementY, 0));
      const distFromAnchor = proposedPos.distanceTo(anchor);
      const maxDist = this.config.lanyard.restLength + this.config.maxPullDistance;

      if (distFromAnchor > maxDist) {
        // Elastic stretch resistance
        const excess = distFromAnchor - maxDist;
        const dir = proposedPos.sub(anchor).normalize();
        this.pos.copy(anchor).add(dir.multiplyScalar(maxDist + excess * 0.15));
      } else {
        this.pos.x += targetDisplacementX;
        this.pos.y += targetDisplacementY;
      }

      // Dynamic rotation while dragging
      // Horizontal drag rotates card around Y and slight roll on Z
      this.rot.y += (dx / viewportWidth) * 4.8;
      // Vertical drag tilts card around X
      this.rot.x = THREE.MathUtils.clamp(
        this.rot.x - (dy / viewportHeight) * 2.2,
        -this.config.maxRotationX,
        this.config.maxRotationX
      );
      this.rot.z = THREE.MathUtils.clamp(
        this.rot.z - (dx / viewportWidth) * 1.2,
        -this.config.maxRotationZ,
        this.config.maxRotationZ
      );
    } else {
      // Hover tracking: normalized pointer (-1 to +1) from card center
      this.hoverPointer.x = screenX;
      this.hoverPointer.y = screenY;
    }
  }

  public onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Transfer release inertia from pointer momentum
    const inertia = this.config.releaseInertia;
    this.vel.x += this.pointerVelocity.x * 32.0 * inertia;
    this.vel.y += -this.pointerVelocity.y * 28.0 * inertia;

    this.rotVel.y += this.pointerVelocity.x * 45.0 * inertia;
    this.rotVel.x += -this.pointerVelocity.y * 25.0 * inertia;
    this.rotVel.z += -this.pointerVelocity.x * 12.0 * inertia;

    // Check release orientation: determine whether to settle facing front or back
    // Normalize rot.y to [-PI, PI]
    const normalizedY = ((this.rot.y % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    if (Math.abs(normalizedY) > Math.PI * 0.5) {
      // Settle facing the back!
      this.targetFacingAngleY = Math.sign(normalizedY || 1) * Math.PI;
    } else {
      // Settle facing the front!
      this.targetFacingAngleY = 0;
    }
  }

  public setHovered(hovered: boolean) {
    this.isHovered = hovered;
    if (!hovered) {
      this.hoverPointer = { x: 0, y: 0 };
    }
  }

  public step(delta: number) {
    // Clamp delta to prevent explosion on tab resume
    const dt = Math.min(delta, 0.05);
    this.time += dt;

    if (!this.isDragging) {
      // 1. Calculate Target Position & Rotation
      const targetPos = this.restPos.clone();
      const targetRot = new THREE.Euler(0, this.targetFacingAngleY, 0, 'YXZ');

      // 2. Add subtle natural breathing idle motion (still air oscillation)
      if (this.config.idleMotion) {
        const t = this.time * this.config.idleSpeed;
        const amp = this.config.idleAmplitude;

        const idleRotX = Math.sin(t * 0.92) * amp.rotX + Math.cos(t * 1.64) * (amp.rotX * 0.35);
        const idleRotY = Math.cos(t * 0.74) * amp.rotY + Math.sin(t * 1.28) * (amp.rotY * 0.3);
        const idleRotZ = Math.sin(t * 0.81) * amp.rotZ;

        const idlePosX = Math.sin(t * 0.68) * amp.posX;
        const idlePosY = Math.cos(t * 0.88) * amp.posY;

        targetRot.x += idleRotX;
        targetRot.y += idleRotY;
        targetRot.z += idleRotZ;
        targetPos.x += idlePosX;
        targetPos.y += idlePosY;
      }

      // 3. Add Hover attraction tilt (smooth delay)
      if (this.isHovered) {
        const hx = this.hoverPointer.x;
        const hy = this.hoverPointer.y;
        targetRot.x += -hy * 0.18 * this.config.hoverStrength;
        targetRot.y += hx * 0.28 * this.config.hoverStrength;
        targetRot.z += -hx * 0.06 * this.config.hoverStrength;
        targetPos.x += hx * 0.12 * this.config.hoverStrength;
      }

      // 4. Linear Spring-Damper Physics Integration
      // F = -k * (pos - target) - damping * vel
      const displacement = this.pos.clone().sub(targetPos);
      const springForce = displacement.multiplyScalar(-this.config.spring);
      const dampingForce = this.vel.clone().multiplyScalar(-this.config.damping * Math.sqrt(this.config.spring));

      const totalAccel = springForce.add(dampingForce).divideScalar(this.config.mass);
      this.vel.add(totalAccel.multiplyScalar(dt));
      this.pos.add(this.vel.clone().multiplyScalar(dt));

      // 5. Angular Spring-Damper Physics Integration (With overshoot & swing)
      // Normalize angle difference for shortest rotation path
      let diffY = targetRot.y - this.rot.y;
      diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

      const diffX = targetRot.x - this.rot.x;
      const diffZ = targetRot.z - this.rot.z;

      const angSpring = this.config.angularSpring;
      const angDamping = this.config.angularDamping * Math.sqrt(angSpring);

      const rotAccelX = diffX * angSpring - this.rotVel.x * angDamping;
      const rotAccelY = diffY * angSpring - this.rotVel.y * angDamping;
      const rotAccelZ = diffZ * angSpring - this.rotVel.z * angDamping;

      this.rotVel.x += rotAccelX * dt;
      this.rotVel.y += rotAccelY * dt;
      this.rotVel.z += rotAccelZ * dt;

      this.rot.x += this.rotVel.x * dt;
      this.rot.y += this.rotVel.y * dt;
      this.rot.z += this.rotVel.z * dt;

      // Soft clamp tilts within believable range
      this.rot.x = THREE.MathUtils.clamp(this.rot.x, -this.config.maxRotationX, this.config.maxRotationX);
      this.rot.z = THREE.MathUtils.clamp(this.rot.z, -this.config.maxRotationZ, this.config.maxRotationZ);
    }
  }
}
