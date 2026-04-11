'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

type PhaseStatus = 'complete' | 'active' | 'locked'

interface Phase {
  number: number
  status: PhaseStatus
  trigger: string
  title: string
  items: string[]
  note?: string
}

const phases: Phase[] = [
  {
    number: 1,
    status: 'complete',
    trigger: 'Completed',
    title: 'Foundation',
    items: [
      'Create Socials',
      'Team KYC',
      'Organic Community Growth',
      'DexTools Update',
      'Listing On Exchanges',
      'Community Spaces',
    ],
  },
  {
    number: 2,
    status: 'active',
    trigger: 'In Progress',
    title: 'Visibility',
    items: [
      'Jupiter Listing — Expand reach and improve liquidity by integrating with Jupiter, making trading more accessible',
      'Coin Tracking Platforms — Apply for listings on CoinGecko and CoinMarketCap to increase credibility, transparency, and investor awareness',
      'Wallet Integration — Enhance accessibility through Phantom Wallet, allowing seamless storage and trading for users',
      'Marketing Push — Launch targeted campaigns across X, Telegram, and crypto communities to drive consistent volume and attract new holders',
      'Community Growth — Strengthen and expand the DHD community through engagement, partnerships, and incentives for long-term holders',
    ],
  },
  {
    number: 3,
    status: 'locked',
    trigger: '$250K MCAP',
    title: 'First Burn',
    items: [
      '🔥 5% Token Burn — executed from verified on-chain wallet',
      'BitMart listing',
      'MEXC listing',
      'XT.com listing',
      'LBank listing',
    ],
    note: 'Once we hit $250K market cap, we execute the first burn and begin listing on centralized exchanges — giving Diamond Hand Doge the credibility and reach it deserves.',
  },
  {
    number: 4,
    status: 'locked',
    trigger: '$1M–$10M MCAP',
    title: 'Growth',
    items: [
      'Gate.io listing',
      'KuCoin listing',
      'Expanded partnerships and integrations',
      'Community governance initiatives',
    ],
    note: 'This is where things get serious. Major exchange listings that will take Diamond Hand Doge to the next level.',
  },
  {
    number: 5,
    status: 'locked',
    trigger: '$10M → $100M MCAP',
    title: 'Moon Mission',
    items: [
      '🔥 Second Burn — 10% of tokens at $10M MCAP',
      '🔥 Third Burn — 15% of tokens at $100M MCAP',
      '🎯 Binance Listing',
      '🎯 Coinbase Listing',
    ],
    note: 'Once we break past $10M market cap, we set our sights on the biggest goal of all: Binance and Coinbase listings.',
  },
]

const STATUS_CONFIG: Record<PhaseStatus, { label: string; color: string; glow: string; bg: string; borderColor: string }> = {
  complete: {
    label: 'Completed',
    color: 'var(--accent-green)',
    glow: 'rgba(0,255,136,0.3)',
    bg: 'rgba(0,255,136,0.04)',
    borderColor: 'var(--accent-green)',
  },
  active: {
    label: 'In Progress',
    color: 'var(--accent-gold)',
    glow: 'rgba(255,184,0,0.35)',
    bg: 'rgba(255,184,0,0.06)',
    borderColor: 'var(--accent-gold)',
  },
  locked: {
    label: 'Upcoming',
    color: 'var(--text-secondary)',
    glow: 'rgba(136,146,176,0.08)',
    bg: 'rgba(136,146,176,0.02)',
    borderColor: 'var(--border-subtle)',
  },
}

// ── Section Divider ──────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '48px 0' }}>
      <div style={{ flex: 1, borderTop: '1px solid var(--border-subtle)' }} />
      <span style={{ fontSize: '14px', opacity: 0.6 }}>💎</span>
      <div style={{ flex: 1, borderTop: '1px solid var(--border-subtle)' }} />
    </div>
  )
}

