import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SoundPermissionModal from '../components/SoundPermissionModal';

const av = (f) => encodeURI(`/Ai videos/${f}`);
const bs = (f) => encodeURI(`/audio/background sounds/${f}`);

const SCENES = [
  {
    video: av('traditional-mud-houses-in-african-villages-round-a.mp4'),
    time: 'Morning',
    title: 'The Village at Dawn',
    narration: 'Before the sun climbs above the savanna, the village of our ancestors already breathes. Round mud houses with thatched roofs — each wall shaped by human hands, each doorway a portal into centuries of living memory. These structures have stood through harmattan and rain, through colonial borders and independence. They are still here.',
    sound: bs('freesound_community-birds-in-forest-on-sunny-day-14444.mp3'),
    soundLabel: 'Dawn birds',
  },
  {
    video: av('women-fetching-water-in-a-typical-african-village-.mp4'),
    time: 'Morning',
    title: 'The Morning Walk',
    narration: 'The women rise before the rest of the world. With clay pots balanced on their heads with impossible grace, they walk the path to the river — a journey their mothers made, and their mothers\' mothers made, stretching back beyond memory. Water is not just survival here. Water is ceremony.',
    sound: bs('freesound_community-calm-stream-in-forest-19355.mp3'),
    soundLabel: 'River stream',
  },
  {
    video: av('women-fetching-water-in-a-typical-african-village- (1).mp4'),
    time: 'Morning',
    title: 'The Art of Carrying',
    narration: 'Do not mistake this for burden. What you see is mastery — passed from mother to daughter across uncountable generations. The balance. The posture. The quiet dignity of those who carry what sustains an entire community on their heads without spilling a drop. This is not labour. This is living art.',
    sound: bs('freesound_community-forest-with-small-river-birds-and-nature-field-recording-6735.mp3'),
    soundLabel: 'Forest river',
  },
  {
    video: av('african-forefather-farmers-from-an-earlier-era-hea.mp4'),
    time: 'Morning',
    title: 'Heading to the Farms',
    narration: 'At first light, the men move toward the farms. In Akan tradition, the land does not belong to you — you belong to the land. You are its steward, its guardian, accountable to the ancestors who cleared it and to the children who will inherit it. The hoe is not a tool. It is a covenant.',
    sound: bs('freesound_community-birds-in-spring-north-carolina-61396.mp3'),
    soundLabel: 'Morning birds',
  },
  {
    video: av('african-children-playing-traditional-african-games.mp4'),
    time: 'Midday',
    title: "The Children's Games",
    narration: 'The children play Oware and Ampe — games as ancient as the villages themselves. Every round of Oware teaches arithmetic, strategy, and foresight. Every jump of Ampe teaches rhythm, reaction, and how to read another person\'s body before they move. In the village, every game is a school.',
    sound: bs('mdjahidhossain-birds-nature-relax-sounds-110839.mp3'),
    soundLabel: 'Nature & birds',
  },
  {
    video: av('african-children-playing-traditional-african-games (1).mp4'),
    time: 'Midday',
    title: 'No Screens. All Joy.',
    narration: 'No screens. No silence. No isolation. The village raises its children in motion, in noise, in the permanent company of others. The oldest games in Ghana still teach the newest hearts the same truths: cooperate, react, improvise, belong. Joy here is created — together.',
    sound: bs('soundsforyou-forest-ambience-with-cuckoo-birds-chirping-123046.mp3'),
    soundLabel: 'Forest ambience',
  },
  {
    video: av('african-children-playing-traditional-african-games (2).mp4'),
    time: 'Midday',
    title: 'Ubuntu in Motion',
    narration: 'Watch how they call to each other. Not competing, but summoning. In these games, you cannot truly win alone — you need someone to play with, to react to, to learn from. This is Ubuntu before the word was ever written down: "I am because we are."',
    sound: bs('freesound_community-birds-singing-in-and-leaves-rustling-with-the-wind-14557.mp3'),
    soundLabel: 'Wind & birds',
  },
  {
    video: av('african-elders-gathering-under-a-large-tree-at-nig.mp4'),
    time: 'Evening',
    title: "The Elders' Council",
    narration: 'As the heat of the day softens, the elders gather beneath the great tree. Here, no decision of consequence is made without them. Their silence carries more weight than most speeches. They are the village\'s living library — every scar on their hands a chapter, every wrinkle a verse.',
    sound: bs('soundsforyou-wind-in-trees-117477.mp3'),
    soundLabel: 'Wind in trees',
  },
  {
    video: av('african-elders-gathering-under-a-large-tree-at-nig (1).mp4'),
    time: 'Evening',
    title: 'The Original Courtroom',
    narration: 'The elder\'s tree is the original community centre — courtroom, council chamber, classroom, all under one canopy. Disputes are settled here. Marriages are blessed here. Children are given their names here. To sit beneath this tree is to enter the oldest institution in Ghana.',
    sound: bs('prem_adhikary-mountain-forest-high-quality-sound-176826.mp3'),
    soundLabel: 'Quiet forest',
  },
  {
    video: av('an-african-typical-village-market-scene-in-an-anci.mp4'),
    time: 'Afternoon',
    title: 'The Daylight Market',
    narration: 'Under the full sun, the market buzzes with colour and voice. The smell of groundnut soup and roasted yam fills the air. This is how communities have traded for a thousand years — face to face, hand to hand, with trust as the only currency that truly matters. The market is not commerce. It is conversation.',
    sound: bs('freesound_community-birds-in-forest-on-sunny-day-14444.mp3'),
    soundLabel: 'Village day',
  },
];

