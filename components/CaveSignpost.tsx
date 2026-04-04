'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SignArrowProps {
  label: string
  rotation: number
  width: number
  direction: 'left' | 'right'
  top: number
  onClick: () => void
  lanternRef: React.RefObject<HTMLDivElement | null>
}

const WOOD_GRAIN = 'repeating-linear-gradient(180deg, transparent, transparent 6px, rgba(0,0,0,0.1) 6px, rgba(0,0,0,0.1) 7px)'

// Much lighter wood tones so signs read against the dark cave
const SIGN_BG      = '#A0652A'   // warm mid-brown, always visible
const SIGN_BG_HOVER = '#C4813A'  // lighter amber-brown on hover
const POST_BG      = '#7A4E1E'   // slightly darker post

function SignArrow({ label, rotation, width, direction, top, onClick, lanternRef }: SignArrowProps) {
  const clipPath = direction === 'right'
    ? 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
    : 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)'

  return (
    <button
      style={{
        position: 'absolute',
        top,
        left:  direction === 'right' ? '30px' : 'auto',
        right: direction === 'left'  ? '30px' : 'auto',
        width,
        height: '52px',
        transform: `rotate(${rotation}deg)`,
        transformOrigin: direction === 'right' ? 'left center' : 'right center',
        cursor: 'pointer',
        pointerEvents: 'all',
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'block',
      }}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      onMouseEnter={e => {
        const inner = e.currentTarget.querySelector<HTMLDivElement>('.sign-inner')
        if (inner) {
          inner.style.background = SIGN_BG_HOVER
          inner.style.backgroundImage = WOOD_GRAIN
          inner.style.boxShadow = '0 0 20px rgba(255,184,0,0.6), 0 0 40px rgba(255,184,0,0.25)'
        }
        const text = e.currentTarget.querySelector<HTMLSpanElement>('.sign-text')
        if (text) text.style.color = '#FFF8D0'
        if (lanternRef.current) {
          gsap.to(lanternRef.current, { opacity: 1, duration: 0.2 })
        }
      }}
      onMouseLeave={e => {
        const inner = e.currentTarget.querySelector<HTMLDivElement>('.sign-inner')
        if (inner) {
          inner.style.background = SIGN_BG
          inner.style.backgroundImage = WOOD_GRAIN
          inner.style.boxShadow = '0 0 8px rgba(255,140,30,0.2)'
        }
        const text = e.currentTarget.querySelector<HTMLSpanElement>('.sign-text')
        if (text) text.style.color = '#F5DFA0'
        if (lanternRef.current) {
          gsap.to(lanternRef.current, { opacity: 0.9, duration: 0.3 })
        }
      }}
    >
      <div
        className="sign-inner"
        style={{
          width: '100%',
          height: '100%',
          background: SIGN_BG,
          backgroundImage: WOOD_GRAIN,
          clipPath,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 0 8px rgba(255,140,30,0.2)',
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Nail dots */}
        <div style={{
          position: 'absolute',
          left:  direction === 'right' ? '10px' : 'auto',
          right: direction === 'left'  ? '10px' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#3A1A00',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>
        <span
          className="sign-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#F5DFA0',
            pointerEvents: 'none',
            paddingLeft:  direction === 'right' ? '22px' : '4px',
            paddingRight: direction === 'left'  ? '22px' : '4px',
            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
            transition: 'color 0.2s ease',
          }}
        >
          {label}
        </span>
      </div>
    </button>
  )
}

export default function CaveSignpost({ onSignClick }: { onSignClick?: (section: string) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lanternRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const lantern = lanternRef.current
    if (!wrapper || !lantern) return

    gsap.to(wrapper, {
      filter: 'brightness(1.18)',
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    gsap.to(lantern, {
      opacity: 0.78,
      duration: 0.32 + Math.random() * 0.28,
      yoyo: true,
      repeat: -1,
      ease: 'none',
      delay: 0.17,
    })

    return () => {
      gsap.killTweensOf(wrapper)
      gsap.killTweensOf(lantern)
    }
  }, [])

  const signs = [
    { label: 'HOW TO BUY',  top: 60,  rotation: -8,  direction: 'right' as const, width: 210 },
    { label: 'LIVE CHART',  top: 155, rotation: 10,  direction: 'right' as const, width: 195 },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: '60px',
      left: '58%',
      zIndex: 20,
      pointerEvents: 'all',
    }}>
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '300px', height: '280px', filter: 'brightness(1)' }}
      >
        {/* Vertical post */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          width: '28px',
          height: '240px',
          background: POST_BG,
          backgroundImage: WOOD_GRAIN,
          borderRadius: '4px 4px 0 0',
          boxShadow: '3px 0 8px rgba(0,0,0,0.5), -1px 0 4px rgba(0,0,0,0.3)',
        }} />

        {/* Post cap */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          width: '40px',
          height: '12px',
          background: '#5A3510',
          borderRadius: '4px 4px 0 0',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.4)',
        }} />

        {/* Lantern hook */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '-26px',
          width: '6px',
          height: '26px',
          background: '#3A2008',
          borderRadius: '3px 3px 0 0',
        }} />

        {/* Lantern body */}
        <div
          ref={lanternRef}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '-70px',
            width: '34px',
            height: '44px',
            background: 'linear-gradient(180deg, #221408, #3a2010)',
            border: '2px solid rgba(255,160,50,0.5)',
            borderRadius: '5px',
            boxShadow: '0 0 18px rgba(255,160,50,0.8), 0 0 50px rgba(255,160,50,0.35), 0 0 80px rgba(255,120,20,0.15)',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: '4px',
            background: 'radial-gradient(circle, rgba(255,190,60,0.85) 0%, rgba(255,120,20,0.4) 60%, transparent 100%)',
            borderRadius: '3px',
          }} />
        </div>

        {/* Lantern ambient light pool on post top */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '-10px',
          width: '120px',
          height: '60px',
          background: 'radial-gradient(ellipse, rgba(255,160,50,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Signs */}
        {signs.map(s => (
          <SignArrow
            key={s.label}
            label={s.label}
            top={s.top}
            rotation={s.rotation}
            direction={s.direction}
            width={s.width}
            onClick={() => onSignClick?.(s.label)}
            lanternRef={lanternRef}
          />
        ))}

        {/* Post base */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '240px',
          width: '42px',
          height: '16px',
          background: '#3A2008',
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.7)',
        }} />
      </div>
    </div>
  )
}
