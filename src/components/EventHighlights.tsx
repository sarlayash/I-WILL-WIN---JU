import React from 'react';
import { Clock, Users, Globe2, ShieldCheck, Award, Sparkles, Building2, Flame } from 'lucide-react';
import { HACKATHON_DETAILS } from '../data/participants';

export const EventHighlights: React.FC = () => {
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
      label: 'JIET Universe',
      value: 'QR Verified',
      desc: 'Powered by Kapil - Multiverse Architect',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Event Details Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL EVENT ARCHIVE</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100">
              I WILL WIN · 12 HOURS HACKATHON
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Conducted at <strong className="text-slate-300">JIET Group Of Universe</strong> · Oct 1 to Oct 2, 2026
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs text-slate-500 font-mono-code uppercase tracking-wider">
              Lead Architect & Convener
            </div>
            <div className="text-sm font-semibold text-amber-300 font-cinzel">
              Kapil - Knowledge Multiverse Architect
            </div>
            <div className="text-xs text-slate-400">Powered by JIET UNIVERSE</div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
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
    </div>
  );
};
