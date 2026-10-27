import { defineComponent, shallowRef } from "vue"
import { useRouter } from "#imports"
import { useApi } from "../app/composables/useApi"
import Navbar from "./Navbar"
import { useClientEffect } from "./useClientEffect"

const services = [
  "Website Development",
  "Mobile App Development",
  "Custom Software",
  "UI/UX Design",
  "Other",
]

export default defineComponent({
  name: "ContactPage",
  setup() {
    const scrolled = shallowRef(false)
    const router = useRouter()
    const api = useApi()
    const submitting = shallowRef(false)
    const submitError = shallowRef("")

    useClientEffect(() => {
      document.title = "Contact Us — Technovation Ventures"
      const update = () => { scrolled.value = window.scrollY > 32 }
      update()
      window.addEventListener("scroll", update, { passive: true })
      return () => window.removeEventListener("scroll", update)
    }, () => [])

    const submit = async (form: HTMLFormElement) => {
      submitting.value = true
      submitError.value = ""
      const data = new FormData(form)
      try {
        await api("api/contact", {
          method: "POST",
          body: {
            name: data.get("name"),
            email: data.get("email"),
            service: data.get("service"),
            project: data.get("project"),
          },
        })
        await router.push("/thank-you")
      } catch (error: any) {
        submitError.value = error?.data?.statusMessage || "We couldn't send your enquiry. Please try again."
      } finally {
        submitting.value = false
      }
    }

    return () => (
      <div class="contact-page">
        <Navbar scrolled={scrolled.value} />
        <main class="contact-main">
          <section class="contact-shell" aria-labelledby="contact-title">
            <div class="contact-intro">
              <p class="contact-eyebrow"><span /> Start a conversation</p>
              <h1 id="contact-title">Have a project<br />in mind?</h1>
              <p>
                Tell us a little about your idea, and we'll get back to you to
                discuss how we can bring it to life.
              </p>
              <div class="contact-aside" aria-label="Contact details">
                <a href="mailto:info@technovation.co.ke">info@technovation.co.ke</a>
                <a href="tel:+254202392555">+254 20 239 2555</a>
                <span>Allamano Centre · Nairobi, Kenya</span>
              </div>
            </div>

            <form class="contact-form" onSubmit={(event: SubmitEvent) => { event.preventDefault(); submit(event.currentTarget as HTMLFormElement) }}>
              <div class="contact-field">
                <label for="full-name">Full name</label>
                <input id="full-name" name="name" autocomplete="name" placeholder="John Doe" required />
              </div>
              <div class="contact-field">
                <label for="email">Email address</label>
                <input id="email" name="email" type="email" autocomplete="email" placeholder="john@company.com" required />
              </div>
              <div class="contact-field">
                <label for="service">What do you need help with?</label>
                <select id="service" name="service" required>
                  <option value="" disabled selected>Select a service</option>
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </div>
              <div class="contact-field">
                <label for="project">Tell us about your project</label>
                <textarea id="project" name="project" placeholder="Briefly describe what you want to build..." required />
              </div>
              <div class="contact-submit-row">
                {submitError.value && <p class="contact-status is-visible" role="alert">{submitError.value}</p>}
                <button class="contact-submit" type="submit" disabled={submitting.value}>
                  {submitting.value ? "Sending…" : "Send enquiry"} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </section>
        </main>
        <footer class="contact-footer">© 2026 Technovation Ventures Ltd. All rights reserved.</footer>
      </div>
    )
  },
})
