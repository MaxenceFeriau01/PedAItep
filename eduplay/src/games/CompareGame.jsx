import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function genRound(askBiggest) {
  const a = Math.floor(Math.random() * 20) + 1
  let b = Math.floor(Math.random() * 20) + 1
  while (b === a) b = Math.floor(Math.random() * 20) + 1
  return { a, b, askBiggest }
}

function buildRounds(n) {
  // Moitié plus grand, moitié plus petit, mélangés
  const rounds = []
  for (let i = 0; i < n; i++) rounds.push(genRound(i < n / 2))
  return rounds.sort(() => Math.random() - 0.5)
}

export default function CompareGame({ onFinish, onHome }) {
  const total = 8
  const [rounds]            = useState(() => buildRounds(total))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const correctChoice = round.askBiggest
    ? (round.a > round.b ? 'a' : 'b')
    : (round.a < round.b ? 'a' : 'b')

  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1
  const accentColor = round.askBiggest ? '#06B6D4' : '#F59E0B'

  const pick = useCallback((choice) => {
    if (chosen) return
    setChosen(choice)
    const correct = choice === correctChoice
    const newScore = score + (correct ? 1 : 0)
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true)
        onFinish && onFinish(newScore, total, newScore >= 7 ? 3 : newScore >= 5 ? 2 : 1)
      } else {
        setIdx(i => i + 1)
        setChosen(null)
      }
    }, 900)
  }, [chosen, correctChoice, idx, score, total, onFinish])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  const instruction = round.askBiggest
    ? <><strong style={{ color: '#06B6D4' }}>plus grand</strong> nombre</>
    : <><strong style={{ color: '#F59E0B' }}>plus petit</strong> nombre</>

  return (
    <GameShell title="+ grand / + petit" emoji="📏" current={idx + 1} total={total} stars={stars} color={accentColor}>

      {/* Consigne bien visible */}
      <div style={{
        textAlign: 'center',
        background: round.askBiggest ? 'rgba(6,182,212,0.1)' : 'rgba(245,158,11,0.1)',
        border: `2px solid ${accentColor}55`,
        borderRadius: 16,
        padding: '14px 16px',
        marginBottom: 28,
        fontSize: 17,
      }}>
        Clique sur le {instruction} !
      </div>

      {/* Les deux nombres */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {(['a', 'b']).map(side => {
          const val = side === 'a' ? round.a : round.b
          const isChosen  = chosen === side
          const isCorrect = isChosen && side === correctChoice
          const isWrong   = isChosen && side !== correctChoice
          const showGreen = chosen && !isChosen && side === correctChoice
          return (
            <button key={side}
              onClick={() => pick(side)}
              disabled={!!chosen}
              style={{
                fontSize: 58, fontWeight: 900,
                padding: '28px 0', borderRadius: 20,
                border: `3px solid ${isCorrect || showGreen ? '#22C55E' : isWrong ? '#EF4444' : accentColor + '44'}`,
                background: isCorrect || showGreen ? 'rgba(34,197,94,0.12)' : isWrong ? 'rgba(239,68,68,0.12)' : 'var(--bg-card)',
                color: isCorrect || showGreen ? '#22C55E' : isWrong ? '#EF4444' : '#fff',
                cursor: chosen ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!chosen) e.currentTarget.style.borderColor = accentColor }}
              onMouseLeave={e => { if (!chosen) e.currentTarget.style.borderColor = accentColor + '44' }}
            >
              {val}
            </button>
          )
        })}
      </div>

      {/* Représentation visuelle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[round.a, round.b].map((val, i) => (
          <div key={i} style={{ background: 'var(--bg-card2)', borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', minHeight: 36 }}>
              {Array.from({ length: Math.min(val, 20) }).map((_, j) => (
                <span key={j} style={{ fontSize: 12 }}>⭐</span>
              ))}
              {val > 20 && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>…</span>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, fontWeight: 700 }}>
              {val} étoile{val > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </GameShell>
  )
}