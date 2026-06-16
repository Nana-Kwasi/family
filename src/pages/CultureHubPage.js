import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── Akan Day Data ────────────────────────────────────────────────────────────
const AKAN_DAYS = {
  0: { day: 'Sunday',    female: 'Akosua', male: 'Kwasi',   spirit: 'The Sunday soul carries strength, authority, and a deep connection to the sun. Sunday-born children are seen as natural leaders.' },
  1: { day: 'Monday',    female: 'Adwoa',  male: 'Kwadwo',  spirit: 'The Monday soul is peaceful, reflective, and carries the calm of still water. Monday-born are known for patience and diplomacy.' },
  2: { day: 'Tuesday',   female: 'Abena',  male: 'Kwabena', spirit: 'The Tuesday soul burns with passion and resilience — shaped by the ocean and fire. Tuesday-born are fierce protectors of those they love.' },
  3: { day: 'Wednesday', female: 'Akua',   male: 'Kwaku',   spirit: 'The Wednesday soul is clever and resourceful — born under the spider Anansi, the keeper of all stories and wisdom.' },
  4: { day: 'Thursday',  female: 'Yaa',    male: 'Yaw',     spirit: 'The Thursday soul is grounded and nurturing, carrying the endurance of the earth itself. Thursday-born are the foundation others build on.' },
  5: { day: 'Friday',    female: 'Afia',   male: 'Kofi',    spirit: 'The Friday soul is adventurous and warm — love is both their gift and their compass. Friday-born light every room they enter.' },
  6: { day: 'Saturday',  female: 'Ama',    male: 'Kwame',   spirit: 'The Saturday soul is divinely touched, born under the eye of God himself. Saturday-born carry a gift meant to be shared with the world.' },
};

// ── Monthly Festivals ────────────────────────────────────────────────────────
const MONTHLY_FESTIVALS = [
  { month: 'January',   name: 'Adae Kese',          region: 'Ashanti Region',        colour: '#C9A558', desc: 'The Great Adae — a sacred Akan ceremony held every 42 days to honour ancestors and royal stools. Chiefs and elders gather at the palace to pour libations and commune with those who came before.' },
  { month: 'February',  name: 'Aboakyer Festival',   region: 'Winneba, Central Region', colour: '#e07020', desc: 'The Deer Hunting Festival — two Winneba warrior companies compete to catch a live deer with bare hands as an offering to Penkye Otu, the protector deity. One of Ghana\'s oldest surviving festivals.' },
  { month: 'March',     name: 'Independence Day',    region: 'Nationwide',            colour: '#5a9e6a', desc: 'On 6th March 1957, Ghana became the first sub-Saharan African country to gain independence. The air fills with drumming, kente, and the pride of a nation that showed the world freedom was possible.' },
  { month: 'April',     name: 'Kwahu Easter Festival', region: 'Eastern Region',       colour: '#9b7fc8', desc: 'Every Easter, the highland town of Kwahu transforms into a festival of colour, music, and homecoming. Diaspora Ghanaians fly in from across the world to celebrate on the mountain of their ancestors.' },
  { month: 'May',       name: 'Damba Festival',      region: 'Northern Ghana',        colour: '#b05060', desc: 'A festival of drumming, horse parades, and communal feasting in northern Ghana. Chiefs emerge in full regalia as communities honour their history through dance that has not changed for centuries.' },
  { month: 'June',      name: 'Apoo Festival',       region: 'Bono Region',           colour: '#e07020', desc: 'The Apoo Festival of Techiman — a rare moment where ordinary people speak openly before the chief without consequence. For one week, all truths may be told. A living tradition of communal accountability.' },
  { month: 'July',      name: 'PANAFEST',            region: 'Cape Coast & Elmina',   colour: '#C9A558', desc: 'The Pan-African Historical Theatre Festival brings diaspora Africans back to the shores of Cape Coast — to the very castles where their ancestors were taken. A week of healing, art, and homecoming.' },
  { month: 'August',    name: 'Homowo Festival',     region: 'Greater Accra',         colour: '#5a9e6a', desc: 'Homowo means "hooting at hunger" — a festival born from a great famine that the Ga people survived. Families gather, palm nut soup is sprinkled for ancestors, and the dead are formally invited to eat.' },
  { month: 'September', name: 'Fetu Afahye',         region: 'Cape Coast, Central Region', colour: '#9b7fc8', desc: 'The Fetu Afahye is a thanksgiving and purification festival of the Fante people. The sea is honoured, chiefs are paraded through the streets, and the community gives thanks for another year of life.' },
  { month: 'October',   name: 'Odwira Festival',     region: 'Akan Communities',      colour: '#C9A558', desc: 'The Odwira is the Akan harvest and purification festival — a time to cleanse the community, honour ancestors, and renew the covenant between the living and the dead. One of the most sacred weeks in the Akan calendar.' },
  { month: 'November',  name: 'Bakatue Festival',    region: 'Elmina, Central Region', colour: '#5a9e6a', desc: 'The Opening of the Lagoon — the Bakatue marks the beginning of fishing season in Elmina. The chief casts the first net, and what is caught determines the fortune of the community for the year ahead.' },
  { month: 'December',  name: 'Hogbetsotso Festival', region: 'Volta Region',          colour: '#b05060', desc: 'The Hogbetsotso celebrates the escape of the Anlo-Ewe people from the tyrannical ruler Agorkoli. Chiefs re-enact the great migration, and communities from across the diaspora return to witness it.' },
];

