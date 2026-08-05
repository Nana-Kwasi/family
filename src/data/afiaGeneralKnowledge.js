const QA_TEMPLATES = [
  {
    id: 'akan-day-names',
    keywords: ['day name', 'akan name', 'soul name', 'birth name', 'kwasi', 'kwadwo', 'kwabena', 'kwaku', 'yaw', 'kofi', 'kwame', 'akosua', 'adwoa', 'abena', 'akua', 'yaa', 'ama', 'kojo'],
    reply: 'Akan day names are sacred markers of birth and destiny. They link you to the day you were born and to family memory.',
    variations: [
      'Many families treat the name as a blessing and a way to remember ancestors.',
      'The name is more than a word: it is family history and a spiritual rhythm.',
      'Day names are one of the simplest ways to connect with Akan culture.',
      'Each day name has its own meaning, mood, and message about the person who carries it.',
    ],
  },
  {
    id: 'festivals',
    keywords: ['festival', 'homowo', 'odwira', 'panafest', 'adae', 'yam festival', 'harvest festival'],
    reply: 'Ghanaian festivals mark harvest, remembrance, and renewal. They bring family, food, and ritual together.',
    variations: [
      'During these celebrations, people remember ancestors and renew their bonds to community.',
      'Each festival has songs, drumming, and shared meals that carry meaning across generations.',
      'Festivals are also a way of passing values from elders to children through story and ceremony.',
      'The rhythms of the festival calendar help people feel the passage of time in a cultural way.',
    ],
  },
  {
    id: 'adinkra-symbols',
    keywords: ['adinkra', 'symbol', 'gye nyame', 'sankofa', 'dwennimmen', 'adinkra symbol', 'symbol meaning'],
    reply: 'Adinkra symbols are visual proverbs. Each design carries a lesson about strength, wisdom, or faith.',
    variations: [
      'For example, Sankofa reminds us to return to the past and carry its wisdom forward.',
      'Gye Nyame means only God is supreme, and it is one of the most respected symbols.',
      'Adinkra art is taught across generations as a living philosophy, not just decoration.',
      'People wear and display these symbols to speak values without words.',
    ],
  },
  {
    id: 'twi-language',
    keywords: ['twi', 'language', 'greeting', 'phrase', 'akwaaba', 'medaase', 'please', 'thank you'],
    reply: 'Twi is a rich language spoken across much of Ghana. Simple greetings show respect and welcome.',
    variations: [
      'Akwaaba means welcome, and Medaase means thank you in Twi.',
      'Learning a few phrases helps people feel the warmth of Ghanaian culture.',
      'Twi phrases are often used to invite conversation and show kindness.',
      'Language is one of the best ways to connect with people and culture in Ghana.',
    ],
  },
  {
    id: 'ghanaian-food',
    keywords: ['food', 'jollof', 'fufu', 'banku', 'kenkey', 'waakye', 'soup', 'stew', 'pepper'],
    reply: 'Ghanaian food is a celebration of community. Meals like jollof, fufu, and banku are shared with family and friends.',
    variations: [
      'Food is also a way to tell stories about migration, harvest, and home.',
      'Many Ghanaian dishes are wrapped, mixed, and served in ways that show hospitality.',
      'The taste of a meal often carries the memory of a place and the people who made it.',
      'Ghanaian cuisine connects earth, market, and family in every bite.',
    ],
  },
  {
    id: 'ghana-history',
    keywords: ['history', 'independence', 'kingdom', 'ashanti', 'asante', 'gold coast', 'colonial'],
    reply: 'Ghana’s history is made of kingdoms, resistance, and independence. It reminds us that memory is a source of strength.',
    variations: [
      'The story of Ghana includes trade, empire, and the courage of people who defended their land.',
      'Independence in 1957 was a watershed moment that inspired many across Africa.',
      'History is preserved in monuments, songs, and the stories that families tell one another.',
      'Understanding history helps people see how the present is built on the choices of the past.',
    ],
  },
  {
    id: 'diaspora',
    keywords: ['diaspora', 'abroad', 'america', 'europe', 'homecoming', 'reconnect'],
    reply: 'The diaspora carries Ghanaian culture around the world. Many people keep heritage alive far from home.',
    variations: [
      'Diaspora stories often speak of longing, pride, and the search for belonging.',
      'People abroad still carry music, food, names, and values from Ghana.',
      'Homecoming can be both a physical return and a reconnection with memory and identity.',
      'Diaspora life often creates new traditions while preserving old ones.',
    ],
  },
  {
    id: 'proverbs',
    keywords: ['proverb', 'wise saying', 'wisdom', 'moral', 'saying'],
    reply: 'A Ghanaian proverb is a small story with a big lesson. It can teach patience, respect, and courage in a few words.',
    variations: [
      'People often use proverbs to advise one another gently and wisely.',
      'One proverb teaches that even a small day of work is better than a long season of waiting.',
      'Proverbs are sung and spoken in the market, the home, and the council fire.',
      'These sayings carry the voice of ancestors into daily life.',
    ],
  },
  {
    id: 'clans-family',
    keywords: ['clan', 'abusua', 'matrilineal', 'family', 'lineage', 'mother line'],
    reply: 'Akan clans and family lines shape identity and belonging. Many people trace their clan through the mother’s side.',
    variations: [
      'The clan system is also a way of remembering obligations and support networks.',
      'Family names, roles, and responsibilities often come through the abusua connection.',
      'Clan ties help people know who they are in relationship to others in the community.',
      'The maternal line is honored as a living bridge between ancestors and children.',
    ],
  },
  {
    id: 'stories-folktales',
    keywords: ['story', 'folktale', 'legend', 'myth', 'tale', 'anansi', 'golden stool'],
    reply: 'Ghanaian stories teach with clever heroes, tricksters, and symbols. They carry lessons about how to live well together.',
    variations: [
      'Anansi is a favorite trickster who often brings wisdom to humans in surprising ways.',
      'Folktales are rarely just entertainment; they are also guides for behavior and respect.',
      'The Golden Stool story reminds people that some objects hold the soul of a people.',
      'Stories help children remember values while also enjoying the drama of the tale.',
    ],
  },
];

const entriesPerTemplate = Math.ceil(1000 / QA_TEMPLATES.length);
export const AFIA_GENERAL_QA = QA_TEMPLATES.flatMap((template) =>
  Array.from({ length: entriesPerTemplate }, (_, index) => ({
    id: `${template.id}-${index + 1}`,
    keywords: template.keywords,
    reply: `${template.reply} ${template.variations[index % template.variations.length]}`.trim(),
  }))
).slice(0, 1000);

export function findGeneralKnowledgeReply(text) {
  const t = (text || '').toLowerCase();
  return AFIA_GENERAL_QA.find((entry) =>
    entry.keywords.some((keyword) => t.includes(keyword)),
  ) || null;
}
