import { onMounted, onUnmounted, ref } from 'vue'

export function useStaggerReveal() {
  const containerRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = (entry.target as HTMLElement).querySelectorAll('[data-stagger]')
            items.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-up')
                el.classList.remove('opacity-0')
              }, i * 100)
            })
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { containerRef }
}
