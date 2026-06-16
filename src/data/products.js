const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const BABY_SIZES = ['0–3M', '3–6M', '6–12M', '12–18M', '18–24M'];

const HOODIE_CHART = [
  { size: 'XS', usChest: '32–34"', euChest: '81–86 cm', usLength: '26"', euLength: '66 cm' },
  { size: 'S',  usChest: '35–37"', euChest: '89–94 cm', usLength: '27"', euLength: '68.5 cm' },
  { size: 'M',  usChest: '38–40"', euChest: '97–102 cm', usLength: '28"', euLength: '71 cm' },
  { size: 'L',  usChest: '41–43"', euChest: '104–109 cm', usLength: '29"', euLength: '73.5 cm' },
  { size: 'XL', usChest: '44–46"', euChest: '112–117 cm', usLength: '30"', euLength: '76 cm' },
  { size: '2XL',usChest: '47–49"', euChest: '119–124 cm', usLength: '31"', euLength: '78.5 cm' },
];

const TSHIRT_CHART = [
  { size: 'XS', usChest: '32–34"', euChest: '81–86 cm', usLength: '25"', euLength: '63.5 cm' },
  { size: 'S',  usChest: '35–37"', euChest: '89–94 cm', usLength: '26"', euLength: '66 cm' },
  { size: 'M',  usChest: '38–40"', euChest: '97–102 cm', usLength: '27"', euLength: '68.5 cm' },
  { size: 'L',  usChest: '41–43"', euChest: '104–109 cm', usLength: '28"', euLength: '71 cm' },
  { size: 'XL', usChest: '44–46"', euChest: '112–117 cm', usLength: '29"', euLength: '73.5 cm' },
  { size: '2XL',usChest: '47–49"', euChest: '119–124 cm', usLength: '30"', euLength: '76 cm' },
];

const pi = (file) => encodeURI(`/images/${file}`);

export const BORN_DAY_MARKERS = {
  Sunday:    ['akosua', 'kwasi', 'kwesi'],
  Monday:    ['adwoa', 'adjoa', 'kwadwo', 'kojo'],
  Tuesday:   ['abena', 'kwabena'],
  Wednesday: ['akua', 'kwaku'],
  Thursday:  ['yaw', 'yaa'],
  Friday:    ['afia', 'kofi'],
  Saturday:  ['ama', 'kwame'],
};

function inferBornDayFromFilename(file) {
  const l = file.toLowerCase();
  for (const [day, markers] of Object.entries(BORN_DAY_MARKERS)) {
    if (markers.some((m) => l.includes(m))) return day;
  }
  return null;
}

/** Legacy pair/combo catalog — IDs 1–24, kept for bundle references. */
const CATALOG_FILES = [
  'abena and kwabena hoodie.jpeg',
  'abena and kwabena hoodie1.jpeg',
  'abena and kwabena t shirt abd hoodie.jpeg',
  'abena and kwabena t shirt.jpeg',
  'abena and kwabena t shirt1.jpeg',
  'adwoa and kwadwo hoodie2.jpeg',
  'adwoa and kwadwo t shirt.jpeg',
  'afia and kofi hoodie1.jpeg',
  'afia and kofi t shirt1.jpeg',
  'akosua and kwasi hoodie1.jpeg',
  'akosua and kwasi t shirt1.jpeg',
  'akua and kwaku hoodie1.jpeg',
  'akua and kwaku t shirt.jpeg',
  'ama and kwame hoodie1.jpeg',
  'ama and kwame t shirt.jpeg',
  'best mom ever hoodie.jpeg',
  'i love you mommy hoodie.jpeg',
  'i love you mommy mug1.jpeg',
  'i love you mommy t shirt.jpeg',
  'i love you mommy t shirt1.jpeg',
  'i love you mommy tubler.jpeg',
  'kwabena and abena full t shirt and hoodie.jpeg',
  'yaw and yaa hoodie.jpeg',
  'yaw and yaa t shirt.jpeg',
];

