'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LINKS } from '@/lib/constants'
import Card from '@/components/ui/Card'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

// ── Shared primitives ────────────────────────────────────────────────
function SocialCard({ children, glowColor = 'rgba(0,212,255,0.06)' }: {
  children: React.ReactNode
  glowColor?: string
}) {
  return (
    <Card style={{
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at top left, ${glowColor}, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      {children}
    </Card>
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
      fontSize: '9px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

// ── Cards ────────────────────────────────────────────────────────────
function TwitterCard() {
  return (
    <SocialCard glowColor="rgba(255,255,255,0.04)">
      <CardHeader icon="𝕏" title="Diamond Hand Doge on X" subtitle="Follow @dogehanddiamond for real-time updates, memes, and milestones." accentColor="var(--text-primary)" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['💎 Price Updates', '🔥 Burn Alerts', '🚀 Milestones', '😂 Memes'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        Stay up to date with every DHD milestone, burn event, and community update. Our X account is the fastest way to know what&apos;s happening in the DHD ecosystem.
      </p>
      <CtaButton href={LINKS.twitter} label="Follow on X →" color="var(--text-primary)" />
    </SocialCard>
  )
}

function TelegramCard() {
  return (
    <SocialCard glowColor="rgba(41,182,246,0.06)">
      <CardHeader icon="✈️" title="DHD Telegram Community" subtitle="Join the conversation. Live updates, community calls, and more." accentColor="#29B6F6" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['📢 Announcements', '💬 Community Chat', '🚀 Launch Updates'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        The official DHD Telegram is where the community lives. Get live price alerts, join discussions, and be the first to hear about new partnerships and exchange listings.
      </p>
      <CtaButton href={LINKS.telegram} label="Join on Telegram →" color="#29B6F6" />
    </SocialCard>
  )
}

function RaydiumCard() {
  return (
    <SocialCard glowColor="rgba(255,184,0,0.05)">
      <CardHeader icon="⚡" title="Trade DHD on Raydium" subtitle="Buy and sell DHD directly on Raydium DEX." accentColor="var(--accent-gold)" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['◎ Solana Network', '💸 Low Fees', '⚡ Instant Settlement'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        The fastest way to buy DHD. Connect your Phantom or Solflare wallet and swap SOL for DHD in seconds — no sign-up required.
      </p>
      <CtaButton href={LINKS.raydium} label="Trade on Raydium →" color="var(--accent-gold)" filled />
    </SocialCard>
  )
}

function DexToolsCard() {
  return (
    <SocialCard glowColor="rgba(0,255,136,0.04)">
      <CardHeader icon="🔧" title="DHD on DEX Tools" subtitle="Advanced charts and token analytics." accentColor="var(--accent-green)" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['📈 Price Charts', '👥 Holder Data', '🔍 On-Chain Analytics'].map(l => <StatPill key={l} label={l} />)}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        Track DHD&apos;s price action, holder distribution, and on-chain analytics. DEX Tools gives you the full picture on every trade.
      </p>
      <CtaButton href={LINKS.dextools} label="Open DEX Tools →" color="var(--accent-green)" />
    </SocialCard>
  )
}

function DexScreenerCard() {
  return (
    <SocialCard glowColor="rgba(0,212,255,0.04)">
      <CardHeader icon="📊" title="DHD on DEX Screener" subtitle="Live price, volume, and trading activity." accentColor="var(--accent-cyan)" />
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#0d1117' }}>
        <iframe
          src={`${LINKS.chartEmbed}&tab=chart`}
          title="DHD Live Chart"
          style={{ display: 'block', width: '100%', height: '420px', border: 'none' }}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>
      <CtaButton href={LINKS.dexscreener} label="View Full Chart →" />
    </SocialCard>
  )
}

// ── Page ─────────────────────────────────────────────────────────────
export default function SocialsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '80px 24px 60px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link href="/cave"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            ← Back to Cave
          </Link>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>
            🌐 Find Us Everywhere
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 80px)', background: 'linear-gradient(135deg, #00D4FF 0%, #88EEFF 50%, #0099CC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.05 }}>
            COMMUNITY
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '480px' }}>
            Find us everywhere. Join the pack.
          </p>
        </motion.div>
      </section>

      {/* Cards */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Row 1: X + Telegram */}
        <div className="socials-row">
          <motion.div {...fadeUp(0)} style={{ flex: 1, minWidth: 0 }}><TwitterCard /></motion.div>
          <motion.div {...fadeUp(0.1)} style={{ flex: 1, minWidth: 0 }}><TelegramCard /></motion.div>
        </div>

        {/* Row 2: DEX Screener full-width */}
        <motion.div {...fadeUp(0.15)}><DexScreenerCard /></motion.div>

        {/* Row 3: Raydium + DEX Tools */}
        <div className="socials-row">
          <motion.div {...fadeUp(0.2)} style={{ flex: 1, minWidth: 0 }}><RaydiumCard /></motion.div>
          <motion.div {...fadeUp(0.25)} style={{ flex: 1, minWidth: 0 }}><DexToolsCard /></motion.div>
        </div>
      </section>

      <style>{`
        .socials-row { display: flex; flex-direction: row; gap: 24px; align-items: stretch; }
        @media (max-width: 767px) { .socials-row { flex-direction: column; } }
      `}</style>
    </main>
  )
}
