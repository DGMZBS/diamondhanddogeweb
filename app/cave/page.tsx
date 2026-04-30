'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useIsMobile } from '@/hooks/useIsMobile'
import CaveWorld from '@/components/CaveWorld'
import MobileCave from '@/components/MobileCave'
import CaveAnnouncement from '@/components/CaveAnnouncement'

export default function CavePage() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!wrapRef.current) return
    gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' })
  }, [])

  return (
    <div ref={wrapRef} style={{ opacity: 0 }}>
      {isMobile ? <MobileCave /> : <CaveWorld />}
      <CaveAnnouncement />
    </div>
  )
}
