<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { public: { email, linkedin, github } } = useRuntimeConfig()

const sent = ref(false)

function handleEmailClick() {
  if (sent.value) return
  sent.value = true
  setTimeout(() => { sent.value = false }, 2200)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#contact .reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section id="contact" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <div class="max-w-xl">
      <div class="reveal">
        <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Get in Touch</p>
        <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight mb-6">Contact</h2>
        <p class="text-base lg:text-lg text-fg-secondary leading-relaxed mb-10">
          Open to new opportunities, collaborations, or just a conversation about something interesting. Drop me a line.
        </p>
      </div>

      <div class="reveal" style="transition-delay: 80ms">
      <a
        :href="`mailto:${email}`"
        class="email-btn"
        :class="{ 'is-sent': sent }"
        @click="handleEmailClick"
      >
        <span class="email-btn__ripple" />
        <span class="email-btn__icon">
          <!-- envelope -->
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="13" height="10" rx="0.5" stroke="currentColor"/>
            <path d="M0.5 1.5L7 6.5L13.5 1.5" stroke="currentColor"/>
          </svg>
          <!-- paper plane (shown on sent) -->
          <svg class="email-btn__plane" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="email-btn__label">{{ sent ? 'Opening mail…' : email }}</span>
      </a>
      </div>

      <div class="flex gap-6 mt-10 reveal" style="transition-delay: 160ms">
        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
        >
          GitHub
        </a>
        <a
          :href="linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.email-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  overflow: hidden;
  background-color: var(--color-accent);
  color: white;
  padding: 0.875rem 2rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: transform 0.3s var(--ease-out-back), box-shadow 0.3s ease, background-color 0.3s ease;
  text-decoration: none;
}

.email-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--color-accent) 35%, transparent);
}

/* Ripple fill on click */
.email-btn__ripple {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-accent-teal) 80%, white);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0s;
  z-index: 0;
}

.email-btn.is-sent .email-btn__ripple {
  transform: scaleX(1);
  transition: transform 0.4s var(--ease-out-expo);
}

.email-btn__icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 14px;
  height: 14px;
}

/* envelope fades out, plane flies in */
.email-btn__icon svg:first-child {
  position: absolute;
  transition: opacity 0.2s ease, transform 0.3s var(--ease-out-back);
}

.email-btn__plane {
  position: absolute;
  opacity: 0;
  transform: translate(-6px, 6px) scale(0.5);
  transition: opacity 0.25s ease 0.15s, transform 0.35s var(--ease-out-back) 0.15s;
}

.email-btn.is-sent .email-btn__icon svg:first-child {
  opacity: 0;
  transform: translate(4px, -4px) scale(0.5);
}

.email-btn.is-sent .email-btn__plane {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

.email-btn__label {
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}
</style>
