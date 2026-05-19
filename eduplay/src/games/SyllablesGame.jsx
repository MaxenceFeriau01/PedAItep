import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const WORDS = [
  { emoji: '🍎', word: 'pomme',    syllables: ['pom', 'me'] },
  { emoji: '🐱', word: 'cha-ton',  syllables: ['cha', 'ton'] },
  { emoji: '🌸', word: 'fleur',    syllables: ['fleur'] },
  { emoji: '🦋', word: 'pa-pil-lon', syllables: ['pa', 'pil', 'lon'] },
  { emoji: '🐘', word: 'é-lé-phant', syllables: ['é', 'lé', 'phant'] },
  { emoji: '🚂', word: 'lo-co-mo-tive', syllables: ['lo', 'co', 'mo', 'tive'] },
  { emoji: '🏠', word: 'mai-son',  syllables: ['mai', 'son'] },
  { emoji: '🌈', word: 'arc-en-ciel', syllables: ['arc', 'en', 'ciel'] },
  { emoji: '🐸', word: 'gre-nouille', syllables: ['gre', 'nouille'] },
  { emoji: '⭐', word: 'é-toile',  syllables: ['é', 'toile'] },
  { emoji: '🦁', word: 'li-on',    syllables: ['li', 'on'] },
  { emoji: '🍓', word: 'frai-se',  syllables: ['frai', 'se'] },
  { emoji: '🐬', word: 'dau-phin', syllables: ['dau', 'phin'] },
  { emoji: '🌻', word: 'tour-ne-sol', syllables: ['tour', 'ne', 'sol'] },
  { emoji: '🎂', word: 'gâ-teau',  syllables: ['gâ', 'teau'] },
]

export default function SyllablesGame({ onFinish, onHome }) {
  const total = 8
  const [rounds]              = useState(() => shuffle(WORDS).slice(0, total))
  const [idx, setIdx]         = useState(0)
  const [score, setScore]     = useState(0)
  const [placed, setPlaced]   = useState([])   // syllabes dans l'ordre choisi
  const [shuffled, setShuffled] = useState(() => shuffle([...WORDS[0].syllables].map((s, i) => ({ s, id: i }))))
  const [done, setDone]       = useState(false)
  const [result, setResult]   = useState(null)  // 'correct' | 'wrong' | null

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  // Initialiser le round suivant
  const nextRound = useCallback((newIdx, newScore) => {
    if (newIdx >= total) {
      setDone(true)
      onFinish && onFinish(newScore, total, newScore >= 7 ? 3 : newScore >= 5 ? 2 : 1)
    } else {
      setIdx(newIdx)
      setPlaced([])
      setShuffled(shuffle([...rounds[newIdx].syllables].map((s, i) => ({ s, id: i }))))
      setResult(null)
    }
  }, [rounds, total, onFinish])

  // Ajouter une syllabe au mot
  const addSyllable = useCallback((item) => {
    if (result) return
    const newPlaced = [...placed, item]
    const newShuffled = shuffled.filter(x => x.id !== item.id)
    setPlaced(newPlaced)
    setShuffled(newShuffled)

    // Vérifier si toutes les syllabes sont placées
    if (newPlaced.length === round.syllables.length) {
      const assembled = newPlaced.map(x => x.s).join('')
      const correct = assembled === round.syllables.join('')
      const newScore = score + (correct ? 1 : 0)
      if (correct) setScore(newScore)
      setResult(correct ? 'correct' : 'wrong')
      setTimeout(() => nextRound(idx + 1, newScore), 1000)
    }
  }, [placed, shuffled, round, result, score, idx, nextRound])

  // Retirer la dernière syllabe placée
  const removeLast = useCallback(() => {
    if (result || placed.length === 0) return
    const last = placed[placed.length - 1]
    setPlaced(placed.slice(0, -1))
    setShuffled([...shuffled, last])
  }, [placed, shuffled, result])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Puzzle de mots" emoji="🧩" current={idx + 1} total={total} stars={stars} color="#059669">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 80, marginBottom: 10 }}>{round.emoji}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Remets les syllabes dans le bon ordre !</p>
      </div>

      {/* Zone de construction du mot */}
      <div style={{
        minHeight: 64,
        background: result === 'correct' ? 'rgba(34,197,94,0.1)' : result === 'wrong' ? 'rgba(239,68,68,0.1)' : 'var(--bg-card2)',
        border: `2px solid ${result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '12px 16px',
        marginBottom: 8,
        flexWrap: 'wrap',
      }}>
        {placed.length === 0 ? (
          <span style={{ color: 'var(--text-hint)', fontSize: 14 }}>Clique sur les syllabes ci-dessous…</span>
        ) : (
          placed.map((item, i) => (
            <span key={i} style={{
              background: result === 'correct' ? 'rgba(34,197,94,0.2)' : result === 'wrong' ? 'rgba(239,68,68,0.2)' : 'rgba(5,150,105,0.2)',
              border: `2px solid ${result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : '#059669'}`,
              borderRadius: 10,
              padding: '6px 14px',
              fontSize: 20,
              fontWeight: 900,
              color: result === 'correct' ? '#22C55E' : result === 'wrong' ? '#EF4444' : '#34D399',
            }}>{item.s}</span>
          ))
        )}
      </div>

      {/* Résultat */}
      {result && (
        <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 900, marginBottom: 8,
          color: result === 'correct' ? '#22C55E' : '#EF4444' }}>
          {result === 'correct' ? '✅ Bravo !' : `❌ C'était : ${round.syllables.join('-')}`}
        </p>
      )}

      {/* Bouton effacer */}
      {placed.length > 0 && !result && (
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <button onClick={removeLast} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '4px 12px', fontSize: 12, color: 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'Nunito', fontWeight: 700,
          }}>⬅ Effacer</button>
        </div>
      )}

      {/* Syllabes disponibles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 16 }}>
        {shuffled.map(item => (
          <button key={item.id}
            onClick={() => addSyllable(item)}
            disabled={!!result}
            style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(5,150,105,0.4)',
              borderRadius: 12,
              padding: '12px 20px',
              fontSize: 22,
              fontWeight: 900,
              color: '#34D399',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.background = 'rgba(5,150,105,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(5,150,105,0.4)'; e.currentTarget.style.background = 'var(--bg-card)' }}
          >{item.s}</button>
        ))}
      </div>
    </GameShell>
  )
}