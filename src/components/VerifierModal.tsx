import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Search, ExternalLink, Hash, Calendar, MapPin, Award, User, Users, Sparkles } from 'lucide-react';
import { Participant, getParticipantById, HACKATHON_DETAILS, PARTICIPANTS } from '../data/participants';

interface VerifierModalProps {
  initialId?: string;
  onSelectParticipant: (p: Participant) => void;
  onClose?: () => void;
}

export const VerifierModal: React.FC<VerifierModalProps> = ({
  initialId = '',
  onSelectParticipant,
  onClose,
}) => {
  const [lookupId, setLookupId] = useState(initialId);
  const [verifiedRecord, setVerifiedRecord] = useState<Participant | null>(null);
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    if (initialId) {
      const rec = getParticipantById(initialId);
      setVerifiedRecord(rec);
      setHasQueried(true);
      setLookupId(initialId);
    }
  }, [initialId]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setHasQueried(true);
    const rec = getParticipantById(lookupId);
    setVerifiedRecord(rec);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="rounded-2xl bg-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-emerald-400 mb-3 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AUTHENTICITY LEDGER & QR VERIFIER</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
            Verify Certificate Authenticity
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Scan the QR code or enter the Certificate ID below to inspect official credentials issued by JIET Universe.
          </p>
        </div>

        {/* Lookup form */}
        <form onSubmit={handleLookup} className="max-w-xl mx-auto flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              placeholder="e.g. IWW-2026-JIET-001 or CERT-IWW-2026-JIET-001"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-mono-code text-slate-100 placeholder:text-slate-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-sm transition-all cursor-pointer"
          >
            Verify
          </button>
        </form>

        {/* Result Record */}
        {hasQueried && verifiedRecord && (
          <div className="max-w-2xl mx-auto rounded-2xl bg-slate-950 border border-emerald-500/50 p-6 relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 bg-emerald-500/20 border-b border-l border-emerald-500/40 px-4 py-1.5 text-xs font-mono-code text-emerald-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>OFFICIALLY VERIFIED</span>
            </div>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-cinzel text-xl font-bold">
                {verifiedRecord.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100">
                  {verifiedRecord.name}
                </h3>
                <div className="text-xs font-mono-code text-amber-400/90">
                  CREDENTIAL ID: {verifiedRecord.id}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-6">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">EVENT</div>
                  <div className="font-semibold text-slate-200">I WILL WIN - 12H HACKATHON</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">COHORT</div>
                  <div className="font-semibold text-slate-200">56 Minds | 1 Mission | Build In Public</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">DATE CONDUCTED</div>
                  <div className="font-semibold text-slate-200">Oct 01 to Oct 02, 2026</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">VENUE</div>
                  <div className="font-semibold text-slate-200">JIET Group of Institutions, Jodhpur</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300 sm:col-span-2">
                <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">ACCREDITATION & ORGANIZERS</div>
                  <div className="font-semibold text-slate-200">
                    Powered By Kapil · Co-Powered By JIET Universe
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300 sm:col-span-2 pt-2 border-t border-slate-800">
                <Hash className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">CRYPTOGRAPHIC VERIFICATION HASH</div>
                  <div className="font-semibold text-emerald-400">{verifiedRecord.verificationHash}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-mono-code">
                ISSUED IN RECOGNITION OF HACKATHON COMPLETION
              </span>
              <button
                onClick={() => onSelectParticipant(verifiedRecord)}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-semibold text-xs rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                View & Download Certificate →
              </button>
            </div>
          </div>
        )}

        {hasQueried && !verifiedRecord && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-center text-red-200 text-sm">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <strong className="block text-red-300 mb-1">Record Not Found</strong>
            <p className="text-xs text-red-300/80">
              No matching certificate found for ID "{lookupId}". Please check the ID or verify against the official 56 Minds roster.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
