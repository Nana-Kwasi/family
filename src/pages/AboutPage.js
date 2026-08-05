import React from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import WhiteProductSection from '../components/ui/WhiteProductSection';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import useSEO from '../hooks/useSEO';

const GoldDivider = () => (
  <div className="gold-divider">
    <span className="gold-divider-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
        <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    </span>
  </div>
);

const tracks = [
  { title: 'Golden Throne', genre: 'Afrobeats', duration: '3:42' },
  { title: 'Sankofa Dreams', genre: 'Highlife', duration: '4:15' },
  { title: 'Kente Rhythms', genre: 'Afro-fusion', duration: '3:58' },
  { title: "Friday's Child", genre: 'Neo-Soul', duration: '4:30' },
  { title: 'Adinkra Heart', genre: 'Afrobeats', duration: '3:22' },
];

const socials = [
  { name: 'Facebook', handle: 'Mama Africa', url: 'https://www.facebook.com/profile.php?id=61590121032184', icon: 'f' },
  { name: 'Instagram', handle: '@Mamaafricaafia', url: 'https://www.instagram.com/Mamaafricaafia', icon: '📸' },
  { name: 'TikTok', handle: '@Mamaafricacouture', url: 'https://www.tiktok.com/@Mamaafricacouture', icon: '🎵' },
  // X (Twitter) hidden until the correct profile handle is confirmed
  // { name: 'X (Twitter)', handle: '@mamaafrica', url: 'https://x.com/mamaafrica', icon: '𝕏' },
  { name: 'YouTube', handle: '@mamaafricaafia', url: 'https://www.youtube.com/@mamaafricaafia', icon: '▶' },
];

