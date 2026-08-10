<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { public: { fullName } } = useRuntimeConfig()
const displayName = (fullName as string) || 'Ridhwan R Siddiq'
const [firstName, ...rest] = displayName.split(' ')
const restName = rest.join(' ')

const parallaxY = ref(0)
const blobY1 = ref(0)
const blobY2 = ref(0)
const cardY = ref(0)

function onScroll() {
  const y = window.scrollY
  parallaxY.value = y * 0.35
  blobY1.value   = y * 0.18
  blobY2.value   = y * 0.25
  cardY.value    = y * 0.12
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/* ── Signature: sequential handwriting draw + quill that rides the stroke tip ── */
const sigRoot = ref<SVGSVGElement | null>(null)
let sigRaf = 0

onMounted(() => {
  const svg = sigRoot.value
  if (!svg) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const quill = svg.querySelector<SVGGElement>('.sig-quill')

  const segs = Array.from(svg.querySelectorAll<SVGPathElement>('.sig-seg')).map((el) => {
    const len = el.getTotalLength()
    el.style.strokeDasharray = String(len)
    el.style.strokeDashoffset = reduce ? '0' : String(len)
    return {
      el,
      len,
      dur: Number(el.dataset.dur) || 1000,
      tx: Number(el.dataset.tx) || 0,
      ty: Number(el.dataset.ty) || 0,
      start: 0,
    }
  })

  if (reduce) {
    if (quill) quill.style.display = 'none'
    return
  }

  const START_DELAY = 700 // wait for the fade-up to settle
  const GAP = 130 // pen-lift pause between strokes
  const NIB_X = 1.2
  const NIB_Y = 27 // quill nib tip in its local coords

  let cursor = START_DELAY
  for (const s of segs) {
    s.start = cursor
    cursor += s.dur + GAP
  }
  const endTime = cursor - GAP

  // neutral, even handwriting motion
  const ease = (p: number) => -(Math.cos(Math.PI * p) - 1) / 2

  const t0 = performance.now()
  let lastTip: { seg: typeof segs[number]; e: number } | null = null

  function frame(now: number) {
    const t = now - t0
    let active: { seg: typeof segs[number]; e: number } | null = null

    for (const s of segs) {
      if (t < s.start) continue
      const lt = Math.min((t - s.start) / s.dur, 1)
      const e = ease(lt)
      s.el.style.strokeDashoffset = String(s.len * (1 - e))
      if (lt < 1) active = { seg: s, e }
    }

    if (active) lastTip = active

    if (quill) {
      // Fade the quill in as each stroke begins and out as it ends, so the
      // jump between pen-lifts (and the final exit) reads as smooth, not a snap.
      const FADE = 180
      let op = 0
      for (const s of segs) {
        if (t >= s.start && t <= s.start + s.dur) {
          const into = t - s.start
          const left = s.start + s.dur - t
          op = Math.max(op, Math.min(1, into / FADE, left / FADE))
        }
      }
      quill.style.opacity = String(op)

      if (lastTip) {
        const { seg, e } = lastTip
        const pt = seg.el.getPointAtLength(seg.len * e)
        const x = seg.tx + pt.x - NIB_X
        const y = seg.ty + pt.y - NIB_Y
        quill.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(-16 ${NIB_X} ${NIB_Y})`)
      }
    }

    if (t < endTime + 420) sigRaf = requestAnimationFrame(frame)
  }
  sigRaf = requestAnimationFrame(frame)
})

onUnmounted(() => cancelAnimationFrame(sigRaf))
</script>

<template>
  <section class="relative isolate mx-auto grid min-h-[100svh] max-w-6xl items-center gap-20 overflow-x-hidden px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:overflow-hidden lg:px-12 lg:py-32">
    <div class="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" :style="{ transform: `translateY(${blobY1}px)` }" />
    <div class="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-teal/10 blur-3xl" :style="{ transform: `translateY(${blobY2}px)` }" />

    <div class="relative z-10 lg:pr-6" :style="{ transform: `translateY(${-parallaxY}px)` }">
      <div class="mb-12 flex items-center gap-4 opacity-0 animate-fade-in sm:mb-14" style="animation-fill-mode: forwards;">
        <span class="h-px w-10 bg-accent sm:w-14" />
        <span class="text-[10px] font-medium uppercase tracking-[0.28em] text-fg-secondary sm:text-xs sm:tracking-[0.3em]">Hi!</span>
      </div>

      <!-- Name -->
      <h1
        class="max-w-3xl text-[clamp(3.5rem,15vw,6rem)] font-sans font-bold leading-[0.88] tracking-[-0.065em] text-fg opacity-0 animate-fade-up lg:text-[clamp(5rem,8vw,8.5rem)]"
        style="animation-delay: 120ms; animation-fill-mode: forwards;"
      >
        {{ firstName }}<br />
        <span class="text-accent">{{ restName }}</span>
      </h1>

      <div class="relative mt-10 sm:mt-12">
       <p
         class="max-w-xl border-l-2 border-teal pl-5 text-base leading-[1.8] text-fg-secondary opacity-0 animate-fade-up sm:pl-6 lg:text-lg"
         style="animation-delay: 240ms; animation-fill-mode: forwards;"
       >
         Crafting clean interfaces and thoughtful web experiences, built on code that scales and endures.
       </p>
       <div
         class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 opacity-0 animate-fade-up"
         style="animation-delay: 360ms; animation-fill-mode: forwards;"
       >
         <a
           href="#contact"
           class="group inline-flex items-center gap-3 border-b-2 border-accent pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:border-teal hover:text-teal"
         >
           Start a conversation
           <span class="text-base transition-transform duration-300 group-hover:translate-x-1">↗</span>
         </a>
         <span class="text-xs uppercase tracking-[0.16em] text-fg-tertiary">Open to thoughtful collaborations</span>
       </div>
       </div>

    </div>

    <div
      class="relative flex min-h-[390px] items-start justify-center sm:min-h-[470px] lg:min-h-[520px] lg:pt-48"
      :style="{ transform: `translateY(${cardY}px)` }"
    >
      <div class="pointer-events-none absolute left-1/2 top-2 h-64 w-64 -translate-x-1/2 rounded-full border border-accent/20 sm:top-4 sm:h-72 sm:w-72 lg:left-auto lg:right-8 lg:translate-x-0" />
      <div class="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-[42%] rounded-full border border-teal/20 sm:top-16 sm:h-72 sm:w-72 lg:left-auto lg:right-20 lg:translate-x-0" />
      <div class="relative top-0 w-full max-w-md rotate-2 border border-border bg-raised p-3 shadow-[10px_10px_0_var(--color-accent)] transition-transform duration-500 hover:rotate-0 sm:rotate-3 sm:p-4 sm:shadow-[18px_18px_0_var(--color-accent)] lg:-top-20">
        <div class="flex items-center justify-between border-b border-border pb-4 text-[10px] uppercase tracking-[0.25em] text-fg-tertiary">
          <span>Since</span><span>2024</span>
        </div>
        <div class="relative flex h-56 items-center justify-center overflow-hidden bg-surface sm:h-72">
          <div class="absolute h-44 w-44 rounded-full bg-accent/15 blur-2xl sm:h-56 sm:w-56" />
          <div class="relative text-center">
            <span class="mb-3 block text-4xl font-bold tracking-[-0.08em] text-fg sm:text-6xl">Web<span class="text-teal">/</span>Developer</span>
            <span class="text-[10px] uppercase tracking-[0.25em] text-fg-secondary sm:text-xs sm:tracking-[0.35em]">{{ '</>' }}</span>
          </div>
          <span class="absolute left-5 top-5 text-4xl text-teal">+</span>
          <span class="absolute bottom-5 right-5 h-3 w-3 rounded-full bg-accent" />
        </div>
        <div class="flex items-end justify-between pt-5">
          <p class="max-w-[13rem] text-xs leading-relaxed text-fg-secondary sm:text-sm">The world becomes from your canvas.</p>
          <span class="text-3xl text-accent">↗</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Signature ── */
.signature {
  color: var(--color-accent, #6366f1);
}

.sig-svg {
  display: block;
  width: min(340px, 72vw);
  max-width: 100%;
  height: auto;
}

/* Hide strokes before JS measures/animates them (prevents SSR flash of the
   full signature on first paint). JS overrides with each path's real length. */
.sig-seg {
  stroke-dasharray: 20000;
  stroke-dashoffset: 20000;
}

.sig-quill {
  color: var(--color-accent, #6366f1);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .sig-seg { stroke-dashoffset: 0; }
}
</style>