export default function RoadmapPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* ── Cave atmosphere layers ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse at bottom left, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse at bottom right, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse at top, rgba(255,180,50,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px 72px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link href="/cave" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--accent-gold)', textDecoration: 'none',
            padding: '8px 18px',
            background: 'rgba(255,184,0,0.08)',
            border: '1px solid rgba(255,184,0,0.4)',
            borderRadius: '20px',
            transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 12px rgba(255,184,0,0.15)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,184,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,184,0,0.7)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,184,0,0.35)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,184,0,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,184,0,0.4)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,184,0,0.15)' }}>
            ← Back to Cave
          </Link>

          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-cyan)',
          }}>
            🗺️ The Journey
          </span>

          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 80px)',
            letterSpacing: '0.05em',
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(240,244,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.3))',
            lineHeight: 1.05,
          }}>
            ROADMAP
          </h1>

          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '520px',
          }}>
            Every milestone unlocks the next chapter. Diamond hands wait. Diamond hands win.
          </p>

          {/* Status legend */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            {(Object.entries(STATUS_CONFIG) as [PhaseStatus, typeof STATUS_CONFIG[PhaseStatus]][]).map(([, cfg]) => (
              <div key={cfg.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: cfg.color, boxShadow: `0 0 8px ${cfg.glow}`,
                }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '0 24px 100px', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Vertical line — glowing gradient */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: 0, bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, var(--accent-green) 0%, var(--accent-cyan) 40%, var(--border-subtle) 70%)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {phases.map((phase, i) => {
            const cfg = STATUS_CONFIG[phase.status]
            const isLocked = phase.status === 'locked'
            const isActive = phase.status === 'active'
            const isComplete = phase.status === 'complete'

            return (
              <motion.div key={phase.number} {...fadeUp(i * 0.1)} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', opacity: isLocked ? 0.55 : 1 }}>

                {/* Node */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '28px' }}>
                  <div className={isActive ? 'node-pulse' : ''} style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: isComplete
                      ? 'var(--accent-green)'
                      : isActive
                      ? 'var(--accent-gold)'
                      : 'var(--bg-elevated)',
                    border: `2px solid ${cfg.color}`,
                    boxShadow: isLocked ? 'none' : `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: isLocked ? '16px' : '14px',
                    fontWeight: 900,
                    color: isComplete ? '#05081A' : isActive ? '#05081A' : 'var(--text-secondary)',
                    position: 'relative', zIndex: 1,
                  }}>
                    {isComplete ? '✓' : isLocked ? '🔒' : phase.number}
                  </div>
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: cfg.bg,
                  border: `1px solid ${isActive ? cfg.color : 'var(--border-subtle)'}`,
                  borderLeft: isComplete
                    ? `3px solid var(--accent-green)`
                    : isActive
                    ? `3px solid var(--accent-gold)`
                    : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isComplete
                    ? '-4px 0 20px rgba(0,255,136,0.2)'
                    : isActive
                    ? `0 0 40px ${cfg.glow}`
                    : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}>
                  {/* IN PROGRESS badge */}
                  {isActive && (
                    <div className="current-badge" style={{
                      position: 'absolute', top: 0, right: 0,
                      padding: '4px 14px',
                      background: 'var(--accent-gold)',
                      borderRadius: '0 16px 0 8px',
                      fontFamily: 'var(--font-display)', fontSize: '9px',
                      fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: '#05081A',
                    }}>
                      ● CURRENT
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '10px',
                      fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: cfg.color,
                    }}>
                      Phase {phase.number}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '10px',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                    }}>
                      {phase.trigger}
                    </span>
                  </div>

                  <h3 style={{
                    margin: '0 0 16px',
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2.5vw, 22px)',
                    fontWeight: 800, color: 'var(--text-primary)',
                  }}>
                    {phase.title}
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {phase.items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: cfg.color, flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>◆</span>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '14px',
                          lineHeight: 1.6, color: isLocked ? 'var(--text-secondary)' : 'var(--text-primary)',
                        }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {phase.note && (
                    <p style={{
                      margin: '16px 0 0',
                      fontFamily: 'var(--font-body)', fontSize: '13px',
                      lineHeight: 1.7, color: 'var(--text-secondary)',
                      borderLeft: `2px solid ${cfg.color}`,
                      paddingLeft: '14px',
                      fontStyle: 'italic',
                    }}>
                      {phase.note}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <SectionDivider />
      </section>

      <style>{`
        /* Active phase node pulsing ring */
        @keyframes nodeRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,184,0,0.5), 0 0 20px rgba(255,184,0,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(255,184,0,0), 0 0 40px rgba(255,184,0,0.5); }
        }
        .node-pulse { animation: nodeRing 2s ease-in-out infinite; }

        /* CURRENT badge pulse */
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        .current-badge { animation: badgePulse 2s ease-in-out infinite; }
      `}</style>
    </main>
  )
}
