'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LINKS, CONTRACT_ADDRESS } from '@/lib/constants'
import CopyButton from '@/components/ui/CopyButton'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Vision', href: '#vision' },
  { label: 'Chart', href: '#chart' },
]

const PLATFORMS = [
  { label: 'Raydium', href: LINKS.raydium, icon: '◎' },
  { label: 'DEX Screener', href: LINKS.dexscreener, icon: '📊' },
  { label: 'DEX Tools', href: LINKS.dextools, icon: '🔧' },
]

const COMMUNITY = [
  { label: 'Twitter / X', href: LINKS.twitter, icon: '𝕏' },
  { label: 'Telegram', href: LINKS.telegram, icon: '✈️' },
  { label: LINKS.email, href: `mailto:${LINKS.email}`, icon: '✉️' },
]

const shortAddress = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 32px' }}>

        {/* 4-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>

          {/* Column 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/images/dhd-token.JPG"
                alt="Diamond Hand Doge logo"
                width={40}
                height={40}
                style={{ borderRadius: '50%', border: '1px solid var(--border-active)' }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                DHD
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Hold Strong. Mine Deep. Win Big.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)' }}>
              © 2025 Diamond Hand Doge. All rights reserved.
            </p>
          </div>

          {/* Column 2 — Navigate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
            }}>
              Navigate
            </h4>
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'color 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Column 3 — Platforms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
            }}>
              Platforms
            </h4>
            {PLATFORMS.map(({ label, href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span style={{ fontSize: '13px' }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>

          {/* Column 4 — Community */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
            }}>
              Community
            </h4>
            {COMMUNITY.map(({ label, href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  width: 'fit-content',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span style={{ fontSize: '13px' }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/disclaimer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              Disclaimer
            </Link>
            <span style={{ color: 'var(--border-subtle)', fontSize: '12px' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--text-dim)',
              }}>
                {shortAddress}
              </span>
              <CopyButton text={CONTRACT_ADDRESS} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="https://www.bensound.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Music: Theatre Of Delays — bensound.com | License: OPCDZFN8EMTC5HJU"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                opacity: 0.5,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
            >
              music credits
            </a>
            <span style={{ color: 'var(--border-subtle)', fontSize: '12px' }}>|</span>
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              Built on Solana →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
