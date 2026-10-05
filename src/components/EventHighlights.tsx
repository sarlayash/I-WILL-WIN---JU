import React, { useState } from 'react';
import { Clock, Users, Globe2, ShieldCheck, Flame, Sparkles, Maximize2, X, Trophy, MapPin, Cpu } from 'lucide-react';
import { HACKATHON_DETAILS } from '../data/participants';
import { EVENT_IMAGE_DATA_URL } from '../assets/eventImage';

export const EventHighlights: React.FC = () => {
  const [showPosterModal, setShowPosterModal] = useState(false);

  const stats = [
    {
      icon: Clock,
      label: '12 Hours Sprint',
      value: 'Non-Stop Build',
      desc: 'Rapid idea-to-ship execution marathon',
    },
    {
      icon: Users,
      label: '56 Minds',
      value: '1 Mission',
      desc: 'Selected elite builders and innovators',
    },
    {
      icon: Globe2,
      label: 'Build In Public',
      value: 'Oct 1–2, 2026',
      desc: 'Transparent progress and real-time shipping',
    },
    {
      icon: ShieldCheck,
      label: 'QR Verified',
      value: 'Authentic Record',
      desc: 'Powered By Kapil Co-Powered By JIET Universe',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 space-y-8">
      
      {/* Featured Official Event Showcase Banner */}
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl shadow-amber-500/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Official Event Artwork Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              onClick={() => setShowPosterModal(true)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20 bg-slate-950 transition-all duration-300 hover:scale-[1.02] hover:border-amber-400 max-w-md w-full"
            >
              <img
                src="./JIE_JU_IMAGE.png"
                onError={(e) => {
                  e.currentTarget.src = EVENT_IMAGE_DATA_URL;
                }}
                alt="JIET Universe · 12 Hours 56 Minds 1 Mission · HackWithInfy"
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between">
                <span className="text-xs font-mono-code text-amber-300 font-semibold flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  CLICK TO VIEW FULL RESOLUTION
                </span>
                <span className="text-[10px] text-slate-300 font-mono-code bg-black/60 px-2 py-0.5 rounded">
                  OFFICIAL KEY VISUAL
                </span>
              </div>

              {/* Gold Corner Badge */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-400/50 px-2.5 py-1 rounded-full text-[10px] font-mono-code text-amber-300 font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>OFFICIAL EVENT VISUAL</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-400 font-mono-code text-center mt-3">
              ★ Official Artwork Sealed into Certificate & Registry Ledger
            </p>
          </div>

          {/* Right: Event Synopsis & Credential Accreditation */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-2 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>JIET UNIVERSE · 12 HOURS HACKATHON SPECIAL EDITION</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
                &lt; DSA &gt; HackWithInfy
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-xl sm:text-2xl mt-1 font-semibold italic">
                  Unfiltered With Kapil
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                An intense, non-stop hackathon sprint bringing together an exclusive cohort of <strong>56 minds</strong> on a single mission to engineer, build, and ship breakthrough algorithmic solutions in public at <strong>JIET Group of Institutions, Jodhpur</strong>.
              </p>
            </div>

            {/* Event Key Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  VENUE & LAB
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1">LT 10</div>
                <div className="text-[11px] text-slate-400">JIET Jodhpur</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  DEPARTMENT
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1">AIML F</div>
                <div className="text-[11px] text-slate-400">Specialized Track</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  PARTNER
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1">FacePrep</div>
                <div className="text-[11px] text-slate-400">Powered Partner</div>
              </div>
            </div>

            {/* Institutional Credentials Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">
                  PRIMARY LEAD & CONVENER
                </div>
                <div className="text-base font-bold text-amber-300 font-cinzel">
                  Powered By Kapil
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">
                  INSTITUTIONAL HOST
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Co-Powered By JIET Universe
                </div>
                <div className="text-xs text-slate-400">JIET Group of Institutions, Jodhpur</div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider">
                    {s.label}
                  </div>
                  <div className="font-semibold text-slate-200 text-sm mt-0.5">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Poster Fullscreen Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-slate-950 rounded-2xl border-2 border-amber-500/50 p-4 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-3">
              <h4 className="font-cinzel text-lg font-bold text-amber-300">
                Official Hackathon Event Visual
              </h4>
              <p className="text-xs font-mono-code text-slate-400">
                JIET Universe · 12 Hours · 56 Minds · 1 Mission
              </p>
            </div>
            <img
              src="./JIE_JU_IMAGE.png"
              onError={(e) => {
                e.currentTarget.src = EVENT_IMAGE_DATA_URL;
              }}
              alt="Official Hackathon Poster"
              className="w-full max-h-[75vh] object-contain rounded-xl border border-slate-800"
              referrerPolicy="no-referrer"
            />
            <div className="text-[11px] text-slate-400 font-mono-code text-center mt-3">
              LT 10 · AIML F · Powered By FacePrep · Oct 1–2, 2026
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
