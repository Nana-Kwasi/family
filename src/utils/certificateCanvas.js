/** Ghana heritage & naming-certificate rendering (PNG data URLs). */

export const CERT_VARIANTS = {
  HERITAGE: 1,
  NAMING_ADINKRA: 2,
  NAMING_KENTE: 3,
};

const CERT_W = 1920;
const CERT_H = 1152;

const CERT_ASSET_URLS = {
  edges: [encodeURI('/images/edges .png'), '/images/edges%20.png'],
  divide: ['/images/divide.png'],
  divide1: ['/images/divid1.png', '/images/divide1.png'],
  ghana: [encodeURI('/images/ghana design.png'), '/images/ghana%20design.png'],
  sankofaEmblem: [encodeURI('/images/sankofa 1.png'), '/images/sankofa%201.png'],
  sankofaFooter: [encodeURI('/images/sankofa.png')],
  adinkra: [encodeURI('/images/adinkra symbol.png'), '/images/adinkra%20symbol.png'],
  logo: ['/images/logo.png'],
  secondThirdLogo: [encodeURI('/images/second and third cert logo.jpeg'), '/images/second%20and%20third%20cert%20logo.jpeg'],
  secondThirdLogoNew: [encodeURI('/images/new-logo-for second and third cert.jpeg'), '/images/new-logo-for%20second%20and%20third%20cert.jpeg'],
  kentTop: ['/images/kent-1.png'],
  kentRight: ['/images/kent-2.png'],
  kentBottom: ['/images/kent-3.png'],
  kentLeft: ['/images/kent-4.png'],
};

const KENTE_EDGE_COLORS = ['#006B3F', '#C9A017', '#CE1126', '#1a1a1a', '#E8C547', '#1e4d8b'];

function loadCertificateImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

async function loadFirstCertificateImage(urls) {
  for (let i = 0; i < urls.length; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await loadCertificateImage(urls[i]);
    } catch {
      /* try next */
    }
  }
  return null;
}

function drawDividerStrip(ctx, img, centerX, topY, maxW) {
  if (!img?.width) return 18;
  const w = Math.min(maxW, img.width);
  const scale = w / img.width;
  const h = img.height * scale;
  ctx.drawImage(img, 0, 0, img.width, img.height, centerX - w / 2, topY, w, h);
  return h;
}

function drawCircularEmblem(ctx, img, cx, cy, r) {
  if (!img?.width) return;
  const inner = 2 * r * 0.9;
  const scale = Math.min(inner / img.width, inner / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#FDFCF8';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
  ctx.restore();

  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}

function drawSideEdgeColumns(ctx, img, W, H, gutter, colW) {
  if (!img?.width) return;
  const top = 32;
  const innerH = H - 64;
  ctx.drawImage(img, 0, 0, img.width, img.height, gutter, top, colW, innerH);
  ctx.save();
  ctx.translate(W - gutter, top);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, colW, innerH);
  ctx.restore();
}

function drawFittedImage(ctx, img, x, y, maxW, maxH) {
  if (!img?.width) return { w: 0, h: 0 };
  const s = Math.min(maxW / img.width, maxH / img.height);
  const w = img.width * s;
  const h = img.height * s;
  ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);
  return { w, h };
}

function drawKenteVerticalEdges(ctx, x, y, w, h, band, colors) {
  if (!colors?.length || band <= 0 || w <= 2 * band || h < 24) return;
  const stripe = Math.max(6, Math.min(11, Math.round(band * 0.62)));
  const n = colors.length;
  let idx = 0;
  for (let t = 0; t < h; t += stripe) {
    ctx.fillStyle = colors[idx % n];
    ctx.fillRect(x, y + t, band, Math.min(stripe, h - t));
    idx += 1;
  }
  for (let t = 0; t < h; t += stripe) {
    ctx.fillStyle = colors[idx % n];
    ctx.fillRect(x + w - band, y + t, band, Math.min(stripe, h - t));
    idx += 1;
  }
}

