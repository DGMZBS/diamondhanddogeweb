'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { drawDoge } from '@/lib/introCanvas'

const CW = 220   // canvas width
const CH = 260   // canvas height
// Doge is drawn at (CW/2, CH-30) with scale 1.3
// Body height ≈ 75px, head radius ≈ 36px → head top ≈ CH-30-75-72 ≈ 83

// Throne geometry (all in px, within a 260×300 scene container)
const SCENE_W = 260
const SCENE_H = 300
const BACK_W  = 210
const BACK_H  = 160
const BACK_L  = (SCENE_W - BACK_W) / 2           // 25
const BACK_T  = SCENE_H - 30 - 24 - BACK_H       // seat top = SCENE_H-30-24=246; back top = 246-160 = 86
const SEAT_W  = 230
const SEAT_H  = 24
const SEAT_T  = SCENE_H - 30 - SEAT_H            // 246
const SEAT_L  = (SCENE_W - SEAT_W) / 2           // 15
const ARM_W   = 24
const ARM_H   = 70
const ARM_T   = SEAT_T - ARM_H + SEAT_H          // armrest top aligns with seat top, extends up
const DOGE_L  = (SCENE_W - CW) / 2              // canvas left in scene = 20

function drawCoinAboveHead(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  bob: number,   // sine wave -1 to 1
  spinT: number  // time-based spin counter
) {
  const r = 18
  const y = cy + bob * 5
  // Outer glow
  const glow = ctx.createRadialGradient(cx, y, 0, cx, y, r * 2.2)
  glow.addColorStop(0, 'rgba(255,184,0,0.5)')
  glow.addColorStop(1, 'rgba(255,184,0,0)')
  ctx.save()
  ctx.globalAlpha = 0.8
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, y, r * 2.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Fake 3D spin: squish X
  const squish = Math.abs(Math.cos(spinT * Math.PI * 2))
  ctx.save()
  ctx.translate(cx, y)
  ctx.scale(squish, 1)
  // Body
  const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r)
  grad.addColorStop(0, '#FFE066')
  grad.addColorStop(0.6, '#FFB800')
  grad.addColorStop(1, '#A86800')
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()
  ctx.strokeStyle = '#8B5500'
  ctx.lineWidth = 2
  ctx.stroke()
  // Inner ring
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,220,80,0.6)'
  ctx.lineWidth = 1
  ctx.stroke()
  // DHD text
  ctx.fillStyle = '#3A1A00'
  ctx.font = `bold ${Math.round(r * 0.55)}px Orbitron, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('DHD', 0, 0)
  ctx.restore()
}

export default function DogeThrone() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const breathRef   = useRef({ scale: 1.0 })
  const targetRot   = useRef({ x: 0, y: 0 })
  const currentRot  = useRef({ x: 0, y: 0 })
  const rafRef      = useRef<number>(0)
  const dogeRafRef  = useRef<number>(0)
  const startTime   = useRef(Date.now())

  // Draw Doge + floating coin onto the canvas every frame
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = CW
    canvas.height = CH

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const loop = () => {
      ctx.clearRect(0, 0, CW, CH)
      const elapsed = (Date.now() - startTime.current) / 1000
      const bob  = Math.sin(elapsed * 2.2)         // -1 to 1 float
      const spin = (elapsed * 0.35) % 1            // slow continuous spin

      // Coin: centered above Doge head
      const headTopY = CH - 30 - 75 - 72           // ≈ 83
      drawCoinAboveHead(ctx, CW / 2, headTopY - 22, bob, spin)

      // Doge sitting: feet at CH-30
      drawDoge(ctx, CW / 2, CH - 30, 'confident', 1.3)

      dogeRafRef.current = requestAnimationFrame(loop)
    }
    dogeRafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(dogeRafRef.current)
  }, [])

  // GSAP breathing — updates breathRef, applied in the cursor lerp RAF
  useEffect(() => {
    gsap.to(breathRef.current, {
      scale: 1.025,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, [])

  // Cursor tracking (desktop) + breathing RAF
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768

    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      targetRot.current = {
        x: ((e.clientY - cy) / window.innerHeight) * -6,
        y: ((e.clientX - cx) / window.innerWidth)  *  6,
      }
    }

    if (isDesktop) window.addEventListener('mousemove', handleMouseMove)

    const lerp = () => {
      if (isDesktop) {
        const cur = currentRot.current
        const tgt = targetRot.current
        cur.x += (tgt.x - cur.x) * 0.08
        cur.y += (tgt.y - cur.y) * 0.08
        const wrapper = wrapperRef.current
        if (wrapper) {
          const s = breathRef.current.scale
          wrapper.style.transform =
            `translateX(-50%) scale(${s}) rotateX(${cur.x}deg) rotateY(${cur.y}deg)`
        }
      } else {
        const wrapper = wrapperRef.current
        if (wrapper) {
          wrapper.style.transform = `translateX(-50%) scale(${breathRef.current.scale})`
        }
      }
      rafRef.current = requestAnimationFrame(lerp)
    }
    rafRef.current = requestAnimationFrame(lerp)

    return () => {
      if (isDesktop) window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
      gsap.killTweensOf(breathRef.current)
    }
  }, [])

  // Diamond gem positions on throne back (CSS absolutely positioned)
  const gems = [
    { top: 30,  left: 38 },
    { top: 30,  left: 90 },
    { top: 30,  left: 142 },
    { top: 75,  left: 14 },
    { top: 75,  left: 166 },
    { top: 120, left: 38 },
    { top: 120, left: 90 },
    { top: 120, left: 142 },
  ]

  return (
    <div style={{
      position: 'absolute',
      bottom: '72px',
      left: '12%',
      zIndex: 5,
    }}>
      {/* Scene container — everything positioned within this */}
      <div style={{ position: 'relative', width: SCENE_W, height: SCENE_H }}>

        {/* ── LAYER 1: Throne back (behind Doge) ── */}
        <div style={{
          position: 'absolute',
          top: BACK_T,
          left: BACK_L,
          width: BACK_W,
          height: BACK_H,
          background: 'linear-gradient(160deg, #1a2040 0%, #0f1428 60%, #0a0e1e 100%)',
          border: '2px solid #FFB800',
          borderBottom: 'none',
          borderRadius: '10px 10px 0 0',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 0 24px rgba(255,184,0,0.2)',
          zIndex: 1,
          overflow: 'hidden',
        }}>
          {/* Gold crown trim at top */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #7A5A00, #FFD700, #FFB800, #FFD700, #FFE066, #FFD700, #FFB800, #7A5A00)',
            borderRadius: '10px 10px 0 0',
          }} />
          {/* Vertical gold inlay lines */}
          {[20, 95, 170].map(lx => (
            <div key={lx} style={{
              position: 'absolute',
              top: 8, bottom: 0,
              left: lx,
              width: '1px',
              background: 'linear-gradient(180deg, rgba(255,184,0,0.5), rgba(255,184,0,0))',
            }} />
          ))}
          {/* Horizontal gold band */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,184,0,0.4), transparent)',
          }} />
          {/* Diamond gem decorations */}
          {gems.map((g, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: g.top,
              left: g.left,
              width: '20px',
              height: '20px',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              background: 'linear-gradient(135deg, #88EEFF, #00D4FF, #006688)',
              boxShadow: '0 0 6px rgba(0,212,255,0.7)',
              opacity: 0.85,
            }} />
          ))}
          {/* DHD center emblem */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: 0, right: 0,
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '0.25em',
            color: '#FFB800',
            textShadow: '0 0 16px rgba(255,184,0,0.8)',
          }}>
            DHD
          </div>
        </div>

        {/* ── LAYER 2: Doge canvas (drawn on top of throne back) ── */}
        <div
          ref={wrapperRef}
          style={{
            position: 'absolute',
            top: BACK_T - (CH - (SCENE_H - BACK_T - SEAT_H - 30)),
            left: '50%',
            transform: 'translateX(-50%)',
            transformOrigin: 'center bottom',
            willChange: 'transform',
            perspective: '500px',
            zIndex: 2,
          }}
        >
          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            style={{ display: 'block' }}
          />
        </div>

        {/* ── LAYER 3: Throne seat (in front of Doge lower body) ── */}
        <div style={{
          position: 'absolute',
          top: SEAT_T,
          left: SEAT_L,
          width: SEAT_W,
          height: SEAT_H,
          background: 'linear-gradient(180deg, #252e48 0%, #141928 100%)',
          border: '2px solid #FFB800',
          borderTop: '2px solid #FFD700',
          boxShadow: '0 6px 20px rgba(0,0,0,0.7), 0 0 12px rgba(255,184,0,0.15)',
          zIndex: 3,
        }}>
          {/* Seat gold trim line */}
          <div style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,220,80,0.7), transparent)',
          }} />
        </div>

        {/* ── LAYER 3: Armrests (front of Doge) ── */}
        <div style={{
          position: 'absolute',
          top: ARM_T,
          left: SEAT_L - ARM_W,
          width: ARM_W,
          height: ARM_H,
          background: 'linear-gradient(90deg, #0c1020, #1a2040)',
          border: '2px solid #FFB800',
          borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.5)',
          zIndex: 3,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, #FFB800, #FFD700)',
            borderRadius: '8px 0 0 0',
          }} />
        </div>
        <div style={{
          position: 'absolute',
          top: ARM_T,
          left: SEAT_L + SEAT_W,
          width: ARM_W,
          height: ARM_H,
          background: 'linear-gradient(270deg, #0c1020, #1a2040)',
          border: '2px solid #FFB800',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          boxShadow: '4px 0 12px rgba(0,0,0,0.5)',
          zIndex: 3,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(270deg, #FFB800, #FFD700)',
            borderRadius: '0 8px 0 0',
          }} />
        </div>

        {/* ── Throne legs ── */}
        {[SEAT_L + 20, SEAT_L + SEAT_W - 38].map((lx, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: SEAT_T + SEAT_H,
            left: lx,
            width: '18px',
            height: '30px',
            background: 'linear-gradient(180deg, #1a2040, #0a0e1e)',
            border: '1px solid rgba(255,184,0,0.4)',
            zIndex: 1,
          }} />
        ))}
      </div>
    </div>
  )
}
