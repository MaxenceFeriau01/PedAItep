import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const COLORS = [
  { fr: 'Rouge',   en: 'Red',    hex: '#EF4444' },
  { fr: 'Bleu',    en: 'Blue',   hex: '#3B82F6' },
  { fr: 'Vert',    en: 'Green',  hex: '#22C55E' },
  { fr: 'Jaune',   en: 'Yellow', hex: '#EAB308' },
  { fr: 'Orange',  en: 'Orange', hex: '#F97316' },
  { fr: 'Violet',  en: 'Purple', hex: '#A855F7' },
  { fr: 'Rose',    en: 'Pink',   hex: '#EC4899' },
  { fr: 'Blanc',   en: 'White',  hex: '#FFFFFF' },
  { fr: 'Noir',    en: 'Black',  hex: '#1F2937' },
  { fr: 'Marron',  en: 'Brown',  hex: '#92400E' },
]

function makeRound(color) {
  const wrongs = COLORS.filter(c => c.en !== color.en)
  const choices = shuffle([color, ...shuffle(wrongs).slice(0, 3)])
  return { color, choices }
}

export default function ColorsEnGame({ onFinish, onHome }) {
  const [rounds] = useState(() => shuffle(COLORS).slice(0, 8).map(makeRound))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((en) => {
    if (chosen) return
    setChosen(en)
    const correct = en === round.color.en
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setDone(true)
        onFinish && onFinish(score + (correct ? 1 : 0), rounds.length, stars)
      } else {
        setIdx(i => i + 1)
        setChosen(null)
      }
    }, 900)
  }, [chosen, round, idx, score, rounds.length, stars])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Colors in English" emoji="🎌" current={idx + 1} total={rounds.length} stars={stars} color="#22D3EE">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>What color is this?</p>
        {/* Carré de couleur */}
        <div style={{
          width: 120, height: 120,
          borderRadius: 24,
          background: round.color.hex,
          margin: '0 auto 16px',
          border: round.color.en === 'White' ? '3px solid rgba(255,255,255,0.3)' : '3px solid rgba(255,255,255,0.08)',
          boxShadow: `0 8px 32px ${round.color.hex}44`,
        }} />
        <p style={{ fontSize: 22, fontWeight: 900 }}>{round.color.fr}</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>= _____ in English</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {round.choices.map(c => (
          <button key={c.en}
            className={`answer-btn${chosen === c.en ? (c.en === round.color.en ? ' correct' : ' wrong') : ''}${chosen && c.en === round.color.en && chosen !== c.en ? ' correct' : ''}`}
            onClick={() => pick(c.en)}
            disabled={!!chosen}
            style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}
          >
            <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: 6, background: c.hex, flexShrink: 0, border: c.en === 'White' ? '1px solid rgba(255,255,255,0.3)' : 'none' }} />
            {c.en}
          </button>
        ))}
      </div>
    </GameShell>
  )
}