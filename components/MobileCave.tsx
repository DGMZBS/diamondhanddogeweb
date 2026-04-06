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
  { icon: '💎', label: 'HOW TO BUY', panel: 'howToBuy', delay: '0s' },
  { icon: '📊', label: 'LIVE CHART', panel: 'chart',    delay: '0.15s' },
  { icon: '🌐', label: 'SOCIALS',    panel: 'socials',  delay: '0.3s' },
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
              <CrystalButton icon={c.icon} delay={c.delay} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}>{c.label}</span>
            </a>
          ) : (
            <button
              key={c.label}
              onClick={() => handleCrystal(c.panel)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
              <CrystalButton icon={c.icon} delay={c.delay} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
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
        @keyframes mc-crystal-pulse {
          0%, 100% { box-shadow: 0 0 16px rgba(0,212,255,0.4), inset 0 0 16px rgba(0,212,255,0.1); }
          50%       { box-shadow: 0 0 28px rgba(0,212,255,0.75), inset 0 0 24px rgba(0,212,255,0.2); }
        }
      `}</style>
    </div>
  )
}

function CrystalButton({ icon, delay }: { icon: string; delay: string }) {
  return (
    <div
      style={{
        width: '100px',
        height: '120px',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: 'linear-gradient(180deg, rgba(0,212,255,0.35) 0%, rgba(0,100,150,0.65) 100%)',
        border: '1px solid var(--accent-cyan)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        animation: `mc-crystal-pulse 2s ease-in-out ${delay} infinite`,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, filter 0.15s ease',
        minWidth: '100px',
        minHeight: '120px',
      }}
    >
      {icon}
    </div>
  )
}
