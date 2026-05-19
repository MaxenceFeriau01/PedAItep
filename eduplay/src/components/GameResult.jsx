import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function GameResult({ score, total, stars, onHome, onReplay }) {
  const pct = Math.round((score / total) * 100)
  const perfect = pct === 100

  useEffect(() => {
    if (pct >= 70) {
      confetti({ particleCount: perfect ? 150 : 80, spread: 80, origin: { y: 0.5 } })
    }
  }, [])

  const msg = perfect
    ? '🎉 Parfait ! Tu es un génie !'
    : pct >= 70 ? '⭐ Super bien joué !'
    : pct >= 40 ? '💪 Continue, tu progresses !'
    : '😊 Essaie encore, tu peux le faire !'

  return (
    <div style={{ padding: '32px 20px', textAlign: 'center' }} className="fade-up">
      <div style={{ fontSize: 72, marginBottom: 16 }}>{perfect ? '🏆' : pct >= 70 ? '⭐' : '💪'}</div>
      <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>{msg}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28 }}>
        {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {total}
      </p>

      {/* Stars */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
        {[1,2,3].map(i => (
          <span key={i} style={{ fontSize: 40, opacity: i <= stars ? 1 : 0.2, filter: i <= stars ? 'none' : 'grayscale(1)' }}>⭐</span>
        ))}
      </div>

      {/* Score pill */}
      <div style={{ display: 'inline-block', background: 'rgba(255,215,61,0.12)', border: '1px solid rgba(255,215,61,0.25)', borderRadius: 20, padding: '8px 20px', marginBottom: 32 }}>
        <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: 16 }}>+{stars * 8} étoiles gagnées !</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn btn-gold" onClick={onReplay}>🔄 Rejouer</button>
        <button className="btn btn-primary" onClick={onHome}>🏠 Accueil</button>
      </div>
    </div>
  )
}
