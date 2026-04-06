'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LINKS } from '@/lib/constants'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  viewport: { once: true },
})

// ── Twitter embed card ──────────────────────────────────────────────
function TwitterCard() {
  useEffect(() => {
    // Load Twitter widget script dynamically to avoid SSR issues
    if (document.getElementById('twitter-wjs')) return
    const script = document.createElement('script')
    script.id = 'twitter-wjs'
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <SocialCard
      icon="𝕏"
      title="Diamond Hand Doge on X"
      subtitle="Follow @DogeHandDiamond for the latest updates"
      accentColor="var(--text-primary)"
    >
      <div style={{ borderRadius: '12px', overflow: 'hidden', height: '480px' }}>
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          href="https://twitter.com/DogeHandDiamond"
        >
          Loading tweets…
        </a>
      </div>
      <CtaButton href={LINKS.twitter} label="Follow on X →" />
    </SocialCard>
  )
}

// ── Telegram card ───────────────────────────────────────────────────
function TelegramCard() {
  return (
    <SocialCard
      icon="✈️"
      title="DHD Telegram Community"
      subtitle="Join the conversation. Live updates, community calls, and more."
      accentColor="#29B6F6"
    >
      {/* Styled preview card — Telegram widget doesn't support arbitrary public groups cleanly */}
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(41,182,246,0.2)',
        borderRadius: '12px',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '56px', lineHeight: 1 }}>✈️</span>
        <div>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            @diamondhanddoge
          </p>
          <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The official DHD Telegram. Live price updates, community discussions, and breaking news — all in one place.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '📢', label: 'Announcements' },
            { icon: '💬', label: 'Community Chat' },
            { icon: '🚀', label: 'Launch Updates' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '24px' }}>{f.icon}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <CtaButton href={LINKS.telegram} label="Join on Telegram →" color="#29B6F6" />
    </SocialCard>
  )
}

// ── DEX Screener card ───────────────────────────────────────────────
function DexScreenerCard() {
  return (
    <SocialCard
      icon="📊"
      title="DHD on DEX Screener"
      subtitle="Live price, volume, and trading activity."
      accentColor="var(--accent-cyan)"
    >
      <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <iframe
          src={`${LINKS.chartEmbed}&trades=0&info=0`}
          height="400"
          style={{ width: '100%', border: 'none', display: 'block' }}
          title="DHD Live Chart"
        />
      </div>
      <CtaButton href={LINKS.dexscreener} label="View Full Chart →" />
    </SocialCard>
  )
}

// ── Raydium card ────────────────────────────────────────────────────
function RaydiumCard() {
  return (
    <SocialCard
      icon="⚡"
      title="Trade DHD on Raydium"
      subtitle="Buy and sell DHD directly on Raydium DEX."
      accentColor="var(--accent-gold)"
    >
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(255,184,0,0.2)',
        borderRadius: '12px',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '64px', lineHeight: 1 }}>⚡</span>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '360px' }}>
          The fastest way to buy DHD. Connect your Solana wallet and swap SOL for DHD in seconds.
        </p>
        <CtaButton href={LINKS.raydium} label="Trade on Raydium →" color="var(--accent-gold)" dark />
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
          Powered by Raydium · Solana Network · Low fees · Instant settlement
        </p>
      </div>
    </SocialCard>
  )
}

// ── DEX Tools card ──────────────────────────────────────────────────
function DexToolsCard() {
  return (
    <SocialCard
      icon="🔧"
      title="DHD on DEX Tools"
      subtitle="Advanced charts and token analytics."
      accentColor="var(--accent-green)"
    >
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(0,255,136,0.15)',
        borderRadius: '12px',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '64px', lineHeight: 1 }}>🔧</span>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '360px' }}>
          Track DHD&apos;s price action, holder data, and on-chain analytics on DEX Tools.
        </p>
        <CtaButton href={LINKS.dextools} label="Open DEX Tools →" color="var(--accent-green)" />
      </div>
    </SocialCard>
  )
}

// ── Shared primitives ───────────────────────────────────────────────
function SocialCard({
  icon, title, subtitle, accentColor, children,
}: {
  icon: string
  title: string
  subtitle: string
  accentColor: string
  children: React.ReactNode
}) {
  return (
    <Card style={{
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        <div>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: accentColor,
            marginBottom: '6px',
          }}>{title}</h3>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </Card>
  )
}

function CtaButton({ href, label, color = 'var(--accent-cyan)', dark = false }: {
  href: string
  label: string
  color?: string
  dark?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 28px',
        background: dark ? color : 'transparent',
        border: dark ? 'none' : `1px solid ${color}`,
        borderRadius: '8px',
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: dark ? '#05081A' : color,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        minHeight: '44px',
        alignSelf: 'flex-start',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {label}
    </a>
  )
}

// ── Page ────────────────────────────────────────────────────────────
export default function SocialsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '72px', overflow: 'hidden' }}>

      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '80px 24px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div {...fadeUp(0)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link href="/cave" style={{
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
            🌐 Find Us Everywhere
          </span>

          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 80px)',
            background: 'linear-gradient(135deg, #00D4FF 0%, #88EEFF 50%, #0099CC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.05,
          }}>
            COMMUNITY
          </h1>

          <p style={{
            margin: 0, fontFamily: 'var(--font-body)', fontSize: '18px',
            lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '480px',
          }}>
            Find us everywhere. Join the pack.
          </p>
        </motion.div>
      </section>

      {/* Cards grid */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '24px',
        }} className="socials-grid">
          <ScrollReveal delay={0}><TwitterCard /></ScrollReveal>
          <ScrollReveal delay={0.1}><TelegramCard /></ScrollReveal>
          <ScrollReveal delay={0.15}><DexScreenerCard /></ScrollReveal>
          <ScrollReveal delay={0.2}><RaydiumCard /></ScrollReveal>
          <ScrollReveal delay={0.25}><DexToolsCard /></ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .socials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
