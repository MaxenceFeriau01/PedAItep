export default function GameShell({ title, emoji, current, total, stars, color, children }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  return (
    <div style={{ minHeight: '100%' }}>
      {/* Game header */}
      <div style={{ padding: '16px 20px 12px', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>{emoji}</span>
            <span style={{ fontWeight: 900, fontSize: 16 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[1,2,3].map(i => (
              <span key={i} style={{ fontSize: 18, opacity: i <= stars ? 1 : 0.2 }}>⭐</span>
            ))}
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${pct}%`, background: color || 'var(--gold)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 11, color: 'var(--text-hint)' }}>Question {current} / {total}</span>
        </div>
      </div>

      {/* Game content */}
      <div style={{ padding: '24px 20px' }}>
        {children}
      </div>
    </div>
  )
}