const SOUND_PERMISSION_KEY = 'mamaAfrica_soundPermission';

const timeColors = {
  Morning:   '#F5C842',
  Midday:    '#5a9e6a',
  Afternoon: '#e07020',
  Evening:   '#9b7fc8',
  Night:     '#C9A558',
};

export default function VillageExperiencePage() {
  const [sceneIdx, setSceneIdx]         = useState(0);
  const [playing, setPlaying]           = useState(false);
  const [soundOn, setSoundOn]           = useState(false);
  const [showNarration, setShowNarration] = useState(true);
  const [fadeScene, setFadeScene]       = useState(false);
  const [started, setStarted]           = useState(false);
  const [showSoundModal, setShowSoundModal] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const sceneRailRef = useRef(null);

  const scene      = SCENES[sceneIdx];
  const sceneColor = timeColors[scene.time] || '#C9A558';

  useEffect(() => {
    const perm = localStorage.getItem(SOUND_PERMISSION_KEY);
    if (perm === 'granted') setSoundOn(true);
  }, []);

  // Scroll active scene into view in the rail
  useEffect(() => {
    if (!sceneRailRef.current) return;
    const active = sceneRailRef.current.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [sceneIdx]);

  const goToScene = useCallback((idx) => {
    setFadeScene(true);
    setTimeout(() => { setSceneIdx(idx); setFadeScene(false); }, 280);
  }, []);

  const advance = useCallback(() => goToScene((sceneIdx + 1) % SCENES.length), [sceneIdx, goToScene]);
  const retreat = useCallback(() => goToScene((sceneIdx - 1 + SCENES.length) % SCENES.length), [sceneIdx, goToScene]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = !audio.paused;
    audio.pause();
    audio.src = scene.sound;
    audio.volume = 0.28;
    audio.loop = true;
    if (soundOn && wasPlaying) audio.play().catch(() => {});
  }, [sceneIdx]); // eslint-disable-line

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.28;
    if (soundOn) {
      if (!audio.src) audio.src = scene.sound;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundOn]); // eslint-disable-line

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    if (playing) vid.play().catch(() => {});
  }, [sceneIdx]); // eslint-disable-line

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) vid.play().catch(() => {});
    else vid.pause();
  }, [playing]);

  function handleStart() {
    setStarted(true);
    setPlaying(true);
    const perm = localStorage.getItem(SOUND_PERMISSION_KEY);
    if (perm === 'granted') setSoundOn(true);
    else if (perm !== 'denied') setShowSoundModal(true);
  }

  function handleAllowSound() {
    localStorage.setItem(SOUND_PERMISSION_KEY, 'granted');
    setSoundOn(true);
    setShowSoundModal(false);
  }

  function handleDenySound() {
    localStorage.setItem(SOUND_PERMISSION_KEY, 'denied');
    setShowSoundModal(false);
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <style>{`
        @keyframes villageFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes docPulse { 0%,100%{opacity:.5;transform:scale(.85)} 50%{opacity:1;transform:scale(1)} }
        .scene-rail::-webkit-scrollbar { display: none; }
        .scene-rail { scrollbar-width: none; }
        .scene-btn { transition: all 0.2s ease; }
        .scene-btn:hover { background: rgba(201,165,88,0.12) !important; border-color: rgba(201,165,88,0.35) !important; }
        .ctrl-btn { transition: all 0.2s ease; }
        .ctrl-btn:hover { background: rgba(255,255,255,0.18) !important; }
      `}</style>

      {showSoundModal && (
        <SoundPermissionModal pageName="village" onAllow={handleAllowSound} onDeny={handleDenySound} />
      )}

      <audio ref={audioRef} preload="none" />

      {/* ── FULL-BLEED STAGE ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 68px)',
        minHeight: 560,
        overflow: 'hidden',
        background: '#000',
      }}>

        {/* VIDEO */}
        <video
          ref={videoRef}
          key={sceneIdx}
          src={scene.video}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: fadeScene ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
          playsInline
          onEnded={advance}
        />

        {/* GRADIENT LAYERS */}
        {/* top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '28%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)', pointerEvents: 'none' }} />
        {/* bottom — strong for legibility */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)', pointerEvents: 'none' }} />
        {/* left side vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 0% 50%, rgba(0,0,0,0.35) 0%, transparent 55%)', pointerEvents: 'none' }} />

        {/* ── TOP BAR ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '26px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 10,
        }}>
          <Link to="/culture" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', textTransform: 'uppercase' }}>
            ← Culture Hub
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A558', boxShadow: '0 0 10px #C9A558', animation: 'docPulse 2.5s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: 'rgba(201,165,88,0.85)', textTransform: 'uppercase' }}>
              Mama Africa — Village Documentary
            </span>
          </div>
        </div>

        {/* ── TIME + COUNTER ── */}
        <div style={{
          position: 'absolute', top: '38%', left: 40,
          display: 'flex', alignItems: 'center', gap: 10,
          zIndex: 10,
          opacity: fadeScene ? 0 : 1, transition: 'opacity 0.3s',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: sceneColor, boxShadow: `0 0 14px ${sceneColor}80` }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.26em', color: sceneColor, textTransform: 'uppercase', fontWeight: 700 }}>
            {scene.time}
          </span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginLeft: 10 }}>
            {String(sceneIdx + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── NARRATION ── */}
        {showNarration && (
          <div style={{
            position: 'absolute', bottom: 152, left: 40, right: '32%',
            opacity: fadeScene ? 0 : 1, transition: 'opacity 0.3s ease',
            zIndex: 10,
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 3.2vw, 40px)',
              color: '#FAF0E0', margin: '0 0 12px', lineHeight: 1.15,
              textShadow: '0 2px 24px rgba(0,0,0,0.9)',
            }}>
              {scene.title}
            </h2>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              color: 'rgba(237,217,188,0.86)', lineHeight: 1.85, margin: 0,
              textShadow: '0 1px 14px rgba(0,0,0,0.95)',
              maxWidth: 560,
            }}>
              {scene.narration}
            </p>
          </div>
        )}

        {/* ── CONTROLS ROW ── */}
        <div style={{
          position: 'absolute', bottom: 96, left: 40, right: 40,
          display: 'flex', alignItems: 'center', gap: 10,
          zIndex: 10,
        }}>
          {/* Prev */}
          <button className="ctrl-btn" onClick={retreat} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>‹</button>

          {/* Play/Pause */}
          <button onClick={() => setPlaying(p => !p)} style={{ background: '#C9A558', border: 'none', borderRadius: '50%', width: 52, height: 52, color: '#111', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 28px rgba(201,165,88,0.55)', flexShrink: 0, transition: 'transform 0.15s, box-shadow 0.15s' }}>
            {playing ? '⏸' : '▶'}
          </button>

          {/* Next */}
          <button className="ctrl-btn" onClick={advance} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>›</button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 5, flex: 1, alignItems: 'center', marginLeft: 6 }}>
            {SCENES.map((_, i) => (
              <button key={i} onClick={() => { goToScene(i); setPlaying(true); }} style={{ width: i === sceneIdx ? 26 : 6, height: 4, borderRadius: 999, background: i === sceneIdx ? '#C9A558' : 'rgba(255,255,255,0.28)', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>

          {/* Sound label */}
          {soundOn && (
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.12em', color: 'rgba(90,158,106,0.85)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              ♪ {scene.soundLabel}
            </span>
          )}

          {/* Hide text */}
          <button className="ctrl-btn" onClick={() => setShowNarration(s => !s)} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: `1px solid ${showNarration ? 'rgba(201,165,88,0.5)' : 'rgba(255,255,255,0.18)'}`, borderRadius: 999, padding: '6px 14px', color: showNarration ? '#C9A558' : 'rgba(255,255,255,0.45)', fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase', flexShrink: 0 }}>
            {showNarration ? 'Hide Text' : 'Show Text'}
          </button>

          {/* Sound toggle */}
          <button className="ctrl-btn" onClick={() => setSoundOn(s => !s)} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: `1px solid ${soundOn ? 'rgba(90,158,106,0.55)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '50%', width: 40, height: 40, color: soundOn ? '#5a9e6a' : 'rgba(255,255,255,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>

        {/* ── SCENE RAIL (overlaid on video) ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
          {/* thin gold divider */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent 0%, rgba(201,165,88,0.25) 20%, rgba(201,165,88,0.25) 80%, transparent 100%)', margin: '0 40px 14px' }} />

          <div
            ref={sceneRailRef}
            className="scene-rail"
            style={{ display: 'flex', gap: 7, overflowX: 'auto', padding: '0 40px 22px' }}
          >
            {SCENES.map((s, i) => (
              <button
                key={i}
                data-active={i === sceneIdx ? 'true' : 'false'}
                className="scene-btn"
                onClick={() => { goToScene(i); setPlaying(true); }}
                style={{
                  background: i === sceneIdx ? 'rgba(201,165,88,0.14)' : 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(14px)',
                  border: `1px solid ${i === sceneIdx ? 'rgba(201,165,88,0.55)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  padding: '9px 16px',
                  cursor: 'pointer', textAlign: 'left',
                  flexShrink: 0, minWidth: 148,
                }}
              >
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, color: timeColors[s.time] || '#C9A558', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4, opacity: 0.9 }}>
                  {String(i + 1).padStart(2, '0')} — {s.time}
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: i === sceneIdx ? '#EDD9BC' : 'rgba(255,255,255,0.42)', fontWeight: i === sceneIdx ? 600 : 400, lineHeight: 1.35, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>
                  {s.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── START OVERLAY ── */}
        {!started && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, animation: 'villageFadeIn 0.5s ease' }}>
            <div style={{ fontSize: 54, marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(201,165,88,0.3))' }}>🌿</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 48px)', color: '#FAF0E0', textAlign: 'center', margin: '0 0 16px', maxWidth: 640, lineHeight: 1.15, padding: '0 24px' }}>
              A Morning to Night in an<br />
              <span style={{ color: '#C9A558' }}>Ancient Ghanaian Village</span>
            </h2>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#BA9D7C', textAlign: 'center', maxWidth: 480, lineHeight: 1.85, padding: '0 24px', marginBottom: 40 }}>
              Ten scenes. One village. Each scene with its own ambient sound — birds, streams, wind, and forest — telling a full day from morning to night market.
            </p>
            <button
              onClick={handleStart}
              style={{ background: 'linear-gradient(135deg, #C9A558 0%, #8B6914 100%)', border: 'none', borderRadius: 999, padding: '16px 48px', fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 40px rgba(201,165,88,0.45)' }}
            >
              Begin the Documentary →
            </button>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ textAlign: 'center', padding: '20px 0 32px', background: '#050300' }}>
        <Link to="/culture" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.14em', color: '#7C5F48', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Return to Culture Hub
        </Link>
      </div>
    </div>
  );
}
