import { useState } from 'react'
import gamesData from '../data/games.json'

const CATS = [
  { id: 'all',     label: 'Tous',      color: '#FF6B6B', bg: '#FF6B6B' },
  { id: 'maths',   label: '🔢 Maths',  color: '#FF8C42', bg: 'rgba(255,140,66,0.15)', border: 'rgba(255,140,66,0.3)' },
  { id: 'francais',label: '📖 Français',color: '#64B4FF', bg: 'rgba(100,180,255,0.15)', border: 'rgba(100,180,255,0.3)' },
  { id: 'eveil',   label: '🌍 Éveil',  color: '#50DC8C', bg: 'rgba(80,220,140,0.15)', border: 'rgba(80,220,140,0.3)' },
  { id: 'logique', label: '🧩 Logique',color: '#B464FF', bg: 'rgba(180,100,255,0.15)', border: 'rgba(180,100,255,0.3)' },
  { id: 'anglais', label: '🌐 Anglais',color: '#64DCFF', bg: 'rgba(100,220,255,0.15)', border: 'rgba(100,220,255,0.3)' },
]

export default function Home({ profile, stats, onPlay }) {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? gamesData : gamesData.filter(g => g.cat === cat)

  const getGameStars = (gameId) => {
    if (!profile) return 0
    const sessions = (profile.sessions || []).filter(s => s.gameId === gameId)
    return sessions.length > 0 ? Math.max(...sessions.map(s => s.stars || 0)) : 0
  }

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Hero - aligné à gauche */}
      <div style={{ padding: '24px 28px 20px', background: 'linear-gradient(180deg, #1A1030 0%, transparent 100%)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#FF8E8E', fontWeight: 800, marginBottom: 12 }}>
          ✨ {gamesData.length} jeux • 5 à 9 ans
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.15, marginBottom: 8, letterSpacing: -0.5 }}>
          Bonjour {profile?.name} ! <span style={{ fontSize: 26 }}>{profile?.avatar}</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Apprendre, c'est <span style={{ color: 'var(--gold)', fontWeight: 800 }}>rigolo !</span></p>
      </div>

      {/* Stats rapides */}
      {stats && (
        <div style={{ display: 'flex', gap: 10, padding: '0 28px 20px', flexWrap: 'wrap' }}>
          {[
            { val: `⭐ ${stats.totalStars}`, lbl: 'Étoiles' },
            { val: `🔥 ${stats.streak}j`, lbl: 'Série' },
            { val: `🏆 Niv. ${stats.level}`, lbl: stats.levelName },
          ].map(s => (
            <div key={s.lbl} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 20px', textAlign: 'center', minWidth: 90 }}>
              <div style={{ fontSize: 16, fontWeight: 900 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontWeight: 700 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filtres catégories */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 28px 20px', scrollbarWidth: 'none' }}>
        {CATS.map(c => (
          <div key={c.id} className="chip"
            onClick={() => setCat(c.id)}
            style={{
              background: cat === c.id ? (c.id === 'all' ? c.bg : c.bg) : 'transparent',
              color: cat === c.id ? (c.id === 'all' ? '#fff' : c.color) : 'var(--text-muted)',
              borderColor: cat === c.id ? (c.id === 'all' ? c.bg : c.border) : 'var(--border)',
            }}>
            {c.label}
          </div>
        ))}
      </div>

      {/* Grille de jeux - responsive via classe CSS */}
      <div
        className="games-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 14,
          padding: '0 28px',
        }}
      >
        {filtered.map((game, i) => {
          const bestStars = getGameStars(game.id)
          return (
            <div key={game.id} className="fade-up"
              onClick={() => onPlay(game)}
              style={{
                background: game.bg,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '18px 16px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.15s',
                animationDelay: `${i * 30}ms`,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Barre couleur haut */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: game.color, borderRadius: '20px 20px 0 0' }} />
              {/* Reflet */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

              <div style={{ fontSize: 36, marginBottom: 10 }}>{game.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', marginBottom: 3, lineHeight: 1.2 }}>{game.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10, lineHeight: 1.4 }}>{game.desc}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>🧒 {game.age} ans</span>
                <span style={{ fontSize: 11 }}>
                  {[1,2,3].map(s => <span key={s} style={{ opacity: s <= bestStars ? 1 : 0.2 }}>⭐</span>)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}