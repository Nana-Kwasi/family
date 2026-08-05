/** Site map Afia can explain — label is shown as a tappable link in chat */

import AFIA_FOLKTALES_EXTRA from './afiaFolktalesExtended';

export const SITE_PAGES = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    aliases: ['home', 'homepage', 'main page', 'landing', 'name generator', 'day name generator', 'reveal your name'],
    summary: 'The Home page welcomes you with Akwaaba, introduces Mama Africa, and holds the Akan day-name generator — enter your birth date to reveal your sacred soul name and open your certificate.',
  },
  {
    id: 'result',
    label: 'Result',
    path: '/result',
    aliases: ['result', 'certificate', 'name result', 'name reveal', 'my name'],
    summary: 'The Result page shows your revealed Akan day name, meaning, and a downloadable certificate you can share with family or on social media.',
  },
  {
    id: 'about',
    label: 'About Mama Africa',
    path: '/about',
    aliases: ['about', 'mama africa', 'who is afia', 'afia story', 'meet afia'],
    summary: 'About Mama Africa introduces Afia — the Friday-born cultural ambassador — her mission, music, testimonials, and the living story behind this platform.',
  },
  {
    id: 'store',
    label: 'Store',
    path: '/store',
    aliases: ['store', 'shop', 'gifts', 'merch', 'products', 'buy'],
    summary: 'The Store offers heritage gifts — mugs, shirts, hoodies, and meaningful pieces inspired by Akan names, Adinkra, and legacy moments. Support chat lives here too.',
  },
  {
    id: 'stories',
    label: 'Stories',
    path: '/stories',
    aliases: ['stories', 'story', 'book', 'essays', 'outdooring', 'drums call home', 'folktales'],
    summary: 'Stories holds chapter storybooks, the Outdooring (Aba-Dinto) cultural guide, Drums Call Home, heritage essays on marriage and mourning, and community reflections.',
  },
  {
    id: 'culture',
    label: 'Culture Hub',
    path: '/culture',
    aliases: ['culture hub', 'culture screen', 'culture page', 'culture home'],
    summary: 'The Culture Hub is your map of Ghanaian heritage — today’s Akan day name, monthly festivals, proverbs, and doors into every cultural deep-dive.',
  },
  {
    id: 'adinkra',
    label: 'Adinkra Symbols',
    path: '/culture/adinkra',
    aliases: ['adinkra', 'symbols', 'sankofa symbol', 'gye nyame'],
    summary: 'Adinkra Symbols explains twenty sacred Akan marks — each one a philosophy of wisdom, faith, resilience, and love encoded in art.',
  },
  {
    id: 'twi',
    label: 'Twi Language',
    path: '/culture/twi',
    aliases: ['twi', 'language basics', 'twi phrases', 'learn twi'],
    summary: 'Twi Language Basics teaches greetings, family terms, numbers, and cultural phrases in Ghana’s most widely spoken tongue.',
  },
  {
    id: 'clans',
    label: 'Akan Clans',
    path: '/culture/clans',
    aliases: ['clans', 'abusua', 'clan system', 'matrilineal'],
    summary: 'Akan Clan System maps the eight matrilineal Abusua — identity, inheritance, and spiritual belonging through the mother’s line.',
  },
  {
    id: 'calendar',
    label: 'Cultural Calendar',
    path: '/culture/calendar',
    aliases: ['calendar', 'festivals', 'festival calendar', 'homowo', 'odwira', 'panafest'],
    summary: 'Cultural Calendar lists Ghana’s festivals and sacred days — from Homowo and Odwira to Independence Day and PANAFEST — with ways to mark them from anywhere.',
  },
  {
    id: 'village',
    label: 'Village Experience',
    path: '/culture/village',
    aliases: ['village', 'village experience', 'rural life'],
    summary: 'Village Experience walks you through everyday Ghanaian village life — rhythm, community, craft, and the social world beyond the city.',
  },
  {
    id: 'landscapes',
    label: 'Ghana Landscapes',
    path: '/culture/landscapes',
    aliases: ['landscapes', 'rivers', 'lakes', 'volta', 'geography', 'nature'],
    summary: 'Ghana Landscapes narrates the rivers, lakes, forests, and coastlines that shaped settlement, trade, and memory across the nation.',
  },
  {
    id: 'foods',
    label: 'Ghanaian Foods',
    path: '/culture/foods',
    aliases: ['foods', 'food', 'jollof', 'fufu', 'banku', 'waakye', 'cuisine'],
    summary: 'Ghanaian Foods celebrates the dishes that gather people — jollof, banku, waakye, soups, and the hospitality served on every plate.',
  },
  {
    id: 'diaspora',
    label: 'Diaspora Stories',
    path: '/diaspora',
    aliases: ['diaspora', 'diaspora stories', 'homecoming', 'abroad'],
    summary: 'Diaspora Stories shares real voices of reconnection — Black Americans and Africans in Europe finding their way back to heritage and community.',
  },
  {
    id: 'auth',
    label: 'Login',
    path: '/auth',
    aliases: ['login', 'sign in', 'auth', 'account login'],
    summary: 'Login lets you sign in to Mama Africa with email — save your journey and access your account.',
  },
  {
    id: 'account',
    label: 'Account',
    path: '/account',
    aliases: ['account', 'my account', 'profile'],
    summary: 'Your Account page holds your signed-in profile and personal settings on the platform.',
  },
];

