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
      'Twitter Spaces',
    ],
  },
  {
    number: 2,
    status: 'active',
    trigger: '$250K MCAP',
    title: 'Visibility',
    items: [
      'Introduction to list on Jupiter — Expanding our reach and liquidity.',
      'CoinGecko & CoinMarketCap — So we can track our progress and get recognized by more investors.',
      'Phantom — Increasing accessibility and exposure for Diamond Hand Doge holders.',
    ],
  },
  {
    number: 3,
    status: 'locked',
    trigger: '$1M MCAP',
    title: 'First Burn',
    items: [
      '🔥 5% Token Burn — executed from verified on-chain wallet',
      'BitMart listing',
      'MEXC listing',
      'XT.com listing',
      'LBank listing',
    ],
    note: 'Once we hit the $1 million market cap, we\'re taking things to the next level! At this stage, we\'ll start getting listed on some smaller, but powerful centralized exchanges.',
  },
  {
    number: 4,
    status: 'locked',
    trigger: '$5M–$10M MCAP',
    title: 'Major Exchanges',
    items: [
      'Gate.io listing',
      'KuCoin listing',
    ],
    note: 'This is where things get serious. These are major stepping stones that will give Diamond Hand Doge the credibility and reach it deserves.',
  },
  {
    number: 5,
    status: 'locked',
    trigger: '$10M → $100M MCAP',
    title: 'Moon Mission',
    items: [
      '🔥 Second Burn — 10% of tokens at $10M MCAP',
      '🔥 Third Burn — 15% of tokens at $100M MCAP',
      '🎯 Ultimate Goal: Binance Listing',
    ],
    note: 'Once we break past the $10 million market cap, we will set our sights on the BIGGEST goal of all: getting listed on Binance.',
  },
]

const STATUS_CONFIG: Record<PhaseStatus, { label: string; color: string; glow: string; bg: string; icon: string }> = {
  complete: {
    label: 'Completed',
    color: '#00AAFF',
    glow: 'rgba(0,170,255,0.35)',
    bg: 'rgba(0,170,255,0.08)',
    icon: '✓',
  },
  active: {
    label: 'In Progress',
    color: '#FFB800',
    glow: 'rgba(255,184,0,0.4)',
    bg: 'rgba(255,184,0,0.08)',
    icon: '◉',
  },
  locked: {
    label: 'Upcoming',
    color: 'var(--text-secondary)',
    glow: 'rgba(136,146,176,0.1)',
    bg: 'rgba(136,146,176,0.04)',
    icon: '🔒',
  },
}

export default function RoadmapPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px 72px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link href="/#cave" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-display)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--text-secondary)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
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
            fontSize: 'clamp(40px, 7vw, 80px)',
            background: 'linear-gradient(135deg, #00D4FF 0%, #88EEFF 50%, #0099CC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
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
      <section style={{ padding: '0 24px 100px', maxWidth: '860px', margin: '0 auto', position: 'relative' }}>

        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: 0, bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, var(--accent-cyan), rgba(0,212,255,0.1) 80%, transparent)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {phases.map((phase, i) => {
            const cfg = STATUS_CONFIG[phase.status]
            return (
              <motion.div key={phase.number} {...fadeUp(i * 0.1)} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

                {/* Node */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '28px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: cfg.bg,
                    border: `2px solid ${cfg.color}`,
                    boxShadow: `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: '14px',
                    fontWeight: 900, color: cfg.color,
                    position: 'relative', zIndex: 1,
                  }}>
                    {phase.status === 'complete' ? '✓' : phase.number}
                  </div>
                </div>

                {/* Card */}
                <div style={{
                  flex: 1,
                  background: cfg.bg,
                  border: `1px solid ${phase.status === 'active' ? cfg.color : 'var(--border-subtle)'}`,
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: phase.status === 'active' ? `0 0 40px ${cfg.glow}` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}>
                  {phase.status === 'active' && (
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      padding: '4px 14px',
                      background: cfg.color,
                      borderRadius: '0 16px 0 8px',
                      fontFamily: 'var(--font-display)', fontSize: '9px',
                      fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: '#05081A',
                    }}>
                      Current
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
                          lineHeight: 1.6, color: phase.status === 'locked' ? 'var(--text-secondary)' : 'var(--text-primary)',
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
      </section>
    </main>
  )
}
