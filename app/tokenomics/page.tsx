'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
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

function StatCard({ label, value, sub, accent = 'cyan' }: {
  label: string; value: string; sub?: string; accent?: 'cyan' | 'gold' | 'green'
}) {
  const colors = {
    cyan: { main: 'var(--accent-cyan)', glow: 'rgba(0,212,255,0.2)' },
    gold: { main: 'var(--accent-gold)', glow: 'rgba(255,184,0,0.2)' },
    green: { main: '#00AAFF', glow: 'rgba(0,170,255,0.2)' },
  }
  const c = colors[accent]
  return (
    <Card style={{
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${c.glow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 32px)',
        fontWeight: 900,
        color: c.main,
        textShadow: `0 0 20px ${c.glow}`,
        lineHeight: 1,
      }}>{value}</span>
      {sub && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>{sub}</span>
      )}
    </Card>
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
  const changeColor = priceChange >= 0 ? '#00AAFF' : '#FF4466'
  const changePrefix = priceChange >= 0 ? '+' : ''

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* Radial spotlight */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,184,0,0.08) 0%, transparent 70%)',
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
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-gold)',
          }}>
            💰 Live On-Chain Data
          </span>

          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 80px)',
            background: 'linear-gradient(135deg, #FFB800 0%, #FFE066 50%, #CC8800 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textShadow: 'none',
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
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          <StatCard
            label="Price (USD)"
            value={loading ? '—' : `$${parseFloat(pair?.priceUsd ?? '0').toFixed(7)}`}
            sub="Live from DEX Screener"
            accent="gold"
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
        </motion.div>
      </section>

      {/* ── Supply Breakdown ── */}
      <section style={{ padding: '0 24px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...fadeUp(0.15)}>
          <h2 style={{
            margin: '0 0 32px',
            fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}>
            Supply Distribution
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Circulating Supply', pct: 85, color: 'var(--accent-cyan)', desc: '849,911,104 DHD — in circulation' },
            { label: 'Burn Wallet #1 (5%)', pct: 5, color: '#FF7A00', desc: '50,000,000 DHD — locked until $1M MCAP' },
            { label: 'Burn Wallet #2 (10%)', pct: 10, color: '#FF4444', desc: '100,000,000 DHD — locked until $10M MCAP' },
            { label: 'Burn Wallet #3 (15%)', pct: 0, color: '#AA2222', desc: '0 DHD — not yet funded (triggers at $100M MCAP)' },
          ].map((row, i) => (
            <motion.div key={row.label} {...fadeUp(0.2 + i * 0.05)}>
              <Card style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '11px',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '14px',
                    fontWeight: 900, color: row.color,
                  }}>{row.pct}%</span>
                </div>
                <div style={{
                  width: '100%', height: '8px',
                  background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' as const }}
                    viewport={{ once: true }}
                    style={{
                      height: '100%', borderRadius: '4px',
                      background: row.color,
                      boxShadow: `0 0 10px ${row.color}88`,
                    }}
                  />
                </div>
                <p style={{
                  margin: '8px 0 0',
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}>{row.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Burn Wallets ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
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
            margin: '0 0 32px',
            fontFamily: 'var(--font-body)', fontSize: '15px',
            color: 'var(--text-secondary)',
          }}>
            Every burn is triggered by on-chain milestones and verified publicly on Solscan.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {BURN_WALLETS.map((w, i) => (
            <motion.div key={w.address} {...fadeUp(0.15 + i * 0.08)}>
              <Card style={{ padding: '24px 28px' }}>
                <div style={{
                  display: 'flex', flexWrap: 'wrap',
                  alignItems: 'center', justifyContent: 'space-between',
                  gap: '16px',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                    </div>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '12px',
                      color: 'var(--text-secondary)',
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
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.15)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
                  >
                    View on Solscan ↗
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Buy CTA ── */}
      <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
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
    </main>
  )
}
