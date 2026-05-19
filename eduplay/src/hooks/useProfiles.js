import { useState, useCallback } from 'react'

const STORAGE_KEY = 'eduplay_profiles'
const AVATARS = ['🦊','🐉','🦄','🐼','🐸','🦁','🐨','🐯','🐻','🦋','🐬','🦅']
const COLORS  = ['#7C3AED','#0891B2','#DC2626','#059669','#D97706','#DB2777','#2563EB','#65A30D']

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}
function save(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

export function useProfiles() {
  const [profiles, setProfiles] = useState(load)
  const [activeId, setActiveId] = useState(() => {
    const p = load(); return p[0]?.id || null
  })

  const activeProfile = profiles.find(p => p.id === activeId) || null

  const createProfile = useCallback((name) => {
    const id = Date.now().toString()
    const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)]
    const color  = COLORS[Math.floor(Math.random() * COLORS.length)]
    const newProfile = { id, name, avatar, color, sessions: [], createdAt: new Date().toISOString() }
    const updated = [...load(), newProfile]
    save(updated)
    setProfiles(updated)
    setActiveId(id)
    return id
  }, [])

  const deleteProfile = useCallback((id) => {
    const updated = load().filter(p => p.id !== id)
    save(updated)
    setProfiles(updated)
    if (activeId === id) setActiveId(updated[0]?.id || null)
  }, [activeId])

  const addSession = useCallback((gameId, gameTitle, gameEmoji, score, total, starsEarned) => {
    const updated = load().map(p => {
      if (p.id !== activeId) return p
      const session = {
        id: Date.now().toString(),
        gameId, gameTitle, gameEmoji,
        score, total,
        stars: starsEarned,
        pct: Math.round((score / total) * 100),
        date: new Date().toISOString()
      }
      return { ...p, sessions: [session, ...(p.sessions || [])] }
    })
    save(updated)
    setProfiles(updated)
  }, [activeId])

  const switchProfile = useCallback((id) => setActiveId(id), [])

  // Computed stats for active profile
  const stats = activeProfile ? computeStats(activeProfile) : null

  return { profiles, activeProfile, activeId, stats, createProfile, deleteProfile, addSession, switchProfile }
}

function computeStats(profile) {
  const sessions = profile.sessions || []
  const totalStars = sessions.reduce((s, x) => s + (x.stars || 0), 0)
  const totalSessions = sessions.length

  // Stars by category (we'll pass gameId→cat mapping via games.json inline)
  const byCat = {}
  sessions.forEach(s => {
    if (!byCat[s.gameId]) byCat[s.gameId] = 0
    byCat[s.gameId] += s.stars || 0
  })

  // Streak: count consecutive days from today
  const days = [...new Set(sessions.map(s => s.date.slice(0,10)))].sort().reverse()
  let streak = 0
  const today = new Date().toISOString().slice(0,10)
  let cur = today
  for (const d of days) {
    if (d === cur) { streak++; const dt = new Date(cur); dt.setDate(dt.getDate()-1); cur = dt.toISOString().slice(0,10) }
    else break
  }

  // XP / Level
  const xp = totalStars * 10
  const level = Math.floor(xp / 500) + 1
  const levelXP = xp % 500
  const levelNames = ['Débutant','Explorateur','Aventurier','Champion','Génie','Super-Génie','Légende']
  const levelName = levelNames[Math.min(level-1, levelNames.length-1)]

  return { totalStars, totalSessions, streak, xp, level, levelXP, levelName, byCat }
}
