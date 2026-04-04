'use client'

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'gold'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  external?: boolean
  children: React.ReactNode
}

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
    color: '#05081A',
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--accent-cyan)',
    border: '1px solid var(--accent-cyan)',
    boxShadow: 'none',
  },
  gold: {
    background: 'linear-gradient(135deg, #FFB800, #CC8800)',
    color: '#05081A',
    boxShadow: '0 0 20px rgba(255, 184, 0, 0.4)',
    border: 'none',
  },
}

const hoverStyles: Record<ButtonVariant, string> = {
  primary: 'hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] hover:-translate-y-0.5',
  secondary: 'hover:bg-[rgba(0,212,255,0.15)] hover:-translate-y-0.5',
  gold: 'hover:shadow-[0_0_40px_rgba(255,184,0,0.6)] hover:-translate-y-0.5',
}

export default function Button({
  variant = 'primary',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer ${hoverStyles[variant]} ${className}`

  const content = (
    <span style={styles[variant]} className={baseClass} {...(href ? {} : props)}>
      {children}
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-block"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      {...props}
      style={{ fontFamily: 'var(--font-display)', background: 'none', padding: 0, border: 'none', cursor: 'pointer' }}
    >
      {content}
    </button>
  )
}
