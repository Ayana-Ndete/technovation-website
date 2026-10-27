import Navbar from "./Navbar"
import HistoryPage from "./HistoryPage"
import { defineComponent, shallowRef } from "vue"
import { useClientEffect } from "./useClientEffect"

export default defineComponent(
  () => {
    const scrolled = shallowRef(false)
    useClientEffect(() => {
      document.title = "About Us — Technovation Ventures"
      const update = () => { scrolled.value = window.scrollY > 32 }
      update()
      window.addEventListener("scroll", update, { passive: true })
      return () => window.removeEventListener("scroll", update)
    }, () => [])

    return () => (
      <div class="about-page">
        <Navbar tone="archive" scrolled={scrolled.value} />
        <main><HistoryPage /></main>
      </div>
    )
  },
  { name: "AboutPage" },
)
