import {
  SITE_PAGES,
  AFIA_TOPIC_PROMPTS,
  AFIA_KNOWLEDGE_BANK,
  AFIA_FOLKTALES,
  findSitePage,
  findSitePageById,
  findKnowledgeReply,
  findFolktale,
  findFolktaleMatch,
} from '../data/afiaSiteKnowledge';
import { findGeneralKnowledgeReply } from '../data/afiaGeneralKnowledge';

const DEV_NOTE =
  'I am still under development — Mama Africa is teaching me to carry our stories, names, and traditions with care.';

function pick(text) {
  return (text || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeText(text) {
  return pick(text)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/([a-z])\1{2,}/g, '$1$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalizeName(name) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function reply(parts, suggestions = null, action = null) {
  const segments = parts.map((part) => {
    if (typeof part === 'string') return { text: part };
    return { text: part.label, link: part.path };
  });
  return { segments, suggestions, action };
}

export function flattenReply({ segments }) {
  return (segments || []).map((s) => s.text).join('');
}

export function extractNameFromMessage(text) {
  const raw = (text || '').trim();
  const patterns = [
    /(?:^|[,.!?]\s*)(?:hi|hey|hello|akwaaba)[,.!?\s]*(?:i am|i'm|im)\s+([a-z][a-z\s'-]{1,30})/i,
    /(?:i am|i'm|im)\s+([a-z][a-z\s'-]{1,30}?)(?:\s*[,.\-–—]|\s+and\s+|\s+here\s+|\s+from\s+|\s+i\s+)/i,
    /my name is\s+([a-z][a-z\s'-]{1,30})/i,
    /(?:call me|they call me)\s+([a-z][a-z\s'-]{1,30})/i,
    /(?:this is)\s+([a-z][a-z\s'-]{1,30})(?:\s*[,.\-–—]|$)/i,
  ];

  for (const re of patterns) {
    const m = raw.match(re);
    if (m?.[1]) {
      const candidate = m[1].trim().replace(/\s+(here|from|and|to|i)\b.*$/i, '').trim();
      if (candidate.length >= 2 && candidate.length <= 32) {
        return capitalizeName(candidate);
      }
    }
  }
  return '';
}

function isAffirmative(text) {
  const t = normalizeText(text);
  return /^(yes|yeah|yep|sure|absolutely|okay|ok|definitely|go ahead|lets go|let us go|please do|do it|take me there|visit it|open it|show me|continue|keep going|carry on|go on|right)\b/.test(t)
    || /\b(yes|yeah|yep|sure|absolutely|okay|ok|continue|carry on|keep going|go on|please|right)\b/.test(t);
}

function isNegative(text) {
  const t = normalizeText(text);
  return /^(no|nope|not now|later|maybe later|skip|dont|never mind|pass)\b/.test(t)
    || /\b(no|nope|not now|later|maybe later|skip|dont|never mind|pass)\b/.test(t);
}

function detectIntents(t) {
  const normalized = normalizeText(t);
  return {
    greeting: /^(hi|hey|hello|akwaaba|good\s*(morning|afternoon|evening)|yo)\b/.test(normalized) || normalized.includes('hi afia') || normalized === 'afia',
    intro: /\b(i am|i'm|im|my name is|call me)\b/.test(normalized),
    storyRequest: /\b(story|stories|folktale|folktales|myth|myths|legend|legendary|anansi|kweku ananse|tell me a story|tell me about a story|tell me about anansi|story time|oral story)\b/.test(normalized),
    startBest: /\b(start with the best|start with best|best one|best story|suggest (a )?best)\b/.test(normalized),
    startCommand: /\b(start|begin|tell me|read|start with|begin with)\b/.test(normalized),
    storyQuestion: /\b(why|what|who|when|where|how|can you explain|question|tell me more|what happened|explain|meaning|why is|how come|did he|did she)\b/.test(normalized),
    learn: /\b(learn|teach|study|discover|explore|understand|know more|tell me about)\b/.test(normalized),
    history: /\b(history|historical|past|ancestors|colonial|independence|kingdom|empire|ashanti|asante)\b/.test(normalized),
    heritage: /\b(heritage|tradition|custom|culture|roots|identity|lineage|homecoming)\b/.test(normalized),
    ghana: /\b(ghana|ghanaian|west africa)\b/.test(normalized),
    akan: /\b(akan|twi|asante|fante|ga|ewe|adinkra|kente|sankofa)\b/.test(normalized),
    adinkra: /\b(adinkra|symbol|gye nyame|sankofa|dwennimmen)\b/.test(normalized),
    names: /\b(day name|soul name|birth name|kwasi|kwadwo|kwabena|kwaku|yaw|kofi|kwame|akosua|adwoa|abena|akua|yaa|afia|ama|kojo)\b/.test(normalized),
    festivals: /\b(festival|homowo|odwira|adae|panafest|yam|harvest|ceremony)\b/.test(normalized),
    food: /\b(food|jollof|fufu|banku|kenkey|waakye|soup|stew|pepper)\b/.test(normalized),
    wedding: /\b(wedding|marriage|bride|groom|dowry|engagement)\b/.test(normalized),
    funeral: /\b(funeral|mourning|burial|farewell)\b/.test(normalized),
    language: /\b(language|twi|phrase|greeting|translate|speak)\b/.test(normalized),
    clans: /\b(clan|abusua|matrilineal|family line)\b/.test(normalized),
    store: /\b(shop|store|gift|buy|mug|shirt|hoodie|merch)\b/.test(normalized),
    diaspora: /\b(diaspora|abroad|america|europe|return|reconnect)\b/.test(normalized),
    help: /\b(help|what can you do|what do you do|how do i|where do i|guide me)\b/.test(normalized),
    thanks: /\b(thank|thanks|medaase|appreciate)\b/.test(normalized),
    bye: /\b(bye|goodbye|see you|later|farewell)\b/.test(normalized),
    who: /\b(who are you|what are you|tell me about yourself)\b/.test(normalized),
    howAreYou: /\b(how are you|how you doing|hope you|are you ok)\b/.test(normalized),
    nice: /\b(nice|cool|awesome|great|wonderful|beautiful|love this)\b/.test(normalized),
    sorry: /\b(sorry|apologize|my bad)\b/.test(normalized),
    joke: /\b(joke|funny|laugh|humor)\b/.test(normalized),
    music: /\b(music|drum|highlife|afrobeats|song|dance)\b/.test(normalized),
    religion: /\b(god|church|mosque|faith|prayer|spiritual|christian|muslim)\b/.test(normalized),
    travel: /\b(visit|travel|trip|accra|kumasi|cape coast|flight)\b/.test(normalized),
    website: /\b(website|web\s*site|this\s*site|platform|pages?|screens?|sections?|menu|navbar|navigation)\b/.test(normalized),
    allPages: /\b(all pages|every page|what pages|list pages|site map|whole site|entire site)\b/.test(normalized),
  };
}

function pageReply(page, extra = '', followUp = null) {
  return reply([
    'On our ',
    { label: page.label, path: page.path },
    `: ${page.summary}${extra}`,
  ], null, followUp);
}

function learningReply(N, n) {
  return reply([
    `I am still learning that${n}, ${N}. Here is what I can help you with on Mama Africa right now — tap a topic and I will guide you:`,
  ], AFIA_TOPIC_PROMPTS);
}

function knowledgeReply(text, N, n) {
  const knowledge = findKnowledgeReply(text) || findGeneralKnowledgeReply(text);
  if (knowledge) {
    return reply([`${knowledge.reply}${n ? ` ${N}` : ''}`], AFIA_TOPIC_PROMPTS);
  }
  return learningReply(N, n);
}

function formatTitles(titles) {
  if (titles.length === 0) return '';
  if (titles.length === 1) return titles[0];
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(', ')}, and ${titles[titles.length - 1]}`;
}

function storyListReply(N) {
  const titles = AFIA_FOLKTALES.map((story) => story.title);
  const listText = formatTitles(titles);
  // Return the list without topic suggestions to avoid UI auto-navigation
  return reply([
    `I know ${titles.length} Ghanaian stories, ${N}: ${listText}.`,
    ' Which one would you like to hear first?',
  ], null);
}

function pickBestStory() {
  // prefer longest tale (most parts) as a reasonable "best" heuristic
  return AFIA_FOLKTALES.slice().sort((a, b) => (b.parts?.length || 0) - (a.parts?.length || 0))[0];
}

function storyReply(text, N, n, folktaleMatch = null, intents = {}) {
  const matchInfo = folktaleMatch || findFolktaleMatch ? findFolktaleMatch(text) : null;
  const tale = matchInfo ? matchInfo.story : findFolktale(text);
  if (!tale) {
    const normalized = normalizeText(text);
    if (/\b(list|all|titles|known|which ones|every)\b/.test(normalized)) {
      return storyListReply(N);
    }
    if (intents.startBest) {
      const best = pickBestStory();
      return reply([
        `I can do that${n}. May I start with what I think is the best: ${best.title}?`,
      ], null, { type: 'confirm_start', storyId: best.id, title: best.title });
    }
    return reply([
      `I can tell you a Ghanaian tale${n}, ${N}. I know stories about Kweku Anansi, the Golden Stool, and other folk wisdom from the Akan world.`,
    ], AFIA_TOPIC_PROMPTS);
  }
  // Decide whether to start immediately or ask confirmation
  const matchType = matchInfo?.matchType || 'keyword';
  const askedToStart = intents.startCommand;

  if (matchType === 'exact' || matchType === 'id' || askedToStart) {
    const intro = `${tale.intro}${tale.parts[0]}`;
    return reply([
      intro,
      ' Would you like me to continue the story, or do you have a question about what happened so far?',
    ], null, {
      type: 'story',
      storyId: tale.id,
      step: 1,
      title: tale.title,
      parts: tale.parts,
      qa: tale.qa,
      awaiting: 'continueOrQuestion',
    });
  }

  // For fuzzy or keyword matches without an explicit start command, ask to confirm
  return reply([
    `I think you mean "${tale.title}". Would you like me to start that story?`,
  ], null, { type: 'confirm_start', storyId: tale.id, title: tale.title });
}

function siteMapReply() {
  const parts = ['Mama Africa has many doors. Main pages: '];
  const main = SITE_PAGES.filter((p) => !['auth', 'account', 'result'].includes(p.id));
  main.slice(0, 8).forEach((p, i) => {
    if (i > 0) parts.push(', ');
    parts.push({ label: p.label, path: p.path });
  });
  parts.push('. Under Culture: ');
  ['adinkra', 'twi', 'clans', 'calendar', 'village', 'landscapes', 'foods'].forEach((id, i) => {
    const p = findSitePageById(id);
    if (!p) return;
    if (i > 0) parts.push(', ');
    parts.push({ label: p.label, path: p.path });
  });
  parts.push('. Tap any name to go there. ', DEV_NOTE);
  return reply(parts, AFIA_TOPIC_PROMPTS);
}

export function getAfiaReply(userText, { userName, followUp } = {}) {
  const t = pick(userText);
  const parsedName = extractNameFromMessage(userText);
  const name = capitalizeName(userName?.trim() || parsedName);
  const n = name ? `, ${name}` : '';
  const N = name || 'friend';
  const intents = detectIntents(t);
  const matchedPage = findSitePage(t);
  const generalKnowledge = findGeneralKnowledgeReply(t);
  // story match info
  const folktaleMatch = findFolktaleMatch ? findFolktaleMatch(t) : null;

  if (followUp?.type === 'story') {
    const tale = AFIA_FOLKTALES.find((item) => item.id === followUp.storyId);

    if (isNegative(userText)) {
      return reply([
        'That is quite all right. I will pause here and wait for your next question or your wish to continue.',
      ], null, followUp);
    }

    if (followUp.awaiting === 'continueOrQuestion' && isAffirmative(userText)) {
      const nextPart = tale?.parts?.[followUp.step] || tale?.parts?.[tale.parts.length - 1];
      const nextStep = Math.min(followUp.step + 1, tale?.parts?.length ?? 1);
      return reply([
        nextPart || 'The story continues with another lesson from the elders.',
        followUp.step < (tale?.parts?.length ?? 0)
          ? ' Would you like me to continue further, or do you have a question about this part?'
          : ' That is the end of this story. Would you like another tale?'
      ], null, {
        type: 'story',
        storyId: tale?.id,
        step: nextStep,
        title: tale?.title,
        parts: tale?.parts,
        qa: tale?.qa,
        awaiting: 'continueOrQuestion',
      });
    }

    if (followUp.awaiting === 'continueOrQuestion' && intents.storyQuestion) {
      const questionKey = /why|because|reason/.test(t) ? 'why' : /who/.test(t) ? 'who' : /what/.test(t) ? 'what' : 'default';
      const answer = tale?.qa?.[questionKey] || tale?.qa?.default || 'The story teaches that wisdom is often shared through patience and memory.';
      return reply([
        `That is a thoughtful question${n}. ${answer}`,
        ' Shall I continue the story from here?',
      ], null, {
        type: 'story',
        storyId: tale?.id,
        step: followUp.step,
        title: tale?.title,
        parts: tale?.parts,
        qa: tale?.qa,
        awaiting: 'continueOrQuestion',
      });
    }

    if (followUp.awaiting === 'continueOrQuestion' && /continue|carry on|keep going|go on|right|sure/.test(normalizeText(userText))) {
      const nextPart = tale?.parts?.[followUp.step] || tale?.parts?.[tale.parts.length - 1];
      const nextStep = Math.min(followUp.step + 1, tale?.parts?.length ?? 1);
      return reply([
        nextPart || 'The story continues with another lesson from the elders.',
        followUp.step < (tale?.parts?.length ?? 0)
          ? ' Would you like me to continue further, or do you have a question about this part?'
          : ' That is the end of this story. Would you like another tale?'
      ], null, {
        type: 'story',
        storyId: tale?.id,
        step: nextStep,
        title: tale?.title,
        parts: tale?.parts,
        qa: tale?.qa,
        awaiting: 'continueOrQuestion',
      });
    }

    return reply([
      'I understood that you are engaging with the story. If you want me to move on, say “continue” or ask a question about the part I just told.',
    ], null, followUp);
  }

  if (followUp?.type === 'confirm_start') {
    // user is confirming whether to start the suggested story
    if (isAffirmative(userText)) {
      const tale = AFIA_FOLKTALES.find((s) => s.id === followUp.storyId);
      if (!tale) return reply(['I could not find that story to start.']);
      const intro = `${tale.intro}${tale.parts[0]}`;
      return reply([
        intro,
        ' Would you like me to continue the story, or do you have a question about what happened so far?',
      ], null, {
        type: 'story',
        storyId: tale.id,
        step: 1,
        title: tale.title,
        parts: tale.parts,
        qa: tale.qa,
        awaiting: 'continueOrQuestion',
      });
    }
    if (isNegative(userText)) {
      return reply(['No problem — we will not start it now. Which other tale would you like?'], AFIA_TOPIC_PROMPTS);
    }
    return reply(['Please say yes to start the suggested story, or no to pick another.'], AFIA_TOPIC_PROMPTS);
  }

  if (followUp?.type === 'navigate') {
    if (isAffirmative(userText)) {
      return reply([
        `Absolutely${n} — I will take you to the ${followUp.label} screen now.`,
      ], null, { type: 'navigate', path: followUp.path, label: followUp.label });
    }
    if (isNegative(userText)) {
      return reply([`No worries${n} — we can stay here and explore something else.`], AFIA_TOPIC_PROMPTS);
    }
    return reply([`Say yes and I will take you there, or ask me something else.`], AFIA_TOPIC_PROMPTS);
  }

  if (!t) {
    return reply([`Akwaaba${n}. Say hello when you are ready — I am Afia, your cultural guide. `, DEV_NOTE], AFIA_TOPIC_PROMPTS);
  }

  if (intents.allPages || (intents.website && intents.help)) return siteMapReply();

  // If the user explicitly asked for a story, handle it before general knowledge matches
  if (intents.storyRequest) return storyReply(userText, N, n, folktaleMatch, intents);

  if (generalKnowledge) {
    return knowledgeReply(t, N, n);
  }

  if (matchedPage && (intents.website || /what does|what is on|tell me about the|page do|screen/.test(t))) {
    return pageReply(matchedPage, ' Tap the link below to open it.');
  }

  if (matchedPage && !intents.greeting) {
    return pageReply(matchedPage, ' Would you like to visit it now?', {
      type: 'navigate',
      path: matchedPage.path,
      label: matchedPage.label,
    });
  }

  if (intents.intro && name && (intents.learn || intents.history || intents.heritage || intents.ghana)) {
    if (intents.history && intents.ghana) {
      return reply([
        `Welcome, ${N} — I am glad to teach you Ghanaian heritage and history. Start on `,
        { label: 'Culture Hub', path: '/culture' },
        ', then ',
        { label: 'Ghana Landscapes', path: '/culture/landscapes' },
        ' and ',
        { label: 'Cultural Calendar', path: '/culture/calendar' },
        `. ${DEV_NOTE}`,
      ], AFIA_TOPIC_PROMPTS);
    }
    return reply([
      `Welcome, ${N}. I am glad to teach you Ghanaian heritage. Open the `,
      { label: 'Culture Hub', path: '/culture' },
      ` when you are ready. ${DEV_NOTE}`,
    ], AFIA_TOPIC_PROMPTS);
  }

  if (intents.intro && name) {
    return reply([`Akwaaba, ${N}. What would you like — heritage, a site page, or your day name?`], AFIA_TOPIC_PROMPTS);
  }

  if (intents.greeting && name) {
    return reply([`Akwaaba, ${N}! I am Afia — Friday-born keeper of cultural memory. I am delighted you are here.`], AFIA_TOPIC_PROMPTS);
  }

  if (intents.greeting) {
    return reply([`Akwaaba${n}! I am Afia — ask about Ghana, this website, or tap a topic below.`], AFIA_TOPIC_PROMPTS);
  }

  if (intents.storyRequest) return storyReply(userText, N, n, folktaleMatch, intents);

  if (intents.howAreYou) return reply([`I am well${n}, and grateful you asked.`]);
  if (intents.who) {
    return reply([
      'I am Afia on ',
      { label: 'Mama Africa', path: '/about' },
      ' — I help you explore heritage and navigate this website.',
    ], AFIA_TOPIC_PROMPTS);
  }

  if (intents.help) {
    return reply([
      'I can explain Ghanaian culture and every page — ',
      { label: 'Home', path: '/' },
      ', ',
      { label: 'Culture', path: '/culture' },
      ', ',
      { label: 'Store', path: '/store' },
      ', ',
      { label: 'Stories', path: '/stories' },
      '. Tap a topic:',
    ], AFIA_TOPIC_PROMPTS);
  }

  if (intents.thanks) return reply([`Medaase${n} — your kindness is received.`]);
  if (intents.sorry) return reply([`No harm${n}. What next?`], AFIA_TOPIC_PROMPTS);
  if (intents.bye) return reply([`Yɛbɛhyia bio, ${N}. Carry light with you.`]);
  if (intents.website) return siteMapReply();

  if (intents.history && intents.ghana) {
    return reply([
      `Ghana's history${n} spans kingdoms, resistance, and 1957 independence. See `,
      { label: 'Cultural Calendar', path: '/culture/calendar' },
      ', ',
      { label: 'Landscapes', path: '/culture/landscapes' },
      ', and essays on ',
      { label: 'Stories', path: '/stories' },
      '.',
    ]);
  }

  if (intents.learn && intents.ghana) {
    return reply([
      `Learn Ghana${n} through names and festivals. Try `,
      { label: 'Home', path: '/' },
      ' and ',
      { label: 'Culture Hub', path: '/culture' },
      '.',
    ], AFIA_TOPIC_PROMPTS);
  }

  if (intents.diaspora) return pageReply(findSitePageById('diaspora'));

  if (intents.names || /day name|soul name|birth name/.test(t)) {
    return reply([
      `Day names are sacred${n}. Reveal yours on `,
      { label: 'Home', path: '/' },
      ' — certificate on ',
      { label: 'Result', path: '/result' },
      '.',
    ]);
  }

  if (intents.festivals) return pageReply(findSitePageById('calendar'));
  if (intents.food) return pageReply(findSitePageById('foods'));
  if (findKnowledgeReply(t)) return knowledgeReply(t, N, n);
  if (intents.wedding) {
    return reply(['Read the marriage essay on ', { label: 'Stories', path: '/stories' }, '.']);
  }
  if (intents.funeral) {
    return reply(['Read the mourning essay on ', { label: 'Stories', path: '/stories' }, '.']);
  }
  if (intents.language) return pageReply(findSitePageById('twi'));
  if (intents.clans) return pageReply(findSitePageById('clans'));
  if (intents.adinkra) return pageReply(findSitePageById('adinkra'));

  if (intents.akan) {
    return reply([
      'Akan culture lives in ',
      { label: 'Culture Hub', path: '/culture' },
      ', ',
      { label: 'Adinkra', path: '/culture/adinkra' },
      ', ',
      { label: 'Clans', path: '/culture/clans' },
      ', and ',
      { label: 'Twi', path: '/culture/twi' },
      '.',
    ]);
  }

  if (intents.ghana || intents.heritage || (t.includes('culture') && !intents.website)) {
    return reply([`Heritage${n} begins on the `, { label: 'Culture Hub', path: '/culture' }, '.'], AFIA_TOPIC_PROMPTS);
  }

  if (findKnowledgeReply(t)) return knowledgeReply(t, N, n);

  if (intents.store) return pageReply(findSitePageById('store'));
  if (intents.music) {
    return reply(['Hear Afia on ', { label: 'About Mama Africa', path: '/about' }, '.']);
  }
  if (intents.travel) {
    return reply([
      'Explore ',
      { label: 'Ghana Landscapes', path: '/culture/landscapes' },
      ' and ',
      { label: 'Village Experience', path: '/culture/village' },
      '.',
    ]);
  }
  if (intents.religion) return reply(['Faith and custom often walk side by side in Ghana.']);
  if (intents.nice) return reply([`That warms me${n}.`], AFIA_TOPIC_PROMPTS);
  if (intents.joke) return reply(['In Ghana, the best jokes arrive wrapped in proverbs.']);

  return learningReply(N, n);
}

export function getAfiaWelcome() {
  return {
    role: 'afia',
    segments: [{
      text: 'Akwaaba. I am Afia — your cultural companion. Ask about Ghana, this website, or tap a topic below. I am still growing, but I am glad you are here.',
    }],
    suggestions: AFIA_TOPIC_PROMPTS.slice(0, 6),
  };
}

export function getTypewriterDelay(char, prevChar) {
  if (char === '\n') return 120;
  if (/[.!?]/.test(prevChar || '')) return 48;
  if (char === ' ') return 22;
  if (/[,;:]/.test(char)) return 36;
  return 18;
}
