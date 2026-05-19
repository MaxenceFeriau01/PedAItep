import { useState, useCallback } from 'react'
import data from '../data/seasons.json'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SeasonsGame({ onFinish, onHome }) {
  const rounds = shuffle(data.rounds)
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const round = rounds[idx]
  const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  const pick = useCallback((s) => {
    if (selected) return
    setSelected(s)
    const correct = s === round.season
    if (correct) setScore(sc => sc + 1)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) { setDone(true); onFinish && onFinish(score + (correct ? 1 : 0), rounds.length, stars) }
      else { setIdx(i => i + 1); setSelected(null) }
    }, 900)
  }, [selected, round, idx, score, rounds.length, stars])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Les saisons" emoji="🌱" current={idx + 1} total={rounds.length} stars={stars} color="#22C55E">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 64, marginBottom: 12, letterSpacing: 4 }}>{round.image}</div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', background: 'var(--bg-card2)', borderRadius: 12, padding: '10px 16px' }}>{round.hint}</p>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 800, fontSize: 16, marginBottom: 16, color: 'var(--text-muted)' }}>Quelle saison est-ce ?</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(s => (
          <button key={s}
            className={`answer-btn${selected === s ? (s === round.season ? ' correct' : ' wrong') : ''}${selected && s === round.season && selected !== s ? ' correct' : ''}`}
            onClick={() => pick(s)} disabled={!!selected} style={{ fontSize: 16, textTransform: 'capitalize' }}>
            {s === 'printemps' ? '🌸' : s === 'été' ? '☀️' : s === 'automne' ? '🍂' : '❄️'} {s}
          </button>
        ))}
      </div>
    </GameShell>
  )
}