function drawKenteEdgeFrame(ctx, x, y, w, h, band, colors, stripeOverride, omitBottom) {
  if (!colors?.length || band <= 0 || w <= 2 * band || h <= 2 * band) return;
  const stripe = stripeOverride ?? Math.max(5, Math.min(11, Math.round(band * 0.65)));
  const n = colors.length;
  let idx = 0;

  for (let t = 0; t < w; t += stripe) {
    ctx.fillStyle = colors[idx % n];
    ctx.fillRect(x + t, y, Math.min(stripe, w - t), band);
    idx += 1;
  }
  if (!omitBottom) {
    for (let t = 0; t < w; t += stripe) {
      ctx.fillStyle = colors[idx % n];
      ctx.fillRect(x + t, y + h - band, Math.min(stripe, w - t), band);
      idx += 1;
    }
  }
  for (let t = band; t < h - band; t += stripe) {
    ctx.fillStyle = colors[idx % n];
    ctx.fillRect(x, y + t, band, Math.min(stripe, h - band - t));
    idx += 1;
  }
  for (let t = band; t < h - band; t += stripe) {
    ctx.fillStyle = colors[idx % n];
    ctx.fillRect(x + w - band, y + t, band, Math.min(stripe, h - band - t));
    idx += 1;
  }
}

function drawLogoTopRight(ctx, img, W, margin, maxDim) {
  if (!img?.width) return;
  const x = W - margin - maxDim;
  drawFittedImage(ctx, img, x, margin, maxDim, maxDim);
}

function drawLogoTopRightCircle(ctx, img, W, margin, size) {
  if (!img?.width) return;
  const x = W - margin - size;
  const y = margin;
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  drawFittedImage(ctx, img, x, y, size, size);
  ctx.restore();
}

function drawImageFrame(ctx, frame, x, y, w, h, edge = 30) {
  if (!frame.top && !frame.right && !frame.bottom && !frame.left) return;
  const e = Math.max(10, edge);
  if (frame.top?.width) ctx.drawImage(frame.top, x, y, w, e);
  if (frame.bottom?.width) ctx.drawImage(frame.bottom, x, y + h - e, w, e);
  if (frame.left?.width) ctx.drawImage(frame.left, x, y, e, h);
  if (frame.right?.width) ctx.drawImage(frame.right, x + w - e, y, e, h);
}

function drawTiledHorizontalStrip(ctx, img, x, y, w, h) {
  if (!img?.width || !img?.height) return;
  const tileW = Math.max(1, (h * img.width) / img.height);
  for (let dx = 0; dx < w; dx += tileW) {
    const dw = Math.min(tileW, w - dx);
    ctx.drawImage(img, 0, 0, img.width, img.height, x + dx, y, dw, h);
  }
}

function drawTiledVerticalStrip(ctx, img, x, y, h, w) {
  if (!img?.width || !img?.height) return;
  const tileH = Math.max(1, (w * img.height) / img.width);
  for (let dy = 0; dy < h; dy += tileH) {
    const dh = Math.min(tileH, h - dy);
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y + dy, w, dh);
  }
}

function drawTiledUniformFrame(ctx, img, x, y, w, h, edge = 68) {
  if (!img?.width || !img?.height) return;
  const e = Math.max(10, edge);

  // Top + bottom with repeated tiles (no stretch)
  drawTiledHorizontalStrip(ctx, img, x, y, w, e);
  drawTiledHorizontalStrip(ctx, img, x, y + h - e, w, e);

  // Build a rotated asset once for side tiling
  const rot = document.createElement('canvas');
  rot.width = img.height;
  rot.height = img.width;
  const rctx = rot.getContext('2d');
  rctx.translate(rot.width / 2, rot.height / 2);
  rctx.rotate(Math.PI / 2);
  rctx.drawImage(img, -img.width / 2, -img.height / 2);

  // Left + right with repeated tiles (no stretch)
  drawTiledVerticalStrip(ctx, rot, x, y, h, e);
  drawTiledVerticalStrip(ctx, rot, x + w - e, y, h, e);
}

