'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LINKS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

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

// ── Shared card shell with accent left border ────────────────────────
function SocialCard({ children, glowColor = 'rgba(0,212,255,0.06)', accentBorder }: {
  children: React.ReactNode
  glowColor?: string
  accentBorder: string
}) {
  return (
    <div style={{
      background: 'linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box, linear-gradient(180deg, ' + accentBorder + ', ' + accentBorder + '88) border-box',
      border: '1px solid transparent',
      borderLeftWidth: '3px',
      borderRadius: '16px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `inset 3px 0 20px ${accentBorder}18`,
      transition: 'box-shadow 0.3s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = `inset 3px 0 30px ${accentBorder}30, 0 0 30px ${accentBorder}12`)}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = `inset 3px 0 20px ${accentBorder}18`)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${glowColor}, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  )
}

function CardHeader({ icon, title, subtitle, accentColor }: {
  icon: string; title: string; subtitle: string; accentColor: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative' }}>
      <div style={{
        width: '48px', height: '48px', flexShrink: 0,
        borderRadius: '12px',
        background: `${accentColor}18`,
        border: `1px solid ${accentColor}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
      }}>{icon}</div>
      <div>
        <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, letterSpacing: '0.04em', color: accentColor }}>{title}</h3>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtitle}</p>
      </div>
    </div>
  )
}

function CtaButton({ href, label, color = 'var(--accent-cyan)', filled = false }: {
  href: string; label: string; color?: string; filled?: boolean
}) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 28px', minHeight: '48px',
        background: filled ? color : 'transparent',
        border: filled ? 'none' : `1px solid ${color}`,
        borderRadius: '8px',
        fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: filled ? '#05081A' : color,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        alignSelf: 'flex-start',
        boxShadow: filled ? `0 0 20px ${color}66` : 'none',
        position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {label}
    </a>
  )
}

function StatPill({ label }: { label: string }) {
  return (
    <span style={{
      padding: '5px 12px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '20px',
      fontFamily: 'var(--font-display)',
      fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--text-secondary)', whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

// ── Cards ────────────────────────────────────────────────────────────
function TelegramCard() {
  return (
    <SocialCard glowColor="rgba(0,136,204,0.06)" accentBorder="#0088CC">
      <CardHeader icon="✈️" title="DHD Telegram Community" subtitle="Join the conversation. Live updates, community calls, and more." accentColor="#0088CC" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['📢 Announcements', '💬 Community Chat', '🚀 Launch Updates'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        The official DHD Telegram is where the community lives. Get live price alerts, join discussions, and be the first to hear about new partnerships and exchange listings.
      </p>
      <CtaButton href={LINKS.telegram} label="Join on Telegram →" color="#0088CC" />
    </SocialCard>
  )
}

function RaydiumCard() {
  return (
    <SocialCard glowColor="rgba(153,69,255,0.05)" accentBorder="#9945FF">
      <CardHeader icon="⚡" title="Trade DHD on Raydium" subtitle="Buy and sell DHD directly on Raydium DEX." accentColor="#9945FF" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['◎ Solana Network', '💸 Low Fees', '⚡ Instant Settlement'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        The fastest way to buy DHD. Connect your Phantom or Solflare wallet and swap SOL for DHD in seconds — no sign-up required.
      </p>
      <CtaButton href={LINKS.raydium} label="Trade on Raydium →" color="#9945FF" filled />
    </SocialCard>
  )
}

function DexToolsCard() {
  return (
    <SocialCard glowColor="rgba(255,184,0,0.04)" accentBorder="var(--accent-gold)">
      <CardHeader icon="🔧" title="DHD on DEX Tools" subtitle="Advanced charts and token analytics." accentColor="var(--accent-gold)" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['📈 Price Charts', '👥 Holder Data', '🔍 On-Chain Analytics'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        Track DHD&apos;s price action, holder distribution, and on-chain analytics. DEX Tools gives you the full picture on every trade.
      </p>
      <CtaButton href={LINKS.dextools} label="Open DEX Tools →" color="var(--accent-gold)" />
    </SocialCard>
  )
}

function DexScreenerCard() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <SocialCard glowColor="rgba(0,212,255,0.04)" accentBorder="var(--accent-green)">
      <CardHeader icon="📊" title="DHD on DEX Screener" subtitle="Live price, volume, and trading activity." accentColor="var(--accent-green)" />
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#0d1117', position: 'relative' }}>
        {/* Loading skeleton */}
        {!iframeLoaded && (
          <div className="iframe-skeleton" style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'var(--bg-elevated)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', opacity: 0.5 }}>Loading chart...</span>
          </div>
        )}
        <iframe
          src="https://dexscreener.com/solana/3UG4RvNMV9idmR9FpaEXz6ov9A9DkczDGuxMbGyFWFH2?embed=1&theme=dark&trades=1&info=0"
          title="DHD Live Chart"
          style={{ display: 'block', width: '100%', height: '420px', border: 'none' }}
          allow="clipboard-write"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
      <CtaButton href={LINKS.dexscreener} label="View Full Chart →" color="var(--accent-green)" />
    </SocialCard>
  )
}

// ── Page ─────────────────────────────────────────────────────────────
export default function SocialsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* ── Cave atmosphere layers ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse at bottom left, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse at bottom right, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse at top, rgba(255,180,50,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '80px 24px 60px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        zIndex: 1,
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

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
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>
            🌐 Find Us Everywhere
          </span>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 80px)',
            letterSpacing: '0.05em',
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(240,244,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.3))',
            lineHeight: 1.05,
          }}>
            COMMUNITY
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '480px' }}>
            Find us everywhere. Join the pack.
          </p>
        </motion.div>
      </section>

      {/* Cards */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}>

        {/* Row 1: Telegram full-width */}
        <motion.div {...fadeUp(0)}><TelegramCard /></motion.div>

        <SectionDivider />

        {/* Row 2: DEX Screener full-width */}
        <motion.div {...fadeUp(0.15)}><DexScreenerCard /></motion.div>

        <SectionDivider />

        {/* Row 3: Raydium + DEX Tools */}
        <div className="socials-row">
          <motion.div {...fadeUp(0.2)} style={{ flex: 1, minWidth: 0 }}><RaydiumCard /></motion.div>
          <motion.div {...fadeUp(0.25)} style={{ flex: 1, minWidth: 0 }}><DexToolsCard /></motion.div>
        </div>
      </section>

      <style>{`
        .socials-row { display: flex; flex-direction: row; gap: 24px; align-items: stretch; }
        @media (max-width: 767px) { .socials-row { flex-direction: column; } }

        /* Pulsing skeleton animation */
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        .iframe-skeleton { animation: skeletonPulse 1.5s ease-in-out infinite; }
      `}</style>
    </main>
  )
}
