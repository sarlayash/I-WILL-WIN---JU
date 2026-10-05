export interface Participant {
  id: string;
  certificateNumber: string;
  name: string;
  normalizedName: string;
  aliases: string[];
  track: string;
  achievement: string;
  issuedDate: string;
  verificationHash: string;
}

export const HACKATHON_DETAILS = {
  eventName: "I WILL WIN",
  subTitle: "12 HOURS HACKATHON",
  mission: "56 MINDS | 1 MISSION | BUILD IN PUBLIC",
  fullEventTitle: "I WILL WIN | 12 HOURS HACKATHON | 56 MINDS | 1 MISSION | BUILD IN PUBLIC",
  certificateTitle: "CERTIFICATE OF APPRECIATION",
  dates: "Oct 1 to Oct 2, 2026",
  venue: "JIET Group Of Universe",
  poweredBy: "Powered By Kapil Co-Powered By JIET Universe",
  architect: "Kapil",
  institution: "JIET Universe",
  totalMinds: 56,
};

// Raw list of exactly 56 minds from official hackathon records
const RAW_NAMES = [
  "Keshav Gaur",
  "Khilesh",
  "Khushal Acharya",
  "Khushal Khatri",
  "Khushwant Saini",
  "Khwahish Bhati",
  "Kripa Mirchandani",
  "Krish Mathur",
  "Krishna Asopa",
  "Krishna Soni",
  "Krishnapal Singh",
  "Kritesh Singh Chouhan",
  "Kuldeep Khatri",
  "Lakshdeep Singh",
  "Lakshya Narayan Asopa",
  "Lalit Kanwar",
  "Lavanya Gehlot",
  "Lucky Soni",
  "Madhav Khatri",
  "Madhvi Kachhawaha",
  "Mahesh Saran",
  "Mahipal Singh",
  "Manan Solanki",
  "Mayank Solanki",
  "Mordhwaj",
  "Komal Sayal",
  "Riddhi Tak",
  "Muhammad Ahtisham",
  "Nakshtra Pal Parihar",
  "Narendra Singh",
  "Neeti Lohiya",
  "Nikhil Adwani",
  "Nikhil Sharma",
  "Nikshay Soni",
  "Nishit Dixit",
  "Nitesh Jangid",
  "Nitesh Kumar",
  "Nitin",
  "Palak Soni",
  "Patel Vikram Surjaram",
  "Pradumn Soni",
  "Prahlad Singh",
  "Pranjal Kansara",
  "Prateek Verma",
  "Pratyuksh Mathur",
  "Preeti Choudhary",
  "Prince Kumar",
  "Priyanshu Tak",
  "Pulkit Goswami",
  "Raghav Bhati",
  "Rahul Rajpurohit",
  "Rehan Khan",
  "Riddhi Gandhi",
  "Rimzim Bhati",
  "Rishabh Gupta",
  "Rishabh Jain"
];

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function generateHash(id: string, name: string): string {
  let hash = 0;
  const combined = `JIET-IWW-2026-${id}-${name}-MULTIVERSE`;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  return `0x${hex}A9F7`;
}

export const PARTICIPANTS: Participant[] = RAW_NAMES.map((name, index) => {
  const num = (index + 1).toString().padStart(3, "0");
  const id = `IWW-2026-JIET-${num}`;
  
  // Aliases support variations like "Khilesh ." or "Mordhwaj ." or "Nitin ."
  const aliases = [name];
  if (name === "Khilesh") aliases.push("Khilesh .", "Khilesh.");
  if (name === "Mordhwaj") aliases.push("Mordhwaj .", "Mordhwaj.");
  if (name === "Nitin") aliases.push("Nitin .", "Nitin.");

  return {
    id,
    certificateNumber: `CERT-${id}`,
    name,
    normalizedName: normalize(name),
    aliases: aliases.map(normalize),
    track: "Rapid Full-Stack & Generative Build",
    achievement: "Elite Builder - 12 Hours High Stakes Sprint",
    issuedDate: "October 02, 2026",
    verificationHash: generateHash(num, name),
  };
});

export function findParticipant(query: string): Participant | null {
  if (!query || !query.trim()) return null;
  const clean = normalize(query);
  
  // Exact match first
  const exact = PARTICIPANTS.find(
    (p) => p.normalizedName === clean || p.aliases.includes(clean)
  );
  if (exact) return exact;

  // Substring match
  if (clean.length >= 3) {
    const matched = PARTICIPANTS.filter((p) => p.normalizedName.includes(clean));
    if (matched.length === 1) return matched[0];
  }

  return null;
}

export function searchParticipantSuggestions(query: string): Participant[] {
  if (!query || !query.trim()) return [];
  const clean = normalize(query);
  if (clean.length < 2) return [];

  return PARTICIPANTS.filter((p) => {
    return (
      p.normalizedName.includes(clean) ||
      p.name.toLowerCase().includes(query.toLowerCase().trim()) ||
      p.id.toLowerCase().includes(query.toLowerCase().trim())
    );
  }).slice(0, 6);
}

export function getParticipantById(id: string): Participant | null {
  if (!id) return null;
  const cleanId = id.toUpperCase().trim();
  return PARTICIPANTS.find(
    (p) => p.id === cleanId || p.certificateNumber === cleanId || cleanId.endsWith(p.id)
  ) || null;
}
