'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const SESSION_KEY = 'dhd_about_seen'

interface AboutSectionProps {
  onEnterCave: () => void
}

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

export default function AboutSection({ onEnterCave }: AboutSectionProps) {
  const [skipAnims, setSkipAnims] = useState(true)

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: '96px 48px',
        gap: '48px',
        overflow: 'hidden',
      }}
    >
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
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
            }}>
              💎 ON SOLANA
            </span>

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
          <motion.div {...fadeUp(0.45)} className="about-cta">
            <Button variant="primary" onClick={onEnterCave}>
              Explore the Cave
            </Button>
          </motion.div>
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
        @media (max-width: 767px) {
          .about-section {
            padding: 80px 20px !important;
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
            justify-content: center !important;
          }
          .about-cta button, .about-cta span {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  )
}
