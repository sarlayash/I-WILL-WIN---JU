import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { Participant, HACKATHON_DETAILS } from '../data/participants';

export type CertificateTheme = 'obsidian-gold' | 'royal-ivory' | 'prestige-navy';

export interface ThemeColors {
  id: CertificateTheme;
  name: string;
  bgGradStart: string;
  bgGradEnd: string;
  innerBg: string;
  borderOuter: string;
  borderInner: string;
  primaryGold: string;
  secondaryGold: string;
  titleColor: string;
  nameColor: string;
  bodyColor: string;
  accentColor: string;
  sealRing: string;
  sealBg: string;
  sealText: string;
  cardPreviewBg: string;
}

export const THEMES: Record<CertificateTheme, ThemeColors> = {
  'obsidian-gold': {
    id: 'obsidian-gold',
    name: 'Obsidian & 24K Gold',
    bgGradStart: '#0B0F19',
    bgGradEnd: '#030712',
    innerBg: '#080C16',
    borderOuter: '#D4AF37',
    borderInner: '#AA771C',
    primaryGold: '#F3E7BE',
    secondaryGold: '#E6C665',
    titleColor: '#FFDF79',
    nameColor: '#FFF4D2',
    bodyColor: '#D1D5DB',
    accentColor: '#38BDF8',
    sealRing: '#F59E0B',
    sealBg: '#78350F',
    sealText: '#FEF3C7',
    cardPreviewBg: 'from-slate-900 via-slate-950 to-black',
  },
  'royal-ivory': {
    id: 'royal-ivory',
    name: 'Royal Ivory & Platinum Gold',
    bgGradStart: '#FBF9F3',
    bgGradEnd: '#F3EFE0',
    innerBg: '#FFFEFA',
    borderOuter: '#B38B2D',
    borderInner: '#855E12',
    primaryGold: '#8A6818',
    secondaryGold: '#B38B2D',
    titleColor: '#0F172A',
    nameColor: '#1E293B',
    bodyColor: '#334155',
    accentColor: '#0284C7',
    sealRing: '#B45309',
    sealBg: '#92400E',
    sealText: '#FFFBEB',
    cardPreviewBg: 'from-amber-50 to-stone-100',
  },
  'prestige-navy': {
    id: 'prestige-navy',
    name: 'Prestige Navy & Champagne',
    bgGradStart: '#0A192F',
    bgGradEnd: '#020C1B',
    innerBg: '#091629',
    borderOuter: '#64FFDA',
    borderInner: '#C5A059',
    primaryGold: '#F0D499',
    secondaryGold: '#C5A059',
    titleColor: '#E2E8F0',
    nameColor: '#F8FAFC',
    bodyColor: '#94A3B8',
    accentColor: '#38BDF8',
    sealRing: '#D97706',
    sealBg: '#1E293B',
    sealText: '#FDE68A',
    cardPreviewBg: 'from-sky-950 via-slate-900 to-slate-950',
  },
};

