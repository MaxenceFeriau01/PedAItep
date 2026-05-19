import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const ANIMALS = [
  { emoji: '🦁', name: 'Lion',        habitat: 'savane',   habitatEmoji: '🌾', desc: 'La savane africaine',    choices: ['savane','forêt','océan','pôle'] },
  { emoji: '🐧', name: 'Pingouin',    habitat: 'pôle',     habitatEmoji: '❄️', desc: 'Les pôles glacés',        choices: ['savane','désert','pôle','forêt'] },
  { emoji: '🐠', name: 'Poisson clown', habitat: 'océan',  habitatEmoji: '🌊', desc: "L'océan",                choices: ['océan','rivière','forêt','savane'] },
  { emoji: '🐪', name: 'Chameau',     habitat: 'désert',   habitatEmoji: '🏜️', desc: 'Le désert',              choices: ['désert','forêt','pôle','océan'] },
  { emoji: '🐘', name: 'Éléphant',    habitat: 'savane',   habitatEmoji: '🌾', desc: 'La savane africaine',    choices: ['savane','forêt','désert','pôle'] },
  { emoji: '🦊', name: 'Renard arctique', habitat: 'pôle', habitatEmoji: '❄️', desc: 'Les régions arctiques',  choices: ['pôle','savane','désert','forêt'] },
  { emoji: '🐊', name: 'Crocodile',   habitat: 'rivière',  habitatEmoji: '🏞️', desc: 'Les rivières et marais', choices: ['rivière','océan','désert','pôle'] },
  { emoji: '🦜', name: 'Perroquet',   habitat: 'forêt',    habitatEmoji: '🌴', desc: 'La forêt tropicale',     choices: ['forêt','savane','pôle','désert'] },
  { emoji: '🐻‍❄️', name: 'Ours polaire', habitat: 'pôle',  habitatEmoji: '❄️', desc: 'L\'Arctique',            choices: ['pôle','forêt','savane','rivière'] },
  { emoji: '🦈', name: 'Requin',      habitat: 'océan',    habitatEmoji: '🌊', desc: "L'océan",                choices: ['océan','rivière','pôle','désert'] },
  { emoji: '🐒', name: 'Singe',       habitat: 'forêt',    habitatEmoji: '🌴', desc: 'La forêt tropicale',     choices: ['forêt','savane','désert','océan'] },
  { emoji: '🦂', name: 'Scorpion',    habitat: 'désert',   habitatEmoji: '🏜️', desc: 'Le désert',              choices: ['désert','forêt','pôle','rivière'] },
]

const HABITAT_COLORS = {
  savane:  '#F59E0B',
  pôle:    '#60A5FA',
  océan:   '#06B6D4',
  désert:  '#F97316',
  forêt:   '#22C55E',
  rivière: '#3B82F6',
}

export default function AnimalsGame({ onFinish, onHome }) {
  const total = 8
  const [rounds] = useState(() => shuffle(ANIMALS).slice(0, total))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((h) => {
    if (chosen) return
    setChosen(h)
    const correct = h === round.habitat
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
    <GameShell title="Animaux du monde" emoji="🐾" current={idx + 1} total={total} stars={stars} color="#84CC16">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 90, marginBottom: 10 }}>{round.emoji}</div>
        <p style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{round.name}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Où vit cet animal ?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(h => {
          const isChosen  = chosen === h
          const isCorrect = isChosen && h === round.habitat
          const isWrong   = isChosen && h !== round.habitat
          const showGreen = chosen && !isChosen && h === round.habitat
          const col = HABITAT_COLORS[h] || '#888'
          return (
            <button key={h}
              className={`answer-btn${isCorrect || showGreen ? ' correct' : ''}${isWrong ? ' wrong' : ''}`}
              onClick={() => pick(h)}
              disabled={!!chosen}
              style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', padding: '16px 10px' }}
            >
              <span style={{ fontSize: 26 }}>
                {h === 'savane' ? '🌾' : h === 'pôle' ? '❄️' : h === 'océan' ? '🌊' : h === 'désert' ? '🏜️' : h === 'forêt' ? '🌴' : '🏞️'}
              </span>
              <span style={{ fontWeight: 900, textTransform: 'capitalize' }}>{h}</span>
            </button>
          )
        })}
      </div>

      {chosen && (
        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          {round.name} vit dans <strong style={{ color: HABITAT_COLORS[round.habitat] }}>{round.desc}</strong>
        </div>
      )}
    </GameShell>
  )
}