// ── Proverbs (15) ────────────────────────────────────────────────────────────
const PROVERBS = [
  { text: 'Sankofa — it is not wrong to go back and fetch what you forgot.', context: 'Recited at homecoming ceremonies and naming days to invite the diaspora back to their roots.' },
  { text: 'One tree does not make a forest.', context: 'Said before community gatherings to set the tone — no achievement is truly individual.' },
  { text: 'Rain does not fall on one roof alone.', context: 'Spoken to comfort someone in hardship — suffering is shared, and so is the recovery.' },
  { text: 'The axe forgets, but the tree remembers.', context: 'Said to remind those in power to consider the lasting impact of their actions on the vulnerable.' },
  { text: 'A child who is not embraced by the village will burn it down to feel its warmth.', context: 'Spoken as a call to communities to include and nurture all their young — no one should feel forgotten.' },
  { text: 'When the music changes, so does the dance.', context: 'Said to encourage adaptability — wisdom knows when the moment calls for a different response.' },
  { text: 'Knowledge is like a garden: if it is not cultivated, it cannot be harvested.', context: 'Spoken by elders to young people beginning their education or apprenticeship.' },
  { text: 'Until the lion learns to write, every story will glorify the hunter.', context: 'A call for Africans to tell their own stories — the pen is as powerful as the spear.' },
  { text: 'Odo nyera fie kwan — love does not lose its way home.', context: 'Said at weddings and reunions — no matter how far you travel, love is always the path back.' },
  { text: 'The one who tells the stories rules the world.', context: 'Said in the context of preserving oral tradition — the griot who carries the stories holds the community\'s future.' },
  { text: 'When you follow in the path of your father, you learn to walk like him.', context: 'Said to young people taking up the work of their elders — heritage is passed through doing, not just telling.' },
  { text: 'A person who has children does not die.', context: 'Spoken at funerals and naming ceremonies — the departed live on in those they leave behind.' },
  { text: 'Funtumfunafu Denkyemfunafu — two crocodiles share a stomach, yet fight over food.', context: 'Said of communities that quarrel despite sharing the same source of life — a call for unity among kin.' },
  { text: 'The ruin of a nation begins in the homes of its people.', context: 'Spoken by community leaders as a reminder that strong families are the foundation of a strong nation.' },
  { text: 'Aboa a onni dua, Nyame na ɔpra ne ho — the animal without a tail, God brushes away its flies.', context: 'Spoken to comfort the vulnerable — those without advocates are watched over by the divine.' },
];

