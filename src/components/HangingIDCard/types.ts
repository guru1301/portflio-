export interface IDCardConfig {
  scale: number;
  idleMotion: boolean;
  idleSpeed: number;
  idleAmplitude: {
    rotX: number;
    rotY: number;
    rotZ: number;
    posX: number;
    posY: number;
  };
  hoverStrength: number;
  spring: number;
  damping: number;
  angularSpring: number;
  angularDamping: number;
  gravity: number;
  mass: number;
  maxPullDistance: number;
  maxRotationX: number;
  maxRotationZ: number;
  releaseInertia: number;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
    cornerRadius: number;
    slotWidth: number;
    slotHeight: number;
    slotYOffset: number;
  };
  lanyard: {
    anchor: [number, number, number];
    restLength: number;
    color: string;
    accentColor: string;
    width: number;
    segments: number;
  };
  materials: {
    cardRoughness: number;
    cardMetalness: number;
    cardClearcoat: number;
    edgeColor: string;
    hardwareColor: string;
    hardwareMetalness: number;
    hardwareRoughness: number;
  };
}

export interface HangingIDCardProps {
  photo?: string;
  name?: string;
  role?: string;
  institution?: string;
  degree?: string;
  location?: string;
  code?: string;
  className?: string;
  config?: Partial<IDCardConfig>;
}
