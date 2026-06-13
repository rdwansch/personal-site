<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { public: { fullName } } = useRuntimeConfig()
const [firstName, ...rest] = fullName.split(' ')
const restName = rest.join(' ')

const parallaxY = ref(0)
const blobY1 = ref(0)
const blobY2 = ref(0)

function onScroll() {
  const y = window.scrollY
  parallaxY.value = y * 0.35
  blobY1.value   = y * 0.18
  blobY2.value   = y * 0.25
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
  <section class="relative min-h-[92vh] flex flex-col justify-center px-6 lg:px-12 max-w-6xl mx-auto overflow-hidden">
    <!-- Parallax blobs -->
    <div
      class="absolute top-24 right-8 lg:right-12 w-64 h-64 rounded-full bg-accent/10 animate-float pointer-events-none blur-2xl"
      :style="{ transform: `translateY(${blobY1}px)` }"
    />
    <div
      class="absolute bottom-16 left-4 lg:left-8 w-40 h-40 rounded-full bg-teal/10 animate-float-slow pointer-events-none blur-2xl"
      :style="{ transform: `translateY(${blobY2}px)` }"
    />
    <div
      class="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/5 pointer-events-none blur-3xl -translate-x-1/2 -translate-y-1/2"
    />

    <!-- Content shifts gently on scroll -->
    <div
      class="relative z-10"
      :style="{ transform: `translateY(${-parallaxY}px)` }"
    >
      <!-- Label -->
      <p
        class="text-xs font-thin tracking-widest uppercase text-accent opacity-0 animate-fade-in"
        style="animation-fill-mode: forwards;"
      >
        Software Developer
      </p>

      <!-- Name -->
      <h1
        class="text-5xl lg:text-7xl font-sans font-bold text-fg leading-tight tracking-tight mt-4 opacity-0 animate-fade-up"
        style="animation-delay: 120ms; animation-fill-mode: forwards;"
      >
        {{ firstName }}<br />
        <span class="text-accent font-thin">{{ restName }}</span>
      </h1>

      <div class="relative">
      <!-- Tagline -->
      <p
        class="text-base lg:text-lg text-fg-secondary max-w-xl mt-6 leading-relaxed opacity-0 animate-fade-up"
        style="animation-delay: 240ms; animation-fill-mode: forwards;"
      >
        I build fast, focused web experiences — clean interfaces, thoughtful interactions, and code that holds up over time.
      </p>
      <!-- Signature (hand-drawn paths, animated in sequence) -->
      <div
        class="signature mt-8 opacity-0 animate-fade-up static sm:absolute sm:-top-[20px] sm:left-[30%]"
        style="animation-delay: 340ms; animation-fill-mode: forwards;"
        aria-label="Ridwan R Siddiq signature"
      >
        <svg
          ref="sigRoot"
          viewBox="-36 0 583 248"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="sig-svg overflow-visible"
        >
          <!-- 1. R — initial stem/down-stroke -->
          <path
            class="sig-seg" data-dur="850" data-tx="-30" data-ty="8"
            transform="translate(-30 8)"
            d="M145.904 1C145.904 2.21781 145.904 3.43561 145.759 9.47042C145.613 15.5052 145.323 26.3202 143.171 37.0119C141.019 47.7036 137.014 57.9445 131.057 69.9422C125.1 81.94 117.312 95.3843 108.763 108.529C100.214 121.674 91.1387 134.112 82.2197 144.562C73.3007 155.011 64.8126 163.094 56.6614 169.141C48.5102 175.188 40.9532 178.954 33.4897 181.088C26.0262 183.222 18.8853 183.611 14.307 183.594C9.72881 183.577 7.92964 183.142 6.16526 182.611C4.40089 182.08 2.72582 181.465 1 180.832"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />

          <!-- 2. R — bowl + leg swash -->
          <path
            class="sig-seg" data-dur="1300" data-tx="22" data-ty="12"
            transform="translate(22 12)"
            d="M4.56407 21.3419C4.13803 19.7968 2.26477 14.4411 1.14989 9.81343C0.878864 8.68848 0.967142 7.52861 1.48216 6.7756C2.56991 5.18521 5.3901 5.19763 12.3422 4.91232C18.0805 4.67682 28.319 4.63588 39.3637 3.94419C50.4084 3.25251 61.9522 2.00813 78.3852 1.40925C94.8182 0.810365 115.791 0.894685 128.663 1.4933C145.74 2.28742 152.088 5.34744 155.888 7.33391C161.526 10.281 163.91 15.3228 165.163 21.2638C167.456 32.1394 159.908 43.5549 154.988 49.4479C153.449 51.2903 149.994 52.9198 144.42 55.7736C138.846 58.6274 130.859 62.2336 117.17 66.9223C103.481 71.6109 84.3312 77.2728 73.1639 80.6914C59.3325 84.9255 51.5845 87.3073 40.7371 89.2304C28.9752 91.3157 21.1909 90.3765 18.718 89.5603C11.2179 87.0849 5.21872 77.6612 3.73853 74.0247C3.34934 73.0685 3.52356 71.9425 3.78423 71.1155C4.04489 70.2886 4.58542 69.7356 5.66624 69.3225C12.5819 66.6792 20.7064 68.7622 24.7434 70.2278C32.1543 72.9183 41.1939 88.425 46.4125 96.0687C50.3202 101.792 58.1333 107.489 65.7622 112.857C69.2076 115.281 71.9329 116.887 77.7216 122.869C83.5102 128.851 92.3167 139.107 97.2608 144.559C102.746 150.608 106.302 151.282 113.086 152.311C123.502 153.891 135.576 152.657 144.571 151.657C150.982 151.618 155.712 152.084 161.887 151.087C165.607 150.06 170.518 147.974 175.578 145.825"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />

          <!-- 3. rest of the name "idwan R Siddiq" -->
          <path
            class="sig-seg" data-dur="2000" data-tx="185" data-ty="98"
            transform="translate(185 98)"
            d="M1 27.431C1.90541 27.6533 4.29454 28.4241 5.46937 29.3085C8.06579 31.2631 6.7502 38.6601 7.29705 43.8042C7.40992 44.866 7.89856 46.3351 8.68338 47.1123C9.4682 47.8895 10.6727 47.9157 11.5445 47.7803C14.628 47.3016 17.2929 44.203 20.9317 42.263C21.7617 41.8204 22.4043 41.4446 21.8958 42.0758C19.9507 44.4905 17.8722 46.5626 18.016 47.464C18.0874 47.9121 18.9043 48.1631 19.687 48.2367C20.4697 48.3103 21.3847 48.1534 22.0186 47.7879C25.7671 45.6272 22.1603 35.6865 22.0377 27.1327C21.9676 22.238 30.6924 16.7496 35.3581 11.9054C36.431 10.7915 37.1875 9.42862 37.96 8.47259C38.7325 7.51656 39.3486 6.92873 38.1618 9.36302C34.2611 17.3639 29.5318 24.4061 27.1923 27.2195C23.8693 31.2153 24.0404 36.634 24.1954 42.0715C24.2519 44.0528 25.1941 44.4047 26.1782 44.5924C30.6682 45.4486 34.623 42.6931 39.3145 39.1351C40.1048 38.5358 40.7029 39.285 41.1336 40.0744C41.5642 40.8638 41.9892 41.8633 42.1352 42.6409C42.3772 43.9302 40.7123 45.2889 38.9954 46.7427C38.3562 47.2839 38.9737 47.8664 39.4341 48.2736C40.3168 49.0546 41.6425 49.4922 43.3616 49.6087C47.4217 49.8839 50.837 45.1851 53.2589 41.3841C53.6997 40.6924 53.4719 40.0628 53.341 39.5251C53.2101 38.9875 52.9786 38.5011 52.8744 39.279C52.1115 44.9735 54.1879 47.3341 55.1886 48.6893C57.8151 52.246 68.0441 49.9995 69.7463 49.0095C70.5086 48.5662 70.5898 47.8265 70.6538 47.254C70.9201 44.875 67.2493 43.1661 67.2858 42.107C67.3031 41.6038 67.8265 41.221 68.4455 40.9646C72.8804 39.1281 83.9113 39.8774 91.0398 39.0229C93.113 38.7744 92.0524 38.9088 90.9936 39.1583C86.4603 40.2267 82.8646 43.5863 81.1586 46.9982C80.8132 47.6889 81.0292 48.2325 81.5088 48.5353C85.3535 50.963 92.9116 48.3225 95.633 46.6048C97.2307 45.5964 98.0432 43.5103 98.4147 41.4427C98.568 40.5891 98.0464 40.0987 97.2914 39.6318C96.5365 39.165 95.4097 38.7278 95.267 38.9619C93.6234 41.6566 97.4061 44.6344 97.2828 47.2876C97.2017 49.0333 92.5609 43.7526 89.2681 42.7721C88.4472 42.5277 87.536 42.6373 89.1413 42.6312C94.8514 42.6095 99.6891 42.2471 100.812 41.4527C101.36 41.0643 101.728 40.5929 101.77 40.0311C101.865 38.7841 100.111 37.4501 98.6723 36.0542C98.0339 35.4347 98.5239 34.5468 99.1276 33.913C101.434 31.4913 111.172 31.9692 117.118 32.9371C123.015 33.8972 122.389 42.9393 122.753 43.4962C123.973 45.3656 123.76 36.8437 124.754 33.9191C126.134 29.8615 129.574 24.1809 131.575 20.0717C132.05 19.0962 133.036 18.0497 133.986 17.3938C134.936 16.738 135.969 16.5574 136.73 16.6334C137.49 16.7095 137.947 17.0476 138.28 17.4805C138.613 17.9134 138.809 18.4309 138.888 19.0397C139.475 23.5845 130.974 28.6538 127.749 29.3632C125.076 29.9509 133.256 30.9335 134.472 31.6692C137.376 33.4261 138.205 36.5755 140.373 38.9377C142.56 41.3199 145.287 42.5764 146.274 42.8284C148.732 43.4553 150.912 39.1619 154.636 35.6916C155.864 34.5482 157.275 32.9295 157.822 32.5319C158.234 32.2319 157.316 34.4449 157.064 35.0643C156.32 36.8924 159.637 30.6344 162.801 28.5826C168.308 25.0108 174.521 27.7127 176.004 27.8474C178.756 28.0974 168.639 25.9444 165.929 26.4319C164.414 26.7046 163.617 28.1421 162.967 29.4462C162.125 31.1363 162.8 33.0673 163.127 34.3744C163.271 34.9523 163.89 35.2387 164.55 35.4352C167.907 36.4352 171.991 35.1768 175.22 34.1063C175.986 33.8526 176.8 34.162 177.066 34.5012C178.382 36.1784 172.899 39.2923 168.431 42.0918C165.441 43.9651 163.26 44.2016 162.513 44.3777C159.413 45.1089 172.448 40.1732 179.018 36.5488C180.626 35.6615 182.047 34.6676 182.998 34.3971C183.948 34.1265 184.359 34.5798 184.794 35.1328C186.648 37.4931 187.08 39.33 187.359 39.741C188.785 41.8381 192.881 35.3634 198.249 33.0543C199.784 32.394 201.316 31.6793 201.916 31.5255C203.845 31.031 199.558 35.3658 199.504 36.8987C199.48 37.5796 200.363 37.9914 201.087 38.2513C201.811 38.5113 202.579 38.5885 203.091 38.3929C203.603 38.1973 203.835 37.7265 203.618 37.2938C202.314 34.6965 198.913 32.1304 198.593 29.2541C198.132 25.1241 201.538 22.7403 208.645 16.1377C213.942 11.2172 221.078 8.11791 223.777 6.26043C225.293 5.21665 226.939 3.82009 224.223 5.12212C214.003 10.0224 206.365 15.3151 204.891 18.9321C199.442 32.3041 200.591 35.2914 200.937 36.6151C201.804 39.9257 218.277 34.6088 224.531 32.2717C226.331 31.5991 219.628 34.2088 216.31 38.1185C215.626 38.9242 215.712 39.4989 216.027 39.8901C216.736 40.7705 220.071 41.361 223.814 42.0613C225.252 42.3304 225.859 41.9864 225.945 41.6923C226.48 39.8761 224.609 36.8467 226.33 30.3334C226.826 28.4562 227.87 26.7726 230.995 23.2008C234.121 19.629 239.498 14.2594 243.99 10.2257C251.579 3.41006 256.957 0.427431 256.702 1.09028C254.141 7.73508 244.059 9.48319 241.903 12.1095C232.962 22.9978 231.899 31.1147 231.033 34.0016C230.593 35.4688 230.699 37.0255 232.231 37.1319C237.108 37.4708 242.566 33.4979 246.107 32.1735C247.02 31.832 245.588 35.3476 245.556 37.1361C245.492 40.6671 254.604 33.6829 259.72 32.0771C261.604 31.4858 264.359 30.3296 265.46 29.8658C266.433 29.4562 260.555 34.172 259.23 38.5271C258.41 41.2231 266.339 33.8626 268.405 32.9155C269.391 32.4638 270.288 32.1248 269.763 38.9639C269.238 45.8031 267.273 59.8445 266.188 70.119C264.464 86.4479 264.889 92.0424 265.633 90.2932C266.105 89.1818 267.537 87.864 268.224 87.4141C268.828 87.0185 269.462 89.2018 270.439 90.6054C271.838 92.616 273.771 86.346 275.589 85.2139C276.635 85.8054 276.967 87.3452 277.052 88.2606C277.136 88.3927 277.306 87.8497 278 87.277"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />

          <!-- 4. underline sweep, left → right -->
          <path
            class="sig-seg" data-dur="950" data-tx="6" data-ty="138"
            transform="translate(6 138)"
            d="M1 94.7681C1.03151 94.7355 1.06301 94.7029 7.6432 90.3821C14.2234 86.0613 27.3513 77.4534 46.2108 68.5795C65.0703 59.7056 89.2636 50.8265 108.732 44.7705C128.2 38.7145 142.21 35.7507 156.933 33.488C171.656 31.2253 186.668 29.7535 202.15 26.6914C217.632 23.6293 233.13 19.0216 285.991 14.7024C338.852 10.3832 428.607 6.49218 519.647 1.00003"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />

          <!-- Quill — JS positions it on the active stroke's tip, then it fades -->
          <g class="sig-quill" aria-hidden="true">
            <path d="M19 1C19 1 21 6 13 12C6 17 3 21 2 26" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M13 12C15 8 19 4 20 2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>
            <path d="M2 26L1 27.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M2 26C2.6 23 5 20 6 19" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>
          </g>
        </svg>
      </div>
      </div>

      <!-- CTA -->
      <div
        class="mt-7 flex gap-4 opacity-0 animate-fade-up"
        style="animation-delay: 360ms; animation-fill-mode: forwards;"
      >
        <NuxtLink
          to="/experiences"
          class="bg-accent text-white px-8 py-3.5 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0"
        >
          View Experiences
        </NuxtLink>
        <!-- <NuxtLink
          to="/about"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full self-center"
        >
          About Me
        </NuxtLink> -->
      </div>

      <!-- Scroll hint -->
      <div
        class="mt-20 flex flex-col items-start gap-2 opacity-0 animate-fade-in"
        style="animation-delay: 800ms; animation-fill-mode: forwards;"
      >
        <span class="text-xs tracking-widest uppercase text-fg-tertiary">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-fg-tertiary to-transparent" />
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
  width: 340px;
  max-width: 80vw;
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
