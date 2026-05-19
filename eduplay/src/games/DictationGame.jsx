import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const WORDS = [
  { emoji: '🐱', word: 'chat',      wrong: ['chien', 'rat', 'chat', 'cheval'] },
  { emoji: '🐶', word: 'chien',     wrong: ['chat', 'lion', 'chien', 'lapin'] },
  { emoji: '🌳', word: 'arbre',     wrong: ['fleur', 'arbre', 'herbe', 'feuille'] },
  { emoji: '🍎', word: 'pomme',     wrong: ['poire', 'pomme', 'fraise', 'orange'] },
  { emoji: '🏠', word: 'maison',    wrong: ['école', 'maison', 'château', 'grange'] },
  { emoji: '🚗', word: 'voiture',   wrong: ['camion', 'vélo', 'voiture', 'moto'] },
  { emoji: '⭐', word: 'étoile',    wrong: ['lune', 'soleil', 'étoile', 'nuage'] },
  { emoji: '🌸', word: 'fleur',     wrong: ['arbre', 'fleur', 'rose', 'herbe'] },
  { emoji: '🦋', word: 'papillon',  wrong: ['abeille', 'mouche', 'papillon', 'fourmi'] },
  { emoji: '🍌', word: 'banane',    wrong: ['citron', 'ananas', 'banane', 'mangue'] },
  { emoji: '🐸', word: 'grenouille',wrong: ['serpent', 'lézard', 'grenouille', 'crapaud'] },
  { emoji: '🌈', word: 'arc-en-ciel', wrong: ['nuage', 'pluie', 'orage', 'arc-en-ciel'] },
  { emoji: '📚', word: 'livre',     wrong: ['cahier', 'livre', 'stylo', 'règle'] },
  { emoji: '🎂', word: 'gâteau',    wrong: ['bonbon', 'biscuit', 'gâteau', 'tarte'] },
  { emoji: '🌙', word: 'lune',      wrong: ['soleil', 'étoile', 'lune', 'ciel'] },
]

function makeRound(item) {
  const choices = shuffle(item.wrong.slice())
  // s'assurer que le bon mot y est
  if (!choices.includes(item.word)) {
    choices[Math.floor(Math.random() * choices.length)] = item.word
  }
  return { ...item, choices: shuffle(choices) }
}

export default function DictationGame({ onFinish, onHome }) {
  const total = 8
  const [rounds]                = useState(() => shuffle(WORDS).slice(0, total).map(makeRound))
  const [idx, setIdx]           = useState(0)
  const [score, setScore]       = useState(0)
  const [chosen, setChosen]     = useState(null)
  const [done, setDone]         = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((w) => {
    if (chosen) return
    setChosen(w)
    const correct = w === round.word
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
  }, [chosen, round, idx, score, total, onFinish])

  if (done) return <GameResult score={score} total={total} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <GameShell title="Dictée illustrée" emoji="✏️" current={idx + 1} total={total} stars={stars} color="#065F46">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 96, marginBottom: 12 }}>{round.emoji}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Quel mot correspond à cette image ?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(w => (
          <button key={w}
            className={`answer-btn${chosen === w ? (w === round.word ? ' correct' : ' wrong') : ''}${chosen && w === round.word && chosen !== w ? ' correct' : ''}`}
            onClick={() => pick(w)}
            disabled={!!chosen}
            style={{ fontSize: 18, fontWeight: 800, padding: '18px 10px' }}
          >
            {w}
          </button>
        ))}
      </div>
    </GameShell>
  )
}