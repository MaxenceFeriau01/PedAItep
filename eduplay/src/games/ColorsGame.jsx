import { useState, useCallback } from 'react'
import data from '../data/colors.json'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildRound(items) {
  const pool = shuffle(items)
  const target = pool[0]
  const choices = shuffle(pool.slice(0, 4))
  return { target, choices }
}

export default function ColorsGame({ onFinish, onHome }) {
  const total = 8
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [round, setRound]       = useState(() => buildRound(data.items))
  const [selected, setSelected] = useState(null)
  const [done, setDone]         = useState(false)

  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((item) => {
    if (selected !== null) return
    setSelected(item.name)
    const correct = item.name === round.target.name
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true)
        onFinish && onFinish(score + (correct ? 1 : 0), total, stars)
      } else {
        setIdx(i => i + 1)
        setRound(buildRound(data.items))
        setSelected(null)
      }
    }, 800)
  }, [selected, round, idx, score, total, stars])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Les couleurs" emoji="🎨" current={idx + 1} total={total} stars={stars} color="#F59E0B">
      <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--text-muted)', marginBottom: 24 }}>
        Touche la couleur <strong style={{ color: 'var(--text)', fontSize: 20 }}>{round.target.name}</strong> !
      </p>

      <div style={{ width: 100, height: 100, borderRadius: '50%', background: round.target.hex, margin: '0 auto 28px', border: '4px solid rgba(255,255,255,0.15)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(item => {
          let extra = ''
          if (selected === item.name) extra = item.name === round.target.name ? ' correct' : ' wrong'
          else if (selected && item.name === round.target.name) extra = ' correct'
          return (
            <button key={item.name} className={`answer-btn${extra}`} onClick={() => pick(item)} disabled={selected !== null}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: item.hex, border: '3px solid rgba(255,255,255,0.2)' }} />
              <span style={{ fontSize: 14 }}>{item.name}</span>
            </button>
          )
        })}
      </div>
    </GameShell>
  )
}