'use client'

import { LINKS } from '@/lib/constants'

export default function LiveChartPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Iframe embed */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        background: '#0d1117',
      }}>
        <iframe
          src={`${LINKS.chartEmbed}&tab=chart`}
          title="DHD Live Chart"
          style={{
            display: 'block',
            width: '100%',
            height: 'clamp(320px, 55vh, 520px)',
            border: 'none',
          }}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>

      {/* Quick stats row */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <a
          href={LINKS.dexscreener}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            minWidth: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '12px 20px',
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-cyan)',
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid var(--border-active)',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.12)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          📊 Open Full Chart
        </a>

        <a
          href={LINKS.raydium}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            minWidth: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '12px 20px',
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#05081A',
            background: 'var(--accent-cyan)',
            border: 'none',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(0,212,255,0.4)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.65)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ⚡ Buy on Raydium
        </a>
      </div>
    </div>
  )
}
