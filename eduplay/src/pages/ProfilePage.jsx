import { checkTrophies } from '../hooks/useTrophies.js'
import { useState } from 'react'

function TrophyReward({ trophy, onClose }) {
  const isDrawing = trophy.rewardType === 'drawing'
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="fade-up" style={{ background: '#1A1030', border: '1px solid rgba(255,215,61,0.3)', borderRadius: 24, padding: 28, width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>{trophy.emoji}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>{trophy.title}</h2>
        <div style={{ display: 'inline-block', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800, marginBottom: 16, background: isDrawing ? 'rgba(100,180,255,0.15)' : 'rgba(80,220,140,0.15)', color: isDrawing ? '#64B4FF' : '#50DC8C' }}>
          {isDrawing ? '🖌️ Dessin à colorier' : '✂️ Activité papier'}
        </div>
        <p style={{ fontSize: 16, fontWeight: 900, marginBottom: 8, color: 'var(--gold)' }}>{trophy.rewardTitle}</p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>{trophy.rewardDesc}</p>

        {/* SVG drawing preview for drawing type */}
        {isDrawing && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <svg viewBox="0 0 200 140" width="100%" style={{ display: 'block' }}>
              {/* Rainbow */}
              {[70,60,50,40,30].map((r,i) => {
                const colors = ['#EF4444','#F97316','#EAB308','#22C55E','#3B82F6']
                return <path key={i} d={`M ${100-r} 100 A ${r} ${r} 0 0 1 ${100+r} 100`} fill="none" stroke={colors[i]} strokeWidth="8" strokeLinecap="round"/>
              })}
              {/* Clouds */}
              <ellipse cx="30" cy="95" rx="20" ry="14" fill="#E5E7EB"/>
              <ellipse cx="45" cy="88" rx="18" ry="12" fill="#E5E7EB"/>
              <ellipse cx="170" cy="95" rx="20" ry="14" fill="#E5E7EB"/>
              <ellipse cx="155" cy="88" rx="18" ry="12" fill="#E5E7EB"/>
              <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="sans-serif">Colorie l'arc-en-ciel !</text>
            </svg>
          </div>
        )}

        {/* Activity preview */}
        {!isDrawing && (
          <div style={{ background: 'var(--bg-card2)', borderRadius: 16, padding: 20, marginBottom: 20, textAlign: 'left' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              📋 <strong style={{ color: 'var(--text)' }}>Instructions :</strong><br/>
              1. Demande à un adulte d'imprimer cette activité<br/>
              2. Prends tes crayons et suis les instructions<br/>
              3. Montre ta création à ta famille !
            </p>
          </div>
        )}

        <button className="btn btn-gold" onClick={onClose} style={{ width: '100%' }}>Super, merci ! 🎉</button>
      </div>
    </div>
  )
}

export default function ProfilePage({ profile, stats, onSwitch }) {
  const [selectedTrophy, setSelectedTrophy] = useState(null)
  if (!profile || !stats) return null

  const { unlocked, locked } = checkTrophies(profile)
  const sessions = (profile.sessions || []).slice(0, 5)

  return (
    <div style={{ padding: '20px' }}>
      {selectedTrophy && <TrophyReward trophy={selectedTrophy} onClose={() => setSelectedTrophy(null)} />}

      {/* Profile header */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#2D1F60', border: '3px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>
          {profile.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 2 }}>{profile.name}</div>
          <div style={{ display: 'inline-block', background: 'rgba(255,215,61,0.12)', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>
            Niveau {stats.level} — {stats.levelName}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, height: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 20, background: 'linear-gradient(90deg,var(--gold),#FF8C00)', width: `${(stats.levelXP / 500) * 100}%`, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-hint)', marginTop: 4 }}>{stats.levelXP} / 500 pts pour le niveau {stats.level + 1}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {[
          { v: `⭐ ${stats.totalStars}`, l: 'Étoiles' },
          { v: stats.totalSessions, l: 'Sessions' },
          { v: `🏆 ${unlocked.length}`, l: 'Trophées' },
          { v: `🔥 ${stats.streak}`, l: 'Jours suite' },
        ].map(s => (
          <div key={s.l} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 900 }}>{s.v}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Dernières sessions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {sessions.map(s => (
              <div key={s.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.gameEmoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>{s.gameTitle}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} • {s.score}/{s.total} bonnes réponses
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)' }}>⭐ {s.stars * 8}</div>
                  <div style={{ width: 50, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, marginTop: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: s.pct >= 70 ? '#22C55E' : s.pct >= 40 ? '#F97316' : '#EF4444', width: `${s.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trophies */}
      <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Trophées</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
        {unlocked.map(t => (
          <div key={t.id} onClick={() => setSelectedTrophy(t)}
            style={{ background: '#1E1828', border: '1px solid rgba(255,215,61,0.25)', borderRadius: 16, padding: '14px 12px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>{t.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 3 }}>{t.title}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>{t.desc}</div>
            <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, fontWeight: 700, display: 'inline-block', background: t.rewardType === 'drawing' ? 'rgba(100,180,255,0.15)' : 'rgba(80,220,140,0.15)', color: t.rewardType === 'drawing' ? '#64B4FF' : '#50DC8C' }}>
              {t.rewardType === 'drawing' ? '🖌️ Voir le dessin' : '✂️ Voir l\'activité'}
            </div>
          </div>
        ))}
        {locked.map(t => (
          <div key={t.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px 12px', textAlign: 'center', opacity: 0.4 }}>
            <div style={{ fontSize: 30, marginBottom: 6, filter: 'grayscale(1)' }}>{t.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 3 }}>{t.title}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.desc}</div>
            <div style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, fontWeight: 700, display: 'inline-block', marginTop: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>🔒 Verrouillé</div>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost" onClick={onSwitch} style={{ width: '100%' }}>🔄 Changer de joueur</button>
    </div>
  )
}