export async function createQRCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 250,
      margin: 1,
      color: {
        dark: '#030712',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

// Draw high-resolution certificate on 2800 x 1980 Canvas
export async function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  participant: Participant,
  themeKey: CertificateTheme = 'obsidian-gold',
  verificationUrl: string
): Promise<void> {
  try {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (e) {
    // continue
  }

  const width = 2800;
  const height = 1980;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const theme = THEMES[themeKey] || THEMES['obsidian-gold'];
  const isDark = themeKey !== 'royal-ivory';

  // 1. Background Fill with subtle radial lighting
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.45,
    100,
    width / 2,
    height / 2,
    width * 0.75
  );
  bgGrad.addColorStop(0, theme.innerBg);
  bgGrad.addColorStop(1, theme.bgGradEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Decorative Guilloche Security Wave Lines (Anti-tamper fine lines)
  ctx.save();
  ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.045)' : 'rgba(180, 130, 20, 0.055)';
  ctx.lineWidth = 1.2;
  const waveCount = 28;
  for (let i = 0; i < waveCount; i++) {
    ctx.beginPath();
    const yOffset = (height / waveCount) * i;
    for (let x = 60; x <= width - 60; x += 30) {
      const y = yOffset + Math.sin((x + i * 40) * 0.007) * 28 + Math.cos((x * 0.015) + i) * 14;
      if (x === 60) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // 3. Multi-layer Gold & Security Borders
  // Outer border
  const marginOuter = 60;
  const outerW = width - marginOuter * 2;
  const outerH = height - marginOuter * 2;

  // Outer Gold Frame
  const outerBorderGrad = ctx.createLinearGradient(marginOuter, marginOuter, width - marginOuter, height - marginOuter);
  outerBorderGrad.addColorStop(0, '#D4AF37');
  outerBorderGrad.addColorStop(0.25, '#FFF1C5');
  outerBorderGrad.addColorStop(0.5, '#AA771C');
  outerBorderGrad.addColorStop(0.75, '#F9E498');
  outerBorderGrad.addColorStop(1, '#8A6115');

  ctx.strokeStyle = outerBorderGrad;
  ctx.lineWidth = 14;
  ctx.strokeRect(marginOuter, marginOuter, outerW, outerH);

  // Inner thin border
  const marginMiddle = 76;
  ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(133, 94, 18, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(marginMiddle, marginMiddle, width - marginMiddle * 2, height - marginMiddle * 2);

  // Main inner bordered card
  const marginInner = 92;
  const innerW = width - marginInner * 2;
  const innerH = height - marginInner * 2;
  ctx.strokeStyle = outerBorderGrad;
  ctx.lineWidth = 5;
  ctx.strokeRect(marginInner, marginInner, innerW, innerH);

  // Decorative corner rosettes
  const cornerSize = 75;
  drawCornerAccents(ctx, marginInner, marginInner, cornerSize, outerBorderGrad);
  drawCornerAccents(ctx, width - marginInner, marginInner, cornerSize, outerBorderGrad, true, false);
  drawCornerAccents(ctx, marginInner, height - marginInner, cornerSize, outerBorderGrad, false, true);
  drawCornerAccents(ctx, width - marginInner, height - marginInner, cornerSize, outerBorderGrad, true, true);

  // Micro-security text around inner frame
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(133, 94, 18, 0.45)';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  const microText = '★ JIET GROUP OF UNIVERSE ★ 12 HOURS HACKATHON ★ 56 MINDS 1 MISSION ★ BUILD IN PUBLIC ★ OCT 1-2 2026 ★ OFFICIAL VERIFIED CREDENTIAL ★ ';
  ctx.fillText(microText.repeat(3), marginInner + 40, marginInner - 5);
  ctx.fillText(microText.repeat(3), marginInner + 40, height - marginInner + 12);
  ctx.restore();

  // 4. Header: Crest & Insignia
  drawInsignia(ctx, width / 2, 175, isDark);

  // Institution title
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? '#E5E7EB' : '#1E293B';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('JIET GROUP OF UNIVERSE', width / 2, 255);

  ctx.fillStyle = isDark ? '#9CA3AF' : '#64748B';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('POWERED BY JIET UNIVERSE & KAPIL - KNOWLEDGE MULTIVERSE ARCHITECT', width / 2, 286);

  // Horizontal divider with star
  drawDivider(ctx, width / 2, 316, 520, outerBorderGrad);

  // 5. Certificate Main Title
  ctx.save();
  const titleGrad = ctx.createLinearGradient(width / 2 - 400, 360, width / 2 + 400, 420);
  if (isDark) {
    titleGrad.addColorStop(0, '#FFE8A3');
    titleGrad.addColorStop(0.4, '#F3D478');
    titleGrad.addColorStop(0.7, '#D4AF37');
    titleGrad.addColorStop(1, '#FFE8A3');
  } else {
    titleGrad.addColorStop(0, '#1E293B');
    titleGrad.addColorStop(0.5, '#0F172A');
    titleGrad.addColorStop(1, '#1E293B');
  }

  ctx.fillStyle = titleGrad;
  ctx.font = '800 58px "Cinzel", serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('CERTIFICATE OF EXCELLENCE', width / 2, 386);

  ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
  ctx.font = '700 20px "Cinzel", serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('ELITE BUILDER & VISIONARY INNOVATION RECOGNITION', width / 2, 425);
  ctx.restore();

  // 6. Hackathon Badge Banner
  const badgeY = 475;
  const badgeW = 980;
  const badgeH = 46;
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.95)';
  ctx.strokeStyle = outerBorderGrad;
  ctx.lineWidth = 1.5;
  roundRect(ctx, width / 2 - badgeW / 2, badgeY, badgeW, badgeH, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText(
    'I WILL WIN  |  12 HOURS HACKATHON  |  56 MINDS  |  1 MISSION  |  BUILD IN PUBLIC',
    width / 2,
    badgeY + 28
  );
  ctx.restore();

  // 7. Presentation Subtitle
  ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
  ctx.font = 'italic 26px "Playfair Display", serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('This elite credential is proudly conferred upon', width / 2, 575);

  // 8. Recipient Name (Centerpiece)
  ctx.save();
  const nameGrad = ctx.createLinearGradient(width / 2 - 400, 620, width / 2 + 400, 720);
  if (isDark) {
    nameGrad.addColorStop(0, '#FFFFFF');
    nameGrad.addColorStop(0.3, '#FFE9AF');
    nameGrad.addColorStop(0.7, '#FCD34D');
    nameGrad.addColorStop(1, '#FFFFFF');
    ctx.shadowColor = 'rgba(245, 158, 11, 0.35)';
    ctx.shadowBlur = 24;
  } else {
    nameGrad.addColorStop(0, '#0F172A');
    nameGrad.addColorStop(0.5, '#1E293B');
    nameGrad.addColorStop(1, '#0F172A');
  }

  ctx.fillStyle = nameGrad;
  ctx.font = '700 78px "Cinzel", serif';
  ctx.letterSpacing = '4px';
  ctx.fillText(participant.name.toUpperCase(), width / 2, 690);
  ctx.restore();

  // Golden underline ribbon under name
  const underW = Math.max(500, participant.name.length * 36);
  drawNameUnderline(ctx, width / 2, 720, underW, outerBorderGrad);

  // 9. Citation & Honor Paragraph
  ctx.save();
  ctx.fillStyle = isDark ? '#CBD5E1' : '#334155';
  ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.5px';
  
  const textLine1 =
    'For exhibiting indomitable tenacity, breakthrough engineering execution, and creative mastery';
  const textLine2 =
    'during the high-intensity 12-Hour Non-Stop Hackathon conducted from October 1 to October 2, 2026.';
  const textLine3 =
    'Recognized among the exclusive cohort of 56 minds united in one mission to Build in Public at JIET Group of Universe.';
  
  ctx.fillText(textLine1, width / 2, 785);
  ctx.fillText(textLine2, width / 2, 825);
  ctx.fillText(textLine3, width / 2, 865);
  ctx.restore();

  // 10. Cohort & Track Tagline
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('COHORT: 56 MINDS ELITE SPRINT  ·  STATUS: CERTIFIED VERIFIED COMPLETER', width / 2, 920);

  // 11. Bottom Section:
  // - Left: Official QR Verification Box
  // - Center: Official 3D Embossed Gold Seal
  // - Right: Dual Signatures (Kapil & JIET Leadership)
  const bottomY = 1200;

  // Generate and draw QR Code
  try {
    const qrDataUrl = await createQRCodeDataUrl(verificationUrl);
    if (qrDataUrl) {
      await drawQRSection(ctx, 220, bottomY, qrDataUrl, participant, isDark, outerBorderGrad);
    }
  } catch (e) {
    console.error('Error drawing QR code', e);
  }

  // Draw Official Gold Seal in the Center
  drawOfficialGoldMedalSeal(ctx, width / 2, bottomY + 180, isDark);

  // Draw Signatures on the Right
  drawSignatures(ctx, width - 680, bottomY, isDark, outerBorderGrad);

  // 12. Bottom Security Meta Footer
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.6)' : 'rgba(100, 116, 139, 0.7)';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'left';
  ctx.fillText(
    `CREDENTIAL: ${participant.certificateNumber}  |  HASH: ${participant.verificationHash}  |  ISSUED: ${participant.issuedDate.toUpperCase()}`,
    marginInner + 40,
    height - marginInner - 24
  );

  ctx.textAlign = 'right';
  ctx.fillText(
    `BLOCK-VERIFIED AUTHENTICITY  •  JIET UNIVERSE DIGITAL REGISTRY`,
    width - marginInner - 40,
    height - marginInner - 24
  );
  ctx.restore();
}

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  grad: CanvasGradient | string,
  flipX = false,
  flipY = false
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(12, 12);
  ctx.lineTo(size, 12);
  ctx.moveTo(12, 12);
  ctx.lineTo(12, size);

  ctx.moveTo(22, 22);
  ctx.lineTo(size - 16, 22);
  ctx.moveTo(22, 22);
  ctx.lineTo(22, size - 16);

  // Diamond corner
  ctx.moveTo(24, 8);
  ctx.lineTo(32, 16);
  ctx.lineTo(24, 24);
  ctx.lineTo(16, 16);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

function drawInsignia(ctx: CanvasRenderingContext2D, cx: number, cy: number, isDark: boolean) {
  ctx.save();
  ctx.translate(cx, cy);

  // Gold shield / crest
  ctx.beginPath();
  ctx.moveTo(0, -42);
  ctx.lineTo(34, -22);
  ctx.lineTo(34, 15);
  ctx.quadraticCurveTo(30, 44, 0, 52);
  ctx.quadraticCurveTo(-30, 44, -34, 15);
  ctx.lineTo(-34, -22);
  ctx.closePath();

  const crestGrad = ctx.createLinearGradient(-34, -42, 34, 52);
  crestGrad.addColorStop(0, '#FFE89E');
  crestGrad.addColorStop(0.5, '#D4AF37');
  crestGrad.addColorStop(1, '#8C6718');
  ctx.fillStyle = crestGrad;
  ctx.fill();
  ctx.strokeStyle = isDark ? '#FFF2C6' : '#6A4A0A';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner shield details
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(24, -16);
  ctx.lineTo(24, 10);
  ctx.quadraticCurveTo(20, 32, 0, 38);
  ctx.quadraticCurveTo(-20, 32, -24, 10);
  ctx.lineTo(-24, -16);
  ctx.closePath();
  ctx.fillStyle = isDark ? '#0F172A' : '#1E293B';
  ctx.fill();

  // Star in crest
  drawStar(ctx, 0, 6, 5, 14, 7, '#FCD34D');

  // Laurel branches left and right
  drawLaurelBranch(ctx, -46, 6, -1);
  drawLaurelBranch(ctx, 46, 6, 1);

  ctx.restore();
}

function drawLaurelBranch(ctx: CanvasRenderingContext2D, x: number, y: number, dir: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.arc(10, 0, 32, Math.PI * 0.7, Math.PI * 1.4);
  ctx.stroke();

  // leaves
  const leaves = [-20, -10, 0, 10, 20];
  ctx.fillStyle = '#E5C058';
  leaves.forEach((ly) => {
    ctx.beginPath();
    ctx.ellipse(-14, ly, 7, 3.5, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fill: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  grad: CanvasGradient | string
) {
  ctx.save();
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 24, cy);
  ctx.moveTo(cx + 24, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  // Center diamond
  ctx.beginPath();
  ctx.moveTo(cx, cy - 8);
  ctx.lineTo(cx + 8, cy);
  ctx.lineTo(cx, cy + 8);
  ctx.lineTo(cx - 8, cy);
  ctx.closePath();
  ctx.fillStyle = '#D4AF37';
  ctx.fill();
  ctx.restore();
}

function drawNameUnderline(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  grad: CanvasGradient | string
) {
  ctx.save();
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - width / 2 + 40, cy + 6);
  ctx.lineTo(cx + width / 2 - 40, cy + 6);
  ctx.stroke();

  ctx.restore();
}

async function drawQRSection(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  qrDataUrl: string,
  participant: Participant,
  isDark: boolean,
  borderGrad: CanvasGradient | string
) {
  const boxW = 440;
  const boxH = 320;

  // Background panel for QR Code
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)';
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  // Load and draw QR image
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = qrDataUrl;
  });

  const qrSize = 160;
  const qrX = x + 30;
  const qrY = y + 35;

  // White backing for QR clarity
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, qrX - 6, qrY - 6, qrSize + 12, qrSize + 12, 6);
  ctx.fill();
  ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

  // QR Meta text on the right of the QR image inside the box
  const textX = qrX + qrSize + 24;
  ctx.textAlign = 'left';

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.fillText('SCAN TO VERIFY', textX, y + 55);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('JIET SECURE ID', textX, y + 80);

  ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText(participant.id, textX, y + 105);

  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: VERIFIED', textX, y + 130);
  ctx.fillText('HASH: ' + participant.verificationHash, textX, y + 150);
  ctx.fillText('RECORD: AUTHENTIC', textX, y + 170);

  // Bottom caption inside the box
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Point smartphone camera to inspect tamper-proof verification ledger',
    x + boxW / 2,
    y + boxH - 26
  );

  ctx.restore();
}

function drawOfficialGoldMedalSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  isDark: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Ribbon tails hanging beneath
  const ribbonGrad = ctx.createLinearGradient(-40, 20, 40, 150);
  ribbonGrad.addColorStop(0, '#B45309');
  ribbonGrad.addColorStop(0.5, '#D97706');
  ribbonGrad.addColorStop(1, '#78350F');

  // Left ribbon
  ctx.fillStyle = ribbonGrad;
  ctx.beginPath();
  ctx.moveTo(-20, 50);
  ctx.lineTo(-50, 160);
  ctx.lineTo(-30, 145);
  ctx.lineTo(-10, 160);
  ctx.lineTo(-5, 60);
  ctx.closePath();
  ctx.fill();

  // Right ribbon
  ctx.beginPath();
  ctx.moveTo(20, 50);
  ctx.lineTo(50, 160);
  ctx.lineTo(30, 145);
  ctx.lineTo(10, 160);
  ctx.lineTo(5, 60);
  ctx.closePath();
  ctx.fill();

  // Outer Starburst / Notched seal ring
  const numNotches = 36;
  const outerR = 92;
  const innerR = 84;
  ctx.beginPath();
  for (let i = 0; i < numNotches; i++) {
    const angle = (i * 2 * Math.PI) / numNotches;
    const nextAngle = ((i + 0.5) * 2 * Math.PI) / numNotches;
    const x1 = Math.cos(angle) * outerR;
    const y1 = Math.sin(angle) * outerR;
    const x2 = Math.cos(nextAngle) * innerR;
    const y2 = Math.sin(nextAngle) * innerR;
    if (i === 0) ctx.moveTo(x1, y1);
    else ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.closePath();

  const sealGoldGrad = ctx.createRadialGradient(-20, -20, 10, 0, 0, 95);
  sealGoldGrad.addColorStop(0, '#FFF5D6');
  sealGoldGrad.addColorStop(0.3, '#F59E0B');
  sealGoldGrad.addColorStop(0.7, '#D4AF37');
  sealGoldGrad.addColorStop(1, '#8A6115');
  ctx.fillStyle = sealGoldGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(0, 0, 72, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#78350F' : '#92400E';
  ctx.fill();
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Circular Seal text
  ctx.save();
  ctx.fillStyle = '#FEF3C7';
  ctx.font = '700 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  const sealText = '★ JIET UNIVERSE ★ 56 MINDS ★ BUILD IN PUBLIC ★ 2026 ';
  const chars = sealText.split('');
  const arcStep = (Math.PI * 2) / chars.length;
  chars.forEach((char, index) => {
    ctx.save();
    ctx.rotate(index * arcStep);
    ctx.fillText(char, 0, -56);
    ctx.restore();
  });
  ctx.restore();

  // Center crest inside seal
  drawStar(ctx, 0, -8, 5, 24, 11, '#FDE68A');

  ctx.fillStyle = '#FFFBEB';
  ctx.font = '800 13px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ELITE', 0, 20);

  ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICIAL', 0, 34);

  ctx.restore();
}

