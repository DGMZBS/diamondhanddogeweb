'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

const SPARKLE_COUNT = 7

function CaveTransitionInner() {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const jagsRef = useRef<HTMLDivElement>(null)
  const sparkleRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const overlay = overlayRef.current
    const jags = jagsRef.current
    if (!overlay || !jags) return

    const tl = gsap.timeline()

    // Rocky cliff slides up from below — translate from 100vh to 0
    tl.fromTo(
      [overlay, jags],
      { y: '100%' },
      { y: '0%', duration: 0.7, ease: 'power2.in' }
    )

    // Sparkles burst upward from the jagged top edge
    sparkleRefs.current.forEach((el, i) => {
      if (!el) return
      tl.fromTo(
        el,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1.4,
          x: gsap.utils.random(-80, 80),
          y: gsap.utils.random(-100, -50),
          duration: 0.22,
          ease: 'power2.out',
        },
        0.25 + i * 0.05
      )
      tl.to(
        el,
        { opacity: 0, scale: 0, duration: 0.28, ease: 'power1.in' },
        0.47 + i * 0.05
      )
    })

    // Navigate once fully covered
    tl.call(() => router.push('/cave'), undefined, 0.72)

    return () => { tl.kill() }
  }, [router])

  // Distribute sparkles evenly across the top of the overlay
  const sparklePositions = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
    left: `${8 + i * (84 / (SPARKLE_COUNT - 1))}%`,
    top: '0px',
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* Main dark cave overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#05081A',
          zIndex: 1,
        }}
      />

      {/* Jagged rocky top edge — SVG silhouette that sits on top of the overlay */}
      <div
        ref={jagsRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-60px',  // bleeds above overlay so it's visible as the cliff rises
          height: '60px',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* Rocky jagged peaks */}
          <path
            d="M0,60 L0,40 L80,15 L160,38 L240,8 L320,32 L400,5 L480,28 L560,12 L640,35 L720,0 L800,30 L880,10 L960,38 L1040,6 L1120,28 L1200,18 L1280,42 L1360,12 L1440,35 L1440,60 Z"
            fill="#05081A"
          />
          {/* Green crystal glow along top edge */}
          <path
            d="M0,40 L80,15 L160,38 L240,8 L320,32 L400,5 L480,28 L560,12 L640,35 L720,0 L800,30 L880,10 L960,38 L1040,6 L1120,28 L1200,18 L1280,42 L1360,12 L1440,35"
            fill="none"
            stroke="rgba(0,255,136,0.6)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Crystal sparkles — positioned along the jagged top */}
      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          ref={el => { sparkleRefs.current[i] = el }}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 10px var(--accent-green), 0 0 20px rgba(0,255,136,0.5)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function CaveTransition() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(<CaveTransitionInner />, document.body)
}
