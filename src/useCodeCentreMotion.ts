import { useClientEffect } from "./useClientEffect"
import { type Ref } from "vue"
/** Observe newly mounted articles and filter results without replaying the whole page. */
export function useCodeCentreMotion(root: Ref<HTMLDivElement | null>) {
  useClientEffect(
    () => {
      const page = root.value
      if (!page) return
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
      let frame = 0
      const clamp = (value: number) => Math.max(0, Math.min(1, value))
      const update = () => {
        frame = 0
        const disabled =
          preference.matches || page.classList.contains("cc-motion-paused")
        const hero = page.querySelector<HTMLElement>(".cc-hero")
        const grid = page.querySelector<HTMLElement>(".cc-hero-grid")
        if (hero && grid) {
          const bounds = hero.getBoundingClientRect()
          const progress = disabled
            ? 0
            : clamp(-bounds.top / Math.max(1, bounds.height * 0.8))
          grid.style.setProperty(
            "--scroll-opacity",
            String(1 - progress * 0.85),
          )
          grid.style.setProperty("--scroll-shift", `${progress * 65}px`)
          grid.style.setProperty("--scroll-scale", String(1 - progress * 0.035))
        }
        page
          .querySelectorAll<HTMLElement>(".cc-library, .cc-white-section")
          .forEach((section) => {
            const content = section.querySelector<HTMLElement>(
              ".cc-notebook-content, .cc-container",
            )
            if (!content) return
            const progress = disabled
              ? 1
              : clamp(
                  (window.innerHeight - section.getBoundingClientRect().top) /
                    (window.innerHeight * 0.4),
                )
            const eased = 1 - Math.pow(1 - progress, 3)
            content.style.setProperty(
              "--scroll-opacity",
              String(0.25 + eased * 0.75),
            )
            content.style.setProperty("--scroll-shift", `${(1 - eased) * 65}px`)
            content.style.setProperty(
              "--scroll-scale",
              String(0.98 + eased * 0.02),
            )
          })
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update)
      }
      const changes = new MutationObserver(schedule)
      changes.observe(page, { childList: true, subtree: true })
      const state = new MutationObserver(schedule)
      state.observe(page, { attributes: true, attributeFilter: ["class"] })
      const resize = new ResizeObserver(schedule)
      resize.observe(page)
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      preference.addEventListener("change", schedule)
      update()
      return () => {
        cancelAnimationFrame(frame)
        changes.disconnect()
        state.disconnect()
        resize.disconnect()
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
        preference.removeEventListener("change", schedule)
      }
    },
    () => [root],
  )
  useClientEffect(
    () => {
      const page = root.value
      if (!page) return
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
      const selector =
        ".cc-hero-grid > div:first-child > *, .cc-glass-panel, .cc-library-heading, .cc-filters, .cc-topics, .cc-card, .cc-contribute, .cc-article-layout article > h1, .cc-lead, .cc-body > *, .cc-sidebar-note, .cc-editor > h1, .cc-editor > form"
      let observer: IntersectionObserver | undefined
      let mutations: MutationObserver | undefined
      const animations = new Map<Element, Animation>()
      let seen = new WeakSet<Element>()
      const clear = () => {
        observer?.disconnect()
        mutations?.disconnect()
        animations.forEach((animation) => animation.cancel())
        animations.clear()
      }
      const setup = () => {
        clear()
        seen = new WeakSet()
        if (preference.matches || !("IntersectionObserver" in window)) return
        const play = (element: HTMLElement) => {
          const siblings = Array.from(element.parentElement?.children ?? [])
          const index = siblings.indexOf(element)
          const card = element.classList.contains("cc-card")
          const hero = !!element.closest(".cc-hero")
          const animation = element.animate(
            [
              {
                opacity: 0,
                translate: `0 ${card ? 32 : 22}px`,
                filter: hero ? "blur(5px)" : "blur(0px)",
              },
              { opacity: 1, translate: "0 0", filter: "blur(0px)" },
            ],
            {
              duration: hero ? 950 : 700,
              delay: (index % (card ? 3 : 4)) * 85,
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "both",
            },
          )
          animations.set(element, animation)
          animation.onfinish = () => {
            animation.cancel()
            animations.delete(element)
          }
        }
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              observer?.unobserve(entry.target)
              play(entry.target as HTMLElement)
            })
          },
          { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
        )
        const scan = () => {
          animations.forEach((animation, element) => {
            if (!page.contains(element)) {
              animation.cancel()
              animations.delete(element)
            }
          })
          page.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            if (seen.has(element)) return
            seen.add(element)
            observer?.observe(element)
          })
        }
        scan()
        mutations = new MutationObserver(scan)
        mutations.observe(page, { childList: true, subtree: true })
      }
      setup()
      preference.addEventListener("change", setup)
      return () => {
        clear()
        preference.removeEventListener("change", setup)
      }
    },
    () => [root],
  )
}
