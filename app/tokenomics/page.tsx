'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BURN_WALLETS, DEXSCREENER_API, LINKS } from '@/lib/constants'

interface DexPair {
  priceUsd: string
  fdv: number
  liquidity: { usd: number }
  volume: { h24: number }
  priceChange: { h24: number }
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

// ── Section Divider ──────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px',
      margin: '48px 0',
    }}>
      <div style={{ flex: 1, borderTop: '1px solid var(--border-subtle)' }} />
      <span style={{ fontSize: '14px', opacity: 0.6 }}>💎</span>
      <div style={{ flex: 1, borderTop: '1px solid var(--border-subtle)' }} />
    </div>
  )
}

// ── Stat Card ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent = 'cyan', isPrice = false }: {
  label: string; value: string; sub?: string; accent?: 'cyan' | 'gold' | 'green'; isPrice?: boolean
}) {
  const colors = {
    cyan: { main: 'var(--accent-cyan)', glow: 'rgba(0,212,255,0.2)' },
    gold: { main: 'var(--accent-gold)', glow: 'rgba(255,184,0,0.2)' },
    green: { main: 'var(--accent-green)', glow: 'rgba(0,255,136,0.2)' },
  }
  const c = colors[accent]
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 24px rgba(0,212,255,0.06)',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
      e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.15)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border-subtle)'
      e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.06)'
    }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${c.glow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
        }}>{label}</span>
        {isPrice && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span className="live-dot" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent-green)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '8px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--accent-green)',
            }}>LIVE</span>
          </span>
        )}
      </div>
      <span className={isPrice ? 'price-shimmer' : ''} style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 32px)',
        fontWeight: 900,
        color: isPrice ? undefined : c.main,
        textShadow: isPrice ? undefined : `0 0 20px ${c.glow}`,
        lineHeight: 1,
        position: 'relative',
      }}>{value}</span>
      {sub && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>{sub}</span>
      )}
    </div>
  )
}

