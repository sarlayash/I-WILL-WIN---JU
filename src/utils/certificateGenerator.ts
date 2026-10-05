import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { Participant, HACKATHON_DETAILS } from '../data/participants';
import { EVENT_IMAGE_DATA_URL } from '../assets/eventImage';

export const GITHUB_PAGES_APP_URL = 'https://sarlayash.github.io/I-WILL-WIN---JU/';
export const RUN_APP_URL = 'https://ais-pre-bp3ssrvehv2taassdxou3d-252756721792.asia-east1.run.app/';

export function getPublicVerificationUrl(participantId: string): string {
  try {
    if (typeof window !== 'undefined' && window.location) {
      const href = window.location.href;
      // If we are currently running on a public website (not localhost, 127.0.0.1, or sandboxed file)
      if (window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1') && window.location.origin.startsWith('http')) {
        const url = new URL(href);
        url.search = '';
        url.hash = '';
        let cleanBase = url.toString();
        // Remove index.html if present
        cleanBase = cleanBase.replace(/\/index\.html\/?$/, '');
        if (!cleanBase.endsWith('/')) {
          cleanBase += '/';
        }
        return `${cleanBase}?verify=${encodeURIComponent(participantId)}`;
      }
    }
  } catch (e) {
    // fallback
  }

  // Canonical fallback to official GitHub Pages repository URL
  return `${GITHUB_PAGES_APP_URL}?verify=${encodeURIComponent(participantId)}`;
}

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
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
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

  // Preload official event image
  let eventImg: HTMLImageElement | null = null;
  try {
    eventImg = new Image();
    await new Promise<void>((resolve) => {
      if (!eventImg) return resolve();
      eventImg.onload = () => resolve();
      eventImg.onerror = () => resolve();
      eventImg.src = EVENT_IMAGE_DATA_URL;
    });
  } catch (e) {
    // continue
  }

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
  const waveCount = 30;
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
  const microText = '★ POWERED BY KAPIL ★ CO-POWERED BY JIET UNIVERSE ★ 12 HOURS HACKATHON ★ 56 MINDS 1 MISSION ★ BUILD IN PUBLIC ★ JIET GROUP OF INSTITUTIONS, JODHPUR ★ OCT 1-2 2026 ★ ';
  ctx.fillText(microText.repeat(3), marginInner + 40, marginInner - 5);
  ctx.fillText(microText.repeat(3), marginInner + 40, height - marginInner + 12);
  ctx.restore();

  // 4. Header: Crest & Insignia with Official Event Emblem
  drawInsignia(ctx, width / 2, 195, isDark, eventImg);

  // Institution title: JIET GROUP OF INSTITUTIONS, JODHPUR
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? '#F1F5F9' : '#0F172A';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('JIET GROUP OF INSTITUTIONS, JODHPUR', width / 2, 275);

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('POWERED BY KAPIL · CO-POWERED BY JIET UNIVERSE', width / 2, 308);

  // Horizontal divider with star
  drawDivider(ctx, width / 2, 338, 540, outerBorderGrad);

  // 5. Certificate Main Title: CERTIFICATE OF APPRECIATION
  ctx.save();
  const titleGrad = ctx.createLinearGradient(width / 2 - 400, 390, width / 2 + 400, 450);
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
  ctx.letterSpacing = '6px';
  ctx.fillText('CERTIFICATE OF APPRECIATION', width / 2, 420);

  ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
  ctx.font = '700 18px "Cinzel", serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('HONORING INNOVATION, EXCELLENCE & DEDICATION', width / 2, 460);
  ctx.restore();

  // 6. Hackathon Badge Banner
  const badgeY = 505;
  const badgeW = 1000;
  const badgeH = 48;
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(241, 245, 249, 0.95)';
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
    badgeY + 30
  );
  ctx.restore();

  // 7. Presentation Subtitle
  ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
  ctx.font = 'italic 25px "Playfair Display", serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('This certificate of appreciation is proudly presented to', width / 2, 615);

  // 8. Recipient Name (Centerpiece with dynamic auto-scaling)
  ctx.save();
  const rawDisplayName = participant.name.toUpperCase();
  let nameFontSize = 74;
  ctx.font = `700 ${nameFontSize}px "Cinzel", serif`;
  ctx.letterSpacing = '3px';
  let nameWidth = ctx.measureText(rawDisplayName).width;
  const maxAllowedWidth = 2100;
  if (nameWidth > maxAllowedWidth) {
    nameFontSize = Math.floor(nameFontSize * (maxAllowedWidth / nameWidth));
    ctx.font = `700 ${nameFontSize}px "Cinzel", serif`;
    nameWidth = ctx.measureText(rawDisplayName).width;
  }

  const nameGrad = ctx.createLinearGradient(width / 2 - 400, 670, width / 2 + 400, 770);
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
  const nameY = 725;
  ctx.fillText(rawDisplayName, width / 2, nameY);
  ctx.restore();

  // Golden underline ribbon under name
  const underW = Math.min(2100, Math.max(550, nameWidth + 120));
  drawNameUnderline(ctx, width / 2, nameY + 28, underW, outerBorderGrad);

  // 9. Citation & Honor Paragraph
  ctx.save();
  ctx.fillStyle = isDark ? '#CBD5E1' : '#334155';
  ctx.font = '400 23px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.5px';
  
  const textLine1 =
    'For exhibiting indomitable tenacity, breakthrough engineering execution, and creative mastery';
  const textLine2 =
    'during the high-intensity 12-Hour Non-Stop Hackathon conducted from October 1 to October 2, 2026.';
  const textLine3 =
    'Recognized among the exclusive cohort of 56 minds united in one mission to Build in Public at JIET Group of Institutions, Jodhpur.';
  
  ctx.fillText(textLine1, width / 2, 825);
  ctx.fillText(textLine2, width / 2, 865);
  ctx.fillText(textLine3, width / 2, 905);
  ctx.restore();

  // 10. Cohort & Track Tagline
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('COHORT: 56 MINDS ELITE SPRINT  ·  STATUS: OFFICIALLY APPRECIATED & VERIFIED', width / 2, 970);

  // 11. Bottom Section:
  // - Left: High-Density Scannable QR Code Box (w=540, h=440)
  // - Center: Official 3D Embossed Gold Seal Medallion (cx=1400, cy=1400)
  // - Right: Digital Authentication Block (w=540, h=440)
  const bottomY = 1180;
  const boxW = 540;
  const boxH = 440;

  // Generate and draw high-density QR Code
  try {
    const qrDataUrl = await createQRCodeDataUrl(verificationUrl);
    if (qrDataUrl) {
      await drawQRSection(ctx, 210, bottomY, boxW, boxH, qrDataUrl, participant, isDark, outerBorderGrad);
    }
  } catch (e) {
    console.error('Error drawing QR code', e);
  }

  // Draw Official Gold Seal in the Center with Official Event Key Visual
  drawOfficialGoldMedalSeal(ctx, width / 2, bottomY + 180, isDark, eventImg);

  // Digital Authentication Box on the Right (No signatures requested)
  const rightBoxX = width - marginInner - boxW - 58;
  drawDigitalAuthenticationBlock(ctx, rightBoxX, bottomY, boxW, boxH, participant, isDark, outerBorderGrad);

  // 12. Bottom Security Meta Footer
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.7)' : 'rgba(100, 116, 139, 0.8)';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'left';
  ctx.fillText(
    `CREDENTIAL: ${participant.certificateNumber}  |  HASH: ${participant.verificationHash}  |  ISSUED: ${participant.issuedDate.toUpperCase()}`,
    marginInner + 40,
    height - marginInner - 22
  );

  ctx.textAlign = 'right';
  ctx.fillText(
    `BLOCK-VERIFIED AUTHENTICITY  •  JIET GROUP OF INSTITUTIONS, JODHPUR`,
    width - marginInner - 40,
    height - marginInner - 22
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

function drawInsignia(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  isDark: boolean,
  eventImg?: HTMLImageElement | null
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Laurel branches left and right
  drawLaurelBranch(ctx, -56, 4, -1);
  drawLaurelBranch(ctx, 56, 4, 1);

  // Outer circular gold medallion frame (radius 50)
  const outerR = 50;
  const crestGrad = ctx.createLinearGradient(-outerR, -outerR, outerR, outerR);
  crestGrad.addColorStop(0, '#FFE89E');
  crestGrad.addColorStop(0.3, '#F59E0B');
  crestGrad.addColorStop(0.7, '#D4AF37');
  crestGrad.addColorStop(1, '#8C6718');

  ctx.beginPath();
  ctx.arc(0, 0, outerR, 0, Math.PI * 2);
  ctx.fillStyle = crestGrad;
  ctx.fill();
  ctx.strokeStyle = isDark ? '#FFF2C6' : '#6A4A0A';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(0, 0, outerR - 4, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#090D16' : '#1E293B';
  ctx.fill();

  // Draw event image inside circular badge
  if (eventImg && eventImg.complete && eventImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, outerR - 5, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(eventImg, -(outerR - 5), -(outerR - 5), (outerR - 5) * 2, (outerR - 5) * 2);
    ctx.restore();

    // Subtle inner gold rim
    ctx.beginPath();
    ctx.arc(0, 0, outerR - 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else {
    // Fallback gold star
    drawStar(ctx, 0, 0, 5, 20, 10, '#FCD34D');
  }

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
  boxW: number,
  boxH: number,
  qrDataUrl: string,
  participant: Participant,
  isDark: boolean,
  borderGrad: CanvasGradient | string
) {
  // Background panel for QR Code
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.98)';
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, boxW, boxH, 14);
  ctx.fill();
  ctx.stroke();

  // Load and draw QR image
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = qrDataUrl;
  });

  // Large, ultra-scannable QR code (240px)
  const qrSize = 230;
  const qrX = x + 24;
  const qrY = y + 42;

  // Solid white backing with clean quiet zone (margin) for 100% optical camera readability
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 8);
  ctx.fill();
  ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

  // Meta details to the right of the QR image
  const textX = qrX + qrSize + 22;
  ctx.textAlign = 'left';

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('POINT CAMERA', textX, y + 60);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
  ctx.font = '700 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('QR VERIFIED', textX, y + 88);

  ctx.fillStyle = isDark ? '#FCD34D' : '#92400E';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText(participant.id, textX, y + 118);

  ctx.fillStyle = '#10B981';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText('✓ RECORD: AUTHENTIC', textX, y + 146);

  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('HASH: ' + participant.verificationHash, textX, y + 174);
  ctx.fillText('HOST: JIET JODHPUR', textX, y + 198);

  ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
  ctx.font = '600 11px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: ISSUED & SEALED', textX, y + 222);

  // Bottom banner inside the box
  ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(133, 94, 18, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 20, y + 300);
  ctx.lineTo(x + boxW - 20, y + 300);
  ctx.stroke();

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '1px';
  ctx.fillText('★ DIRECT MOBILE SMARTPHONE SCAN ★', x + boxW / 2, y + 335);

  ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Open phone camera to view official blockchain-grade verification', x + boxW / 2, y + 368);

  ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('PORTAL: JIET UNIVERSE DIGITAL REGISTRY', x + boxW / 2, y + 398);

  ctx.restore();
}

function drawOfficialGoldMedalSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  isDark: boolean,
  eventImg?: HTMLImageElement | null
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Ribbon tails hanging beneath
  const ribbonGrad = ctx.createLinearGradient(-40, 20, 40, 180);
  ribbonGrad.addColorStop(0, '#B45309');
  ribbonGrad.addColorStop(0.5, '#D97706');
  ribbonGrad.addColorStop(1, '#78350F');

  // Left ribbon
  ctx.fillStyle = ribbonGrad;
  ctx.beginPath();
  ctx.moveTo(-24, 60);
  ctx.lineTo(-60, 200);
  ctx.lineTo(-35, 180);
  ctx.lineTo(-12, 200);
  ctx.lineTo(-6, 70);
  ctx.closePath();
  ctx.fill();

  // Right ribbon
  ctx.beginPath();
  ctx.moveTo(24, 60);
  ctx.lineTo(60, 200);
  ctx.lineTo(35, 180);
  ctx.lineTo(12, 200);
  ctx.lineTo(6, 70);
  ctx.closePath();
  ctx.fill();

  // Outer Starburst / Notched seal ring (magnificent 230px diameter)
  const numNotches = 36;
  const outerR = 115;
  const innerR = 105;
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

  const sealGoldGrad = ctx.createRadialGradient(-25, -25, 15, 0, 0, 120);
  sealGoldGrad.addColorStop(0, '#FFF5D6');
  sealGoldGrad.addColorStop(0.3, '#F59E0B');
  sealGoldGrad.addColorStop(0.7, '#D4AF37');
  sealGoldGrad.addColorStop(1, '#8A6115');
  ctx.fillStyle = sealGoldGrad;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(0, 0, 90, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#78350F' : '#92400E';
  ctx.fill();
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Circular Seal text
  ctx.save();
  ctx.fillStyle = '#FEF3C7';
  ctx.font = '700 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  const sealText = '★ POWERED BY KAPIL ★ CO-POWERED BY JIET UNIVERSE ★ 56 MINDS ★ 2026 ';
  const chars = sealText.split('');
  const arcStep = (Math.PI * 2) / chars.length;
  chars.forEach((char, index) => {
    ctx.save();
    ctx.rotate(index * arcStep);
    ctx.fillText(char, 0, -70);
    ctx.restore();
  });
  ctx.restore();

  // Center crest inside seal: Embed Official Event Key Visual
  if (eventImg && eventImg.complete && eventImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, -6, 52, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(eventImg, -52, -58, 104, 104);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(0, -6, 52, 0, Math.PI * 2);
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#FFFBEB';
    ctx.font = '800 11px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('APPRECIATION', 0, 56);
  } else {
    drawStar(ctx, 0, -12, 5, 28, 13, '#FDE68A');

    ctx.fillStyle = '#FFFBEB';
    ctx.font = '800 14px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('APPRECIATION', 0, 24);

    ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('OFFICIAL SEAL', 0, 42);
  }

  ctx.restore();
}

function drawDigitalAuthenticationBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  boxW: number,
  boxH: number,
  participant: Participant,
  isDark: boolean,
  borderGrad: CanvasGradient | string
) {
  ctx.save();
  ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.98)';
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, boxW, boxH, 14);
  ctx.fill();
  ctx.stroke();

  // Content inside block
  ctx.textAlign = 'center';
  const cx = x + boxW / 2;

  // Star emblem
  drawStar(ctx, cx, y + 42, 5, 15, 7, '#F59E0B');

  ctx.fillStyle = isDark ? '#F59E0B' : '#B45309';
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('DIGITAL ACCREDITATION', cx, y + 80);

  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('NO PHYSICAL SIGNATURE REQUIRED', cx, y + 104);

  // Line divider
  ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(133, 94, 18, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 40, y + 124);
  ctx.lineTo(x + boxW - 40, y + 124);
  ctx.stroke();

  // Convener
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('PRIMARY CONVENER & LEAD', cx, y + 152);

  ctx.fillStyle = isDark ? '#FDE68A' : '#78350F';
  ctx.font = '800 22px "Cinzel", serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('POWERED BY KAPIL', cx, y + 182);

  // Host
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('INSTITUTIONAL HOST', cx, y + 220);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
  ctx.font = '700 18px "Cinzel", serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('CO-POWERED BY JIET UNIVERSE', cx, y + 248);

  ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('JIET GROUP OF INSTITUTIONS, JODHPUR', cx, y + 274);

  // Line divider
  ctx.beginPath();
  ctx.moveTo(x + 40, y + 300);
  ctx.lineTo(x + boxW - 40, y + 300);
  ctx.stroke();

  // Bottom verification stamp note
  ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText('★ CRYPTOGRAPHICALLY AUTHENTICATED ★', cx, y + 335);

  ctx.fillStyle = isDark ? '#E2E8F0' : '#334155';
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Tamper-proof certificate officially sealed into digital registry', cx, y + 368);

  ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
  ctx.font = '500 11px "JetBrains Mono", monospace';
  ctx.fillText('56 MINDS COHORT · OCT 01-02 2026', cx, y + 398);

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
