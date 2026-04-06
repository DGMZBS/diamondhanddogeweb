'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CaveWorld from '@/components/CaveWorld'

export default function CavePage() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' })
  }, [])

  return (
    <div ref={wrapRef} style={{ opacity: 0 }}>
      <CaveWorld />
    </div>
  )
}
