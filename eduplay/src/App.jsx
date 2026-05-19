import { useState } from 'react'
import './index.css'
import { useProfiles } from './hooks/useProfiles.js'
import WhoPlays    from './pages/WhoPlays.jsx'
import Home        from './pages/Home.jsx'
import GamePage    from './pages/GamePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const PAGES = { home: 'home', game: 'game', profile: 'profile' }

export default function App() {
  const { profiles, activeProfile, activeId, stats, createProfile, addSession, switchProfile } = useProfiles()
  const [page, setPage]               = useState(PAGES.home)
  const [currentGame, setCurrentGame] = useState(null)
  const [showWho, setShowWho]         = useState(!activeId)

  if (showWho || !activeProfile) {
    return (
      <div className="app-shell">
        <WhoPlays
          profiles={profiles}
          onSelect={(id) => { switchProfile(id); setShowWho(false) }}
          onCreate={(name) => { createProfile(name); setShowWho(false) }}
        />
      </div>
    )
  }

  const handlePlay   = (game) => { setCurrentGame(game); setPage(PAGES.game) }
  const handleFinish = (score, total, stars) => {
    addSession(currentGame.id, currentGame.title, currentGame.emoji, score, total, stars)
  }
  const handleHome   = () => { setPage(PAGES.home); setCurrentGame(null) }

  return (
    <div className="app-shell">

      {/* ── TOP NAV ── */}
      {page !== PAGES.game && (
        <nav className="top-nav">
          {/* Logo — clique = accueil */}
          <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => setPage(PAGES.home)}>
            Edu<span>Play</span>
          </div>

          {/* Droite : étoiles + boutons nav desktop + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Compteur étoiles */}
            {stats && <div className="nav-stars">⭐ {stats.totalStars}</div>}

            {/* Liens desktop (cachés sur mobile via CSS) */}
            <div className="desktop-nav">
              <div
                className={`desktop-nav-item ${page === PAGES.home ? 'active' : ''}`}
                onClick={() => setPage(PAGES.home)}
              >🏠 Accueil</div>
              <div
                className={`desktop-nav-item ${page === PAGES.profile ? 'active' : ''}`}
                onClick={() => setPage(PAGES.profile)}
              >⭐ Mon profil</div>
              <div
                className="desktop-nav-item"
                onClick={() => setShowWho(true)}
              >👥 Joueurs</div>
            </div>

            {/* Avatar → profil */}
            <div
              onClick={() => setPage(PAGES.profile)}
              title="Mon profil"
              style={{
                fontSize: 26, cursor: 'pointer',
                width: 42, height: 42, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${page === PAGES.profile ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
                background: page === PAGES.profile ? 'rgba(255,215,61,0.12)' : 'rgba(255,255,255,0.05)',
                transition: 'all 0.15s',
              }}
            >
              {activeProfile.avatar}
            </div>
          </div>
        </nav>
      )}

      {/* ── CONTENU ── */}
      <div className="page">
        {page === PAGES.home    && <Home profile={activeProfile} stats={stats} onPlay={handlePlay} />}
        {page === PAGES.game    && currentGame && <GamePage game={currentGame} onFinish={handleFinish} onHome={handleHome} />}
        {page === PAGES.profile && <ProfilePage profile={activeProfile} stats={stats} onSwitch={() => { setShowWho(true); setPage(PAGES.home) }} />}
      </div>

      {/* ── BOTTOM NAV (mobile uniquement) ── */}
      {page !== PAGES.game && (
        <nav className="bottom-nav">
          <div className={`bnav-item ${page === PAGES.home ? 'active' : ''}`} onClick={() => setPage(PAGES.home)}>
            <span className="icon">🏠</span>ACCUEIL
          </div>
          <div className="bnav-item" onClick={() => setShowWho(true)}>
            <span className="icon">👥</span>JOUEURS
          </div>
          <div className={`bnav-item ${page === PAGES.profile ? 'active' : ''}`} onClick={() => setPage(PAGES.profile)}>
            <span className="icon">⭐</span>PROFIL
          </div>
        </nav>
      )}

    </div>
  )
}