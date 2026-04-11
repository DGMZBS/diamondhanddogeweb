'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CONTRACT_ADDRESS, LINKS } from '@/lib/constants'
import CopyButton from '@/components/ui/CopyButton'
import ArtifactPanel from '@/components/ArtifactPanel'
import HowToBuyPanel from '@/components/panels/HowToBuyPanel'
import LiveChartPanel from '@/components/panels/LiveChartPanel'

const NAV_CARDS = [
  { src: '/images/cave/tokenomics.png', label: 'TOKENOMICS', href: '/tokenomics' },
  { src: '/images/cave/roadmap.png',    label: 'ROADMAP',    href: '/roadmap'    },
  { src: '/images/cave/vision.png',     label: 'VISION',     href: '/vision'     },
]

const CRYSTALS = [
  { id: 'htb',   icon: '💎', label: 'HOW TO BUY', panel: 'howToBuy', delay: '0s',   accentColor: '#00D4FF', glowColor: 'rgba(0,212,255,0.7)'  },
  { id: 'chart', icon: '📊', label: 'LIVE CHART', panel: 'chart',    delay: '0.5s', accentColor: '#FFB800', glowColor: 'rgba(255,184,0,0.7)'  },
  { id: 'soc',   icon: '🌐', label: 'SOCIALS',    panel: 'socials',  delay: '1s',   accentColor: '#00FF88', glowColor: 'rgba(0,255,136,0.7)'  },
]

const SOCIALS = [
  { href: LINKS.twitter,     label: '𝕏 Twitter' },
  { href: LINKS.telegram,    label: '✈️ Telegram' },
  { href: LINKS.dexscreener, label: '📊 DEX Screener' },
  { href: LINKS.raydium,     label: '⚡ Raydium' },
]

