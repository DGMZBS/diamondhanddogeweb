'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { LINKS } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Audio: auto-play on mount, fallback to muted if browser blocks
  useEffect(() => {
    const audio = new Audio('/sounds/cave-ambient.mp3')
    audio.loop = true
    audio.volume = 0.15
    audioRef.current = audio
    audio.play().catch(() => {
      // Autoplay blocked — show muted state so user can tap to start
      setMuted(true)
    })
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (muted) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
  }, [muted])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToAbout = () => {
    setMenuOpen(false)
    if (pathname !== '/') {
      router.push('/#about')
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks: { label: string; action: () => void; isActive: boolean }[] = [
    {
      label: 'About',
      action: scrollToAbout,
      isActive: pathname === '/',
    },
    {
      label: 'Tokenomics',
      action: () => { setMenuOpen(false); router.push('/tokenomics') },
      isActive: pathname === '/tokenomics',
    },
    {
      label: 'Roadmap',
      action: () => { setMenuOpen(false); router.push('/roadmap') },
      isActive: pathname === '/roadmap',
    },
    {
      label: 'Vision',
      action: () => { setMenuOpen(false); router.push('/vision') },
      isActive: pathname === '/vision',
    },
    {
      label: 'Socials',
      action: () => { setMenuOpen(false); router.push('/socials') },
      isActive: pathname === '/socials',
    },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          background: scrolled ? 'rgba(5, 8, 26, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <Image
            src="/images/dhd-token.JPG"
            alt="Diamond Hand Doge logo"
            width={40}
            height={40}
            style={{ borderRadius: '50%', border: '1px solid var(--border-active)' }}
            priority
          />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--text-primary)',
          }}>
            DHD
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '40px' }} className="hidden-mobile">
          {navLinks.map(({ label, action, isActive }) => (
            <button
              key={label}
              onClick={action}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget).style.color = 'var(--accent-cyan)' }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget).style.color = 'var(--text-secondary)' }}
            >
              {label}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-cyan)',
                  borderRadius: '1px',
                  boxShadow: '0 0 8px var(--accent-cyan)',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ flexShrink: 0 }} className="hidden-mobile">
          <a
            href={LINKS.raydium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy DHD on Raydium"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
              color: '#05081A',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)'
            }}
          >
            Buy DHD
          </a>
        </div>

        {/* Mobile mute button — absolutely centered */}
        <button
          className="nav-mute-btn"
          onClick={() => setMuted((v: boolean) => !v)}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,184,0,0.1)',
            border: '1px solid rgba(255,184,0,0.35)',
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            alignItems: 'center',
            gap: '6px',
            color: 'rgba(255,184,0,0.9)',
            fontFamily: 'var(--font-display)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>{muted ? '🔇' : '🔊'}</span>
          <span>{muted ? 'Muted' : 'Music'}</span>
        </button>

        {/* Mobile hamburger */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} className="show-mobile">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(5, 8, 26, 0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {navLinks.map(({ label, action, isActive }) => (
          <button
            key={label}
            onClick={action}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)',
              transition: 'color 0.2s ease',
            }}
          >
            {label}
          </button>
        ))}
        <a
          href={LINKS.raydium}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '16px',
            padding: '14px 40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
            color: '#05081A',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            textDecoration: 'none',
          }}
        >
          Buy DHD
        </a>
      </div>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        .nav-mute-btn { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .nav-mute-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
