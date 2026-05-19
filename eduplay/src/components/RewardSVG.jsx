// Tous les SVG des récompenses — fichier .jsx obligatoire pour le JSX

export const TIERS = [
  { tier: 1, label: 'Débutant',    stars: 5,   color: '#6B7280', icon: '🌱' },
  { tier: 2, label: 'Explorateur', stars: 15,  color: '#3B82F6', icon: '🔭' },
  { tier: 3, label: 'Aventurier',  stars: 30,  color: '#10B981', icon: '⚔️' },
  { tier: 4, label: 'Champion',    stars: 50,  color: '#F59E0B', icon: '🏅' },
  { tier: 5, label: 'Héros',       stars: 75,  color: '#EF4444', icon: '🦸' },
  { tier: 6, label: 'Légende',     stars: 100, color: '#A855F7', icon: '👑' },
]

// ── Soleil ───────────────────────────────────────────────────────
function SvgSoleil() {
  return (
    <svg viewBox="0 0 300 270" width="100%" style={{ display: 'block', background: '#FFF9F0', borderRadius: 12 }}>
      <rect width="300" height="270" fill="#FFF9F0" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <line key={i} x1={150 + Math.cos(a) * 68} y1={125 + Math.sin(a) * 68}
          x2={150 + Math.cos(a) * 90} y2={125 + Math.sin(a) * 90}
          stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
      })}
      <circle cx="150" cy="125" r="60" fill="white" stroke="#1F2937" strokeWidth="3" />
      <circle cx="130" cy="113" r="8" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="170" cy="113" r="8" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="133" cy="115" r="4" fill="#1F2937" />
      <circle cx="173" cy="115" r="4" fill="#1F2937" />
      <path d="M 122 144 Q 150 166 178 144" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="118" cy="144" rx="11" ry="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <ellipse cx="182" cy="144" rx="11" ry="7" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="0" y="210" width="300" height="52" fill="white" stroke="#1F2937" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={12 + i * 24} y1="210" x2={18 + i * 24} y2="196"
          stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <text x="150" y="262" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie le soleil ! ☀️</text>
    </svg>
  )
}

// ── Fleurs ───────────────────────────────────────────────────────
function SvgFleurs() {
  return (
    <svg viewBox="0 0 300 270" width="100%" style={{ display: 'block', background: '#F0FFF4', borderRadius: 12 }}>
      <rect width="300" height="270" fill="#F0FFF4" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        const px = 150 + Math.cos(a) * 32, py = 105 + Math.sin(a) * 32
        return <ellipse key={i} cx={px} cy={py} rx="18" ry="26" fill="white" stroke="#1F2937" strokeWidth="2"
          transform={`rotate(${i * 60},${px},${py})`} />
      })}
      <circle cx="150" cy="105" r="22" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="143" cy="101" r="3" fill="#1F2937" /><circle cx="157" cy="101" r="3" fill="#1F2937" />
      <path d="M 142 112 Q 150 120 158 112" fill="none" stroke="#1F2937" strokeWidth="2" />
      <line x1="150" y1="127" x2="150" y2="200" stroke="#1F2937" strokeWidth="3" />
      <ellipse cx="132" cy="168" rx="20" ry="12" fill="white" stroke="#1F2937" strokeWidth="2" transform="rotate(-30,132,168)" />
      <ellipse cx="168" cy="178" rx="20" ry="12" fill="white" stroke="#1F2937" strokeWidth="2" transform="rotate(30,168,178)" />
      {[[68, 155], [232, 148]].map(([x, y], fi) => (
        <g key={fi}>
          {Array.from({ length: 5 }, (_, i) => {
            const a = (i / 5) * Math.PI * 2
            return <ellipse key={i} cx={x + Math.cos(a) * 16} cy={y + Math.sin(a) * 16} rx="10" ry="14"
              fill="white" stroke="#1F2937" strokeWidth="1.5"
              transform={`rotate(${i * 72},${x + Math.cos(a) * 16},${y + Math.sin(a) * 16})`} />
          })}
          <circle cx={x} cy={y} r="12" fill="white" stroke="#1F2937" strokeWidth="2" />
        </g>
      ))}
      <text x="150" y="262" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie les fleurs ! 🌸</text>
    </svg>
  )
}

