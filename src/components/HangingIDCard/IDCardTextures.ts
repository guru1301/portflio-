import * as THREE from 'three';

interface CardTextureOptions {
  photo?: string;
  name?: string;
  role?: string;
  institution?: string;
  degree?: string;
  location?: string;
  code?: string;
  accentColor?: string;
  onUpdate?: () => void;
}

/**
 * Creates the Front Canvas Texture for the ID Card
 */
export function createFrontCardTexture(options: CardTextureOptions): {
  texture: THREE.CanvasTexture;
  updatePhoto: (newUrl: string) => void;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1625;
  const ctx = canvas.getContext('2d')!;

  const name = options.name || 'GURU PRASATH';
  const role = options.role || 'SOFTWARE & SYSTEMS DEVELOPER';
  const institution = options.institution || 'Saranathan College of Eng.';
  const degree = options.degree || 'B.Tech CSBS (2022 — 2026)';
  const code = options.code || 'GP-2026-CSBS';
  const accent = options.accentColor || '#e63946';

  let profileImg: HTMLImageElement | null = null;

  function render() {
    const W = canvas.width;
    const H = canvas.height;

    // 1. Base obsidian background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0e0e13');
    bgGrad.addColorStop(0.5, '#09090c');
    bgGrad.addColorStop(1, '#050508');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle radial light in top center
    const radial = ctx.createRadialGradient(W / 2, 450, 50, W / 2, 450, 700);
    radial.addColorStop(0, 'rgba(230, 57, 70, 0.07)');
    radial.addColorStop(0.6, 'rgba(255, 255, 255, 0.02)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // 2. Micro geometric watermark & grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 48;
    for (let x = gridSize; x < W; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 180);
      ctx.lineTo(x, H - 80);
      ctx.stroke();
    }
    for (let y = 180; y < H - 80; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(gridSize, y);
      ctx.lineTo(W - gridSize, y);
      ctx.stroke();
    }

    // Precision corner crosshairs
    const drawCross = (cx: number, cy: number) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();
    };
    drawCross(60, 200);
    drawCross(W - 60, 200);
    drawCross(60, H - 100);
    drawCross(W - 60, H - 100);

    // Outer subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // 3. Top Punch Slot Cutout Zone (Slot visually highlighted)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 90, 102, 180, 42, 21);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. Header Bar
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(80, 175, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 24px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SECURITY CLEARANCE // 01', 105, 183);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 20px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`ID: ${code}`, W - 80, 183);

    // Holographic Foil Strip
    const holoGrad = ctx.createLinearGradient(60, 205, W - 60, 205);
    holoGrad.addColorStop(0, 'rgba(230, 57, 70, 0.7)');
    holoGrad.addColorStop(0.25, 'rgba(255, 215, 0, 0.75)');
    holoGrad.addColorStop(0.5, 'rgba(64, 224, 208, 0.7)');
    holoGrad.addColorStop(0.75, 'rgba(147, 112, 219, 0.7)');
    holoGrad.addColorStop(1, 'rgba(230, 57, 70, 0.7)');
    ctx.fillStyle = holoGrad;
    ctx.fillRect(60, 205, W - 120, 6);

    // 5. Profile Photo Frame (640x640)
    const photoX = 192;
    const photoY = 240;
    const photoSize = 640;
    const photoRadius = 32;

    // Photo shadow & frame background
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius);
    ctx.clip();

    if (profileImg && profileImg.complete && profileImg.naturalWidth > 0) {
      // Draw loaded photo with cover aspect ratio
      const imgAspect = profileImg.naturalWidth / profileImg.naturalHeight;
      let sx = 0, sy = 0, sw = profileImg.naturalWidth, sh = profileImg.naturalHeight;
      if (imgAspect > 1) {
        sw = profileImg.naturalHeight;
        sx = (profileImg.naturalWidth - sw) / 2;
      } else {
        sh = profileImg.naturalWidth;
        sy = (profileImg.naturalHeight - sh) * 0.2; // slight bias towards face
      }
      ctx.drawImage(profileImg, sx, sy, sw, sh, photoX, photoY, photoSize, photoSize);

      // Subtle high-contrast photo gradient overlay
      const imgGrad = ctx.createLinearGradient(0, photoY + photoSize * 0.6, 0, photoY + photoSize);
      imgGrad.addColorStop(0, 'rgba(10, 10, 14, 0)');
      imgGrad.addColorStop(1, 'rgba(10, 10, 14, 0.6)');
      ctx.fillStyle = imgGrad;
      ctx.fillRect(photoX, photoY, photoSize, photoSize);
    } else {
      // Elegant fallback monogram avatar
      const darkGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoSize);
      darkGrad.addColorStop(0, '#1c1c24');
      darkGrad.addColorStop(1, '#0e0e13');
      ctx.fillStyle = darkGrad;
      ctx.fillRect(photoX, photoY, photoSize, photoSize);

      ctx.fillStyle = '#e63946';
      ctx.font = '700 140px "Syne", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GP', photoX + photoSize / 2, photoY + photoSize / 2 + 50);
    }
    ctx.restore();

    // Photo frame border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius);
    ctx.stroke();

    // Status pill over photo corner
    ctx.fillStyle = 'rgba(12, 12, 16, 0.88)';
    ctx.beginPath();
    ctx.roundRect(photoX + 24, photoY + photoSize - 62, 230, 42, 21);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#22c55e'; // Green active dot
    ctx.beginPath();
    ctx.arc(photoX + 46, photoY + photoSize - 41, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ACTIVE // CERTIFIED', photoX + 62, photoY + photoSize - 35);

    // 6. Name & Role Block
    const textCenter = W / 2;
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 60px "Syne", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), textCenter, 955);

    ctx.fillStyle = accent;
    ctx.font = '700 30px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(role.toUpperCase(), textCenter, 1005);

    // Decorative divider line with diamond
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(100, 1045);
    ctx.lineTo(W - 100, 1045);
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(textCenter, 1038);
    ctx.lineTo(textCenter + 7, 1045);
    ctx.lineTo(textCenter, 1052);
    ctx.lineTo(textCenter - 7, 1045);
    ctx.closePath();
    ctx.fill();

    // 7. Metadata Details Grid (2 Columns)
    const col1X = 90;
    const col2X = 540;

    // Row 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '700 22px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('INSTITUTION', col1X, 1095);
    ctx.fillText('DISCIPLINE', col2X, 1095);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px "Inter", sans-serif';
    ctx.fillText(institution, col1X, 1130);
    ctx.fillText('CS & Business Systems', col2X, 1130);

    // Row 2
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '700 22px "Space Grotesk", monospace, sans-serif';
    ctx.fillText('ACADEMIC BATCH', col1X, 1185);
    ctx.fillText('CLEARANCE ROLE', col2X, 1185);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px "Inter", sans-serif';
    ctx.fillText(degree, col1X, 1220);
    ctx.fillText('CORE DEVELOPER [LVL 01]', col2X, 1220);

    // 8. Bottom Security Barcode & Digital Hash
    const barcodeY = 1310;
    const barcodeH = 75;
    const barcodeStartX = 90;
    const barcodeW = W - 180;

    // Draw authentic-looking variable-width vector barcode
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    let curX = barcodeStartX;
    const barPattern = [
      3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 2, 4, 3, 1, 2, 3, 1, 4, 2,
      1, 3, 2, 4, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2,
      2, 1, 3, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 2, 4, 3, 1, 2, 3, 1, 4,
      1, 3, 2, 4, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2,
    ];
    for (let i = 0; i < barPattern.length && curX < barcodeStartX + barcodeW; i++) {
      const bw = barPattern[i] * 2.2;
      const space = (barPattern[(i + 3) % barPattern.length]) * 2.0;
      ctx.fillRect(curX, barcodeY, bw, barcodeH);
      curX += bw + space;
    }

    // Serial key under barcode
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '700 22px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AUTH HASH: 0984-7721-2026-GP-CSBS // OFFICIAL CREATIVE PASS', W / 2, 1425);

    // Microchip contact pad aesthetic on bottom right
    const chipX = W - 190;
    const chipY = 1455;
    ctx.fillStyle = '#b89047'; // Brushed brass gold
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, 90, 70, 10);
    ctx.fill();
    ctx.strokeStyle = '#6e5223';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Chip contact lines
    ctx.strokeStyle = '#523c16';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(chipX + 30, chipY);
    ctx.lineTo(chipX + 30, chipY + 70);
    ctx.moveTo(chipX + 60, chipY);
    ctx.lineTo(chipX + 60, chipY + 70);
    ctx.moveTo(chipX, chipY + 35);
    ctx.lineTo(chipX + 90, chipY + 35);
    ctx.stroke();

    // Footer brand note
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 18px "Space Grotesk", monospace, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('DEV PORTFOLIO ID // HIGH SPECIFICATION', 100, 1500);

    texture.needsUpdate = true;
    if (options.onUpdate) options.onUpdate();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;

  // Load photo
  const photoUrl = options.photo || '/assets/profile.jpg';
  profileImg = new Image();
  profileImg.crossOrigin = 'anonymous';
  profileImg.onload = () => {
    render();
  };
  profileImg.onerror = () => {
    // Render with fallback
    render();
  };
  profileImg.src = photoUrl;

  render();

  return {
    texture,
    updatePhoto: (newUrl: string) => {
      profileImg = new Image();
      profileImg.crossOrigin = 'anonymous';
      profileImg.onload = render;
      profileImg.onerror = render;
      profileImg.src = newUrl;
    },
  };
}

