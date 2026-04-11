'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { drawBackground } from '@/lib/introCanvas'
import { CONTRACT_ADDRESS, LINKS } from '@/lib/constants'
import CopyButton from '@/components/ui/CopyButton'
import DogeThrone from '@/components/DogeThrone'
import CaveSignpost from '@/components/CaveSignpost'
import ArtifactPanel from '@/components/ArtifactPanel'
import HowToBuyPanel from '@/components/panels/HowToBuyPanel'
import LiveChartPanel from '@/components/panels/LiveChartPanel'

const NAV_CARDS = [
  { src: '/images/cave/tokenomics.png', label: 'TOKENOMICS', href: '/tokenomics' },
  { src: '/images/cave/roadmap.png',    label: 'ROADMAP',    href: '/roadmap'    },
  { src: '/images/cave/vision.png',     label: 'VISION',     href: '/vision'     },
]

// Extra crystal groups for the cave world (more settled, wider scene)
function drawExtraCrystals(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pulse5: number,
  pulse6: number
) {
  const drawCluster = (cx: number, cy: number, scale: number, pulseOpacity: number) => {
    const crystalDefs = [
      { ox: 0,   oy: 0,  ww: 18, hh: 55 },
      { ox: -20, oy: 12, ww: 14, hh: 42 },
      { ox: 22,  oy: 8,  ww: 16, hh: 48 },
      { ox: -8,  oy: 18, ww: 12, hh: 36 },
    ]
    ctx.save()
    ctx.globalAlpha = 0.6 + pulseOpacity * 0.4
    ctx.shadowColor = '#00AAFF'
    ctx.shadowBlur = 10 + pulseOpacity * 15
    crystalDefs.forEach(c => {
      const x = cx + c.ox * scale
      const y = cy + c.oy * scale
      const hw = (c.ww / 2) * scale
      const ht = c.hh * scale
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x + hw, y - ht * 0.3)
      ctx.lineTo(x + hw * 0.8, y)
      ctx.lineTo(x - hw * 0.8, y)
      ctx.lineTo(x - hw, y - ht * 0.3)
      ctx.closePath()
      ctx.fillStyle = '#0066DD'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x + hw * 0.3, y - ht * 0.3)
      ctx.lineTo(x + hw * 0.2, y)
      ctx.lineTo(x, y - ht * 0.15)
      ctx.closePath()
      ctx.fillStyle = '#00AAFF'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x - hw, y - ht * 0.3)
      ctx.lineTo(x - hw * 0.8, y)
      ctx.lineTo(x, y - ht * 0.15)
      ctx.closePath()
      ctx.fillStyle = '#003388'
      ctx.fill()
      ctx.strokeStyle = '#001144'
      ctx.lineWidth = 2
      ctx.stroke()
    })
    ctx.restore()
  }
  // Two extra groups
  drawCluster(w * 0.32, h * 0.45, 0.85, pulse5)
  drawCluster(w * 0.62, h * 0.50, 0.75, pulse6)
}

interface CaveState {
  lantern1: number
  lantern2: number
  lantern3: number
  crystal1: number
  crystal2: number
  crystal3: number
  crystal4: number
  crystal5: number
  crystal6: number
}