// ── Hub Cards ────────────────────────────────────────────────────────────────
const hubs = [
  {
    to: '/culture/adinkra',
    symbol: '✦',
    title: 'Adinkra Symbols',
    subtitle: '20 Sacred Symbols',
    desc: 'Every Adinkra symbol is a philosophy encoded in art — wisdom, faith, resilience, and love expressed in form. Explore all 20 symbols with their meanings and cultural significance.',
    color: '#C9A558',
    kente: ['#C9A558', '#1a1a1a', '#C9A558', '#8B6914', '#C9A558'],
    colourMeaning: 'Gold: royalty, wealth, and spiritual purity — the colour of the Asantehene\'s court.',
  },
  {
    to: '/culture/twi',
    symbol: '𝄞',
    title: 'Twi Language Basics',
    subtitle: 'Spoken by 9 million+',
    desc: 'Learn greetings, family terms, numbers, and cultural phrases in Twi — the most widely spoken language in Ghana. Reconnect through the very words your ancestors spoke.',
    color: '#5a9e6a',
    kente: ['#5a9e6a', '#f5c842', '#5a9e6a', '#2d6e3e', '#5a9e6a'],
    colourMeaning: 'Green: growth, renewal, and the fertile lands of Ghana — the colour of new beginnings.',
  },
  {
    to: '/culture/clans',
    symbol: '⌖',
    title: 'Akan Clan System',
    subtitle: '8 Matrilineal Clans',
    desc: 'Discover the eight Akan clans (Abusua) — a matrilineal system where your identity, inheritance, and spiritual belonging flow through your mother\'s bloodline.',
    color: '#e07020',
    kente: ['#e07020', '#1a1a1a', '#C9A558', '#e07020', '#1a1a1a'],
    colourMeaning: 'Orange & Red: sacrifice, the blood of ancestors, and the fire of political strength.',
  },
  {
    to: '/culture/calendar',
    symbol: '◈',
    title: 'Cultural Calendar',
    subtitle: 'Festivals & Sacred Days',
    desc: 'From Homowo to PANAFEST to Independence Day — discover Ghana\'s most important festivals and how to mark them from anywhere in the diaspora.',
    color: '#9b7fc8',
    kente: ['#9b7fc8', '#C9A558', '#9b7fc8', '#5c4a8a', '#9b7fc8'],
    colourMeaning: 'Purple: healing, royalty, and the wisdom carried by elders — worn at ceremonies of passage.',
  },
  {
    to: '/diaspora',
    symbol: '✊',
    title: 'Diaspora Stories',
    subtitle: 'Community Voices',
    desc: 'Black Americans and Africans in Europe sharing their journeys of reconnection. Read real stories of homecoming — and add your own to the record.',
    color: '#b05060',
    kente: ['#b05060', '#1a1a1a', '#C9A558', '#b05060', '#1a1a1a'],
    colourMeaning: 'Red: the blood that connects every diaspora soul to the motherland — sacrifice and survival.',
  },
  {
    to: '/culture/village',
    symbol: '🌿',
    title: 'Ancient Village Life',
    subtitle: 'A Morning & Night — 10 Scenes',
    desc: 'Step inside a cinematic documentary of an ancient Ghanaian village — mud houses, water carriers, farmers at dawn, children at play, and elders under the great tree. Narrated with ambient village sound.',
    color: '#8B6914',
    kente: ['#8B6914', '#5a9e6a', '#C9A558', '#2d6e3e', '#8B6914'],
    colourMeaning: 'Earth tones: the red clay of the earth, the brown of mud walls — the colours life is built from.',
    badge: 'Video',
  },
  {
    to: '/culture/landscapes',
    symbol: '◉',
    title: 'Ghana Landscapes',
    subtitle: 'Castles · Rivers · Forests · Mountains',
    desc: 'An immersive documentary of Ghana\'s physical heritage — Cape Coast Castle, Lake Volta, Kakum Forest, Mount Afadjato, and 20 more landmarks. Narration, ambient sound, and deep cultural context.',
    color: '#4a9ec4',
    kente: ['#4a9ec4', '#C9A558', '#5a9e6a', '#9b7fc8', '#4a9ec4'],
    colourMeaning: 'Blue: the Atlantic, the rivers, and the sky that connects Ghana to every corner of the diaspora.',
    badge: 'New',
  },
  {
    to: '/culture/foods',
    symbol: '🍲',
    title: 'Ghanaian Foods',
    subtitle: "Afia's Village Kitchen",
    desc: "A culturally authentic taste of Ghana — rich soups and pounded staples, grilled specialties, street snacks, celebration feasts, drinks, and the fruits of Afia's world.",
    color: '#e07020',
    kente: ['#e07020', '#1a1a1a', '#C9A558', '#e07020', '#1a1a1a'],
    colourMeaning: 'Warm spice tones: the palm oil, pepper, and roasted groundnut at the heart of the Ghanaian kitchen.',
    badge: 'New',
  },
];

// ── Journey Steps ─────────────────────────────────────────────────────────────
const JOURNEY = [
  { step: '01', label: 'Adinkra Symbols', to: '/culture/adinkra', hint: 'Start with the visual language' },
  { step: '02', label: 'Twi Language',    to: '/culture/twi',     hint: 'Learn to speak it' },
  { step: '03', label: 'Your Clan',       to: '/culture/clans',   hint: 'Find where you belong' },
  { step: '04', label: 'Festivals',       to: '/culture/calendar', hint: 'Live the calendar' },
];

