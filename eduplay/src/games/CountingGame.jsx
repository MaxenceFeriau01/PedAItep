import { useState, useCallback } from 'react'
import data from '../data/counting.json'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function CountingGame({ onFinish, onHome }) {
  const [rounds]                = useState(() => shuffle(data.rounds).slice(0, 6))
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const round = rounds[idx]
  const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  const pick = useCallback((val) => {
    if (selected !== null) return
    setSelected(val)
    const correct = val === round.count
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setDone(true)
        onFinish && onFinish(newScore, rounds.length, newScore >= 5 ? 3 : newScore >= 3 ? 2 : 1)
      } else {
        setIdx(i => i + 1)
        setSelected(null)
      }
    }, 900)
  }, [selected, round, idx, score, rounds, onFinish])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Je compte !" emoji="🔢" current={idx + 1} total={rounds.length} stars={stars} color="#FF8C42">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>Combien y a-t-il de {round.name} ?</p>
        <div style={{ background: 'var(--bg-card2)', borderRadius: 20, padding: '24px 16px', marginBottom: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, minHeight: 100, alignItems: 'center' }}>
          {Array.from({ length: round.count }).map((_, i) => (
            <span key={i} style={{ fontSize: 40 }} className="pop">{round.animal}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {round.choices.map(c => (
          <button key={c}
            className={`answer-btn${selected === c ? (c === round.count ? ' correct' : ' wrong') : ''}${selected !== null && c === round.count && selected !== c ? ' correct' : ''}`}
            onClick={() => pick(c)} disabled={selected !== null}>
            {c}
          </button>
        ))}
      </div>
    </GameShell>
  )
}