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
            gap: '16px',
            padding: '18px 22px 18px 26px',
            background: 'linear-gradient(135deg, rgba(180,20,30,0.92), rgba(120,10,20,0.92))',
            border: '2px solid rgba(255,80,90,0.85)',
            borderRadius: '14px',
            boxShadow: '0 0 40px rgba(220,40,50,0.55), 0 12px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          <span style={{ fontSize: '26px', lineHeight: 1, flexShrink: 0 }}>🚨</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textShadow: '0 0 14px rgba(255,80,90,0.6), 0 1px 2px rgba(0,0,0,0.5)',
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
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#FFFFFF',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
            }}
          >
            ✕
          </button>

          <style>{`
            @media (max-width: 767px) {
              .cave-announce {
                top: 80px !important;
                padding: 14px 14px 14px 16px !important;
                gap: 10px !important;
                left: 16px !important;
                right: 16px !important;
                transform: none !important;
                max-width: none !important;
              }
              .cave-announce > span:nth-child(2) {
                font-size: 13px !important;
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
