import { useClientEffect } from "./useClientEffect"
import { defineComponent, shallowRef } from "vue"
import { animate, createScope, onScroll, stagger } from "animejs"
/** Vue owns the characters; screen readers receive the uninterrupted text. */
export const ScrollText = defineComponent(
  (props: { children: string; effect?: "highlight" | "entrance" }) => {
    const ref = shallowRef<HTMLSpanElement | null>(null)
    useClientEffect(
      () => {
        const element = ref.value
        if (!element) return
        const scope = createScope({
          root: element,
          mediaQueries: {
            mobile: "(max-width: 767px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
        }).add((self) => {
          if (!self || self.matches.reduce) return
          const chars = element.querySelectorAll(".motion-char")
          const observer = onScroll({
            target: element,
            enter: "85% top",
            leave:
              (props.effect ?? "highlight") === "entrance"
                ? "top bottom"
                : self.matches.mobile
                  ? "45% top"
                  : "30% top",
            sync:
              (props.effect ?? "highlight") === "highlight"
                ? true
                : "play none play reverse",
          })
          if ((props.effect ?? "highlight") === "highlight") {
            animate(chars, {
              color: [
                "#A1A6A9",
                getComputedStyle(element)
                  .getPropertyValue("--highlight-color")
                  .trim() || "#0B1F3A",
              ],
              duration: 450,
              delay: stagger(22),
              ease: "linear",
              autoplay: observer,
            })
          } else {
            animate(chars, {
              opacity: [0, 1],
              y: [24, 0],
              rotateX: [-80, 0],
              duration: 850,
              delay: stagger(self.matches.mobile ? 18 : 28, { from: "center" }),
              ease: "out(4)",
              autoplay: observer,
            })
          }
          let cancelled = false
          void document.fonts.ready.then(() => {
            if (!cancelled && observer.target && !observer.reverted)
              observer.refresh()
          })
          return () => {
            cancelled = true
          }
        })
        return () => scope.revert()
      },
      () => [props.children, props.effect ?? "highlight"],
    )
    return () => (
      <>
        <span class="sr-only">{props.children}</span>
        <span
          ref={ref}
          aria-hidden="true"
          class={
            (props.effect ?? "highlight") === "highlight"
              ? "scroll-highlight"
              : "text-entrance"
          }
        >
          {props.children.split(/(\s+)/).map((word, i) =>
            /^\s+$/.test(word) ? (
              word
            ) : (
              <span class="motion-word" key={i}>
                {Array.from(word).map((char, j) => (
                  <span class="motion-char" key={j}>
                    {char}
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      </>
    )
  },
  { name: "ScrollText", props: ["children", "effect"] },
)
