import CountingGame    from '../games/CountingGame.jsx'
import MemoryGame      from '../games/MemoryGame.jsx'
import ColorsGame      from '../games/ColorsGame.jsx'
import AdditionsGame   from '../games/AdditionsGame.jsx'
import AlphabetGame    from '../games/AlphabetGame.jsx'
import SeasonsGame     from '../games/SeasonsGame.jsx'
import FirstWordsGame  from '../games/FirstWordsGame.jsx'
import FoodGame        from '../games/FoodGame.jsx'
import DifferencesGame from '../games/DifferencesGame.jsx'
import SequenceGame    from '../games/SequenceGame.jsx'
import ColorsEnGame    from '../games/ColorsEnGame.jsx'
import CompareGame     from '../games/CompareGame.jsx'
import ClockGame       from '../games/ClockGame.jsx'
import WeatherGame     from '../games/WeatherGame.jsx'
import ShapesGame      from '../games/ShapesGame.jsx'
import AnimalsGame     from '../games/AnimalsGame.jsx'
import SyllablesGame   from '../games/SyllablesGame.jsx'
import SentenceGame    from '../games/SentenceGame.jsx'
import DictationGame   from '../games/DictationGame.jsx'

const MAP = {
  counting:    CountingGame,
  memory:      MemoryGame,
  colors:      ColorsGame,
  additions:   AdditionsGame,
  alphabet:    AlphabetGame,
  seasons:     SeasonsGame,
  firstwords:  FirstWordsGame,
  food:        FoodGame,
  differences: DifferencesGame,
  sequence:    SequenceGame,
  colorsen:    ColorsEnGame,
  compare:     CompareGame,
  clock:       ClockGame,
  weather:     WeatherGame,
  shapes:      ShapesGame,
  animals:     AnimalsGame,
  syllables:   SyllablesGame,
  sentence:    SentenceGame,
  dictation:   DictationGame,
}

export default function GamePage({ game, onFinish, onHome }) {
  const Component = MAP[game.id]

  if (!Component) {
    return (
      <div>
        <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="nav-back" onClick={onHome}>← Retour</button>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>{game.emoji} {game.title}</span>
        </div>
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🚧</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Bientôt disponible !</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28 }}>Ce jeu arrive très bientôt. En attendant, essaie un autre jeu !</p>
          <button className="btn btn-primary" onClick={onHome} style={{ width: '100%', maxWidth: 280, margin: '0 auto' }}>🏠 Retour à l'accueil</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="nav-back" onClick={onHome}>← Retour</button>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>{game.emoji} {game.title}</span>
      </div>
      <Component onFinish={onFinish} onHome={onHome} />
    </div>
  )
}