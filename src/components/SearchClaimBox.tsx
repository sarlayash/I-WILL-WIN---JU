import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { Participant, searchParticipantSuggestions, findParticipant } from '../data/participants';

interface SearchClaimBoxProps {
  onSelectParticipant: (participant: Participant) => void;
  selectedParticipant: Participant | null;
  onViewDirectory: () => void;
}

export const SearchClaimBox: React.FC<SearchClaimBoxProps> = ({
  onSelectParticipant,
  selectedParticipant,
  onViewDirectory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Participant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedParticipant) {
      setSearchTerm(selectedParticipant.name);
      setErrorMsg(null);
    }
  }, [selectedParticipant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setErrorMsg(null);

    if (val.trim().length >= 2) {
      const results = searchParticipantSuggestions(val);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSearched(true);

    if (!searchTerm.trim()) {
      setErrorMsg('Please enter your full name as registered in the hackathon.');
      return;
    }

    const match = findParticipant(searchTerm);
    if (match) {
      setErrorMsg(null);
      setSuggestions([]);
      onSelectParticipant(match);
    } else {
      setErrorMsg(
        `"${searchTerm}" is not found in the verified 56 Minds roster. Only authorized learners registered for the Oct 1-2, 2026 hackathon at JIET Universe are eligible to issue certificates.`
      );
    }
  };

  const handleSelectSuggestion = (p: Participant) => {
    setSearchTerm(p.name);
    setSuggestions([]);
    setErrorMsg(null);
    onSelectParticipant(p);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sampleNames = ["Keshav Gaur", "Nikhil Sharma", "Khilesh", "Riddhi Gandhi", "Komal Sayal"];

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/5">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-3 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVE COHORT AUTHENTICATION · 56 MINDS ONLY</span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-wide text-slate-100 mb-3">
            Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Certificate of Appreciation</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Enter your registered learner name below to verify your credential and download your
            high-resolution certificate in <strong className="text-slate-200">PNG</strong> and <strong className="text-slate-200">PDF</strong> format with embedded QR verification.
          </p>
        </div>

        {/* Input & Form */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1" ref={dropdownRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5 text-amber-400/70" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchTerm.trim().length >= 2) {
                    setSuggestions(searchParticipantSuggestions(searchTerm));
                  }
                }}
                placeholder="Enter learner name (e.g. Keshav Gaur, Nikhil Sharma...)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/90 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-slate-100 placeholder:text-slate-500 text-base font-medium outline-none transition-all shadow-inner"
              />

              {/* Autocomplete Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-amber-500/30 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
                  <div className="px-3 py-2 text-[11px] font-mono-code text-slate-400 bg-slate-950/80 flex items-center justify-between">
                    <span>MATCHING REGISTERED MINDS</span>
                    <span className="text-amber-400 font-semibold">{suggestions.length} FOUND</span>
                  </div>
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full px-4 py-3 text-left hover:bg-amber-500/10 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-cinzel text-xs font-bold">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 font-mono-code">
                            ID: {item.id} · Issued Oct 02, 2026
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-amber-400 flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                        Select <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap"
            >
              <UserCheck className="w-5 h-5 text-slate-950" />
              <span>Verify & Issue</span>
            </button>
          </div>

          {/* Quick Select Chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="text-slate-500 font-mono-code">Quick Select:</span>
            {sampleNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  const p = findParticipant(name);
                  if (p) handleSelectSuggestion(p);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-slate-700/60 transition-all cursor-pointer"
              >
                {name}
              </button>
            ))}
            <button
              type="button"
              onClick={onViewDirectory}
              className="text-amber-400 hover:text-amber-300 underline font-medium ml-auto"
            >
              Browse all 56 participants →
            </button>
          </div>
        </form>

        {/* Whitelist Denied Warning Box */}
        {errorMsg && (
          <div className="mt-6 max-w-2xl mx-auto p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3.5 text-sm text-red-200 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block text-red-300 font-semibold mb-1">
                Access Restricted: Name Not Authorized
              </strong>
              <p className="text-xs sm:text-sm text-red-300/90 leading-relaxed mb-3">
                {errorMsg}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={onViewDirectory}
                  className="text-xs bg-red-900/60 hover:bg-red-800/80 text-white font-medium px-3 py-1.5 rounded-lg border border-red-500/40 transition-colors"
                >
                  View Authorized 56 Minds Roster
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Participant Status Pill */}
        {selectedParticipant && !errorMsg && (
          <div className="mt-6 max-w-2xl mx-auto p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 text-sm text-emerald-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-emerald-300">
                  {selectedParticipant.name}
                </span>{' '}
                <span className="text-xs text-emerald-400/80 font-mono-code">
                  ({selectedParticipant.id})
                </span>
                <div className="text-xs text-emerald-300/70">
                  Verified Builder · Hackathon Completer · Oct 01-02, 2026
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-code bg-emerald-900/60 px-2.5 py-1 rounded border border-emerald-500/30 text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CERTIFIED READY</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
