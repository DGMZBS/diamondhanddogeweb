'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { CONTRACT_ADDRESS } from '@/lib/constants'

const SESSION_KEY = 'dhd_about_seen'

const cards = [
  {
    icon: '💎',
    title: 'Diamond Hands. Real Rewards.',
    body: 'DHD rewards those who hold through the volatility. The longer you hold, the more you earn. True diamond hands never fold.',
  },
  {
    icon: '🐕',
    title: 'Built by the Pack.',
    body: "Community-driven from day one. Every burn, every milestone, every exchange listing is shared with holders. You're not just buying a coin — you're joining a movement.",
  },
  {
    icon: '🚀',
    title: 'More Than a Meme.',
    body: 'DHD has ambitions beyond the meme. A DHD banking system, gaming currency, and investment platform are all on the horizon — built for the community, by the community.',
  },
]

const pills = [
  { icon: '◎', label: 'Built on Solana' },
  { icon: '💎', label: 'Long-Term Holder Rewards' },
  { icon: '🔥', label: 'Verified Burns at Every Milestone' },
  { icon: '🔒', label: '~1 Billion Supply — Locked' },
  { icon: '🚀', label: 'Community Goal: Elon Notices DHD' },
]

// Truncate: first 6 chars + ... + last 4 chars
const SHORT_ADDRESS = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`

function ContractBar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    } catch {
      const el = document.createElement('textarea')
      el.value = CONTRACT_ADDRESS
      el.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(el)
      el.focus(); el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy contract address"
      className="contract-bar"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 12px',
        background: copied ? 'rgba(0,212,255,0.08)' : 'rgba(255,184,0,0.07)',
        border: `1px solid ${copied ? 'var(--border-active)' : 'rgba(255,184,0,0.25)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {/* Address */}
      <span
        className="contract-addr-full"
        style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          color: copied ? 'var(--accent-cyan)' : 'var(--accent-gold)',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}
      >
        {CONTRACT_ADDRESS}
      </span>
      <span
        className="contract-addr-short"
        style={{
          display: 'none',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: copied ? 'var(--accent-cyan)' : 'var(--accent-gold)',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}
      >
        {SHORT_ADDRESS}
      </span>

      {/* Copy icon / Copied badge */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        fontFamily: 'var(--font-display)',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: copied ? 'var(--accent-cyan)' : 'var(--text-secondary)',
        flexShrink: 0,
        transition: 'color 0.2s',
      }}>
        {copied ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </>
        )}
      </span>
    </button>
  )
}

interface AboutSectionProps {
  onEnterCave: () => void
}

