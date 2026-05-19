import { useState } from 'react'

const AVATARS = ['🦊','🐱','🐶','🐸','🦁','🐧','🦋','🐼','🐨','🦄']

export default function WhoPlays({ profiles, onSelect, onCreate }) {
  const [creating, setCreating] = useState(false)
  const [name, setName]         = useState('')
  const [avatar, setAvatar]     = useState('🦊')

  const submit = () => {
    const n = name.trim()
    if (!n) return
    onCreate(n, avatar)
    setName(''); setCreating(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '40px 28px 28px',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 32 }}>
        <div className="nav-logo" style={{ fontSize: 28 }}>Edu<span>Play</span></div>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Qui joue ? 👋</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Choisis ton profil pour commencer !</p>

      {/* Grille de profils — s'adapte à la largeur */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 14,
        width: '100%',
        maxWidth: 900,
        marginBottom: 16,
      }}>
        {profiles.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)}
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border)',
              borderRadius: 20,
              padding: '20px 12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <div style={{ fontSize: 44, marginBottom: 8 }}>{p.avatar}</div>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
              ⭐ {(p.sessions || []).reduce((s, x) => s + (x.stars || 0), 0)} pts
            </div>
          </div>
        ))}

        {/* Ajouter un profil */}
        {profiles.length < 4 && !creating && (
          <div onClick={() => setCreating(true)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '2px dashed rgba(255,255,255,0.12)',
              borderRadius: 20,
              padding: '20px 12px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 120,
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
          >
            <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.2)' }}>+</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Nouveau profil</div>
          </div>
        )}
      </div>

      {/* Formulaire création */}
      {creating && (
        <div className="fade-up" style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: 24,
        }}>
          <p style={{ fontWeight: 900, marginBottom: 12 }}>Quel est ton prénom ?</p>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Prénom..."
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 12,
              border: '1px solid var(--border)', background: 'var(--bg-card2)',
              color: 'var(--text)', fontSize: 16, fontFamily: 'Nunito',
              fontWeight: 700, marginBottom: 14, outline: 'none',
            }}
          />
          <p style={{ fontWeight: 800, marginBottom: 10, fontSize: 13 }}>Choisis ton avatar :</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {AVATARS.map(a => (
              <div key={a} onClick={() => setAvatar(a)}
                style={{
                  fontSize: 28, cursor: 'pointer', padding: 6, borderRadius: 10,
                  background: avatar === a ? 'rgba(255,215,61,0.15)' : 'transparent',
                  border: `2px solid ${avatar === a ? 'var(--gold)' : 'transparent'}`,
                  transition: 'all 0.12s',
                }}
              >{a}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => setCreating(false)} style={{ flex: 1 }}>Annuler</button>
            <button className="btn btn-gold" onClick={submit} style={{ flex: 2 }}>Créer 🎉</button>
          </div>
        </div>
      )}
    </div>
  )
}