/**
 * Creates the Back Canvas Texture for the ID Card
 */
export function createBackCardTexture(accentColor?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1625;
  const ctx = canvas.getContext('2d')!;

  const accent = accentColor || '#e63946';
  const W = canvas.width;
  const H = canvas.height;

  // 1. Deep titanium carbon background
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#0c0c10');
  bgGrad.addColorStop(0.5, '#08080b');
  bgGrad.addColorStop(1, '#050507');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Carbon weave lattice
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let x = 0; x < W; x += 16) {
    for (let y = 0; y < H; y += 16) {
      if ((x / 16 + y / 16) % 2 === 0) {
        ctx.fillRect(x, y, 8, 8);
      }
    }
  }

  // Outer border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  // 2. Top Punch Slot Cutout Zone
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.beginPath();
  ctx.roundRect(W / 2 - 90, 102, 180, 42, 21);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 3. Top Magnetic Stripe Band
  const stripeY = 175;
  const stripeH = 130;
  const stripeGrad = ctx.createLinearGradient(0, stripeY, 0, stripeY + stripeH);
  stripeGrad.addColorStop(0, '#15151e');
  stripeGrad.addColorStop(0.5, '#22222d');
  stripeGrad.addColorStop(1, '#0d0d12');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(40, stripeY, W - 80, stripeH);

  // Magnetic stripe gloss highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(40, stripeY + 20, W - 80, 8);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '600 18px "Space Grotesk", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AUTHORIZED ACCESS ONLY // PROPERTY OF GURU PRASATH', W / 2, stripeY + 80);

  // 4. NFC / Contactless Icon
  const nfcX = W / 2;
  const nfcY = 370;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  for (let r = 16; r <= 36; r += 10) {
    ctx.beginPath();
    ctx.arc(nfcX, nfcY, r, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.stroke();
  }

  // 5. Developer Manifesto Statement
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 56px "Syne", "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('“I BUILD SOFTWARE', W / 2, 490);
  ctx.fillText('AROUND REAL PROBLEMS.”', W / 2, 555);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 24px "Space Grotesk", monospace, sans-serif';
  ctx.fillText('FULL-STACK // DATA SYSTEMS // DISTRIBUTED ARCHITECTURE', W / 2, 620);

  // Crimson separator
  ctx.fillStyle = accent;
  ctx.fillRect(W / 2 - 80, 650, 160, 4);

  // 6. Technology Competency Badges
  const badges = ['SPRING BOOT', 'REACT', 'POSTGRESQL', 'FASTAPI', 'PYTHON', 'MONGODB', 'DOCKER'];
  let curBadgeX = 80;
  let curBadgeY = 700;
  ctx.font = '700 22px "Space Grotesk", monospace, sans-serif';
  badges.forEach((b) => {
    const textWidth = ctx.measureText(b).width;
    const badgeW = textWidth + 40;
    if (curBadgeX + badgeW > W - 80) {
      curBadgeX = 80;
      curBadgeY += 60;
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(curBadgeX, curBadgeY, badgeW, 46, 23);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(b, curBadgeX + badgeW / 2, curBadgeY + 30);
    curBadgeX += badgeW + 16;
  });

  // 7. QR Code Block (Clean vector representation)
  const qrX = W / 2 - 140;
  const qrY = 920;
  const qrSize = 280;

  // QR background white plate with slight inset
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(qrX, qrY, qrSize, qrSize, 20);
  ctx.fill();

  // Draw authentic QR code matrix
  ctx.fillStyle = '#0e0e13';
  const qrGrid = 25;
  const qrCell = qrSize / qrGrid;

  // Draw QR corner eyes (top-left, top-right, bottom-left)
  const drawQREye = (ex: number, ey: number) => {
    ctx.fillRect(qrX + ex * qrCell, qrY + ey * qrCell, 7 * qrCell, 7 * qrCell);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX + (ex + 1) * qrCell, qrY + (ey + 1) * qrCell, 5 * qrCell, 5 * qrCell);
    ctx.fillStyle = '#0e0e13';
    ctx.fillRect(qrX + (ex + 2) * qrCell, qrY + (ey + 2) * qrCell, 3 * qrCell, 3 * qrCell);
  };
  drawQREye(2, 2);
  drawQREye(16, 2);
  drawQREye(2, 16);

  // Deterministic aesthetic data cells
  for (let r = 0; r < qrGrid; r++) {
    for (let c = 0; c < qrGrid; c++) {
      // Skip finder eye zones
      if ((r < 9 && c < 9) || (r < 9 && c > 15) || (r > 15 && c < 9)) continue;
      // Procedural data mask
      const val = (Math.sin(r * 12.9898 + c * 78.233) * 43758.5453) % 1;
      if (val > 0.45) {
        ctx.fillRect(qrX + c * qrCell, qrY + r * qrCell, qrCell - 0.5, qrCell - 0.5);
      }
    }
  }

  // QR label below
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 26px "Space Grotesk", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO CONNECT WITH GURU', W / 2, qrY + qrSize + 48);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '600 22px "Space Grotesk", monospace, sans-serif';
  ctx.fillText('PORTFOLIO // GITHUB // LINKEDIN', W / 2, qrY + qrSize + 84);

  // 8. Bottom Authentic Signature & Security Note
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '500 16px "Space Grotesk", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL CREATIVE IDENTITY BADGE // BATCH 2026', W / 2, 1470);
  ctx.fillText('SARANATHAN COLLEGE OF ENGINEERING — TAMIL NADU, INDIA', W / 2, 1500);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;

  return texture;
}

/**
 * Creates the Woven Lanyard Strap Ribbon Texture
 */
export function createLanyardTexture(accentColor?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const accent = accentColor || '#e63946';
  const W = canvas.width;
  const H = canvas.height;

  // Deep graphite base
  ctx.fillStyle = '#14141a';
  ctx.fillRect(0, 0, W, H);

  // Fabric weave lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let x = 0; x < W; x += 6) {
    for (let y = 0; y < H; y += 6) {
      if ((x / 6 + y / 6) % 2 === 0) {
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  // Dynamic accent top & bottom edge borders
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, W, 8);
  ctx.fillRect(0, H - 8, W, 8);

  // Repeating typography along strap
  ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
  ctx.font = '700 32px "Space Grotesk", monospace, sans-serif';
  ctx.textAlign = 'left';

  const phrase = '✦  GURU PRASATH  ✦  SYSTEMS & DEV  ✦  PASS 2026  ✦  ';
  const phraseWidth = ctx.measureText(phrase).width;
  let curX = 0;
  while (curX < W + phraseWidth) {
    ctx.fillText(phrase, curX, H / 2 + 10);
    curX += phraseWidth;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.anisotropy = 16;
  return texture;
}
