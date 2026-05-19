import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const ALL_ITEMS = [
  { emoji: '🍎', name: 'Pomme',       type: 'fruit' },
  { emoji: '🍌', name: 'Banane',      type: 'fruit' },
  { emoji: '🍇', name: 'Raisins',     type: 'fruit' },
  { emoji: '🍓', name: 'Fraise',      type: 'fruit' },
  { emoji: '🍊', name: 'Orange',      type: 'fruit' },
  { emoji: '🍋', name: 'Citron',      type: 'fruit' },
  { emoji: '🍉', name: 'Pastèque',    type: 'fruit' },
  { emoji: '🍑', name: 'Pêche',       type: 'fruit' },
  { emoji: '🥕', name: 'Carotte',     type: 'legume' },
  { emoji: '🥦', name: 'Brocoli',     type: 'legume' },
  { emoji: '🥔', name: 'Pomme de terre', type: 'legume' },
  { emoji: '🧅', name: 'Oignon',      type: 'legume' },
  { emoji: '🌽', name: 'Maïs',        type: 'legume' },
  { emoji: '🥒', name: 'Concombre',   type: 'legume' },
  { emoji: '🫑', name: 'Poivron',     type: 'legume' },
  { emoji: '🥬', name: 'Salade',      type: 'legume' },
]

export default function FoodGame({ onFinish, onHome }) {
  const [rounds] = useState(() => shuffle(ALL_ITEMS).slice(0, 8))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const item = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((type) => {
    if (chosen) return
    setChosen(type)
    const correct = type === item.type
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setDone(true)
        onFinish && onFinish(newScore, rounds.length, newScore >= 7 ? 3 : newScore >= 5 ? 2 : 1)
      } else {
        setIdx(i => i + 1)
        setChosen(null)
      }
    }, 900)
  }, [chosen, item, idx, score, rounds.length, stars])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Fruits & Légumes" emoji="🍎" current={idx + 1} total={rounds.length} stars={stars} color="#EF4444">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 96, marginBottom: 16 }}>{item.emoji}</div>
        <p style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>{item.name}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>C'est un fruit ou un légume ?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { type: 'fruit',  label: '🍓 Fruit',  color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
          { type: 'legume', label: '🥦 Légume', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
        ].map(opt => {
          const isChosen = chosen === opt.type
          const isCorrect = chosen && opt.type === item.type
          return (
            <button key={opt.type}
              className={`answer-btn${isChosen ? (isCorrect ? ' correct' : ' wrong') : ''}${!isChosen && isCorrect && chosen ? ' correct' : ''}`}
              onClick={() => pick(opt.type)}
              disabled={!!chosen}
              style={{ fontSize: 20, height: 90 }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </GameShell>
  )
}