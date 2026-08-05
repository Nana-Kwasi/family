# Mama Africa — Branded QR Code

Scannable QR codes that open [mamaafricaofficial.com](https://www.mamaafricaofficial.com/).

The center image is **Afia’s hero photo** from the About page (`public/images/afia-hero.jpg`).

## Generate

```bash
cd qr-code
npm install
npm run generate
```

From the repo root:

```bash
npm run generate:qr
```

## Output (`output/`)

| File | Size | Use |
|------|------|-----|
| `mama-africa-qr-business-card.png` | 600×600 px (2" @ 300 DPI) | **Business cards** — use this one |
| `mama-africa-qr-print.png` | 1200×1200 px | Flyers, posters |
| `mama-africa-qr-screen.png` | 512×512 px | Web, email |
| `mama-africa-qr-plain-backup.png` | 600×600 px | No logo (if a printer rejects the branded version) |

## Business card tips

- Place the QR at **1.5–2 inches** square on the card when possible (never below ~1").
- Keep a clear margin around the code (the file already includes a quiet zone).
- Test with iPhone Camera and Google Lens before printing a large batch.
- One QR works everywhere: cards, stickers, table tents — same file.

## Customize

Edit `generate.js`:

- `SITE_URL` — destination link
- `COLORS` — QR module / background / gold ring
- `logoScale` — center image size (default **0.30** ≈ 30% of QR width; don’t go much above 0.32)
