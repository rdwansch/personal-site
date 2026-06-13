<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

interface Ripple {
  id: number
  x: number
  y: number
}

const cursorX = ref(-100)
const cursorY = ref(-100)
const isClicking = ref(false)
const isVisible = ref(false)
const ripples = ref<Ripple[]>([])
let rippleId = 0

// ── Trail via canvas ──────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let rafId: number

interface Point { x: number; y: number; age: number }
const trail: Point[] = []
const TRAIL_MAX = 48
const TRAIL_LIFE = 500 // ms

let lastTime = 0

// Detect touch-first devices (iPhone, iPad, Android, etc.) by user agent.
// iPadOS 13+ reports a desktop UA, so also treat Mac with touch points as iPad.
function isTouchDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const isMobileUA = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Silk/i.test(ua)
  const isIpadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
  return isMobileUA || isIpadOS
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function drawTrail(now: number) {
  const dt = now - lastTime
  lastTime = now

  // age out old points
  for (const p of trail) p.age += dt
  while (trail.length && trail[0].age > TRAIL_LIFE) trail.shift()

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (trail.length < 1) { rafId = requestAnimationFrame(drawTrail); return }

  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent').trim()

  // draw each trail point as a small fading circle
  for (let i = 0; i < trail.length; i++) {
    const p = trail[i]
    const t = 1 - p.age / TRAIL_LIFE          // 1 = fresh, 0 = gone
    const radius = 1.4 + t * 1.2              // shrinks as it ages
    const alpha = t * 0.7

    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = accentColor
    ctx.globalAlpha = alpha
    ctx.fill()
  }

  ctx.globalAlpha = 1
  rafId = requestAnimationFrame(drawTrail)
}

function onMouseMove(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  isVisible.value = true
  trail.push({ x: e.clientX, y: e.clientY, age: 0 })
  if (trail.length > TRAIL_MAX) trail.shift()
}

function onMouseDown(e: MouseEvent) {
  isClicking.value = true
  const id = ++rippleId
  ripples.value.push({ id, x: e.clientX, y: e.clientY })
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 900)
}

function onMouseUp() { isClicking.value = false }

// ── Touch support (ripple circle + trail, no arrow) ──────────
function onTouchMove(e: TouchEvent) {
  const t = e.touches[0]
  if (!t) return
  cursorX.value = t.clientX
  cursorY.value = t.clientY
  trail.push({ x: t.clientX, y: t.clientY, age: 0 })
  if (trail.length > TRAIL_MAX) trail.shift()
}

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  if (!t) return
  const id = ++rippleId
  ripples.value.push({ id, x: t.clientX, y: t.clientY })
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 900)
}

// On touch-first devices (iPhone, iPad, Android…) we keep the ripple circle
// and trail, but hide the arrow cursor and never hide the native cursor.
const isTouch = ref(false)

onMounted(async () => {
  isTouch.value = isTouchDevice()
  if (!isTouch.value) document.documentElement.classList.add('custom-cursor')

  await nextTick()
  canvas = canvasRef.value!
  ctx = canvas.getContext('2d')!
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  if (isTouch.value) {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
  } else {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', () => { isVisible.value = false; trail.length = 0 })
    document.addEventListener('mouseenter', () => { isVisible.value = true })
  }

  lastTime = performance.now()
  rafId = requestAnimationFrame(drawTrail)
})

onUnmounted(() => {
  document.documentElement.classList.remove('custom-cursor')
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <ClientOnly>
    <!-- Trail canvas -->
    <canvas ref="canvasRef" class="cursor-canvas" />

    <!-- Click ripples -->
    <div
      v-for="r in ripples"
      :key="r.id"
      class="cursor-ripple"
      :style="{ left: `${r.x}px`, top: `${r.y}px` }"
    />

    <!-- Arrow cursor (hidden on touch devices) -->
    <div
      v-show="isVisible && !isTouch"
      class="cursor-pos"
      :style="{ transform: `translate(${cursorX}px, ${cursorY}px)` }"
    >
      <div class="cursor-inner" :class="{ 'is-clicking': isClicking }">
        <svg width="14" height="17" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="1,0.5 1,14.5 4.8,10.8 6.9,16 8.4,15.4 6.3,10.1 11.5,10.1"
            class="arrow-fill"
            stroke="white"
            stroke-width="0.8"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.cursor-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
}

.cursor-pos {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  margin-left: -1px;
  margin-top: -0.5px;
}

.cursor-inner {
  transform-origin: 1px 0.5px;
  transition: transform 0.08s ease;
}

.cursor-inner.is-clicking {
  animation: arrow-press 0.18s var(--ease-out-back);
}

@keyframes arrow-press {
  0%   { transform: scale(1); }
  40%  { transform: scale(0.7); }
  100% { transform: scale(1); }
}

.arrow-fill {
  fill: var(--color-accent);
  transition: fill 0.12s ease;
}

/* Ripple on click */
.cursor-ripple {
  position: fixed;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  border: 0.5px solid var(--color-accent);
  pointer-events: none;
  z-index: 9998;
  animation: ripple-expand 0.9s cubic-bezier(0.2, 0.6, 0.4, 1) forwards;
}

@keyframes ripple-expand {
  0%   { transform: scale(0);   opacity: 0.9; }
  50%  { opacity: 0.45; }
  100% { transform: scale(10);  opacity: 0; }
}
</style>