// ── Labyrinthe facile ────────────────────────────────────────────
function SvgLabyrintheFacile() {
  const walls = [
    [[20, 72], [120, 72]], [[140, 72], [280, 72]],
    [[55, 34], [55, 112]], [[55, 132], [55, 224]],
    [[95, 72], [95, 224]],
    [[135, 34], [135, 92]], [[135, 112], [135, 152]],
    [[175, 72], [175, 132]], [[175, 152], [175, 224]],
    [[215, 34], [215, 152]],
    [[95, 112], [175, 112]],
    [[55, 152], [95, 152]], [[135, 152], [280, 152]],
  ]
  return (
    <svg viewBox="0 0 300 260" width="100%" style={{ display: 'block', background: '#FAFAFA', borderRadius: 12 }}>
      <rect width="300" height="260" fill="#FAFAFA" />
      <text x="150" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1F2937" fontFamily="sans-serif">🐰 Aide le lapin à trouver sa carotte !</text>
      <rect x="20" y="34" width="260" height="190" fill="none" stroke="#1F2937" strokeWidth="3" />
      {walls.map(([[x1, y1], [x2, y2]], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1F2937" strokeWidth="3" />
      ))}
      <text x="26" y="58" fontSize="20">🐰</text>
      <text x="242" y="218" fontSize="20">🥕</text>
      <text x="150" y="252" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Trace le chemin avec ton crayon !</text>
    </svg>
  )
}

// ── Arc-en-ciel ──────────────────────────────────────────────────
function SvgArcEnCiel() {
  return (
    <svg viewBox="0 0 300 270" width="100%" style={{ display: 'block', background: '#EFF6FF', borderRadius: 12 }}>
      <rect width="300" height="270" fill="#EFF6FF" />
      {[82, 70, 58, 46, 34].map((r, i) => (
        <path key={i} d={`M ${150 - r * 1.6} 200 A ${r * 1.6} ${r} 0 0 1 ${150 + r * 1.6} 200`}
          fill="none" stroke="#1F2937" strokeWidth="9" strokeLinecap="round" />
      ))}
      {[[45, 188], [255, 188]].map(([cx, cy], ci) => (
        <g key={ci}>
          <ellipse cx={cx} cy={cy} rx="30" ry="20" fill="white" stroke="#1F2937" strokeWidth="2" />
          <ellipse cx={cx + 15} cy={cy - 12} rx="22" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
          <ellipse cx={cx - 15} cy={cy - 8} rx="18" ry="13" fill="white" stroke="#1F2937" strokeWidth="2" />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={150 + Math.cos(a) * 28} y1={45 + Math.sin(a) * 28}
          x2={150 + Math.cos(a) * 38} y2={45 + Math.sin(a) * 38}
          stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      })}
      <circle cx="150" cy="45" r="24" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="144" cy="42" r="3" fill="#1F2937" /><circle cx="156" cy="42" r="3" fill="#1F2937" />
      <path d="M 143 51 Q 150 57 157 51" fill="none" stroke="#1F2937" strokeWidth="2" />
      <text x="150" y="262" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie l'arc-en-ciel ! 🌈</text>
    </svg>
  )
}

// ── Relier les points ────────────────────────────────────────────
function SvgRelierPoints() {
  const pts = [
    [150,40],[175,52],[195,68],[205,90],[200,112],
    [185,128],[165,140],[150,145],[130,140],[110,128],
    [95,112],[90,90],[100,68],[120,52],[140,44],
    [160,58],[178,80],[183,102],[168,122],[150,128],
  ]
  return (
    <svg viewBox="0 0 300 260" width="100%" style={{ display: 'block', background: '#F0F9FF', borderRadius: 12 }}>
      <rect width="300" height="260" fill="#F0F9FF" />
      <text x="150" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1F2937" fontFamily="sans-serif">Relie les points 1 à 20 !</text>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="white" stroke="#1F2937" strokeWidth="2" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill="#1F2937" fontFamily="sans-serif" fontWeight="bold">{i + 1}</text>
        </g>
      ))}
      <circle cx="115" cy="85" r="6" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <circle cx="115" cy="85" r="3" fill="#1F2937" />
      <text x="150" y="252" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Quel animal vas-tu découvrir ? 🐟</text>
    </svg>
  )
}

