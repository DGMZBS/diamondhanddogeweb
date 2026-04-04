'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
