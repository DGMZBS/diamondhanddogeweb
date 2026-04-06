'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Total animation duration in ms — keep in sync with CSS below
const NAV_DELAY = 900

function CaveTransitionInner() {
  useEffect(() => {
    // Instantly scroll to top so the footer is out of view before the animation starts
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const t = setTimeout(() => {
      window.location.href = '/cave'
    }, NAV_DELAY)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* Dark cave overlay — slides up from below */}
      <div className="ct-overlay" />

      {/* SVG jagged rocky peaks — ride up with the overlay */}
      <div className="ct-jags">
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="M0,64 L0,42 L80,16 L160,40 L240,10 L320,34 L400,6 L480,30 L560,14 L640,36 L720,2 L800,32 L880,12 L960,40 L1040,8 L1120,30 L1200,20 L1280,44 L1360,14 L1440,36 L1440,64 Z"
            fill="#05081A"
          />
          <path
            d="M0,42 L80,16 L160,40 L240,10 L320,34 L400,6 L480,30 L560,14 L640,36 L720,2 L800,32 L880,12 L960,40 L1040,8 L1120,30 L1200,20 L1280,44 L1360,14 L1440,36"
            fill="none"
            stroke="rgba(0,255,136,0.7)"
            strokeWidth="2.5"
            filter="url(#ctGlow)"
          />
          <defs>
            <filter id="ctGlow" x="-10%" y="-100%" width="120%" height="400%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Crystal sparkles that burst from the rocky edge */}
      {[8, 21, 34, 47, 60, 73, 86].map((left, i) => (
        <div
          key={i}
          className="ct-sparkle"
          style={{
            left: `${left}%`,
            animationDelay: `${0.28 + i * 0.05}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes ct-rise {
          from { transform: translateY(100%); }
          to   { transform: translateY(0%); }
        }

        @keyframes ct-sparkle {
          0%   { opacity: 0; transform: translateY(0)   scale(0); }
          40%  { opacity: 1; transform: translateY(-80px) scale(1.3); }
          100% { opacity: 0; transform: translateY(-130px) scale(0); }
        }

        .ct-overlay {
          position: absolute;
          inset: 0;
          background: #05081A;
          animation: ct-rise 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .ct-jags {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 100%;   /* sits just above the overlay */
          height: 64px;
          animation: ct-rise 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .ct-sparkle {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00FF88;
          box-shadow: 0 0 10px #00FF88, 0 0 22px rgba(0,255,136,0.5);
          animation: ct-sparkle 0.55s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default function CaveTransition() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return createPortal(<CaveTransitionInner />, document.body)
}