// ── Jungle ───────────────────────────────────────────────────────
function SvgJungle() {
  return (
    <svg viewBox="0 0 300 270" width="100%" style={{ display: 'block', background: '#F0FFF4', borderRadius: 12 }}>
      <rect width="300" height="270" fill="#F0FFF4" />
      {[[40, 80, 100], [150, 70, 108], [260, 75, 104]].map(([cx, top, trunk], i) => (
        <g key={i}>
          <rect x={cx - 6} y={trunk} width="12" height={220 - trunk} fill="white" stroke="#1F2937" strokeWidth="2" />
          <ellipse cx={cx} cy={top} rx={36 - i * 2} ry={48 - i * 2} fill="white" stroke="#1F2937" strokeWidth="2" />
        </g>
      ))}
      <circle cx="95" cy="170" r="26" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="95" cy="170" r="18" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="88" cy="165" r="3.5" fill="#1F2937" /><circle cx="102" cy="165" r="3.5" fill="#1F2937" />
      <path d="M 87 176 Q 95 184 103 176" fill="none" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="205" cy="158" r="18" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="198" cy="153" r="4.5" fill="#1F2937" /><circle cx="212" cy="153" r="4.5" fill="#1F2937" />
      <ellipse cx="205" cy="165" rx="9" ry="6" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M 196 148 Q 192 135 198 133" fill="none" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="0" y="215" width="300" height="47" fill="white" stroke="#1F2937" strokeWidth="2" />
      <text x="150" y="255" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie la jungle ! 🦁</text>
    </svg>
  )
}

// ── Robot ────────────────────────────────────────────────────────
function SvgRobot() {
  return (
    <svg viewBox="0 0 300 280" width="100%" style={{ display: 'block', background: '#F8FAFC', borderRadius: 12 }}>
      <rect width="300" height="280" fill="#F8FAFC" />
      <rect x="95" y="100" width="110" height="95" rx="10" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <rect x="105" y="48" width="90" height="72" rx="12" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <line x1="150" y1="48" x2="150" y2="30" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="150" cy="25" r="7" fill="white" stroke="#1F2937" strokeWidth="2" />
      <rect x="116" y="62" width="24" height="20" rx="5" fill="white" stroke="#1F2937" strokeWidth="2" />
      <rect x="160" y="62" width="24" height="20" rx="5" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="128" cy="72" r="6" fill="#1F2937" /><circle cx="172" cy="72" r="6" fill="#1F2937" />
      <rect x="118" y="93" width="64" height="16" rx="5" fill="white" stroke="#1F2937" strokeWidth="2" />
      {[128, 138, 148, 158, 168, 178].map((x, i) => (
        <line key={i} x1={x} y1="93" x2={x} y2="109" stroke="#1F2937" strokeWidth="1.5" />
      ))}
      {[0, 1, 2].map(i => <circle key={i} cx="150" cy={118 + i * 22} r="8" fill="white" stroke="#1F2937" strokeWidth="2" />)}
      <rect x="108" y="114" width="22" height="16" rx="3" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="170" y="114" width="22" height="16" rx="3" fill="white" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="55" y="104" width="40" height="22" rx="9" fill="white" stroke="#1F2937" strokeWidth="2" />
      <rect x="205" y="104" width="40" height="22" rx="9" fill="white" stroke="#1F2937" strokeWidth="2" />
      <rect x="106" y="195" width="32" height="35" rx="7" fill="white" stroke="#1F2937" strokeWidth="2" />
      <rect x="162" y="195" width="32" height="35" rx="7" fill="white" stroke="#1F2937" strokeWidth="2" />
      <text x="150" y="272" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie le robot ! 🤖</text>
    </svg>
  )
}

// ── Labyrinthe difficile ─────────────────────────────────────────
function SvgLabyrintheDifficile() {
  const walls = [
    [[15,72],[115,72]],[[135,72],[285,72]],
    [[55,72],[55,152]],[[55,172],[55,232]],
    [[95,34],[95,112]],[[95,132],[95,192]],
    [[135,72],[135,152]],[[135,172],[135,232]],
    [[175,34],[175,72]],[[175,92],[175,172]],[[175,192],[175,232]],
    [[215,72],[215,152]],[[215,172],[215,232]],
    [[255,34],[255,72]],[[255,92],[255,152]],
    [[15,112],[55,112]],[[75,112],[135,112]],
    [[175,112],[215,112]],[[235,112],[285,112]],
    [[55,152],[135,152]],[[155,152],[215,152]],[[235,152],[285,152]],
    [[95,192],[135,192]],[[155,192],[215,192]],
  ]
  return (
    <svg viewBox="0 0 300 260" width="100%" style={{ display: 'block', background: '#FAFAFA', borderRadius: 12 }}>
      <rect width="300" height="260" fill="#FAFAFA" />
      <text x="150" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1F2937" fontFamily="sans-serif">🏰 Trouve la sortie du château !</text>
      <rect x="15" y="32" width="270" height="200" fill="none" stroke="#1F2937" strokeWidth="3" />
      {walls.map(([[x1,y1],[x2,y2]], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1F2937" strokeWidth="2.5" />
      ))}
      <text x="20" y="56" fontSize="18">🧙</text>
      <text x="258" y="248" fontSize="18">🚪</text>
      <text x="150" y="252" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="sans-serif">Plus difficile — bonne chance ! 🏰</text>
    </svg>
  )
}

