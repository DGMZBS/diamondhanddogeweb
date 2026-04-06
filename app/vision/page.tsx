'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LINKS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

// ── Existing small vision cards ────────────────────────────────────────
const visionCards = [
  {
    icon: '🏦',
    accent: '#00D4FF',
    glow: 'rgba(0,212,255,0.25)',
    tag: 'Future Vision',
    title: 'DHD Banking System',
    body: 'A community-first financial layer built on Solana. Peer-to-peer transfers, yield on held DHD, and a digital wallet experience that rewards diamond hands — not banks.',
    items: ['P2P DHD transfers', 'Holder yield mechanics', 'Non-custodial wallet integration'],
  },
  {
    icon: '📈',
    accent: '#FFB800',
    glow: 'rgba(255,184,0,0.25)',
    tag: 'Future Vision',
    title: 'DHD Investment Platform',
    body: 'Tools built for the community to grow together. Track holdings, set milestones, and access exclusive opportunities — all denominated in DHD.',
    items: ['Portfolio tracking dashboard', 'Milestone-based holder tiers', 'Community-voted investment pools'],
  },
  {
    icon: '🎮',
    accent: '#AA66FF',
    glow: 'rgba(170,102,255,0.25)',
    tag: 'Future Vision',
    title: 'DHD Gaming Currency',
    body: 'Spend DHD inside games. Win DHD for completing challenges. The meme becomes the economy — a native in-game token with real on-chain value.',
    items: ['In-game DHD spending layer', 'Play-to-earn reward loops', 'Community game partnerships'],
  },
  {
    icon: '💎',
    accent: '#00AAFF',
    glow: 'rgba(0,170,255,0.25)',
    tag: 'Core Mission',
    title: 'Holder Rewards',
    body: 'Long-term holders are the backbone of DHD. The longer you hold, the more you earn. Verified burns at every milestone reduce supply and increase the value of every diamond hand.',
    items: ['Milestone-triggered token burns', 'Verified on-chain burn wallets', 'Reward tiers for long-term holders'],
  },
]

