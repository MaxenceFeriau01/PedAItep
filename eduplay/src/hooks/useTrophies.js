import trophiesData from '../data/trophies.json'
import gamesData from '../data/games.json'

export function checkTrophies(profile) {
  if (!profile) return { unlocked: [], locked: [] }
  const sessions = profile.sessions || []
  const totalStars = sessions.reduce((s, x) => s + (x.stars || 0), 0)

  // Stars by category
  const starsByCat = {}
  sessions.forEach(s => {
    const game = gamesData.find(g => g.id === s.gameId)
    if (game) { starsByCat[game.cat] = (starsByCat[game.cat] || 0) + (s.stars || 0) }
  })

  // Plays by gameId
  const playsByGame = {}
  sessions.forEach(s => { playsByGame[s.gameId] = (playsByGame[s.gameId] || 0) + 1 })

  // Perfect games by gameId
  const perfectByGame = {}
  sessions.forEach(s => { if (s.pct === 100) perfectByGame[s.gameId] = (perfectByGame[s.gameId] || 0) + 1 })

  // Streak
  const days = [...new Set(sessions.map(s => s.date.slice(0,10)))].sort().reverse()
  let streak = 0
  const today = new Date().toISOString().slice(0,10)
  let cur = today
  for (const d of days) {
    if (d === cur) { streak++; const dt = new Date(cur); dt.setDate(dt.getDate()-1); cur = dt.toISOString().slice(0,10) }
    else break
  }

  const unlocked = []
  const locked = []

  trophiesData.forEach(t => {
    const c = t.condition
    let earned = false
    if (c.totalStars && totalStars >= c.totalStars) earned = true
    if (c.cat && c.totalStars && (starsByCat[c.cat] || 0) >= c.totalStars) earned = true
    if (c.gameId && c.perfectGames && (perfectByGame[c.gameId] || 0) >= c.perfectGames) earned = true
    if (c.gameId && c.totalPlays && (playsByGame[c.gameId] || 0) >= c.totalPlays) earned = true
    if (c.streak && streak >= c.streak) earned = true
    if (earned) unlocked.push(t)
    else locked.push(t)
  })

  return { unlocked, locked }
}
