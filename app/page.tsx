'use client'

import { useState, useEffect } from 'react'
import IntroAnimation from '@/components/IntroAnimation'
import AboutSection from '@/components/AboutSection'

const INTRO_KEY = 'dhd_intro_seen'

export default function Home() {
  // Start as true to avoid flash — will be corrected in useEffect
  const [introComplete, setIntroComplete] = useState(true)

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
        <AboutSection />
      )}
    </>
  )
}
