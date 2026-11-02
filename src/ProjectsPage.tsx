import Navbar from "./Navbar"
import { useClientEffect } from "./useClientEffect"
import { defineComponent, shallowRef, computed, type CSSProperties } from "vue"
import countries from "./africaMap.json"
import { useRoute } from "#imports"
import { NuxtLink } from "#components"
import kncciImage from "./assets/images/projects/kncci-logo.png"
import ndamisImage from "./assets/images/projects/ndamis-logo.jpeg"
import zfdaImage from "./assets/images/projects/ZFDA-SP-1.png"
import eacImage from "./assets/images/projects/EAC-SP-1.png"
import amimsImage from "./assets/images/projects/AMIMS-SP-1.png"
import cmisImage from "./assets/images/projects/CMIS-SP-1.png"
import ticketImage from "./assets/images/projects/website_background_2.png"
import biasharaLinkImage from "./assets/images/projects/biasharalink-logo.png"
import saritImage from "./assets/images/projects/sarit.png"
import dealHouseImage from "./assets/images/projects/dealhouse-logo.png"
import smsTeleImage from "./assets/images/projects/smstele-logo.svg"
import saritLogo from "./assets/images/projects/sarit-logo.png"
import saritLoyaltyApp from "./assets/images/projects/sarit-loyalty-app.png"
import fundMasterSite from "./assets/images/projects/fundmaster-site.png"
import fundMasterLogo from "./assets/images/projects/fundmaster-logo.png"
import kncciWebsite from "./assets/images/projects/kncci-website.png"
import smsTeleSendSms from "./assets/images/projects/smstele-send-sms.png"
import realSourcesEcosystem from "./assets/images/projects/realsources-ecosystem.png"
import realSourcesHome from "./assets/images/projects/realsources-home.png"
import zfdaClientPortal from "./assets/images/projects/zfda-client-portal.png"
import zfdaRegulatoryDashboard from "./assets/images/projects/zfda-regulatory-dashboard.png"
type Project = {
  id: string
  name: string
  place: string
  year: string
  category: string
  image: string
  visual?: string
  visualKind?: "logo"
  description: string
  overview: string
  features: string[]
  value: string
  screenshots?: { src: string; alt: string; label: string }[]
}