// ── Dragon ───────────────────────────────────────────────────────
function SvgDragon() {
  return (
    <svg viewBox="0 0 300 280" width="100%" style={{ display: 'block', background: '#FFF7F0', borderRadius: 12 }}>
      <rect width="300" height="280" fill="#FFF7F0" />
      <ellipse cx="155" cy="165" rx="75" ry="55" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <ellipse cx="105" cy="105" rx="45" ry="38" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <ellipse cx="72" cy="112" rx="22" ry="16" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="65" cy="110" r="4" fill="#1F2937" /><circle cx="80" cy="110" r="4" fill="#1F2937" />
      <ellipse cx="100" cy="92" rx="10" ry="12" fill="white" stroke="#1F2937" strokeWidth="2" />
      <ellipse cx="124" cy="90" rx="10" ry="12" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="102" cy="94" r="5" fill="#1F2937" /><circle cx="126" cy="92" r="5" fill="#1F2937" />
      <polygon points="96,68 88,42 104,62" fill="white" stroke="#1F2937" strokeWidth="2" />
      <polygon points="118,64 114,38 126,58" fill="white" stroke="#1F2937" strokeWidth="2" />
      <path d="M 185 130 Q 250 70 280 90 Q 260 130 220 145 Z" fill="white" stroke="#1F2937" strokeWidth="2" />
      <path d="M 190 145 Q 255 100 285 115 Q 265 148 225 158 Z" fill="white" stroke="#1F2937" strokeWidth="2" />
      {[0, 1, 2, 3].map(row =>
        Array.from({ length: 5 - row }, (_, col) => (
          <path key={`${row}-${col}`}
            d={`M ${95 + col * 22 + row * 11} ${145 + row * 18} Q ${106 + col * 22 + row * 11} ${135 + row * 18} ${117 + col * 22 + row * 11} ${145 + row * 18}`}
            fill="white" stroke="#1F2937" strokeWidth="1.5" />
        ))
      )}
      <path d="M 225 190 Q 270 195 285 215 Q 275 230 258 210 Q 245 225 235 205" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      {[[110, 210], [160, 215], [185, 210], [215, 208]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="14" ry="10" fill="white" stroke="#1F2937" strokeWidth="2" />
      ))}
      <text x="150" y="272" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie le dragon ! 🐉</text>
    </svg>
  )
}

