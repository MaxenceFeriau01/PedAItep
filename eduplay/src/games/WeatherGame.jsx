import { useState, useCallback } from 'react'
import GameShell from '../components/GameShell.jsx'
import GameResult from '../components/GameResult.jsx'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const WEATHERS = [
  { id: 'soleil',  label: 'Ensoleillé',  emoji: '☀️',  scene: '☀️🌤️🌈', desc: 'Le soleil brille fort, il fait chaud !' },
  { id: 'pluie',   label: 'Pluvieux',    emoji: '🌧️', scene: '🌧️💧☁️', desc: 'Il pleut, prends ton parapluie !' },
  { id: 'neige',   label: 'Neigeux',     emoji: '❄️',  scene: '❄️⛄🌨️', desc: 'Il neige, mets tes bottes et ton manteau !' },
  { id: 'nuages',  label: 'Nuageux',     emoji: '☁️',  scene: '☁️🌥️⛅', desc: 'Le ciel est couvert de nuages.' },
  { id: 'orage',   label: 'Orageux',     emoji: '⛈️',  scene: '⛈️🌩️💥', desc: 'Il y a de l\'orage, attention au tonnerre !' },
  { id: 'vent',    label: 'Venteux',     emoji: '💨',  scene: '💨🍃🌬️', desc: 'Le vent souffle fort, tiens ton chapeau !' },
  { id: 'brouillard', label: 'Brouillard', emoji: '🌫️', scene: '🌫️😶‍🌫️🌁', desc: 'On ne voit pas loin, c\'est le brouillard !' },
  { id: 'arc-en-ciel', label: 'Arc-en-ciel', emoji: '🌈', scene: '🌈🌦️✨', desc: 'Après la pluie, l\'arc-en-ciel !' },
]

function makeRound(weather) {
  const others = WEATHERS.filter(w => w.id !== weather.id)
  const choices = shuffle([weather, ...shuffle(others).slice(0, 3)])
  return { weather, choices }
}

export default function WeatherGame({ onFinish, onHome }) {
  const total = 8
  const [rounds] = useState(() => shuffle(WEATHERS).slice(0, total).map(makeRound))
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [chosen, setChosen] = useState(null)
  const [done, setDone]     = useState(false)

  const round = rounds[idx]
  const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  const pick = useCallback((id) => {
    if (chosen) return
    setChosen(id)
    const correct = id === round.weather.id
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
    <GameShell title="La météo" emoji="🌦️" current={idx + 1} total={total} stars={stars} color="#0EA5E9">
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 72, marginBottom: 12, letterSpacing: 4 }}>{round.weather.scene}</div>
        <div style={{ background: 'var(--bg-card2)', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: 'var(--text-muted)' }}>
          {round.weather.desc}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {round.choices.map(w => (
          <button key={w.id}
            className={`answer-btn${chosen === w.id ? (w.id === round.weather.id ? ' correct' : ' wrong') : ''}${chosen && w.id === round.weather.id && chosen !== w.id ? ' correct' : ''}`}
            onClick={() => pick(w.id)}
            disabled={!!chosen}
            style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', padding: '16px 12px' }}
          >
            <span style={{ fontSize: 28 }}>{w.emoji}</span>
            {w.label}
          </button>
        ))}
      </div>
    </GameShell>
  )
}