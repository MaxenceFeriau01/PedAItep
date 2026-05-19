import { useEffect } from 'react'
import confetti from 'canvas-confetti'

// ===== COLORIAGES SVG =====
const DRAWINGS = {
  rainbow: (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      {/* Ciel */}
      <rect width="300" height="200" fill="#EFF6FF"/>
      {/* Arc-en-ciel - traits noirs à colorier */}
      {[80,68,56,44,32].map((r,i) => (
        <path key={i} d={`M ${150-r*1.5} 160 A ${r*1.5} ${r} 0 0 1 ${150+r*1.5} 160`}
          fill="none" stroke="#1F2937" strokeWidth="7" strokeLinecap="round"/>
      ))}
      {/* Nuages */}
      <ellipse cx="40" cy="150" rx="28" ry="18" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="58" cy="140" rx="24" ry="16" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="22" cy="145" rx="20" ry="14" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="260" cy="150" rx="28" ry="18" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="278" cy="140" rx="24" ry="16" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="242" cy="145" rx="20" ry="14" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Sol */}
      <rect x="0" y="170" width="300" height="30" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Herbe */}
      {Array.from({length:15}).map((_,i) => (
        <line key={i} x1={10+i*20} y1="170" x2={15+i*20} y2="155" stroke="#1F2937" strokeWidth="2"/>
      ))}
      <text x="150" y="195" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Colorie l'arc-en-ciel ! 🖌️</text>
    </svg>
  ),
  jungle: (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="300" height="200" fill="#F0FDF4"/>
      {/* Arbres */}
      <rect x="30" y="100" width="12" height="80" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="36" cy="90" rx="30" ry="40" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="130" y="110" width="10" height="70" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="135" cy="98" rx="25" ry="35" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="240" y="105" width="12" height="75" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <ellipse cx="246" cy="92" rx="28" ry="38" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Lion */}
      <circle cx="90" cy="145" r="22" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <circle cx="90" cy="145" r="16" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <circle cx="84" cy="140" r="3" fill="#1F2937"/>
      <circle cx="96" cy="140" r="3" fill="#1F2937"/>
      <path d="M 84 150 Q 90 156 96 150" fill="none" stroke="#1F2937" strokeWidth="2"/>
      {/* Singe */}
      <circle cx="195" cy="130" r="16" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <circle cx="189" cy="126" r="4" fill="#1F2937"/>
      <circle cx="201" cy="126" r="4" fill="#1F2937"/>
      <ellipse cx="195" cy="136" rx="8" ry="5" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      <path d="M 186 120 Q 183 110 188 108" fill="none" stroke="#1F2937" strokeWidth="2"/>
      {/* Sol */}
      <rect x="0" y="175" width="300" height="25" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <text x="150" y="195" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Colorie la jungle ! 🖌️</text>
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 300 220" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="300" height="220" fill="#F8FAFC"/>
      {/* Corps */}
      <rect x="95" y="95" width="110" height="90" rx="10" fill="white" stroke="#1F2937" strokeWidth="2.5"/>
      {/* Tête */}
      <rect x="105" y="45" width="90" height="70" rx="12" fill="white" stroke="#1F2937" strokeWidth="2.5"/>
      {/* Antenne */}
      <line x1="150" y1="45" x2="150" y2="28" stroke="#1F2937" strokeWidth="2.5"/>
      <circle cx="150" cy="24" r="6" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Yeux */}
      <rect x="118" y="60" width="22" height="18" rx="4" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="160" y="60" width="22" height="18" rx="4" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <circle cx="129" cy="69" r="5" fill="#1F2937"/>
      <circle cx="171" cy="69" r="5" fill="#1F2937"/>
      {/* Bouche */}
      <rect x="120" y="90" width="60" height="14" rx="4" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {[130,140,150,160,170].map((x,i) => (
        <line key={i} x1={x} y1="90" x2={x} y2="104" stroke="#1F2937" strokeWidth="1.5"/>
      ))}
      {/* Boutons corps */}
      {[0,1,2].map(i => <circle key={i} cx="150" cy={115+i*20} r="7" fill="white" stroke="#1F2937" strokeWidth="2"/>)}
      <rect x="108" y="110" width="20" height="14" rx="3" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      <rect x="172" y="110" width="20" height="14" rx="3" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      {/* Bras */}
      <rect x="58" y="100" width="37" height="20" rx="8" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="205" y="100" width="37" height="20" rx="8" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Jambes */}
      <rect x="108" y="185" width="30" height="30" rx="6" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="162" y="185" width="30" height="30" rx="6" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <text x="150" y="215" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Colorie le robot ! 🖌️</text>
    </svg>
  ),
  bibliotheque: (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="300" height="200" fill="#FFF7ED"/>
      {/* Étagère */}
      <rect x="10" y="140" width="280" height="8" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <rect x="10" y="80" width="280" height="8" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Livres bas */}
      {[
        {x:20,w:22,h:52,r:3},{x:46,w:18,h:46,r:3},{x:68,w:25,h:56,r:3},
        {x:97,w:20,h:50,r:3},{x:121,w:16,h:44,r:3},{x:141,w:28,h:58,r:3},
        {x:173,w:22,h:52,r:3},{x:199,w:18,h:48,r:3},{x:221,w:24,h:54,r:3},
        {x:249,w:20,h:46,r:3},{x:273,w:16,h:52,r:3},
      ].map((b,i) => (
        <rect key={i} x={b.x} y={140-b.h} width={b.w} height={b.h} rx={b.r}
          fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      ))}
      {/* Livres qui volent */}
      <rect x="60" y="30" width="35" height="26" rx="3" fill="white" stroke="#1F2937" strokeWidth="2" transform="rotate(-15,77,43)"/>
      <rect x="130" y="20" width="40" height="28" rx="3" fill="white" stroke="#1F2937" strokeWidth="2" transform="rotate(10,150,34)"/>
      <rect x="210" y="28" width="35" height="26" rx="3" fill="white" stroke="#1F2937" strokeWidth="2" transform="rotate(-8,227,41)"/>
      {/* Étoiles magiques */}
      {[[95,45],[170,35],[240,55]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize="14" textAnchor="middle">✨</text>
      ))}
      <text x="150" y="192" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Colorie la bibliothèque ! 🖌️</text>
    </svg>
  ),
}