const work: Project[] = [
  {
    id: "kncci",
    name: "KNCCI Marketplace",
    place: "Kenya",
    year: "2021",
    category: "Digital commerce | Business platforms",
    image: kncciImage,
    description: "A digital marketplace designed to help businesses discover products, present their offerings and connect with wider commercial opportunities.",
    overview: "The KNCCI Marketplace supports business visibility and online product discovery within a chamber-led business ecosystem. It provides a digital space where participating businesses can showcase offerings and make it easier for potential customers and partners to find them.",
    features: ["Business and product discovery", "Digital business visibility", "Online storefront opportunities", "Connections between businesses and potential customers"],
    value: "By making business offerings easier to discover online, the marketplace can help participating enterprises extend their reach beyond traditional networks.",
    screenshots: [
      { src: kncciWebsite, alt: "KNCCI website homepage", label: "KNCCI website" },
    ],
  },
  {
    id: "nda",
    name: "National Drug Authority Management Information System (NDAMIS), Uganda",
    place: "Uganda",
    year: "2020",
    category: "Regulatory technology | Public-sector systems",
    image: ndamisImage,
    description: "A digital information management system supporting the National Drug Authority’s regulatory and service workflows in Uganda.",
    overview: "NDAMIS supports the digitisation of regulatory processes and information handled by Uganda’s National Drug Authority. The platform is intended to make relevant services and application processes more accessible and support the management of regulatory information.",
    features: ["Digital support for regulatory workflows", "Management of regulatory information", "Online service access where enabled", "Support for more structured processing of applications and records"],
    value: "Digitised workflows can improve access to services, support consistency in handling information and reduce dependence on fragmented manual processes.",
  },
  {
    id: "zfda",
    name: "Zanzibar Food and Drugs Agency (ZFDA) Regulatory Systems",
    place: "Tanzania",
    year: "2023",
    category: "Regulatory technology | Public-sector systems",
    image: zfdaImage,
    description: "Digital systems supporting regulatory information management and operational workflows for Zanzibar’s food and drugs regulator.",
    overview: "The ZFDA regulatory systems support the agency’s work through digital tools for managing information and regulatory activities. The public description focuses on confirmed workflows delivered.",
    features: ["Regulatory information management", "Digital workflow support", "Structured handling of records and processes", "Support for agency operations"],
    value: "Purpose-built regulatory systems can help agencies organise information, strengthen process visibility and support more consistent service delivery.",
    screenshots: [
      { src: zfdaClientPortal, alt: "ZFDA public client portal", label: "Public client portal" },
      { src: zfdaRegulatoryDashboard, alt: "ZFDA regulatory dashboard", label: "Regulatory workspace" },
    ],
  },
  {
    id: "ipmis",
    name: "EAC Integrated Pharmaceutical Market Information System (IPMIS)",
    place: "Regional",
    year: "2017",
    category: "Regional information systems | Health technology",
    image: eacImage,
    description: "A regional pharmaceutical market information system designed to improve access to information and market analytics across the East African Community.",
    overview: "IPMIS was developed to support a more informed view of the pharmaceutical market across the EAC region. By bringing relevant market information together, the system can support analysis and help stakeholders better understand pharmaceutical market dynamics.",
    features: ["Pharmaceutical market information", "Regional market visibility", "Information access for stakeholders", "Market analysis support"],
    value: "Better-organised market information can help stakeholders make decisions based on a clearer understanding of regional pharmaceutical markets.",
  },
  {
    id: "eac-harmonisation",
    name: "EAC Medicines Registration Harmonisation Information Management System",
    place: "Regional",
    year: "2019",
    category: "Regional information systems | Regulatory technology",
    image: amimsImage,
    description: "A regional information management system supporting medicines-registration harmonisation across the East African Community.",
    overview: "The system supports information management associated with regional efforts to harmonise medicines registration. It provides a digital foundation for organising relevant registration information and supporting coordination among participating regulatory stakeholders.",
    features: ["Medicines-registration information management", "Regional regulatory coordination", "Structured access to registration information", "Support for harmonisation workflows"],
    value: "Digital information management can help regional stakeholders work from more organised information and support coordinated regulatory processes.",
  },
  {
    id: "sps",
    name: "EAC Sanitary and Phytosanitary (SPS) Platform",
    place: "Regional",
    year: "2024",
    category: "Trade facilitation | Regional information systems",
    image: cmisImage,
    description: "A digital platform supporting access to sanitary and phytosanitary information and cross-border agricultural trade compliance.",
    overview: "The EAC SPS Platform focuses on the information and processes that help businesses and relevant authorities navigate sanitary and phytosanitary requirements connected with agricultural trade.",
    features: ["Access to SPS-related information", "Support for agricultural trade compliance", "Cross-border trade facilitation", "Digital access to relevant requirements and processes"],
    value: "Clearer access to SPS information can help traders and stakeholders better understand compliance requirements and navigate regional trade processes.",
  },
  {
    id: "fund-master",
    name: "Fund Master",
    place: "Kenya",
    year: "2016",
    category: "Enterprise systems | Financial technology",
    image: ticketImage, visual: fundMasterLogo, visualKind: "logo",
    description: "An integrated pension administration and investment management system for private- and public-sector retirement organisations.",
    overview: "Fund Master supports core retirement-benefit scheme administration and investment management, including benefits administration, financial accounting, investments and asset management, member self-service, reporting and business intelligence.",
    features: ["Benefits administration", "Financial accounting", "Investments and asset management", "Member self-service", "Reporting and business intelligence", "Integration with SMS, ERP, document management and LDAP"],
    value: "By bringing key scheme-administration functions into an integrated system, Fund Master helps retirement organisations manage operational, financial and member-related information in one digital environment.",
    screenshots: [
      { src: fundMasterSite, alt: "FundMaster practitioner guide website", label: "FundMaster website" },
    ],
  },
  {
    id: "smstele", name: "SMS Tele", place: "Kenya", year: "2022", category: "Digital communications", image: smsTeleImage,
    description: "A messaging platform designed to support digital message delivery through technology-enabled communication workflows.",
    overview: "SMS Tele provides a digital foundation for sending and managing messages. Its public description reflects confirmed communication channels, delivery controls, reporting and integration options.",
    features: ["Digital message delivery", "Communication workflow support", "Potential integration with business systems", "Message tracking or reporting where available"],
    value: "A structured messaging platform can help organisations communicate with users and customers through more manageable digital workflows.",
    screenshots: [
      { src: smsTeleSendSms, alt: "SMS Tele send SMS workspace", label: "SMS Tele messaging workspace" },
    ],
  },
  {
    id: "biasharalink", name: "BiasharaLink", place: "Kenya", year: "2025", category: "Digital commerce | Business platforms", image: biasharaLinkImage,
    description: "A digital inquiry and business-matchmaking platform that helps connect commercial enquiries with relevant business opportunities.",
    overview: "BiasharaLink provides a digital route for submitting business inquiries and connecting them with relevant opportunities. Depending on configuration, it may support inquiry capture through web forms, QR codes or links, and structured routing or scoring.",
    features: ["Digital inquiry capture", "Business opportunity discovery", "Inquiry routing and follow-up support", "Connections between businesses and relevant opportunities"],
    value: "By organising inquiries and helping route them to relevant opportunities, BiasharaLink can make business engagement more structured and easier to manage.",
  },
  {
    id: "dtic", name: "South Africa DTIC Export Barrier Reporting and Resolution Platform", place: "Other projects", year: "2026", category: "Trade facilitation | Public-sector systems", image: amimsImage,
    description: "A digital platform supporting the reporting, tracking and resolution of barriers affecting exporters in South Africa.",
    overview: "Delivered for South Africa’s Department of Trade, Industry and Competition, the platform supports a structured digital process for reporting export barriers and following their progress towards resolution.",
    features: ["Export-barrier reporting", "Structured recording of reported issues", "Tracking of resolution progress", "Support for coordination among relevant stakeholders"],
    value: "A shared digital process can make export barriers easier to record, follow up and manage, helping stakeholders maintain visibility of issues affecting trade.",
  },
  {
    id: "sarit", name: "Sarit Belong", place: "Kenya", year: "2026", category: "Customer engagement | Digital commerce", image: saritImage, visual: saritLogo, visualKind: "logo",
    description: "A customer-engagement and loyalty platform designed to connect shoppers, merchants and centre services within the Sarit ecosystem.",
    overview: "Sarit Belong brings customer-facing loyalty and engagement services into a digital experience, with live capabilities determined by the deployed configuration.",
    features: ["Customer accounts and loyalty points", "E-purse and transaction history where enabled", "Referrals, vouchers and offers", "Merchant engagement and redemption", "Campaigns and notifications", "Parking-related services where enabled"],
    value: "A connected loyalty experience can help make customer engagement more convenient while giving merchants and centre teams tools to support campaigns and participation.",
    screenshots: [
      { src: saritLoyaltyApp, alt: "Sarit loyalty app download page", label: "Loyalty app experience" },
    ],
  },
  {
    id: "tradeconnect", name: "TradeConnect", place: "Regional", year: "2026", category: "Trade facilitation | Business platforms", image: cmisImage,
    description: "A digital trade and business platform bringing together information, opportunities and business interactions.",
    overview: "TradeConnect is designed to give users a digital environment for discovering relevant information and opportunities and managing business interactions.",
    features: ["Information feeds and discovery", "Business and trade opportunities", "Messaging and bookings where enabled", "Wallet and account/profile functions where enabled", "Integration with related platforms where deployed"],
    value: "Bringing business information and interactions into one digital environment can make it easier for users to discover opportunities and coordinate next steps.",
  },
  {
    id: "dealhouse", name: "DealHouse", place: "Kenya", year: "2025", category: "Business platforms | Digital commerce", image: dealHouseImage,
    description: "A digital deal-management environment designed to support the organisation and progression of business transactions.",
    overview: "DealHouse supports structured deal workflows and the information used to move transactions forward. Depending on the deployed scope, functions may include deal rooms, templates, document handling, billing and links to logistics, warehousing or financing workflows.",
    features: ["Deal and document organisation", "Term-sheet and contract templates", "Deal rooms and transaction workflows", "Billing support where enabled", "Connections to logistics, warehousing or financing workflows where implemented"],
    value: "A more structured deal environment can help parties organise transaction information, coordinate next steps and maintain visibility as a deal progresses.",
  },
  {
    id: "real-sources-africa", name: "Real Sources Africa", place: "Regional", year: "2026", category: "Trade facilitation | Business platforms", image: realSourcesHome,
    description: "A digital trade-facilitation platform that connects African SMEs, institutions and markets through structured commercial services.",
    overview: "Real Sources Africa presents a connected ecosystem of digital platforms and physical channels designed to move trade from paper-based processes to a more trackable digital experience. Its web experience introduces the organisation, its market-facing platforms and the people they serve.",
    features: ["Trade opportunity discovery", "Digital inquiry and deal routing", "Institutional and SME services", "Market and impact information"],
    value: "A clear digital front door helps businesses and institutions discover trade services, submit enquiries and understand the platforms available to move opportunities forward.",
    screenshots: [
      { src: realSourcesHome, alt: "Real Sources Africa homepage", label: "Trade platform homepage" },
      { src: realSourcesEcosystem, alt: "Real Sources Africa ecosystem page", label: "Platform ecosystem" },
    ],
  },
]
const locations = [
  { name: "Kenya", x: 387, y: 375, labelX: 426, labelY: 364 },
  { name: "Uganda", x: 289, y: 338, labelX: 240, labelY: 298 },
  { name: "Tanzania", x: 442, y: 486, labelX: 458, labelY: 498 },
  { name: "Rwanda", x: 231, y: 390, labelX: 157, labelY: 375 },
  { name: "Burundi", x: 225, y: 419, labelX: 154, labelY: 438 },
]
const projectDetails: Record<string, { userNotes: string[]; integrations?: string[]; delivery?: string }> = {
  kncci: { userNotes: ["Gives chamber members a visible online storefront", "Makes products and services easier for buyers and partners to discover", "Brings marketplace participation into a shared business ecosystem"], integrations: ["Member and business data", "Web and mobile marketplace experience"] },
  nda: { userNotes: ["Supports licensing, permits and regulatory service workflows", "Makes applications and regulatory information easier to access and track", "Designed for more structured handling of records and decisions"], integrations: ["Microsoft Dynamics", "Uganda Single Window", "Bank and mobile-money payment channels"] },
  zfda: { userNotes: ["Supports food, medicines, cosmetics and medical-device regulation", "Combines public applicant journeys with secure internal processing", "Enables clearer oversight of applications, records and services"], integrations: ["ZanMalipo government payments", "Keycloak single sign-on", "Dedicated reporting and analytics"], delivery: "Re-platformed live regulatory services in phases, beginning with the public client portal." },
  ipmis: { userNotes: ["Brings regional pharmaceutical market information into one view", "Supports evidence-based market analysis across EAC partner states", "Helps stakeholders see market dynamics more clearly"], integrations: ["Regional pharmaceutical data sources", "Analytical reporting"] },
  "eac-harmonisation": { userNotes: ["Connects information used in medicines-registration harmonisation", "Supports regional coordination among participating regulators", "Helps stakeholders work from more organised registration information"], integrations: ["Six national medicines regulators", "Joint registration and GMP-inspection workflows"] },
  sps: { userNotes: ["Helps traders and authorities find sanitary and phytosanitary information", "Supports agricultural trade compliance across borders", "Makes relevant requirements and processes easier to navigate"], integrations: ["Permit and e-phyto certificate verification", "TradeMark Africa TLIP pipeline"] },
  "fund-master": { userNotes: ["Unifies benefits, investment and member information", "Provides self-service and reporting for retirement organisations", "Supports operational and financial visibility in one environment"], integrations: ["SMS", "ERP", "Document management", "LDAP"] },
  smstele: { userNotes: ["Supports structured digital message delivery", "Helps teams manage communication workflows", "Provides a basis for tracking delivery and reporting"], integrations: ["Business-system integrations where deployed", "Message delivery channels"] },
  biasharalink: { userNotes: ["Captures enquiries through web forms, QR codes or links", "Validates, scores and routes business opportunities", "Makes follow-up more structured for participating organisations"], integrations: ["AI decision engine", "Digital enquiry channels"] },
  dtic: { userNotes: ["Lets exporters report barriers through web, mobile, SMS or WhatsApp", "Classifies and routes cases in four languages", "Tracks cases through resolution and flags recurring trade issues"], integrations: ["WhatsApp Business API", "SMS and email", "WTO ePing", "ITC Market Access Map"], delivery: "Delivered with TradeMark Africa for South Africa's Department of Trade, Industry and Competition." },
  sarit: { userNotes: ["Lets shoppers earn and redeem loyalty points across the Sarit ecosystem", "Connects shoppers, merchants, partners and centre teams", "Supports vouchers, referrals, campaigns and parking-related services where enabled"], integrations: ["M-Pesa payments", "NetSuite ERP", "Infobip OTP and SMS", "Power BI reporting", "Keycloak single sign-on"], delivery: "Technovation provided technical leadership, solution architecture and delivery across the apps, back office and integrations." },
  tradeconnect: { userNotes: ["Brings trade information, opportunities and interactions together", "Supports discovery, messaging and bookings where enabled", "Gives users one digital environment for relevant next steps"], integrations: ["Related trade platforms where deployed", "Account, profile and wallet functions where enabled"] },
  dealhouse: { userNotes: ["Organises the documents and next steps that move a transaction forward", "Supports deal rooms, templates and transaction workflows", "Can connect commercial activity to logistics, warehousing and financing"], integrations: ["Billing", "Logistics and warehousing workflows", "Financing workflows where implemented"] },
  "real-sources-africa": { userNotes: ["Introduces the trade platforms and services available to SMEs and institutions", "Makes it easier to understand who each platform is built for", "Creates a digital route into enquiries, opportunities and trade support"], integrations: ["DealHouse", "BiasharaLink", "Institutional and market-partner channels"] },
}
function EdgeSignal() {
  return (
    <svg class="px-edge" aria-hidden="true">
      <rect x="1" y="1" rx="20" pathLength="100" />
      <rect x="1" y="1" rx="20" pathLength="100" />
    </svg>
  )
}
export default defineComponent(
  () => {
    const location = shallowRef("Kenya")
    const selected = shallowRef<Project>(work[0]!)
    const detail = shallowRef<Project | null>(null)
    const hover = shallowRef<string | null>(null)
    const motionPaused = shallowRef(false)
    const page = shallowRef<HTMLDivElement | null>(null)
    const progress = shallowRef<HTMLDivElement | null>(null)
    const dialog = shallowRef<HTMLDialogElement | null>(null)
    const route = useRoute()
    const isProducts = computed(() => route.path.replace(/\/$/, "") === "/products")
    const visible = computed(() =>
      location.value === "All projects"
        ? work
        : work.filter((p) => p.place === location.value),
    )
    const choose = (name: string) => {
      location.value = name
      selected.value = work.find((p) => p.place === name) ?? work[0]!
    }
    useClientEffect(
      () => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        const observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (!media.matches)
                  entry.target.animate(
                    [
                      { opacity: 0.35, transform: "translateY(25px)" },
                      { opacity: 1, transform: "translateY(0)" },
                    ],
                    { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" },
                  )
                observer.unobserve(entry.target)
              }
            }),
          { threshold: 0.12 },
        )
        page.value
          ?.querySelectorAll(
            ".px-section-title,.px-product-card,.px-project-grid,.px-cta",
          )
          .forEach((el) => observer.observe(el))
        let frame = 0
        const update = () => {
          frame = 0
          const distance =
            document.documentElement.scrollHeight - window.innerHeight
          if (progress.value)
            progress.value.style.transform = `scaleX(${
              distance > 0 ? window.scrollY / distance : 0
            })`
        }
        const scroll = () => {
          if (!frame) frame = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", scroll, { passive: true })
        return () => {
          observer.disconnect()
          cancelAnimationFrame(frame)
          window.removeEventListener("scroll", scroll)
        }
      },
      () => [],
    )
    useClientEffect(
      () => {
        document.title = `${
          isProducts.value ? "Products" : "Projects"
        } — Technovation Ventures`
        if (isProducts.value)
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "instant" })
      },
      () => [isProducts.value],
    )
    useClientEffect(
      () => {
        if (detail.value) dialog.value?.showModal()
        else dialog.value?.close()
      },
      () => [detail.value],
    )
    return () => (
      <div
        ref={page}
        class={`px-page ${motionPaused.value ? "px-motion-paused" : ""}`}
      >
        <div ref={progress} class="scroll-progress" aria-hidden="true" />
        <a class="px-skip" href="#explorer">
          Skip to project explorer
        </a>
        <Navbar scrolled />
        <main>
          <section class="px-hero px-wrap">
            <div>
              <p class="px-kicker">
                <i /> OUR WORK, ON THE MAP
              </p>
              <h1>
                Ideas put into practice.
                <br />
                <span>Built for opportunity.</span>
              </h1>
            </div>
            <div class="px-intro">
              <p>
                We turn complex operational, regulatory and commercial
                challenges into digital solutions. Explore the platforms,
                systems and applications we build to help organisations work
                smarter, connect services and create new opportunities.
              </p>
              <a
                class="px-down"
                href="#explorer"
                aria-label="Scroll to the project map"
              >
                <svg viewBox="0 0 24 32" fill="none" aria-hidden="true">
                  <path
                    d="M12 3V27M4 19L12 27L20 19"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </a>
            </div>
          </section>
          <section
            id="explorer"
            class="px-wrap px-explorer"
            aria-label="Interactive project explorer"
          >
            <div class="px-explorer-top">
              <div>
                <span class="px-live" /> PROJECT ATLAS{" "}
                <span class="px-dim"> / EAST AFRICA</span>
              </div>
              <span class="px-map-instruction">
                Tap a country to discover our work
              </span>
              <button
                class="px-motion-toggle"
                aria-pressed={motionPaused.value}
                onClick={() => (motionPaused.value = !motionPaused.value)}
              >
                {motionPaused.value ? "Resume motion" : "Pause motion"}
              </button>
            </div>
            <div class="px-atlas-grid">
              <div class="px-map">
                <svg
                  viewBox="80 210 560 355"
                  aria-label="East Africa project locations"
                >
                  <defs>
                    <pattern
                      id="map-grid"
                      width="46"
                      height="46"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 46 0 L 0 0 0 46"
                        fill="none"
                        stroke="#93b8cb"
                        stroke-opacity=".07"
                      />
                    </pattern>
                    <radialGradient id="map-light">
                      <stop stop-color="#32698c" stop-opacity=".3" />
                      <stop offset="1" stop-color="#122733" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                  <rect
                    x="0"
                    y="90"
                    width="720"
                    height="590"
                    fill="url(#map-grid)"
                  />
                  <ellipse
                    cx="340"
                    cy="360"
                    rx="330"
                    ry="300"
                    fill="url(#map-light)"
                  />
                  {countries.map((c) => {
                    const active = locations.some((l) => l.name === c.name)
                    return (
                      <path
                        key={c.name}
                        d={c.d}
                        class={`px-country ${active ? "px-covered" : ""} ${
                          location.value === c.name ? "px-selected" : ""
                        } ${hover.value === c.name ? "px-hover" : ""}`}
                        onClick={active ? () => choose(c.name) : undefined}
                        onMouseenter={
                          active ? () => (hover.value = c.name) : undefined
                        }
                        onMouseleave={() => (hover.value = null)}
                        aria-hidden="true"
                      />
                    )
                  })}
                  <text x="220" y="160" class="px-neighbour">
                    SOUTH SUDAN
                  </text>
                  <text x="458" y="189" class="px-neighbour">
                    ETHIOPIA
                  </text>
                  <text x="97" y="330" class="px-neighbour">
                    D. R. CONGO
                  </text>
                  <text x="550" y="412" class="px-ocean">
                    INDIAN
                  </text>
                  <text x="555" y="433" class="px-ocean">
                    OCEAN
                  </text>
                  <text x="306" y="503" class="px-neighbour">
                    TANZANIA
                  </text>
                  {locations
                    .filter((l) => l.name !== "Kenya")
                    .map((l, index) => (
                      <g
                        key={l.name}
                        aria-hidden="true"
                        style={
                          {
                            "--signal-delay": `${index * -0.9}s`,
                          } as CSSProperties
                        }
                      >
                        <path
                          d={`M387 375 Q ${(387 + l.x) / 2 + 35} ${(375 + l.y) / 2 - 40} ${l.x} ${l.y}`}
                          class="px-connection"
                        />
                        <path
                          pathLength="100"
                          d={`M387 375 Q ${(387 + l.x) / 2 + 35} ${(375 + l.y) / 2 - 40} ${l.x} ${l.y}`}
                          class="px-connection-signal"
                        />
                      </g>
                    ))}
                  {locations.map((l) => (
                    <g
                      key={l.name}
                      role="button"
                      tabindex={0}
                      aria-label={`Explore ${l.name} projects`}
                      aria-pressed={location.value === l.name}
                      onClick={() => choose(l.name)}
                      onKeydown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          choose(l.name)
                        }
                      }}
                      onMouseenter={() => (hover.value = l.name)}
                      onMouseleave={() => (hover.value = null)}
                      class={`px-pin ${
                        location.value === l.name ? "px-pin-active" : ""
                      }`}
                    >
                      <circle cx={l.x} cy={l.y} r="26" class="px-pin-hit" />
                      <circle cx={l.x} cy={l.y} r="12" class="px-pin-pulse" />
                      <circle cx={l.x} cy={l.y} r="14" class="px-pin-ring" />
                      <circle cx={l.x} cy={l.y} r="5" class="px-pin-core" />
                      <text x={l.labelX} y={l.labelY}>
                        {l.name === "Tanzania" ? "Zanzibar" : l.name}
                        {location.value === l.name ? " ↗" : ""}
                      </text>
                    </g>
                  ))}
                  <g class="px-compass" transform="translate(609 248)">
                    <text y="-12">N</text>
                    <path d="M0 0L-5 20L0 15L5 20Z" />
                  </g>
                </svg>
                <div class="px-map-caption">
                  <span>
                    <i /> Project location
                  </span>
                  <span>Boundaries: Natural Earth</span>
                </div>
                <div class="px-map-hint">
                  {hover.value
                    ? `Discover ${hover.value} →`
                    : "From Nairobi, across the region."}
                </div>
              </div>
              <aside
                class="px-preview"
                aria-live="polite"
                aria-atomic="true"
                key={selected.value.id}
              >
                <div class="px-preview-top">
                  <span class="px-kicker">
                    {selected.value.place === "Tanzania"
                      ? "Zanzibar · Tanzania"
                      : selected.value.place}
                  </span>
                  <span>{String(work.indexOf(selected.value) + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}</span>
                </div>
                <div class="px-browser">
                  <div>
                    <i />
                    <i />
                    <i />
                    <span>{selected.value.name}</span>
                  </div>
                  <img
                    class={
                      selected.value.visualKind === "logo" || ["kncci", "nda", "smstele", "biasharalink", "dealhouse"].includes(selected.value.id)
                        ? "px-project-logo"
                        : selected.value.id === "sarit" && !selected.value.visual
                          ? "px-app-shot"
                          : undefined
                    }
                    src={selected.value.visual ?? selected.value.image}
                    alt={`${selected.value.name} interface`}
                  />
                </div>
                <p class="px-category">{selected.value.year} / {selected.value.category}</p>
                <h2>{selected.value.name}</h2>
                <p class="px-description">{selected.value.description}</p>
                <button
                  class="px-action"
                  onClick={() => (detail.value = selected.value)}
                >
                  Explore project <span>↗</span>
                </button>
                <p class="px-preview-note">
                  Purpose-built technology. Regional perspective.
                </p>
              </aside>
            </div>
            <div
              class="px-location-list"
              aria-label="Filter projects by location"
            >
              {[
                "All projects",
                ...locations.map((l) => l.name),
                "Regional",
                "Other projects",
              ].map((name) => (
                <button
                  key={name}
                  aria-pressed={location.value === name}
                  onClick={() => choose(name)}
                >
                  {name}
                  <span>
                    {name === "All projects"
                      ? work.length
                      : work.filter((p) => p.place === name).length}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <nav class="px-section-nav px-wrap" aria-label="Page sections">
            <a href="#explorer">
              01 <span>Project atlas</span> ↑
            </a>
            <a href="#collection">
              02 <span>Project collection</span> ↓
            </a>
            <a href="#products">
              03 <span>Our products</span> ↓
            </a>
          </nav>
          <section id="collection" class="px-wrap px-collection">
            <div class="px-section-title">
              <div>
                <p class="px-kicker">THE PROJECT COLLECTION</p>
                <h2>
                  {location.value === "All projects"
                    ? "Ideas put into practice."
                    : location.value === "Other projects"
                      ? "More of our work."
                      : `A closer look at ${
                          location.value === "Regional"
                            ? "the region"
                            : location.value
                        }.`}
                </h2>
              </div>
              <p aria-live="polite">
                {visible.value.length}{" "}
                {visible.value.length === 1 ? "project" : "projects"}{" "}
                <span> / </span>
                <button onClick={() => choose("All projects")}>
                  View all projects ↗
                </button>
              </p>
            </div>
            <div class="px-case-study-list" aria-live="polite">
              {visible.value.map((project) => {
                const context = projectDetails[project.id]
                const visual = project.visual ?? project.image
                const isLogo = project.visualKind === "logo" || ["kncci", "nda", "smstele", "biasharalink", "dealhouse"].includes(project.id)
                return <article class="px-case-study" key={`case-${project.id}`}>
                  <div class="px-case-visual">
                    <img
                      class={isLogo ? "px-project-logo" : undefined}
                      loading="lazy"
                      src={visual}
                      alt={`${project.name} platform preview`}
                    />
                  </div>
                  <div class="px-case-copy">
                    <div class="px-case-meta"><span>{project.place === "Tanzania" ? "Zanzibar, Tanzania" : project.place} · {project.year}</span><span>{project.category}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div class="px-case-tags">{project.features.slice(0, 3).map((feature) => <span key={feature}>{feature}</span>)}</div>
                    <details>
                      <summary>See how it works</summary>
                      <div class="px-case-detail">
                        <div><h4>What happens in the platform</h4><p>{project.overview}</p></div>
                        {context && <div><h4>What users can do</h4><ul>{context.userNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>}
                        {context?.integrations && <div><h4>Connected services</h4><ul>{context.integrations.map((item) => <li key={item}>{item}</li>)}</ul></div>}
                        {context?.delivery && <div><h4>Delivery context</h4><p>{context.delivery}</p></div>}
                      </div>
                      {project.screenshots && <div class="px-case-screenshots" aria-label={`${project.name} website and product screens`}>
                        {project.screenshots.map((screen) => <figure key={screen.label}><img src={screen.src} alt={screen.alt} loading="lazy" /><figcaption>{screen.label}</figcaption></figure>)}
                      </div>}
                    </details>
                    <button class="px-case-link" onClick={() => (detail.value = project)}>Open full project profile <span>↗</span></button>
                  </div>
                </article>
              })}
            </div>
            {location.value === "Other projects" && (
              <p class="px-footnote">
                These systems are listed separately because their deployment
                locations are not specified in the published portfolio.
              </p>
            )}
          </section>
          <section id="products" class="px-products">
            <div class="px-wrap">
              <div class="px-section-title">
                <div>
                  <p class="px-kicker">OUR PRODUCTS</p>
                  <h2>
                    Your next chapter.
                    <br />
                    <span>Already taking shape.</span>
                  </h2>
                </div>
                <p>
                  Proven platforms for the work that matters.
                  <br />
                  Let’s find the right fit for your organisation.
                </p>
              </div>
              <div class="px-product-grid">
                <article class="px-product-card">
                  <EdgeSignal />
                  <span class="px-product-number">
                    01 / CUSTOMER EXPERIENCE
                  </span>
                  <h3>Ticket Management System</h3>
                  <p class="px-product-description">
                    Organise, prioritise and track support tickets. Keep
                    customers informed with personalised SMS updates.
                  </p>
                  <div class="px-tags">
                    <span>Ticket tracking</span>
                    <span>SMS updates</span>
                  </div>
                  <a>
                    Enquire about this product <span>↗</span>
                  </a>
                </article>
                <article class="px-product-card px-product-regulatory">
                  <EdgeSignal />
                  <span class="px-product-number">
                    02 / MEDICINE REGULATION
                  </span>
                  <h3>Technovation NMRA System</h3>
                  <p class="px-product-description">
                    Manage medicine registration, licensing, inspections and
                    safety in one platform for national medicine regulators.
                  </p>
                  <div class="px-tags">
                    <span>Registration</span>
                    <span>Licensing</span>
                    <span>Pharmacovigilance</span>
                  </div>
                  <a>
                    Enquire about this product <span>↗</span>
                  </a>
                </article>
              </div>
            </div>
          </section>
          <section class="px-wrap px-cta">
            <p class="px-kicker">LET’S BUILD WHAT’S NEXT</p>
            <h2>
              Your ambition.
              <br />
              Our next point on the map.
            </h2>
            <NuxtLink class="px-action" to="/#contact">
              Start a conversation <span>↗</span>
            </NuxtLink>
          </section>
        </main>
        <footer class="px-wrap px-footer">
          <NuxtLink to="/">Technovation Ventures</NuxtLink>
          <span>Nairobi, Kenya · Built for the region.</span>
          <span>© {new Date().getFullYear()} Technovation Ventures Ltd.</span>
        </footer>
        <dialog
          ref={dialog}
          class="px-dialog"
          onCancel={() => (detail.value = null)}
          onClick={(e) => {
            if (e.target === e.currentTarget) detail.value = null
          }}
          aria-labelledby="project-title"
        >
          {detail.value && (
            <>
              <button
                class="px-dialog-close"
                onClick={() => (detail.value = null)}
                aria-label="Close project details"
                autofocus
              >
                ✕
              </button>
              <img
                class={
                  detail.value.visualKind === "logo" || ["kncci", "nda", "smstele", "biasharalink", "dealhouse"].includes(detail.value.id)
                    ? "px-project-logo"
                    : detail.value.id === "sarit" && !detail.value.visual
                      ? "px-app-shot"
                      : undefined
                }
                src={detail.value.visual ?? detail.value.image}
                alt={`${detail.value.name} application screenshot`}
              />
              <div class="px-dialog-copy">
                <p class="px-kicker">
                  {detail.value.year} / {detail.value.category}
                </p>
                <h2 id="project-title">{detail.value.name}</h2>
                <p>{detail.value.description}</p>
                <h3>Overview</h3>
                <p>{detail.value.overview}</p>
                {projectDetails[detail.value.id] && (
                  <>
                    <h3>What users should know</h3>
                    <ul>{projectDetails[detail.value.id]!.userNotes.map((note) => <li key={note}>{note}</li>)}</ul>
                    {projectDetails[detail.value.id]!.integrations && <><h3>Connected systems and channels</h3><ul>{projectDetails[detail.value.id]!.integrations?.map((item) => <li key={item}>{item}</li>)}</ul></>}
                    {projectDetails[detail.value.id]!.delivery && <><h3>Delivery context</h3><p>{projectDetails[detail.value.id]!.delivery}</p></>}
                  </>
                )}
                <h3>Key capabilities / focus areas</h3>
                <ul>
                  {detail.value.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <h3>The value</h3>
                <p>{detail.value.value}</p>
                <a
                  class="px-action"
                >
                  Discuss a similar project ↗
                </a>
              </div>
            </>
          )}
        </dialog>
      </div>
    )
  },
  { name: "ProjectsPage", props: [] },
)