export default function CaveWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<CaveState>({
    lantern1: 0.9, lantern2: 0.75, lantern3: 0.85,
    crystal1: 0.7, crystal2: 0.5, crystal3: 0.8, crystal4: 0.6,
    crystal5: 0.65, crystal6: 0.55,
  })
  const rafRef = useRef<number>(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const SIGN_TO_PANEL: Record<string, string> = {
    'HOW TO BUY': 'howToBuy',
    'LIVE CHART': 'chart',
  }
  const ambientRef = useRef<HTMLAudioElement>(null)


  // RAF draw loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = stateRef.current
    const w = canvas.width
    const h = canvas.height

    drawBackground(ctx, w, h, s.lantern1, s.lantern2, s.lantern3, s.crystal1, s.crystal2, s.crystal3, s.crystal4)
    drawExtraCrystals(ctx, w, h, s.crystal5, s.crystal6)

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Start RAF loop
    rafRef.current = requestAnimationFrame(draw)

    const s = stateRef.current

    // Crystal pulsing — 6 groups, independent offsets
    gsap.to(s, { crystal1: 1, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0 })
    gsap.to(s, { crystal2: 1, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8 })
    gsap.to(s, { crystal3: 1, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 })
    gsap.to(s, { crystal4: 1, duration: 4.0, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.4 })
    gsap.to(s, { crystal5: 1, duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.4 })
    gsap.to(s, { crystal6: 1, duration: 3.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.2 })

    // Lantern flicker — randomised per lantern, never in sync
    const flickerLantern = (key: keyof CaveState, baseDur: number, delay: number) => {
      gsap.to(s, {
        [key]: 0.6,
        duration: baseDur,
        yoyo: true,
        repeat: -1,
        ease: 'none',
        delay,
      })
    }
    flickerLantern('lantern1', 0.28, 0)
    flickerLantern('lantern2', 0.41, 0.13)
    flickerLantern('lantern3', 0.35, 0.22)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      gsap.killTweensOf(s)
    }
  }, [draw])

  // Sound toggle
  useEffect(() => {
    const ambient = ambientRef.current
    if (!ambient) return
    if (soundEnabled) {
      ambient.volume = 0.15
      ambient.play().catch(() => {/* autoplay blocked — user must interact first */})
    } else {
      ambient.pause()
    }
  }, [soundEnabled])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      {/* Cave Canvas — visual only, must never intercept clicks */}
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* DHD Logo — top center, decorative only */}
      <div style={{
        position: 'absolute',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        pointerEvents: 'none',
      }} className="dhd-logo-wrap">
        <Image
          src="/images/dhd-logo.jpg"
          width={110}
          height={110}
          alt="DHD Logo"
          style={{
            borderRadius: '50%',
            border: '2px solid rgba(255,184,0,0.6)',
            display: 'block',
            animation: 'dhdGlow 3s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Cave Navigation Cards — below logo.
          Container is pointer-events:none so it never blocks clicks on signpost/throne behind it.
          Each individual card sets pointer-events:all. */}
      <div style={{
        position: 'absolute',
        top: '220px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'calc(100vw - 160px)',
        maxWidth: '960px',
        pointerEvents: 'none',
      }} className="cave-nav-cards">
        {NAV_CARDS.map(card => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              display: 'block',
              flex: 1,
              minWidth: 0,
              textDecoration: 'none',
              cursor: 'pointer',
              pointerEvents: 'all',
              borderRadius: '14px',
              border: '2px solid rgba(255,184,0,0.35)',
              background: 'rgba(5,8,26,0.55)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = '0 0 28px rgba(255,184,0,0.45)'
              e.currentTarget.style.borderColor = 'rgba(255,184,0,0.9)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'rgba(255,184,0,0.35)'
            }}
          >
            <Image
              src={card.src}
              alt={card.label}
              width={320}
              height={200}
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

      {/* Doge on Throne */}
      <div className="cave-throne"><DogeThrone /></div>

      {/* Navigation Signpost */}
      <div className="cave-signpost"><CaveSignpost onSignClick={label => setActivePanel(SIGN_TO_PANEL[label] ?? null)} /></div>

      {/* Mobile-only: HOW TO BUY + LIVE CHART buttons (replace signpost on small screens) */}
      <div className="cave-mobile-actions" style={{ display: 'none' }}>
        {[
          { label: 'HOW TO BUY', panel: 'howToBuy' },
          { label: 'LIVE CHART', panel: 'chart' },
        ].map(item => (
          <button
            key={item.panel}
            onClick={() => setActivePanel(item.panel)}
            style={{
              flex: 1,
              padding: '12px 8px',
              background: 'rgba(160,101,42,0.85)',
              border: '1px solid rgba(255,184,0,0.5)',
              borderRadius: '8px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5DFA0',
              cursor: 'pointer',
              pointerEvents: 'all',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Artifact Panels */}
      <ArtifactPanel isOpen={activePanel === 'howToBuy'} onClose={() => setActivePanel(null)} title="How to Buy" soundEnabled={soundEnabled}>
        <HowToBuyPanel />
      </ArtifactPanel>
      <ArtifactPanel isOpen={activePanel === 'chart'} onClose={() => setActivePanel(null)} title="Live DHD Chart" soundEnabled={soundEnabled} wide>
        <LiveChartPanel />
      </ArtifactPanel>

      <audio ref={ambientRef} src="/sounds/cave-ambient.mp3" loop preload="auto" />

      {/* Always-visible cave info — center of screen */}
      <div className="cave-bottom-info" style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 20,
        pointerEvents: 'all',
        width: 'max-content',
      }}>
        {/* Contract address — full address, click anywhere on the row to copy */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}>
            Contract Address
          </span>
          <CopyButton text={CONTRACT_ADDRESS} fullAddress />
        </div>

        {/* Buy DHD button */}
        <a
          href={LINKS.raydium}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            padding: '12px 32px',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#05081A',
            background: 'var(--accent-cyan)',
            border: 'none',
            borderRadius: '6px',
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 24px rgba(0,212,255,0.5)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            pointerEvents: 'all',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.5)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Buy DHD
        </a>

        {/* Social links — 44px tap targets */}
        <div className="cave-socials" style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { href: LINKS.telegram,    label: '✈️ Telegram' },
            { href: LINKS.dexscreener, label: '📊 DEX Screener' },
            { href: LINKS.raydium,     label: '⚡ Raydium' },
          ].map((link, i, arr) => (
            <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '0 10px',
                  gap: '4px',
                  transition: 'color 0.2s ease',
                  pointerEvents: 'all',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: 'var(--border-subtle)' }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Sound toggle — bottom-left */}
      <button
        className="cave-sound-btn"
        onClick={() => setSoundEnabled(v => !v)}
        aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          pointerEvents: 'all',
          transition: 'border-color 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-active)'
          e.currentTarget.style.color = 'var(--text-primary)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      <style>{`
        @keyframes dhdGlow {
          from { filter: drop-shadow(0 0 10px rgba(255,184,0,0.5)); }
          to   { filter: drop-shadow(0 0 28px rgba(255,184,0,0.9)); }
        }

        /* ── Mobile layout ── */
        @media (max-width: 767px) {

          /* Logo — pushed down, smaller */
          .dhd-logo-wrap {
            top: 110px !important;
          }
          .dhd-logo-wrap img {
            width: 64px !important;
            height: 64px !important;
          }

          /* Nav cards — pushed down below logo, compact row */
          .cave-nav-cards {
            top: 188px !important;
            width: calc(100vw - 20px) !important;
            gap: 8px !important;
            max-width: 100% !important;
          }

          /* Throne — centered in the empty middle zone, scaled down, no text overlap */
          .cave-throne {
            position: absolute !important;
            display: block !important;
            top: 305px !important;
            left: 50% !important;
            transform: translateX(-60%) !important;
            z-index: 10 !important;
          }
          .cave-throne .doge-throne-root {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: scale(0.68) !important;
            transform-origin: top left !important;
          }

          /* Signpost — hidden on mobile */
          .cave-signpost { display: none !important; }

          /* Mobile sign buttons — shown instead of signpost */
          .cave-mobile-actions {
            display: flex !important;
            position: absolute;
            bottom: 215px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100vw - 32px);
            gap: 10px;
            z-index: 20;
            pointer-events: all;
          }

          /* Bottom info — centered, full width minus gutters */
          .cave-bottom-info {
            bottom: 16px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100vw - 32px) !important;
            max-width: 100% !important;
            align-items: center !important;
          }

          /* Contract address — wrap on small screens */
          .cave-bottom-info button[aria-label="Copy contract address"] {
            white-space: normal !important;
            word-break: break-all !important;
            font-size: 10px !important;
            padding: 8px 10px !important;
          }

          /* Buy DHD — full width on mobile */
          .cave-bottom-info a[href*="raydium"] {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Social links — tighter, centered */
          .cave-socials {
            gap: 0 !important;
            justify-content: center !important;
          }
          .cave-socials a {
            font-size: 11px !important;
            padding: 0 5px !important;
            min-height: 36px !important;
          }

          /* Sound toggle — bottom-left, same height as bottom info */
          .cave-sound-btn {
            width: 40px !important;
            height: 40px !important;
            bottom: 28px !important;
            left: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}
