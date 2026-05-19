import { useState, useCallback } from 'react'
import data from '../data/alphabet.json'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function AlphabetGame({ onFinish, onHome }) {
  const [rounds]                = useState(() => shuffle(data.rounds).slice(0, 8))
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((letter) => {
    if (selected) return
    setSelected(letter)
    const correct = letter === round.letter
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setDone(true)
        onFinish && onFinish(newScore, rounds.length, newScore >= 7 ? 3 : newScore >= 5 ? 2 : 1)
      } else {
        setIdx(i => i + 1)
        setSelected(null)
      }
    }, 900)
  }, [selected, round, idx, score, rounds, onFinish])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="L'alphabet" emoji="🔤" current={idx + 1} total={rounds.length} stars={stars} color="#10B981">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 80, marginBottom: 12 }}>{round.emoji}</div>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 4 }}>Ce mot commence par quelle lettre ?</p>
        <p style={{ fontSize: 22, fontWeight: 900 }}>{round.word}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {round.choices.map(l => (
          <button key={l}
            className={`answer-btn${selected === l ? (l === round.letter ? ' correct' : ' wrong') : ''}${selected && l === round.letter && selected !== l ? ' correct' : ''}`}
            onClick={() => pick(l)} disabled={!!selected} style={{ fontSize: 36 }}>
            {l}
          </button>
        ))}
      </div>
    </GameShell>
  )
}