import { useClientEffect } from "./useClientEffect"
import { defineComponent, shallowRef } from "vue"
import { ServiceIcon } from "./ServiceIcon"
import developmentImage from "./assets/images/services/development-photo.jpg"
import consultingImage from "./assets/images/services/consulting-photo.jpg"
import transformationImage from "./assets/images/services/transformation-photo.jpg"
import integrationImage from "./assets/images/services/integration-photo.jpg"
import analyticsImage from "./assets/images/services/analytics-photo.jpg"
import securityImage from "./assets/images/services/security-photo.jpg"
type Service = {
  icon: "code" | "consult" | "transform" | "integration" | "data" | "security"
  title: string
  desc: string
  links: string[]
}
const serviceImages: Record<Service["icon"], {
  src: string
  alt: string
}> = {
  code: {
    src: developmentImage,
    alt: "Code editor open on a laptop in a working studio",
  },
  consult: {
    src: consultingImage,
    alt: "Colleagues collaborating around laptops at a shared table",
  },
  transform: {
    src: transformationImage,
    alt: "A contemporary connected workplace with shared meeting space",
  },
  integration: {
    src: integrationImage,
    alt: "Network cabinets with connected equipment and structured cabling",
  },
  data: {
    src: analyticsImage,
    alt: "Business analytics dashboard displayed on a laptop",
  },
  security: {
    src: securityImage,
    alt: "Close-up of electronic circuitry and computing hardware",
  },
}
const captions = [
  "Built around your ambition",
  "Clarity before complexity",
  "Move your organisation forward",
  "Connected by design",
  "Turn information into insight",
  "Confidence at every layer",
]
export const ServiceStack = defineComponent(
  (props: { services: Service[] }) => {
    const stack = shallowRef<HTMLDivElement | null>(null)
    useClientEffect(
      () => {
        const root = stack.value!
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>(".service-panel"),
        )
        const stage = root.querySelector<HTMLElement>(".service-stage")!
        const motion = matchMedia("(prefers-reduced-motion: reduce)")
        let frame = 0
        let current = 0
        let target = 0
        let lastTime = 0
        let start = 0
        let travel = 1
        let initialized = false
        const clamp = (value: number) => Math.max(0, Math.min(1, value))
        const smooth = (value: number) => value * value * (3 - 2 * value)
        const paint = () => {
          const active = Math.min(
            props.services.length - 1,
            Math.floor(current + 0.5),
          )
          cards.forEach((card, index) => {
            const entered = smooth(clamp(current - index + 1))
            const covered = smooth(clamp(current - index))
            card.style.setProperty(
              "--entry",
              String(index === 0 ? 0 : (1 - entered) * 108),
            )
            card.style.setProperty("--covered", String(covered))
            card.style.setProperty("--image-shift", `${(1 - entered) * 18}px`)
            card.style.visibility =
              motion.matches ||
              (current > index - 1.01 && current < index + 1.01)
                ? "visible"
                : "hidden"
            card.inert = !motion.matches && index !== active
          })
        }
        const tick = (time: number) => {
          const elapsed = Math.min(64, time - (lastTime || time - 16.67))
          lastTime = time
          // Time-based damping feels the same on 60 Hz and high-refresh screens.
          current += (target - current) * (1 - Math.exp(-elapsed / 85))
          if (Math.abs(target - current) < 0.0001) current = target
          paint()
          frame = current === target ? 0 : requestAnimationFrame(tick)
          if (!frame) lastTime = 0
        }
        const schedule = () => {
          target =
            clamp((window.scrollY - start) / travel) *
            (props.services.length - 1)
          // Catch up immediately outside the pinned scene, including anchor jumps.
          if (
            !initialized ||
            motion.matches ||
            window.scrollY < start ||
            window.scrollY > start + travel
          ) {
            current = target
            initialized = true
          }
          if (!frame) frame = requestAnimationFrame(tick)
        }
        const measure = () => {
          const top = parseFloat(getComputedStyle(stage).top) || 90
          start = window.scrollY + root.getBoundingClientRect().top - top
          travel = Math.max(1, root.offsetHeight - stage.offsetHeight)
          schedule()
        }
        const resize = new ResizeObserver(measure)
        resize.observe(stage)
        resize.observe(document.body)
        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", measure)
        motion.addEventListener("change", measure)
        measure()
        return () => {
          cancelAnimationFrame(frame)
          resize.disconnect()
          window.removeEventListener("scroll", schedule)
          window.removeEventListener("resize", measure)
          motion.removeEventListener("change", measure)
        }
      },
      () => [props.services.length],
    )
    return () => (
      <div
        class="service-stack"
        ref={stack}
        style={{ height: `calc(${props.services.length} * 85svh)` }}
      >
        <div class="service-stage">
          {props.services.map(({ icon, title, desc, links }, index) => (
            <div class="service-slot" key={title}>
              <article
                class={`service-panel service-panel-${index + 1}`}
                aria-labelledby={`service-title-${index}`}
              >
                <div class="service-copy">
                  <div class="service-eyebrow">
                    <span class="service-symbol">
                      <ServiceIcon kind={icon} />
                    </span>
                    <span class="service-number">
                      0{index + 1} / 0{props.services.length}
                    </span>
                  </div>
                  <h3 id={`service-title-${index}`} class="font-display">
                    {title}
                  </h3>
                  <p>{desc}</p>
                  <ul>
                    {links.map((link) => (
                      <li key={link}>
                        <span aria-hidden="true">✓</span>
                        <a href="#contact">{link}</a>
                      </li>
                    ))}
                  </ul>
                  <a class="service-cta" href="#contact">
                    Let’s build together <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div class="service-visual">
                  <img
                    src={serviceImages[icon].src}
                    alt={serviceImages[icon].alt}
                    width="1200"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="service-visual-caption">
                    <span>TECHNOVATION / 0{index + 1}</span>
                    <p class="font-display">{captions[index]}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    )
  },
  { name: "ServiceStack", props: ["services"] },
)
