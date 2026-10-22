import Navbar from "./Navbar"
import { useClientEffect } from "./useClientEffect"
import { defineComponent, shallowRef, computed } from "vue"
import { HeroArtwork } from "./HeroArtwork"
import { TypewriterHeading } from "./TypewriterHeading"
import { ServiceStack } from "./ServiceStack"
import { usePageMotion } from "./usePageMotion"
import { ScrollText } from "./ScrollText"
import { navigateTo } from "#imports"
import { NuxtLink } from "#components"
import logoImage from "./assets/images/brand/technovation-logo.png"
import eacPartnerImage from "./assets/images/partners/eac.jpg"
import gizPartnerImage from "./assets/images/partners/giz.svg"
import unidoPartnerImage from "./assets/images/partners/unido.svg"
import kncciPartnerImage from "./assets/images/partners/kncci.png"
import abremaPartnerImage from "./assets/images/partners/abrema.png"
import zfdaPartnerImage from "./assets/images/partners/zfda.jpg"
import eacProjectImage from "./assets/images/projects/eac.jpg"
import gizProjectImage from "./assets/images/projects/giz.jpg"
import unidoProjectImage from "./assets/images/projects/unido.jpg"
// ─── SVG primitives ───────────────────────────────────────────────────────────
const LogoMark = ({ size = 40 }: { size?: number }) => (
  <img
    src={logoImage}
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    class="shrink-0 object-contain bg-white rounded-sm"
  />
)
const ArrowRight = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <line
      x1="2"
      y1="8"
      x2="13"
      y2="8"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <polyline
      points="9 4 13 8 9 12"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
