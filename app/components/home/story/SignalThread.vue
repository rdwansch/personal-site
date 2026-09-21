<template>
  <svg class="signal-thread" viewBox="0 0 1000 10000" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-signal>
    <path data-signal-path d="M 820 100 C 600 200 990 260 880 480 S 650 680 880 950 C 960 1250 940 1450 940 1900 L 940 9500 Q 940 9700 820 9700 L 180 9700" />
    <path id="signal-orbit" class="signal-orbit" data-signal-orbit d="M 500 420 C 820 180 820 660 500 420 C 180 180 180 660 500 420" />
    <g class="signal-object" data-signal-object>
      <circle class="signal-object__halo" r="20" />
      <circle class="signal-object__core" r="7" />
    </g>
    <path data-signal-branch="keep" d="M 940 2600 Q 810 2650 860 2750 T 940 2950" />
    <path data-signal-branch="reject" d="M 940 2600 Q 990 2700 980 2850" />
  </svg>
</template>

<style scoped>
.signal-thread { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; fill: none; stroke: var(--color-lime); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.signal-thread path { vector-effect: non-scaling-stroke; }
.signal-orbit { stroke: var(--color-paper); stroke-width: 1.5; stroke-dasharray: 7 12; opacity: 0.42; }
.signal-object { stroke: none; }
.signal-object__halo { fill: var(--color-pink); opacity: 0.22; }
.signal-object__core { fill: var(--color-lime); }
[data-signal-branch='reject'] { stroke: var(--color-pink); }
[data-signal-branch='keep'] { stroke: var(--color-lime); }
@media (max-width: 767px) {
  .signal-thread { width: 1rem; left: auto; right: 0.2rem; opacity: 0.55; }
  .signal-orbit, .signal-object { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  [data-signal-branch], .signal-orbit, .signal-object { display: none; }
}
</style>