function drawAdinkraCorners(ctx, img, x, y, w, h, size = 52, inset = 18) {
  if (!img?.width) return;
  drawFittedImage(ctx, img, x + inset, y + inset, size, size);
  drawFittedImage(ctx, img, x + w - inset - size, y + inset, size, size);
  drawFittedImage(ctx, img, x + inset, y + h - inset - size, size, size);
  drawFittedImage(ctx, img, x + w - inset - size, y + h - inset - size, size, size);
}

function drawFourCornersWithSymbols(ctx, imgA, imgB, x, y, w, h, size = 72, inset = 108) {
  if (imgA?.width) drawFittedImage(ctx, imgA, x + w - inset - size, y + inset, size, size);
  if (imgB?.width) drawFittedImage(ctx, imgB, x + inset, y + h - inset - size, size, size);
  if (imgA?.width) drawFittedImage(ctx, imgA, x + w - inset - size, y + h - inset - size, size, size);
}

function fillTextWrappedCenter(ctx, text, cx, startY, maxW, lineHeight) {
  const words = String(text).split(/\s+/);
  let line = '';
  let y = startY;
  const lines = [];
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  lines.forEach((ln) => {
    ctx.fillText(ln, cx, y);
    y += lineHeight;
  });
  return y;
}

async function loadCertificateFonts() {
  await document.fonts.ready;
  const specs = [
    '400 72px "Great Vibes"',
    '400 96px "Great Vibes"',
    '600 16px Cinzel',
    '600 14px Cinzel',
    'italic 400 20px "EB Garamond"',
    'italic 400 18px "EB Garamond"',
  ];
  await Promise.all(specs.map((s) => document.fonts.load(s).catch(() => {})));
}

export async function generateCertificateDataUrl(name, day, dateDisplay, gender, data, variant = CERT_VARIANTS.HERITAGE) {
  await loadCertificateFonts();

  if (variant === CERT_VARIANTS.NAMING_ADINKRA) {
    return generateNamingCertificate(name, day, dateDisplay, gender, data, 'adinkra');
  }
  if (variant === CERT_VARIANTS.NAMING_KENTE) {
    return generateNamingCertificate(name, day, dateDisplay, gender, data, 'kente');
  }
  return generateHeritageCertificate(name, day, dateDisplay, gender, data);
}

