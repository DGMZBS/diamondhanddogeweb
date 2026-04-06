'use client'

import { useState, useEffect } from 'react'
import IntroAnimation from '@/components/IntroAnimation'
import AboutSection from '@/components/AboutSection'
import CaveTransition from '@/components/CaveTransition'

const INTRO_KEY = 'dhd_intro_seen'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(true)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY)
    if (!seen) {
      setIntroComplete(false)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, '1')
    setIntroComplete(true)
  }

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {introComplete && (
        <AboutSection onEnterCave={() => setTransitioning(true)} />
      )}

      {/* Rendered at root level — no overflow:hidden or transform ancestors */}
      {transitioning && <CaveTransition />}
    </>
  )
}