export default function TokenomicsPage() {
  const [pair, setPair] = useState<DexPair | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(DEXSCREENER_API)
      .then(r => r.json())
      .then(d => { setPair(d.pair ?? d.pairs?.[0] ?? null) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const fmt = (n: number, prefix = '$') =>
    n >= 1_000_000
      ? `${prefix}${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
      ? `${prefix}${(n / 1_000).toFixed(1)}K`
      : `${prefix}${n.toFixed(2)}`

  const priceChange = pair?.priceChange?.h24 ?? 0
  const changePrefix = priceChange >= 0 ? '+' : ''

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
        padding: '80px 24px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        zIndex: 1,
      }}>
        {/* Radial spotlight */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {/* Back to Cave button */}
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
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-gold)',
          }}>
            💰 Live On-Chain Data
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
            TOKENOMICS
          </h1>

          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '520px',
          }}>
            Transparent. On-chain. Community-owned. Every number you see is pulled live from Solana.
          </p>
        </motion.div>
      </section>

      {/* ── Live Stats Grid ── */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.1)} className="stats-grid">
          <StatCard
            label="Price (USD)"
            value={loading ? '—' : `$${parseFloat(pair?.priceUsd ?? '0').toFixed(7)}`}
            sub="Live from DEX Screener"
            accent="gold"
            isPrice
          />
          <StatCard
            label="Market Cap / FDV"
            value={loading ? '—' : fmt(pair?.fdv ?? 0)}
            sub="Fully diluted valuation"
            accent="cyan"
          />
          <StatCard
            label="Liquidity (USD)"
            value={loading ? '—' : fmt(pair?.liquidity?.usd ?? 0)}
            sub="Raydium pool depth"
            accent="green"
          />
          <StatCard
            label="24h Volume"
            value={loading ? '—' : fmt(pair?.volume?.h24 ?? 0)}
            sub="Rolling 24-hour window"
            accent="cyan"
          />
          <StatCard
            label="24h Change"
            value={loading ? '—' : `${changePrefix}${priceChange.toFixed(2)}%`}
            sub="Price movement today"
            accent={priceChange >= 0 ? 'green' : 'cyan'}
          />
          <StatCard
            label="Total Supply"
            value="~1 Billion"
            sub="999,911,104 DHD"
            accent="gold"
          />
          <StatCard
            label="Circulating Supply"
            value="849,911,104 DHD"
            sub="70% of total supply"
            accent="cyan"
          />
        </motion.div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <SectionDivider />
      </div>

      {/* ── Burn Wallets ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.1)}>
          <h2 style={{
            margin: '0 0 8px',
            fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}>
            🔥 Burn Wallets
          </h2>
          <p style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-body)', fontSize: '15px',
            color: 'var(--text-secondary)',
          }}>
            Every burn is triggered by on-chain milestones and verified publicly on Solscan.
          </p>

          {/* ALL FUNDED callout banner */}
          <motion.div {...fadeUp(0.12)} style={{
            marginBottom: '32px',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(255,184,0,0.12), rgba(255,184,0,0.04))',
            border: '1px solid rgba(255,184,0,0.5)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 0 32px rgba(255,184,0,0.12)',
          }}>
            <span style={{ fontSize: '22px' }}>🔥</span>
            <div>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-display)', fontSize: '13px',
                fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--accent-gold)',
              }}>ALL BURN WALLETS FUNDED</p>
              <p style={{
                margin: '2px 0 0',
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'var(--text-secondary)',
              }}>All burn wallets are 100% funded and ready to execute. Burns trigger at on-chain MCAP milestones.</p>
            </div>
          </motion.div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {BURN_WALLETS.map((w, i) => (
            <motion.div key={w.address} {...fadeUp(0.15 + i * 0.08)}>
              <div style={{
                background: 'linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box, linear-gradient(180deg, #FF6600, #FFB800) border-box',
                border: '1px solid transparent',
                borderLeftWidth: '3px',
                borderRadius: '16px',
                padding: '24px 28px',
              }}>
                <div style={{
                  display: 'flex', flexWrap: 'wrap',
                  alignItems: 'center', justifyContent: 'space-between',
                  gap: '16px',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: '13px',
                        fontWeight: 700, color: 'var(--accent-gold)',
                      }}>{w.label}</span>
                      <span style={{
                        padding: '2px 10px',
                        background: 'rgba(255,184,0,0.1)',
                        border: '1px solid rgba(255,184,0,0.3)',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-display)', fontSize: '9px',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'var(--accent-gold)',
                      }}>{w.percent} of supply</span>
                      {/* READY TO BURN badge — fire gradient */}
                      <span style={{
                        padding: '2px 10px',
                        background: 'linear-gradient(135deg, rgba(255,100,0,0.2), rgba(255,184,0,0.2))',
                        border: '1px solid rgba(255,184,0,0.6)',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-display)', fontSize: '9px',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: '#FFD700',
                        boxShadow: '0 0 8px rgba(255,184,0,0.3)',
                      }}>✓ Ready to Burn</span>
                    </div>
                    {/* 100% funded progress bar */}
                    <div style={{
                      width: '100%', height: '6px',
                      background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden',
                      margin: '4px 0',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' as const }}
                        viewport={{ once: true }}
                        style={{
                          height: '100%', borderRadius: '3px',
                          background: 'linear-gradient(90deg, #FF6600, #FFB800, #FFE066)',
                          boxShadow: '0 0 10px rgba(255,184,0,0.5)',
                        }}
                      />
                    </div>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '11px',
                      color: 'var(--text-secondary)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{w.address}</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}>Triggers at: <span style={{ color: 'var(--accent-cyan)' }}>{w.trigger}</span></span>
                  </div>
                  <a
                    href={w.solscan}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '8px 18px',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid var(--border-active)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-display)', fontSize: '10px',
                      fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--accent-cyan)', textDecoration: 'none',
                      transition: 'background 0.2s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.15)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
                  >
                    View on Solscan ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <SectionDivider />
      </div>

      {/* ── Buy CTA ── */}
      <section style={{ padding: '0 24px 100px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(24px, 4vw, 40px)', color: 'var(--text-primary)',
          }}>Ready to hold?</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={LINKS.raydium}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '14px 36px',
                background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
                borderRadius: '8px', fontFamily: 'var(--font-display)',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#05081A',
                textDecoration: 'none', boxShadow: '0 0 28px rgba(0,212,255,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(0,212,255,0.65)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.4)' }}
            >
              Buy DHD on Raydium
            </a>
            <a
              href={LINKS.dexscreener}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '14px 36px',
                background: 'transparent',
                border: '1px solid var(--border-active)',
                borderRadius: '8px', fontFamily: 'var(--font-display)',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--accent-cyan)',
                textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              View on DEX Screener
            </a>
          </div>
        </motion.div>
      </section>

      <style>{`
        /* Stats grid: 4-col desktop / 2-col mobile */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* LIVE dot pulse */
        @keyframes livePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--accent-green); }
          50% { opacity: 0.4; box-shadow: 0 0 10px var(--accent-green); }
        }
        .live-dot { animation: livePulse 1s ease-in-out infinite; }

        /* Price shimmer — animate gradient background position */
        @keyframes priceShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .price-shimmer {
          background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan), var(--accent-gold));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: priceShimmer 3s ease infinite;
        }
      `}</style>
    </main>
  )
}