async function generateHeritageCertificate(name, day, dateDisplay, gender, data) {
  const [
    imgEdges,
    imgDivide,
    imgDivide1,
    imgGhana,
    imgSankofaEmblem,
    imgSankofaFooter,
    imgAdinkra,
    imgSecondThirdLogo,
  ] = await Promise.all([
    loadFirstCertificateImage(CERT_ASSET_URLS.edges),
    loadFirstCertificateImage(CERT_ASSET_URLS.divide),
    loadFirstCertificateImage(CERT_ASSET_URLS.divide1),
    loadFirstCertificateImage(CERT_ASSET_URLS.ghana),
    loadFirstCertificateImage(CERT_ASSET_URLS.sankofaFooter),
    loadFirstCertificateImage(CERT_ASSET_URLS.sankofaFooter),
    loadFirstCertificateImage(CERT_ASSET_URLS.adinkra),
    loadFirstCertificateImage(CERT_ASSET_URLS.secondThirdLogo),
  ]);

  const W = CERT_W;
  const H = CERT_H;
  const SCALE = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  const paper0 = '#F8F2E6';
  const paper1 = '#EFE6D7';
  const ink = '#0d0d0d';
  const inkMuted = '#3a3a3a';
  const bronze = '#8B6914';

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, paper0);
  bg.addColorStop(1, paper1);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const flagWash = ctx.createLinearGradient(0, 0, 0, H * 0.5);
  flagWash.addColorStop(0, 'rgba(206, 17, 38, 0.38)');
  flagWash.addColorStop(0.38, 'rgba(248, 209, 76, 0.32)');
  flagWash.addColorStop(0.72, 'rgba(0, 107, 63, 0.28)');
  flagWash.addColorStop(1, 'rgba(254, 253, 251, 0)');
  ctx.fillStyle = flagWash;
  ctx.fillRect(0, 0, W, H * 0.48);

  const kenteBand = 18;
  drawKenteVerticalEdges(ctx, 0, 0, W, H, kenteBand, KENTE_EDGE_COLORS);

  const margin = 20;
  const gap = 8;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(margin, margin, W - 2 * margin, H - 2 * margin);
  ctx.lineWidth = 1.2;
  ctx.strokeRect(margin + gap, margin + gap, W - 2 * (margin + gap), H - 2 * (margin + gap));

  const innerLine = margin + gap;
  const hairInset = 8;
  const hairBand = 3;
  const kenteFooterReserve = 78;
  drawKenteEdgeFrame(
    ctx,
    innerLine + hairInset,
    innerLine + hairInset,
    W - 2 * (innerLine + hairInset),
    H - 2 * (innerLine + hairInset) - kenteFooterReserve,
    hairBand,
    KENTE_EDGE_COLORS,
    2,
    true,
  );

  const colW = 82;
  const gutter = margin + gap + 12;
  if (imgEdges) drawSideEdgeColumns(ctx, imgEdges, W, H, gutter, colW);

  const contentLeft = gutter + colW + 28;
  const contentRight = W - gutter - colW - 28;
  const contentMid = (contentLeft + contentRight) / 2;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  const emblemR = 52;
  const emblemY = 112;
  drawCircularEmblem(ctx, imgSankofaEmblem, contentMid - 320, emblemY, emblemR);
  drawCircularEmblem(ctx, imgAdinkra, contentMid + 320, emblemY, emblemR);
  if (imgSecondThirdLogo?.width) drawLogoTopRight(ctx, imgSecondThirdLogo, W, margin + 10, 92);

  let y = emblemY + emblemR + 22;
  ctx.fillStyle = bronze;
  ctx.font = '600 13px Arial, Helvetica, sans-serif';
  ctx.fillText('MAMA AFRICA OFFICIAL · GHANA', contentMid, y);
  y += 34;
  ctx.fillStyle = ink;
  ctx.font = '800 34px Arial Narrow, "Arial Black", Impact, sans-serif';
  ctx.fillText(`${String(day).toUpperCase()} DAY-BORN LINEAGE`, contentMid, y);
  y += 28;
  ctx.font = '600 15px Arial, Helvetica, sans-serif';
  ctx.fillText('CERTIFICATE OF AKAN HERITAGE', contentMid, y);
  y += 32;
  if (imgDivide) y += drawDividerStrip(ctx, imgDivide, contentMid, y, contentRight - contentLeft) + 22;
  else y += 28;

  ctx.fillStyle = inkMuted;
  ctx.font = 'italic 19px "Times New Roman", Times, serif';
  const issued = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillText('This certificate is presented in celebration of your Akan day-born name', contentMid, y);
  y += 28;
  ctx.fillText(`on ${issued}  ·  Date of birth recorded: ${dateDisplay}`, contentMid, y);
  y += 36;
  if (imgDivide1) y += drawDividerStrip(ctx, imgDivide1, contentMid, y, contentRight - contentLeft) + 24;
  else y += 28;

  ctx.fillStyle = ink;
  ctx.font = '800 56px Arial Narrow, "Arial Black", Arial, sans-serif';
  ctx.fillText(name, contentMid, y);
  const nameW = ctx.measureText(name).width;
  y += 10;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(contentMid - nameW / 2, y);
  ctx.lineTo(contentMid + nameW / 2, y);
  ctx.stroke();
  y += 40;

  ctx.font = 'italic 18px "Times New Roman", Times, serif';
  ctx.fillStyle = inkMuted;
  ctx.fillText(`is of the ${day}-born lineage of the Akan people of Ghana`, contentMid, y);
  y += 26;
  ctx.fillText(
    `${gender === 'female' ? '♀ Female' : '♂ Male'}  ·  ${data.planet}  ·  Sacred colour: ${data.color}`,
    contentMid,
    y,
  );
  y += 40;

  ctx.font = 'italic 17px "Times New Roman", Times, serif';
  ctx.fillText('The spirit of this name is expressed as', contentMid, y);
  y += 32;
  ctx.font = '700 26px "Times New Roman", Times, serif';
  const meaningLines = [];
  const mWords = String(data.meaning || '').split(' ');
  let mLine = '';
  const meaningMaxW = contentRight - contentLeft - 40;
  mWords.forEach((w) => {
    const t = `${mLine}${w} `;
    if (ctx.measureText(t).width > meaningMaxW && mLine) {
      meaningLines.push(mLine.trim());
      mLine = `${w} `;
    } else {
      mLine = t;
    }
  });
  if (mLine.trim()) meaningLines.push(mLine.trim());
  meaningLines.forEach((ln) => {
    ctx.fillStyle = ink;
    ctx.fillText(ln, contentMid, y);
    y += 32;
  });
  y += 8;

  ctx.fillStyle = ink;
  ctx.font = 'italic 18px "Times New Roman", Times, serif';
  const soul = `\u201C${data.soulPath}\u201D`;
  const soulMaxW = contentRight - contentLeft - 40;
  const sWords = soul.split(' ');
  let sLine = '';
  sWords.forEach((w) => {
    const t = `${sLine}${w} `;
    if (ctx.measureText(t).width > soulMaxW && sLine) {
      ctx.fillText(sLine.trim(), contentMid, y);
      y += 28;
      sLine = `${w} `;
    } else {
      sLine = t;
    }
  });
  if (sLine.trim()) ctx.fillText(sLine.trim(), contentMid, y);
  y += 36;

  if (imgDivide && y < H - 170) {
    y += drawDividerStrip(ctx, imgDivide, contentMid, y, Math.min(640, contentRight - contentLeft)) + 16;
  }

  const footerBand = 210;
  const footerSankofaBox = 2 * emblemR;
  const sankofaFooterY = H - footerBand + 38;
  if (imgSankofaFooter) {
    drawFittedImage(ctx, imgSankofaFooter, contentLeft - 20, sankofaFooterY, footerSankofaBox, footerSankofaBox);
  }
  if (imgGhana) {
    const gw = 460;
    const gh = footerBand - 18;
    drawFittedImage(ctx, imgGhana, W - gutter - gw - 20, H - footerBand + 28, gw, gh);
  }

  drawAdinkraCorners(ctx, imgAdinkra, margin, margin, W - (2 * margin), H - (2 * margin), 58, 10);

  const issuedStr = `Issued by Mama Africa Official · Ghana · ${issued}`;
  const tagStr = 'Celebrating Akan heritage and the African diaspora';
  const issuedY = H - 74;
  const tagY = H - 50;
  const halo = 'rgba(254, 253, 250, 0.92)';

  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  ctx.miterLimit = 2;

  ctx.font = '600 14px Arial, Helvetica, sans-serif';
  ctx.lineWidth = 5;
  ctx.strokeStyle = halo;
  ctx.strokeText(issuedStr, contentMid, issuedY);
  ctx.fillStyle = '#2d2d2d';
  ctx.fillText(issuedStr, contentMid, issuedY);

  ctx.font = '500 12px "Times New Roman", Times, serif';
  ctx.lineWidth = 4;
  ctx.strokeStyle = halo;
  ctx.strokeText(tagStr, contentMid, tagY);
  ctx.fillStyle = '#333333';
  ctx.fillText(tagStr, contentMid, tagY);

  return canvas.toDataURL('image/png', 1.0);
}

