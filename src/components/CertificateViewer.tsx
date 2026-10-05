import React, { useEffect, useRef, useState } from 'react';
import { Download, FileText, Share2, Copy, Check, Eye, Palette, Sparkles, ShieldCheck, Printer } from 'lucide-react';
import { Participant, HACKATHON_DETAILS } from '../data/participants';
import {
  renderCertificateToCanvas,
  downloadPNGFromCanvas,
  downloadPDFFromCanvas,
  CertificateTheme,
  THEMES,
} from '../utils/certificateGenerator';
import confetti from 'canvas-confetti';

interface CertificateViewerProps {
  participant: Participant;
  onOpenVerifier: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  participant,
  onOpenVerifier,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTheme, setSelectedTheme] = useState<CertificateTheme>('obsidian-gold');
  const [isGenerating, setIsGenerating] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const verificationUrl = `${window.location.origin}${window.location.pathname}?verify=${participant.id}`;

  // Confetti on mount/participant change
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FCD34D', '#D97706', '#FFFFFF', '#60A5FA'],
      });
    } catch (e) {
      // ignore
    }
  }, [participant.id]);

  // Re-render canvas whenever participant or theme changes
  useEffect(() => {
    let isCancelled = false;
    setIsGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Small delay to allow fonts to be ready
    const timer = setTimeout(() => {
      renderCertificateToCanvas(canvas, participant, selectedTheme, verificationUrl)
        .then(() => {
          if (!isCancelled) setIsGenerating(false);
        })
        .catch((err) => {
          console.error(err);
          if (!isCancelled) setIsGenerating(false);
        });
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [participant, selectedTheme, verificationUrl]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const filename = `Certificate_${participant.name.replace(/\s+/g, '_')}_I_WILL_WIN_2026`;
    downloadPNGFromCanvas(canvasRef.current, filename);
    setDownloadSuccess('PNG Certificate downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadPDF = () => {
    if (!canvasRef.current) return;
    const filename = `Certificate_${participant.name.replace(/\s+/g, '_')}_I_WILL_WIN_2026`;
    downloadPDFFromCanvas(canvasRef.current, filename);
    setDownloadSuccess('PDF Certificate downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const text = `Honored to receive the Certificate of Appreciation for "I WILL WIN | 12 HOURS HACKATHON" (56 Minds | 1 Mission | Build in Public) at JIET Group of Institutions, Jodhpur, Powered By Kapil Co-Powered By JIET Universe! 🚀 Proud to build & ship in public with 56 visionary minds! #IWillWin #BuildInPublic #Hackathon2026`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      verificationUrl
    )}&summary=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Print Certificate - ${participant.name}</title>
            <style>
              @page { size: landscape; margin: 0; }
              body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      {/* Success Notification Bar */}
      {downloadSuccess && (
        <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-200 text-sm font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-400" />
            <span>{downloadSuccess}</span>
          </div>
          <span className="text-xs font-mono-code text-amber-400">READY</span>
        </div>
      )}

      {/* Control Toolbar */}
      <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Theme Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-code">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>THEME:</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(Object.keys(THEMES) as CertificateTheme[]).map((themeKey) => {
                const t = THEMES[themeKey];
                const active = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setSelectedTheme(themeKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Buttons: PNG & PDF */}
          <div className="flex items-center gap-2.5 flex-wrap w-full lg:w-auto justify-end">
            <button
              onClick={handleDownloadPNG}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download PNG (300 DPI)</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 rounded-xl text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Download PDF (A4)</span>
            </button>

            <button
              onClick={handlePrint}
              title="Print Certificate"
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              title="Copy Verification Link"
              className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-mono-code transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy QR Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareLinkedIn}
              title="Share on LinkedIn"
              className="flex items-center gap-1.5 px-3 py-2.5 bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-medium transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Certificate Canvas Container */}
      <div className="relative rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-3 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
            <span className="text-xs font-mono-code text-amber-300">Rendering Elite 300 DPI Canvas...</span>
          </div>
        )}

        {/* Certificate Canvas Render */}
        <div className="w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-2xl">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block select-none"
            style={{ aspectRatio: '2800 / 1980' }}
          />
        </div>

        {/* Bottom Certificate Verification Ribbon */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="font-mono-code text-slate-300">
              CREDENTIAL ID: <strong className="text-amber-400">{participant.id}</strong>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">HASH: {participant.verificationHash}</span>
          </div>

          <button
            onClick={onOpenVerifier}
            className="text-amber-400 hover:text-amber-300 text-xs font-mono-code flex items-center gap-1 font-medium hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Cryptographic Audit Record →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
