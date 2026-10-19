import logoImage from "./assets/images/brand/technovation-logo.png"
import { useClientEffect } from "./useClientEffect"
import { defineComponent, shallowRef } from "vue"
const chapters = [
  [
    "2016",
    "Managing tomorrow’s retirement funds.",
    "Enterprise solutions",
    "Fund Master",
    "Fund Master is a pension administration and investment management system designed to support the core functions of retirement benefits and pension scheme administration for private and public employee retirement organisations. Its modules include benefits administration, financial accounting, investments and assets management, member self-service, reporting and business intelligence. The system can integrate with applications such as SMS gateways, ERPs, document management systems and LDAP.",
    "Bringing pension administration, investment management and reporting together in one integrated system.",
  ],
  [
    "2017",
    "Making regional market information more accessible.",
    "Regional pharmaceutical markets",
    "EAC Integrated Pharmaceutical Market Information System (IPMIS)",
    "The EAC Integrated Pharmaceutical Market Information System (IPMIS) supports regional pharmaceutical market analytics, helping make market information more accessible to inform analysis and decision-making.",
    "Using digital information to support a more connected view of the regional pharmaceutical market.",
  ],
  [
    "2019",
    "Supporting harmonised medicines registration.",
    "A regional milestone",
    "East African Community Medicines Registration Harmonisation Information Management System",
    "This initiative focused on information management to support medicines registration harmonisation across the East African Community, contributing to digital processes for regional regulatory coordination.",
    "Building digital foundations for collaboration in regional medicines regulation.",
  ],
  [
    "2020",
    "Strengthening medicines regulatory information management.",
    "Digital regulation",
    "National Drug Authority Management Information System (NDAMIS), Uganda",
    "NDAMIS represents Technovation’s work in digital information systems for medicines regulation in Uganda, supporting the National Drug Authority’s regulatory information management processes.",
    "Applying technology to support regulatory information management.",
  ],
  [
    "2021",
    "Connecting business services with digital processes.",
    "Business and trade services",
    "KNCCI digital systems and Pharmacy and Poisons Board initiatives",
    "Our 2021 portfolio included digital systems for the Kenya National Chamber of Commerce and Industry, alongside Pharmacy and Poisons Board Trade Affairs and electronic single-window initiatives. Together, these engagements reflect work across business services and trade-related regulatory processes.",
    "Bringing digital systems to business services and trade facilitation.",
  ],
  [
    "2022",
    "Messages that move information.",
    "Digital communication",
    "Ujumbe Message Delivery Platform",
    "The Ujumbe Message Delivery Platform expanded Technovation’s portfolio into digital communications, supporting message delivery through technology-enabled services.",
    "Adding digital messaging to our growing technology portfolio.",
  ],
  [
    "2023",
    "Extending our digital footprint.",
    "Regulatory systems",
    "Zanzibar Food and Drugs Agency (ZFDA) regulatory systems",
    "Work on ZFDA regulatory systems added to Technovation’s experience delivering digital solutions for regulatory information and institutional processes in the region.",
    "Applying systems expertise to regulatory needs in another market.",
  ],
  [
    "2024",
    "Supporting safer, smoother agricultural trade.",
    "Cross-border trade",
    "EAC Sanitary & Phytosanitary (SPS) Platform",
    "The EAC Sanitary and Phytosanitary Platform supports cross-border agricultural compliance and trade facilitation, helping address information and process needs associated with sanitary and phytosanitary requirements across the region.",
    "Using digital platforms to support agricultural compliance and regional trade.",
  ],
  [
    "2025",
    "Turning enquiries into opportunities.",
    "Business matchmaking",
    "BiasharaLink Digital Inquiry and Matchmaking Platform",
    "BiasharaLink expanded Technovation’s work into digital business inquiry and matchmaking. The platform is designed to help connect businesses with enquiries and commercial opportunities, bringing greater structure to business discovery and engagement.",
    "Bringing businesses and commercial opportunities closer through technology.",
  ],
  [
    "2026",
    "Addressing barriers and connecting digital services.",
    "Trade and connected business platforms",
    "South Africa DTIC Export Barrier Reporting and Resolution Platform; Sarit Belong; TradeConnect; DealHouse",
    "Technovation’s 2026 portfolio includes work on South Africa’s Department of Trade, Industry and Competition (DTIC) Export Barrier Reporting and Resolution Platform, alongside initiatives such as Sarit Belong, TradeConnect and DealHouse. These projects span digital trade facilitation, customer engagement, trade connections and business processes.",
    "Applying digital solutions across trade, business and customer-facing services.",
  ],
]
export default defineComponent(
  () => {
    const root = shallowRef<HTMLElement | null>(null)
    const active = shallowRef("2016")
    useClientEffect(
      () => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        const cards =
          root.value?.querySelectorAll<HTMLElement>(".history-chapter") ?? []
        const animations: Animation[] = []
        const observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                active.value = entry.target.id.replace("year-", "")
                if (
                  !reduced.matches &&
                  !(entry.target as HTMLElement).dataset.played
                ) {
                  ;(entry.target as HTMLElement).dataset.played = "true"
                  entry.target
                    .querySelectorAll<HTMLElement>("[data-archive-reveal]")
                    .forEach((element, index) => {
                      animations.push(
                        element.animate(
                          [
                            {
                              opacity: 0,
                              transform: `translateY(${
                                index ? 45 : 24
                              }px) rotate(${index ? "-2deg" : "0deg"})`,
                            },
                            {
                              opacity: 1,
                              transform: "translateY(0) rotate(0)",
                            },
                          ],
                          {
                            duration: 1000,
                            delay: index * 130,
                            easing: "cubic-bezier(.16,1,.3,1)",
                            fill: "backwards",
                          },
                        ),
                      )
                    })
                }
              }
            }),
          { rootMargin: "-15% 0px -35% 0px", threshold: 0 },
        )
        cards.forEach((card) => observer.observe(card))
        const stop = () => {
          if (reduced.matches)
            animations.forEach((animation) => animation.finish())
        }
        reduced.addEventListener("change", stop)
        return () => {
          observer.disconnect()
          animations.forEach((animation) => animation.cancel())
          reduced.removeEventListener("change", stop)
          cards.forEach((card) => delete card.dataset.played)
        }
      },
      () => [],
    )
    return () => (
      <section
        class="history-page history-embedded"
        id="history"
        ref={root}
        aria-label="Our history"
      >
        <section class="history-hero history-wrap">
          <div class="history-kicker">
            <span>Our journey</span>
            <span>Memory Lane / 2016—2026</span>
          </div>
          <div class="history-hero-grid">
            <div class="history-hero-copy">
              <p class="history-eyebrow">Website copy · Project-led timeline</p>
              <h2 class="history-title">
                Our journey.
                <br />
                <span>Memory Lane.</span>
              </h2>
              <p>
                A journey of building digital solutions for business, public
                institutions and regional collaboration. Explore the projects
                and milestones that have shaped Technovation Ventures’ work
                over the years.
              </p>
              <a class="history-start" href="#year-2016">
                Take a walk down memory lane <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div class="archive-cover">
              <div class="archive-stamp">
                TECHNOVATION
                <br />
                THE MEMORY COLLECTION
              </div>
              <span class="archive-cover-label">
                Past / Present / Possibility
              </span>
              <div class="archive-cover-years">
                2016<span>↓</span>2026
              </div>
              <div class="archive-cover-bottom">
                <span>
                  Ten chapters.
                  <br />
                  One continuing story.
                </span>
                <img
                  src={logoImage}
                  alt=""
                  width="44"
                  height="44"
                />
              </div>
            </div>
          </div>
          <div class="history-hero-bottom">
            <span>A journey through the years</span>
            <span>Scroll to turn the page ↓</span>
          </div>
        </section>
        <div class="history-year-bar">
          <nav aria-label="Jump to a year">
            {chapters.map(([year]) => (
              <a
                key={year}
                href={`#year-${year}`}
                aria-current={active.value === year ? "location" : undefined}
              >
                {year}
              </a>
            ))}
          </nav>
        </div>
        <div class="history-wrap history-archive" id="archive">
          {chapters.map(([year, title, label, project, prompt, memory], index) => (
            <section
              id={`year-${year}`}
              class={`history-chapter ${index % 2 ? "archive-reverse" : ""}`}
              key={year}
              aria-labelledby={`chapter-${year}`}
            >
              <div class="history-year" data-archive-reveal="true">
                <span>CHAPTER {String(index + 1).padStart(2, "0")}</span>
                <div>{year}</div>
                <span class="history-year-caption">
                  {index === chapters.length - 1
                    ? "The story continues"
                    : "From the archive"}
                </span>
              </div>
              <article class="history-memory" data-archive-reveal="true">
                <div class="memory-meta">
                  <span>{label}</span>
                  <span>TV / {year!.slice(2)}</span>
                </div>
                <h2 id={`chapter-${year}`}>{title}</h2>
                <p class="memory-project">{project}</p>
                <p>{prompt}</p>
                <div class="memory-note">
                  <span class="memory-note-label">A moment to remember</span>
                  <p>{memory}</p>
                </div>
                <div class="memory-bottom">
                  <span>Technovation Ventures</span>
                  <span>
                    {year} / {index === chapters.length - 1
                      ? "Today"
                      : "A page from our past"}
                  </span>
                </div>
              </article>
            </section>
          ))}
        </div>
        <section class="history-ending history-wrap">
          <p class="history-eyebrow">The next chapter</p>
          <h2>
            The journey continues.
            <br />
            <span>More to come.</span>
          </h2>
          <a class="history-start" href="#year-2016">
            Return to the beginning ↑
          </a>
          <a class="history-back" href="#year-2016">
            Back to 2016 ↑
          </a>
        </section>
      </section>
    )
  },
  { name: "HistoryPage", props: [] },
)
