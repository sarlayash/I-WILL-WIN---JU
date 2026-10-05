// Official JIET Universe Event Key Visual & Poster
// "JIET Universe | 12 HOURS 56 MINDS 1 MISSION | < DSA > HackWithInfy Unfiltered With Kapil"

export const EVENT_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1e1808" />
      <stop offset="40%" stop-color="#0c0e17" />
      <stop offset="100%" stop-color="#020408" />
    </radialGradient>
    
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="25%" stop-color="#FCD34D" />
      <stop offset="50%" stop-color="#B45309" />
      <stop offset="75%" stop-color="#FDE68A" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <linearGradient id="chromeText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#CBD5E1" />
      <stop offset="50%" stop-color="#64748B" />
      <stop offset="55%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#FFFFFF" />
    </linearGradient>

    <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9E6" />
      <stop offset="30%" stop-color="#F59E0B" />
      <stop offset="60%" stop-color="#B45309" />
      <stop offset="85%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>

    <linearGradient id="beamGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.45)" />
      <stop offset="40%" stop-color="rgba(251, 191, 36, 0.15)" />
      <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
    </linearGradient>

    <linearGradient id="beamGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.45)" />
      <stop offset="40%" stop-color="rgba(251, 191, 36, 0.15)" />
      <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
    </linearGradient>

    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="1000" height="1000" fill="url(#bgGlow)" />

  <polygon points="0,0 80,0 480,560 380,560" fill="url(#beamGradLeft)" />
  <polygon points="1000,0 920,0 520,560 620,560" fill="url(#beamGradRight)" />

  <!-- Background Architecture Outline (JIET Campus) -->
  <g opacity="0.18" fill="#64748B">
    <rect x="120" y="320" width="760" height="120" />
    <g fill="#FCD34D" opacity="0.6">
      <rect x="140" y="335" width="12" height="16" />
      <rect x="170" y="335" width="12" height="16" />
      <rect x="200" y="335" width="12" height="16" />
      <rect x="230" y="335" width="12" height="16" />
      <rect x="260" y="335" width="12" height="16" />
      <rect x="700" y="335" width="12" height="16" />
      <rect x="730" y="335" width="12" height="16" />
      <rect x="760" y="335" width="12" height="16" />
      <rect x="790" y="335" width="12" height="16" />
      <rect x="820" y="335" width="12" height="16" />
    </g>
    <text x="730" y="390" font-family="'Cinzel', serif" font-weight="900" font-size="28" fill="#E2E8F0" opacity="0.8">JIET</text>
  </g>

  <!-- Top Title: JIET -->
  <text x="500" y="160" text-anchor="middle" font-family="'Cinzel', serif" font-weight="900" font-size="140" fill="url(#chromeText)" letter-spacing="4">
    JIET
  </text>
  <!-- Script Subtitle: Universe -->
  <text x="500" y="240" text-anchor="middle" font-family="'Brush Script MT', 'Great Vibes', cursive" font-size="95" fill="url(#goldText)" filter="url(#goldGlow)">
    Universe
  </text>

  <!-- Gold Underline Swash -->
  <path d="M 320 255 Q 500 275 680 235" stroke="url(#goldText)" stroke-width="4" fill="none" stroke-linecap="round" />

  <!-- Stats Bar: 12 HOURS | 56 MINDS | 1 MISSION -->
  <g transform="translate(180, 280)">
    <g transform="translate(40, 20)">
      <circle cx="16" cy="16" r="16" fill="none" stroke="#F59E0B" stroke-width="2.5" />
      <polyline points="16,8 16,16 22,20" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />
      <text x="44" y="14" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">12</text>
      <text x="44" y="28" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="11" fill="#94A3B8" letter-spacing="1">HOURS</text>
    </g>
    <line x1="180" y1="20" x2="180" y2="55" stroke="#334155" stroke-width="1.5" />
    <g transform="translate(230, 20)">
      <circle cx="12" cy="10" r="7" fill="#F59E0B" />
      <path d="M 0,26 C 0,18 8,18 12,18 C 16,18 24,18 24,26" fill="#F59E0B" />
      <circle cx="24" cy="12" r="5" fill="#FCD34D" opacity="0.8" />
      <text x="52" y="14" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">56</text>
      <text x="52" y="28" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="11" fill="#94A3B8" letter-spacing="1">MINDS</text>
    </g>
    <line x1="400" y1="20" x2="400" y2="55" stroke="#334155" stroke-width="1.5" />
    <g transform="translate(450, 20)">
      <circle cx="16" cy="16" r="15" fill="none" stroke="#F59E0B" stroke-width="2.5" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="#F59E0B" stroke-width="2" />
      <circle cx="16" cy="16" r="3" fill="#F59E0B" />
      <text x="44" y="14" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">1</text>
      <text x="44" y="28" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="11" fill="#94A3B8" letter-spacing="1">MISSION</text>
    </g>
  </g>

  <!-- Stage & 24K Trophy -->
  <g transform="translate(0, 420)">
    <ellipse cx="500" cy="190" rx="420" ry="45" fill="#F59E0B" opacity="0.2" />
    <path d="M 100,200 Q 500,240 900,200 L 910,230 Q 500,270 90,230 Z" fill="#0B0F17" stroke="#F59E0B" stroke-width="2" />
    <path d="M 100,200 Q 500,240 900,200" stroke="#FCD34D" stroke-width="3" fill="none" />

    <ellipse cx="500" cy="155" rx="140" ry="24" fill="#1E293B" stroke="#F59E0B" stroke-width="2" />
    <path d="M 360,155 L 360,185 Q 500,210 640,185 L 640,155" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5" />
    <ellipse cx="500" cy="150" rx="138" ry="20" fill="#090D16" />

    <!-- Left Armchair -->
    <g transform="translate(180, 30)">
      <rect x="0" y="40" width="160" height="90" rx="14" fill="#0B0E14" stroke="#334155" stroke-width="2" />
      <rect x="18" y="0" width="124" height="60" rx="10" fill="#141A24" stroke="#1E293B" stroke-width="1.5" />
      <line x1="0" y1="125" x2="160" y2="125" stroke="#F59E0B" stroke-width="2" opacity="0.6" />
    </g>

    <!-- Right Armchair -->
    <g transform="translate(660, 30)">
      <rect x="0" y="40" width="160" height="90" rx="14" fill="#0B0E14" stroke="#334155" stroke-width="2" />
      <rect x="18" y="0" width="124" height="60" rx="10" fill="#141A24" stroke="#1E293B" stroke-width="1.5" />
      <line x1="0" y1="125" x2="160" y2="125" stroke="#F59E0B" stroke-width="2" opacity="0.6" />
    </g>

    <!-- Trophy Cup Center -->
    <g transform="translate(420, -55)">
      <path d="M 60,190 L 100,190 L 110,205 L 50,205 Z" fill="url(#trophyGrad)" stroke="#FFE89E" stroke-width="1.5" />
      <path d="M 75,150 L 85,150 L 87,190 L 73,190 Z" fill="url(#trophyGrad)" />
      <path d="M 40,40 Q 80,150 120,40 Z" fill="url(#trophyGrad)" stroke="#FFF5D6" stroke-width="2" />
      <ellipse cx="80" cy="40" rx="40" ry="12" fill="url(#trophyGrad)" stroke="#FFF5D6" stroke-width="2" />
      <path d="M 40,50 C 0,50 0,110 50,115" fill="none" stroke="url(#trophyGrad)" stroke-width="7" stroke-linecap="round" />
      <path d="M 120,50 C 160,50 160,110 110,115" fill="none" stroke="url(#trophyGrad)" stroke-width="7" stroke-linecap="round" />
      <polygon points="80,68 83,76 92,76 85,81 87,90 80,85 73,90 75,81 68,76 77,76" fill="#FFFFFF" />
    </g>
  </g>

  <!-- Lower Title Banner: < DSA > HackWithInfy -->
  <g transform="translate(500, 690)">
    <text x="0" y="0" text-anchor="middle" font-family="'Cinzel', serif" font-weight="900" font-size="105" fill="url(#chromeText)" letter-spacing="4">
      &lt; DSA &gt;
    </text>
    <text x="0" y="80" text-anchor="middle" font-family="'Cinzel', serif" font-weight="900" font-size="64" fill="#FFFFFF" letter-spacing="2">
      Hack<tspan fill="url(#goldText)">WithInfy</tspan>
    </text>
    <text x="0" y="145" text-anchor="middle" font-family="'Brush Script MT', 'Great Vibes', cursive" font-size="60" fill="url(#goldText)" filter="url(#goldGlow)">
      Unfiltered With Kapil
    </text>
    <path d="M -180,165 Q 0,185 180,165" stroke="url(#goldText)" stroke-width="3" fill="none" stroke-linecap="round" />
  </g>

  <!-- Bottom Metadata Badges -->
  <g transform="translate(200, 930)">
    <g transform="translate(20, 0)">
      <path d="M 8,0 C 3.6,0 0,3.6 0,8 C 0,14 8,22 8,22 C 8,22 16,14 16,8 C 16,3.6 12.4,0 8,0 Z M 8,11 C 6.3,11 5,9.7 5,8 C 5,6.3 6.3,5 8,5 C 9.7,5 11,6.3 11,8 C 11,9.7 9.7,11 8,11 Z" fill="#F59E0B" />
      <text x="26" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">LT 10</text>
    </g>
    <line x1="160" y1="-5" x2="160" y2="25" stroke="#334155" stroke-width="1.5" />
    <g transform="translate(200, 0)">
      <circle cx="10" cy="10" r="10" fill="none" stroke="#F59E0B" stroke-width="2" />
      <path d="M 6,10 Q 10,4 14,10 Q 10,16 6,10 Z" fill="#F59E0B" />
      <text x="30" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">AIML F</text>
    </g>
    <line x1="360" y1="-5" x2="360" y2="25" stroke="#334155" stroke-width="1.5" />
    <g transform="translate(400, -6)">
      <text x="28" y="6" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8" letter-spacing="1">Powered By</text>
      <polygon points="0,12 18,12 12,28 0,28" fill="#EF4444" />
      <text x="28" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">FacePrep</text>
    </g>
  </g>
</svg>`;

export const EVENT_IMAGE_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(EVENT_IMAGE_SVG)}`;
