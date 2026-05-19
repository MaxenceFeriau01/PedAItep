import { useState } from 'react'

export default function WhoPlays({ profiles, onSelect, onCreate }) {
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')

  const submit = () => {
    const n = name.trim()
    if (!n) return
    onCreate(n)
    setCreating(false)
    setName('')
  }

  return (
    <div style={{ padding: '32px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🎮</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>Edu<span style={{ color: 'var(--gold)' }}>Play</span></div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, textAlign: 'center' }}>Qui joue ? 👋</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28, textAlign: 'center' }}>Choisis ton profil pour commencer !</p>

      <div style={{ width: '100%', maxWidth: 380, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
        {profiles.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)}
            style={{ background: 'var(--bg-card)', border: '2px solid var(--border)', borderRadius: 20, padding: '20px 12px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ fontSize: 44, marginBottom: 8 }}>{p.avatar}</div>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
              ⭐ {(p.sessions || []).reduce((s, x) => s + (x.stars || 0), 0)} pts
            </div>
          </div>
        ))}

        {/* Add profile */}
        {profiles.length < 4 && !creating && (
          <div onClick={() => setCreating(true)}
            style={{ background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(255,255,255,0.12)', borderRadius: 20, padding: '20px 12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 120 }}>
            <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.2)' }}>+</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Nouveau profil</div>
          </div>
        )}
      </div>

      {/* Create form */}
      {creating && (
        <div className="fade-up" style={{ width: '100%', maxWidth: 380, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 20 }}>
          <p style={{ fontWeight: 900, marginBottom: 12 }}>Quel est ton prénom ?</p>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Prénom..."
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card2)', color: 'var(--text)', fontSize: 16, fontFamily: 'Nunito', fontWeight: 700, marginBottom: 12, outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => setCreating(false)} style={{ flex: 1 }}>Annuler</button>
            <button className="btn btn-gold" onClick={submit} style={{ flex: 2 }}>Créer 🎉</button>
          </div>
        </div>
      )}
    </div>
  )
}
