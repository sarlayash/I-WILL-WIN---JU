import React, { useState } from 'react';
import { Search, Award, CheckCircle2, Shield, Users, ArrowUpRight } from 'lucide-react';
import { PARTICIPANTS, Participant, HACKATHON_DETAILS } from '../data/participants';

interface CohortDirectoryProps {
  onSelectParticipant: (participant: Participant) => void;
}

export const CohortDirectory: React.FC<CohortDirectoryProps> = ({ onSelectParticipant }) => {
  const [filter, setFilter] = useState('');

  const filtered = PARTICIPANTS.filter((p) => {
    const q = filter.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/20 p-6 sm:p-8 mb-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-3 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
          <Users className="w-3.5 h-3.5" />
          <span>OFFICIAL PARTICIPANT ROSTER · 56 MINDS</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          The 56 Minds Cohort
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          These are the authorized 56 builders who participated in the 12-Hour Non-Stop Hackathon on October 1–2, 2026. Powered By Kapil Co-Powered By JIET Universe.
        </p>

        {/* Filter bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search cohort by name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Grid of 56 Minds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelectParticipant(item)}
            className="group relative rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono-code text-amber-400/90 bg-amber-950/60 border border-amber-500/20 px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono-code">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ELIGIBLE</span>
                </span>
              </div>

              <div className="font-semibold text-slate-100 group-hover:text-amber-300 text-base transition-colors">
                {item.name}
              </div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                {item.achievement}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono-code text-[11px]">
                Oct 02, 2026
              </span>
              <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Issue <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-sm">No participant found matching "{filter}".</p>
          <button
            onClick={() => setFilter('')}
            className="mt-2 text-xs text-amber-400 underline font-medium"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
};
