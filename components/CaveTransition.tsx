'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

interface CaveTransitionProps {
  onCancel?: () => void
}

const SPARKLE_COUNT = 7

export default function CaveTransition({ onCancel }: CaveTransitionProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const tl = gsap.timeline({
      onComplete: () => {
        router.push('/cave')
      },
    })

    // Step 1 — rocky shape rises from bottom (clip-path animation)
    // Start: polygon fully below viewport (all points at 100% y)
    // End: polygon covers full screen
    tl.fromTo(
      overlay,
      {
        clipPath:
          'polygon(0% 100%, 8% 100%, 14% 100%, 22% 100%, 28% 100%, 35% 100%, 42% 100%, 50% 100%, 58% 100%, 65% 100%, 72% 100%, 80% 100%, 86% 100%, 94% 100%, 100% 100%, 100% 100%, 0% 100%)',
        opacity: 1,
      },
      {
        clipPath:
          'polygon(0% 100%, 8% 72%, 14% 58%, 22% 68%, 28% 48%, 35% 62%, 42% 40%, 50% 55%, 58% 38%, 65% 60%, 72% 44%, 80% 65%, 86% 50%, 94% 70%, 100% 55%, 100% 0%, 0% 0%)',
        duration: 0.75,
        ease: 'power2.in',
      }
    )

    // Step 2 — sparkles burst from rocky top edge, staggered
    sparklesRef.current.forEach((el, i) => {
      if (!el) return
      const xPos = 10 + i * (80 / (SPARKLE_COUNT - 1)) // spread across 10%–90% width
      const xDrift = gsap.utils.random(-60, 60)
      const yDrift = gsap.utils.random(-120, -60)

      gsap.set(el, {
        left: `${xPos}%`,
        top: '50%',
        opacity: 0,
        scale: 0,
      })

      tl.to(
        el,
        {
          opacity: 1,
          scale: 1.4,
          x: xDrift,
          y: yDrift,
          duration: 0.25,
          ease: 'power2.out',
        },
        0.3 + i * 0.06
      )

      tl.to(
        el,
        {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'power1.in',
        },
        0.55 + i * 0.06
      )
    })

    return () => {
      tl.kill()
    }
  }, [router])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'all',
      }}
      onClick={onCancel}
    >
      {/* Rocky cave overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#05081A',
          boxShadow: 'inset 0 -4px 40px rgba(0, 255, 136, 0.15)',
        }}
      />

      {/* Crystal sparkles */}
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) sparklesRef.current[i] = el }}
          style={{
            position: 'absolute',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 12px var(--accent-green), 0 0 24px rgba(0,255,136,0.6)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  )
}
