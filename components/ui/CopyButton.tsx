'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  className?: string
  /** When true, shows the full address text inline and makes the whole row clickable */
  fullAddress?: boolean
}

export default function CopyButton({ text, className = '', fullAddress = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.focus()
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (fullAddress) {
    return (
      <button
        onClick={handleCopy}
        aria-label="Copy contract address"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: copied ? 'rgba(0,212,255,0.08)' : 'rgba(255,184,0,0.06)',
          border: `1px solid ${copied ? 'var(--border-active)' : 'rgba(255,184,0,0.25)'}`,
          borderRadius: '8px',
          padding: '8px 14px',
          cursor: 'pointer',
          transition: 'background 0.2s, border-color 0.2s',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: copied ? 'var(--accent-cyan)' : 'var(--accent-gold)',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'all',
        }}
      >
        <span>{text}</span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-display)',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: copied ? 'var(--accent-cyan)' : 'var(--text-secondary)',
          flexShrink: 0,
        }}>
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${className}`}
      style={{
        background: copied ? 'var(--accent-cyan-dim)' : 'var(--bg-elevated)',
        color: copied ? 'var(--accent-cyan)' : 'var(--text-secondary)',
        border: `1px solid ${copied ? 'var(--border-active)' : 'var(--border-subtle)'}`,
        fontFamily: 'var(--font-body)',
      }}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}
