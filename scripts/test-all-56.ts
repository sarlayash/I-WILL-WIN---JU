import { PARTICIPANTS, findParticipant, getParticipantById } from '../src/data/participants';
import { createQRCodeDataUrl, getPublicVerificationUrl } from '../src/utils/certificateGenerator';

async function runFullAudit() {
  console.log(`Starting comprehensive audit of all ${PARTICIPANTS.length} participants...`);

  if (PARTICIPANTS.length !== 56) {
    throw new Error(`Expected exactly 56 participants, found ${PARTICIPANTS.length}`);
  }

  for (let i = 0; i < PARTICIPANTS.length; i++) {
    const p = PARTICIPANTS[i];
    const index = i + 1;
    const expectedNum = index.toString().padStart(3, '0');
    const expectedId = `IWW-2026-JIET-${expectedNum}`;

    if (p.id !== expectedId) {
      throw new Error(`ID mismatch for #${index}: got ${p.id}, expected ${expectedId}`);
    }

    if (!p.name || p.name.trim().length === 0) {
      throw new Error(`Empty name for #${index}`);
    }

    // Name lookup test
    const matched = findParticipant(p.name);
    if (!matched || matched.id !== p.id) {
      throw new Error(`Failed to find participant by name: ${p.name}`);
    }

    // ID lookup test
    const matchedById = getParticipantById(p.id);
    if (!matchedById || matchedById.name !== p.name) {
      throw new Error(`Failed to find participant by ID: ${p.id}`);
    }

    // Check URL generation
    const url = getPublicVerificationUrl(p.id);
    if (!url.startsWith('http') || !url.includes(`verify=${p.id}`)) {
      throw new Error(`Invalid verification URL: ${url}`);
    }

    // Check QR generation
    const qrData = await createQRCodeDataUrl(url);
    if (!qrData || !qrData.startsWith('data:image/png;base64,')) {
      throw new Error(`Failed to generate QR data URL for #${index} (${p.name})`);
    }

    // Check text length limits
    if (p.name.length > 40) {
      throw new Error(`Name too long (>40 chars): ${p.name}`);
    }
  }

  // Also test alias variants (e.g. names with trailing dots from OCR)
  const dotTestNames = ['Khilesh .', 'Mordhwaj .', 'Nitin .'];
  for (const dotName of dotTestNames) {
    const match = findParticipant(dotName);
    if (!match) {
      throw new Error(`Failed to match dot alias: "${dotName}"`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`✓ 100% SUCCESS: All 56 participant certificates verified!`);
  console.log(`✓ All 56 QR codes successfully generated.`);
  console.log(`✓ All 56 IDs matched expected sequence IWW-2026-JIET-001 to 056.`);
  console.log(`✓ Name auto-scaling & aliases verified.`);
  console.log(`==================================================\n`);
}

runFullAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