function humanizeProductFilename(file) {
  let base = file.replace(/\.jpe?g$/i, '');
  base = base.replace(/\bt shirt\b/gi, 'T-Shirt').replace(/\babd\b/gi, 'and').replace(/\btubler\b/gi, 'Tumbler');
  const joined = base.split(' ').map((w) => {
    if (w.toLowerCase() === 'and') return 'and';
    if (w === 'T-Shirt') return 'T-Shirt';
    if (/^mug\d+$/i.test(w)) return 'Mug';
    if (/^hoodie\d*$/i.test(w)) return 'Hoodie';
    if (/^tumbler\d*$/i.test(w)) return 'Tumbler';
    if (/^t-shirt\d+$/i.test(w)) return 'T-Shirt';
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ');
  return joined.replace(/\bMug\d+\b/g, 'Mug').replace(/\bHoodie\d+\b/g, 'Hoodie')
    .replace(/\bT-Shirt\d+\b/g, 'T-Shirt').replace(/\bTumbler\d+\b/g, 'Tumbler');
}

function inferTypeAndLabel(file) {
  const l = file.toLowerCase();
  if (l.includes('tubler') || l.includes('mug')) return { type: 'mug', label: l.includes('tubler') ? 'Tumbler' : 'Mug' };
  if (l.includes('t shirt') && l.includes('hoodie')) return { type: 'hoodie', label: 'Hoodie & Tee' };
  if (l.includes('t shirt')) return { type: 'tshirt', label: 'T-Shirt' };
  return { type: 'hoodie', label: 'Hoodie' };
}

// eslint-disable-next-line no-unused-vars -- legacy catalog kept for reference
const legacyProducts = CATALOG_FILES.map((file, i) => {
  const { type, label } = inferTypeAndLabel(file);
  const bornDay = inferBornDayFromFilename(file);
  return {
    id: i + 1, name: humanizeProductFilename(file), bornDay,
    tagline: 'Afia Premium — Heritage gifting', cardBlurb: 'Gift-ready · Premium print',
    description: `Premium ${label === 'Tumbler' ? 'drinkware' : label.toLowerCase()} from our Akan day-name collection. Gift-ready quality and meaningful design.`,
    price: type === 'hoodie' ? 70 : type === 'tshirt' ? 20 : 22,
    type, label, image: pi(file),
    sizes: type === 'mug' ? ['11oz', '15oz'] : SIZES,
    sizeChart: type === 'hoodie' ? HOODIE_CHART : type === 'tshirt' ? TSHIRT_CHART : [],
    perfectFor: ["Mother's Day", 'Heritage Gift', 'Gift for Mom', 'Cultural Appreciation'],
    details: type === 'mug'
      ? ['Quality ceramic', 'Glossy print', 'Available in 11oz and 15oz', 'Gift-ready']
      : ['Premium cotton blend', 'Comfortable fit', 'Durable print', 'Gift-ready presentation'],
  };
});

// ─── SHARED BASES & CONSTANTS ────────────────────────────────────────────────
const GN_MUG = pi('Mug with Gye Nyame Symbol.png');
const KWABENA_ETSY = 'https://www.etsy.com/listing/4514326334/kwabena-tuesday-born-shirt-with-sankofa';
const KOFI_ETSY    = 'https://www.etsy.com/listing/4509827776/kofi-friday-born-shirt-with-sankofa-back';

const TSHIRT_BASE = {
  sizes: SIZES, sizeChart: TSHIRT_CHART, price: 20, type: 'tshirt', label: 'T-Shirt',
  perfectFor: ['Birthday Gift', 'Heritage Gift', 'Day Born Celebration', 'Cultural Appreciation'],
  details: ['Premium cotton blend', 'Adinkra symbol print', 'Comfortable fit', 'Durable print', 'Gift-ready'],
};
const MUG_BASE = {
  sizes: ['11oz', '15oz'], sizeChart: [], price: 22, type: 'mug', label: 'Mug',
  perfectFor: ['Birthday Gift', 'Heritage Gift', 'Day Born Celebration', "Mother's Day"],
  details: ['Quality ceramic', 'Adinkra symbol print', 'Available in 11oz and 15oz', 'Dishwasher safe', 'Gift-ready'],
};
const BABYSUIT_BASE = {
  sizes: BABY_SIZES, sizeChart: [], price: 25, type: 'babysuit', label: 'Baby Bodysuit',
  perfectFor: ['Baby Shower Gift', 'Heritage Gift', 'Newborn Gift', 'Cultural Appreciation'],
  details: ['Soft cotton blend', 'Snap-button closure', 'Heritage Adinkra print', 'Multiple colour options', 'Gift-ready'],
};
const HOODIE_BASE = {
  sizes: SIZES, sizeChart: HOODIE_CHART, price: 70, type: 'hoodie', label: 'Hoodie',
  perfectFor: ['Heritage Gift', 'Day Born Celebration', "Mother's Day", 'Cultural Appreciation'],
  details: ['Premium cotton blend', 'Warm & comfortable', 'Adinkra symbol design', 'Durable print', 'Gift-ready'],
};

// ─── INDIVIDUAL DAY-BORN PRODUCTS (IDs 25+) ─────────────────────────────────
// eslint-disable-next-line no-unused-vars -- previous catalog kept for reference; Amazon catalog is active
const INDIVIDUAL_PRODUCTS = [

  // ════════════════════════════════════════════════════════════
  // BASE DAY-BORN T-SHIRTS  (IDs 26–38)  — one per Akan name
  // ════════════════════════════════════════════════════════════
  {
    id: 26, name: 'Kwaku Wednesday Born T-Shirt', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Kwaku, the Wednesday-born. Features the Sankofa Adinkra symbol.',
    image: pi('akua and kwaku t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4514300702/kwaku-wednesday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 27, name: 'Kofi Friday Born T-Shirt', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Sankofa symbol · Front view',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. Features the Sankofa Adinkra symbol on the back.',
    image: pi('Kofi Friday Born Shirt.png'),
    images: [
      pi('Kofi Friday Born Shirt.png'),
      pi('Kofi Friday Born Shirt neck side.png'),
      pi('Kofi Friday Born Shirt With Sankofa at Back.png'),
    ],
    etsyUrl: KOFI_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 28, name: 'Afia Friday Born T-Shirt', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Premium print',
    description: 'Premium heritage T-shirt for Afia, the Friday-born. Features the Gye Nyame Adinkra symbol.',
    image: pi('afia and kofi t shirt1.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509811213/afia-friday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 29, name: 'Kwame Saturday Born T-Shirt', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Premium print',
    description: 'Premium heritage T-shirt for Kwame, the Saturday-born. Features the Gye Nyame Adinkra symbol.',
    image: pi('ama and kwame t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509796378/kwame-saturday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 30, name: 'Ama Saturday Born T-Shirt', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Ama, the Saturday-born. Features the Sankofa Adinkra symbol.',
    image: pi('ama and kwame t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509773045/ama-saturday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 31, name: 'Akosua Sunday Born T-Shirt', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Akosua, the Sunday-born. Features the Sankofa Adinkra symbol.',
    image: pi('akosua and kwasi t shirt1.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509760772/akosua-sunday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 32, name: 'Kwasi Sunday Born T-Shirt', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Kwasi, the Sunday-born. Features the Sankofa Adinkra symbol.',
    image: pi('akosua and kwasi t shirt1.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509722157/kwasi-sunday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 33, name: 'Kwadwo Monday Born T-Shirt', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Kwadwo, the Monday-born. Features the Sankofa Adinkra symbol.',
    image: pi('adwoa and kwadwo t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509183461/kwadwo-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 34, name: 'Adwoa Monday Born T-Shirt', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Adwoa, the Monday-born. Features the Sankofa Adinkra symbol.',
    image: pi('adwoa and kwadwo t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509182662/adwoa-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 35, name: 'Abena Tuesday Born T-Shirt', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Premium print',
    description: 'Premium heritage T-shirt for Abena, the Tuesday-born. Features the Gye Nyame Adinkra symbol.',
    image: pi('abena and kwabena t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509148768/abena-tuesday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 36, name: 'Akua Wednesday Born T-Shirt', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Akua, the Wednesday-born. Features the Sankofa Adinkra symbol.',
    image: pi('akua and kwaku t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509144676/akua-wednesday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 37, name: 'Yaa Thursday Born T-Shirt', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Yaa, the Thursday-born. Features the Sankofa Adinkra symbol.',
    image: pi('yaw and yaa t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4498855623/yaa-thursday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 38, name: 'Yaw Thursday Born T-Shirt', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Sankofa symbol · Premium print',
    description: 'Premium heritage T-shirt for Yaw, the Thursday-born. Features the Sankofa Adinkra symbol.',
    image: pi('yaw and yaa t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4498847502/yaw-thursday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // KWABENA T-SHIRT VARIANTS  (IDs 39, 41, 43, 45, 46)
  // IDs 40 (red) and 44 (red back) removed — red colourway discontinued.
  // ID 42 (black back) moved to gallery of ID 45 (folded).
  // ID 47 (military green alt) moved to gallery of ID 41.
  // ════════════════════════════════════════════════════════════
  {
    id: 39, name: 'Kwabena Tuesday Born T-Shirt — Blue', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Blue · Front & Sankofa Back',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. Blue colourway with Sankofa Adinkra symbol on the back.',
    image: pi('blue kwabena day born t shirt.png'),
    images: [
      pi('blue kwabena day born t shirt.png'),
      pi('back side of blue kwabena day born t shirt.png'),
    ],
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 41, name: 'Kwabena Tuesday Born T-Shirt — Military Green', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Military Green · Sankofa',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. Military green colourway with Sankofa Adinkra symbol.',
    image: pi('military green t shirt of kwabena day born.png'),
    images: [
      pi('military green t shirt of kwabena day born.png'),
      pi('military green t shirt of kwabena day born..png'),
    ],
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  // ID 43 merged into ID 39 gallery (Blue Sankofa Back now shown on ID 39 detail screen)
  { id: 43, hidden: true, name: 'Kwabena Tuesday Born T-Shirt — Blue Sankofa Back', bornDay: 'Tuesday', image: pi('back side of blue kwabena day born t shirt.png'), etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE },
  {
    id: 45, name: 'Kwabena Tuesday Born T-Shirt — Folded', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Black · Folded · Neckline detail',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. Folded display of the Black colourway — great for gifting.',
    image: pi('folded black kwabena day born t shirt.png'),
    images: [
      pi('folded black kwabena day born t shirt.png'),
      pi('black kwabena day born t shirt.png'),
      pi('back side of black kwabena day born t shirt.png'),
      pi('neck of black kwabena day born t shirt.png'),
    ],
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  // ID 46 merged into ID 45 gallery (Neckline Detail now shown on ID 45 detail screen)
  { id: 46, hidden: true, name: 'Kwabena Tuesday Born T-Shirt — Neckline Detail', bornDay: 'Tuesday', image: pi('neck of black kwabena day born t shirt.png'), etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE },

  // ════════════════════════════════════════════════════════════
  // KOFI T-SHIRT VARIANTS  (IDs 49, 54)
  // IDs 48 (neck side) and 51 (sankofa at back) moved to gallery of ID 27.
  // ID 52 (sankofa at.Back) moved to gallery of ID 49.
  // IDs 50 and 53 removed (files deleted — duplicates).
  // ID 55 (white sankofa back) moved to gallery of ID 54.
  // ════════════════════════════════════════════════════════════
  {
    id: 49, name: 'Kofi Friday Born T-Shirts', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Collection display',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. Collection display view showing multiple colourways.',
    image: pi('Kofi Friday Born Shirts.png'),
    images: [
      pi('Kofi Friday Born Shirts.png'),
      pi('Kofi Friday Born Shirt With Sankofa at.Back.png'),
    ],
    etsyUrl: KOFI_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 54, name: 'Kofi Friday Born T-Shirt — White', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'White · Sankofa symbol',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. White colourway with Sankofa Adinkra symbol on the back.',
    image: pi('kofi white t shirt.png'),
    images: [
      pi('kofi white t shirt.png'),
      pi('kofi white t shirt with Sankofa at Back.png'),
    ],
    etsyUrl: KOFI_ETSY, ...TSHIRT_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // NEW HOODIE  (ID 56)
  // ════════════════════════════════════════════════════════════
  // ID 56 hidden until winter — hoodie
  { id: 56, hidden: true, name: 'Kwabena & Abena Tuesday Born Hoodie', bornDay: 'Tuesday', image: pi('new kwabena and abena hoodie.png'), ...HOODIE_BASE },

  // ════════════════════════════════════════════════════════════
  // MUGS — hidden (IDs 57–64) — re-enable by removing hidden: true
  // ════════════════════════════════════════════════════════════
  {
    id: 57, hidden: true, name: 'Kwasi Sunday Born Mug', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Adinkra symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Kwasi, the Sunday-born. Features Adinkra symbol design — a powerful daily-use cultural gift.',
    image: pi('Kwasi Sunday Born Mug.png'),
    images: [pi('Kwasi Sunday Born Mug.png'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498481366/kwesi-sunday-born-mug-with-gye-nyame',
    ...MUG_BASE,
  },
  {
    id: 58, hidden: true, name: 'Kwame Saturday Born Mug', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Sankofa · 3 styles & colours',
    description: 'Premium ceramic heritage mug for Kwame, the Saturday-born. Features Sankofa Adinkra symbol across three colour variants — Black, Standard, and Light Blue.',
    image: pi('Kwame Saturday Born Mug .png'),
    images: [
      pi('Kwame Saturday Born Mug .png'),
      pi('Kwame Saturday Born Mug with Sankofa Symbol.png'),
      pi('Kwame Saturday Born Mug with Sankofa Symbols.png'),
      pi('Kwame Saturday Born light blue Mug with Sankofa Symbol.png'),
      GN_MUG,
    ],
    etsyUrl: 'https://www.etsy.com/listing/4498460184/kwame-saturday-born-mug-with-sankofa',
    ...MUG_BASE,
  },
  {
    id: 59, hidden: true, name: 'Akosua Sunday Born Mug', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Sankofa symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Akosua, the Sunday-born. Features the Sankofa Adinkra symbol — a beautiful daily-use gift.',
    image: pi('Akosua Sunday Born Mug.png'),
    images: [pi('Akosua Sunday Born Mug.png'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498452898/akosua-sunday-born-mug-with-sankofa',
    ...MUG_BASE,
  },
  {
    id: 60, hidden: true, name: 'Akua Wednesday Born Mug', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Sankofa symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Akua, the Wednesday-born. Features the Sankofa Adinkra symbol — a beautiful daily-use gift.',
    image: pi('Akua Wednesday Born Mug.png'),
    images: [pi('Akua Wednesday Born Mug.png'), pi('akua mugss.jpeg'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498395891/akua-wednesday-born-mug-with-sankofa',
    ...MUG_BASE,
  },
  {
    id: 61, hidden: true, name: 'Yaw Thursday Born Mug', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Yaw, the Thursday-born. Features the Gye Nyame Adinkra symbol — a meaningful cultural gift.',
    image: pi('Yaw Thursday Born Mug.png'),
    images: [pi('Yaw Thursday Born Mug.png'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498394403/yaw-thursday-born-mug-with-gye-nyame',
    ...MUG_BASE,
  },
  {
    id: 62, hidden: true, name: 'Yaa Thursday Born Mug', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Yaa, the Thursday-born. Features the Gye Nyame Adinkra symbol — a beautiful cultural gift.',
    image: pi('Yaa Thursday Born Mug.png'),
    images: [pi('Yaa Thursday Born Mug.png'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498394174/yaa-thursday-born-mug-with-gye-nyame',
    ...MUG_BASE,
  },
  {
    id: 63, hidden: true, name: 'Afia Friday Born Mug', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Gye Nyame symbol · Ceramic mug',
    description: 'Premium ceramic heritage mug for Afia, the Friday-born. Features the Gye Nyame Adinkra symbol — a powerful cultural gift.',
    image: pi('Afia Friday Born Mug.png'),
    images: [pi('Afia Friday Born Mug.png'), pi('afia mug-0.jpeg'), GN_MUG],
    etsyUrl: 'https://www.etsy.com/listing/4498383328/afia-friday-born-mug-with-gye-nyame',
    ...MUG_BASE,
  },
  {
    id: 64, hidden: true, name: 'Kofi Friday Born Mug', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Heritage design · Ceramic mug',
    description: 'Premium ceramic heritage mug for Kofi, the Friday-born. A meaningful daily-use gift celebrating Akan day-name tradition.',
    image: pi('Kofi Friday Born Mug.png'),
    images: [pi('Kofi Friday Born Mug.png'), pi('kofi mug.jpeg'), GN_MUG],
    ...MUG_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // BABY BODYSUITS  (IDs 65–80)
  // ════════════════════════════════════════════════════════════
  {
    id: 65, name: 'Akosua Sunday Born Baby Bodysuit', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: '7 colour options · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Akosua, the Sunday-born baby. Available in 7 colours: Orange, Pink, Cyan Blue, Charcoal, Heather Gray, Burnt Orange, and Red.',
    image: pi('Akosua Sunday Born Infant bright orange Bodysuit | Personalized Baby.png'),
    images: [
      pi('Akosua Sunday Born Infant bright orange Bodysuit | Personalized Baby.png'),
      pi('pink Akosua Sunday Born Infant Bodysuit | Personalized Baby.png'),
      pi('Akosua Sunday Born Infant cyan blue Bodysuit | Personalized Baby.png'),
      pi('Akosua Sunday Born Infant charcoal  Bodysuit | Personalized Baby.png'),
      pi('Akosua Sunday Born Infant heather gray Bodysuit | Personalized Baby.png'),
      pi('Akosua Sunday Born Infant orange color Bodysuit | Personalized Baby.png'),
      pi('Akosua Sunday Born Infant red Bodysuit | Personalized Baby.png'),
    ],
    etsyUrl: 'https://www.etsy.com/listing/4509973094/akosua-sunday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 66, name: 'Kwasi Sunday Born Baby Bodysuit', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Multiple colours · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kwasi, the Sunday-born baby. A meaningful cultural gift for newborns celebrating their Akan day-name identity.',
    image: pi('Kwesi Sunday Born babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509971546/kwasi-sunday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 67, name: 'Adjoa Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Adjoa, the Monday-born baby. A beautiful cultural gift for newborns.',
    image: pi('Adjoa Monday Born babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509872059/adjoa-monday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 68, name: 'Adwoa Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'White · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Adwoa, the Monday-born baby. White colourway — a beautiful cultural gift for newborns.',
    image: pi('Adwoa Monday Born white babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509900109/adwoa-monday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 69, name: 'Kojo Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Black · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kojo, the Monday-born baby. Black colourway — a meaningful cultural gift for newborns.',
    image: pi('Kojo Monday Born black babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509851193/kojo-monday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 70, name: 'Kwadwo Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Black · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kwadwo, the Monday-born baby. A meaningful cultural gift for newborns celebrating their Akan day-name identity.',
    image: pi('Kwadwo Monday Born black babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509879559/kwadwo-monday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 71, name: 'Abena Tuesday Born Baby Bodysuit', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Black & White options',
    description: 'Personalized heritage infant bodysuit for Abena, the Tuesday-born baby. Available in Black and White colourways.',
    image: pi('Abena Tuesday Born babysuit.png'),
    images: [pi('Abena Tuesday Born babysuit.png'), pi('Abena Tuesday Born babysuit white.png')],
    etsyUrl: 'https://www.etsy.com/listing/4509919401/abena-tuesday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 72, name: 'Kwabena Tuesday Born Baby Bodysuit', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kwabena, the Tuesday-born baby. A meaningful cultural gift for newborns.',
    image: pi('Kwabena Tuesday Born babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509917760/kwabena-tuesday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 73, name: 'Kwaku Wednesday Born Baby Bodysuit', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Black & White options · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kwaku, the Wednesday-born baby. Available in Black and White colourways — a meaningful cultural gift for newborns.',
    image: pi('baby-wearing-black-kweku-babysuit.png'),
    images: [
      pi('baby-wearing-black-kweku-babysuit.png'),
      pi('kwaku Tuesday Born white babysuit.png'),
    ],
    etsyUrl: 'https://www.etsy.com/listing/4509935302/kwaku-wednesday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 74, name: 'Akua Wednesday Born Baby Bodysuit', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Multiple colours · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Akua, the Wednesday-born baby. Available in multiple colour options.',
    image: pi('Akua Wednesday Born babysuit.png'),
    images: [pi('Akua Wednesday Born babysuit.png'), pi('akua Wednesday Born  babysuit.png')],
    etsyUrl: 'https://www.etsy.com/listing/4509944012/akua-wednesday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 75, name: 'Yaa Thursday Born Baby Bodysuit', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Yaa, the Thursday-born baby. A beautiful cultural gift for newborns celebrating their Akan day-name identity.',
    image: pi('yaa Friday Born  babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509955569/yaa-thursday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 76, name: 'Yaw Thursday Born Baby Bodysuit', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Yaw, the Thursday-born baby. A meaningful cultural gift for newborns.',
    image: pi('aw Thursday Born babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509951920/yaw-thursday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 77, name: 'Afia Friday Born Baby Bodysuit', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Afia, the Friday-born baby. A beautiful cultural gift for newborns celebrating their Akan day-name identity.',
    image: pi('Afia Friday Born babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509961296/afia-friday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 78, name: 'Kofi Friday Born Baby Bodysuit', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Heritage design · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kofi, the Friday-born baby. A meaningful cultural gift for newborns.',
    image: pi('Kofi Friday Born  babysuit.png'),
    etsyUrl: 'https://www.etsy.com/listing/4509959700/kofi-friday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 79, name: 'Ama Saturday Born Baby Bodysuit', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Black & White options',
    description: 'Personalized heritage infant bodysuit for Ama, the Saturday-born baby. Available in Black and White colourways.',
    image: pi('Ama Saturday Born babysuit.png'),
    images: [
      pi('Ama Saturday Born babysuit.png'),
      pi('Ama Saturday Born white babysuit.png'),
      pi('ama day bron white babysuit.jpeg'),
    ],
    etsyUrl: 'https://www.etsy.com/listing/4509964981/ama-saturday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },
  {
    id: 80, name: 'Kwame Saturday Born Baby Bodysuit', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Black & White options',
    description: 'Personalized heritage infant bodysuit for Kwame, the Saturday-born baby. Available in Black and White colourways.',
    image: pi('Kwame Saturday Born babysuit balck.png'),
    images: [
      pi('Kwame Saturday Born babysuit balck.png'),
      pi('Kwame Saturday Born babysuit white.png'),
      pi('kwame white babysuit.jpeg'),
    ],
    etsyUrl: 'https://www.etsy.com/listing/4509964766/kwame-saturday-born-infant-bodysuit',
    ...BABYSUIT_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // NEW T-SHIRT VARIANTS FROM ADDED IMAGES  (IDs 81–93)
  // ════════════════════════════════════════════════════════════
  {
    id: 81, name: 'Kwabena Tuesday Born T-Shirt — White', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'White · Premium print',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. White colourway featuring the heritage Adinkra symbol.',
    image: pi('kwabena day born white t shirtss.jpeg'),
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 82, name: 'Kwabena Tuesday Born White T-Shirts', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'White · Collection view',
    description: 'Premium heritage T-shirts for Kwabena, the Tuesday-born. White colourway collection display — beautiful heritage gifting.',
    image: pi('kwabena white t shirts.jpeg'),
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 83, name: 'Kwadwo Monday Born T-Shirt — Black', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Black · Adinkra symbol',
    description: 'Premium heritage T-shirt for Kwadwo, the Monday-born. Black colourway featuring the heritage Adinkra symbol.',
    image: pi('kwadwo balck t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509183461/kwadwo-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 84, name: 'Adwoa Monday Born T-Shirt — Black', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Black · Adinkra symbol',
    description: 'Premium heritage T-shirt for Adwoa, the Monday-born. Black colourway featuring the heritage Adinkra symbol.',
    image: pi('adwoa blck t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509182662/adwoa-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 85, name: 'Adwoa Monday Born T-Shirt — Back View', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Back view · Adinkra symbol',
    description: 'Premium heritage T-shirt for Adwoa, the Monday-born. Back view showing the full Adinkra symbol design.',
    image: pi('adwoa back t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509182662/adwoa-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 86, name: 'Akua Wednesday Born T-Shirt — Blue', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Blue · Adinkra symbol',
    description: 'Premium heritage T-shirt for Akua, the Wednesday-born. Blue colourway featuring the heritage Adinkra symbol.',
    image: pi('akua blue t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509144676/akua-wednesday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 87, name: 'Ama Saturday Born T-Shirt — Black', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Black · Adinkra symbol',
    description: 'Premium heritage T-shirt for Ama, the Saturday-born. Black colourway featuring the heritage Adinkra symbol.',
    image: pi('ama balck t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509773045/ama-saturday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 88, name: 'Abena Tuesday Born T-Shirt — Red', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Red · Adinkra symbol',
    description: 'Premium heritage T-shirt for Abena, the Tuesday-born. Red colourway featuring the heritage Adinkra symbol.',
    image: pi('abena red t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509148768/abena-tuesday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 89, name: 'Yaa Thursday Born T-Shirt — Gray', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Gray · Adinkra symbol',
    description: 'Premium heritage T-shirt for Yaa, the Thursday-born. Gray colourway featuring the heritage Adinkra symbol.',
    image: pi('yaa gray t shirtss.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4498855623/yaa-thursday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 90, name: 'Yaw Thursday Born T-Shirt — Blue', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Blue · Collection view',
    description: 'Premium heritage T-shirt for Yaw, the Thursday-born. Blue colourway collection — heritage Adinkra symbol design.',
    image: pi('yaw blue collection.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4498847502/yaw-thursday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 91, name: 'Kwaku Wednesday Born T-Shirt — White', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'White · Adinkra symbol',
    description: 'Premium heritage T-shirt for Kwaku, the Wednesday-born. White colourway featuring the heritage Adinkra symbol.',
    image: pi('kwaku. white t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4514300702/kwaku-wednesday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 92, name: 'Afia Friday Born T-Shirt Collection', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Collection · Multiple styles',
    description: 'Premium heritage T-shirt collection for Afia, the Friday-born. Collection view showing the full range of Afia day-born styles.',
    image: pi('afia day born collection.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509811213/afia-friday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 93, name: 'Kwame Saturday Born T-Shirt Collection', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Collection · Multiple styles',
    description: 'Premium heritage T-shirt collection for Kwame, the Saturday-born. Collection view showing the full range of Kwame day-born styles.',
    image: pi('kwame t shirt collection.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509796378/kwame-saturday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // NEW T-SHIRT & BABYSUIT PRODUCTS FROM ADDED IMAGES  (IDs 95–117)
  // ════════════════════════════════════════════════════════════
  {
    id: 95, name: 'Kwaku Wednesday Born T-Shirt — White (Alt)', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'White · Heritage print',
    description: 'Premium heritage T-shirt for Kwaku, the Wednesday-born. Clean white colourway with heritage Adinkra symbol.',
    image: pi('kwaku white t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4514300702/kwaku-wednesday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 96, name: 'Akosua Sunday Born T-Shirt — Blue', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Blue · Adinkra symbol',
    description: 'Premium heritage T-shirt for Akosua, the Sunday-born. Blue colourway with Adinkra symbol — bold and beautiful.',
    image: pi('akosua t shirt blue color.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509760772/akosua-sunday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 97, name: 'Kofi Friday Born T-Shirt — White (Alt)', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'White · Premium cotton',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. White colourway with Sankofa heritage symbol.',
    image: pi('kofi t shirt white.jpeg'),
    etsyUrl: KOFI_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 98, name: 'Kwame Saturday Born T-Shirt — Black', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Black · Heritage print',
    description: 'Premium heritage T-shirt for Kwame, the Saturday-born. Bold black colourway with Adinkra symbol.',
    image: pi('kwame black t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509796378/kwame-saturday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 99, name: 'Afia Friday Born T-Shirt — White', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'White · Heritage Adinkra',
    description: 'Premium heritage T-shirt for Afia, the Friday-born. White colourway featuring the Adinkra symbol.',
    image: pi('afia day born white t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509811213/afia-friday-born-shirt-with-gye-nyame', ...TSHIRT_BASE,
  },
  {
    id: 100, name: 'Kwadwo Monday Born T-Shirt — Black (Alt)', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Black · Day-born print',
    description: 'Premium heritage T-shirt for Kwadwo, the Monday-born. Black colourway — strong, clean, and gift-ready.',
    image: pi('kwadwo day born black t shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509183461/kwadwo-monday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 101, name: 'Yaw Thursday Born T-Shirt — Blue (Men)', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Blue · Men\'s cut',
    description: 'Premium heritage T-shirt for Yaw, the Thursday-born. Blue colourway men\'s cut with Adinkra heritage symbol.',
    image: pi('yaw men blue t.shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4498847502/yaw-thursday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  {
    id: 102, name: 'Kwabena Tuesday Born T-Shirt — White (Alt)', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'White · Heritage print',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. White colourway with heritage Adinkra symbol.',
    image: pi('kwabena day born white t shirt.jpeg'),
    etsyUrl: KWABENA_ETSY, ...TSHIRT_BASE,
  },
  {
    id: 103, name: 'Ama Saturday Born T-Shirt — Black (Alt)', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Black · Adinkra symbol',
    description: 'Premium heritage T-shirt for Ama, the Saturday-born. Black colourway with heritage Adinkra design.',
    image: pi('ama day born  black t.shirt.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509773045/ama-saturday-born-shirt-with-sankofa', ...TSHIRT_BASE,
  },
  // New Baby Bodysuits
  {
    id: 104, name: 'Abena Tuesday Born Baby Bodysuit — Cream', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Cream · Toddler bodysuit',
    description: 'Soft heritage baby bodysuit for Abena, the Tuesday-born. Warm cream colourway — a beautiful cultural newborn gift.',
    image: pi('toddler abena cream baby suit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509919401/abena-tuesday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 105, name: 'Kofi Friday Born Baby Bodysuit — Blue', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Blue · Toddler bodysuit',
    description: 'Soft heritage baby bodysuit for Kofi, the Friday-born. Blue colourway — adorable and gift-ready.',
    image: pi('toddler kofi blue baby suit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509959700/kofi-friday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 106, name: 'Kwame Saturday Born Baby Bodysuit — Red', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Red · Infant bodysuit',
    description: 'Vibrant red heritage baby bodysuit for Kwame, the Saturday-born. Bold, adorable, and gift-ready.',
    image: pi('kwame kid red babysuit-0.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509964766/kwame-saturday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 107, name: 'Kwame Saturday Born Baby Bodysuit — Cream', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Cream · Infant bodysuit',
    description: 'Soft cream heritage baby bodysuit for Kwame, the Saturday-born. Warm, natural tone — a meaningful cultural gift.',
    image: pi('kwame day born cream babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509964766/kwame-saturday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 108, name: 'Kwasi Sunday Born Baby Bodysuit — White', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'White · Toddler bodysuit',
    description: 'Classic white heritage baby bodysuit for Kwasi, the Sunday-born. Clean, premium, and perfect as a cultural gift.',
    image: pi('toddler white kwasy day born babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509971546/kwasi-sunday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 109, name: 'Akosua Sunday Born Baby Bodysuit — Violet', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Violet · Infant bodysuit',
    description: 'Beautiful violet heritage baby bodysuit for Akosua, the Sunday-born. A unique and meaningful cultural gift.',
    image: pi('akosua day born voilet babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509973094/akosua-sunday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 110, name: 'Akua Wednesday Born Baby Bodysuit — Red', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Red · Infant bodysuit',
    description: 'Vibrant red heritage baby bodysuit for Akua, the Wednesday-born. Bold colour, meaningful heritage design.',
    image: pi('red akua day born babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509944012/akua-wednesday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 111, name: 'Kwaku Wednesday Born Baby Bodysuit — Red', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Red · Infant bodysuit',
    description: 'Bold red heritage baby bodysuit for Kwaku, the Wednesday-born. Soft, vibrant, and perfect as a cultural gift.',
    image: pi('kwaku day born red babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509935302/kwaku-wednesday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },
  {
    id: 112, name: 'Ama Saturday Born Baby Bodysuit — Yellow', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Yellow · Infant bodysuit',
    description: 'Warm yellow heritage baby bodysuit for Ama, the Saturday-born. Bright, cheerful, and a beautiful cultural gift.',
    image: pi('yellow ama day born babysuit.jpeg'),
    etsyUrl: 'https://www.etsy.com/listing/4509964981/ama-saturday-born-infant-bodysuit', ...BABYSUIT_BASE,
  },

  // ════════════════════════════════════════════════════════════
  // NEW ACCESSORY  (ID 113)
  // ════════════════════════════════════════════════════════════
  {
    id: 113, hidden: true, name: 'Ghana Visor Hat', bornDay: null,
    tagline: 'Afia Premium · Ghana Heritage', cardBlurb: 'Ghana heritage visor',
    description: 'Heritage visor hat celebrating Ghanaian culture. A stylish everyday accessory with a proud cultural statement — perfect as a gift or personal wear.',
    image: pi('ghana visor hat .jpeg'),
    type: 'hoodie', label: 'Hat',
    sizes: ['One Size'],
    sizeChart: [],
    price: 30,
    perfectFor: ['Cultural Appreciation', 'Heritage Gift', 'Birthday Gift', 'Everyday Wear'],
    details: ['Adjustable fit', 'Breathable fabric', 'Heritage design', 'Gift-ready'],
  },
];

// ─── ACTIVE AMAZON CATALOG ───────────────────────────────────────────────────
// Previous product images are commented out. The store, name generator, About
// page and home pop-up use the day-born product images below, sold on Amazon.
const AMAZON_PRODUCTS = [
  // ── Sunday — Akosua ──────────────────────────────────────────────────────
  {
    id: 201, name: 'Akosua Sunday Born Shirt — Gye Nyame Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Royal blue · Gye Nyame back',
    description: 'Premium heritage T-shirt for Akosua, the Sunday-born. Royal blue colourway with the AKOSUA day-born print on the front and the Gye Nyame Adinkra symbol on the back.',
    image: pi('sunday-borns/akosua/akosua-shirt-gyenyame-1.png'),
    images: [
      pi('sunday-borns/akosua/akosua-shirt-gyenyame-1.png'),
      pi('sunday-borns/akosua/akosua-shirt-gyenyame-3.png'),
      pi('sunday-borns/akosua/akosua-shirt-gyenyame-4.png'),
      pi('sunday-borns/akosua/akosua-shirt-gyenyame-2.jpg'),
    ],
    amazonUrl: 'https://www.amazon.com/dp/B0H58WLSV2?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Monday — Kojo / Kwadwo & Adwoa / Adjoa ───────────────────────────────
  {
    id: 210, name: 'Kojo Monday Born Shirt — Sankofa Back', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Navy · Sankofa back',
    description: 'Premium heritage T-shirt for Kojo (Kwadwo), the Monday-born. Navy colourway with the KOJO day-born print on the front and the Sankofa Adinkra symbol on the back.',
    image: pi('monday-borns/kwadwo/kojo-shirt-sankofa-1.png'),
    images: [pi('monday-borns/kwadwo/kojo-shirt-sankofa-1.png'), pi('monday-borns/kwadwo/kojo-shirt-sankofa-2.jpg'), pi('monday-borns/kwadwo/kojo-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H2WZXCNJ?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 211, name: 'Kojo Monday Born Shirt — Gye Nyame Back', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Navy · Gye Nyame back',
    description: 'Premium heritage T-shirt for Kojo (Kwadwo), the Monday-born. Navy colourway with the KOJO day-born print on the front and the Gye Nyame Adinkra symbol on the back.',
    image: pi('monday-borns/kwadwo/kojo-shirt-gyenyame-1.jpeg'),
    images: [pi('monday-borns/kwadwo/kojo-shirt-gyenyame-1.jpeg'), pi('monday-borns/kwadwo/kojo-shirt-gyenyame-2.jpg'), pi('monday-borns/kwadwo/kojo-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3HQ78MQ?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 212, name: 'Adwoa Monday Born Female Shirt', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: "Women's cut · Sankofa & Gye Nyame",
    description: 'Premium heritage T-shirt for Adwoa (Adjoa), the Monday-born. Fitted women’s cut with the ADWOA day-born print and your choice of Sankofa or Gye Nyame Adinkra symbol on the back.',
    image: pi('monday-borns/adwoa/adwoa-shirt-1.png'),
    images: [pi('monday-borns/adwoa/adwoa-shirt-1.png'), pi('monday-borns/adwoa/adwoa-shirt-2.png'), pi('monday-borns/adwoa/adwoa-shirt-3.png'), pi('monday-borns/adwoa/adwoa-shirt-4.png'), pi('monday-borns/adwoa/adwoa-shirt-5.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3HRDYFV?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 213, name: 'Kojo Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Soft cotton · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kojo (Kwadwo), the Monday-born baby. Soft, premium cotton with the KOJO day-born print.',
    image: pi('monday-borns/kwadwo/kojo-baby-1.png'),
    images: [pi('monday-borns/kwadwo/kojo-baby-1.png'), pi('monday-borns/kwadwo/kojo-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5DCV76Z?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 214, name: 'Adjoa Monday Born Baby Bodysuit', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Soft cotton · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Adjoa (Adwoa), the Monday-born baby. Soft, premium cotton with the ADJOA day-born print.',
    image: pi('monday-borns/adwoa/adjoa-baby-1.png'),
    images: [pi('monday-borns/adwoa/adjoa-baby-1.png'), pi('monday-borns/adwoa/adjoa-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5B2JGBB', ...BABYSUIT_BASE,
  },
  {
    id: 215, name: 'Adwoa Monday Born Mug — Sankofa', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Adwoa, the Monday-born. Features the ADWOA name with the Sankofa Adinkra symbol — a meaningful daily-use gift.',
    image: pi('monday-borns/adwoa/adwoa-mug-sankofa-card.png'),
    images: [pi('monday-borns/adwoa/adwoa-mug-sankofa-card.png'), pi('monday-borns/adwoa/adwoa-mug-sankofa-3.png'), pi('monday-borns/adwoa/adwoa-mug-sankofa-2.jpg'), pi('monday-borns/adwoa/adwoa-mug-sankofa-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BN6MN7?th=1', ...MUG_BASE,
  },
  {
    id: 216, name: 'Adwoa Monday Born Mug — Gye Nyame', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Adwoa, the Monday-born. Features the ADWOA name with the Gye Nyame Adinkra symbol — a meaningful daily-use gift.',
    image: pi('monday-borns/adwoa/adwoa-mug-gyenyame-card.png'),
    images: [pi('monday-borns/adwoa/adwoa-mug-gyenyame-card.png'), pi('monday-borns/adwoa/adwoa-mug-gyenyame-2.png'), pi('monday-borns/adwoa/adwoa-mug-gyenyame-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BN942Z?th=1', ...MUG_BASE,
  },
  {
    id: 217, name: 'Kwadwo Monday Born Mug — Gye Nyame', bornDay: 'Monday',
    tagline: 'Born on Monday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kwadwo, the Monday-born. Features the KWADWO name with the Gye Nyame Adinkra symbol — a meaningful daily-use gift.',
    image: pi('monday-borns/kwadwo/kwadwo-mug-gyenyame-card.png'),
    images: [pi('monday-borns/kwadwo/kwadwo-mug-gyenyame-card.png'), pi('monday-borns/kwadwo/kwadwo-mug-gyenyame-1.jpg'), pi('monday-borns/kwadwo/kwadwo-mug-gyenyame-2.png'), pi('monday-borns/kwadwo/kwadwo-mug-gyenyame-3.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BWBBT7', ...MUG_BASE,
  },

  // ── Tuesday — Abena & Kwabena ────────────────────────────────────────────
  {
    id: 220, name: 'Abena Tuesday Born Mug — Gye Nyame', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Abena, the Tuesday-born. Features the ABENA name with the Gye Nyame Adinkra symbol.',
    image: pi('tuesday-borns/abena/abena-mug-gyenyame-card.png'),
    images: [pi('tuesday-borns/abena/abena-mug-gyenyame-card.png'), pi('tuesday-borns/abena/abena-mug-gyenyame-2.jpg'), pi('tuesday-borns/abena/abena-mug-gyenyame-1.png'), pi('tuesday-borns/abena/abena-mug-gyenyame-3.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BZRNLK?th=1', ...MUG_BASE,
  },
  {
    id: 221, name: 'Abena Tuesday Born Mug — Sankofa', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Abena, the Tuesday-born. Features the ABENA name with the Sankofa Adinkra symbol.',
    image: pi('tuesday-borns/abena/abena-mug-sankofa-card.png'),
    images: [pi('tuesday-borns/abena/abena-mug-sankofa-card.png'), pi('tuesday-borns/abena/abena-mug-sankofa-2.jpg'), pi('tuesday-borns/abena/abena-mug-sankofa-1.png'), pi('tuesday-borns/abena/abena-mug-sankofa-3.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BTRF98', ...MUG_BASE,
  },
  {
    id: 222, name: 'Kwabena Tuesday Born Mug — Sankofa', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Kwabena, the Tuesday-born. Features the KWABENA name with the Sankofa Adinkra symbol.',
    image: pi('tuesday-borns/kwabena/kwabena-mug-sankofa-card.png'),
    images: [pi('tuesday-borns/kwabena/kwabena-mug-sankofa-card.png'), pi('tuesday-borns/kwabena/kwabena-mug-sankofa-3.jpg'), pi('tuesday-borns/kwabena/kwabena-mug-sankofa-1.png'), pi('tuesday-borns/kwabena/kwabena-mug-sankofa-2.png'), pi('tuesday-borns/kwabena/kwabena-mug-sankofa-4.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BR541V', ...MUG_BASE,
  },
  {
    id: 223, name: 'Kwabena Tuesday Born Mug — Gye Nyame', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kwabena, the Tuesday-born. Features the KWABENA name with the Gye Nyame Adinkra symbol.',
    image: pi('tuesday-borns/kwabena/kwabena-mug-gyenyame-card.png'),
    images: [pi('tuesday-borns/kwabena/kwabena-mug-gyenyame-card.png'), pi('tuesday-borns/kwabena/kwabena-mug-gyenyame-3.png'), pi('tuesday-borns/kwabena/kwabena-mug-gyenyame-1.jpg'), pi('tuesday-borns/kwabena/kwabena-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BMG5X4', ...MUG_BASE,
  },
  {
    id: 224, name: 'Kwabena Tuesday Born Baby Bodysuit', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Soft cotton · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Kwabena, the Tuesday-born baby. Soft, premium cotton with the KWABENA day-born print.',
    image: pi('tuesday-borns/kwabena/kwabena-baby-1.png'),
    images: [pi('tuesday-borns/kwabena/kwabena-baby-1.png'), pi('tuesday-borns/kwabena/kwabena-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5FN245C?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 225, name: 'Abena Tuesday Born Baby Bodysuit', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Soft cotton · Infant bodysuit',
    description: 'Personalized heritage infant bodysuit for Abena, the Tuesday-born baby. Soft, premium cotton with the ABENA day-born print.',
    image: pi('tuesday-borns/abena/abena-baby-1.png'),
    images: [pi('tuesday-borns/abena/abena-baby-1.png'), pi('tuesday-borns/abena/abena-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5D5SZK4?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 226, name: 'Kwabena Tuesday Born Shirt — Gye Nyame Back', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. KWABENA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('tuesday-borns/kwabena/kwabena-shirt-gyenyame-1.png'),
    images: [pi('tuesday-borns/kwabena/kwabena-shirt-gyenyame-1.png'), pi('tuesday-borns/kwabena/kwabena-shirt-gyenyame-2.jpg'), pi('tuesday-borns/kwabena/kwabena-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58N3JF6?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 227, name: 'Kwabena Tuesday Born Shirt — Sankofa Back', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kwabena, the Tuesday-born. KWABENA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('tuesday-borns/kwabena/kwabena-shirt-sankofa-1.png'),
    images: [pi('tuesday-borns/kwabena/kwabena-shirt-sankofa-1.png'), pi('tuesday-borns/kwabena/kwabena-shirt-sankofa-2.jpg'), pi('tuesday-borns/kwabena/kwabena-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3J8K7NX?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 228, name: 'Abena Tuesday Born Shirt — Sankofa Back', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Abena, the Tuesday-born. ABENA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('tuesday-borns/abena/abena-shirt-sankofa-1.png'),
    images: [pi('tuesday-borns/abena/abena-shirt-sankofa-1.png'), pi('tuesday-borns/abena/abena-shirt-sankofa-2.png'), pi('tuesday-borns/abena/abena-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3MPXCSF?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 229, name: 'Abena Tuesday Born Shirt — Gye Nyame Back', bornDay: 'Tuesday',
    tagline: 'Born on Tuesday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Abena, the Tuesday-born. ABENA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('tuesday-borns/abena/abena-shirt-gyenyame-1.png'),
    images: [pi('tuesday-borns/abena/abena-shirt-gyenyame-1.png'), pi('tuesday-borns/abena/abena-shirt-gyenyame-2.jpg'), pi('tuesday-borns/abena/abena-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3MVVT3V?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Wednesday — Akua & Kwaku ─────────────────────────────────────────────
  {
    id: 230, name: 'Akua Wednesday Born Mug — Gye Nyame', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Akua, the Wednesday-born. Features the AKUA name with the Gye Nyame Adinkra symbol.',
    image: pi('wednesday-borns/akua/akua-mug-gyenyame-card.png'),
    images: [pi('wednesday-borns/akua/akua-mug-gyenyame-card.png'), pi('wednesday-borns/akua/akua-mug-gyenyame-3.jpg'), pi('wednesday-borns/akua/akua-mug-gyenyame-1.png'), pi('wednesday-borns/akua/akua-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BM22NV', ...MUG_BASE,
  },
  {
    id: 231, name: 'Akua Wednesday Born Mug — Sankofa', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Akua, the Wednesday-born. Features the AKUA name with the Sankofa Adinkra symbol.',
    image: pi('wednesday-borns/akua/akua-mug-sankofa-card.png'),
    images: [pi('wednesday-borns/akua/akua-mug-sankofa-card.png'), pi('wednesday-borns/akua/akua-mug-gyenyame-3.jpg'), pi('wednesday-borns/akua/akua-mug-sankofa-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BLBGRF', ...MUG_BASE,
  },
  {
    id: 232, name: 'Kwaku Wednesday Born Mug — Sankofa', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Kwaku, the Wednesday-born. Features the KWAKU name with the Sankofa Adinkra symbol.',
    image: pi('wednesday-borns/kwaku/kwaku-mug-sankofa-card.png'),
    images: [pi('wednesday-borns/kwaku/kwaku-mug-sankofa-card.png'), pi('wednesday-borns/kwaku/kwaku-mug-sankofa-3.jpg'), pi('wednesday-borns/kwaku/kwaku-mug-sankofa-1.png'), pi('wednesday-borns/kwaku/kwaku-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BKJS7B', ...MUG_BASE,
  },
  {
    id: 233, name: 'Kwaku Wednesday Born Mug — Gye Nyame', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kwaku, the Wednesday-born. Features the KWAKU name with the Gye Nyame Adinkra symbol.',
    image: pi('wednesday-borns/kwaku/kwaku-mug-gyenyame-card.png'),
    images: [pi('wednesday-borns/kwaku/kwaku-mug-gyenyame-card.png'), pi('wednesday-borns/kwaku/kwaku-mug-gyenyame-3.jpg'), pi('wednesday-borns/kwaku/kwaku-mug-gyenyame-1.png'), pi('wednesday-borns/kwaku/kwaku-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BLYVXY', ...MUG_BASE,
  },
  {
    id: 234, name: 'Akua Wednesday Born Baby Onesie', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Akua, the Wednesday-born baby. Soft, premium cotton with the AKUA day-born print.',
    image: pi('wednesday-borns/akua/akua-baby-1.png'),
    images: [pi('wednesday-borns/akua/akua-baby-1.png'), pi('wednesday-borns/akua/akua-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59R8Y9K?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 235, name: 'Kwaku Wednesday Born Baby Onesie', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Kwaku, the Wednesday-born baby. Soft, premium cotton with the KWAKU day-born print.',
    image: pi('wednesday-borns/kwaku/kwaku-baby-1.png'),
    images: [pi('wednesday-borns/kwaku/kwaku-baby-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5CXKVSN?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 236, name: 'Akua Wednesday Born Shirt — Sankofa Back', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Akua, the Wednesday-born. AKUA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('wednesday-borns/akua/akua-shirt-sankofa-2.png'),
    images: [pi('wednesday-borns/akua/akua-shirt-sankofa-2.png'), pi('wednesday-borns/akua/akua-shirt-sankofa-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3HZ5W8V?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 237, name: 'Akua Wednesday Born Shirt — Gye Nyame Back', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Akua, the Wednesday-born. AKUA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('wednesday-borns/akua/akua-shirt-gyenyame-2.png'),
    images: [pi('wednesday-borns/akua/akua-shirt-gyenyame-2.png'), pi('wednesday-borns/akua/akua-shirt-gyenyame-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3J6QJ16?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 238, name: 'Kwaku Wednesday Born Shirt — Sankofa Back', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kwaku, the Wednesday-born. KWAKU day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('wednesday-borns/kwaku/kwaku-shirt-sankofa-2.png'),
    images: [pi('wednesday-borns/kwaku/kwaku-shirt-sankofa-2.png'), pi('wednesday-borns/kwaku/kwaku-shirt-sankofa-3.jpg'), pi('wednesday-borns/kwaku/kwaku-shirt-sankofa-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58X1PW4?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 239, name: 'Kwaku Wednesday Born Shirt — Gye Nyame Back', bornDay: 'Wednesday',
    tagline: 'Born on Wednesday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kwaku, the Wednesday-born. KWAKU day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('wednesday-borns/kwaku/kwaku-shirt-gyenyame-2.png'),
    images: [pi('wednesday-borns/kwaku/kwaku-shirt-gyenyame-2.png'), pi('wednesday-borns/kwaku/kwaku-shirt-gyenyame-1.png'), pi('wednesday-borns/kwaku/kwaku-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Thursday — Yaa & Yaw ─────────────────────────────────────────────────
  {
    id: 240, name: 'Yaa Thursday Born Mug — Sankofa', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Yaa, the Thursday-born. Features the YAA name with the Sankofa Adinkra symbol.',
    image: pi('thursday-borns/yaa/yaa-mug-sankofa-card.png'),
    images: [pi('thursday-borns/yaa/yaa-mug-sankofa-card.png'), pi('thursday-borns/yaa/yaa-mug-sankofa-3.jpg'), pi('thursday-borns/yaa/yaa-mug-sankofa-1.jpeg'), pi('thursday-borns/yaa/yaa-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', ...MUG_BASE,
  },
  {
    id: 241, name: 'Yaa Thursday Born Mug — Gye Nyame', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Yaa, the Thursday-born. Features the YAA name with the Gye Nyame Adinkra symbol.',
    image: pi('thursday-borns/yaa/yaa-mug-gyenyame-card.png'),
    images: [pi('thursday-borns/yaa/yaa-mug-gyenyame-card.png'), pi('thursday-borns/yaa/yaa-mug-gyenyame-3.jpg'), pi('thursday-borns/yaa/yaa-mug-gyenyame-1.png'), pi('thursday-borns/yaa/yaa-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', ...MUG_BASE,
  },
  {
    id: 242, name: 'Yaw Thursday Born Mug — Gye Nyame', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Yaw, the Thursday-born. Features the YAW name with the Gye Nyame Adinkra symbol.',
    image: pi('thursday-borns/yaw/yaw-mug-gyenyame-card.png'),
    images: [pi('thursday-borns/yaw/yaw-mug-gyenyame-card.png'), pi('thursday-borns/yaw/yaw-mug-gyenyame-3.jpg'), pi('thursday-borns/yaw/yaw-mug-gyenyame-1.png'), pi('thursday-borns/yaw/yaw-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BQR2FD?th=1', ...MUG_BASE,
  },
  {
    id: 243, name: 'Yaw Thursday Born Mug — Sankofa', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Yaw, the Thursday-born. Features the YAW name with the Sankofa Adinkra symbol.',
    image: pi('thursday-borns/yaw/yaw-mug-sankofa-card.png'),
    images: [pi('thursday-borns/yaw/yaw-mug-sankofa-card.png'), pi('thursday-borns/yaw/yaw-mug-sankofa-3.jpg'), pi('thursday-borns/yaw/yaw-mug-sankofa-1.jpeg'), pi('thursday-borns/yaw/yaw-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BTP4GV', ...MUG_BASE,
  },
  {
    id: 244, name: 'Yaa Thursday Born Baby Onesie', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Yaa, the Thursday-born baby. Soft, premium cotton with the YAA day-born print.',
    image: pi('thursday-borns/yaa/yaa-baby-1.png'),
    images: [pi('thursday-borns/yaa/yaa-baby-1.png'), pi('thursday-borns/yaa/yaa-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59GDCYD?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 245, name: 'Yaw Thursday Born Baby Onesie', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Yaw, the Thursday-born baby. Soft, premium cotton with the YAW day-born print.',
    image: pi('thursday-borns/yaw/yaw-baby-1.png'),
    images: [pi('thursday-borns/yaw/yaw-baby-1.png'), pi('thursday-borns/yaw/yaw-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59TQ4DL?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 246, name: 'Yaa Thursday Born Shirt — Sankofa Back', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Yaa, the Thursday-born. YAA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('thursday-borns/yaa/yaa-shirt-sankofa-1.png'),
    images: [pi('thursday-borns/yaa/yaa-shirt-sankofa-1.png'), pi('thursday-borns/yaa/yaa-shirt-sankofa-2.jpg'), pi('thursday-borns/yaa/yaa-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3J6JY17?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 247, name: 'Yaa Thursday Born Shirt — Gye Nyame Back', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Yaa, the Thursday-born. YAA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('thursday-borns/yaa/yaa-shirt-gyenyame-1.png'),
    images: [pi('thursday-borns/yaa/yaa-shirt-gyenyame-1.png'), pi('thursday-borns/yaa/yaa-shirt-gyenyame-2.jpg'), pi('thursday-borns/yaa/yaa-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3JD7Z3B?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 248, name: 'Yaw Thursday Born Shirt — Gye Nyame Back', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Yaw, the Thursday-born. YAW day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('thursday-borns/yaw/yaw-shirt-gyenyame-1.png'),
    images: [pi('thursday-borns/yaw/yaw-shirt-gyenyame-1.png'), pi('thursday-borns/yaw/yaw-shirt-gyenyame-2.jpg'), pi('thursday-borns/yaw/yaw-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3JD7Z3B?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 249, name: 'Yaw Thursday Born Shirt — Sankofa Back', bornDay: 'Thursday',
    tagline: 'Born on Thursday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Yaw, the Thursday-born. YAW day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('thursday-borns/yaw/yaw-shirt-sankofa-1.png'),
    images: [pi('thursday-borns/yaw/yaw-shirt-sankofa-1.png'), pi('thursday-borns/yaw/yaw-shirt-sankofa-2.jpg'), pi('thursday-borns/yaw/yaw-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H598WHS8?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Friday — Kofi & Afia ─────────────────────────────────────────────────
  {
    id: 250, name: 'Kofi Friday Born Mug — Gye Nyame', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kofi, the Friday-born. Features the KOFI name on the front with the Gye Nyame Adinkra symbol.',
    image: pi('friday-borns/kofi/kofi-mug-gyenyame-card.png'),
    images: [pi('friday-borns/kofi/kofi-mug-gyenyame-card.png'), pi('friday-borns/kofi/kofi-mug-gyenyame-3.jpg'), pi('friday-borns/kofi/kofi-mug-gyenyame-2.png'), pi('friday-borns/kofi/kofi-mug-gyenyame-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59VLGGH', ...MUG_BASE,
  },
  {
    id: 251, name: 'Kofi Friday Born Mug — Sankofa', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Kofi, the Friday-born. Features the KOFI name on the front with the Sankofa Adinkra symbol.',
    image: pi('friday-borns/kofi/kofi-mug-sankofa-card.png'),
    images: [pi('friday-borns/kofi/kofi-mug-sankofa-card.png'), pi('friday-borns/kofi/kofi-mug-sankofa-3.jpg'), pi('friday-borns/kofi/kofi-mug-sankofa-1.png'), pi('friday-borns/kofi/kofi-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5B667J5', ...MUG_BASE,
  },
  {
    id: 252, name: 'Afia Friday Born Mug — Gye Nyame', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Afia, the Friday-born. Features the AFIA name on the front with the Gye Nyame Adinkra symbol.',
    image: pi('friday-borns/afia/afia-mug-gyenyame-card.png'),
    images: [pi('friday-borns/afia/afia-mug-gyenyame-card.png'), pi('friday-borns/afia/afia-mug-gyenyame-3.jpg'), pi('friday-borns/afia/afia-mug-gyenyame-1.png'), pi('friday-borns/afia/afia-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59ZS41J', ...MUG_BASE,
  },
  {
    id: 253, name: 'Afia Friday Born Mug — Sankofa', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Afia, the Friday-born. Features the AFIA name on the front with the Sankofa Adinkra symbol.',
    image: pi('friday-borns/afia/afia-mug-sankofa-card.png'),
    images: [pi('friday-borns/afia/afia-mug-sankofa-card.png'), pi('friday-borns/afia/afia-mug-sankofa-3.jpg'), pi('friday-borns/afia/afia-mug-sankofa-1.png'), pi('friday-borns/afia/afia-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H59RFLQ9', ...MUG_BASE,
  },
  {
    id: 254, name: 'Afia Friday Born Baby Onesie', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Afia, the Friday-born baby. Soft, premium cotton with the AFIA day-born print.',
    image: pi('friday-borns/afia/afia-baby-1.png'),
    images: [pi('friday-borns/afia/afia-baby-1.png'), pi('friday-borns/afia/afia-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BW8H5F?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 255, name: 'Kofi Friday Born Baby Onesie', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Kofi, the Friday-born baby. Soft, premium cotton with the KOFI day-born print.',
    image: pi('friday-borns/kofi/kofi-baby-1.png'),
    images: [pi('friday-borns/kofi/kofi-baby-1.png'), pi('friday-borns/kofi/kofi-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BSYK74?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 256, name: 'Afia Friday Born Shirt — Sankofa Back', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Afia, the Friday-born. AFIA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('friday-borns/afia/afia-shirt-sankofa-2.png'),
    images: [pi('friday-borns/afia/afia-shirt-sankofa-2.png'), pi('friday-borns/afia/afia-shirt-sankofa-1.png'), pi('friday-borns/afia/afia-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58XWNNX?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 257, name: 'Afia Friday Born Shirt — Gye Nyame Back', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Afia, the Friday-born. AFIA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('friday-borns/afia/afia-shirt-gyenyame-2.png'),
    images: [pi('friday-borns/afia/afia-shirt-gyenyame-2.png'), pi('friday-borns/afia/afia-shirt-gyenyame-1.png'), pi('friday-borns/afia/afia-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58RFZ49?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 258, name: 'Kofi Friday Born Shirt — Sankofa Back', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. KOFI day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('friday-borns/kofi/kofi-shirt-sankofa-3.jpg'),
    images: [pi('friday-borns/kofi/kofi-shirt-sankofa-3.jpg'), pi('friday-borns/kofi/kofi-shirt-sankofa-1.png'), pi('friday-borns/kofi/kofi-shirt-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58W8X8W?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 259, name: 'Kofi Friday Born Shirt — Gye Nyame Back', bornDay: 'Friday',
    tagline: 'Born on Friday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kofi, the Friday-born. KOFI day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('friday-borns/kofi/kofi-shirt-gyenyame-2.jpg'),
    images: [pi('friday-borns/kofi/kofi-shirt-gyenyame-2.jpg'), pi('friday-borns/kofi/kofi-shirt-gyenyame-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58T4FGX?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Saturday — Kwame & Ama ───────────────────────────────────────────────
  {
    id: 260, name: 'Ama Saturday Born Baby Onesie', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Ama, the Saturday-born baby. Soft, premium cotton with the AMA day-born print.',
    image: pi('saturday-borns/ama/ama-baby-1.png'),
    images: [pi('saturday-borns/ama/ama-baby-1.png'), pi('saturday-borns/ama/ama-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BWNNR5?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 261, name: 'Kwame Saturday Born Baby Onesie', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Kwame, the Saturday-born baby. Soft, premium cotton with the KWAME day-born print.',
    image: pi('saturday-borns/kwame/kwame-baby-1.png'),
    images: [pi('saturday-borns/kwame/kwame-baby-1.png'), pi('saturday-borns/kwame/kwame-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BSV45R?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 262, name: 'Kwame Saturday Born Mug — Gye Nyame', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kwame, the Saturday-born. Features the KWAME name on the front with the Gye Nyame Adinkra symbol.',
    image: pi('saturday-borns/kwame/kwame-mug-gyenyame-card.png'),
    images: [pi('saturday-borns/kwame/kwame-mug-gyenyame-card.png'), pi('saturday-borns/kwame/kwame-mug-gyenyame-3.jpg'), pi('saturday-borns/kwame/kwame-mug-gyenyame-1.png'), pi('saturday-borns/kwame/kwame-mug-gyenyame-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BR8FQ3', ...MUG_BASE,
  },
  {
    id: 263, name: 'Kwame Saturday Born Mug — Sankofa', bornDay: 'Saturday', soldOut: true,
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Kwame, the Saturday-born. Features the KWAME name on the front with the Sankofa Adinkra symbol. Currently out of stock.',
    image: pi('saturday-borns/kwame/kwame-mug-sankofa-card.png'),
    images: [pi('saturday-borns/kwame/kwame-mug-sankofa-card.png'), pi('saturday-borns/kwame/kwame-mug-sankofa-3.jpg'), pi('saturday-borns/kwame/kwame-mug-sankofa-1.png'), pi('saturday-borns/kwame/kwame-mug-sankofa-2.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5J11PLS', ...MUG_BASE,
  },
  {
    id: 264, name: 'Ama Saturday Born Shirt — Sankofa Back', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Ama, the Saturday-born. AMA day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('saturday-borns/ama/ama-shirt-sankofa-1.png'),
    images: [pi('saturday-borns/ama/ama-shirt-sankofa-1.png'), pi('saturday-borns/ama/ama-shirt-sankofa-3.png'), pi('saturday-borns/ama/ama-shirt-sankofa-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3SFDJX2?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 265, name: 'Ama Saturday Born Shirt — Gye Nyame Back', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Ama, the Saturday-born. AMA day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('saturday-borns/ama/ama-shirt-gyenyame-2.png'),
    images: [pi('saturday-borns/ama/ama-shirt-gyenyame-2.png'), pi('saturday-borns/ama/ama-shirt-gyenyame-1.png'), pi('saturday-borns/ama/ama-shirt-gyenyame-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3SDZ5T5?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 266, name: 'Kwame Saturday Born Shirt — Gye Nyame Back', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kwame, the Saturday-born. KWAME day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('saturday-borns/kwame/kwame-shirt-gyenyame-2.png'),
    images: [pi('saturday-borns/kwame/kwame-shirt-gyenyame-2.png'), pi('saturday-borns/kwame/kwame-shirt-gyenyame-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H58WZVCH?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 267, name: 'Kwame Saturday Born Shirt — Sankofa Back', bornDay: 'Saturday',
    tagline: 'Born on Saturday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kwame, the Saturday-born. KWAME day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('saturday-borns/kwame/kwame-shirt-sankofa-2.png'),
    images: [pi('saturday-borns/kwame/kwame-shirt-sankofa-2.png'), pi('saturday-borns/kwame/kwame-shirt-sankofa-1.png'), pi('saturday-borns/kwame/kwame-shirt-sankofa-3.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3SKZBHR?th=1&psc=1', ...TSHIRT_BASE,
  },

  // ── Sunday — Akosua, Kwasi & Kwesi ───────────────────────────────────────
  {
    id: 270, name: 'Akosua Sunday Born Shirt — Sankofa Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Royal blue · Sankofa back',
    description: 'Premium heritage T-shirt for Akosua, the Sunday-born. Royal blue colourway with the AKOSUA day-born print on the front and the Sankofa Adinkra symbol on the back.',
    image: pi('sunday-borns/akosua/akosua-shirt-sankofa-1.png'),
    images: [pi('sunday-borns/akosua/akosua-shirt-sankofa-1.png')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5925J6Y?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 271, name: 'Akosua Sunday Born Baby Onesie', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Akosua, the Sunday-born baby. Soft, premium cotton with the AKOSUA day-born print.',
    image: pi('sunday-borns/akosua/akosua-baby-1.png'),
    images: [pi('sunday-borns/akosua/akosua-baby-1.png'), pi('sunday-borns/akosua/akosua-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5D9SRCQ?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 272, name: 'Kwasi Sunday Born Baby Onesie', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Kwasi, the Sunday-born baby. Soft, premium cotton with the KWASI day-born print.',
    image: pi('sunday-borns/kwasi/kwasi-baby-1.png'),
    images: [pi('sunday-borns/kwasi/kwasi-baby-1.png'), pi('sunday-borns/kwasi/kwasi-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5CZNV1P?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 273, name: 'Kwesi Sunday Born Baby Onesie', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Soft cotton · Infant onesie',
    description: 'Personalized heritage infant onesie for Kwesi, the Sunday-born baby. Soft, premium cotton with the KWESI day-born print.',
    image: pi('sunday-borns/kwesi/kwesi-baby-1.png'),
    images: [pi('sunday-borns/kwesi/kwesi-baby-1.png'), pi('sunday-borns/kwesi/kwesi-baby-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BV7MD3?th=1&psc=1', ...BABYSUIT_BASE,
  },
  {
    id: 274, name: 'Kwesi Sunday Born Shirt — Gye Nyame Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kwesi, the Sunday-born. KWESI day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('sunday-borns/kwesi/kwesi-shirt-gyenyame-1.jpeg'),
    images: [pi('sunday-borns/kwesi/kwesi-shirt-gyenyame-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3J8H89G?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 275, name: 'Kwesi Sunday Born Shirt — Sankofa Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kwesi, the Sunday-born. KWESI day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('sunday-borns/kwesi/kwesi-shirt-sankofa-1.jpeg'),
    images: [pi('sunday-borns/kwesi/kwesi-shirt-sankofa-1.jpeg'), pi('sunday-borns/kwesi/kwesi-shirt-sankofa-2.jpg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3J2Z4HP?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 276, name: 'Kwasi Sunday Born Shirt — Gye Nyame Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Gye Nyame back',
    description: 'Premium heritage T-shirt for Kwasi, the Sunday-born. KWASI day-born print on the front with the Gye Nyame Adinkra symbol on the back.',
    image: pi('sunday-borns/kwasi/kwasi-shirt-gyenyame-1.jpeg'),
    images: [pi('sunday-borns/kwasi/kwasi-shirt-gyenyame-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3RJ79NN?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 277, name: 'Kwasi Sunday Born Shirt — Sankofa Back', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Sankofa back',
    description: 'Premium heritage T-shirt for Kwasi, the Sunday-born. KWASI day-born print on the front with the Sankofa Adinkra symbol on the back.',
    image: pi('sunday-borns/kwasi/kwasi-shirt-sankofa-1.jpeg'),
    images: [pi('sunday-borns/kwasi/kwasi-shirt-sankofa-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H3RDWFKR?th=1&psc=1', ...TSHIRT_BASE,
  },
  {
    id: 278, name: 'Akosua Sunday Born Mug — Sankofa', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Akosua, the Sunday-born. Features the AKOSUA name on the front with the Sankofa Adinkra symbol.',
    image: pi('sunday-borns/akosua/akosua-mug-sankofa-2.jpg'),
    images: [pi('sunday-borns/akosua/akosua-mug-sankofa-2.jpg'), pi('sunday-borns/akosua/akosua-mug-sankofa-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BPYLLH', ...MUG_BASE,
  },
  {
    id: 279, name: 'Akosua Sunday Born Mug — Gye Nyame', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Akosua, the Sunday-born. Features the AKOSUA name on the front with the Gye Nyame Adinkra symbol.',
    image: pi('sunday-borns/akosua/akosua-mug-gyenyame-2.jpg'),
    images: [pi('sunday-borns/akosua/akosua-mug-gyenyame-2.jpg'), pi('sunday-borns/akosua/akosua-mug-gyenyame-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BTPKTN', ...MUG_BASE,
  },
  {
    id: 280, name: 'Kwasi Sunday Born Mug — Sankofa', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Ceramic mug · Sankofa',
    description: 'Premium ceramic heritage mug for Kwasi, the Sunday-born. Features the KWASI name on the front with the Sankofa Adinkra symbol.',
    image: pi('sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg'),
    images: [pi('sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg'), pi('sunday-borns/kwasi/kwasi-mug-sankofa-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BNJ6TL', ...MUG_BASE,
  },
  {
    id: 281, name: 'Kwasi Sunday Born Mug — Gye Nyame', bornDay: 'Sunday',
    tagline: 'Born on Sunday · Akan Heritage', cardBlurb: 'Ceramic mug · Gye Nyame',
    description: 'Premium ceramic heritage mug for Kwasi, the Sunday-born. Features the KWASI name on the front with the Gye Nyame Adinkra symbol.',
    image: pi('sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg'),
    images: [pi('sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg'), pi('sunday-borns/kwasi/kwasi-mug-gyenyame-1.jpeg')],
    amazonUrl: 'https://www.amazon.com/dp/B0H5BM1WNS', ...MUG_BASE,
  },
];

// Previous catalog — kept for reference, no longer shown:
// export const products = [...INDIVIDUAL_PRODUCTS].filter((p) => !p.hidden);
export const products = AMAZON_PRODUCTS;

// ─── Active day-born helpers ─────────────────────────────────────────────────
// Surface "today's" day-born products (e.g. on a Tuesday show Tuesday-borns).
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getTodayBornDay(date = new Date()) {
  return DAY_NAMES[date.getDay()];
}

// All products whose bornDay matches today. Falls back to the full catalog
// only if (somehow) today has no products.
export function getActiveDayProducts(date = new Date()) {
  const day = getTodayBornDay(date);
  const todays = products.filter((p) => p.bornDay === day && !p.soldOut);
  return todays.length ? todays : products.filter((p) => !p.soldOut);
}

// A small, type-diverse set of today's day-born products (for the welcome pop-up).
export function getActiveDayFeatured(count = 3, date = new Date()) {
  const todays = getActiveDayProducts(date);
  const order = ['tshirt', 'mug', 'babysuit', 'hoodie'];
  const picked = [];
  const used = new Set();
  for (const t of order) {
    const p = todays.find((x) => x.type === t && !used.has(x.id));
    if (p) { picked.push(p); used.add(p.id); }
    if (picked.length >= count) break;
  }
  for (const p of todays) {
    if (picked.length >= count) break;
    if (!used.has(p.id)) { picked.push(p); used.add(p.id); }
  }
  return picked.slice(0, count);
}

// Today's day-born product for a given store category type — used by the
// homepage "Shop by Category" tiles so they reflect the active day-born.
export function pickActiveDayByType(type, date = new Date()) {
  const day = getTodayBornDay(date);
  return products.find((p) => p.bornDay === day && p.type === type && !p.soldOut)
      || products.find((p) => p.type === type && !p.soldOut);
}

export const STORE_BUNDLE_SETS = [
  {
    id: 'akan-family-set',
    title: 'Akan Family Heritage Set',
    subtitle: 'Adult Tee + Baby Bodysuit',
    desc: 'Celebrate your Akan day-born identity together — the premium Akosua adult day-born T-shirt paired with the matching Akua heritage baby onesie. Available on Amazon.',
    productIds: [201, 234],
  },
];

export function resolveStoreBundle(bundleId) {
  const def = STORE_BUNDLE_SETS.find((b) => b.id === bundleId);
  if (!def) return null;
  const items = def.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  if (!items.length) return null;
  return { id: def.id, title: def.title, subtitle: def.subtitle, desc: def.desc, productIds: def.productIds, items };
}
