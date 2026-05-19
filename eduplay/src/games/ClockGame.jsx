import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

// Génère des heures rondes ou demies
function genTimes(n) {
  const times = []
  const used = new Set()
  while (times.length < n) {
    const h = Math.floor(Math.random() * 12)
    const m = Math.random() < 0.5 ? 0 : 30
    const key = `${h}:${m}`
    if (!used.has(key)) {
      used.add(key)
      times.push({ h, m })
    }
  }
  return times
}

function formatTime(h, m) {
  const hh = h === 0 ? 12 : h
  return `${hh}h${m === 0 ? '00' : '30'}`
}

function makeChoices(correct) {
  const wrongs = []
  while (wrongs.length < 3) {
    const h = Math.floor(Math.random() * 12)
    const m = Math.random() < 0.5 ? 0 : 30
    const label = formatTime(h, m)
    if (label !== correct && !wrongs.includes(label)) wrongs.push(label)
  }
  return shuffle([correct, ...wrongs])
}

// Horloge SVG
function Clock({ h, m }) {
  const size = 160
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 8

  // Angles des aiguilles
  const mAngle = (m / 60) * 360 - 90
  const hAngle = ((h % 12) / 12) * 360 + (m / 60) * 30 - 90

  const toRad = (deg) => (deg * Math.PI) / 180
  const hx = cx + Math.cos(toRad(hAngle)) * r * 0.55
  const hy = cy + Math.sin(toRad(hAngle)) * r * 0.55
  const mx = cx + Math.cos(toRad(mAngle)) * r * 0.8
  const my = cy + Math.sin(toRad(mAngle)) * r * 0.8

  // Graduations
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360 - 90
    const x1 = cx + Math.cos(toRad(angle)) * (r - 2)
    const y1 = cy + Math.sin(toRad(angle)) * (r - 2)
    const x2 = cx + Math.cos(toRad(angle)) * (r - 10)
    const y2 = cy + Math.sin(toRad(angle)) * (r - 10)
    return { x1, y1, x2, y2, num: i === 0 ? 12 : i }
  })

  return (
    <svg width={size} height={size} style={{ filter: 'drop-shadow(0 4px 16px rgba(139,92,246,0.3))' }}>
      {/* Fond */}
      <circle cx={cx} cy={cy} r={r} fill="#1E1030" stroke="rgba(139,92,246,0.4)" strokeWidth="3" />
      {/* Graduations + chiffres */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <text
            x={cx + Math.cos(toRad((i / 12) * 360 - 90)) * (r - 22)}
            y={cy + Math.sin(toRad((i / 12) * 360 - 90)) * (r - 22) + 4}
            textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="800" fontFamily="Nunito"
          >{t.num}</text>
        </g>
      ))}
      {/* Aiguille des heures */}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      {/* Aiguille des minutes */}
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
      {/* Centre */}
      <circle cx={cx} cy={cy} r={5} fill="#8B5CF6" />
    </svg>
  )
}

export default function ClockGame({ onFinish, onHome }) {
  const total = 8
  const [times]                 = useState(() => genTimes(total))
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [chosen, setChosen]     = useState(null)
  const [done, setDone]         = useState(false)

  const time = times[idx]
  const correctLabel = formatTime(time.h, time.m)
  const [choices]               = useState(() => times.map(t => makeChoices(formatTime(t.h, t.m))))

  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((label) => {
    if (chosen) return
    setChosen(label)
    const correct = label === correctLabel
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
  }, [chosen, correctLabel, idx, score, total, onFinish])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="L'heure" emoji="⏰" current={idx + 1} total={total} stars={stars} color="#8B5CF6">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>Quelle heure indique l'horloge ?</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Clock h={time.h} m={time.m} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {choices[idx].map(label => (
          <button key={label}
            className={`answer-btn${chosen === label ? (label === correctLabel ? ' correct' : ' wrong') : ''}${chosen && label === correctLabel && chosen !== label ? ' correct' : ''}`}
            onClick={() => pick(label)}
            disabled={!!chosen}
            style={{ fontSize: 22, fontWeight: 900 }}
          >
            ⏰ {label}
          </button>
        ))}
      </div>
    </GameShell>
  )
}