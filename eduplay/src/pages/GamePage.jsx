import CountingGame  from '../games/CountingGame.jsx'
import MemoryGame    from '../games/MemoryGame.jsx'
import ColorsGame    from '../games/ColorsGame.jsx'
import AdditionsGame from '../games/AdditionsGame.jsx'
import AlphabetGame  from '../games/AlphabetGame.jsx'
import SeasonsGame   from '../games/SeasonsGame.jsx'
import FirstWordsGame from '../games/FirstWordsGame.jsx'
import ComingSoon    from './ComingSoon.jsx'

const MAP = {
  counting:   CountingGame,
  memory:     MemoryGame,
  colors:     ColorsGame,
  additions:  AdditionsGame,
  alphabet:   AlphabetGame,
  seasons:    SeasonsGame,
  firstwords: FirstWordsGame,
}

export default function GamePage({ game, onFinish, onHome }) {
  const Component = MAP[game.id] || ComingSoon
  return (
    <div>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="nav-back" onClick={onHome}>← Retour</button>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>{game.emoji} {game.title}</span>
      </div>
      <Component onFinish={onFinish} onHome={onHome} />
    </div>
  )
}
