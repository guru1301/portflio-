import type { IDCardConfig } from './types';

export const DEFAULT_CARD_CONFIG: IDCardConfig = {
  scale: 1.0,
  idleMotion: true,
  idleSpeed: 1.0,
  idleAmplitude: {
    rotX: 0.032,
    rotY: 0.042,
    rotZ: 0.018,
    posX: 0.024,
    posY: 0.014,
  },
  hoverStrength: 0.38,
  spring: 34.0,          // Natural pendulum linear stiffness returning to rest
  damping: 0.86,         // Viscous damping for smooth multi-swing settling
  angularSpring: 28.0,   // Rotational restorative torque
  angularDamping: 0.84,  // Angular damping
  gravity: 9.8,
  mass: 1.1,
  maxPullDistance: 8.0,  // Allows dragging card fully across the entire hero width
  maxRotationX: 0.60,    // Believable tilt
  maxRotationZ: 0.45,    // Roll banking
  releaseInertia: 1.35,  // Momentum multiplier on pointer release
  dimensions: {
    width: 1.84,
    height: 2.92,
    thickness: 0.040,
    cornerRadius: 0.12,
    slotWidth: 0.32,
    slotHeight: 0.07,
    slotYOffset: 1.22,
  },
  lanyard: {
    anchor: [3.1, 4.3, 0],
    restLength: 4.6,     // Long lanyard rope reaching down from ceiling
    color: '#15151c',
    accentColor: '#e63946',
    width: 0.082,
    segments: 40,
  },
  materials: {
    cardRoughness: 0.32,
    cardMetalness: 0.12,
    cardClearcoat: 0.28,
    edgeColor: '#1e1e28',
    hardwareColor: '#626274',
    hardwareMetalness: 0.94,
    hardwareRoughness: 0.18,
  },
};
