import { useState, useCallback } from 'react'

const STORAGE_KEY = 'eduplay_profiles'
const AVATARS = ['🦊','🐉','🦄','🐼','🐸','🦁','🐨','🐯','🐻','🦋','🐬','🦅']

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}
function save(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

export function useProfiles() {
  const [profiles, setProfiles] = useState(load)
  const [activeId, setActiveId] = useState(() => {
    const p = load()
    return p[0]?.id || null
  })

  const activeProfile = profiles.find(p => p.id === activeId) || null

  const createProfile = useCallback((name, avatar) => {
    const id = Date.now().toString()
    const av = avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)]
    const newProfile = { id, name, avatar: av, sessions: [], createdAt: new Date().toISOString() }
    setProfiles(prev => {
      const updated = [...prev, newProfile]
      save(updated)
      return updated
    })
    setActiveId(id)
    return id
  }, [])

  const deleteProfile = useCallback((id) => {
    setProfiles(prev => {
      const updated = prev.filter(p => p.id !== id)
      save(updated)
      return updated
    })
    setActiveId(prev => prev === id ? (profiles.find(p => p.id !== id)?.id || null) : prev)
  }, [profiles])

  const addSession = useCallback((gameId, gameTitle, gameEmoji, score, total, starsEarned) => {
    const session = {
      id: Date.now().toString(),
      gameId, gameTitle, gameEmoji,
      score, total,
      stars: starsEarned,
      pct: Math.round((score / total) * 100),
      date: new Date().toISOString(),
    }
    setProfiles(prev => {
      const updated = prev.map(p => {
        if (p.id !== activeId) return p
        return { ...p, sessions: [session, ...(p.sessions || [])] }
      })
      save(updated)
      return updated
    })
  }, [activeId])

  const switchProfile = useCallback((id) => setActiveId(id), [])

  const stats = activeProfile ? computeStats(activeProfile) : null

  return { profiles, activeProfile, activeId, stats, createProfile, deleteProfile, addSession, switchProfile }
}

function computeStats(profile) {
  const sessions = profile.sessions || []
  const totalStars = sessions.reduce((s, x) => s + (x.stars || 0), 0)
  const totalSessions = sessions.length

  // Streak
  const days = [...new Set(sessions.map(s => s.date.slice(0, 10)))].sort().reverse()
  let streak = 0
  const today = new Date().toISOString().slice(0, 10)
  let cur = today
  for (const d of days) {
    if (d === cur) {
      streak++
      const dt = new Date(cur)
      dt.setDate(dt.getDate() - 1)
      cur = dt.toISOString().slice(0, 10)
    } else break
  }

  // XP / Level (1 étoile = 10 XP, niveau tous les 500 XP)
  const xp = totalStars * 10
  const level = Math.min(Math.floor(xp / 500) + 1, 7)
  const levelXP = xp % 500
  const levelNames = ['Débutant', 'Explorateur', 'Aventurier', 'Champion', 'Génie', 'Super-Génie', 'Légende']
  const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)]

  return { totalStars, totalSessions, streak, xp, level, levelXP, levelName }
}