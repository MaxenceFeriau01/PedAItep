import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const SEQUENCES = [
  { seq: ['🐱','🐶','🐱','🐶'], answer: '🐱', choices: ['🐱','🐸','🦁','🐧'] },
  { seq: ['⭐','⭐','🌙','⭐','⭐'], answer: '🌙', choices: ['⭐','🌙','☀️','💫'] },
  { seq: ['🔴','🔵','🔴','🔵'], answer: '🔴', choices: ['🔴','🟡','🟢','🔵'] },
  { seq: ['🍎','🍌','🍎','🍌'], answer: '🍎', choices: ['🍎','🍇','🍊','🍌'] },
  { seq: ['1️⃣','2️⃣','3️⃣','1️⃣','2️⃣'], answer: '3️⃣', choices: ['1️⃣','2️⃣','3️⃣','4️⃣'] },
  { seq: ['🌸','🌿','🌸','🌿'], answer: '🌸', choices: ['🌸','🌻','🌿','🍄'] },
  { seq: ['🔺','🔷','🔺','🔷'], answer: '🔺', choices: ['🔺','🔶','🔷','🟣'] },
  { seq: ['😀','😢','😀','😢'], answer: '😀', choices: ['😀','😮','😢','😡'] },
  { seq: ['🌞','🌛','🌞','🌛'], answer: '🌞', choices: ['🌞','⭐','🌛','☁️'] },
  { seq: ['🐘','🐭','🐘','🐭'], answer: '🐘', choices: ['🐘','🦓','🐭','🦒'] },
]

export default function SequenceGame({ onFinish, onHome }) {
  const [rounds] = useState(() => shuffle(SEQUENCES).slice(0, 8))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((choice) => {
    if (chosen) return
    setChosen(choice)
    const correct = choice === round.answer
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
    <GameShell title="Suite logique" emoji="🌀" current={idx + 1} total={rounds.length} stars={stars} color="#6366F1">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>Quelle image vient après ?</p>
        {/* La suite */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {round.seq.map((item, i) => (
            <div key={i} style={{
              fontSize: 36,
              background: 'var(--bg-card)',
              border: '2px solid var(--border)',
              borderRadius: 14,
              width: 58, height: 58,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{item}</div>
          ))}
          <div style={{ fontSize: 28, color: 'var(--text-muted)', margin: '0 4px' }}>→</div>
          <div style={{
            fontSize: 36,
            background: 'rgba(99,102,241,0.15)',
            border: '2px dashed rgba(99,102,241,0.5)',
            borderRadius: 14,
            width: 58, height: 58,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(99,102,241,0.5)',
          }}>?</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(c => (
          <button key={c}
            className={`answer-btn${chosen === c ? (c === round.answer ? ' correct' : ' wrong') : ''}${chosen && c === round.answer && chosen !== c ? ' correct' : ''}`}
            onClick={() => pick(c)}
            disabled={!!chosen}
            style={{ fontSize: 32, height: 72 }}
          >{c}</button>
        ))}
      </div>
    </GameShell>
  )
}