export default function MobileCave() {
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const handleCrystal = (panel: string) => {
    if (panel === 'socials') return // socials scrolls to section below
    setActivePanel(panel)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 100%, #0d1535 0%, #05081A 60%, #020408 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '88px', // below navbar
      paddingBottom: '48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '200px', height: '200px', background: 'radial-gradient(ellipse, rgba(0,255,136,0.1), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(ellipse, rgba(0,255,136,0.1), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '150px', background: 'radial-gradient(ellipse, rgba(255,180,50,0.07), transparent)', pointerEvents: 'none' }} />

      {/* DHD Logo */}
      <div className="mc-logo" style={{ marginBottom: '32px' }}>
        <Image
          src="/images/dhd-logo.jpg"
          width={90}
          height={90}
          alt="DHD Logo"
          style={{
            borderRadius: '50%',
            border: '2px solid rgba(255,184,0,0.6)',
            display: 'block',
            animation: 'mc-glow 3s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Crystal buttons row */}
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '40px' }}>
        {CRYSTALS.map(c => (
          c.panel === 'socials' ? (
            <a
              key={c.label}
              href="#mc-socials"
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
              <CrystalButton icon={c.icon} delay={c.delay} accentColor={c.accentColor} glowColor={c.glowColor} crystalId={c.id} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: c.accentColor,
                textShadow: `0 0 10px ${c.glowColor}`,
              }}>{c.label}</span>
            </a>
          ) : (
            <button
              key={c.label}
              onClick={() => handleCrystal(c.panel)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
              <CrystalButton icon={c.icon} delay={c.delay} accentColor={c.accentColor} glowColor={c.glowColor} crystalId={c.id} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: c.accentColor,
                textShadow: `0 0 10px ${c.glowColor}`,
              }}>{c.label}</span>
            </button>
          )
        ))}
      </div>

      {/* Nav image cards — stacked */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: 'calc(100vw - 48px)',
        maxWidth: '400px',
        marginBottom: '40px',
      }}>
        {NAV_CARDS.map(card => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              display: 'block',
              textDecoration: 'none',
              borderRadius: '14px',
              border: '2px solid rgba(255,184,0,0.35)',
              background: 'rgba(5,8,26,0.55)',
              overflow: 'hidden',
            }}
          >
            <Image
              src={card.src}
              alt={card.label}
              width={400}
              height={250}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{
              padding: '10px 0 8px',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F0D9A0',
            }}>
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Contract address */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
        }}>
          Contract Address
        </span>
        <CopyButton text={CONTRACT_ADDRESS} fullAddress />
      </div>

      {/* BUY DHD */}
      <a
        href={LINKS.raydium}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'calc(100vw - 48px)',
          maxWidth: '400px',
          minHeight: '52px',
          padding: '14px 32px',
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#05081A',
          background: 'var(--accent-cyan)',
          borderRadius: '10px',
          textDecoration: 'none',
          boxShadow: '0 0 24px rgba(0,212,255,0.5)',
          marginBottom: '32px',
        }}
      >
        Buy DHD
      </a>

      {/* Social links */}
      <div id="mc-socials" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        justifyContent: 'center',
        width: 'calc(100vw - 48px)',
        maxWidth: '400px',
      }}>
        {SOCIALS.map((s, i) => (
          <span key={s.href} style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                minHeight: '48px',
                padding: '0 10px',
              }}
            >
              {s.label}
            </a>
            {i < SOCIALS.length - 1 && (
              <span style={{ color: 'var(--border-subtle)' }}>·</span>
            )}
          </span>
        ))}
      </div>

      {/* Panels */}
      <ArtifactPanel isOpen={activePanel === 'howToBuy'} onClose={() => setActivePanel(null)} title="How to Buy" mobileSlideUp>
        <HowToBuyPanel />
      </ArtifactPanel>
      <ArtifactPanel isOpen={activePanel === 'chart'} onClose={() => setActivePanel(null)} title="Live DHD Chart" wide mobileSlideUp>
        <LiveChartPanel />
      </ArtifactPanel>

      <style>{`
        @keyframes mc-glow {
          from { filter: drop-shadow(0 0 8px rgba(255,184,0,0.4)); }
          to   { filter: drop-shadow(0 0 22px rgba(255,184,0,0.9)); }
        }
        @keyframes mc-crystal-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes mc-crystal-shimmer {
          0%, 100% { opacity: 0.82; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function CrystalButton({ icon, delay, accentColor, glowColor, crystalId }: {
  icon: string
  delay: string
  accentColor: string
  glowColor: string
  crystalId: string
}) {
  const g = crystalId

  return (
    <div style={{
      position: 'relative',
      width: '100px',
      height: '116px',
      cursor: 'pointer',
      animation: `mc-crystal-bob 3.5s ease-in-out ${delay} infinite`,
    }}>
      <svg
        viewBox="0 0 100 116"
        width="100"
        height="116"
        style={{
          display: 'block',
          filter: `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 2px 22px ${glowColor})`,
          animation: `mc-crystal-shimmer 2.5s ease-in-out ${delay} infinite`,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${g}-base`} x1="25%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
            <stop offset="55%" stopColor="#04091c" stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${g}-top`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="55%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${g}-right`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* Deep base */}
        <polygon points="50,2 97,27 97,89 50,114 3,89 3,27" fill="#04091c" />
        {/* Colored gradient body */}
        <polygon points="50,2 97,27 97,89 50,114 3,89 3,27" fill={`url(#${g}-base)`} />
        {/* Upper facet highlight */}
        <polygon points="50,2 97,27 97,58 3,58 3,27" fill={`url(#${g}-top)`} />
        {/* Right-side accent facet */}
        <polygon points="97,27 97,89 50,114 50,58 97,58" fill={`url(#${g}-right)`} />
        {/* Inner bevel ring */}
        <polygon points="50,10 91,31 91,85 50,106 10,85 10,31"
          fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.3" />
        {/* Outer border */}
        <polygon points="50,2 97,27 97,89 50,114 3,89 3,27"
          fill="none" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.9" />
        {/* Specular highlight line */}
        <line x1="26" y1="15" x2="74" y2="15" stroke="white" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round" />
        {/* Bright corner catch-light */}
        <circle cx="36" cy="21" r="2.5" fill="white" fillOpacity="0.45" />
      </svg>

      {/* Icon */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -52%)',
        fontSize: '28px',
        lineHeight: 1,
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 8px ${accentColor})`,
      }}>
        {icon}
      </div>
    </div>
  )
}