// ── Imagier anglais ──────────────────────────────────────────────
function SvgImagier() {
  const items = [
    [15,28,'🐱','cat','chat'],[97,28,'🐶','dog','chien'],[179,28,'🌳','tree','arbre'],
    [15,110,'☀️','sun','soleil'],[97,110,'🏠','house','maison'],[179,110,'📚','book','livre'],
    [15,192,'🚗','car','voiture'],[97,192,'🌸','flower','fleur'],[179,192,'🐟','fish','poisson'],
  ]
  return (
    <svg viewBox="0 0 300 275" width="100%" style={{ display: 'block', background: '#EFF6FF', borderRadius: 12 }}>
      <rect width="300" height="275" fill="#EFF6FF" />
      <text x="150" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1D4ED8" fontFamily="sans-serif">🌐 Mon imagier anglais !</text>
      {items.map(([x, y, em, en, fr], i) => (
        <g key={i}>
          <rect x={x} y={y} width="72" height="72" rx="8" fill="white" stroke="#1D4ED8" strokeWidth="1.5" />
          <text x={x + 36} y={y + 36} fontSize="22" textAnchor="middle">{em}</text>
          <text x={x + 36} y={y + 52} fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1D4ED8" fontFamily="sans-serif">{en}</text>
          <line x1={x + 8} y1={y + 62} x2={x + 64} y2={y + 62} stroke="#BFDBFE" strokeWidth="1" />
          <text x={x + 36} y={y + 69} fontSize="8" textAnchor="middle" fill="#6B7280" fontFamily="sans-serif">{fr}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Diplôme ──────────────────────────────────────────────────────
function SvgDiplome() {
  return (
    <svg viewBox="0 0 300 220" width="100%" style={{ display: 'block', background: '#FFFBEB', borderRadius: 12 }}>
      <rect width="300" height="220" fill="#FFFBEB" />
      <rect x="6" y="6" width="288" height="208" rx="10" fill="none" stroke="#D97706" strokeWidth="3" />
      <rect x="12" y="12" width="276" height="196" rx="8" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="5,4" />
      {[[20, 20], [280, 20], [20, 200], [280, 200], [150, 14]].map(([x, y], i) => (
        <text key={i} x={x} y={y + 8} fontSize="16" textAnchor="middle">⭐</text>
      ))}
      <text x="150" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#D97706" fontFamily="serif">🏆 DIPLÔME 🏆</text>
      <text x="150" y="68" textAnchor="middle" fontSize="12" fill="#92400E" fontFamily="serif">de Super Champion EduPlay</text>
      <line x1="40" y1="78" x2="260" y2="78" stroke="#D97706" strokeWidth="1.5" />
      <text x="150" y="98" textAnchor="middle" fontSize="11" fill="#374151" fontFamily="sans-serif">Ce diplôme est décerné à :</text>
      <line x1="50" y1="116" x2="250" y2="116" stroke="#D97706" strokeWidth="2" />
      {[55, 95, 135, 175, 215, 255].map((x, i) => (
        <text key={i} x={x} y="142" fontSize="18" textAnchor="middle">⭐</text>
      ))}
      <text x="150" y="165" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="serif" fontStyle="italic">"Tu es un(e) vrai(e) super champion(ne) !"</text>
      <line x1="40" y1="175" x2="140" y2="175" stroke="#D97706" strokeWidth="1" />
      <line x1="160" y1="175" x2="260" y2="175" stroke="#D97706" strokeWidth="1" />
      <text x="90" y="188" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">Date : ___________</text>
      <text x="210" y="188" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">Signature : _______</text>
    </svg>
  )
}

// ── Licorne ──────────────────────────────────────────────────────
function SvgLicorne() {
  return (
    <svg viewBox="0 0 300 280" width="100%" style={{ display: 'block', background: '#FDF4FF', borderRadius: 12 }}>
      <rect width="300" height="280" fill="#FDF4FF" />
      <ellipse cx="160" cy="175" rx="80" ry="52" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="96" cy="108" r="42" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <ellipse cx="70" cy="118" rx="20" ry="15" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="64" cy="116" r="3.5" fill="#1F2937" /><circle cx="77" cy="116" r="3.5" fill="#1F2937" />
      <ellipse cx="104" cy="100" rx="11" ry="13" fill="white" stroke="#1F2937" strokeWidth="2" />
      <circle cx="106" cy="102" r="6" fill="#1F2937" /><circle cx="108" cy="100" r="2" fill="white" />
      <polygon points="118,72 112,38 126,68" fill="white" stroke="#1F2937" strokeWidth="2" />
      {[42, 48, 54, 60, 66].map((y, i) => (
        <line key={i} x1={112 + i * 1.2} y1={y} x2={115 + i * 1.2} y2={y + 6} stroke="#1F2937" strokeWidth="1.2" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <ellipse key={i} cx={128 + i * 8} cy={72 + i * 12} rx="10" ry="14"
          fill="white" stroke="#1F2937" strokeWidth="1.8"
          transform={`rotate(${-20 + i * 8},${128 + i * 8},${72 + i * 12})`} />
      ))}
      {[[100, 215], [135, 220], [175, 220], [210, 215]].map(([x, y], i) => (
        <rect key={i} x={x - 10} y={y} width="20" height="35" rx="8" fill="white" stroke="#1F2937" strokeWidth="2" />
      ))}
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M ${228 + i * 5} 170 Q ${248 + i * 8} ${185 + i * 10} ${238 + i * 4} ${205 + i * 8}`}
          fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {[[40, 50], [250, 60], [280, 140], [60, 200]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize="16">✨</text>
      ))}
      <text x="150" y="272" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">Colorie la licorne ! 🦄</text>
    </svg>
  )
}

// ── MAP id → composant ───────────────────────────────────────────
export const REWARD_SVG = {
  coloriage_soleil:      <SvgSoleil />,
  coloriage_fleurs:      <SvgFleurs />,
  labyrinthe_facile:     <SvgLabyrintheFacile />,
  coloriage_arc_en_ciel: <SvgArcEnCiel />,
  relier_points:         <SvgRelierPoints />,
  coloriage_jungle:      <SvgJungle />,
  coloriage_robot:       <SvgRobot />,
  labyrinthe_difficile:  <SvgLabyrintheDifficile />,
  coloriage_dragon:      <SvgDragon />,
  imagier_anglais:       <SvgImagier />,
  diplome_champion:      <SvgDiplome />,
  coloriage_licorne:     <SvgLicorne />,
}