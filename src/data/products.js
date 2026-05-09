const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

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

const productImage = (file) => encodeURI(`/images/${file}`);

/** Maps English weekday → filename fragments in public/images catalog. */
export const BORN_DAY_MARKERS = {
  Sunday: ['akosua', 'kwasi'],
  Monday: ['adwoa', 'kwadwo'],
  Tuesday: ['abena', 'kwabena'],
  Wednesday: ['akua', 'kwaku'],
  Thursday: ['yaw', 'yaa'],
  Friday: ['afia', 'kofi'],
  Saturday: ['ama', 'kwame'],
};

function inferBornDayFromFilename(file) {
  const l = file.toLowerCase();
  const days = Object.keys(BORN_DAY_MARKERS);
  for (let d = 0; d < days.length; d += 1) {
    const dayName = days[d];
    const markers = BORN_DAY_MARKERS[dayName];
    if (markers.some((m) => l.includes(m))) return dayName;
  }
  return null;
}

/** All storefront product photos in public/images (24). */
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
  base = base.replace(/\bt shirt\b/gi, 'T-Shirt');
  base = base.replace(/\babd\b/gi, 'and');
  base = base.replace(/\btubler\b/gi, 'Tumbler');
  const joined = base
    .split(' ')
    .map((w) => {
      if (w.toLowerCase() === 'and') return 'and';
      if (w === 'T-Shirt') return 'T-Shirt';
      if (/^mug\d+$/i.test(w)) return 'Mug';
      if (/^hoodie\d*$/i.test(w)) return 'Hoodie';
      if (/^tumbler\d*$/i.test(w)) return 'Tumbler';
      if (/^t-shirt\d+$/i.test(w)) return 'T-Shirt';
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
  return joined
    .replace(/\bMug\d+\b/g, 'Mug')
    .replace(/\bHoodie\d+\b/g, 'Hoodie')
    .replace(/\bT-Shirt\d+\b/g, 'T-Shirt')
    .replace(/\bTumbler\d+\b/g, 'Tumbler');
}

function inferTypeAndLabel(file) {
  const l = file.toLowerCase();
  if (l.includes('tubler') || l.includes('mug')) {
    return { type: 'mug', label: l.includes('tubler') ? 'Tumbler' : 'Mug' };
  }
  if (l.includes('t shirt') && l.includes('hoodie')) {
    return { type: 'hoodie', label: 'Hoodie & Tee' };
  }
  if (l.includes('t shirt')) {
    return { type: 'tshirt', label: 'T-Shirt' };
  }
  return { type: 'hoodie', label: 'Hoodie' };
}

function defaultPrice(type) {
  if (type === 'hoodie') return 70;
  if (type === 'tshirt') return 20;
  return 22;
}

export const products = CATALOG_FILES.map((file, i) => {
  const { type, label } = inferTypeAndLabel(file);
  const price = defaultPrice(type);
  const bornDay = inferBornDayFromFilename(file);
  return {
    id: i + 1,
    name: humanizeProductFilename(file),
    bornDay,
    tagline: 'Afia Premium — Heritage gifting',
    cardBlurb: 'Gift-ready · Premium print',
    description: `Premium ${label === 'Tumbler' ? 'drinkware' : label.toLowerCase()} from our Mother’s Day and Akan day-name collection. Gift-ready quality and meaningful design.`,
    price,
    type,
    label,
    image: productImage(file),
    sizes: type === 'mug' ? ['11oz', '15oz'] : SIZES,
    sizeChart: type === 'hoodie' ? HOODIE_CHART : type === 'tshirt' ? TSHIRT_CHART : [],
    perfectFor: ['Mother\'s Day', 'Heritage Gift', 'Gift for Mom', 'Cultural Appreciation'],
    details:
      type === 'mug'
        ? ['Quality ceramic', 'Glossy print', 'Available in 11oz and 15oz', 'Gift-ready']
        : ['Premium cotton blend', 'Comfortable fit', 'Durable print', 'Gift-ready presentation'],
  };
});

/**
 * Store “Signature” bundles: each `productIds` list is explicit `products[].id` values
 * (same order as `CATALOG_FILES`). Update ids if catalog order changes.
 * Current sets use the matching “I Love You Mommy” hoodie / T-shirt / mug trio.
 */
export const STORE_BUNDLE_SETS = [
  {
    id: 'mothers-signature',
    title: "Mother's Signature Set",
    subtitle: 'Hoodie + Mug',
    desc: 'A premium pairing designed for warmth and daily ritual.',
    productIds: [17, 18],
  },
  {
    id: 'heritage-everyday',
    title: 'Heritage Everyday Set',
    subtitle: 'T-Shirt + Mug',
    desc: 'An effortless heritage combo for daily wear and comfort.',
    productIds: [19, 18],
  },
  {
    id: 'legacy-premium',
    title: 'Legacy Premium Set',
    subtitle: 'Hoodie + T-Shirt + Mug',
    desc: 'A complete gift collection for meaningful celebrations.',
    productIds: [17, 19, 18],
  },
];

export function resolveStoreBundle(bundleId) {
  const def = STORE_BUNDLE_SETS.find((b) => b.id === bundleId);
  if (!def) return null;
  const items = def.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  if (!items.length) return null;
  return {
    id: def.id,
    title: def.title,
    subtitle: def.subtitle,
    desc: def.desc,
    productIds: def.productIds,
    items,
  };
}
