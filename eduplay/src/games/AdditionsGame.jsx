import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function genRound(max) {
  const a = Math.floor(Math.random() * max) + 1
  const b = Math.floor(Math.random() * (max - a + 1))
  const answer = a + b
  const wrongs = new Set()
  while (wrongs.size < 3) {
    const w = answer + Math.floor(Math.random() * 5) - 2
    if (w !== answer && w >= 0) wrongs.add(w)
  }
  const choices = [answer, ...[...wrongs]].sort(() => Math.random() - 0.5)
  return { a, b, answer, choices }
}

export default function AdditionsGame({ onFinish, onHome }) {
  const max = 10
  const total = 8
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [round, setRound]       = useState(() => genRound(max))
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((val) => {
    if (selected !== null) return
    setSelected(val)
    const correct = val === round.answer
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= total) { setDone(true); onFinish && onFinish(score + (correct ? 1 : 0), total, stars) }
      else { setIdx(i => i + 1); setRound(genRound(max)); setSelected(null) }
    }, 900)
  }, [selected, round, idx, score, total, stars])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Calcul rapide" emoji="➕" current={idx + 1} total={total} stars={stars} color="#FF5733">
      {/* Visual helpers */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', marginBottom: 24, minHeight: 60 }}>
        {Array.from({ length: round.a }).map((_, i) => <span key={`a${i}`} style={{ fontSize: 28 }}>🍎</span>)}
        <span style={{ fontSize: 28, margin: '0 4px' }}>➕</span>
        {Array.from({ length: round.b }).map((_, i) => <span key={`b${i}`} style={{ fontSize: 28 }}>🍊</span>)}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontSize: 52, fontWeight: 900, letterSpacing: -1 }}>
          {round.a} + {round.b} = <span style={{ color: 'var(--gold)' }}>?</span>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(c => (
          <button key={c} className={`answer-btn${selected === c ? (c === round.answer ? ' correct' : ' wrong') : ''}${selected !== null && c === round.answer && selected !== c ? ' correct' : ''}`}
            onClick={() => pick(c)} disabled={selected !== null}>
            {c}
          </button>
        ))}
      </div>
    </GameShell>
  )
}
