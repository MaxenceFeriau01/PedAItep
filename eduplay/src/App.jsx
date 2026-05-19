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

  const handlePlay = (game) => { setCurrentGame(game); setPage(PAGES.game) }

  const handleFinish = (score, total, stars) => {
    addSession(currentGame.id, currentGame.title, currentGame.emoji, score, total, stars)
  }

  const handleHome = () => { setPage(PAGES.home); setCurrentGame(null) }

  return (
    <div className="app-shell">
      {page !== PAGES.game && (
        <nav className="top-nav">
          <div className="nav-logo">Edu<span>Play</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => setShowWho(true)}>{activeProfile.avatar}</div>
            {stats && <div className="nav-stars">⭐ {stats.totalStars}</div>}
          </div>
        </nav>
      )}

      <div className="page">
        {page === PAGES.home    && <Home profile={activeProfile} stats={stats} onPlay={handlePlay} />}
        {page === PAGES.game    && currentGame && <GamePage game={currentGame} onFinish={handleFinish} onHome={handleHome} />}
        {page === PAGES.profile && <ProfilePage profile={activeProfile} stats={stats} onSwitch={() => { setShowWho(true); setPage(PAGES.home) }} />}
      </div>

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
