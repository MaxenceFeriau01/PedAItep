import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const SENTENCES = [
  { emoji: '☀️', words: ['Le', 'soleil', 'brille', 'fort', '.'] },
  { emoji: '🐱', words: ['Le', 'chat', 'boit', 'du', 'lait', '.'] },
  { emoji: '🍎', words: ['Je', 'mange', 'une', 'pomme', '.'] },
  { emoji: '🌧️', words: ['Il', 'pleut', 'aujourd\'hui', '.'] },
  { emoji: '🐶', words: ['Mon', 'chien', 'joue', 'dans', 'le', 'jardin', '.'] },
  { emoji: '📚', words: ['Je', 'lis', 'un', 'livre', '.'] },
  { emoji: '🚗', words: ['La', 'voiture', 'roule', 'vite', '.'] },
  { emoji: '🌸', words: ['Les', 'fleurs', 'sont', 'belles', '.'] },
  { emoji: '🎂', words: ['C\'est', 'mon', 'anniversaire', 'aujourd\'hui', '!'] },
  { emoji: '🏫', words: ['Je', 'vais', 'à', 'l\'école', '.'] },
  { emoji: '🐸', words: ['La', 'grenouille', 'saute', 'dans', 'l\'eau', '.'] },
  { emoji: '⭐', words: ['Les', 'étoiles', 'brillent', 'la', 'nuit', '.'] },
]

export default function SentenceGame({ onFinish, onHome }) {
  const total = 6
  const [rounds]              = useState(() => shuffle(SENTENCES).slice(0, total))
  const [idx, setIdx]         = useState(0)
  const [score, setScore]     = useState(0)
  const [placed, setPlaced]   = useState([])
  const [available, setAvailable] = useState(() =>
    shuffle(SENTENCES[0].words.map((w, i) => ({ w, id: i })))
  )
  const [result, setResult]   = useState(null)
  const [done, setDone]       = useState(false)

  const round = rounds[idx]
  const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  const nextRound = useCallback((newIdx, newScore) => {
    if (newIdx >= total) {
      setDone(true)
      onFinish && onFinish(newScore, total, newScore >= 5 ? 3 : newScore >= 3 ? 2 : 1)
    } else {
      setIdx(newIdx)
      setPlaced([])
      setAvailable(shuffle(rounds[newIdx].words.map((w, i) => ({ w, id: i }))))
      setResult(null)
    }
  }, [rounds, total, onFinish])

  const addWord = useCallback((item) => {
    if (result) return
    const newPlaced = [...placed, item]
    setPlaced(newPlaced)
    setAvailable(a => a.filter(x => x.id !== item.id))

    if (newPlaced.length === round.words.length) {
      const assembled = newPlaced.map(x => x.w).join(' ')
      const correct = assembled === round.words.join(' ')
      const newScore = score + (correct ? 1 : 0)
      if (correct) setScore(newScore)
      setResult(correct ? 'correct' : 'wrong')
      setTimeout(() => nextRound(idx + 1, newScore), 1200)
    }
  }, [placed, round, result, score, idx, nextRound])

  const removeLast = useCallback(() => {
    if (result || placed.length === 0) return
    const last = placed[placed.length - 1]
    setPlaced(placed.slice(0, -1))
    setAvailable(a => [...a, last])
  }, [placed, result])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Phrase du jour" emoji="📖" current={idx + 1} total={total} stars={stars} color="#047857">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>{round.emoji}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Remets les mots dans le bon ordre !</p>
      </div>

      {/* Zone de construction */}
      <div style={{
        minHeight: 68,
        background: result === 'correct' ? 'rgba(34,197,94,0.1)' : result === 'wrong' ? 'rgba(239,68,68,0.1)' : 'var(--bg-card2)',
        border: `2px solid ${result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '12px 14px',
        marginBottom: 8,
        flexWrap: 'wrap',
      }}>
        {placed.length === 0 ? (
          <span style={{ color: 'var(--text-hint)', fontSize: 13 }}>Clique sur les mots ci-dessous…</span>
        ) : (
          placed.map((item, i) => (
            <span key={i} style={{
              background: result === 'correct' ? 'rgba(34,197,94,0.15)' : result === 'wrong' ? 'rgba(239,68,68,0.15)' : 'rgba(4,120,87,0.2)',
              border: `1.5px solid ${result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : '#047857'}`,
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 15,
              fontWeight: 800,
              color: result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : '#34D399',
            }}>{item.w}</span>
          ))
        )}
      </div>

      {result && (
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          {result === 'correct' ? (
            <p style={{ color: '#22C55E', fontWeight: 900, fontSize: 15 }}>✅ Parfait !</p>
          ) : (
            <p style={{ color: '#EF4444', fontWeight: 900, fontSize: 13 }}>
              ❌ La bonne phrase : <em style={{ color: 'var(--text-muted)' }}>{round.words.join(' ')}</em>
            </p>
          )}
        </div>
      )}

      {placed.length > 0 && !result && (
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <button onClick={removeLast} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '4px 12px', fontSize: 12, color: 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'Nunito', fontWeight: 700,
          }}>⬅ Effacer</button>
        </div>
      )}

      {/* Mots disponibles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        {available.map(item => (
          <button key={item.id}
            onClick={() => addWord(item)}
            disabled={!!result}
            style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(4,120,87,0.4)',
              borderRadius: 10,
              padding: '10px 16px',
              fontSize: 16,
              fontWeight: 800,
              color: '#34D399',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#047857'; e.currentTarget.style.background = 'rgba(4,120,87,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(4,120,87,0.4)'; e.currentTarget.style.background = 'var(--bg-card)' }}
          >{item.w}</button>
        ))}
      </div>
    </GameShell>
  )
}