// ── Kente Strip ───────────────────────────────────────────────────────────────
function KenteStrip({ colors }) {
  return (
    <div style={{ display: 'flex', height: 6, borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
      {colors.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}

export default function CultureHubPage() {
  const now = new Date();
  const todayIndex = now.getDay();
  const akanToday = AKAN_DAYS[todayIndex];
  const festival = MONTHLY_FESTIVALS[now.getMonth()];
  const [proverbFading, setProverbFading] = useState(false);
  const [proverbIndex, setProverbIndex] = useState(now.getDate() % PROVERBS.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setProverbFading(true);
      setTimeout(() => {
        setProverbIndex(i => (i + 1) % PROVERBS.length);
        setProverbFading(false);
      }, 400);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const activeProverb = PROVERBS[proverbIndex];

  return (
    <div className="page-wrapper">
      <style>{`
        @keyframes cultureHeroFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dayCardPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(201,165,88,0.0); } 50% { box-shadow: 0 0 0 8px rgba(201,165,88,0.08); } }
        @keyframes proverbFade { from { opacity: 0; } to { opacity: 1; } }
        .culture-hub-card:hover { transform: translateY(-3px); }
        .culture-hub-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        padding: '64px 20px 0',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.1) 0%, transparent 65%)',
        animation: 'cultureHeroFade 0.6s ease',
      }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.28em',
          color: '#9E7D42', textTransform: 'uppercase', marginBottom: 14,
        }}>
          ✦ &nbsp; Living Heritage &nbsp; ✦
        </p>
        <h1 className="section-title" style={{ fontSize: 'clamp(28px, 5vw, 46px)', marginBottom: 14 }}>
          Culture Hub
        </h1>
        <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 36px' }}>
          Your ancestral heritage is not lost — it is waiting. This is your gateway to the living culture of the Akan people and the broader Ghanaian world.
        </p>

        {/* ── Today's Akan Day Card ────────────────────────────────────── */}
        <div style={{
          display: 'inline-block', maxWidth: 560, width: '100%',
          background: 'linear-gradient(135deg, #1C1005 0%, #2A1A08 60%, #1C1005 100%)',
          border: '1px solid rgba(201,165,88,0.4)',
          borderRadius: 16, padding: '28px 32px', marginBottom: 56,
          animation: 'dayCardPulse 4s ease-in-out infinite',
          textAlign: 'left',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#5a9e6a', boxShadow: '0 0 8px #5a9e6a',
            }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              letterSpacing: '0.2em', color: '#5a9e6a', textTransform: 'uppercase',
            }}>
              Today — {akanToday.day}
            </span>
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(18px, 4vw, 26px)',
            color: '#FAF0E0', lineHeight: 1.3, marginBottom: 8,
          }}>
            Today belongs to{' '}
            <span style={{ color: '#C9A558' }}>{akanToday.female}</span>
            {' '}and{' '}
            <span style={{ color: '#C9A558' }}>{akanToday.male}</span>.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 16,
            color: '#BA9D7C', lineHeight: 1.75, margin: '0 0 16px',
          }}>
            {akanToday.spirit}
          </p>
          <Link to="/" style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            letterSpacing: '0.14em', color: '#C9A558', textDecoration: 'none',
            textTransform: 'uppercase', borderBottom: '1px solid rgba(201,165,88,0.3)',
            paddingBottom: 2,
          }}>
            Discover your own day name →
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Journey Path ──────────────────────────────────────────────── */}
        <div style={{
          background: 'rgba(201,165,88,0.04)',
          border: '1px solid rgba(201,165,88,0.18)',
          borderRadius: 12, padding: '20px 28px', marginBottom: 36,
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            letterSpacing: '0.2em', color: '#9E7D42', textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            New here? Follow the path
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
          }}>
            {JOURNEY.map((j, idx) => (
              <React.Fragment key={j.to}>
                <Link to={j.to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(201,165,88,0.08)',
                    border: '1px solid rgba(201,165,88,0.25)',
                    borderRadius: 999, padding: '7px 14px',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.18)'; e.currentTarget.style.borderColor = 'rgba(201,165,88,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,165,88,0.25)'; }}
                  >
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: '#9E7D42' }}>{j.step}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#EDD9BC', fontWeight: 600 }}>{j.label}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: '#7C5F48' }}>{j.hint}</span>
                  </div>
                </Link>
                {idx < JOURNEY.length - 1 && (
                  <span style={{ color: 'rgba(201,165,88,0.4)', fontSize: 14 }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Hub Cards ────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 56 }}>
          {hubs.map(({ to, symbol, title, subtitle, desc, color, kente, colourMeaning, badge }) => (
            <Link key={to} to={to} style={{ textDecoration: 'none' }}>
              <div
                className="culture-hub-card"
                style={{
                  background: '#0F0A04',
                  border: '1px solid rgba(201,165,88,0.14)',
                  borderRadius: 12, overflow: 'hidden',
                  height: '100%', display: 'flex', flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <KenteStrip colors={kente} />
                <div style={{ padding: '28px 26px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontSize: 32, marginBottom: 16, color,
                    fontFamily: "'Cinzel', serif",
                  }}>
                    {symbol}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color, letterSpacing: '0.07em' }}>
                      {title}
                    </div>
                    {badge && (
                      <span style={{
                        fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: '#111', background: color,
                        borderRadius: 999, padding: '2px 8px',
                      }}>{badge}</span>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: '#7C5F48', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
                    {subtitle}
                  </div>
                  <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.85, margin: '0 0 16px', flex: 1 }}>
                    {desc}
                  </p>
                  <div style={{
                    borderTop: '1px solid rgba(201,165,88,0.1)',
                    paddingTop: 12, marginBottom: 16,
                  }}>
                    <p style={{
                      fontFamily: "'EB Garamond', serif", fontSize: 13,
                      color: '#7C5F48', fontStyle: 'italic', lineHeight: 1.6, margin: 0,
                    }}>
                      {colourMeaning}
                    </p>
                  </div>
                  <div style={{ color, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    Enter →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Monthly Festival Spotlight ────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #0F0A04 0%, #1C1005 50%, #0F0A04 100%)',
          border: `1px solid ${festival.colour}33`,
          borderLeft: `4px solid ${festival.colour}`,
          borderRadius: 12, padding: '32px 32px 28px',
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: festival.colour, boxShadow: `0 0 10px ${festival.colour}` }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              letterSpacing: '0.22em', color: festival.colour, textTransform: 'uppercase',
            }}>
              {festival.month} — Festival Spotlight
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 3.5vw, 28px)',
            color: '#FAF0E0', margin: '0 0 6px',
          }}>
            {festival.name}
          </h3>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 12,
            letterSpacing: '0.1em', color: festival.colour,
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            {festival.region}
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 18,
            color: '#BA9D7C', lineHeight: 1.85, margin: 0,
            maxWidth: 720,
          }}>
            {festival.desc}
          </p>
          <Link to="/culture/calendar" style={{
            display: 'inline-block', marginTop: 20,
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            letterSpacing: '0.14em', color: festival.colour,
            textDecoration: 'none', textTransform: 'uppercase',
            borderBottom: `1px solid ${festival.colour}44`, paddingBottom: 2,
          }}>
            See full cultural calendar →
          </Link>
        </div>

        {/* ── Rotating Proverb ─────────────────────────────────────────── */}
        <div style={{
          textAlign: 'center', padding: '44px 28px',
          border: '1px solid rgba(201,165,88,0.15)',
          borderRadius: 12,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(201,165,88,0.06) 0%, transparent 70%)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, marginBottom: 28,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(201,165,88,0.2)', maxWidth: 80 }} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', color: '#7C5F48', textTransform: 'uppercase' }}>Akan Wisdom</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(201,165,88,0.2)', maxWidth: 80 }} />
          </div>

          <div style={{
            opacity: proverbFading ? 0 : 1,
            transition: 'opacity 0.4s ease',
            minHeight: 120,
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#C9A558', fontStyle: 'italic',
              lineHeight: 1.75, maxWidth: 680, margin: '0 auto 16px',
            }}>
              "{activeProverb.text}"
            </p>
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: 15,
              color: '#7C5F48', fontStyle: 'italic',
              maxWidth: 560, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {activeProverb.context}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
            {PROVERBS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setProverbFading(true); setTimeout(() => { setProverbIndex(i); setProverbFading(false); }, 400); }}
                style={{
                  width: i === proverbIndex ? 20 : 6,
                  height: 6, borderRadius: 999, border: 'none',
                  background: i === proverbIndex ? '#C9A558' : 'rgba(201,165,88,0.25)',
                  cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Proverb ${i + 1}`}
              />
            ))}
          </div>

          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            letterSpacing: '0.1em', color: 'rgba(201,165,88,0.35)',
            marginTop: 16, textTransform: 'uppercase',
          }}>
            Rotates daily · {PROVERBS.length} proverbs in the collection
          </p>
        </div>
      </section>
    </div>
  );
}
