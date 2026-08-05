/**
 * Branded QR for https://www.mamaafricaofficial.com/
 * Center image: public/images/afia-hero.jpg (About Mama Africa hero)
 *
 * Usage: npm install && npm run generate
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const sharp = require('sharp');

const SITE_URL = 'https://www.mamaafricaofficial.com/';
const LOGO_PATH = path.join(__dirname, '../public/images/afia-hero.jpg');
const OUT_DIR = path.join(__dirname, 'output');

/** Brand palette (matches site) */
const COLORS = {
  dark: '#18100A',
  light: '#FAF0E0',
  gold: '#C9A558',
};

async function roundedSquarePng(size, fill) {
  const r = Math.round(size * 0.14);
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${fill}"/>
    </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Center photo size as fraction of QR width (0.22 = small, 0.30 ≈ max for reliable scans with logo) */
const LOGO_SCALE = 0.40;
/** Tight cream pad around photo (1.0 = photo fills block; >1 adds margin) */
const LOGO_PAD_FACTOR = 1.06;
/** Gold ring thickness — thinner = photo blends more into the QR */
const GOLD_BORDER_RATIO = 0.0025;

async function buildBrandedQr({ size, filename, logoScale = LOGO_SCALE }) {
  const qrBuffer = await QRCode.toBuffer(SITE_URL, {
    type: 'png',
    errorCorrectionLevel: 'H',
    width: size,
    margin: 2,
    color: { dark: COLORS.dark, light: COLORS.light },
  });

  const logoSize = Math.round(size * logoScale);
  const padSize = Math.round(logoSize * LOGO_PAD_FACTOR);
  const border = Math.max(2, Math.round(size * GOLD_BORDER_RATIO));

  const logo = await sharp(LOGO_PATH)
    .resize(logoSize, logoSize, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const whitePad = await roundedSquarePng(padSize, COLORS.light);
  const goldRing = await roundedSquarePng(padSize + border * 2, COLORS.gold);

  const logoOnPad = await sharp(whitePad)
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toBuffer();

  const logoBlock = await sharp(goldRing)
    .composite([{ input: logoOnPad, gravity: 'centre' }])
    .png()
    .toBuffer();

  const left = Math.round((size - (padSize + border * 2)) / 2);
  const top = left;

  const outPath = path.join(OUT_DIR, filename);
  await sharp(qrBuffer)
    .composite([{ input: logoBlock, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  return outPath;
}

async function buildPlainQr({ size, filename }) {
  const outPath = path.join(OUT_DIR, filename);
  await QRCode.toFile(outPath, SITE_URL, {
    errorCorrectionLevel: 'M',
    width: size,
    margin: 2,
    color: { dark: COLORS.dark, light: COLORS.light },
  });
  return outPath;
}

async function main() {
  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`Logo not found: ${LOGO_PATH}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const variants = [
    {
      filename: 'mama-africa-qr-business-card.png',
      size: 600,
      note: '2" × 2" @ 300 DPI — ideal for standard business cards',
    },
    {
      filename: 'mama-africa-qr-print.png',
      size: 1200,
      note: '4" × 4" @ 300 DPI — flyers, posters, large print',
    },
    {
      filename: 'mama-africa-qr-screen.png',
      size: 512,
      note: 'Web, email signatures, social',
    },
  ];

  console.log(`Generating QR → ${SITE_URL}\n`);

  for (const v of variants) {
    const p = await buildBrandedQr({ size: v.size, filename: v.filename });
    console.log(`✓ ${v.filename} (${v.size}px) — ${v.note}`);
    console.log(`  ${p}\n`);
  }

  const plain = await buildPlainQr({
    size: 600,
    filename: 'mama-africa-qr-plain-backup.png',
  });
  console.log(`✓ mama-africa-qr-plain-backup.png — no logo (fallback if scan issues)`);
  console.log(`  ${plain}\n`);

  fs.writeFileSync(
    path.join(OUT_DIR, 'README.txt'),
    [
      'Mama Africa Official — QR assets',
      '================================',
      '',
      `URL encoded: ${SITE_URL}`,
      'Center image: afia-hero.jpg (About Mama Africa)',
      '',
      'For business cards:',
      '  Use mama-africa-qr-business-card.png at 1.5–2" square (min ~1" for reliable scans).',
      '',
      'Regenerate after URL or logo changes:',
      '  cd qr-code && npm install && npm run generate',
      '',
    ].join('\n'),
    'utf8',
  );

  console.log('Done. Drop mama-africa-qr-business-card.png into your card design.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
