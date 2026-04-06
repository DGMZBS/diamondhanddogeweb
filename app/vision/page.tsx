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

const visionCards = [
  {
    icon: '🏗️',
    accent: '#00D4FF',
    glow: 'rgba(0,212,255,0.25)',
    tag: 'Phase 1 — Foundation ✅',
    title: 'Community First',
    body: 'We built from the ground up — verified team, on-chain burn wallets, and a growing community before any exchange listing. Diamond Hand Doge is credible because we did the work first.',
    items: ['Team KYC verified', 'Socials live (X + Telegram)', 'DEX Tools & Screener updated', 'Burn wallets funded & on-chain'],
  },
  {
    icon: '📡',
    accent: '#FFB800',
    glow: 'rgba(255,184,0,0.25)',
    tag: 'Phase 2 — Visibility ⏳',
    title: 'Growth & Exposure',
    body: 'Now we scale. Jupiter listing, CoinGecko & CoinMarketCap tracking, Phantom wallet integration, and a full marketing push to get DHD in front of the right eyes.',
    items: ['Jupiter DEX listing', 'CoinGecko & CoinMarketCap', 'Phantom & Solflare integration', 'Influencer & community marketing push'],
  },
  {
    icon: '🎮',
    accent: '#AA66FF',
    glow: 'rgba(170,102,255,0.25)',
    tag: 'Phase 3 Vision',
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
        {/* Animated grid */}
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
          <Link href="/#cave" style={{
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
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '600px',
          }}>
            DHD has ambitions beyond the meme. What starts as a coin becomes a community.
            What starts as a community becomes an ecosystem.
          </p>
        </motion.div>
      </section>

      {/* ── Vision Cards ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
          gap: '24px',
        }}>
          {visionCards.map((card, i) => (
            <motion.div key={card.title} {...fadeUp(i * 0.12)}>
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
                {/* Corner glow */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '200px', height: '200px',
                  background: `radial-gradient(circle at top left, ${card.glow}, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Tag */}
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

                {/* Icon + Title */}
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

                {/* Body */}
                <p style={{
                  margin: '0 0 24px',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  lineHeight: 1.8, color: 'var(--text-secondary)',
                }}>{card.body}</p>

                {/* Feature list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {card.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                        background: card.accent,
                        boxShadow: `0 0 8px ${card.accent}`,
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '13px',
                        color: 'var(--text-primary)',
                      }}>{item}</span>
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
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
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
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
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
    </main>
  )
}
