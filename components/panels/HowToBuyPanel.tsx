'use client'

import { CONTRACT_ADDRESS, LINKS } from '@/lib/constants'
import CopyButton from '@/components/ui/CopyButton'

const steps = [
  {
    num: '1',
    icon: '👛',
    title: 'Create a Wallet',
    body: 'Create any wallet of your choice — we recommend Phantom.',
    cta: { label: 'Get Phantom', href: LINKS.phantom },
  },
  {
    num: '2',
    icon: '💰',
    title: 'Fund Your Wallet',
    body: 'Fund your wallet with Solana. You can buy SOL from any major exchange.',
    cta: null,
  },
  {
    num: '3',
    icon: '🔄',
    title: 'Go to Raydium or DEX Screener',
    body: 'Visit Raydium DEX and connect your wallet to swap. Alternatively, use DEX Screener for cross-chain support and seamless transactions across multiple chains.',
    cta: { label: 'Open Raydium', href: LINKS.raydium },
  },
  {
    num: '4',
    icon: '💎',
    title: 'Swap for DHD',
    body: 'Paste the DHD contract address, set your slippage to 1–5%, and confirm your swap. Welcome to the pack!',
    contractAddress: true,
    cta: null,
  },
]

export default function HowToBuyPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {steps.map(step => (
        <div
          key={step.num}
          style={{
            position: 'relative',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '20px 24px',
            overflow: 'hidden',
          }}
        >
          {/* Watermark number */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: '72px',
            fontWeight: 900,
            color: 'var(--text-primary)',
            opacity: 0.04,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {step.num}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            {/* Icon */}
            <div style={{
              flexShrink: 0,
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255,184,0,0.08)',
              border: '1px solid rgba(255,184,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              {step.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '6px',
              }}>
                {step.title}
              </div>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}>
                {step.body}
              </p>

              {/* Contract address row */}
              {step.contractAddress && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '12px',
                  padding: '8px 12px',
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  borderRadius: '8px',
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.03em',
                    wordBreak: 'break-all',
                    flex: 1,
                  }}>
                    {CONTRACT_ADDRESS}
                  </span>
                  <CopyButton text={CONTRACT_ADDRESS} />
                </div>
              )}

              {/* Step CTA link */}
              {step.cta && (
                <a
                  href={step.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginTop: '10px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-cyan)',
                    textDecoration: 'none',
                    opacity: 0.85,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
                >
                  {step.cta.label} →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <a
          href={LINKS.raydium}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 20px',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#05081A',
            background: 'var(--accent-cyan)',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 0 28px rgba(0,212,255,0.45)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 44px rgba(0,212,255,0.7)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.45)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Buy on Raydium
        </a>
        <a
          href={LINKS.dexscreener}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 20px',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-cyan)',
            background: 'transparent',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          View on DEX Screener
        </a>
      </div>
    </div>
  )
}