export const AFIA_TOPIC_PROMPTS = [
  { id: 'home', label: 'Home & day names', prompt: 'What does the Home page do?' },
  { id: 'culture', label: 'Culture Hub', prompt: 'Tell me about the Culture Hub' },
  { id: 'store', label: 'Store & gifts', prompt: 'What is on the Store page?' },
  { id: 'stories', label: 'Stories & book', prompt: 'What is on the Stories page?' },
  { id: 'history', label: 'Ghana history', prompt: 'Teach me Ghanaian history' },
  { id: 'adinkra', label: 'Adinkra symbols', prompt: 'Tell me about Adinkra symbols' },
  { id: 'twi', label: 'Twi language', prompt: 'Help me learn Twi basics' },
  { id: 'names', label: 'Akan day names', prompt: 'How do Akan day names work?' },
  { id: 'diaspora', label: 'Diaspora', prompt: 'Tell me about the Diaspora page' },
  { id: 'about', label: 'About Mama Africa', prompt: 'Who is Mama Africa Afia?' },
  { id: 'site', label: 'All site pages', prompt: 'What pages are on this website?' },
  { id: 'stories-anansi', label: 'Anansi folktales', prompt: 'Tell me an Anansi story' },
  { id: 'stories-myths', label: 'Ghana myths', prompt: 'Tell me a Ghanaian myth' },
  { id: 'proverbs', label: 'Ghana proverbs', prompt: 'Teach me a Ghana proverb' },
];