export default function AboutSection({ onEnterCave }: AboutSectionProps) {
  const [skipAnims, setSkipAnims] = useState(true)
  const ctaBtnRef = useRef<HTMLButtonElement>(null)  // kept for potential future use

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY)
    if (!seen) {
      setSkipAnims(false)
      sessionStorage.setItem(SESSION_KEY, '1')
    }
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: skipAnims ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: skipAnims ? 0 : delay },
    viewport: { once: true },
  })

  return (
    <section
      id="about"
      className="about-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Main content ── */}
      <div className="about-content-wrapper" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '80px 48px 96px',
        gap: '48px',
      }}>
        {/* ── Two-column layout ── */}
        <div className="about-columns" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '56px',
          width: '100%',
          maxWidth: '1200px',
        }}>

          {/* Left column — Doge hero image */}
          <motion.div
            {...fadeUp(0)}
            className="about-image-col"
            style={{
              flex: '0 0 40%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src="/images/doge-hero.png"
              width={500}
              height={750}
              alt="Diamond Hand Doge"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.4))',
                animation: 'dogeFloat 4s ease-in-out infinite',
              }}
            />
          </motion.div>

          {/* Right column — all text content */}
          <div
            className="about-content-col"
            style={{
              flex: '0 0 60%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            <motion.div {...fadeUp(0)} style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
              {/* "ON SOLANA" label + contract address inline */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)',
                  whiteSpace: 'nowrap',
                }}>
                  💎 ON SOLANA
                </span>
                <ContractBar />
              </div>

              <h1 style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(28px, 4vw, 52px)',
                color: 'var(--text-primary)',
                textShadow: '0 0 30px rgba(0,212,255,0.4)',
                lineHeight: 1.15,
              }}>
                What is Diamond Hand Doge?
              </h1>

              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '560px',
              }}>
                Diamond Hand Doge (DHD) is the ultimate meme coin for holders with true diamond hands.
                Backed by a strong community and big dreams, DHD is all about holding tight and aiming
                for the moon. Easy to use, fun to own, and built for long-term growth — this isn&apos;t
                just a coin, it&apos;s a movement.
              </p>

              {/* Fact pills */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                {pills.map(p => (
                  <span
                    key={p.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.icon} {p.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Cards */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              width: '100%',
            }}>
              {cards.map((card, i) => (
                <motion.div key={card.title} {...fadeUp(i * 0.15)} style={{ flex: '1 1 220px' }}>
                  <Card style={{
                    height: '100%',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '12px',
                    textAlign: 'left',
                  }}>
                    <span style={{ fontSize: '30px', lineHeight: 1 }}>{card.icon}</span>
                    <h3 style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                    }}>
                      {card.body}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              {...fadeUp(0.45)}
              className="about-cta"
              style={{ marginTop: '8px' }}
            >
              <button
                ref={ctaBtnRef}
                onClick={onEnterCave}
                className="cave-cta-btn"
              >
                <span className="cave-cta-shimmer" />
                <span className="cave-cta-content">
                  <span className="cave-cta-icon">🔦</span>
                  <span className="cave-cta-text">Explore the Cave</span>
                  <span className="cave-cta-arrow">→</span>
                </span>
              </button>

              <p style={{
                marginTop: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
              }}>
                Enter the DHD cave world
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom blue glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '100px',
        background: 'radial-gradient(ellipse, rgba(0,170,255,0.08), transparent)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes dogeFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        @keyframes cavePulse {
          0%, 100% { box-shadow: 0 0 24px rgba(255,184,0,0.5), 0 0 48px rgba(255,184,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15); }
          50%       { box-shadow: 0 0 40px rgba(255,184,0,0.85), 0 0 80px rgba(255,184,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15); }
        }

        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }

        .cave-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          background: linear-gradient(135deg, #FFB800 0%, #FF8C00 50%, #FFB800 100%);
          background-size: 200% 200%;
          animation: cavePulse 2.4s ease-in-out infinite;
          transition: transform 0.18s ease, filter 0.18s ease;
          font-family: var(--font-display);
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .cave-cta-btn:hover {
          transform: translateY(-3px) scale(1.03);
          filter: brightness(1.12);
          animation-play-state: paused;
          box-shadow: 0 0 56px rgba(255,184,0,0.9), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .cave-cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .cave-cta-shimmer {
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: shimmerSweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .cave-cta-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          color: #1A0A00;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-shadow: 0 1px 0 rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .cave-cta-icon {
          font-size: 20px;
          line-height: 1;
          filter: drop-shadow(0 0 4px rgba(0,0,0,0.4));
        }

        .cave-cta-arrow {
          font-size: 18px;
          animation: arrowBounce 1.4s ease-in-out infinite;
          display: inline-block;
        }

        @media (max-width: 767px) {
          .about-content-wrapper {
            padding: 40px 20px 80px !important;
            gap: 32px !important;
          }
          .about-columns {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .about-image-col {
            flex: none !important;
            width: 100% !important;
          }
          .about-image-col img {
            max-width: 220px !important;
            margin: 0 auto !important;
          }
          .about-content-col {
            flex: none !important;
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
          }
          .about-cta {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .cave-cta-btn {
            width: 100% !important;
          }
          .cave-cta-content {
            padding: 16px 24px !important;
            font-size: 13px !important;
            justify-content: center !important;
          }
          /* Mobile: show short address, hide full */
          .contract-addr-full { display: none !important; }
          .contract-addr-short { display: inline !important; }
        }
      `}</style>
    </section>
  )
}
