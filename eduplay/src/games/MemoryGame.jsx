import { useState, useEffect, useCallback } from 'react'
import data from '../data/memory.json'
import GameResult from '../components/GameResult.jsx'

function buildDeck(pairs) {
  const cards = data.cards.slice(0, pairs)
  const deck = [...cards, ...cards].map((c, i) => ({ ...c, uid: i, flipped: false, matched: false }))
  return deck.sort(() => Math.random() - 0.5)
}

export default function MemoryGame({ onFinish, onHome }) {
  const pairs = 6
  const [deck, setDeck]         = useState(() => buildDeck(pairs))
  const [flipped, setFlipped]   = useState([])
  const [moves, setMoves]       = useState(0)
  const [matched, setMatched]   = useState(0)
  const [locked, setLocked]     = useState(false)
  const [done, setDone]         = useState(false)

  const stars = moves <= pairs + 2 ? 3 : moves <= pairs * 2 ? 2 : 1

  const flip = useCallback((uid) => {
    if (locked) return
    if (deck.find(c => c.uid === uid)?.flipped) return
    if (flipped.length === 1 && flipped[0] === uid) return

    setDeck(d => d.map(c => c.uid === uid ? { ...c, flipped: true } : c))
    const newFlipped = [...flipped, uid]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      setLocked(true)
      const [a, b] = newFlipped.map(id => deck.find(c => c.uid === id))
      if (a.id === b.id) {
        setDeck(d => d.map(c => newFlipped.includes(c.uid) ? { ...c, matched: true } : c))
        setMatched(m => {
          const nm = m + 1
          if (nm === pairs) { setTimeout(() => { setDone(true); onFinish && onFinish(pairs, pairs, stars) }, 500) }
          return nm
        })
        setFlipped([])
        setLocked(false)
      } else {
        setTimeout(() => {
          setDeck(d => d.map(c => newFlipped.includes(c.uid) ? { ...c, flipped: false } : c))
          setFlipped([])
          setLocked(false)
        }, 900)
      }
    }
  }, [deck, flipped, locked, pairs, stars])

  if (done) return <GameResult score={matched} total={pairs} stars={stars} onHome={onHome} onReplay={() => window.location.reload()} />

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: 18 }}>🧠 Mémory animaux</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{matched}/{pairs} paires • {moves} coups</p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3].map(i => <span key={i} style={{ fontSize: 20, opacity: i <= stars ? 1 : 0.2 }}>⭐</span>)}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {deck.map(card => (
          <div
            key={card.uid}
            onClick={() => flip(card.uid)}
            style={{
              aspectRatio: '1',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: card.flipped || card.matched ? 36 : 28,
              cursor: card.matched ? 'default' : 'pointer',
              background: card.matched ? 'rgba(34,197,94,0.15)' : card.flipped ? 'var(--bg-card2)' : '#1A1030',
              border: `2px solid ${card.matched ? '#22C55E' : card.flipped ? 'rgba(255,215,61,0.4)' : 'rgba(255,255,255,0.07)'}`,
              transition: 'all 0.2s',
              userSelect: 'none',
            }}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </div>
        ))}
      </div>
    </div>
  )
}
