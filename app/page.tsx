'use client'

import { useState, useEffect } from 'react'
import IntroAnimation from '@/components/IntroAnimation'
import AboutSection from '@/components/AboutSection'
import CaveWorld from '@/components/CaveWorld'

const INTRO_KEY = 'dhd_intro_seen'

export default function Home() {
  // Start as true to avoid flash — will be corrected in useEffect
  const [introComplete, setIntroComplete] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY)
    if (!seen) {
      // First visit this session — show the intro
      setIntroComplete(false)
    }
    // If already seen, introComplete stays true → skip straight to content
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
        <>
          {/*
            CaveWorld: position fixed, z-index 1 — always in background.
            AboutSection: normal flow, z-index 10 — sits on top, scrolls away naturally.
            Once the user scrolls past AboutSection, the fixed CaveWorld is revealed.
          */}
          <CaveWorld />

          <main style={{ position: 'relative', zIndex: 10 }}>
            {/* About section — first thing user sees after intro */}
            <AboutSection />

            {/* Scroll anchor + spacer so the page has height beyond AboutSection.
                Scrolling to this div reveals the fixed CaveWorld beneath. */}
            <div id="cave" style={{ height: '100vh' }} />
          </main>
        </>
      )}
    </>
  )
}
