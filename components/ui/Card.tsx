'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Card({ children, className = '', style }: CardProps) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] ${className}`}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 0 24px rgba(0, 212, 255, 0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