// ===== ACTIVITÉS PAPIER =====
const ACTIVITIES = {
  labyrinthe: (
    <svg viewBox="0 0 280 220" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="280" height="220" fill="#FAFAFA"/>
      <text x="140" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1F2937" fontFamily="sans-serif">🐰 Aide le lapin à trouver sa carotte !</text>
      {/* Labyrinthe simple */}
      {/* Bordure externe */}
      <rect x="20" y="30" width="240" height="160" fill="none" stroke="#1F2937" strokeWidth="3"/>
      {/* Murs intérieurs */}
      <line x1="60" y1="30" x2="60" y2="110" stroke="#1F2937" strokeWidth="3"/>
      <line x1="60" y1="130" x2="60" y2="190" stroke="#1F2937" strokeWidth="3"/>
      <line x1="100" y1="70" x2="100" y2="190" stroke="#1F2937" strokeWidth="3"/>
      <line x1="140" y1="30" x2="140" y2="90" stroke="#1F2937" strokeWidth="3"/>
      <line x1="140" y1="110" x2="140" y2="150" stroke="#1F2937" strokeWidth="3"/>
      <line x1="180" y1="70" x2="180" y2="130" stroke="#1F2937" strokeWidth="3"/>
      <line x1="180" y1="150" x2="180" y2="190" stroke="#1F2937" strokeWidth="3"/>
      <line x1="60" y1="70" x2="140" y2="70" stroke="#1F2937" strokeWidth="3"/>
      <line x1="100" y1="110" x2="180" y2="110" stroke="#1F2937" strokeWidth="3"/>
      <line x1="140" y1="150" x2="260" y2="150" stroke="#1F2937" strokeWidth="3"/>
      <line x1="60" y1="150" x2="100" y2="150" stroke="#1F2937" strokeWidth="3"/>
      {/* Entrée/Sortie */}
      <text x="28" y="48" fontSize="18" fontFamily="sans-serif">🐰</text>
      <text x="235" y="185" fontSize="18" fontFamily="sans-serif">🥕</text>
      <text x="140" y="215" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="sans-serif">Trace le chemin avec ton crayon !</text>
    </svg>
  ),
  relier_points: (
    <svg viewBox="0 0 280 220" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="280" height="220" fill="#FAFAFA"/>
      <text x="140" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1F2937" fontFamily="sans-serif">Relie les points 1 à 20 !</text>
      {/* Points en forme de poisson */}
      {[
        [140,40],[165,50],[185,65],[195,85],[190,105],
        [175,120],[155,130],[140,135],[120,130],[100,120],
        [85,105],[80,85],[90,65],[110,50],[130,42],
        [150,55],[170,75],[175,95],[160,115],[140,120],
      ].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
          <text x={x} y={y+4} textAnchor="middle" fontSize="7" fill="#1F2937" fontFamily="sans-serif" fontWeight="bold">{i+1}</text>
        </g>
      ))}
      {/* Œil du poisson (point de référence) */}
      <circle cx="108" cy="78" r="5" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      <circle cx="108" cy="78" r="2" fill="#1F2937"/>
      <text x="140" y="212" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="sans-serif">Quel animal vas-tu découvrir ? 🐟</text>
    </svg>
  ),
  diplome: (
    <svg viewBox="0 0 280 200" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="280" height="200" fill="#FFFBEB"/>
      {/* Cadre doré */}
      <rect x="8" y="8" width="264" height="184" rx="8" fill="none" stroke="#D97706" strokeWidth="3"/>
      <rect x="14" y="14" width="252" height="172" rx="6" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* Titre */}
      <text x="140" y="42" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#D97706" fontFamily="serif">🏆 DIPLÔME 🏆</text>
      <text x="140" y="60" textAnchor="middle" fontSize="11" fill="#6B7280" fontFamily="serif">de Super Champion</text>
      {/* Ligne de nom */}
      <text x="140" y="88" textAnchor="middle" fontSize="10" fill="#374151" fontFamily="sans-serif">Ce diplôme est décerné à :</text>
      <line x1="50" y1="105" x2="230" y2="105" stroke="#D97706" strokeWidth="1.5"/>
      {/* Étoiles */}
      {[60,100,140,180,220].map((x,i) => (
        <text key={i} x={x} y="130" fontSize="18" textAnchor="middle">⭐</text>
      ))}
      {/* Citation */}
      <text x="140" y="150" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="serif" fontStyle="italic">"Tu es un(e) vrai(e) champion(ne) !"</text>
      {/* Signature */}
      <text x="80" y="175" textAnchor="middle" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">Date : ___________</text>
      <text x="210" y="175" textAnchor="middle" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">Signature : ________</text>
    </svg>
  ),
  imagier: (
    <svg viewBox="0 0 280 210" width="100%" style={{ display: 'block', background: '#fff', borderRadius: 12 }}>
      <rect width="280" height="210" fill="#EFF6FF"/>
      <text x="140" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1D4ED8" fontFamily="sans-serif">🌐 Mon imagier anglais !</text>
      {/* 6 cases */}
      {[0,1,2,3,4,5].map(i => {
        const x = 15 + (i%3) * 85
        const y = 28 + Math.floor(i/3) * 85
        const labels = [['🐱','cat'],['🐶','dog'],['🌳','tree'],['☀️','sun'],['🏠','house'],['📚','book']]
        return (
          <g key={i}>
            <rect x={x} y={y} width="75" height="75" rx="8" fill="white" stroke="#1D4ED8" strokeWidth="1.5"/>
            <text x={x+37} y={y+38} fontSize="24" textAnchor="middle">{labels[i][0]}</text>
            <text x={x+37} y={y+60} fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1D4ED8" fontFamily="sans-serif">{labels[i][1]}</text>
            <line x1={x+10} y1={y+70} x2={x+65} y2={y+70} stroke="#BFDBFE" strokeWidth="1"/>
          </g>
        )
      })}
      <text x="140" y="205" textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="sans-serif">Colorie et écris les mots en français !</text>
    </svg>
  ),
}

