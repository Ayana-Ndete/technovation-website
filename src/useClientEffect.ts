import { onBeforeUnmount, onMounted, watch, type WatchStopHandle } from "vue"

/** Run DOM effects after mounting/updates, disposing listeners before each rerun. */
export function useClientEffect(
  effect: () => void | (() => void),
  dependencies: () => unknown[],
) {
  let cleanup: void | (() => void)
  let stop: WatchStopHandle | undefined
  const run = () => {
    cleanup?.()
    cleanup = effect()
  }
  onMounted(() => {
    run()
    stop = watch(dependencies, run, { flush: "post" })
  })
  onBeforeUnmount(() => {
    stop?.()
    cleanup?.()
  })
}