export const AFIA_KNOWLEDGE_BANK = [
  {
    id: 'akan-names',
    keywords: ['day name', 'akan name', 'soul name', 'birth name', 'kwasi', 'kwadwo', 'kwabena', 'kwaku', 'yaw', 'kofi', 'kwame', 'akosua', 'adwoa', 'abena', 'akua', 'yaa', 'ama', 'kojo'],
    reply: 'Akan day names are sacred. They carry meaning, family memory, and a spiritual identity shaped by the day of birth. In Ghana, many families treat the name as a living blessing and a thread linking a person to ancestors.',
  },
  {
    id: 'festivals',
    keywords: ['festival', 'homowo', 'odwira', 'panafest', 'adae', 'harvest', 'ceremony'],
    reply: 'Ghanaian festivals mark time, harvest, ancestors, and community. Homowo celebrates abundance after famine, Odwira honors the ancestors, and PANAFEST gathers the African world in remembrance and celebration.',
  },
  {
    id: 'adinkra',
    keywords: ['adinkra', 'symbol', 'gye nyame', 'sankofa', 'dwennimmen'],
    reply: 'Adinkra symbols are visual proverbs. Gye Nyame means only God is supreme, while Sankofa asks us to return to our roots and learn from the past with wisdom.',
  },
  {
    id: 'language',
    keywords: ['twi', 'language', 'phrase', 'greeting', 'akwaaba', 'medaase'],
    reply: 'Twi is one of Ghana’s great languages. Akwaaba means welcome, and Medaase means thank you. Learning a little Twi opens a door to kindness, respect, and deeper connection.',
  },
  {
    id: 'foods',
    keywords: ['food', 'jollof', 'fufu', 'banku', 'kenkey', 'waakye', 'soup', 'stew'],
    reply: 'Ghanaian food is a way of gathering people. Jollof rice, fufu, banku, kenkey, waakye, and pepper soups often carry stories of family, hospitality, and celebration.',
  },
  {
    id: 'heritage',
    keywords: ['heritage', 'culture', 'tradition', 'roots', 'identity'],
    reply: 'Ghanaian heritage lives in names, stories, drums, cloth, proverbs, and ceremonies. When we care for these things, we care for memory itself.',
  },
  {
    id: 'proverbs',
    keywords: ['proverb', 'wise saying', 'wisdom', 'moral'],
    reply: 'A Ghanaian proverb often carries a whole philosophy in one line. One saying teaches that the same rain that wets the ground also teaches the farmer patience and humility.',
  },
  {
    id: 'history',
    keywords: ['history', 'independence', 'kingdom', 'ashanti', 'asante', 'gold coast'],
    reply: 'Ghana’s history stretches from powerful kingdoms and trade routes to the struggle for independence in 1957. The story of Ghana is not only political; it is also spiritual, cultural, and deeply human.',
  },
  {
    id: 'diaspora',
    keywords: ['diaspora', 'abroad', 'america', 'europe', 'homecoming'],
    reply: 'The diaspora keeps Ghanaian memory alive across oceans. Many people carry the language, values, and stories of home into new lands while still feeling the pull of ancestry.',
  },
  {
    id: 'drumming',
    keywords: ['drum', 'drumming', 'music', 'highlife', 'afrobeats'],
    reply: 'Drumming is a living archive in Ghana. It calls people to ceremony, celebration, mourning, and dance, and it often carries the rhythm of the community itself.',
  },
  {
    id: 'family',
    keywords: ['family', 'clan', 'abusua', 'mother', 'lineage'],
    reply: 'In many Akan communities, family identity is carried through the mother’s line. The clan is not only a social structure but a way of understanding belonging and responsibility.',
  },
  {
    id: 'stories',
    keywords: ['story', 'folktale', 'legend', 'myth', 'tale'],
    reply: 'Ghanaian stories teach by image and rhythm. They preserve lessons about cleverness, courage, greed, justice, and the hidden wisdom that lives in everyday life.',
  },
  {
    id: 'ancestors',
    keywords: ['ancestor', 'ancestors', 'spirit', 'memory', 'allegiance'],
    reply: 'Ancestors are remembered not as distant ghosts, but as living guides in many Ghanaian traditions. They shape etiquette, remembrance, and the moral compass of the living.',
  },
  {
    id: 'community',
    keywords: ['community', 'village', 'neighbourhood', 'home', 'people'],
    reply: 'Community is central in Ghanaian life. The village, the market, the family house, and the shared meal all remind us that identity grows through mutual care.',
  },
  {
    id: 'art',
    keywords: ['art', 'kente', 'cloth', 'weaving', 'design'],
    reply: 'Kente and other woven cloths carry meaning, history, and prestige. A design can speak of royalty, wisdom, love, and the values that a family wishes to pass on.',
  },
];

