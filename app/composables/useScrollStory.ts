import { onMounted, onBeforeUnmount, type Ref } from 'vue'

/** One lifecycle owns the homepage's motion and thread geometry. */
export function useScrollStory(root: Ref<HTMLElement | null>) {
  let disposed = false
  let cleanup: (() => void) | undefined

  onMounted(async () => {
    const element = root.value
    if (!element) return

    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      await document.fonts.ready
      if (disposed) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      const context = gsap.context(() => {}, element)
      const originalAttributes = Array.from(element.querySelectorAll('[data-signal], [data-signal] path'))
        .map(node => ({ node, attributes: Array.from(node.attributes).map(attribute => [attribute.name, attribute.value] as const) }))
      const restoreThread = () => originalAttributes.forEach(({ node, attributes }) => {
        Array.from(node.attributes).forEach(attribute => node.removeAttribute(attribute.name))
        attributes.forEach(([name, value]) => node.setAttribute(name, value))
      })
      let releaseBranch: (() => void) | undefined
      cleanup = () => {
        releaseBranch?.()
        releaseBranch = undefined
        media.revert()
        context.revert()
        restoreThread()
      }
      context.add(() => {
        media.add({
          desktop: '(min-width: 1024px) and (min-height: 700px)',
          mobile: '(max-width: 1023px), (max-height: 699px)',
          reduce: '(prefers-reduced-motion: reduce)',
        }, (match) => {
          const { desktop, reduce } = match.conditions ?? {}
          // SSR styles already form the complete reduced-motion narrative.
          if (reduce) return

          const svg = element.querySelector<SVGSVGElement>('[data-signal]')
          const path = element.querySelector<SVGPathElement>('[data-signal-path]')
          const orbit = element.querySelector<SVGPathElement>('[data-signal-orbit]')
          const signalObject = element.querySelector<SVGGElement>('[data-signal-object]')
          const kept = element.querySelector<SVGPathElement>('[data-signal-branch="keep"]')
          const rejected = element.querySelector<SVGPathElement>('[data-signal-branch="reject"]')
          if (!svg || !path || !orbit || !signalObject || !kept || !rejected) return

          const styles = getComputedStyle(element)
          const pinTop = 0
          const palette = Object.fromEntries(['ink', 'paper', 'lime', 'pink', 'heat'].map(name =>
            [name, styles.getPropertyValue(`--color-${name}`).trim()]))
          let geometryFrame = 0
          let orbitLength = 0
          let previousWidth = element.clientWidth
          let previousHeight = element.offsetHeight

          // offsetTop follows document layout, ignoring the transforms used by pins.
          const position = (node: HTMLElement) => {
            let x = 0
            let y = 0
            let current: HTMLElement | null = node
            while (current && current !== element) {
              x += current.offsetLeft
              y += current.offsetTop
              current = current.offsetParent as HTMLElement | null
            }
            return { x, y }
          }

          const syncThread = () => {
            if (disposed) return
            const width = element.clientWidth
            const height = element.offsetHeight
            const rail = width - Math.max(20, width * 0.045)
            const hello = element.querySelector<HTMLElement>('#hello')!
            const ai = element.querySelector<HTMLElement>('#ai')!
            const contact = element.querySelector<HTMLElement>('#contact')!
            const heroTop = position(hello).y
            const heroHeight = hello.offsetHeight
            const turn = Math.min(180, width * 0.14)
            const aiY = position(ai).y + ai.offsetHeight * 0.45
            const aiX = desktop ? width * 0.14 : rail
            const contactY = position(contact).y
            const email = element.querySelector<HTMLElement>('[data-thread-end]')
            svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
            const scenes = Array.from(element.querySelectorAll<HTMLElement>('[data-chapter]'))
            const anchors = scenes.map((scene, index) => ({
              x: index % 2 === 0 ? width * 0.14 : width * 0.86,
              y: position(scene).y + scene.offsetHeight * (index === 0 ? 0.16 : 0.5),
            }))
            let d = desktop && anchors.length
              ? `M ${anchors[0]!.x} ${heroTop + 45}`
              : `M ${rail} ${heroTop + 20}`
            if (desktop) {
              for (let index = 1; index < anchors.length; index += 1) {
                const previous = anchors[index - 1]!
                const next = anchors[index]!
                const middleY = (previous.y + next.y) / 2
                d += ` C ${previous.x} ${middleY} ${next.x} ${middleY} ${next.x} ${next.y}`
              }
            } else {
              d += ` L ${rail} ${contactY}`
            }
            if (desktop && email) {
              const endpoint = position(email)
              const underlineY = endpoint.y + email.offsetHeight - 1.5
              const right = endpoint.x + email.offsetWidth
              const last = anchors.at(-1) ?? { x: rail, y: contactY }
              d += ` C ${last.x} ${underlineY - 120} ${right} ${underlineY - 90} ${right} ${underlineY} L ${endpoint.x} ${underlineY}`
            } else {
              d += ` L ${rail} ${height - 40}`
            }
            path.setAttribute('d', d)
            const orbitCenterX = width * 0.56
            const orbitCenterY = heroTop + heroHeight * 0.56
            const orbitRadiusX = Math.min(width * 0.38, 570)
            const orbitRadiusY = Math.min(heroHeight * 0.24, 190)
            orbit.setAttribute('d', `M ${orbitCenterX} ${orbitCenterY} C ${orbitCenterX + orbitRadiusX} ${orbitCenterY - orbitRadiusY} ${orbitCenterX + orbitRadiusX} ${orbitCenterY + orbitRadiusY} ${orbitCenterX} ${orbitCenterY} C ${orbitCenterX - orbitRadiusX} ${orbitCenterY - orbitRadiusY} ${orbitCenterX - orbitRadiusX} ${orbitCenterY + orbitRadiusY} ${orbitCenterX} ${orbitCenterY}`)
            orbitLength = orbit.getTotalLength()
            kept.setAttribute('d', `M ${aiX} ${aiY} Q ${aiX + turn} ${aiY + 30} ${aiX + turn * 0.6} ${aiY + 90} T ${aiX} ${aiY + 180}`)
            rejected.setAttribute('d', `M ${aiX} ${aiY} Q ${aiX - turn * 0.35} ${aiY + 50} ${aiX - turn * 0.2} ${aiY + 130}`)
          }

          // Pins are added in reading order before the overall progress trigger.
          if (desktop) {
            element.querySelectorAll<HTMLElement>('[data-pin]').forEach(stage => {
              // Short windows and enlarged text keep their ordinary document flow.
              if (stage.offsetHeight > window.innerHeight - pinTop + 1) return
              const kind = stage.dataset.pin
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: stage,
                  start: `top ${pinTop}`,
                  end: () => `+=${window.innerHeight * (kind === 'hero' ? 1.4 : kind === 'ai' ? 0.9 : 0.55)}`,
                  pin: true,
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              })
              if (kind === 'hero') {
                timeline.to(stage.querySelector('[data-axis]'), {
                  fontVariationSettings: '"wdth" 105, "wght" 750', duration: 1,
                }, 0)
                timeline.to(stage.querySelectorAll('[data-tab]'), {
                  x: (index: number) => [-120, 40, 140][index] ?? 0,
                  y: (index: number) => [-55, -22, -78][index] ?? 0,
                  rotation: 0,
                  stagger: 0.08,
                  duration: 1,
                }, 0)
              } else if (kind === 'ai') {
                timeline.fromTo(stage.querySelector('[data-suggestion]'), { opacity: 0.55, x: -10 }, { opacity: 1, x: 0, duration: 0.3 })
                timeline.fromTo(stage.querySelector('[data-keep]'), { opacity: 0.55 }, { opacity: 1, duration: 0.35 })
                timeline.to(stage.querySelector('[data-reject]'), { opacity: 0, x: 16, duration: 0.35 }, '<')
                timeline.fromTo(stage.querySelectorAll('.story-word'), { opacity: 0.85, y: 8 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 })
                timeline.to(rejected, { opacity: 0, duration: 0.35 }, 0.3)
              } else {
                timeline.fromTo(stage.querySelectorAll('[data-project-detail]'), { y: 14, opacity: 1 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1 })
              }
            })

            const tools = element.querySelector<HTMLElement>('#tools')!
            gsap.fromTo(tools.querySelectorAll('.story-word'), { opacity: 0.85, y: 10 }, {
              opacity: 1, y: 0, stagger: 0.12,
              scrollTrigger: { trigger: tools, start: 'top 70%', end: 'center 60%', scrub: 0.5 },
            })
            gsap.to(tools.querySelector('[data-axis]'), {
              fontVariationSettings: '"wdth" 108, "wght" 700',
              scrollTrigger: { trigger: tools, start: 'top 75%', end: 'center center', scrub: 0.5 },
            })
          }

          syncThread()
          if (desktop) {
            const orbitState = { distance: 0 }
            gsap.to(orbitState, {
              distance: 1,
              duration: 13,
              repeat: -1,
              ease: 'none',
              onUpdate: () => {
                if (!orbitLength) return
                const point = orbit.getPointAtLength(orbitLength * orbitState.distance)
                signalObject.setAttribute('transform', `translate(${point.x} ${point.y})`)
              },
            })
            gsap.to(orbit, { strokeDashoffset: -38, duration: 4, repeat: -1, ease: 'none' })
          }
          path.setAttribute('pathLength', '1')
          gsap.set(path, { strokeDasharray: 1 })
          gsap.fromTo(path, { strokeDashoffset: 0.98 }, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top top',
              end: 'bottom bottom',
              scrub: desktop ? 0.5 : false,
            },
          })
          element.querySelectorAll<HTMLElement>('[data-chapter]').forEach(scene => {
            const selectChapter = () => {
              path.setAttribute('stroke', palette[scene.dataset.thread ?? 'lime'] ?? palette.lime ?? '')
            }
            ScrollTrigger.create({
              trigger: scene,
              start: `top ${pinTop + 120}`,
              end: `bottom ${pinTop + 120}`,
              onEnter: selectChapter,
              onEnterBack: selectChapter,
            })
          })

          ScrollTrigger.addEventListener('refresh', syncThread)
          const observer = new ResizeObserver(() => {
            const width = element.clientWidth
            const height = element.offsetHeight
            if (width === previousWidth && height === previousHeight) return
            previousWidth = width
            previousHeight = height
            cancelAnimationFrame(geometryFrame)
            geometryFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
          })
          releaseBranch = () => {
            observer.disconnect()
            cancelAnimationFrame(geometryFrame)
            ScrollTrigger.removeEventListener('refresh', syncThread)
            restoreThread()
          }
          observer.observe(element)
          ScrollTrigger.refresh()
          return () => {
            releaseBranch?.()
            releaseBranch = undefined
          }
        }, element)
      })
    } catch (error) {
      // Animation is optional; leave every server-rendered scene readable.
      cleanup?.()
      console.warn('Homepage motion unavailable; using the static story.', error)
    }
  })

  onBeforeUnmount(() => {
    disposed = true
    cleanup?.()
  })

}
