export default function ComingSoon({ onHome }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🚧</div>
      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Bientôt disponible !</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28 }}>Ce jeu arrive très bientôt. En attendant, essaie un autre jeu !</p>
      <button className="btn btn-primary" onClick={onHome} style={{ width: '100%', maxWidth: 280, margin: '0 auto' }}>🏠 Retour à l'accueil</button>
    </div>
  )
}
