'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'dhd_announce_buyback_burns_v1'

export default function CaveAnnouncement() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="cave-announce"
          style={{
            position: 'fixed',
            top: '88px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1015,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 18px 14px 22px',
            background: 'linear-gradient(135deg, rgba(255,184,0,0.18), rgba(255,100,0,0.08))',
            border: '1px solid rgba(255,184,0,0.6)',
            borderRadius: '14px',
            boxShadow: '0 0 32px rgba(255,184,0,0.25), 0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>🚨</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFD86B',
            textShadow: '0 0 12px rgba(255,184,0,0.4)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            Update: Buy Back Burns EVERY MONTH!
          </span>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            style={{
              flexShrink: 0,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255,184,0,0.12)',
              border: '1px solid rgba(255,184,0,0.4)',
              color: '#FFD86B',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,184,0,0.25)'
              e.currentTarget.style.borderColor = 'rgba(255,184,0,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,184,0,0.12)'
              e.currentTarget.style.borderColor = 'rgba(255,184,0,0.4)'
            }}
          >
            ✕
          </button>

          <style>{`
            @media (max-width: 767px) {
              .cave-announce {
                top: 80px !important;
                padding: 10px 12px 10px 14px !important;
                gap: 8px !important;
                left: 16px !important;
                right: 16px !important;
                transform: none !important;
                max-width: none !important;
              }
              .cave-announce > span:nth-child(2) {
                font-size: 10px !important;
                letter-spacing: 0.06em !important;
                white-space: normal !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
