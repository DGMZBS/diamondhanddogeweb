// lib/introCanvas.ts
// All Canvas 2D drawing functions for the DHD intro animation.
// GSAP animates the state object. The RAF loop calls drawScene() each frame.

export interface Rock {
  x: number
  y: number
  rotation: number
  size: number
  speedY: number
  opacity: number
  hit: boolean
  puffProgress: number // 0 = no puff, >0 = puff animating
}

export interface TrailingTNT {
  x: number
  fuseLength: number  // 1 = full, 0 = gone
  exploded: boolean
}

export interface BridgeSegment {
  x: number           // original track x position
  y: number           // original track y
  vx: number          // velocity x (flying apart)
  vy: number          // velocity y
  rotation: number
  rotSpeed: number
  opacity: number
  width: number
  height: number
  launched: boolean
}

export interface RailSegment extends BridgeSegment {
  isRail: boolean
}

export interface AnimationState {
  // Cart
  cartX: number
  cartY: number
  wheelAngle: number
  cartBobY: number

  // Doge
  dogeExpression: 'confident' | 'scared' | 'awe'

  // TNT (single ahead-of-cart TNT)
  tntVisible: boolean
  tntX: number
  fuseLength: number // 1 = full, 0 = gone

  // Trailing TNT chain (explodes behind the cart)
  trailingTNTs: TrailingTNT[]

  // Explosion (primary)
  explosionActive: boolean
  explosionX: number
  explosionY: number
  explosionProgress: number // 0-1

  // Secondary explosions (trailing TNT chain)
  secondaryExplosions: { x: number; y: number; progress: number }[]

  // Bridge segments (fly apart when blown up)
  bridgeSegments: BridgeSegment[]

  // Rail segments (fly apart when track is destroyed)
  railIntactFromX: number   // rails are drawn from this x → right edge; grows rightward as explosions chain left→right
  railSegments: BridgeSegment[]

  // Rocks
  rocks: Rock[]

  // Pedestal
  pedestalOpacity: number
  pedestalX: number
  pedestalY: number

  // Lantern flicker values (0-1 each)
  lantern1: number
  lantern2: number
  lantern3: number

  // Crystal pulse values (0-1 each)
  crystal1: number
  crystal2: number
  crystal3: number
  crystal4: number

  // Overall canvas shake offset
  shakeX: number
  shakeY: number

  // Scene transition
  fadeOverlay: number  // 0 = transparent, 1 = black — used for scene cut
  scene: 'cave' | 'entrance'

  // Entrance scene
  entranceGlow: number  // 0-1 pulse of the DHD doorway glow
  entranceCartX: number // separate cart X for the entrance scene

  // Stage 6 — coin discovery
  coinVisible: boolean
  coinX: number
  coinY: number
  coinScale: number
  coinOpacity: number
  coinSpin: number      // 0–1, drives the 3D-flip squish
  welcomeTextOpacity: number
  welcomeSubOpacity: number

  // Phase
  phase: string
}

