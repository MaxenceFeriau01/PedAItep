import { useState } from 'react'
import rewardsData from '../data/rewards.json'
import { TIERS, REWARD_SVG } from '../components/RewardSVG.jsx'

const REWARDS = rewardsData

function RewardViewer({ reward, onClose }) {
  const svg = REWARD_SVG[reward.id]
  const typeLabel = reward.type === 'drawing' ? '🖌️ Coloriage' : reward.type === 'diploma' ? '🎓 Diplôme' : '✂️ Activité'
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
      zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, overflowY: 'auto',
    }} onClick={onClose}>
      <div className="fade-up" onClick={e => e.stopPropagation()} style={{
        background: '#1A1030', border: '2px solid rgba(255,215,61,0.35)',
        borderRadius: 24, padding: 24, width: '100%', maxWidth: 440, textAlign: 'center',
      }}>
        <div style={{ fontSize: 52, marginBottom: 6 }}>{reward.emoji}</div>
        <div style={{
          display: 'inline-block', fontSize: 11, fontWeight: 800, padding: '3px 12px',
          borderRadius: 20, marginBottom: 8,
          background: reward.type === 'drawing' ? 'rgba(100,180,255,0.15)' : reward.type === 'diploma' ? 'rgba(255,215,61,0.15)' : 'rgba(80,220,140,0.15)',
          color: reward.type === 'drawing' ? '#64B4FF' : reward.type === 'diploma' ? 'var(--gold)' : '#50DC8C',
        }}>{typeLabel}</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{reward.title}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 18 }}>{reward.desc}</p>
        {svg && (
          <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,215,61,0.2)' }}>
            {svg}
          </div>
        )}
        <p style={{ fontSize: 11, color: 'var(--text-hint)', marginBottom: 18 }}>
          💡 Fais une capture d'écran ou demande à un adulte d'imprimer !
        </p>
        <button className="btn btn-gold" onClick={onClose} style={{ width: '100%' }}>Fermer ✕</button>
      </div>
    </div>
  )
}