export default function VisionPage() {
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
          backgroundImage: 'linear-gradient(rgba(170,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(170,102,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '1000px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(170,102,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link href="/cave" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-display)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            ← Back to Cave
          </Link>

          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AA66FF',
          }}>
            🚀 Beyond the Meme
          </span>

          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 80px)',
            background: 'linear-gradient(135deg, #AA66FF 0%, #DD99FF 40%, #7733CC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.05,
          }}>
            VISION
          </h1>

          <p style={{
            margin: 0, fontFamily: 'var(--font-display)', fontSize: '20px',
            fontWeight: 500, color: 'var(--accent-gold)', letterSpacing: '0.02em',
          }}>
            Two features no other meme coin has built. Ever.
          </p>

          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '600px',
          }}>
            DHD has ambitions beyond the meme. What starts as a coin becomes a community.
            What starts as a community becomes an ecosystem.
          </p>
        </motion.div>
      </section>

      {/* ── CARD 1: DHD Tools — Dual Growth Engine (full-width) ── */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '24px',
            padding: 'clamp(32px, 4vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(255,184,0,0.15)',
          }}>
            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '400px', height: '400px',
              background: 'radial-gradient(circle at top left, rgba(255,184,0,0.08), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px',
              background: 'radial-gradient(circle at bottom right, rgba(255,184,0,0.05), transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* EXCLUSIVE badge — top right */}
            <div style={{
              position: 'absolute', top: '24px', right: '24px',
              padding: '5px 14px',
              background: 'var(--accent-gold)',
              borderRadius: '20px',
              fontFamily: 'var(--font-display)', fontSize: '9px',
              fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#05081A',
              boxShadow: '0 0 16px rgba(255,184,0,0.5)',
            }}>
              🔥 Exclusive Innovation
            </div>

            {/* Header */}
            <div style={{ position: 'relative', zIndex: 1, marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '12px', flexWrap: 'wrap', paddingRight: '160px' }}>
                <span style={{ fontSize: '52px', lineHeight: 1, filter: 'drop-shadow(0 0 20px rgba(255,184,0,0.6))' }}>🛠️</span>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(22px, 3.5vw, 36px)',
                    color: 'var(--accent-gold)',
                    textShadow: '0 0 30px rgba(255,184,0,0.4)',
                    lineHeight: 1.1,
                  }}>DHD Tools — Dual Growth Engine</h2>
                  <p style={{
                    margin: '8px 0 0',
                    fontFamily: 'var(--font-body)', fontSize: '16px',
                    color: 'var(--text-secondary)', lineHeight: 1.5,
                  }}>
                    Fuel your token while strengthening the DHD ecosystem.
                  </p>
                </div>
              </div>
              <p style={{
                margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px',
                lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '860px',
              }}>
                DHD Tools introduces a unique system where projects can deploy volume and market-making strategies through DHD itself, creating aligned growth between your token and the DHD community.
              </p>
            </div>

            {/* Three feature blocks */}
            <div className="dhd-tools-blocks">

              {/* Block 1 — Core Infrastructure */}
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(255,184,0,0.2)',
                borderRadius: '16px',
                padding: '28px',
              }}>
                <h3 style={{
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-display)', fontSize: '13px',
                  fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                }}>⚙️ Core Infrastructure</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { title: 'DHD Volume Engine', desc: 'Automated volume system powered through DHD for consistent activity' },
                    { title: 'DHD Market Maker Bot', desc: 'Maintains liquidity, tighter spreads, and smoother price action' },
                    { title: 'Auto Buy Pressure System', desc: 'SOL → DHD → Token conversion creating constant demand for DHD' },
                  ].map(item => (
                    <div key={item.title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '7px',
                        background: 'var(--accent-gold)', boxShadow: '0 0 8px rgba(255,184,0,0.6)',
                      }} />
                      <div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>{item.title}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}> — {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 2 — Smart Execution Tools */}
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(255,184,0,0.2)',
                borderRadius: '16px',
                padding: '28px',
              }}>
                <h3 style={{
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-display)', fontSize: '13px',
                  fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                }}>🔹 Smart Execution Tools</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { title: 'Swap Router (DHD Bridge)', desc: 'Converts SOL into DHD, then into target tokens seamlessly' },
                    { title: 'Smart Order Execution', desc: 'Randomized trade sizes, timing, and routing for realistic behavior' },
                    { title: 'Multi-Wallet Distribution System', desc: 'Spreads activity across wallets for organic-looking volume' },
                  ].map(item => (
                    <div key={item.title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '7px',
                        background: 'var(--accent-gold)', boxShadow: '0 0 8px rgba(255,184,0,0.6)',
                      }} />
                      <div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>{item.title}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}> — {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 3 — How It Works */}
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(255,184,0,0.2)',
                borderRadius: '16px',
                padding: '28px',
              }}>
                <h3 style={{
                  margin: '0 0 20px',
                  fontFamily: 'var(--font-display)', fontSize: '13px',
                  fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                }}>🔹 How It Works</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { n: '1', title: 'SOL → DHD Conversion Layer', desc: 'Users deposit SOL, which is automatically used to buy DHD from the open market' },
                    { n: '2', title: 'DHD → Target Token Execution', desc: 'The acquired DHD is strategically converted into your token, initiating volume and trading activity' },
                    { n: '3', title: 'Automated Volume Activation', desc: 'The DHD-powered system begins generating consistent, realistic trading activity using smart execution logic' },
                  ].map((step, i) => (
                    <div key={step.n}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                          background: 'rgba(255,184,0,0.15)',
                          border: '1px solid rgba(255,184,0,0.4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 900,
                          color: 'var(--accent-gold)',
                        }}>{step.n}</div>
                        <div style={{ paddingTop: '4px' }}>
                          <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>{step.title}</p>
                          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
                        </div>
                      </div>
                      {i < 2 && (
                        <div style={{
                          marginLeft: '16px', width: '0', height: '16px',
                          borderLeft: '2px dashed rgba(255,184,0,0.3)',
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why This Is Powerful */}
            <div style={{
              marginTop: '28px',
              padding: '24px 28px',
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: '14px',
            }}>
              <h3 style={{
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)', fontSize: '12px',
                fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--accent-cyan)',
              }}>Why This Is Powerful</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '🔥', text: 'Constant Buy Pressure on DHD — Every project using the tools contributes to ongoing demand for DHD' },
                  { icon: '🌱', text: 'Aligned Ecosystem Growth — Your token grows while simultaneously expanding the DHD holder base and volume' },
                  { icon: '🔄', text: 'Sustainable Expansion Model — Growth is interconnected — not isolated — creating a stronger, more resilient ecosystem' },
                ].map(item => (
                  <div key={item.icon} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Built with Integrity */}
            <div style={{
              marginTop: '16px',
              padding: '24px 28px',
              background: 'rgba(255,184,0,0.04)',
              border: '1px solid rgba(255,184,0,0.25)',
              borderRadius: '14px',
            }}>
              <h3 style={{
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)', fontSize: '12px',
                fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--accent-gold)',
              }}>Built with Integrity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Only verified, long-term projects can access these tools',
                  'Strict no pump-and-dump policy',
                  'Focus on real volume behavior and market stability',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                      background: 'var(--accent-gold)', boxShadow: '0 0 6px rgba(255,184,0,0.5)',
                    }} />
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision quote */}
            <div style={{
              marginTop: '28px',
              padding: '24px 32px',
              borderLeft: '3px solid var(--accent-gold)',
              background: 'rgba(255,184,0,0.03)',
            }}>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.8vw, 17px)',
                fontWeight: 600, fontStyle: 'italic',
                color: 'var(--accent-gold)',
                lineHeight: 1.7,
                letterSpacing: '0.02em',
              }}>
                &ldquo;A system where every new project strengthens DHD. Every transaction contributes to ecosystem growth. DHD becomes the core liquidity and execution layer for emerging tokens.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CARD 2: DHD App (full-width) ── */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-cyan)',
            borderRadius: '24px',
            padding: 'clamp(32px, 4vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(0,212,255,0.1)',
          }}>
            {/* Corner glows */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '400px', height: '400px',
              background: 'radial-gradient(circle at top left, rgba(0,212,255,0.06), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px',
              background: 'radial-gradient(circle at bottom right, rgba(0,212,255,0.04), transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* EXCLUSIVE badge — top right */}
            <div style={{
              position: 'absolute', top: '24px', right: '24px',
              padding: '5px 14px',
              background: 'var(--accent-cyan)',
              borderRadius: '20px',
              fontFamily: 'var(--font-display)', fontSize: '9px',
              fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#05081A',
              boxShadow: '0 0 16px rgba(0,212,255,0.4)',
            }}>
              💎 Exclusive Innovation
            </div>

            {/* Header */}
            <div style={{ position: 'relative', zIndex: 1, marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '12px', flexWrap: 'wrap', paddingRight: '160px' }}>
                <span style={{ fontSize: '52px', lineHeight: 1, filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))' }}>📱</span>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(22px, 3.5vw, 36px)',
                    color: 'var(--accent-cyan)',
                    textShadow: '0 0 30px rgba(0,212,255,0.3)',
                    lineHeight: 1.1,
                  }}>The DHD App</h2>
                  <p style={{
                    margin: '8px 0 0',
                    fontFamily: 'var(--font-body)', fontSize: '16px',
                    color: 'var(--text-secondary)', lineHeight: 1.5,
                  }}>
                    DHD-powered investing, swapping, and discovery — all in one place.
                  </p>
                </div>
              </div>
              <p style={{
                margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px',
                lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '860px',
              }}>
                The DHD App transforms Diamond Hand Doge from a meme coin into a functional financial layer. Users can seamlessly use DHD to access, discover, and invest in other verified meme coins — all within one platform.
              </p>
            </div>

            {/* 5 feature cards — 2-col grid, last card centered */}
            <div className="dhd-app-grid">
              {[
                { icon: '⚡', title: 'DHD-Powered Swaps', desc: 'Instantly convert DHD into top meme coins across the market without leaving the app.' },
                { icon: '📊', title: 'Smart Market Insights', desc: 'Track real-time trends, sentiment, and volume across trending tokens to make smarter decisions.' },
                { icon: '👁️', title: 'Follow Top Traders', desc: 'View and follow high-performing wallets. Mirror strategies and buy based on proven moves.' },
                { icon: '🧠', title: 'Community Sentiment Engine', desc: 'See what the DHD community is buying, holding, and watching — powered by collective data.' },
                { icon: '✅', title: 'Verified Projects Only', desc: 'Access a curated list of vetted tokens that align with strong communities and transparency.' },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={i === 4 ? 'dhd-app-card dhd-app-card-last' : 'dhd-app-card'}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-active)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px', lineHeight: 1 }}>{card.icon}</div>
                  <h3 style={{
                    margin: '0 0 8px',
                    fontFamily: 'var(--font-display)', fontSize: '14px',
                    fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em',
                  }}>{card.title}</h3>
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: 'var(--text-secondary)', lineHeight: 1.6,
                  }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Existing vision cards (3–6) in 2-col grid ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="vision-cards-grid">
          {visionCards.map((card, i) => (
            <motion.div key={card.title} {...fadeUp(i * 0.1)}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: `1px solid ${card.accent}22`,
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${card.accent}66`
                e.currentTarget.style.boxShadow = `0 0 60px ${card.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${card.accent}22`
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '200px', height: '200px',
                  background: `radial-gradient(circle at top left, ${card.glow}, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: `${card.accent}18`,
                  border: `1px solid ${card.accent}44`,
                  borderRadius: '20px',
                  fontFamily: 'var(--font-display)', fontSize: '9px',
                  fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: card.accent,
                  marginBottom: '20px',
                }}>
                  {card.tag}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '44px', lineHeight: 1,
                    filter: `drop-shadow(0 0 16px ${card.accent})`,
                  }}>{card.icon}</span>
                  <h3 style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 24px)',
                    fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2,
                  }}>{card.title}</h3>
                </div>

                <p style={{
                  margin: '0 0 24px',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  lineHeight: 1.8, color: 'var(--text-secondary)',
                }}>{card.body}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {card.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                        background: card.accent, boxShadow: `0 0 8px ${card.accent}`,
                      }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...fadeUp(0.1)} style={{
          padding: '48px 40px',
          background: 'var(--bg-secondary)',
          border: '1px solid rgba(41,182,246,0.3)',
          borderRadius: '20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          boxShadow: '0 0 60px rgba(41,182,246,0.08)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '400px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(41,182,246,0.06), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <span style={{ fontSize: '40px' }}>✈️</span>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(22px, 3.5vw, 32px)', color: 'var(--text-primary)',
          }}>
            Join the Community
          </h2>
          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '440px',
          }}>
            The DHD Telegram is where the community lives. Get live updates, be first to know about exchange listings, and connect with diamond hands worldwide.
          </p>
          <a
            href={LINKS.telegram}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', padding: '14px 40px',
              background: 'linear-gradient(135deg, #29B6F6, #0288D1)',
              borderRadius: '8px', fontFamily: 'var(--font-display)',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#05081A',
              textDecoration: 'none', boxShadow: '0 0 28px rgba(41,182,246,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative', zIndex: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(41,182,246,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(41,182,246,0.4)' }}
          >
            Join Telegram →
          </a>
        </motion.div>
      </section>

      {/* ── Tagline Banner ── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px 100px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(170,102,255,0.04), transparent)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: 'var(--text-primary)',
            textShadow: '0 0 40px rgba(170,102,255,0.3)',
            lineHeight: 1.1,
          }}>
            Hold Strong. Mine Deep.<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFB800, #FFE066)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Win Big.</span>
          </h2>

          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '16px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '480px',
          }}>
            This isn&apos;t just a coin — it&apos;s a movement. Built by the community, for the community.
            Every holder matters. Every diamond hand counts.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={LINKS.raydium}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '14px 36px',
                background: 'linear-gradient(135deg, #AA66FF, #7733CC)',
                borderRadius: '8px', fontFamily: 'var(--font-display)',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#fff',
                textDecoration: 'none', boxShadow: '0 0 28px rgba(170,102,255,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(170,102,255,0.65)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(170,102,255,0.4)' }}
            >
              Join the Movement
            </a>
            <a
              href={LINKS.telegram}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '14px 36px',
                background: 'transparent',
                border: '1px solid rgba(170,102,255,0.5)',
                borderRadius: '8px', fontFamily: 'var(--font-display)',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#AA66FF',
                textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(170,102,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Join Telegram
            </a>
          </div>
        </motion.div>
      </section>

      <style>{`
        .dhd-tools-blocks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 0;
        }
        .dhd-app-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .dhd-app-card-last {
          grid-column: 1 / -1;
          max-width: 50%;
          margin: 0 auto;
          width: 100%;
        }
        .vision-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .dhd-tools-blocks {
            grid-template-columns: 1fr;
          }
          .dhd-app-card-last {
            grid-column: auto;
            max-width: 100%;
          }
        }
        @media (max-width: 767px) {
          .dhd-app-grid {
            grid-template-columns: 1fr;
          }
          .dhd-app-card-last {
            grid-column: auto;
            max-width: 100%;
          }
          .vision-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
