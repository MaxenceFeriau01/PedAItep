import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

// Chaque round : deux rangées d'emojis, une différence à trouver
const ROUNDS = [
  {
    left:  ['🐱','🐶','🐸','🦁','🐧'],
    right: ['🐱','🐶','🦊','🦁','🐧'],
    diffIdx: 2,
    question: 'Quel animal a changé ?',
  },
  {
    left:  ['🍎','🍌','🍇','🍓','🍊'],
    right: ['🍎','🍌','🍇','🍑','🍊'],
    diffIdx: 3,
    question: 'Quel fruit a changé ?',
  },
  {
    left:  ['⭐','🌙','☀️','⭐','🌙'],
    right: ['⭐','🌙','☀️','💫','🌙'],
    diffIdx: 3,
    question: 'Quelle étoile a changé ?',
  },
  {
    left:  ['🔴','🟡','🔵','🟢','🟣'],
    right: ['🔴','🟠','🔵','🟢','🟣'],
    diffIdx: 1,
    question: 'Quelle couleur a changé ?',
  },
  {
    left:  ['🚗','✈️','🚂','🚀','🚢'],
    right: ['🚗','✈️','🚁','🚀','🚢'],
    diffIdx: 2,
    question: 'Quel véhicule a changé ?',
  },
  {
    left:  ['😀','😢','😮','😡','😊'],
    right: ['😀','😢','😮','😎','😊'],
    diffIdx: 3,
    question: 'Quel visage a changé ?',
  },
  {
    left:  ['🌹','🌸','🌻','🌷','🌼'],
    right: ['🌹','🌸','🌺','🌷','🌼'],
    diffIdx: 2,
    question: 'Quelle fleur a changé ?',
  },
  {
    left:  ['⚽','🏀','🎾','🏐','🎱'],
    right: ['⚽','🏀','🎾','🏸','🎱'],
    diffIdx: 3,
    question: 'Quel sport a changé ?',
  },
]

export default function DifferencesGame({ onFinish, onHome }) {
  const [rounds] = useState(() => shuffle(ROUNDS).slice(0, 8))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((i) => {
    if (chosen !== null) return
    setChosen(i)
    const correct = i === round.diffIdx
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setDone(true)
        onFinish && onFinish(score + (correct ? 1 : 0), rounds.length, stars)
      } else {
        setIdx(i => i + 1)
        setChosen(null)
      }
    }, 1000)
  }, [chosen, round, idx, score, rounds.length, stars])

  if (done) return <GameResult score={score} total={rounds.length} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="7 différences" emoji="🔍" current={idx + 1} total={rounds.length} stars={stars} color="#EC4899">
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>{round.question}</p>

        {/* Rangée originale */}
        <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>Original</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-start', marginBottom: 14, padding: '12px 14px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)' }}>
          {round.left.map((e, i) => (
            <div key={i} style={{ fontSize: 36, width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>{e}</div>
          ))}
        </div>

        {/* Rangée modifiée - cliquable */}
        <p style={{ fontSize: 11, fontWeight: 800, color: '#EC4899', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>Modifié — clique sur le changement !</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-start', padding: '12px 14px', background: 'rgba(236,72,153,0.06)', borderRadius: 16, border: '1px solid rgba(236,72,153,0.2)' }}>
          {round.right.map((e, i) => {
            const isChosen = chosen === i
            const isCorrect = i === round.diffIdx
            let bg = 'rgba(255,255,255,0.04)'
            let border = '2px solid transparent'
            if (chosen !== null) {
              if (isCorrect) { bg = 'rgba(34,197,94,0.2)'; border = '2px solid #22C55E' }
              else if (isChosen) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #EF4444' }
            }
            return (
              <div key={i}
                onClick={() => pick(i)}
                style={{
                  fontSize: 36, width: 50, height: 50,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 12, background: bg, border,
                  cursor: chosen === null ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  transform: chosen === null ? undefined : 'none',
                }}
                onMouseEnter={e => { if (chosen === null) e.currentTarget.style.background = 'rgba(236,72,153,0.15)' }}
                onMouseLeave={e => { if (chosen === null) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              >{e}</div>
            )
          })}
        </div>
      </div>

      {chosen !== null && (
        <p style={{ textAlign: 'center', fontWeight: 900, fontSize: 16, color: chosen === round.diffIdx ? '#22C55E' : '#EF4444' }}>
          {chosen === round.diffIdx ? '✅ Bravo !' : `❌ C'était ${round.right[round.diffIdx]}`}
        </p>
      )}
    </GameShell>
  )
}