// Correspondance trophée → dessin
const REWARD_SVG = {
  color_master:   DRAWINGS.rainbow,
  animal_friend:  DRAWINGS.jungle,
  logic_master:   DRAWINGS.robot,
  french_reader:  DRAWINGS.bibliotheque,
  math_genius:    ACTIVITIES.labyrinthe,
  streak_5:       ACTIVITIES.relier_points,
  champion:       ACTIVITIES.diplome,
  world_explorer: ACTIVITIES.imagier,
}

const LEVEL_NAMES = ['Débutant','Explorateur','Aventurier','Champion','Génie','Super-Génie','Légende']

export default function RewardModal({ reward, profile, onClose }) {
  useEffect(() => {
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 } })
  }, [])

  const isTrophy = reward.type === 'trophy'
  const trophy   = reward.trophy
  const level    = reward.level
  const svgContent = isTrophy ? REWARD_SVG[trophy?.id] : null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
      zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, overflowY: 'auto',
    }}>
      <div className="fade-up" style={{
        background: 'linear-gradient(135deg, #1A1030 0%, #2D1F60 100%)',
        border: '2px solid rgba(255,215,61,0.4)',
        borderRadius: 28, padding: 28, width: '100%', maxWidth: 420,
        textAlign: 'center', position: 'relative',
      }}>
        {/* Fermer */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(255,255,255,0.08)', border: 'none',
          borderRadius: '50%', width: 32, height: 32, color: 'var(--text-muted)',
          cursor: 'pointer', fontSize: 16, fontFamily: 'Nunito',
        }}>✕</button>

        {isTrophy ? (
          <>
            {/* TROPHÉE */}
            <div style={{ fontSize: 64, marginBottom: 8 }}>{trophy.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
              🏆 Nouveau trophée !
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>{trophy.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>{trophy.desc}</p>

            {/* Badge type récompense */}
            <div style={{
              display: 'inline-block', borderRadius: 20, padding: '5px 16px',
              fontSize: 12, fontWeight: 800, marginBottom: 16,
              background: trophy.rewardType === 'drawing' ? 'rgba(100,180,255,0.15)' : 'rgba(255,215,61,0.15)',
              color: trophy.rewardType === 'drawing' ? '#64B4FF' : 'var(--gold)',
              border: `1px solid ${trophy.rewardType === 'drawing' ? 'rgba(100,180,255,0.3)' : 'rgba(255,215,61,0.3)'}`,
            }}>
              {trophy.rewardType === 'drawing' ? '🖌️ Coloriage à imprimer' : '✂️ Activité à imprimer'}
            </div>

            <p style={{ fontSize: 15, fontWeight: 900, color: 'var(--gold)', marginBottom: 6 }}>{trophy.rewardTitle}</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>{trophy.rewardDesc}</p>

            {/* Le SVG de récompense */}
            {svgContent && (
              <div style={{ marginBottom: 20, borderRadius: 14, overflow: 'hidden', border: '2px solid rgba(255,215,61,0.2)' }}>
                {svgContent}
              </div>
            )}

            <p style={{ fontSize: 11, color: 'var(--text-hint)', marginBottom: 16 }}>
              💡 Fais une capture d'écran ou demande à un adulte d'imprimer ce dessin !
            </p>
          </>
        ) : (
          <>
            {/* NIVEAU */}
            <div style={{ fontSize: 72, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#A78BFA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
              Niveau supérieur !
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 4 }}>Niveau {level}</h2>
            <div style={{
              display: 'inline-block', background: 'rgba(167,139,250,0.15)',
              border: '1px solid rgba(167,139,250,0.3)', borderRadius: 20,
              padding: '6px 18px', fontSize: 14, fontWeight: 800, color: '#A78BFA', marginBottom: 20,
            }}>
              {LEVEL_NAMES[Math.min(level-1, LEVEL_NAMES.length-1)]}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
              Bravo {profile?.name} ! Tu continues à progresser, continue comme ça ! 💪
            </p>
            {/* Étoiles animées */}
            <div style={{ fontSize: 40, letterSpacing: 8, marginBottom: 20 }}>⭐⭐⭐</div>
          </>
        )}

        <button className="btn btn-gold" onClick={onClose} style={{ width: '100%', fontSize: 16 }}>
          Super, merci ! 🎉
        </button>
      </div>
    </div>
  )
}