// ─── Data ─────────────────────────────────────────────────────────────────────
const partners = [
  { abbr: "EAC", name: "East African Community", image: eacPartnerImage },
  { abbr: "GIZ", name: "Deutsche Gesellschaft", image: gizPartnerImage },
  { abbr: "UNIDO", name: "UN Industrial Development", image: unidoPartnerImage },
  { abbr: "KNCCI", name: "Kenya National Chamber", image: kncciPartnerImage },
  { abbr: "ABREMA", name: "Autorité Burundaise", image: abremaPartnerImage },
  { abbr: "ZFDA", name: "Zanzibar Food & Drug Agency", image: zfdaPartnerImage },
]
const services = [
  {
    icon: "code" as const,
    title: "Software Development",
    desc: "Scalable web and mobile applications, built end-to-end.",
    links: ["Web Applications", "Mobile Solutions", "Maintenance & Support"],
  },
  {
    icon: "consult" as const,
    title: "ICT Consulting",
    desc: "Strategic advisory to modernise infrastructure and de-risk delivery.",
    links: ["Digital Strategy", "Project Management", "M&E Frameworks"],
  },
  {
    icon: "transform" as const,
    title: "Digital Transformation",
    desc: "Legacy-to-modern migration, backed by training and change management.",
    links: ["Process Re-engineering", "Change Management", "Capacity Building"],
  },
  {
    icon: "integration" as const,
    title: "Systems Integration",
    desc: "Secure APIs and pipelines connecting disparate platforms.",
    links: ["API Development", "Data Pipelines", "Legacy Modernisation"],
  },
  {
    icon: "data" as const,
    title: "Data & Analytics",
    desc: "Decision-grade dashboards and predictive insight from your data.",
    links: ["BI Dashboards", "Reporting Frameworks", "Predictive Analytics"],
  },
  {
    icon: "security" as const,
    title: "Cybersecurity & Compliance",
    desc: "Audits and ISO-aligned frameworks for sensitive data.",
    links: ["Security Audits", "Compliance Frameworks", "Incident Response"],
  },
]
const projects = [
  {
    image: eacProjectImage,
    photoAlt: "Participants at the EAC International Customs Day 2025 event",
    source: "https://www.eac.int",
    tag: "Digital Infrastructure",
    client: "EAC",
    title: "East Africa Single Customs Territory Portal",
    metric: "47% reduction in cross-border processing time",
  },
  {
    image: gizProjectImage,
    photoAlt:
      "Women examining crops in a field, from GIZ’s Kenya programme page",
    source: "https://www.giz.de/en/regions/africa/kenya",
    tag: "ICT Consulting",
    client: "GIZ Kenya",
    title: "County Digital Governance Programme",
    metric: "12 county governments connected to national systems",
  },
  {
    image: unidoProjectImage,
    photoAlt:
      "Participants at the UNIDO and Japan technology transfer programme launch",
    source: "https://www.unido.org",
    tag: "Software Development",
    client: "UNIDO",
    title: "SME Digital Trade Platform",
    metric: "3,200+ SMEs onboarded across 8 months",
  },
]
const stats = [
  { value: "13+", label: "Years in Operation" },
  { value: "60+", label: "Projects Delivered" },
  { value: "25+", label: "Enterprise Clients" },
  { value: "7", label: "Countries Served" },
]
// Each digit has its own vertical reel; the final number remains accessible.
function AnimatedStat({ value }: { value: string }) {
  return (
    <span class="stat-number" aria-label={value}>
      <span aria-hidden="true" class="stat-reels">
        {value.split("").map((digit, index) =>
          /[0-9]/.test(digit) ? (
            <span class="stat-digit" key={index}>
              <span
                class="stat-reel"
                data-digit={digit}
                style={{
                  transform: `translateY(-${(10 + Number(digit)) * 5}%)`,
                }}
              >
                {Array.from({ length: 20 }, (_, n) => (
                  <span key={n}>{n % 10}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={index}>{digit}</span>
          ),
        )}
      </span>
    </span>
  )
}

export default defineComponent(
  (props) => {
    const heroPaused = shallowRef(false)
    const rootRef = shallowRef<HTMLDivElement | null>(null)
    usePageMotion(rootRef)
    const scrolled = shallowRef(false)
    const activeSection = shallowRef("hero")
    const progressRef = shallowRef<HTMLDivElement | null>(null)
    const lightNavigation = computed(() => activeSection.value === "about")
    useClientEffect(
      () => {
        let frame = 0
        const update = () => {
          const top = window.scrollY
          scrolled.value = top > 32
          const total =
            document.documentElement.scrollHeight - window.innerHeight
          if (progressRef.value)
            progressRef.value.style.transform = `scaleX(${
              total > 0 ? top / total : 0
            })`
          const sections = [
            "hero",
            "about",
            "services",
            "recent-work",
            "contact",
          ]
          activeSection.value =
            sections
              .filter(
                (id) =>
                  (document.getElementById(id)?.getBoundingClientRect().top ??
                    Infinity) <= 150,
              )
              .pop() ?? "hero"
          frame = 0
        }
        const schedule = () => {
          if (!frame) frame = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", schedule)
        return () => {
          cancelAnimationFrame(frame)
          window.removeEventListener("scroll", schedule)
          window.removeEventListener("resize", schedule)
        }
      },
      () => [],
    )
    const scrollTo = (id: string) => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        })
    }
    return () => (
      <div
        ref={rootRef}
        class="bg-white text-[#0B1F3A] font-body overflow-x-clip"
      >
        <div ref={progressRef} class="scroll-progress" aria-hidden="true" />
        {/* ── Sticky Nav ───────────────────────────────────────────────────────── */}
        <Navbar
          tone={lightNavigation.value ? "light" : "dark"}
          scrolled={scrolled.value}
          activeSection={activeSection.value}
          homeIcons
        />

        {/* ── Hero ─────────────────────────────────────────────────────────────── */}
        <section id="hero" class="hero-scene">
          <div class="hero-wash" aria-hidden="true" />
          <HeroArtwork paused={heroPaused.value} />
          <div class="hero-centre">
            <TypewriterHeading paused={heroPaused.value} />
            <p class="hero-intro hero-description">
              From Nairobi to the region, delivering enterprise software,
              digital infrastructure, and strategic ICT advisory.
            </p>
            <div class="hero-intro hero-actions">
              <NuxtLink to="/products" class="hero-button hero-primary">
                View Our Work <ArrowRight />
              </NuxtLink>
              <button
                onClick={() => scrollTo("services")}
                class="hero-button hero-secondary"
              >
                Our Services <ArrowRight />
              </button>
            </div>
          </div>
          <button
            class="hero-scroll-cue"
            onClick={() => scrollTo("about")}
            aria-label="Scroll to trusted organisations"
          >
            <span />
            Explore
          </button>
          <button
            class="hero-motion-toggle"
            onClick={() => (heroPaused.value = !heroPaused.value)}
            aria-pressed={heroPaused.value}
          >
            {heroPaused.value ? "Resume animation" : "Pause animation"}
          </button>
        </section>

        {/* ── Trusted Partners ─────────────────────────────────────────────────── */}
        <section id="about" class="bg-white border-b border-[#EDF0F5]">
          <div class="max-w-[1240px] mx-auto px-6 py-12">
            <p class="text-[11px] font-semibold text-[#9AAFC4] tracking-[0.1em] mb-8 uppercase">
              Trusted by leading institutions across East Africa and beyond
            </p>
            <div class="partner-window">
              <div class="partner-track">
                {[0, 3].map((copy) => (
                  <div
                    class="partner-group"
                    aria-hidden={copy === 1 ? true : undefined}
                    key={copy}
                  >
                    {partners.map(({ abbr, name, image }) => (
                      <div key={abbr} class="partner-card">
                        <img
                          class="partner-logo"
                          src={image}
                          alt={`${abbr} logo`}
                          width="150"
                          height="76"
                          loading="lazy"
                        />
                        <span class="partner-abbr font-display">{abbr}</span>
                        <span class="partner-name">{name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Services ─────────────────────────────────────────────────────── */}
        <section id="services" class="services-glass-section">
          <div class="max-w-[1240px] mx-auto px-6">
            {/* Header row */}
            <div class="services-heading">
              <div>
                <div class="flex items-center gap-2.5 mb-4">
                  <span class="w-7 h-px bg-[#1B63E8]" />
                  <span class="services-kicker">Capabilities</span>
                </div>
                <h2 class="font-display services-title">
                  Key <span>Services</span>
                </h2>
              </div>
              <p class="services-intro">
                Built for the complexity of enterprise, government, and
                multilateral mandates.
              </p>
            </div>

            <ServiceStack services={services} />
          </div>
        </section>

        {/* ── Recent Work ──────────────────────────────────────────────────────── */}
        {/*
          <section id="recent-work" class="portfolio-section py-24 md:py-32">
          <div class="portfolio-atmosphere" aria-hidden="true">
            <div class="portfolio-glow" />
            <div class="portfolio-lines" />
          </div>
          <div class="relative max-w-[1240px] mx-auto px-6">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <div class="flex items-center gap-2.5 mb-4">
                  <span class="w-7 h-px bg-[#1B63E8]" />
                  <span class="text-[#1B63E8] text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Portfolio
                  </span>
                </div>
                <h2 class="font-display text-[38px] font-bold tracking-[-0.03em] text-white leading-tight">
                  <ScrollText effect="entrance" children={"Recent Work"} />
                </h2>
              </div>
              <button
                onClick={() => navigateTo("/projects")}
                class="cta-button hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-[#5B7A96] hover:text-white transition-colors duration-150"
              >
                Explore all projects <ArrowRight />
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
              {projects.map(
                ({ image, tag, client, title, metric, photoAlt, source }) => (
                  <article
                    key={title}
                    data-reveal="true"
                    class="project-card group"
                  >
                    <div
                      class="project-photo relative overflow-hidden bg-[#16304F] mb-3"
                      style={{ aspectRatio: "3/2" }}
                    >
                      <img
                        src={image}
                        loading="lazy"
                        alt={photoAlt}
                        class="project-image"
                      />
                      <div class="absolute top-3.5 left-3.5">
                        <span class="inline-block px-2.5 py-1 bg-[#1B63E8] text-white text-[10px] font-semibold tracking-[0.06em]">
                          {tag}
                        </span>
                      </div>
                      <div class="absolute bottom-3.5 right-3.5">
                        <span class="inline-block px-2.5 py-1 bg-[#0B1F3A]/75 text-[#8AAAC4] text-[10px] font-semibold tracking-[0.06em]">
                          {client}
                        </span>
                      </div>
                    </div>
                    <a
                      href={source}
                      target="_blank"
                      rel="noreferrer"
                      class="photo-credit"
                    >
                      Photo: {client} · Organisation imagery ↗
                    </a>
                    <h3 class="font-display font-semibold text-[16px] text-white mb-2 leading-snug tracking-[-0.015em] group-hover:text-[#5B9BFF] transition-colors duration-200">
                      {title}
                    </h3>
                    <p class="text-[12px] text-[#1B63E8] font-semibold">
                      {metric}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
        */}

        {/* ── Stat bar ─────────────────────────────────────────────────────────── */}
        <section class="stats-glass" aria-label="Technovation in numbers">
          <div class="max-w-[1240px] mx-auto px-6">
            <div class="stats-glass-grid">
              {stats.map(({ value, label }) => (
                <div key={label} class="stat-card stats-glass-card">
                  <div class="font-display text-[52px] font-bold text-white tracking-[-0.04em] leading-none mb-1.5">
                    <AnimatedStat value={value} />
                  </div>
                  <div class="stats-glass-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {props.showCodeCentreOnHome && <section
          class="engineering-preview"
          aria-labelledby="code-centre-title"
        >
          <div class="engineering-preview-inner">
            <div class="engineering-copy">
              <p class="engineering-eyebrow">
                <span /> From our engineering team
              </p>
              <h2 id="code-centre-title" class="font-display">
                Built here.
                <br />
                <span>Shared here.</span>
              </h2>
              <p class="engineering-description">
                Explore our Code Centre for Java code, DevOps field notes, and
                practical solutions to the errors we encounter along the way.
              </p>
              <NuxtLink to="/code-centre" class="engineering-link">
                Explore the Code Centre{" "}
                <span>
                  <ArrowRight />
                </span>
              </NuxtLink>
            </div>
            <div class="engineering-notebook">
              <div class="engineering-notebook-heading">
                <span class="engineering-notebook-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>THE ENGINEERING NOTEBOOK</span>
                <span aria-hidden="true">↗</span>
              </div>
              <NuxtLink to="/code-centre#java-queue-empty" class="engineering-entry">
                <span class="engineering-entry-icon" aria-hidden="true">
                  {"{ }"}
                </span>
                <span class="engineering-entry-copy">
                  <span class="engineering-entry-topic">
                    Java · Error &amp; solution
                  </span>
                  <h3>Handling an empty queue</h3>
                  <span class="engineering-entry-summary">
                    A small edge case. A useful lesson.
                  </span>
                </span>
                <span class="engineering-entry-arrow">
                  <ArrowRight />
                </span>
              </NuxtLink>
              <NuxtLink
                to="/code-centre#devops-container-logs"
                class="engineering-entry engineering-entry-teal"
              >
                <span class="engineering-entry-icon" aria-hidden="true">
                  {" >_"}
                </span>
                <span class="engineering-entry-copy">
                  <span class="engineering-entry-topic">
                    DevOps · Error &amp; solution
                  </span>
                  <h3>Diagnosing a stopped container</h3>
                  <span class="engineering-entry-summary">
                    Follow the logs. Find the cause.
                  </span>
                </span>
                <span class="engineering-entry-arrow">
                  <ArrowRight />
                </span>
              </NuxtLink>
              <div class="engineering-notebook-footer">
                <span aria-hidden="true">&lt;/&gt;</span> Practical notes from
                everyday engineering.
              </div>
            </div>
          </div>
        </section>}

        {/* ── CTA + Footer — unified dark canvas ───────────────────────────────── */}
        <div
          style={{
            background:
              "linear-gradient(170deg, #0D2647 0%, #0B1F3A 35%, #081730 100%)",
          }}
        >
          {/* CTA band */}
          <div class="max-w-[1240px] mx-auto px-6 py-20 md:py-24 border-b border-white/[0.08]">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <div data-reveal="true" class="md:max-w-[540px]">
                <h2 class="font-display text-[34px] md:text-[42px] font-bold text-white tracking-[-0.03em] leading-tight mb-4">
                  <ScrollText
                    effect="entrance"
                    children={"Ready to start a project?"}
                  />
                </h2>
                <p class="text-[#c4d8ee] text-[15px] leading-[1.75]">
                  <ScrollText
                    children={
                      "Whether you are scoping a new system, auditing existing infrastructure, or need a strategic ICT partner \u2014 we are ready to discuss what is possible for your organisation."
                    }
                  />
                </p>
              </div>
              <NuxtLink
                data-reveal="true"
                to="/#contact"
                class="cta-button flex-shrink-0 self-start md:self-auto inline-flex items-center gap-3 px-10 py-4 bg-[#1B63E8] hover:bg-[#3E7DFB] text-white font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_#1b63e84d]"
              >
                Get in Touch <ArrowRight size={16} />
              </NuxtLink>
            </div>
          </div>

          {/* Footer */}
          <div id="contact" class="max-w-[1240px] mx-auto px-6 pt-14 pb-12">
            <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
              {/* Brand */}
              <div data-reveal="true">
                <div class="flex items-center gap-3 mb-5">
                  <LogoMark />
                  <span class="font-display font-semibold text-[16px] text-white tracking-[-0.025em]">
                    Technovation Ventures
                  </span>
                </div>
                <p class="text-[#4D6B85] text-[13.5px] leading-[1.8] mb-6 max-w-[310px]">
                  Software engineering and ICT consulting for enterprise,
                  government, and NGO organisations across East Africa and
                  beyond.
                </p>
                <span class="text-[#3A5570] text-[12px]">
                  Registered in Kenya · Est. 2013
                </span>
              </div>

              {/* Company links */}
              <div data-reveal="true">
                <h4 class="font-display font-semibold text-[13px] text-white mb-5 tracking-[-0.01em]">
                  Company
                </h4>
                <ul class="space-y-3.5">
                  {[
                    "About Us",
                    "Services",
                    "Recent Work",
                    "Code Centre",
                    "Careers",
                    "Contact",
                  ].map((item) => (
                    <li key={item}>
                      {item === "Careers" ? (
                        <span class="footer-link inline-block text-[#4D6B85] text-[13px] hover:text-white transition-all duration-200 hover:translate-x-1">
                          {item}
                        </span>
                      ) : (
                      <NuxtLink
                        external={item !== "Code Centre" && item !== "About Us"}
                        to={
                          item === "Code Centre"
                            ? "/code-centre"
                            : item === "About Us"
                              ? "/about"
                              : `#${({ "About Us": "about", Services: "services", "Recent Work": "recent-work", Contact: "contact" } as Record<string, string>)[item]}`
                        }
                        class="footer-link inline-block text-[#4D6B85] text-[13px] hover:text-white transition-all duration-200 hover:translate-x-1"
                      >
                        {item}
                      </NuxtLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact details */}
              <div data-reveal="true">
                <h4 class="font-display font-semibold text-[13px] text-white mb-5 tracking-[-0.01em]">
                  Contact
                </h4>
                <ul class="space-y-3.5">
                  <li>
                    <a
                      class="footer-link inline-block text-[#4D6B85] text-[13px] hover:text-white transition-all duration-200 hover:translate-x-1 break-all"
                    >
                      info@technovation.co.ke
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+254202392555"
                      class="footer-link inline-block text-[#4D6B85] text-[13px] hover:text-white transition-all duration-200 hover:translate-x-1"
                    >
                      +254 20 239 2555
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+254780000189"
                      class="footer-link inline-block text-[#4D6B85] text-[13px] hover:text-white transition-all duration-200 hover:translate-x-1"
                    >
                      +254 780 000 189
                    </a>
                  </li>
                  <li class="pt-1">
                    <address class="not-italic text-[#4D6B85] text-[13px] leading-[1.7]">
                      Allamano Centre
                      <br />
                      Nairobi, Kenya
                    </address>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div class="pt-6 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <span class="text-[#2D4A63] text-[12px]">
                © 2026 Technovation Ventures Ltd. All rights reserved.
              </span>
              <span class="text-[#2D4A63] text-[12px]">technovation.co.ke</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    name: "App",
    props: { showCodeCentreOnHome: { type: Boolean, default: true } },
  },
)