export default function ProfilePage({ profile, stats, onSwitch }) {
  const [activeTab, setActiveTab] = useState('profil')
  const [selectedReward, setSelected] = useState(null)

  if (!profile || !stats) return null

  const totalStars = stats.totalStars
  const level = stats.level
  const levelXP = stats.levelXP
  const sessions = (profile.sessions || []).slice(0, 5)

  const unlocked = REWARDS.filter(r => totalStars >= r.cost)
  const locked   = REWARDS.filter(r => totalStars < r.cost)
  const nextTier = TIERS.find(t => totalStars < t.stars)

  const LEVEL_ICONS  = ['🌱','🔭','⚔️','🏅','🦸','🚀','👑']
  const LEVEL_COLORS = ['#6B7280','#3B82F6','#10B981','#F59E0B','#EF4444','#A855F7','#FFD93D']
  const LEVEL_NAMES  = ['Débutant','Explorateur','Aventurier','Champion','Génie','Super-Génie','Légende']
  const levelColor = LEVEL_COLORS[Math.min(level - 1, 6)]
  const levelIcon  = LEVEL_ICONS[Math.min(level - 1, 6)]
  const levelName  = LEVEL_NAMES[Math.min(level - 1, 6)]

  return (
    <div style={{ paddingBottom: 24 }}>
      {selectedReward && <RewardViewer reward={selectedReward} onClose={() => setSelected(null)} />}

      {/* EN-TÊTE */}
      <div style={{ padding: '20px 24px', background: 'linear-gradient(180deg, #2D1F60 0%, var(--bg-app) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `${levelColor}22`, border: `3px solid ${levelColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38,
            }}>{profile.avatar}</div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              background: levelColor, borderRadius: '50%', width: 26, height: 26,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, border: '2px solid var(--bg-app)',
            }}>{levelIcon}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{profile.name}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: `${levelColor}22`, border: `1px solid ${levelColor}55`,
              borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 800, color: levelColor,
            }}>{levelIcon} Niv. {level} — {levelName}</div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          {[
            { val: totalStars, label: 'Étoiles', icon: '⭐', color: 'var(--gold)' },
            { val: stats.totalSessions, label: 'Parties', icon: '🎮', color: '#64B4FF' },
            { val: `🔥 ${stats.streak}j`, label: 'Série', icon: '', color: '#FF8C42' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.06)', borderRadius: 14,
              padding: '12px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.icon} {s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* BARRE XP */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 5, fontWeight: 700 }}>
            <span>{levelIcon} Niv. {level}</span>
            <span>{levelXP} / 500 XP</span>
            <span>{level < 7 ? `Niv. ${level + 1} →` : '👑 MAX'}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, height: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 20,
              background: `linear-gradient(90deg, ${levelColor}, ${LEVEL_COLORS[Math.min(level, 6)]})`,
              width: `${(levelXP / 500) * 100}%`, transition: 'width 0.6s ease',
            }}/>
          </div>
        </div>

        {/* PROCHAIN PALIER */}
        {nextTier ? (
          <div style={{
            background: 'rgba(255,215,61,0.08)', border: '1px solid rgba(255,215,61,0.2)',
            borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 24 }}>🎁</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>
                Encore {nextTier.stars - totalStars} ⭐ pour débloquer de nouvelles récompenses !
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, height: 5, marginTop: 5, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 10, background: nextTier.color,
                  width: `${Math.min((totalStars / nextTier.stars) * 100, 100)}%`,
                }}/>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
              {totalStars}/{nextTier.stars}
            </span>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: 'var(--gold)' }}>
            👑 Tout débloqué ! Tu es une légende !
          </div>
        )}
      </div>

      {/* ONGLETS */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'profil', label: '📊 Profil' },
          { id: 'recompenses', label: `🎁 Récompenses${unlocked.length > 0 ? ` (${unlocked.length})` : ''}` },
        ].map(tab => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, textAlign: 'center', padding: '14px 8px',
            fontSize: 13, fontWeight: 800, cursor: 'pointer',
            color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-muted)',
            borderBottom: activeTab === tab.id ? '3px solid var(--gold)' : '3px solid transparent',
            transition: 'all 0.15s',
          }}>{tab.label}</div>
        ))}
      </div>

      {/* ONGLET PROFIL */}
      {activeTab === 'profil' && (
        <div style={{ padding: '16px 24px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 }}>Route des niveaux</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
            {LEVEL_ICONS.map((icon, i) => {
              const lv = i + 1
              const isReached = level > lv
              const isCurrent = level === lv
              const col = LEVEL_COLORS[i]
              return (
                <div key={lv} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ textAlign: 'center', opacity: isReached || isCurrent ? 1 : 0.3 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%', margin: '0 auto 4px',
                      background: isReached ? col : isCurrent ? `${col}33` : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${isReached || isCurrent ? col : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      boxShadow: isCurrent ? `0 0 14px ${col}88` : 'none',
                    }}>{isReached ? '✓' : icon}</div>
                    <div style={{ fontSize: 8, fontWeight: 800, color: isCurrent ? col : 'var(--text-hint)', whiteSpace: 'nowrap' }}>
                      {LEVEL_NAMES[i].split(' ')[0]}
                    </div>
                  </div>
                  {i < 6 && <div style={{ width: 18, height: 3, borderRadius: 2, flexShrink: 0, marginBottom: 14, background: level > lv ? LEVEL_COLORS[i] : 'rgba(255,255,255,0.07)' }}/>}
                </div>
              )
            })}
          </div>

          {sessions.length > 0 && (
            <>
              <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Dernières parties</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {sessions.map(s => (
                  <div key={s.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.gameEmoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>{s.gameTitle}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                        {new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} • {s.score}/{s.total}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12 }}>{[1,2,3].map(i=><span key={i} style={{ opacity: i <= s.stars ? 1 : 0.2 }}>⭐</span>)}</div>
                      <div style={{ width: 50, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, marginTop: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, background: s.pct >= 70 ? '#22C55E' : s.pct >= 40 ? '#F97316' : '#EF4444', width: `${s.pct}%` }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <button className="btn btn-ghost" onClick={onSwitch} style={{ width: '100%' }}>🔄 Changer de joueur</button>
        </div>
      )}

      {/* ONGLET RÉCOMPENSES */}
      {activeTab === 'recompenses' && (
        <div style={{ padding: '16px 24px' }}>
          {unlocked.length > 0 && (
            <>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#22C55E', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 }}>✅ Débloquées ({unlocked.length})</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
                {unlocked.map(r => (
                  <div key={r.id} onClick={() => setSelected(r)}
                    style={{
                      background: 'linear-gradient(135deg, #1A1030, #2D1F50)',
                      border: '2px solid rgba(255,215,61,0.3)',
                      borderRadius: 18, padding: '16px 12px', textAlign: 'center',
                      cursor: 'pointer', transition: 'transform 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ fontSize: 38, marginBottom: 6 }}>{r.emoji}</div>
                    <div style={{ fontSize: 12, fontWeight: 900, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.3 }}>{r.desc}</div>
                    <div style={{
                      fontSize: 10, padding: '4px 10px', borderRadius: 20, fontWeight: 800, display: 'inline-block',
                      background: r.type === 'drawing' ? 'rgba(100,180,255,0.15)' : r.type === 'diploma' ? 'rgba(255,215,61,0.15)' : 'rgba(80,220,140,0.15)',
                      color: r.type === 'drawing' ? '#64B4FF' : r.type === 'diploma' ? 'var(--gold)' : '#50DC8C',
                    }}>
                      {r.type === 'drawing' ? '🖌️ Voir' : r.type === 'diploma' ? '🎓 Voir' : '✂️ Voir'}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {unlocked.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎁</div>
              <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Tes récompenses t'attendent !</p>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                Gagne <strong style={{ color: 'var(--gold)' }}>5 étoiles</strong> pour débloquer ton premier coloriage 🖌️
              </p>
            </div>
          )}

          {locked.length > 0 && (
            <>
              <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 }}>🔒 À débloquer ({locked.length})</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {locked.map(r => (
                  <div key={r.id} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 18, padding: '14px 12px', textAlign: 'center', opacity: 0.5,
                  }}>
                    <div style={{ fontSize: 34, marginBottom: 5, filter: 'grayscale(1)' }}>{r.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 900, marginBottom: 3 }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{r.desc}</div>
                    <div style={{
                      fontSize: 11, padding: '4px 12px', borderRadius: 20, fontWeight: 800,
                      display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)',
                    }}>🔒 {r.cost} ⭐</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}