export const AFIA_FOLKTALES = [
  {
    id: 'anansi-pot',
    title: 'Anansi and the Pot of Wisdom',
    keywords: ['anansi', 'spider', 'wisdom', 'pot of wisdom', 'kwaku ananse'],
    intro: 'Here is a Ghanaian folktale about Kweku Ananse, the clever spider of Akan stories. ',
    parts: [
      'Kweku Anansi had heard that the sky-god kept a great pot of wisdom high above the earth, and he longed to taste its secrets.',
      'He climbed, tricked the sky-god, and carried the pot home, but the wisdom inside was so heavy that it spilled across the world in many small pieces.',
      'That is why wisdom now lives in many places: in the market, in the family house, in the songs of the elders, and in the minds of those who listen carefully.',
      'And so Anansi became known as both clever and restless, a trickster who brought knowledge to mankind, though never without a lesson of his own.',
    ],
    qa: {
      default: 'Anansi wanted wisdom because he believed that knowledge could help him outsmart danger and gain influence.',
      why: 'Anansi wanted wisdom because he believed that knowledge could help him outsmart danger and gain influence.',
      what: 'The pot of wisdom carried the deep knowledge of the world, and once it spilled, people gathered pieces of it in many forms.',
      who: 'Kweku Anansi is the clever spider hero of Akan folktales.',
    },
  },
  {
    id: 'anansi-sky',
    title: 'Anansi and the Sky God',
    keywords: ['anansi sky', 'sky god', 'anansi and the sky'],
    intro: 'Another Anansi tale begins with a bargain between the spider and the sky-god. ',
    parts: [
      'Anansi once asked the sky-god for a small share of the stories that belonged to the heavens, and the sky-god agreed to give him a basket of them.',
      'But Anansi was clever enough to make the basket heavier than it should have been, and the sky-god’s servants could not carry it without help.',
      'In the confusion, Anansi learned something important: every gift that comes from above still carries the weight of responsibility.',
      'So the tale teaches that cleverness is not the same thing as wisdom, and that power must be handled with care.',
    ],
    qa: {
      default: 'The lesson is that cleverness without care can become trouble, especially when one is given a gift that is larger than expected.',
      why: 'The lesson is that cleverness without care can become trouble, especially when one is given a gift that is larger than expected.',
      what: 'The basket of stories symbolized knowledge and the burden that comes with carrying it responsibly.',
    },
  },
  {
    id: 'golden-stool',
    title: 'The Golden Stool and the Spirit of the Ashanti',
    keywords: ['golden stool', 'ashanti', 'asante', 'stool', 'golden'],
    intro: 'Let me tell you a story of the Ashanti and the Golden Stool, a symbol of strength and memory. ',
    parts: [
      'The Golden Stool is said to hold the spirit of the Ashanti people, and it is treated with deep reverence because it represents the soul of the nation.',
      'To many, it is not simply an object of gold but a living sign of unity, dignity, and continuity across generations.',
      'In this tale, the stool stands for the idea that a people endure not only by strength, but by remembering who they are.',
      'That is why history, ritual, and symbolism are woven together in the life of the Ashanti people.',
    ],
    qa: {
      default: 'The Golden Stool symbolizes the spirit, unity, and cultural life of the Ashanti people.',
      what: 'The Golden Stool symbolizes the spirit, unity, and cultural life of the Ashanti people.',
      why: 'It is treated with reverence because it is believed to carry the soul of the nation and its collective memory.',
    },
  },
  // extend with externally maintained extended folktales
  ...AFIA_FOLKTALES_EXTRA,
];

export function findKnowledgeReply(text) {
  const t = (text || '').toLowerCase();
  return AFIA_KNOWLEDGE_BANK.find((entry) => entry.keywords.some((keyword) => t.includes(keyword))) || null;
}

export function findFolktale(text) {
  // Deprecated simple wrapper – use findFolktaleMatch for richer info in consumers
  const m = findFolktaleMatch(text);
  return m ? m.story : null;
}

function levenshtein(a, b) {
  if (!a || !b) return (a || b) ? Math.max((a || '').length, (b || '').length) : 0;
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function findFolktaleMatch(text) {
  const raw = (text || '').toLowerCase();
  const t = raw.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1) Exact id or title match or strong inclusion
  for (const story of AFIA_FOLKTALES) {
    const id = (story.id || '').toLowerCase();
    const titleNorm = (story.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!titleNorm) continue;
    if (t === id || t === titleNorm || id && t.includes(id) || titleNorm && (t.includes(titleNorm) || titleNorm.includes(t))) {
      return { story, matchType: 'exact' };
    }
  }

  // 2) Keyword match (fast)
  for (const story of AFIA_FOLKTALES) {
    if ((story.keywords || []).some((k) => t.includes((k || '').toLowerCase()))) {
      return { story, matchType: 'keyword' };
    }
  }

  // 3) Fuzzy title matching (Levenshtein) with adaptive threshold
  let best = null;
  let bestScore = Infinity;
  for (const story of AFIA_FOLKTALES) {
    const titleNorm = (story.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!titleNorm) continue;
    const dist = levenshtein(t, titleNorm);
    const thresh = Math.max(2, Math.floor(Math.min(titleNorm.length, Math.max(1, t.length)) * 0.25));
    if (dist <= thresh && dist < bestScore) {
      best = story;
      bestScore = dist;
    }
  }
  if (best) return { story: best, matchType: 'fuzzy' };

  return null;
}

export function findSitePage(text) {
  const t = (text || '').toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const page of SITE_PAGES) {
    let score = 0;
    if (t.includes(page.label.toLowerCase())) score += 3;
    for (const alias of page.aliases) {
      if (t.includes(alias)) score += alias.length > 6 ? 2 : 1;
    }
    if (page.id !== 'culture' && t.includes(page.id)) score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = page;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function findSitePageById(id) {
  return SITE_PAGES.find((p) => p.id === id) || null;
}
