'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  createInitialState,
  drawScene,
  AnimationState,
  Rock,
  BridgeSegment,
} from '@/lib/introCanvas'

// BridgeSegment reused for rail debris (same shape interface)

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const stateRef = useRef<AnimationState | null>(null)
  const [skipVisible, setSkipVisible] = useState(false)
  const completedRef = useRef(false)

  const finish = (fast = false) => {
    if (completedRef.current) return
    completedRef.current = true
    cancelAnimationFrame(rafRef.current)
    tlRef.current?.kill()
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: fast ? 0.3 : 0.6,
      ease: 'power2.inOut',
      onComplete,
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

    const isMobile = window.innerWidth < 768

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (stateRef.current) {
        const s = stateRef.current
        s.cartY      = canvas.height * 0.58
        s.tntX       = canvas.width  * 0.75
        s.explosionX = canvas.width  * 0.75
        s.explosionY = canvas.height * 0.50
        s.pedestalX  = canvas.width  * 0.52
        s.pedestalY  = canvas.height * 0.48
      }
    }
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    window.addEventListener('resize', resize)

    const state = createInitialState(canvas.width, canvas.height)
    stateRef.current = state

    // RAF draw loop — ctx cached outside loop for performance
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawScene(ctx, canvas.width, canvas.height, state)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // Skip visible after 1.5s
    const skipTimer = setTimeout(() => setSkipVisible(true), 1500)

    // ── GSAP Master Timeline ─────────────────────────────────────────────────
    const tl = gsap.timeline()
    tlRef.current = tl

    // ── Continuous background tweens (run forever, outside main TL) ──────────
    // Wheel spin
    gsap.to(state, {
      wheelAngle: Math.PI * 2,
      duration: 0.7,
      ease: 'none',
      repeat: -1,
      modifiers: { wheelAngle: (v: string) => parseFloat(v) % (Math.PI * 2) },
    })
    // Cart bob
    gsap.to(state, { cartBobY: 5, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    // Lantern flicker
    gsap.to(state, { lantern1: 0.6,  duration: 0.28, yoyo: true, repeat: -1, ease: 'none' })
    gsap.to(state, { lantern2: 0.5,  duration: 0.42, yoyo: true, repeat: -1, ease: 'none', delay: 0.15 })
    gsap.to(state, { lantern3: 0.7,  duration: 0.33, yoyo: true, repeat: -1, ease: 'none', delay: 0.08 })
    // Crystal pulse
    gsap.to(state, { crystal1: 1.0, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    gsap.to(state, { crystal2: 1.0, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8 })
    gsap.to(state, { crystal3: 1.0, duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 })
    gsap.to(state, { crystal4: 1.0, duration: 3.0, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.4 })

    // ════════════════════════════════════════════════════════════════════════════
    // TIMELINE (~6.5s) — Cart never stops. Rocks slam hard. Bridge blows behind.
    //
    //  0.0s ── Cart blasts in from left at full speed
    //  0.5s ── MASSIVE rocks slam down — cart swerves hard to dodge
    //  1.4s ── TNT crate appears on track ahead, fuse burning
    //  2.0s ── Cart blows past TNT — it explodes BEHIND cart, chain reaction:
    //           3 trailing TNTs detonate left-to-right, bridge planks fly apart
    //  3.0s ── Cart rockets off right edge amid falling debris
    //  3.4s ── Fade to black — scene cut
    //  3.7s ── Entrance scene: narrow tunnel, glowing DHD doorway
    //  4.0s ── Cart rolls in still moving, decelerates toward doorway
    //  5.2s ── Doge looks up in awe at the DHD glow
    //  5.8s ── Hold → Stage 6
    // ════════════════════════════════════════════════════════════════════════════

    // Physics ticker helper — drives a single flying segment with gravity
    const physicsSegment = (seg: BridgeSegment, gravity: number, lifetime: number) => {
      let elapsed = 0
      const ticker = gsap.ticker.add((_, deltaTime) => {
        const dt = deltaTime / 1000
        elapsed += dt
        seg.x += seg.vx * dt
        seg.vy += gravity * dt
        seg.y += seg.vy * dt
        seg.rotation += seg.rotSpeed * dt
        seg.opacity = Math.max(0, 1 - elapsed / lifetime)
        if (elapsed > lifetime) gsap.ticker.remove(ticker)
      })
      return ticker
    }

    // Helper: spawn bridge planks + rail pieces flying from a blast point
    const spawnBridgeBlast = (blastX: number) => {
      const segCount = isMobile ? 5 : 8
      for (let i = 0; i < segCount; i++) {
        const angle = -Math.PI * 0.8 - Math.random() * Math.PI * 0.6
        const speed = 280 + Math.random() * 220
        const seg: BridgeSegment = {
          x: blastX + (Math.random() - 0.5) * 80,
          y: canvas.height * 0.66,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
          width: 35 + Math.random() * 25,
          height: 10 + Math.random() * 6,
          launched: true,
        }
        state.bridgeSegments.push(seg)
        physicsSegment(seg, 420, 1.2)
      }

      // Rail pieces — longer, thinner, fly outward more horizontally
      const railCount = isMobile ? 3 : 5
      for (let i = 0; i < railCount; i++) {
        const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.9
        const speed = 220 + Math.random() * 280
        const railSeg: BridgeSegment = {
          x: blastX + (Math.random() - 0.5) * 60,
          y: canvas.height * 0.655,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
          width: 60 + Math.random() * 50,   // long rail bar
          height: 6 + Math.random() * 3,    // thin
          launched: true,
        }
        state.railSegments.push(railSeg)
        physicsSegment(railSeg, 380, 1.5)
      }
    }

    // ── 0.0s: Cart blasts in ─────────────────────────────────────────────────
    tl.addLabel('enter', 0)
    tl.to(state, {
      cartX: canvas.width + 320,
      duration: 4.3,
      ease: 'none',
    }, 'enter')

    // ── 0.5s: MASSIVE ROCKS — slam hard, cart swerves violently ──────────────
    tl.addLabel('rocks', 0.5)

    const rockDefs = isMobile
      ? [
          { xFrac: 0.25, delay: 0.00, size: 55 },
          { xFrac: 0.45, delay: 0.20, size: 70 },
          { xFrac: 0.18, delay: 0.38, size: 48 },
          { xFrac: 0.38, delay: 0.54, size: 62 },
        ]
      : [
          { xFrac: 0.22, delay: 0.00, size: 58 },
          { xFrac: 0.40, delay: 0.14, size: 72 },
          { xFrac: 0.16, delay: 0.25, size: 50 },
          { xFrac: 0.54, delay: 0.35, size: 80 },
          { xFrac: 0.32, delay: 0.44, size: 64 },
          { xFrac: 0.46, delay: 0.53, size: 55 },
        ]

    rockDefs.forEach((rd) => {
      tl.call(() => {
        const newRock: Rock = {
          x: canvas.width * rd.xFrac + (Math.random() - 0.5) * 24,
          y: -80 - Math.random() * 40,
          rotation: Math.random() * Math.PI,
          size: rd.size,
          speedY: 0,
          opacity: 1,
          hit: false,
          puffProgress: 0,
        }
        state.rocks.push(newRock)

        // Slam hard — fast fall
        gsap.to(newRock, {
          y: canvas.height * 0.60 + Math.random() * 18,
          rotation: newRock.rotation + Math.PI * (2 + Math.random()),
          duration: 0.32 + Math.random() * 0.10,
          ease: 'power4.in',   // accelerate hard into the ground
          onComplete: () => {
            newRock.hit = true
            gsap.to(newRock, { puffProgress: 1, duration: 0.28, ease: 'power1.out' })
            // Each rock impact shakes the screen
            gsap.to(state, {
              keyframes: [
                { shakeX: -10, shakeY: -6, duration: 0.04 },
                { shakeX: 10,  shakeY: 5,  duration: 0.04 },
                { shakeX: -6,  shakeY: -3, duration: 0.04 },
                { shakeX: 0,   shakeY: 0,  duration: 0.04 },
              ],
            })
          },
        })

        // Doge swerves hard
        state.dogeExpression = 'scared'
        gsap.to(state, {
          cartBobY: -24,
          duration: 0.15,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(state, { cartBobY: 0, duration: 0.20, ease: 'power2.in' })
          },
        })
        setTimeout(() => { state.dogeExpression = 'confident' }, 280)
      }, [], `rocks+=${rd.delay}`)
    })

    // ── 1.4s: TNT on track ahead — fuse burning ───────────────────────────────
    tl.addLabel('tnt', 1.4)
    tl.call(() => {
      state.tntVisible = true
      state.tntX = canvas.width * 0.78
      state.fuseLength = 1
      state.dogeExpression = 'scared'
    }, [], 'tnt')
    tl.to(state, { fuseLength: 0, duration: 0.55, ease: 'none' }, 'tnt')

    // ── 2.0s: CHAIN EXPLOSION — cart already past TNT, bridge blows behind ────
    tl.addLabel('explode', 2.0)
    tl.call(() => {
      state.tntVisible = false
      state.explosionActive = true
      state.explosionProgress = 0
      state.explosionX = canvas.width * 0.78
      state.explosionY = canvas.height * 0.50

      // Trailing TNTs detonate left → right: 0.34 → 0.48 → 0.62 → primary at 0.78
      // Each one pushes railIntactFromX further right, peeling the track away in a domino
      const trailPositions = [0.34, 0.48, 0.62, 0.78]
      trailPositions.forEach((xf, i) => {
        const isPrimary = i === trailPositions.length - 1
        setTimeout(() => {
          if (!isPrimary) {
            const t = { x: canvas.width * xf, fuseLength: 1, exploded: true }
            state.trailingTNTs.push(t)
          }

          // Secondary / primary explosion
          const ex = { x: canvas.width * xf, y: canvas.height * 0.50, progress: 0 }
          state.secondaryExplosions.push(ex)
          gsap.to(ex, { progress: 1, duration: 0.4, ease: 'power2.out' })

          // Advance the destroyed-track front rightward past this explosion
          gsap.to(state, { railIntactFromX: canvas.width * xf + 20, duration: 0.18, ease: 'power3.out' })

          // Bridge planks + rail pieces fly from this blast
          spawnBridgeBlast(canvas.width * xf)

          // Per-explosion shake
          gsap.to(state, {
            keyframes: [
              { shakeX: -(10 - i * 2), shakeY: -(5 - i), duration: 0.04 },
              { shakeX:  (12 - i * 2), shakeY:  (4 - i), duration: 0.04 },
              { shakeX: -(7 - i),      shakeY: -2,        duration: 0.04 },
              { shakeX:  0,            shakeY:  0,         duration: 0.04 },
            ],
          })
        }, i * 260)
      })
    }, [], 'explode')

    // Primary explosion tween
    tl.to(state, { explosionProgress: 1, duration: 0.42, ease: 'power2.out' }, 'explode')

    // Big initial shake from primary blast
    tl.to(state, {
      keyframes: [
        { shakeX: -18, shakeY: -9, duration: 0.04 },
        { shakeX: 20,  shakeY: 8,  duration: 0.04 },
        { shakeX: -14, shakeY: -6, duration: 0.04 },
        { shakeX: 16,  shakeY: 5,  duration: 0.04 },
        { shakeX: -9,  shakeY: -3, duration: 0.04 },
        { shakeX: 8,   shakeY: 2,  duration: 0.04 },
        { shakeX: -4,  shakeY: -1, duration: 0.04 },
        { shakeX: 0,   shakeY: 0,  duration: 0.04 },
      ],
    }, 'explode')

    // Also blast rocks flying when bridge blows
    tl.call(() => {
      // Spawn extra large flying rocks from the explosion zone
      for (let ri = 0; ri < (isMobile ? 3 : 5); ri++) {
        const blastRock: Rock = {
          x: canvas.width * (0.5 + Math.random() * 0.3),
          y: canvas.height * 0.62,
          rotation: Math.random() * Math.PI,
          size: 35 + Math.random() * 30,
          speedY: 0,
          opacity: 1,
          hit: false,
          puffProgress: 0,
        }
        state.rocks.push(blastRock)
        // Fly upward and outward from explosion
        gsap.to(blastRock, {
          y: canvas.height * 0.2 + Math.random() * canvas.height * 0.2,
          x: blastRock.x + (Math.random() - 0.5) * 200,
          rotation: blastRock.rotation + Math.PI * 4,
          duration: 0.55 + Math.random() * 0.2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(blastRock, { opacity: 0, duration: 0.3 })
          },
        })
      }
    }, [], 'explode+=0.05')

    // Clean up primary explosion
    tl.call(() => {
      state.explosionActive = false
      state.dogeExpression = 'confident'
    }, [], 'explode+=0.5')

    // ── 3.0s: Cart already off right edge, clean up ────────────────────────────
    tl.addLabel('escape', 2.9)
    tl.call(() => {
      state.dogeExpression = 'scared'
      state.rocks = []
    }, [], 'escape')

    // ── 3.4s: Fade to black ───────────────────────────────────────────────────
    tl.addLabel('fadeOut', 3.4)
    tl.to(state, { fadeOverlay: 1, duration: 0.24, ease: 'power2.in' }, 'fadeOut')

    // ── 3.65s: Switch scene ───────────────────────────────────────────────────
    tl.call(() => {
      state.scene = 'entrance'
      state.entranceCartX = -280
      state.dogeExpression = 'confident'
      state.cartBobY = 0
      state.rocks = []
      state.bridgeSegments = []
      state.railSegments = []
      state.railIntactFromX = 0
      state.trailingTNTs = []
      state.secondaryExplosions = []
    }, [], 'fadeOut+=0.25')

    // ── 3.85s: Entrance fades in ──────────────────────────────────────────────
    tl.addLabel('fadeIn', 3.85)
    tl.to(state, { fadeOverlay: 0, duration: 0.35, ease: 'power2.out' }, 'fadeIn')

    gsap.to(state, {
      entranceGlow: 1, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3.85,
    })

    // ── 4.1s: Cart rolls in toward the glow ──────────────────────────────────
    tl.addLabel('approach', 4.1)
    tl.to(state, {
      entranceCartX: canvas.width * 0.38,
      duration: 1.0,
      ease: 'power2.out',
    }, 'approach')

    // Final slow creep toward entrance
    tl.to(state, {
      entranceCartX: canvas.width * 0.35,
      duration: 0.5,
      ease: 'power3.out',
    })

    tl.call(() => { state.dogeExpression = 'awe' }, [], '+=0.1')

    // ── Stage 6: Coin discovery ───────────────────────────────────────────────
    // 5.8s  Doge arrives in awe. Coin bursts from doorway.
    // 6.0s  Coin flies toward camera (scale up), spinning
    // 6.8s  Coin lands center-screen, spinning slows
    // 7.1s  Welcome title fades in
    // 7.5s  Subtitle fades in
    // 8.4s  Hold → fade out → finish

    tl.addLabel('holdForCoin', 5.8)

    // Spawn coin from inside the doorway
    tl.call(() => {
      state.coinVisible = true
      state.coinX = canvas.width * 0.5
      state.coinY = canvas.height * 0.42
      state.coinScale = 0.12
      state.coinOpacity = 0
      state.coinSpin = 0
    }, [], 'holdForCoin+=0.2')

    // Burst out: scale up fast, fly slightly upward toward camera center
    tl.to(state, {
      coinOpacity: 1,
      coinScale: 1.15,
      coinY: canvas.height * 0.38,
      duration: 0.55,
      ease: 'back.out(1.4)',
    }, 'holdForCoin+=0.2')

    // Coin spin (continuous, 3 full rotations over 0.9s)
    tl.to(state, {
      coinSpin: 3,
      duration: 0.9,
      ease: 'power2.out',
    }, 'holdForCoin+=0.2')

    // Settle into center position
    tl.to(state, {
      coinScale: 1.0,
      coinY: canvas.height * 0.40,
      duration: 0.35,
      ease: 'power2.inOut',
    }, 'holdForCoin+=0.75')

    // Gentle float bob after landing
    tl.call(() => {
      gsap.to(state, {
        coinY: state.coinY - 8,
        duration: 1.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      // Slow continuous spin to show it's alive
      gsap.to(state, {
        coinSpin: state.coinSpin + 20,
        duration: 14,
        ease: 'none',
        repeat: -1,
      })
    }, [], 'holdForCoin+=1.1')

    // Title appears
    tl.addLabel('welcomeText', 'holdForCoin+=1.3')
    tl.to(state, {
      welcomeTextOpacity: 1,
      duration: 0.55,
      ease: 'power2.out',
    }, 'welcomeText')

    // Subtitle fades in after title
    tl.to(state, {
      welcomeSubOpacity: 1,
      duration: 0.45,
      ease: 'power2.out',
    }, 'welcomeText+=0.38')

    // Hold, then fade out and finish
    tl.addLabel('endHold', 'holdForCoin+=3.2')
    tl.to(state, { fadeOverlay: 1, duration: 0.5, ease: 'power2.in' }, 'endHold')
    tl.call(() => { finish(false) }, [], 'endHold+=0.55')

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(skipTimer)
      tl.kill()
      gsap.killTweensOf(state)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#05081A',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
      />

      <button
        onClick={() => {
          const s = stateRef.current
          const c = canvasRef.current
          if (s && c) {
            s.scene = 'entrance'
            s.entranceCartX = c.width * 0.34
            s.dogeExpression = 'awe'
            s.fadeOverlay = 0
            s.coinVisible = false
            s.welcomeTextOpacity = 0
            s.welcomeSubOpacity = 0
          }
          tlRef.current?.seek('holdForCoin')
          setTimeout(() => finish(true), 300)
        }}
        aria-label="Skip intro"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'transparent',
          border: '1px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-display)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '8px 18px',
          cursor: 'pointer',
          borderRadius: '4px',
          opacity: skipVisible ? 1 : 0,
          transition: 'opacity 0.6s ease, background 0.2s ease',
          zIndex: 10000,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        SKIP INTRO ›
      </button>
    </div>
  )
}