export function createInitialState(canvasWidth: number, canvasHeight: number): AnimationState {
  return {
    cartX: -200,
    cartY: canvasHeight * 0.58,
    wheelAngle: 0,
    cartBobY: 0,
    dogeExpression: 'confident',
    tntVisible: false,
    tntX: canvasWidth * 0.75,
    fuseLength: 1,
    trailingTNTs: [],
    explosionActive: false,
    explosionX: canvasWidth * 0.75,
    explosionY: canvasHeight * 0.52,
    explosionProgress: 0,
    secondaryExplosions: [],
    bridgeSegments: [],
    railIntactFromX: 0,  // start fully intact
    railSegments: [],
    rocks: [],
    pedestalOpacity: 0,
    fadeOverlay: 0,
    scene: 'cave',
    entranceGlow: 0,
    entranceCartX: -200,
    pedestalX: canvasWidth * 0.52,
    pedestalY: canvasHeight * 0.48,
    lantern1: 0.9,
    lantern2: 0.75,
    lantern3: 0.85,
    crystal1: 0.7,
    crystal2: 0.5,
    crystal3: 0.8,
    crystal4: 0.6,
    shakeX: 0,
    shakeY: 0,
    coinVisible: false,
    coinX: canvasWidth * 0.5,
    coinY: canvasHeight * 0.42,
    coinScale: 0.1,
    coinOpacity: 0,
    coinSpin: 0,
    welcomeTextOpacity: 0,
    welcomeSubOpacity: 0,
    phase: 'enter',
  }
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  lantern1: number,
  lantern2: number,
  lantern3: number,
  crystal1: number,
  crystal2: number,
  crystal3: number,
  crystal4: number
) {
  // Sky/depth gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#020408')
  bg.addColorStop(0.4, '#0a1020')
  bg.addColorStop(1, '#0d1535')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Back cave wall
  ctx.beginPath()
  ctx.moveTo(0, h * 0.15)
  ctx.lineTo(w * 0.1, h * 0.08)
  ctx.lineTo(w * 0.25, h * 0.12)
  ctx.lineTo(w * 0.4, h * 0.06)
  ctx.lineTo(w * 0.6, h * 0.1)
  ctx.lineTo(w * 0.75, h * 0.04)
  ctx.lineTo(w * 0.9, h * 0.09)
  ctx.lineTo(w, h * 0.14)
  ctx.lineTo(w, h * 0.75)
  ctx.lineTo(0, h * 0.75)
  ctx.closePath()
  ctx.fillStyle = '#1a1f2e'
  ctx.fill()
  ctx.strokeStyle = '#0d1018'
  ctx.lineWidth = 3
  ctx.stroke()

  // Left cave wall
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(w * 0.18, 0)
  ctx.lineTo(w * 0.14, h * 0.3)
  ctx.lineTo(w * 0.1, h * 0.6)
  ctx.lineTo(0, h * 0.65)
  ctx.closePath()
  ctx.fillStyle = '#12172a'
  ctx.fill()

  // Right cave wall
  ctx.beginPath()
  ctx.moveTo(w, 0)
  ctx.lineTo(w * 0.82, 0)
  ctx.lineTo(w * 0.86, h * 0.25)
  ctx.lineTo(w * 0.9, h * 0.55)
  ctx.lineTo(w, h * 0.6)
  ctx.closePath()
  ctx.fillStyle = '#12172a'
  ctx.fill()

  // Floor
  ctx.beginPath()
  ctx.moveTo(0, h * 0.72)
  ctx.bezierCurveTo(w * 0.25, h * 0.68, w * 0.5, h * 0.74, w * 0.75, h * 0.70)
  ctx.bezierCurveTo(w * 0.9, h * 0.68, w, h * 0.72, w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.fillStyle = '#0f1420'
  ctx.fill()
  // Floor highlight
  ctx.beginPath()
  ctx.moveTo(0, h * 0.72)
  ctx.bezierCurveTo(w * 0.25, h * 0.68, w * 0.5, h * 0.74, w, h * 0.70)
  ctx.strokeStyle = '#1a2035'
  ctx.lineWidth = 2
  ctx.stroke()

  // Stalactites (8)
  const stalactites = [
    { x: w * 0.05, baseW: 30, len: 90 },
    { x: w * 0.15, baseW: 22, len: 60 },
    { x: w * 0.27, baseW: 35, len: 110 },
    { x: w * 0.38, baseW: 20, len: 50 },
    { x: w * 0.52, baseW: 28, len: 80 },
    { x: w * 0.63, baseW: 18, len: 45 },
    { x: w * 0.76, baseW: 32, len: 95 },
    { x: w * 0.88, baseW: 24, len: 65 },
  ]
  stalactites.forEach(s => {
    ctx.beginPath()
    ctx.moveTo(s.x - s.baseW / 2, 0)
    ctx.lineTo(s.x + s.baseW / 2, 0)
    ctx.lineTo(s.x + 4, s.len)
    ctx.lineTo(s.x - 4, s.len)
    ctx.closePath()
    ctx.fillStyle = '#1e2438'
    ctx.fill()
    // Highlight
    ctx.beginPath()
    ctx.moveTo(s.x - s.baseW / 2, 0)
    ctx.lineTo(s.x - s.baseW / 4, 0)
    ctx.lineTo(s.x, s.len)
    ctx.lineTo(s.x - 4, s.len)
    ctx.closePath()
    ctx.fillStyle = '#2a3050'
    ctx.fill()
    ctx.strokeStyle = '#0d1018'
    ctx.lineWidth = 2
    ctx.stroke()
  })

  // ─── Crystals ───────────────────────────────────────────────────────────────
  // Helper: draw one crystal cluster
  // Glow is a cheap radial-gradient circle — no shadowBlur (shadowBlur forces a full blur pass every frame)
  const drawCrystalCluster = (cx: number, cy: number, scale: number, pulseOpacity: number) => {
    const crystalDefs = [
      { ox: 0,    oy: 0,    w: 18, h: 55 },
      { ox: -20,  oy: 12,   w: 14, h: 42 },
      { ox: 22,   oy: 8,    w: 16, h: 48 },
      { ox: -8,   oy: 18,   w: 12, h: 36 },
    ]
    const alpha = 0.6 + pulseOpacity * 0.4
    const glowR = 50 * scale + pulseOpacity * 20

    // Cheap radial gradient glow circle drawn once per cluster
    ctx.save()
    ctx.globalAlpha = pulseOpacity * 0.55
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
    glow.addColorStop(0, 'rgba(0,170,255,0.7)')
    glow.addColorStop(1, 'rgba(0,170,255,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Crystal shapes — no shadowBlur
    ctx.save()
    ctx.globalAlpha = alpha

    crystalDefs.forEach(c => {
      const x = cx + c.ox * scale
      const y = cy + c.oy * scale
      const hw = (c.w / 2) * scale
      const ht = c.h * scale
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x + hw, y - ht * 0.3)
      ctx.lineTo(x + hw * 0.8, y)
      ctx.lineTo(x - hw * 0.8, y)
      ctx.lineTo(x - hw, y - ht * 0.3)
      ctx.closePath()
      ctx.fillStyle = '#0066DD'
      ctx.fill()
      // Highlight face
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x + hw * 0.3, y - ht * 0.3)
      ctx.lineTo(x + hw * 0.2, y)
      ctx.lineTo(x, y - ht * 0.15)
      ctx.closePath()
      ctx.fillStyle = '#00AAFF'
      ctx.fill()
      // Shadow face
      ctx.beginPath()
      ctx.moveTo(x, y - ht)
      ctx.lineTo(x - hw, y - ht * 0.3)
      ctx.lineTo(x - hw * 0.8, y)
      ctx.lineTo(x, y - ht * 0.15)
      ctx.closePath()
      ctx.fillStyle = '#003388'
      ctx.fill()
      ctx.strokeStyle = '#001144'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    ctx.restore()
  }

  // 4 crystal groups
  drawCrystalCluster(w * 0.08, h * 0.65, 1.0, crystal1)
  drawCrystalCluster(w * 0.12, h * 0.35, 0.7, crystal2)
  drawCrystalCluster(w * 0.88, h * 0.60, 1.1, crystal3)
  drawCrystalCluster(w * 0.84, h * 0.30, 0.6, crystal4)

  // ─── Lanterns ───────────────────────────────────────────────────────────────
  const lanternDefs = [
    { x: w * 0.2,  y: 60,  intensity: lantern1 },
    { x: w * 0.5,  y: 45,  intensity: lantern2 },
    { x: w * 0.78, y: 55,  intensity: lantern3 },
  ]
  lanternDefs.forEach(l => {
    // Chain
    for (let ci = 0; ci < 4; ci++) {
      ctx.fillStyle = '#3D3020'
      ctx.fillRect(l.x - 3, l.y + ci * 7, 6, 5)
    }
    const lx = l.x
    const ly = l.y + 28

    // Glow
    ctx.save()
    ctx.globalAlpha = l.intensity * 0.5
    const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 90)
    glow.addColorStop(0, 'rgba(255,180,50,0.5)')
    glow.addColorStop(1, 'rgba(255,180,50,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(lx, ly, 90, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Body
    ctx.beginPath()
    ctx.moveTo(lx - 10, ly - 12)
    ctx.lineTo(lx + 10, ly - 12)
    ctx.lineTo(lx + 12, ly + 10)
    ctx.lineTo(lx - 12, ly + 10)
    ctx.closePath()
    ctx.fillStyle = '#8B6914'
    ctx.fill()
    ctx.strokeStyle = '#4A3A08'
    ctx.lineWidth = 2
    ctx.stroke()

    // Window glow — small inner radial gradient (no shadowBlur)
    ctx.save()
    ctx.globalAlpha = l.intensity
    const wg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 10)
    wg.addColorStop(0, '#FFD700')
    wg.addColorStop(0.5, '#FFB800')
    wg.addColorStop(1, 'rgba(255,184,0,0)')
    ctx.fillStyle = wg
    ctx.beginPath()
    ctx.arc(lx, ly, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
}

// ─── DOGE ─────────────────────────────────────────────────────────────────────

export function drawDoge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  expression: 'confident' | 'scared' | 'awe',
  scale: number = 1
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  const bw = 52, bh = 58
  // Body (jacket)
  roundRect(ctx, -bw / 2, -bh, bw, bh, 8)
  ctx.fillStyle = '#1a1a2e'
  ctx.fill()
  // Jacket highlight
  roundRect(ctx, -bw / 2, -bh, bw * 0.4, bh * 0.5, 4)
  ctx.fillStyle = '#2a2a4e'
  ctx.fill()
  // Diamond dots on jacket
  const diamondDots = [
    { dx: -12, dy: -bh + 18 },
    { dx: 8,   dy: -bh + 28 },
    { dx: -6,  dy: -bh + 42 },
    { dx: 14,  dy: -bh + 48 },
  ]
  diamondDots.forEach(d => {
    ctx.beginPath()
    ctx.moveTo(d.dx, d.dy - 5)
    ctx.lineTo(d.dx + 4, d.dy)
    ctx.lineTo(d.dx, d.dy + 5)
    ctx.lineTo(d.dx - 4, d.dy)
    ctx.closePath()
    ctx.fillStyle = '#88AAFF'
    ctx.fill()
  })
  // Body outline
  roundRect(ctx, -bw / 2, -bh, bw, bh, 8)
  ctx.strokeStyle = '#1a0a00'
  ctx.lineWidth = 3
  ctx.stroke()

  // Paws
  ;[-bw / 2 - 10, bw / 2 + 2].forEach(px => {
    roundRect(ctx, px, -20, 12, 14, 4)
    ctx.fillStyle = '#D4854A'
    ctx.fill()
    ctx.strokeStyle = '#1a0a00'
    ctx.lineWidth = 2
    ctx.stroke()
  })

  // Head
  const headR = 28
  const headY = -bh - headR + 8
  ctx.beginPath()
  ctx.arc(0, headY, headR, 0, Math.PI * 2)
  ctx.fillStyle = '#D4854A'
  ctx.fill()
  // Forehead highlight
  ctx.beginPath()
  ctx.arc(-5, headY - 8, headR * 0.6, Math.PI * 1.1, Math.PI * 1.9)
  ctx.fillStyle = '#E8A05A'
  ctx.fill()
  // Muzzle
  ctx.beginPath()
  ctx.ellipse(0, headY + 10, 16, 12, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#F0C890'
  ctx.fill()
  ctx.strokeStyle = '#C89060'
  ctx.lineWidth = 1.5
  ctx.stroke()
  // Nose
  ctx.beginPath()
  ctx.ellipse(0, headY + 6, 5, 3.5, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#1a1a1a'
  ctx.fill()
  // Head outline
  ctx.beginPath()
  ctx.arc(0, headY, headR, 0, Math.PI * 2)
  ctx.strokeStyle = '#1a0a00'
  ctx.lineWidth = 3
  ctx.stroke()

  // Ears
  const earDefs = [
    { ex: -22, ey: headY - 22, rot: -0.3 },
    { ex: 22,  ey: headY - 22, rot: 0.3 },
  ]
  earDefs.forEach(e => {
    ctx.save()
    ctx.translate(e.ex, e.ey)
    ctx.rotate(e.rot)
    ctx.beginPath()
    ctx.moveTo(0, -18)
    ctx.lineTo(12, 4)
    ctx.lineTo(-12, 4)
    ctx.closePath()
    ctx.fillStyle = '#C07840'
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(0, -12)
    ctx.lineTo(7, 2)
    ctx.lineTo(-7, 2)
    ctx.closePath()
    ctx.fillStyle = '#E8A860'
    ctx.fill()
    ctx.strokeStyle = '#1a0a00'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  })

  // Eyes
  const eyeY = headY - 4
  if (expression === 'confident') {
    ;[-10, 10].forEach(ex => {
      ctx.beginPath()
      ctx.ellipse(ex, eyeY, 5.5, 4.5, 0, 0, Math.PI * 2)
      ctx.fillStyle = '#1a1a1a'
      ctx.fill()
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // Highlight
      ctx.beginPath()
      ctx.arc(ex + 2, eyeY - 1.5, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      // Slight squint (confident)
      ctx.beginPath()
      ctx.moveTo(ex - 7, eyeY - 5)
      ctx.lineTo(ex + 7, eyeY - 5)
      ctx.strokeStyle = '#D4854A'
      ctx.lineWidth = 2.5
      ctx.stroke()
    })
    // Mouth
    ctx.beginPath()
    ctx.arc(0, headY + 14, 7, 0.1, Math.PI - 0.1)
    ctx.strokeStyle = '#1a0a00'
    ctx.lineWidth = 2
    ctx.stroke()

  } else if (expression === 'scared') {
    ;[-10, 10].forEach(ex => {
      ctx.beginPath()
      ctx.arc(ex, eyeY, 7, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(ex, eyeY, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#1a1a1a'
      ctx.fill()
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // Raised eyebrows
      ctx.beginPath()
      ctx.moveTo(ex - 8, eyeY - 10)
      ctx.lineTo(ex + 8, eyeY - 12)
      ctx.strokeStyle = '#1a0a00'
      ctx.lineWidth = 2.5
      ctx.stroke()
    })
    // Open scared mouth
    ctx.beginPath()
    ctx.ellipse(0, headY + 14, 8, 6, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#1a0a00'
    ctx.fill()

  } else if (expression === 'awe') {
    ;[-10, 10].forEach(ex => {
      ctx.beginPath()
      ctx.arc(ex, eyeY, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(ex, eyeY, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#1a1a1a'
      ctx.fill()
      // Sparkle stars
      for (let si = 0; si < 4; si++) {
        const sa = (si / 4) * Math.PI * 2
        const sr = 11
        ctx.beginPath()
        ctx.moveTo(ex + Math.cos(sa) * sr, eyeY + Math.sin(sa) * sr)
        ctx.lineTo(ex + Math.cos(sa) * (sr - 4), eyeY + Math.sin(sa) * (sr - 4))
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })
    // O-shaped mouth
    ctx.beginPath()
    ctx.arc(0, headY + 14, 7, 0, Math.PI * 2)
    ctx.fillStyle = '#1a0a00'
    ctx.fill()
  }

  // Helmet
  ctx.beginPath()
  ctx.moveTo(-20, headY - 20)
  ctx.lineTo(20, headY - 20)
  ctx.lineTo(24, headY - 10)
  ctx.lineTo(-24, headY - 10)
  ctx.closePath()
  ctx.fillStyle = '#B8860B'
  ctx.fill()
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(-24, headY - 14, 48, 4)
  ctx.strokeStyle = '#1a0a00'
  ctx.lineWidth = 2
  ctx.stroke()

  // Headlamp — radial gradient glow (no shadowBlur)
  ctx.save()
  const hlGlow = ctx.createRadialGradient(0, headY - 18, 0, 0, headY - 18, 16)
  hlGlow.addColorStop(0, 'rgba(255,255,220,0.9)')
  hlGlow.addColorStop(0.4, 'rgba(255,255,200,0.4)')
  hlGlow.addColorStop(1, 'rgba(255,255,200,0)')
  ctx.fillStyle = hlGlow
  ctx.beginPath()
  ctx.arc(0, headY - 18, 16, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, headY - 18, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#FFFFCC'
  ctx.fill()
  ctx.restore()

  ctx.restore()
}

// ─── CART ─────────────────────────────────────────────────────────────────────

export function drawCart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wheelAngle: number,
  scale: number = 1
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  const tw = 120, bw = 90, th = 70

  // Cart body (trapezoid)
  ctx.beginPath()
  ctx.moveTo(-tw / 2, 0)
  ctx.lineTo(tw / 2, 0)
  ctx.lineTo(bw / 2, th)
  ctx.lineTo(-bw / 2, th)
  ctx.closePath()
  ctx.fillStyle = '#3D3D3D'
  ctx.fill()
  // Highlight upper portion
  ctx.beginPath()
  ctx.moveTo(-tw / 2, 0)
  ctx.lineTo(tw / 2, 0)
  ctx.lineTo(tw / 2 - 10, th * 0.4)
  ctx.lineTo(-tw / 2 + 10, th * 0.4)
  ctx.closePath()
  ctx.fillStyle = '#555555'
  ctx.fill()
  // Shadow lower portion
  ctx.beginPath()
  ctx.moveTo(-bw / 2 + 5, th * 0.6)
  ctx.lineTo(bw / 2 - 5, th * 0.6)
  ctx.lineTo(bw / 2, th)
  ctx.lineTo(-bw / 2, th)
  ctx.closePath()
  ctx.fillStyle = '#2A2A2A'
  ctx.fill()

  // Rivets
  const rivetPositions = [-48, -24, 0, 24, 48]
  rivetPositions.forEach(rx => {
    ctx.beginPath()
    ctx.arc(rx * (bw / tw), th * 0.75, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#1a1a1a'
    ctx.fill()
  })

  // Body outline
  ctx.beginPath()
  ctx.moveTo(-tw / 2, 0)
  ctx.lineTo(tw / 2, 0)
  ctx.lineTo(bw / 2, th)
  ctx.lineTo(-bw / 2, th)
  ctx.closePath()
  ctx.strokeStyle = '#1A1A1A'
  ctx.lineWidth = 3
  ctx.stroke()

  // Rim
  ctx.fillStyle = '#555555'
  ctx.fillRect(-tw / 2, -8, tw, 8)
  ctx.strokeStyle = '#1A1A1A'
  ctx.lineWidth = 2
  ctx.strokeRect(-tw / 2, -8, tw, 8)

  // Diamonds in cart (3)
  const diamondPositions = [-30, 0, 30]
  diamondPositions.forEach((dx, i) => {
    const dy = -18 - (i === 1 ? 8 : 0)
    const dw = 18, dh = 24
    ctx.save()
    // Diamond glow — radial gradient (no shadowBlur)
    const dGlow = ctx.createRadialGradient(dx, dy, 0, dx, dy, 18)
    dGlow.addColorStop(0, 'rgba(0,212,255,0.5)')
    dGlow.addColorStop(1, 'rgba(0,212,255,0)')
    ctx.fillStyle = dGlow
    ctx.beginPath()
    ctx.arc(dx, dy, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(dx, dy - dh / 2)
    ctx.lineTo(dx + dw / 2, dy)
    ctx.lineTo(dx, dy + dh / 2)
    ctx.lineTo(dx - dw / 2, dy)
    ctx.closePath()
    ctx.fillStyle = '#00D4FF'
    ctx.fill()
    // Highlight face
    ctx.beginPath()
    ctx.moveTo(dx, dy - dh / 2)
    ctx.lineTo(dx + dw / 2, dy)
    ctx.lineTo(dx, dy)
    ctx.closePath()
    ctx.fillStyle = '#88EEFF'
    ctx.fill()
    // Shadow face
    ctx.beginPath()
    ctx.moveTo(dx, dy)
    ctx.lineTo(dx + dw / 2, dy)
    ctx.lineTo(dx, dy + dh / 2)
    ctx.closePath()
    ctx.fillStyle = '#006688'
    ctx.fill()
    ctx.strokeStyle = '#004455'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  })

  // Wheels (4 positions, 2 visible)
  const wheelDefs = [
    { wx: -bw / 2 + 18, wy: th },
    { wx: bw / 2 - 18,  wy: th },
  ]
  wheelDefs.forEach(w => {
    ctx.save()
    ctx.translate(w.wx, w.wy)
    ctx.rotate(wheelAngle)
    const wr = 18
    ctx.beginPath()
    ctx.arc(0, 0, wr, 0, Math.PI * 2)
    ctx.fillStyle = '#2A2A2A'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0, wr * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = '#444444'
    ctx.fill()
    // Spokes
    for (let si = 0; si < 4; si++) {
      const sa = (si / 4) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(sa) * wr * 0.9, Math.sin(sa) * wr * 0.9)
      ctx.strokeStyle = '#555555'
      ctx.lineWidth = 2.5
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(0, 0, wr, 0, Math.PI * 2)
    ctx.strokeStyle = '#111111'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  })

  ctx.restore()
}

// ─── TNT ──────────────────────────────────────────────────────────────────────

export function drawTNT(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fuseLength: number
) {
  ctx.save()
  ctx.translate(x, y)

  const bw = 50, bh = 50

  // Box
  roundRect(ctx, -bw / 2, -bh, bw, bh, 4)
  ctx.fillStyle = '#8B4513'
  ctx.fill()
  // Top highlight
  roundRect(ctx, -bw / 2, -bh, bw, bh * 0.35, 4)
  ctx.fillStyle = '#A0522D'
  ctx.fill()
  // Side shadow
  roundRect(ctx, bw / 4, -bh, bw / 4, bh, 0)
  ctx.fillStyle = '#5C2E0A'
  ctx.fill()
  // Red stripe
  ctx.fillStyle = '#CC0000'
  ctx.fillRect(-bw / 2, -bh * 0.65, bw, 14)
  // TNT text
  ctx.font = 'bold 13px Orbitron, sans-serif'
  ctx.fillStyle = '#FFD700'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('TNT', 0, -bh * 0.65 + 7)
  // Box outline
  roundRect(ctx, -bw / 2, -bh, bw, bh, 4)
  ctx.strokeStyle = '#3D1A00'
  ctx.lineWidth = 3
  ctx.stroke()

  // Fuse
  if (fuseLength > 0) {
    const fuseTop = -bh - 22 * fuseLength
    ctx.beginPath()
    ctx.moveTo(0, -bh)
    ctx.bezierCurveTo(8, -bh - 8 * fuseLength, -5, -bh - 15 * fuseLength, 0, fuseTop)
    ctx.strokeStyle = '#8B7355'
    ctx.lineWidth = 2
    ctx.stroke()
    // Spark
    ctx.save()
    ctx.shadowColor = '#FFD700'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(0, fuseTop, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = '#FF8C00'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, fuseTop, 2, 0, Math.PI * 2)
    ctx.fillStyle = '#FFFF00'
    ctx.fill()
    ctx.restore()
  }

  ctx.restore()
}

// ─── EXPLOSION ────────────────────────────────────────────────────────────────

export function drawExplosion(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  progress: number
) {
  if (progress <= 0) return
  ctx.save()

  const outerR = progress * 220
  const innerR = progress * 90
  const alpha = Math.max(0, 1 - progress)

  // Outer blast
  ctx.beginPath()
  ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,150,0,${alpha * 0.5})`
  ctx.fill()

  // Inner bright
  if (innerR > 0) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,100,${alpha})`
    ctx.fill()
  }

  // Blast lines (8)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const len = progress * 130
    ctx.beginPath()
    ctx.moveTo(
      centerX + Math.cos(angle) * 20,
      centerY + Math.sin(angle) * 20
    )
    ctx.lineTo(
      centerX + Math.cos(angle) * len,
      centerY + Math.sin(angle) * len
    )
    ctx.strokeStyle = `rgba(255,100,0,${alpha})`
    ctx.lineWidth = 4 * (1 - progress * 0.5)
    ctx.stroke()
  }

  // Debris chunks (6)
  const debrisDefs = [
    { angle: 0.3,  speed: 0.7 },
    { angle: 1.1,  speed: 0.9 },
    { angle: 2.2,  speed: 0.6 },
    { angle: 3.5,  speed: 0.8 },
    { angle: 4.3,  speed: 1.0 },
    { angle: 5.6,  speed: 0.7 },
  ]
  debrisDefs.forEach(d => {
    const dist = progress * 100 * d.speed
    const dx = centerX + Math.cos(d.angle) * dist
    const dy = centerY + Math.sin(d.angle) * dist + progress * 30
    ctx.save()
    ctx.translate(dx, dy)
    ctx.rotate(progress * 4)
    ctx.globalAlpha = alpha
    ctx.beginPath()
    ctx.moveTo(0, -8)
    ctx.lineTo(7, 3)
    ctx.lineTo(-7, 3)
    ctx.closePath()
    ctx.fillStyle = '#555555'
    ctx.fill()
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  })

  ctx.restore()
}

// ─── ROCK ─────────────────────────────────────────────────────────────────────

export function drawRock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number,
  size: number,
  opacity: number = 1,
  puffProgress: number = 0
) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(rotation)

  // Irregular polygon
  const points = [
    { px: 0,        py: -size * 0.5 },
    { px: size * 0.45,  py: -size * 0.3 },
    { px: size * 0.5,   py: size * 0.1 },
    { px: size * 0.3,   py: size * 0.5 },
    { px: -size * 0.1,  py: size * 0.45 },
    { px: -size * 0.5,  py: size * 0.2 },
    { px: -size * 0.4,  py: -size * 0.35 },
  ]
  ctx.beginPath()
  ctx.moveTo(points[0].px, points[0].py)
  points.slice(1).forEach(p => ctx.lineTo(p.px, p.py))
  ctx.closePath()
  ctx.fillStyle = '#4A4A5A'
  ctx.fill()
  // Highlight
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.5)
  ctx.lineTo(size * 0.2, -size * 0.2)
  ctx.lineTo(-size * 0.1, size * 0.1)
  ctx.lineTo(-size * 0.4, -size * 0.2)
  ctx.closePath()
  ctx.fillStyle = '#5A5A6A'
  ctx.fill()
  ctx.strokeStyle = '#1A1A2A'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  // Impact puff
  if (puffProgress > 0 && puffProgress < 1) {
    ctx.save()
    ctx.translate(x, y)
    for (let pi = 0; pi < 3; pi++) {
      const pangle = (pi / 3) * Math.PI - Math.PI / 2
      const pdist = puffProgress * 28
      const px2 = Math.cos(pangle) * pdist
      const py2 = -puffProgress * 15
      const pr = puffProgress * 12
      ctx.beginPath()
      ctx.arc(px2, py2, pr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,200,220,${(1 - puffProgress) * 0.6})`
      ctx.fill()
    }
    ctx.restore()
  }
}

// ─── CREEPER ──────────────────────────────────────────────────────────────────

export function drawCreeper(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flash: number,   // 0-1: how white/bright the creeper is (pre-explosion warning)
  scale: number    // grows slightly before blowing up
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  // Creeper green with flash overlay
  const baseGreen = '#3D7A3D'
  const flashGreen = `rgba(255,255,255,${flash * 0.85})`

  // ── Legs (4 pixel-art style legs) ──
  const legDefs = [
    { lx: -14, lw: 12 },
    { lx: 2,   lw: 12 },
  ]
  legDefs.forEach(l => {
    // Back leg (darker)
    ctx.fillStyle = '#2E5E2E'
    ctx.fillRect(l.lx - 2, 0, l.lw, 28)
    // Front leg
    ctx.fillStyle = baseGreen
    ctx.fillRect(l.lx, -2, l.lw, 28)
    if (flash > 0) {
      ctx.fillStyle = flashGreen
      ctx.fillRect(l.lx, -2, l.lw, 28)
    }
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1.5
    ctx.strokeRect(l.lx, -2, l.lw, 28)
  })

  // ── Body ──
  const bx = -18, by = -52, bw = 36, bh = 52
  ctx.fillStyle = baseGreen
  ctx.fillRect(bx, by, bw, bh)
  if (flash > 0) {
    ctx.fillStyle = flashGreen
    ctx.fillRect(bx, by, bw, bh)
  }
  // Pixel shading strips on body
  ctx.fillStyle = 'rgba(0,0,0,0.15)'
  ctx.fillRect(bx, by, 6, bh)               // left shadow
  ctx.fillRect(bx + bw - 4, by, 4, bh)      // right shadow
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(bx + 6, by, 10, bh * 0.4)   // highlight
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 2
  ctx.strokeRect(bx, by, bw, bh)

  // ── Head ── (square, Minecraft style)
  const hx = -20, hy = -96, hw = 40, hh = 44
  ctx.fillStyle = baseGreen
  ctx.fillRect(hx, hy, hw, hh)
  if (flash > 0) {
    ctx.fillStyle = flashGreen
    ctx.fillRect(hx, hy, hw, hh)
  }
  // Head highlight top-left
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.fillRect(hx + 2, hy + 2, hw * 0.45, hh * 0.3)
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 2
  ctx.strokeRect(hx, hy, hw, hh)

  // ── Creeper face (iconic pixel face) ──
  const faceColor = flash > 0.3 ? `rgba(0,0,0,${1 - flash * 0.5})` : '#1a1a1a'

  // Eyes (two squares)
  ctx.fillStyle = faceColor
  ctx.fillRect(hx + 6,  hy + 10, 9, 9)   // left eye
  ctx.fillRect(hx + 25, hy + 10, 9, 9)   // right eye

  // Nose + mouth (classic creeper mouth pattern)
  ctx.fillRect(hx + 15, hy + 20, 10, 7)  // nose bridge
  ctx.fillRect(hx + 6,  hy + 27, 9,  9)  // left mouth
  ctx.fillRect(hx + 25, hy + 27, 9,  9)  // right mouth
  ctx.fillRect(hx + 15, hy + 33, 10, 6)  // chin connector

  // ── Glow aura when flashing ──
  if (flash > 0.1) {
    ctx.save()
    ctx.globalAlpha = flash * 0.4
    ctx.shadowColor = '#88FF88'
    ctx.shadowBlur = 30
    ctx.strokeStyle = '#88FF88'
    ctx.lineWidth = 3
    ctx.strokeRect(hx - 4, hy - 4, hw + 8, hh + 4)
    ctx.restore()
  }

  ctx.restore()
}

// ─── ENTRANCE SCENE ───────────────────────────────────────────────────────────
// A narrower tunnel leading to a glowing DHD chamber entrance ahead.

export function drawEntranceScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  glowIntensity: number,   // 0-1
  lantern1: number,
  lantern2: number,
  crystal1: number,
  crystal2: number
) {
  // Deep tunnel gradient — darker, more focused than the main cave
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#010306')
  bg.addColorStop(0.5, '#060c18')
  bg.addColorStop(1, '#0a1228')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Tunnel walls — cave narrows toward center with perspective
  // Left wall
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(w * 0.28, 0)
  ctx.lineTo(w * 0.32, h * 0.38)
  ctx.lineTo(w * 0.30, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.fillStyle = '#111520'
  ctx.fill()
  // Left wall inner face (faces tunnel)
  ctx.beginPath()
  ctx.moveTo(w * 0.28, 0)
  ctx.lineTo(w * 0.32, h * 0.38)
  ctx.lineTo(w * 0.30, h)
  ctx.lineTo(w * 0.24, h)
  ctx.lineTo(w * 0.22, h * 0.38)
  ctx.lineTo(w * 0.20, 0)
  ctx.closePath()
  ctx.fillStyle = '#1a2030'
  ctx.fill()
  ctx.strokeStyle = '#0a0f1a'
  ctx.lineWidth = 2
  ctx.stroke()

  // Right wall
  ctx.beginPath()
  ctx.moveTo(w, 0)
  ctx.lineTo(w * 0.72, 0)
  ctx.lineTo(w * 0.68, h * 0.38)
  ctx.lineTo(w * 0.70, h)
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fillStyle = '#111520'
  ctx.fill()
  // Right wall inner face
  ctx.beginPath()
  ctx.moveTo(w * 0.72, 0)
  ctx.lineTo(w * 0.68, h * 0.38)
  ctx.lineTo(w * 0.70, h)
  ctx.lineTo(w * 0.76, h)
  ctx.lineTo(w * 0.78, h * 0.38)
  ctx.lineTo(w * 0.80, 0)
  ctx.closePath()
  ctx.fillStyle = '#1a2030'
  ctx.fill()
  ctx.strokeStyle = '#0a0f1a'
  ctx.lineWidth = 2
  ctx.stroke()

  // Ceiling
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(w, 0)
  ctx.lineTo(w * 0.72, h * 0.32)
  ctx.lineTo(w * 0.28, h * 0.32)
  ctx.closePath()
  ctx.fillStyle = '#0d1220'
  ctx.fill()

  // Tunnel floor — track leads to doorway
  const floorY = h * 0.68
  ctx.beginPath()
  ctx.moveTo(w * 0.30, h)
  ctx.lineTo(w * 0.32, floorY)
  ctx.lineTo(w * 0.68, floorY)
  ctx.lineTo(w * 0.70, h)
  ctx.closePath()
  ctx.fillStyle = '#0c1018'
  ctx.fill()
  // Floor highlight
  ctx.beginPath()
  ctx.moveTo(w * 0.32, floorY)
  ctx.lineTo(w * 0.68, floorY)
  ctx.strokeStyle = '#18243a'
  ctx.lineWidth = 2
  ctx.stroke()

  // Track rails (perspective — converge toward center)
  const trackDefs = [
    { y1: h, x1L: w * 0.38, x1R: w * 0.62, y2: floorY, x2L: w * 0.42, x2R: w * 0.58 },
  ]
  trackDefs.forEach(t => {
    // Left rail
    ctx.beginPath()
    ctx.moveTo(t.x1L, t.y1)
    ctx.lineTo(t.x2L, t.y2)
    ctx.strokeStyle = '#5C3D1E'
    ctx.lineWidth = 5
    ctx.stroke()
    // Right rail
    ctx.beginPath()
    ctx.moveTo(t.x1R, t.y1)
    ctx.lineTo(t.x2R, t.y2)
    ctx.stroke()
  })
  // Ties (cross planks, spaced out in perspective)
  for (let ti = 0; ti < 6; ti++) {
    const tprog = ti / 6
    const ty = h - (h - floorY) * tprog
    const tx1 = lerp(w * 0.38, w * 0.42, tprog)
    const tx2 = lerp(w * 0.62, w * 0.58, tprog)
    const th2 = lerp(10, 5, tprog)
    ctx.fillStyle = '#7A5230'
    ctx.fillRect(tx1, ty - th2 / 2, tx2 - tx1, th2)
    ctx.strokeStyle = '#4A3018'
    ctx.lineWidth = 1
    ctx.strokeRect(tx1, ty - th2 / 2, tx2 - tx1, th2)
  }

  // ── DHD Chamber Entrance (the glowing doorway ahead) ──────────────────────
  const doorCX = w * 0.5
  const doorCY = h * 0.42
  // On narrow/portrait screens the doorway needs to be proportionally wider
  const doorW  = w < 600 ? w * 0.30 : w * 0.18
  const doorH  = w < 600 ? h * 0.22 : h * 0.28

  // Outer stone arch
  ctx.beginPath()
  ctx.moveTo(doorCX - doorW * 0.7, doorCY + doorH * 0.5)
  ctx.lineTo(doorCX - doorW * 0.7, doorCY - doorH * 0.1)
  ctx.quadraticCurveTo(doorCX - doorW * 0.7, doorCY - doorH * 0.6, doorCX, doorCY - doorH * 0.65)
  ctx.quadraticCurveTo(doorCX + doorW * 0.7, doorCY - doorH * 0.6, doorCX + doorW * 0.7, doorCY - doorH * 0.1)
  ctx.lineTo(doorCX + doorW * 0.7, doorCY + doorH * 0.5)
  ctx.closePath()
  ctx.fillStyle = '#2a2215'
  ctx.fill()
  ctx.strokeStyle = '#8B6914'
  ctx.lineWidth = 3
  ctx.stroke()

  // Glowing interior — the light within
  ctx.save()
  const innerGlow = ctx.createRadialGradient(doorCX, doorCY, 0, doorCX, doorCY, doorW * 0.75)
  const r1 = Math.round(255 * (0.8 + glowIntensity * 0.2))
  const g1 = Math.round(184 * (0.6 + glowIntensity * 0.4))
  innerGlow.addColorStop(0,   `rgba(${r1}, ${g1}, 0, ${0.85 + glowIntensity * 0.15})`)
  innerGlow.addColorStop(0.5, `rgba(200, 120, 0, ${0.5 + glowIntensity * 0.3})`)
  innerGlow.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = innerGlow
  ctx.beginPath()
  ctx.ellipse(doorCX, doorCY, doorW * 0.6, doorH * 0.55, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Outer glow radiating from doorway
  ctx.save()
  ctx.globalAlpha = 0.25 + glowIntensity * 0.35
  const outerGlow = ctx.createRadialGradient(doorCX, doorCY, doorW * 0.3, doorCX, doorCY, doorW * 2.5)
  outerGlow.addColorStop(0, 'rgba(255,184,0,0.6)')
  outerGlow.addColorStop(1, 'rgba(255,184,0,0)')
  ctx.fillStyle = outerGlow
  ctx.beginPath()
  ctx.arc(doorCX, doorCY, doorW * 2.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Crystal formations along the tunnel walls — glow via radial gradient (no shadowBlur)
  const drawSmallCrystal = (cx: number, cy: number, s: number, pulse: number) => {
    // Glow halo
    ctx.save()
    ctx.globalAlpha = pulse * 0.5
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 2)
    cg.addColorStop(0, 'rgba(0,170,255,0.6)')
    cg.addColorStop(1, 'rgba(0,170,255,0)')
    ctx.fillStyle = cg
    ctx.beginPath()
    ctx.arc(cx, cy, s * 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    // Crystal shape
    ctx.save()
    ctx.globalAlpha = 0.5 + pulse * 0.5
    const pts = [
      { px: 0,       py: -s },
      { px: s * 0.4, py: -s * 0.3 },
      { px: s * 0.35, py: 0 },
      { px: -s * 0.35, py: 0 },
      { px: -s * 0.4, py: -s * 0.3 },
    ]
    ctx.beginPath()
    ctx.moveTo(cx + pts[0].px, cy + pts[0].py)
    pts.slice(1).forEach(p => ctx.lineTo(cx + p.px, cy + p.py))
    ctx.closePath()
    ctx.fillStyle = '#0066DD'
    ctx.fill()
    ctx.strokeStyle = '#001144'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()
  }

  drawSmallCrystal(w * 0.24, h * 0.55, 18, crystal1)
  drawSmallCrystal(w * 0.20, h * 0.68, 14, crystal2)
  drawSmallCrystal(w * 0.76, h * 0.52, 16, crystal1)
  drawSmallCrystal(w * 0.78, h * 0.65, 12, crystal2)

  // Wall lanterns (2, flanking the tunnel)
  const drawWallLantern = (lx: number, ly: number, intensity: number) => {
    // Hook
    ctx.fillStyle = '#3D3020'
    ctx.fillRect(lx - 2, ly - 10, 4, 10)
    // Glow
    ctx.save()
    ctx.globalAlpha = intensity * 0.45
    const lg = ctx.createRadialGradient(lx, ly + 5, 0, lx, ly + 5, 60)
    lg.addColorStop(0, 'rgba(255,180,50,0.55)')
    lg.addColorStop(1, 'rgba(255,180,50,0)')
    ctx.fillStyle = lg
    ctx.beginPath()
    ctx.arc(lx, ly + 5, 60, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    // Body
    ctx.fillStyle = '#8B6914'
    ctx.fillRect(lx - 8, ly, 16, 14)
    ctx.save()
    ctx.globalAlpha = intensity
    const wlg = ctx.createRadialGradient(lx, ly + 7, 0, lx, ly + 7, 8)
    wlg.addColorStop(0, '#FFD700')
    wlg.addColorStop(0.5, '#FFB800')
    wlg.addColorStop(1, 'rgba(255,184,0,0)')
    ctx.fillStyle = wlg
    ctx.beginPath()
    ctx.arc(lx, ly + 7, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  drawWallLantern(w * 0.34, h * 0.36, lantern1)
  drawWallLantern(w * 0.66, h * 0.36, lantern2)

  // Stalactites in tunnel ceiling
  const tunnelStalactites = [
    { x: w * 0.35, bw: 14, len: 38 },
    { x: w * 0.44, bw: 10, len: 25 },
    { x: w * 0.50, bw: 16, len: 45 },
    { x: w * 0.57, bw: 11, len: 30 },
    { x: w * 0.65, bw: 13, len: 35 },
  ]
  tunnelStalactites.forEach(s => {
    ctx.beginPath()
    ctx.moveTo(s.x - s.bw / 2, h * 0.32)
    ctx.lineTo(s.x + s.bw / 2, h * 0.32)
    ctx.lineTo(s.x + 2,        h * 0.32 + s.len)
    ctx.lineTo(s.x - 2,        h * 0.32 + s.len)
    ctx.closePath()
    ctx.fillStyle = '#1e2438'
    ctx.fill()
    ctx.strokeStyle = '#0d1018'
    ctx.lineWidth = 1.5
    ctx.stroke()
  })
}

// ─── PEDESTAL ─────────────────────────────────────────────────────────────────

export function drawPedestal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  opacity: number
) {
  if (opacity <= 0) return
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)

  // Column
  roundRect(ctx, -30, -80, 60, 80, 4)
  ctx.fillStyle = '#4A3F35'
  ctx.fill()
  // Highlight
  roundRect(ctx, -30, -80, 18, 80, 4)
  ctx.fillStyle = '#5A4F45'
  ctx.fill()
  // Shadow
  roundRect(ctx, 18, -80, 12, 80, 0)
  ctx.fillStyle = '#2A1F15'
  ctx.fill()
  ctx.strokeStyle = '#1A0F08'
  ctx.lineWidth = 2
  ctx.stroke()

  // Cap
  roundRect(ctx, -40, -95, 80, 15, 3)
  ctx.fillStyle = '#5A4F45'
  ctx.fill()
  ctx.strokeStyle = '#1A0F08'
  ctx.lineWidth = 2
  ctx.stroke()

  // Gold trim bands
  ;[-25, -55].forEach(gy => {
    ctx.fillStyle = '#FFB800'
    ctx.fillRect(-30, gy, 60, 4)
  })

  // Glowing runes
  ctx.save()
  ctx.shadowColor = '#00AAFF'
  ctx.shadowBlur = 8
  const runePositions = [
    { rx: -15, ry: -40 }, { rx: 0, ry: -55 }, { rx: 12, ry: -38 },
  ]
  runePositions.forEach(r => {
    ctx.beginPath()
    ctx.moveTo(r.rx - 5, r.ry)
    ctx.lineTo(r.rx + 5, r.ry)
    ctx.moveTo(r.rx, r.ry - 5)
    ctx.lineTo(r.rx, r.ry + 5)
    ctx.strokeStyle = '#00AAFF'
    ctx.lineWidth = 1.5
    ctx.stroke()
  })
  ctx.restore()

  ctx.restore()
}

// ─── TRACK RAILS ──────────────────────────────────────────────────────────────

export function drawRails(ctx: CanvasRenderingContext2D, w: number, h: number, intactFromX: number) {
  const startX = Math.max(0, intactFromX)
  if (startX >= w) return
  const trackY1 = h * 0.64
  const trackY2 = h * 0.685

  // Clip drawing to the intact portion (startX → right edge)
  ctx.save()
  ctx.beginPath()
  ctx.rect(startX, 0, w - startX + 10, h)
  ctx.clip()

  // Ties
  for (let tx = -10; tx < w + 10; tx += 55) {
    if (tx + 42 < startX) continue
    ctx.fillStyle = '#7A5230'
    ctx.strokeStyle = '#4A3018'
    ctx.lineWidth = 1
    roundRect(ctx, tx, trackY1 - 4, 42, 12, 2)
    ctx.fill()
    ctx.stroke()
  }
  // Rails
  ;[trackY1, trackY2].forEach(ry => {
    roundRect(ctx, startX, ry, w - startX + 10, 6, 2)
    ctx.fillStyle = '#5C3D1E'
    ctx.fill()
    ctx.strokeStyle = '#3D2810'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  ctx.restore()
}

// ─── RAIL SEGMENT (flying debris) ─────────────────────────────────────────────

export function drawRailSegment(ctx: CanvasRenderingContext2D, seg: BridgeSegment) {
  if (seg.opacity <= 0) return
  ctx.save()
  ctx.globalAlpha = seg.opacity
  ctx.translate(seg.x, seg.y)
  ctx.rotate(seg.rotation)
  // Metal rail bar
  const grad = ctx.createLinearGradient(-seg.width / 2, 0, seg.width / 2, 0)
  grad.addColorStop(0, '#4A3A2A')
  grad.addColorStop(0.5, '#7A6050')
  grad.addColorStop(1, '#4A3A2A')
  ctx.fillStyle = grad
  ctx.fillRect(-seg.width / 2, -seg.height / 2, seg.width, seg.height)
  // Top shine
  ctx.fillStyle = 'rgba(180,150,100,0.35)'
  ctx.fillRect(-seg.width / 2, -seg.height / 2, seg.width, seg.height * 0.3)
  ctx.strokeStyle = '#2A1A0A'
  ctx.lineWidth = 1
  ctx.strokeRect(-seg.width / 2, -seg.height / 2, seg.width, seg.height)
  ctx.restore()
}

// ─── BRIDGE SEGMENT ───────────────────────────────────────────────────────────

export function drawBridgeSegment(ctx: CanvasRenderingContext2D, seg: BridgeSegment) {
  if (seg.opacity <= 0) return
  ctx.save()
  ctx.globalAlpha = seg.opacity
  ctx.translate(seg.x, seg.y)
  ctx.rotate(seg.rotation)
  // Wood plank
  ctx.fillStyle = '#7A5230'
  ctx.fillRect(-seg.width / 2, -seg.height / 2, seg.width, seg.height)
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.fillRect(-seg.width / 2, -seg.height / 2, seg.width * 0.2, seg.height)
  ctx.strokeStyle = '#4A3018'
  ctx.lineWidth = 1.5
  ctx.strokeRect(-seg.width / 2, -seg.height / 2, seg.width, seg.height)
  ctx.restore()
}

// ─── DHD COIN ─────────────────────────────────────────────────────────────────

export function drawDHDCoin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  opacity: number,
  spin: number   // 0–1 drives a horizontal squish (fake 3D flip)
) {
  if (opacity <= 0 || scale <= 0) return
  const r = 42 * scale
  // squish simulates coin rotating on Y axis: scaleX oscillates via |cos(spin * PI * 2)|
  const squishX = Math.abs(Math.cos(spin * Math.PI * 2))
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.scale(squishX, 1)

  // Outer glow halo — radial gradient only, no shadowBlur
  ctx.save()
  const halo = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 1.8)
  halo.addColorStop(0, 'rgba(255,184,0,0.45)')
  halo.addColorStop(1, 'rgba(255,184,0,0)')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Coin body gradient
  const coinGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r)
  coinGrad.addColorStop(0, '#FFE066')
  coinGrad.addColorStop(0.55, '#FFB800')
  coinGrad.addColorStop(1, '#A86800')
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fillStyle = coinGrad
  ctx.fill()

  // Rim
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.strokeStyle = '#8B5500'
  ctx.lineWidth = 2.5 * scale
  ctx.stroke()

  // Inner ring
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,220,80,0.6)'
  ctx.lineWidth = 1.5 * scale
  ctx.stroke()

  // "DHD" text
  ctx.save()
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.font = `bold ${Math.round(r * 0.58)}px Orbitron, sans-serif`
  ctx.fillStyle = '#FFF5CC'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('DHD', 0, 1 * scale)
  ctx.restore()

  // Shine highlight
  ctx.save()
  ctx.globalAlpha = opacity * 0.45
  const shine = ctx.createLinearGradient(-r * 0.5, -r * 0.8, r * 0.3, -r * 0.1)
  shine.addColorStop(0, 'rgba(255,255,255,0.75)')
  shine.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = shine
  ctx.beginPath()
  ctx.ellipse(-r * 0.15, -r * 0.35, r * 0.45, r * 0.22, -0.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  ctx.restore()
}

// ─── WELCOME TEXT ─────────────────────────────────────────────────────────────

export function drawWelcomeText(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  titleOpacity: number,
  subOpacity: number
) {
  if (titleOpacity <= 0 && subOpacity <= 0) return

  const isMobileW = w < 600
  // Title — "DIAMOND HAND DOGE"
  if (titleOpacity > 0) {
    const titleSize = isMobileW ? Math.round(w * 0.075) : Math.round(w * 0.048)
    const titleY    = isMobileW ? h * 0.12 : h * 0.20
    const lineY     = isMobileW ? h * 0.155 : h * 0.235
    ctx.save()
    ctx.globalAlpha = titleOpacity
    ctx.shadowColor = '#FFB800'
    ctx.shadowBlur = 24
    ctx.font = `bold ${titleSize}px Orbitron, sans-serif`
    ctx.fillStyle = '#FFE066'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // Wrap onto two lines on very narrow screens
    if (isMobileW) {
      ctx.fillText('DIAMOND HAND', w * 0.5, titleY)
      ctx.fillText('DOGE', w * 0.5, titleY + titleSize * 1.25)
    } else {
      ctx.fillText('DIAMOND HAND DOGE', w * 0.5, titleY)
    }
    ctx.restore()

    // Decorative line under title
    ctx.save()
    ctx.globalAlpha = titleOpacity * 0.7
    const lineGrad = ctx.createLinearGradient(w * 0.15, 0, w * 0.85, 0)
    lineGrad.addColorStop(0, 'rgba(255,184,0,0)')
    lineGrad.addColorStop(0.5, 'rgba(255,184,0,0.8)')
    lineGrad.addColorStop(1, 'rgba(255,184,0,0)')
    ctx.fillStyle = lineGrad
    ctx.fillRect(w * 0.15, lineY, w * 0.7, 1.5)
    ctx.restore()
  }

  // Subtitle
  if (subOpacity > 0) {
    const subSize = isMobileW ? Math.round(w * 0.038) : Math.round(w * 0.018)
    const subY    = isMobileW ? h * 0.195 : h * 0.268
    ctx.save()
    ctx.globalAlpha = subOpacity
    ctx.shadowColor = '#00D4FF'
    ctx.shadowBlur = 12
    ctx.font = `${subSize}px Orbitron, sans-serif`
    ctx.fillStyle = '#00D4FF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('HOLD STRONG', w * 0.5, subY)
    ctx.restore()
  }
}

// ─── MASTER SCENE ─────────────────────────────────────────────────────────────

export function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: AnimationState
) {
  // Scale cart + doge down on narrow screens so they don't dominate the canvas
  const deviceScale = Math.min(1, Math.max(0.55, w / 900))

  ctx.save()
  ctx.translate(state.shakeX, state.shakeY)

  if (state.scene === 'cave') {
    // ── Original cave scene ────────────────────────────────────────────────
    drawBackground(
      ctx, w, h,
      state.lantern1, state.lantern2, state.lantern3,
      state.crystal1, state.crystal2, state.crystal3, state.crystal4
    )

    // Static rails — left portion peels away first, then propagates rightward (domino)
    drawRails(ctx, w, h, state.railIntactFromX)

    // Rail segments flying after explosion
    state.railSegments.forEach(seg => drawRailSegment(ctx, seg))

    // Bridge segments (flying planks from blown track)
    state.bridgeSegments.forEach(seg => drawBridgeSegment(ctx, seg))

    // Trailing TNTs on the track
    state.trailingTNTs.forEach(t => {
      if (!t.exploded) drawTNT(ctx, t.x, h * 0.64, t.fuseLength)
    })

    // Ahead TNT
    if (state.tntVisible) {
      drawTNT(ctx, state.tntX, h * 0.64, state.fuseLength)
    }

    state.rocks.forEach(rock => {
      drawRock(ctx, rock.x, rock.y, rock.rotation, rock.size, rock.opacity, rock.puffProgress)
    })

    // Secondary explosions (trailing chain)
    state.secondaryExplosions.forEach(e => {
      drawExplosion(ctx, e.x, e.y, e.progress)
    })

    // Primary explosion
    if (state.explosionActive) {
      drawExplosion(ctx, state.explosionX, state.explosionY, state.explosionProgress)
    }

    const cartRenderY = state.cartY + state.cartBobY
    drawCart(ctx, state.cartX, cartRenderY, state.wheelAngle, deviceScale)
    drawDoge(ctx, state.cartX, cartRenderY - 12, state.dogeExpression, deviceScale)

  } else {
    // ── Entrance scene ────────────────────────────────────────────────────
    drawEntranceScene(
      ctx, w, h,
      state.entranceGlow,
      state.lantern1, state.lantern2,
      state.crystal1, state.crystal2
    )

    const cartRenderY = state.cartY + state.cartBobY
    drawCart(ctx, state.entranceCartX, cartRenderY, state.wheelAngle, deviceScale)
    drawDoge(ctx, state.entranceCartX, cartRenderY - 12, state.dogeExpression, deviceScale)

    // DHD coin flying out of doorway
    if (state.coinVisible) {
      drawDHDCoin(ctx, state.coinX, state.coinY, state.coinScale, state.coinOpacity, state.coinSpin)
    }

    // Welcome text — appears after coin lands
    drawWelcomeText(ctx, w, h, state.welcomeTextOpacity, state.welcomeSubOpacity)
  }

  ctx.restore()

  // Fade overlay (scene cut) — drawn on top, outside shake transform
  if (state.fadeOverlay > 0) {
    ctx.fillStyle = `rgba(0,0,0,${state.fadeOverlay})`
    ctx.fillRect(0, 0, w, h)
  }
}
