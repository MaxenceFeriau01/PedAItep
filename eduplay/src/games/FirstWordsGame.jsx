import { useState, useCallback } from 'react'
import data from '../data/firstwords.json'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function FirstWordsGame({ onFinish, onHome }) {
  const rounds = shuffle(data.rounds).slice(0, 8)
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((word) => {
    if (selected) return
    setSelected(word)
    const correct = word === round.english
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) { setDone(true); onFinish && onFinish(score + (correct ? 1 : 0), rounds.length, stars) }
      else { setIdx(i => i + 1); setSelected(null) }
    }, 900)
  }, [selected, round, idx, score, rounds.length, stars])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="First words" emoji="🌐" current={idx + 1} total={rounds.length} stars={stars} color="#64DCFF">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 80, marginBottom: 12 }}>{round.emoji}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 4 }}>Comment dit-on en anglais ?</p>
        <p style={{ fontSize: 26, fontWeight: 900 }}>{round.french}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {round.choices.map(w => (
          <button key={w}
            className={`answer-btn${selected === w ? (w === round.english ? ' correct' : ' wrong') : ''}${selected && w === round.english && selected !== w ? ' correct' : ''}`}
            onClick={() => pick(w)} disabled={!!selected} style={{ fontSize: 20, textTransform: 'capitalize' }}>
            {w}
          </button>
        ))}
      </div>
    </GameShell>
  )
}
