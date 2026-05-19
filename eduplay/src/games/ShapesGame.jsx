import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

// Formes dessinées en SVG inline
function ShapeSVG({ shape, color = '#7C3AED', size = 120 }) {
  const s = size
  const c = s / 2
  const shapes = {
    circle:    <circle cx={c} cy={c} r={c * 0.75} fill={color} />,
    square:    <rect x={c * 0.2} y={c * 0.2} width={c * 1.6} height={c * 1.6} rx="8" fill={color} />,
    triangle:  <polygon points={`${c},${c * 0.15} ${c * 1.85},${c * 1.85} ${c * 0.15},${c * 1.85}`} fill={color} />,
    rectangle: <rect x={c * 0.05} y={c * 0.3} width={c * 1.9} height={c * 1.4} rx="8" fill={color} />,
    star:      <polygon points={`${c},${c*0.15} ${c*1.15},${c*0.7} ${c*1.9},${c*0.7} ${c*1.3},${c*1.15} ${c*1.55},${c*1.85} ${c},${c*1.4} ${c*0.45},${c*1.85} ${c*0.7},${c*1.15} ${c*0.1},${c*0.7} ${c*0.85},${c*0.7}`} fill={color} />,
    heart:     <path d={`M${c} ${c*1.75} C${c*0.1} ${c*1.1} ${c*-0.4} ${c*0.4} ${c*0.5} ${c*0.3} C${c*0.75} ${c*0.2} ${c} ${c*0.5} ${c} ${c*0.5} C${c} ${c*0.5} ${c*1.25} ${c*0.2} ${c*1.5} ${c*0.3} C${c*2.4} ${c*0.4} ${c*1.9} ${c*1.1} ${c} ${c*1.75}Z`} fill={color} />,
    diamond:   <polygon points={`${c},${c*0.1} ${c*1.85},${c} ${c},${c*1.9} ${c*0.15},${c}`} fill={color} />,
    oval:      <ellipse cx={c} cy={c} rx={c * 0.85} ry={c * 0.55} fill={color} />,
  }
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ filter: `drop-shadow(0 4px 16px ${color}66)` }}>
      {shapes[shape] || shapes.circle}
    </svg>
  )
}

const SHAPES = [
  { id: 'circle',    name: 'rond' },
  { id: 'square',    name: 'carré' },
  { id: 'triangle',  name: 'triangle' },
  { id: 'rectangle', name: 'rectangle' },
  { id: 'star',      name: 'étoile' },
  { id: 'heart',     name: 'cœur' },
  { id: 'diamond',   name: 'losange' },
  { id: 'oval',      name: 'ovale' },
]

const COLORS_LIST = ['#3B82F6','#EF4444','#22C55E','#F59E0B','#A855F7','#EC4899','#06B6D4','#F97316']

function makeRound(shape, colorHex) {
  const others = SHAPES.filter(s => s.id !== shape.id)
  const choices = shuffle([shape, ...shuffle(others).slice(0, 3)])
  return { shape, colorHex, choices }
}

export default function ShapesGame({ onFinish, onHome }) {
  const total = 8
  const [rounds] = useState(() => {
    const shuffled = shuffle(SHAPES).slice(0, total)
    return shuffled.map((s, i) => makeRound(s, COLORS_LIST[i % COLORS_LIST.length]))
  })
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((id) => {
    if (chosen) return
    setChosen(id)
    const correct = id === round.shape.id
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true)
        onFinish && onFinish(newScore, total, newScore >= 7 ? 3 : newScore >= 5 ? 2 : 1)
      } else {
        setIdx(i => i + 1)
        setChosen(null)
      }
    }, 900)
  }, [chosen, round, idx, score, total, onFinish])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Les formes" emoji="🔷" current={idx + 1} total={total} stars={stars} color="#3B82F6">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>Comment s'appelle cette forme ?</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ShapeSVG shape={round.shape.id} color={round.colorHex} size={130} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(s => (
          <button key={s.id}
            className={`answer-btn${chosen === s.id ? (s.id === round.shape.id ? ' correct' : ' wrong') : ''}${chosen && s.id === round.shape.id && chosen !== s.id ? ' correct' : ''}`}
            onClick={() => pick(s.id)}
            disabled={!!chosen}
            style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 12px' }}
          >
            <ShapeSVG shape={s.id} color="rgba(255,255,255,0.6)" size={32} />
            {s.name}
          </button>
        ))}
      </div>
    </GameShell>
  )
}