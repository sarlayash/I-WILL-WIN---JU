import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchClaimBox } from './components/SearchClaimBox';
import { CertificateViewer } from './components/CertificateViewer';
import { CohortDirectory } from './components/CohortDirectory';
import { VerifierModal } from './components/VerifierModal';
import { EventHighlights } from './components/EventHighlights';
import { PARTICIPANTS, Participant, getParticipantById, findParticipant, HACKATHON_DETAILS } from './data/participants';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'claim' | 'directory' | 'verify'>('claim');
  // Default to first participant (Keshav Gaur) so the certificate is immediately visible as an example
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(PARTICIPANTS[0]);
  const [urlVerifyId, setUrlVerifyId] = useState<string>('');

  // Handle URL query parameters (?verify=ID or ?name=Name)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const verifyParam = params.get('verify') || params.get('id');
      const nameParam = params.get('name');

      if (verifyParam) {
        setUrlVerifyId(verifyParam);
        const match = getParticipantById(verifyParam);
        if (match) {
          setSelectedParticipant(match);
          setActiveTab('claim');
        } else {
          setActiveTab('verify');
        }
      } else if (nameParam) {
        const match = findParticipant(nameParam);
        if (match) {
          setSelectedParticipant(match);
          setActiveTab('claim');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelectParticipant = (p: Participant) => {
    setSelectedParticipant(p);
    setActiveTab('claim');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 py-1.5 px-4 text-center text-[11px] sm:text-xs font-semibold text-slate-950 tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>OFFICIAL VERIFICATION PORTAL · I WILL WIN | 12 HOURS HACKATHON | 56 MINDS | 1 MISSION | BUILD IN PUBLIC</span>
        <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedParticipantName={selectedParticipant?.name}
      />

      {/* Main Content Areas based on activeTab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {activeTab === 'claim' && (
          <div className="space-y-6">
            {/* Search and Whitelist Verification Input */}
            <SearchClaimBox
              onSelectParticipant={handleSelectParticipant}
              selectedParticipant={selectedParticipant}
              onViewDirectory={() => setActiveTab('directory')}
            />

            {/* Elite Certificate Viewer (PNG/PDF downloads, themes, QR code) */}
            {selectedParticipant && (
              <CertificateViewer
                participant={selectedParticipant}
                onOpenVerifier={() => {
                  setUrlVerifyId(selectedParticipant.id);
                  setActiveTab('verify');
                }}
              />
            )}

            {/* Event Highlights & Institutional Backing */}
            <EventHighlights />
          </div>
        )}

        {activeTab === 'directory' && (
          <CohortDirectory onSelectParticipant={handleSelectParticipant} />
        )}

        {activeTab === 'verify' && (
          <VerifierModal
            initialId={urlVerifyId || selectedParticipant?.id || ''}
            onSelectParticipant={handleSelectParticipant}
            onClose={() => setActiveTab('claim')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400 font-cinzel text-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>I WILL WIN · 12 HOURS HACKATHON · 56 MINDS · 1 MISSION</span>
          </div>
          <p className="text-slate-400">
            Conducted on October 1–2, 2026 at <span className="text-slate-300">JIET Group of Institutions, Jodhpur</span> · <span className="text-amber-300 font-semibold">Powered By Kapil</span> · <span className="text-slate-300">Co-Powered By JIET Universe</span>.
          </p>
          <div className="text-[11px] font-mono-code text-slate-500 pt-2 flex items-center justify-center gap-3 flex-wrap">
            <span>STRICT 56 MINDS WHITELIST</span>
            <span>·</span>
            <span>TAMPER-PROOF QR ENCRYPTION</span>
            <span>·</span>
            <span>HIGH-DPI PNG & PDF DOWNLOAD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