async function generateNamingCertificate(name, day, dateDisplay, gender, data, borderMode) {
  const [
    imgLogoB,
    imgAdinkra,
    imgSankofaEmblem,
    imgDivide,
    imgDivide1,
    imgKentTop,
    imgKentRight,
    imgKentBottom,
    imgKentLeft,
  ] = await Promise.all([
    loadFirstCertificateImage(CERT_ASSET_URLS.secondThirdLogoNew),
    loadFirstCertificateImage(CERT_ASSET_URLS.adinkra),
    loadFirstCertificateImage(CERT_ASSET_URLS.sankofaFooter),
    loadFirstCertificateImage(CERT_ASSET_URLS.divide),
    loadFirstCertificateImage(CERT_ASSET_URLS.divide1),
    loadFirstCertificateImage(CERT_ASSET_URLS.kentTop),
    loadFirstCertificateImage(CERT_ASSET_URLS.kentRight),
    loadFirstCertificateImage(CERT_ASSET_URLS.kentBottom),
    loadFirstCertificateImage(CERT_ASSET_URLS.kentLeft),
  ]);

  const W = CERT_W;
  const H = CERT_H;
  const SCALE = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  const paper0 = '#F8F3E8';
  const paper1 = '#EFE6D8';
  const ink = '#111111';
  const inkMuted = '#111111';
  const titleBrown = '#6B4A1E';
  const nameGreen = '#0E6B45';
  const accentFemale = '#8B1538';

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, paper0);
  bg.addColorStop(1, paper1);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const margin = 30;
  const innerX = margin;
  const innerY = margin;
  const innerW = W - 2 * margin;
  const innerH = H - 2 * margin;
  if (borderMode === 'kente') {
    drawTiledUniformFrame(ctx, imgKentTop, innerX, innerY, innerW, innerH, 68);
    ctx.strokeStyle = '#5c4a32';
    ctx.lineWidth = 2;
    ctx.strokeRect(innerX + 78, innerY + 78, innerW - 156, innerH - 156);
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = 'rgba(92, 74, 50, 0.55)';
    ctx.strokeRect(innerX + 92, innerY + 92, innerW - 184, innerH - 184);
  } else {
    drawImageFrame(
      ctx,
      { top: imgKentRight, right: imgKentLeft, bottom: imgKentBottom, left: imgKentLeft },
      innerX,
      innerY,
      innerW,
      innerH,
      68,
    );
    ctx.strokeStyle = '#5c4a32';
    ctx.lineWidth = 2;
    ctx.strokeRect(innerX + 78, innerY + 78, innerW - 156, innerH - 156);
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = 'rgba(92, 74, 50, 0.55)';
    ctx.strokeRect(innerX + 92, innerY + 92, innerW - 184, innerH - 184);
  }
  drawFourCornersWithSymbols(ctx, imgSankofaEmblem, imgAdinkra, innerX, innerY, innerW, innerH, 72, 108);

  const contentPad = 250;
  const contentLeft = contentPad;
  const contentRight = W - contentPad;
  const cx = W / 2;
  const issued = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (imgLogoB?.width) {
    drawLogoTopRightCircle(ctx, imgLogoB, W, margin + 88, 132);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let y = innerY + 190;

  ctx.fillStyle = titleBrown;
  ctx.font = '600 42px Cinzel, Palatino, serif';
  ctx.fillText('GHANAIAN NAMING CEREMONY', cx, y);
  y += 18;
  if (imgDivide) y += drawDividerStrip(ctx, imgDivide, cx, y, 520) + 52;
  else y += 46;

  ctx.font = 'italic 400 40px "EB Garamond", Garamond, serif';
  ctx.fillStyle = ink;
  ctx.fillText('This is to certify that', cx, y);
  y += 74;

  const nameColor = borderMode === 'kente'
    ? accentFemale
    : nameGreen;
  y += 54;
  ctx.fillStyle = nameColor;
  ctx.font = '400 146px "Great Vibes", "Brush Script MT", cursive';
  ctx.fillText(name, cx, y);
  y += 88;

  ctx.font = '600 20px Cinzel, Palatino, serif';
  ctx.fillStyle = borderMode === 'kente' ? accentFemale : nameGreen;
  ctx.fillText(
    `${String(day).toUpperCase()} BORN ${gender === 'female' ? 'GIRL' : 'BOY'}`,
    cx,
    y,
  );
  y += 56;

  const sectionWidth = contentRight - contentLeft - 10;

  ctx.fillStyle = titleBrown;
  ctx.font = '600 18px Cinzel, Palatino, serif';
  ctx.fillText('ORIGIN & HERITAGE', cx, y);
  y += 12;
  if (imgDivide) y += drawDividerStrip(ctx, imgDivide, cx, y, 500) + 16;
  else y += 20;

  ctx.font = 'italic 400 20px "EB Garamond", Garamond, serif';
  ctx.fillStyle = ink;
  y = fillTextWrappedCenter(ctx, String(data.origin || '').slice(0, 320), cx, y, sectionWidth, 30);
  y += 18;

  ctx.fillStyle = titleBrown;
  ctx.font = '600 18px Cinzel, Palatino, serif';
  ctx.fillText('TRAITS & ATTRIBUTES', cx, y);
  y += 12;
  if (imgDivide1) y += drawDividerStrip(ctx, imgDivide1, cx, y, 500) + 16;
  else y += 20;

  ctx.font = 'italic 400 20px "EB Garamond", Garamond, serif';
  ctx.fillStyle = ink;
  const traits = Array.isArray(data.attributes) ? data.attributes.join(' • ') : '';
  y = fillTextWrappedCenter(ctx, String(traits).slice(0, 280), cx, y, sectionWidth, 30);
  y += 18;

  ctx.font = 'italic 400 16px "EB Garamond", Garamond, serif';
  ctx.fillStyle = '#2f2f2f';
  const soulShort = `\u201C${String(data.soulPath || '').slice(0, 220)}${String(data.soulPath || '').length > 220 ? '…' : ''}\u201D`;
  y = fillTextWrappedCenter(ctx, soulShort, cx, y, sectionWidth - 30, 24);
  y += 10;

  const footLabelY = H - margin - 110;
  const symSize = 96;
  if (imgAdinkra?.width) {
    drawFittedImage(ctx, imgAdinkra, cx - symSize / 2, footLabelY - symSize - 14, symSize, symSize);
  }

  ctx.textAlign = 'left';
  ctx.font = '600 13px Cinzel, Palatino, serif';
  ctx.fillStyle = inkMuted;
  ctx.fillText('DATE', cx - 210, footLabelY);
  ctx.font = 'italic 400 16px "EB Garamond", Garamond, serif';
  ctx.fillStyle = '#3d362c';
  ctx.fillText(issued, cx - 210, footLabelY + 20);

  ctx.textAlign = 'right';
  ctx.font = '600 13px Cinzel, Palatino, serif';
  ctx.fillStyle = inkMuted;
  ctx.fillText('MAMA AFRICA OFFICIAL GHANA', cx + 320, footLabelY);

  ctx.beginPath();
  ctx.strokeStyle = '#8b7355';
  ctx.lineWidth = 1;
  ctx.moveTo(cx - 210, footLabelY + 34);
  ctx.lineTo(cx - 70, footLabelY + 34);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 70, footLabelY + 34);
  ctx.lineTo(cx + 210, footLabelY + 34);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'italic 400 14px "EB Garamond", Garamond, serif';
  ctx.fillStyle = '#5c5346';
  ctx.fillText(`Birth recorded: ${dateDisplay}`, cx, footLabelY + 28);

  ctx.font = '600 11px Cinzel, Palatino, serif';
  ctx.fillStyle = '#7a5c28';
  ctx.textAlign = 'left';
  ctx.fillText('MAMA AFRICA OFFICIAL · GHANA', cx + 380, H - 58);

  return canvas.toDataURL('image/png', 1.0);
}