export default function AboutPage() {
  const { products } = useCatalog();
  useSEO({
    title: 'About Mama Africa — Ghanaian Heritage & Akan Culture',
    description: 'Akwaaba! Meet Mama Africa Afia — the Friday-born Akan cultural ambassador bringing Ghana, the diaspora, and Akan heritage together through names, stories, music, and food.',
    image: '/images/afia-hero.jpg',
  });

  const lead = { color: '#EDD9BC', lineHeight: 1.95, fontSize: 'clamp(18px,2.2vw,21px)', marginBottom: 18, fontFamily: "'EB Garamond', serif" };
  const leadEm = { color: '#C9A558', lineHeight: 1.8, fontSize: 'clamp(20px,2.6vw,24px)', marginBottom: 24, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontWeight: 600 };
  const body = { color: '#BA9D7C', lineHeight: 1.95, fontSize: 17, marginBottom: 18, fontFamily: "'EB Garamond', serif" };
  const subhead = { fontFamily: "'Cinzel', serif", fontSize: 'clamp(17px,2.3vw,23px)', color: '#C9A558', letterSpacing: '0.04em', margin: '36px 0 16px', lineHeight: 1.3 };
  const quote = { color: '#EDD9BC', lineHeight: 1.85, fontSize: 'clamp(17px,2vw,19px)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", borderLeft: '3px solid rgba(201,165,88,0.55)', paddingLeft: 20, margin: '0 0 24px' };

  return (
    <div className="page-wrapper">
      {/* Meet Afia — Akwaaba */}
      <section className="afia-section">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: 'clamp(56px, 11vw, 104px)', color: '#C9A558', lineHeight: 1, margin: 0, textShadow: '0 3px 22px rgba(201,165,88,0.28)' }}>
            Akwaaba!
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 30px)', color: '#FAF0E0', fontWeight: 700, marginTop: 16, lineHeight: 1.3 }}>
            Welcome to the World of Mama Africa — Afia
          </p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 19px)', color: '#C9A558', marginTop: 8, letterSpacing: '0.02em' }}>
            Where Ancient Roots Meet Modern Souls
          </p>
        </div>
        <GoldDivider />

        <img
          src="/images/afia-hero.jpg"
          alt="Mama Africa Afia — the Friday-born Akan cultural ambassador"
          className="meet-afia-img"
          style={{ maxHeight: 560, objectFit: 'cover', objectPosition: 'top' }}
        />

        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={lead}>
            Before time had a name, before ink met paper, before a mother’s hands could cradle her newborn daughter — the heavens spoke first.
          </p>
          <p style={leadEm}>They called her Afia.</p>
          <p style={body}>
            In the sacred Akan naming tradition, <strong style={{ color: '#C9A558' }}>Afia</strong> is the soul-name gifted to every female child who arrives into this world on a Friday. It is not merely a name. It is a spiritual identity — a divine declaration woven into the very fabric of existence, carrying the spirit of the earth’s abundance and power. It is the name the universe chose long before any human hand could write it down.
          </p>
          <p style={body}>And she has spent every day of her life living up to it.</p>

          <h3 style={subhead}>She Is the Bridge Between Worlds</h3>
          <p style={body}>
            Draped in the living fire of kente cloth, adorned with the timeless wisdom of golden Adinkra symbols, Mama Africa Afia walks through two worlds with equal grace — one foot rooted in the ancient, sacred soils of Ghana, the other stepping boldly into the digital age, where her extended family across the globe hungers for connection, for identity, for home.
          </p>
          <p style={body}>
            She carries within her the heartbeat of the great Akan cultures — from the royal highlands of Asante, to the proud lands of Akyim, the distinguished hills of Akuapim, the coastal strength of the Fante, and the resilient spirit of Kwahu. These are not just places on a map. They are living, breathing legacies — and she is their devoted messenger.
          </p>
          <p style={body}>
            Her voice travels across every ocean, every sea, every stretch of water that once carried African souls away from their motherland — reaching the diaspora in America, Europe, Canada, Australia, and Asia. And with arms wide open, she turns to the Caribbean islands, where African rhythms never died — they simply found a new drum. She calls out to Jamaica, Trinidad and Tobago, Barbados, Haiti, Cuba, Martinique, Guadeloupe, and every sun-kissed island where African blood flows as warm and deep as the turquoise waters surrounding them.
          </p>
          <p style={body}>
            She reaches across the vast, vibrant lands of South America — to the Afro-Brazilian communities of Brazil, to the African descendants of Colombia, Venezuela, Peru, and beyond — where African culture survived the unthinkable, adapted, transformed, and bloomed into something extraordinary.
          </p>
          <p style={body}>To every one of these communities, she says the same sacred thing:</p>
          <p style={quote}>“I see you. I hear you. I carry your story too. Come home.”</p>

          <h3 style={subhead}>She Is a Friday-Born Force of Nature</h3>
          <p style={body}>
            As a Friday-born daughter of the Akan tradition, Afia embodies everything that sacred day represents — love, beauty, and the full spectrum of human creativity. These are not merely poetic words. They are the very fuel that powers everything she creates.
          </p>
          <p style={body}>
            Through music. Through dance. Through storytelling that stirs ancestral memory. Through art that speaks in colours older than language. Through stories that refuse to be forgotten — she channels the energy of her birthright into a mission far greater than herself.
          </p>
          <p style={body}>She is a cultural educator. She is an artist. She is a cultural ambassador.</p>
          <p style={leadEm}>She is Mama Africa, Afia.</p>

          <h3 style={subhead}>Her Mission Is Your Invitation</h3>
          <p style={body}>
            This is not just a website. This is a homecoming. This is the villages connecting.
          </p>
          <p style={body}>
            Whether you were born on the red soils of Ghana — whether you grew up hearing whispered Twi words in your grandmother’s kitchen ten thousand miles away — whether you are dancing to Afrobeats in Lagos or Soca rhythms in Port of Spain — whether you are tending to your roots in the hills of Jamaica, or feeling that inexplicable pull toward Africa from the streets of São Paulo — whether Africa lives in your blood or simply burns in your soul —
          </p>
          <p style={leadEm}>You belong here.</p>
          <p style={body}>Mama Africa Afia’s mission is breathtakingly simple and profoundly powerful:</p>
          <p style={quote}>“To bring Ghana, Africa, and the magnificent Akan culture to the world — one name, one story, one song at a time.”</p>
          <p style={body}>
            She is here to educate, to celebrate, to elevate — to place the treasure chest of African heritage in your hands and say with absolute certainty:
          </p>
          <p style={quote}>“This is yours. It always was.”</p>

          <h3 style={subhead}>And Yes — She Will Awaken Your Appetite 🍽️🌶️</h3>
          <p style={body}>Because no cultural journey is complete without sitting at the table.</p>
          <p style={body}>
            Mama Africa Afia will introduce you to the bold, soulful, unforgettable flavours of Ghanaian cuisine — the dishes that have nourished kings, sustained communities, and made every homesick African close their eyes and feel the motherland again. From the bustling streets of Accra to your kitchen — whether that kitchen sits in Kingston, Bridgetown, Rio de Janeiro, or Paris — she will make sure you taste home.
          </p>
          <p style={body}>Let’s connect over shared recipes, cherished memories, and favourite meals.</p>
          <p style={body}>Because food is the universal language — and Ghana’s table has always been big enough for everyone.</p>

          <h3 style={subhead}>So Come. Stay. Belong. Let’s Connect.</h3>
          <p style={body}>If you have ever felt the pull of Africa in your chest —</p>
          <p style={body}>If you have ever wanted to truly understand where you come from —</p>
          <p style={body}>If you are a Caribbean soul searching for the thread that connects your rhythm to an ancient drum —</p>
          <p style={body}>If you are a South American heart that has always known something profound was waiting across the Atlantic —</p>
          <p style={body}>If you are simply a curious, open-hearted soul from any corner of this magnificent earth, ready to explore one of the world’s most extraordinary cultures —</p>
          <p style={leadEm}>You are exactly who this space was created for.</p>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: 'clamp(40px, 8vw, 72px)', color: '#C9A558', lineHeight: 1, margin: 0, textShadow: '0 3px 22px rgba(201,165,88,0.28)' }}>
              Akwaaba!
            </p>
            <p style={{ ...leadEm, marginTop: 14, marginBottom: 6 }}>Welcome home.</p>
            <p style={body}>Mama Africa Afia has been waiting for you. 🌍👑</p>
          </div>
        </div>
      </section>

      {/* Music */}
      <section style={{ background: 'rgba(201,165,88,0.02)', borderTop: '1px solid rgba(201,165,88,0.1)', borderBottom: '1px solid rgba(201,165,88,0.1)', padding: '64px 0' }}>
        <div className="afia-section">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="section-title">Afia's Music</h2>
            <p className="section-subtitle">Where ancient rhythms meet modern soul</p>
          </div>
          <GoldDivider />

          <div style={{ marginTop: 32 }}>
            {tracks.map((track, i) => (
              <div key={i} className="track-row">
                <button className="track-play-btn" aria-label={`Play ${track.title}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                </button>
                <div className="track-info">
                  <div className="track-title">{track.title}</div>
                  <div className="track-genre">{track.genre}</div>
                </div>
                <div className="track-duration">{track.duration}</div>
                <span style={{ color: '#9E7D42' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </span>
              </div>
            ))}
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#7C5F48', marginTop: 16, fontSize: 15 }}>
              Full tracks coming soon — stay tuned
            </p>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="afia-section">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="section-title">Connect With Afia</h2>
          <p className="section-subtitle">Follow the journey</p>
        </div>
        <GoldDivider />

        <div style={{ marginTop: 32, maxWidth: 560, margin: '32px auto 0' }}>
          {socials.map((s, i) => (
            <a key={i} href={s.url} className="social-link-row" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">{s.icon}</span>
              <div>
                <span className="social-link-name">{s.name}</span>
                <span className="social-link-handle">{s.handle}</span>
              </div>
              <span style={{ marginLeft: 'auto', color: '#9E7D42', fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Shop About */}
      <section style={{ background: 'rgba(201,165,88,0.03)', borderTop: '1px solid rgba(201,165,88,0.1)', borderBottom: '1px solid rgba(201,165,88,0.1)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 16 }}>Our Gift Shop</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 32px)', color: '#EDD9BC', marginBottom: 24 }}>
            We believe mothers deserve more than ordinary gifts.
          </h2>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, marginBottom: 20, fontStyle: 'italic', fontFamily: "'Times New Roman', Times, serif" }}>
            They deserve words that feel true, timeless, and deeply appreciated.
          </p>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, marginBottom: 20, fontFamily: "'Times New Roman', Times, serif" }}>
            This shop was created to offer meaningful merchandise that celebrates motherhood with grace, gratitude, warmth, and beauty. From elegant mugs to wearable statements of love and honor, each design is made to help people give gifts that feel personal and memorable.
          </p>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, fontFamily: "'Times New Roman', Times, serif" }}>
            Our style is simple, refined, and heartfelt. We focus on messages of gratitude, sacrifice, faith, strength, joy, and the quiet power of mothers. Thank you for choosing thoughtful gifts that celebrate the women who give so much.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            {['Respect', 'Heritage', 'Love', 'Legacy'].map(w => (
              <span key={w} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.18em', color: 'rgba(201,165,88,0.6)', textTransform: 'uppercase' }}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection dark={false} />

      <WhiteProductSection
        heading="Merchandise"
        subtitle="Heritage names, culture, and gift-ready keepsakes for every generation"
        categories={[
          { label: 'T-Shirts',       products: products.filter(p => p.type === 'tshirt') },
          { label: 'Baby Onesies', products: products.filter(p => p.type === 'babysuit') },
        ]}
        viewAllHref="/store"
        viewAllLabel="View Full Shop"
      />
    </div>
  );
}