function drawSignatures(
  ctx: CanvasRenderingContext2D,
  startX: number,
  y: number,
  isDark: boolean,
  borderGrad: CanvasGradient | string
) {
  // Signatory 1: Kapil - Knowledge Multiverse Architect
  const sig1X = startX - 10;
  drawSingleSignature(
    ctx,
    sig1X,
    y,
    'Kapil',
    'Knowledge Multiverse Architect',
    'Hackathon Convener & Lead Mentor',
    isDark,
    borderGrad
  );

  // Signatory 2: JIET Universe Director / Patron
  const sig2X = startX + 330;
  drawSingleSignature(
    ctx,
    sig2X,
    y,
    'JIET Universe',
    'Director of Innovation & Technology',
    'JIET Group Of Universe',
    isDark,
    borderGrad,
    true
  );
}

function drawSingleSignature(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sigName: string,
  title: string,
  subtitle: string,
  isDark: boolean,
  borderGrad: CanvasGradient | string,
  isDirector = false
) {
  ctx.save();
  ctx.translate(x, y);

  // Artistic script signature representation
  ctx.save();
  if (isDirector) {
    ctx.strokeStyle = isDark ? '#E2E8F0' : '#0F172A';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, 95);
    ctx.bezierCurveTo(60, 40, 90, 110, 130, 60);
    ctx.bezierCurveTo(160, 20, 190, 80, 220, 65);
    ctx.bezierCurveTo(240, 50, 250, 85, 270, 75);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#CBD5E1' : '#1E293B';
    ctx.font = '36px "Great Vibes", cursive';
    ctx.fillText('Director JIET', 50, 85);
  } else {
    ctx.strokeStyle = isDark ? '#FDE68A' : '#78350F';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(25, 90);
    ctx.bezierCurveTo(55, 30, 95, 115, 140, 55);
    ctx.bezierCurveTo(170, 15, 210, 85, 250, 60);
    ctx.bezierCurveTo(265, 45, 280, 80, 290, 70);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#FEF08A' : '#854D0E';
    ctx.font = '44px "Great Vibes", cursive';
    ctx.fillText('Kapil Narula', 45, 80);
  }
  ctx.restore();

  // Signature line
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 125);
  ctx.lineTo(290, 125);
  ctx.stroke();

  // Name & titles
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
  ctx.font = '700 18px "Cinzel", serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(sigName.toUpperCase(), 150, 155);

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText(title, 150, 178);

  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(subtitle, 150, 198);

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Download helpers
export function downloadPNGFromCanvas(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

export function downloadPDFFromCanvas(canvas: HTMLCanvasElement, filename: string): void {
  // A4 Landscape is 297mm x 210mm
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
  pdf.save(`${filename}.pdf`);
}
