'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ArtifactPanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  soundEnabled?: boolean
  wide?: boolean
  children: React.ReactNode
}

export default function ArtifactPanel({ isOpen, onClose, title, soundEnabled, wide = false, children }: ArtifactPanelProps) {
  const echoRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isOpen && soundEnabled) {
      echoRef.current?.play().catch(() => {})
    }
  }, [isOpen, soundEnabled])

  // Trap scroll while panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <audio ref={echoRef} src="/sounds/cave-echo.mp3" preload="none" />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed overlay */}
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 200px, rgba(0,0,0,0.65) 700px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            />

            {/* Panel — stopPropagation so clicks inside don't close it */}
            <motion.div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'fixed',
                zIndex: 50,
                top: '50%',
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
                width: wide ? 'min(1000px, 96vw)' : 'min(680px, 96vw)',
                maxHeight: '92vh',
                overflowY: 'auto',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-active)',
                borderRadius: '16px',
                boxShadow: '0 0 60px rgba(0,212,255,0.12), 0 24px 80px rgba(0,0,0,0.6)',
                padding: 'clamp(24px, 4vw, 48px)',
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header — sticky so the ✕ button is always reachable */}
              <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <h2 style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  textShadow: '0 0 20px rgba(255,184,0,0.4)',
                }}>
                  {title}
                </h2>

                <button
                  onClick={onClose}
                  aria-label="Close panel"
                  style={{
                    flexShrink: 0,
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
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                    zIndex: 60,
                    position: 'relative',
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
                  ✕
                </button>
              </div>

              {/* Content */}
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
