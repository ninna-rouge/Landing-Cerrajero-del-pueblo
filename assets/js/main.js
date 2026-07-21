/**
 * Cerrajero del Pueblo — Landing interactions
 */

const WHATSAPP_PHONE = "56978530417"

const WHATSAPP_MESSAGES = {
  default:
    "\u{A1}Hola! \u{1F44B}\n\nLes escribo desde la web de *Cerrajero del Pueblo*. Necesito ayuda con un tema de cerrajer\u{ED}a y me gustar\u{ED}a confirmar disponibilidad y valor \u{1F511}\n\n\u{1F4CD} Comuna / sector: _\n\u{1F6E0}\u{FE0F} Qu\u{E9} necesito: _\n\u{1F4F8} Foto o video de la chapa / situaci\u{F3}n: _(lo adjunto en este chat)_\n\n\u{A1}Gracias! Quedo atento/a \u{1F64F}",
  hero:
    "\u{A1}Hola! \u{1F44B}\n\nLes escribo desde su sitio web. Vi que est\u{E1}n disponibles *24/7* y quiero pedir un servicio \u{1F511}\n\n\u{1F4CD} Comuna / sector: _\n\u{1F6E0}\u{FE0F} Qu\u{E9} necesito: _\n\u{23F0} \u{BF}Es urgente o coordinamos horario?\n\u{1F4F8} Foto o video de referencia: _(lo adjunto aqu\u{ED})_\n\nSi me confirman disponibilidad y valor, perfecto. \u{A1}Gracias! \u{1F60A}\u{1F64F}",
  service:
    "\u{A1}Hola! \u{1F44B}\n\nQuiero solicitar un servicio con *Cerrajero del Pueblo* \u{1F511}\n\n\u{1F6E0}\u{FE0F} Servicio: _\n\u{1F4CD} Comuna / sector: _\n\u{23F0} \u{BF}Pueden venir hoy o coordinamos horario?\n\u{1F4F8} Foto o video de la chapa / situaci\u{F3}n: _(lo adjunto para que lo revisen)_\n\nDe d\u{ED}a (09:00 a 19:00) entiendo que no hay recargo; si es de noche, me confirman el total con el recargo \u{1F319}\n\n\u{A1}Gracias! Quedo atento/a \u{1F64F}",
  pricing:
    "\u{A1}Hola! \u{1F44B}\n\nEstuve viendo sus tarifas y me gustar\u{ED}a cotizar con ustedes \u{1F4CB}\n\n\u{1F6E0}\u{FE0F} Servicio: _\n\u{1F4CD} Comuna: _\n\u{23F0} Horario aproximado: _\n\u{1F4F8} Foto o video de la chapa / situaci\u{F3}n: _(lo adjunto para cotizar mejor)_\n\nSi cae en emergencia (19:00 a 09:00), \u{BF}me confirman el total con el recargo de $15.000?\n\n\u{A1}Muchas gracias! Quedo atento/a \u{1F64F}",
  coverage:
    "\u{A1}Hola! \u{1F44B}\n\nAntes de pedir el servicio, quiero confirmar cobertura y traslado \u{1F4CD}\n\n\u{1F4CD} Comuna / sector: _\n\nVi que en *Puente Alto* y *La Florida* no hay gasto de traslado, y en otras comunas hay tarifa seg\u{FA}n distancia. \u{BF}Me confirman si llegan donde estoy y c\u{F3}mo queda el desplazamiento?\n\nSi hay cobertura, despu\u{E9}s les cuento el servicio y adjunto foto o video \u{1F4F8}\n\n\u{A1}Gracias! \u{1F64F}",
  contact:
    "\u{A1}Hola! \u{1F44B}\n\nMe contacto desde la web de *Cerrajero del Pueblo*. Necesito ayuda con cerrajer\u{ED}a \u{1F511}\n\n\u{1F4CD} Comuna: _\n\u{1F6E0}\u{FE0F} Qu\u{E9} necesito: _\n\u{23F0} \u{BF}Es urgente o podemos coordinar en horario normal (09:00 a 19:00)?\n\u{1F4F8} Foto o video de la chapa / situaci\u{F3}n: _(lo adjunto en este chat)_\n\n\u{A1}Gracias! Quedo atento/a \u{1F64F}",
  fab:
    "\u{A1}Hola! \u{1F44B}\n\nLes escribo desde el WhatsApp de su p\u{E1}gina. \u{BF}Me pueden ayudar con un servicio de cerrajer\u{ED}a? \u{1F511}\n\n\u{1F4CD} Estoy en: _\n\u{1F6E0}\u{FE0F} Necesito: _\n\u{1F4F8} Foto o video de referencia: _(lo adjunto aqu\u{ED})_\n\nSi me confirman disponibilidad y valor, genial. \u{A1}Gracias! \u{1F64F}",
  faq:
    "\u{A1}Hola! \u{1F44B}\n\nEstaba revisando las *preguntas frecuentes* en su web y me qued\u{F3} una duda \u{1F64F}\n\n\u{1F4AC} Mi consulta: _\n\u{1F4CD} Comuna / sector: _\n\u{1F4F8} Si aplica, adjunto foto o video de la chapa / situaci\u{F3}n: _(aqu\u{ED})_\n\n\u{A1}Gracias! Quedo atento/a \u{1F511}"
}

const buildWhatsAppUrl = (type) => {
  const key = type && WHATSAPP_MESSAGES[type] ? type : "default"
  const text = WHATSAPP_MESSAGES[key]
  return (
    "https://api.whatsapp.com/send?phone=" +
    WHATSAPP_PHONE +
    "&text=" +
    encodeURIComponent(text)
  )
}

const COVERAGE_GEOJSON = "assets/data/cobertura-comunas.geojson"

const $ = (selector, scope = document) => scope.querySelector(selector)
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]

const handleNavbarScroll = () => {
  const navbar = $("#navbar")
  if (!navbar) return

  const update = () => {
    const scrolled = window.scrollY > 40
    navbar.classList.toggle("is-scrolled", scrolled)
  }

  update()
  window.addEventListener("scroll", update, { passive: true })
}

const handleMobileMenu = () => {
  const toggle = $("#nav-toggle")
  const menu = $("#mobile-menu")
  const closeBtn = $("#mobile-close")
  if (!toggle || !menu) return

  const open = () => {
    menu.classList.add("is-open")
    menu.setAttribute("aria-hidden", "false")
    toggle.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"
  }

  const close = () => {
    menu.classList.remove("is-open")
    menu.setAttribute("aria-hidden", "true")
    toggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }

  toggle.addEventListener("click", open)
  closeBtn?.addEventListener("click", close)

  $$("a", menu).forEach((link) => link.addEventListener("click", close))

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("is-open")) return
    close()
    toggle.focus()
  })
}

const handlePricingTabs = () => {
  const tabs = $$("[data-pricing-tab]")
  const panels = $$("[data-pricing-panel]")
  if (!tabs.length) return

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-pricing-tab")

      tabs.forEach((item) => {
        const isActive = item === tab
        item.classList.toggle("is-active", isActive)
        item.setAttribute("aria-selected", String(isActive))
      })

      panels.forEach((panel) => {
        const isActive = panel.getAttribute("data-pricing-panel") === target
        panel.classList.toggle("is-active", isActive)
        panel.hidden = !isActive

        if (!isActive) {
          $$(".price-row.is-open", panel).forEach((row) => {
            row.classList.remove("is-open")
            const toggle = $(".price-row-toggle", row)
            const detail = $(".price-detail", row)
            if (toggle) toggle.setAttribute("aria-expanded", "false")
            if (detail) detail.hidden = true
          })
        }
      })

      if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons()
      }
    })
  })
}

const handlePriceAccordion = () => {
  const toggles = $$(".price-row-toggle")
  if (!toggles.length) return

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const row = toggle.closest(".price-row")
      const detail = row ? $(".price-detail", row) : null
      const list = toggle.closest(".price-list")
      if (!row || !detail || !list) return

      const willOpen = !row.classList.contains("is-open")

      $$(".price-row.is-open", list).forEach((openRow) => {
        if (openRow === row) return
        openRow.classList.remove("is-open")
        const openToggle = $(".price-row-toggle", openRow)
        const openDetail = $(".price-detail", openRow)
        if (openToggle) openToggle.setAttribute("aria-expanded", "false")
        if (openDetail) openDetail.hidden = true
      })

      row.classList.toggle("is-open", willOpen)
      toggle.setAttribute("aria-expanded", String(willOpen))
      detail.hidden = !willOpen
    })
  })
}

const handleScrollReveal = () => {
  const elements = $$(".reveal")
  if (!elements.length) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((el) => el.classList.add("is-visible"))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  )

  elements.forEach((el) => observer.observe(el))
}

const handleTrustMotion = () => {
  const trust = $(".trust")
  if (!trust || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        trust.classList.add("is-alive")
        observer.unobserve(trust)
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(trust)
}

const handleFooterLogo = () => {
  const footer = $(".footer")
  if (!footer) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    footer.classList.add("is-inview")
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        footer.classList.add("is-inview")
        observer.unobserve(footer)
      })
    },
    { threshold: 0.18 }
  )

  observer.observe(footer)
}

const handleActiveNav = () => {
  const sections = $$("section[id]")
  const links = $$('.nav-links a[href^="#"]')
  if (!sections.length || !links.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = entry.target.getAttribute("id")
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`
          link.classList.toggle("is-active", isActive)
          if (isActive) {
            link.setAttribute("aria-current", "page")
          } else {
            link.removeAttribute("aria-current")
          }
        })
      })
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  )

  sections.forEach((section) => observer.observe(section))
}

const wireWhatsAppLinks = () => {
  $$("[data-whatsapp]").forEach((el) => {
    const type = el.getAttribute("data-whatsapp") || "default"
    el.setAttribute("href", buildWhatsAppUrl(type))
    el.setAttribute("target", "_blank")
    el.setAttribute("rel", "noopener noreferrer")
  })
}

const wireMailtoLinks = () => {
  $$('a[href^="mailto:"]').forEach((el) => {
    el.addEventListener("click", (event) => {
      const href = el.getAttribute("href")
      if (!href) return
      event.preventDefault()
      window.location.assign(href)
    })
  })
}

const initLucide = () => {
  const render = () => {
    if (typeof lucide === "undefined" || !lucide.createIcons) return false
    lucide.createIcons()
    return true
  }

  if (render()) return

  let attempts = 0
  const timer = setInterval(() => {
    attempts += 1
    if (render() || attempts > 20) clearInterval(timer)
  }, 50)
}

const initCoverageMap = () => {
  const container = $("#coverage-map")
  if (!container) return

  const boot = () => {
    if (typeof L === "undefined") return false

    const map = L.map(container, {
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([-33.575, -70.56], 12)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    fetch(COVERAGE_GEOJSON)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el GeoJSON de cobertura")
        return res.json()
      })
      .then((geojson) => {
        const layer = L.geoJSON(geojson, {
          style: {
            color: "#C8A15A",
            weight: 2.5,
            opacity: 1,
            fillColor: "#0E3B2E",
            fillOpacity: 0.48,
          },
          onEachFeature: (feature, featureLayer) => {
            const name = feature.properties?.name
            if (!name) return
            featureLayer.bindTooltip(name, {
              permanent: true,
              direction: "center",
              className: "map-commune-label",
              opacity: 1,
            })
            featureLayer.bindPopup(
              `<strong>${name}</strong><br>Zona principal de cobertura`
            )
          },
        }).addTo(map)

        map.fitBounds(layer.getBounds(), { padding: [28, 28], maxZoom: 13 })
        requestAnimationFrame(() => map.invalidateSize())
      })
      .catch(() => {
        map.setView([-33.575, -70.56], 12)
      })

    const refresh = () => map.invalidateSize()
    window.addEventListener("resize", refresh, { passive: true })

    const section = $("#cobertura")
    if (section && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          refresh()
          observer.disconnect()
        },
        { threshold: 0.15 }
      )
      observer.observe(section)
    }

    return true
  }

  if (boot()) return

  let attempts = 0
  const timer = setInterval(() => {
    attempts += 1
    if (boot() || attempts > 40) clearInterval(timer)
  }, 50)
}

const handleHeroMotion = () => {
  const hero = $(".hero")
  if (!hero) return

  const animated = $$(
    ".hero-mark, .hero-brand-name, .hero-tag, .hero-rule, .hero-title, .hero-copy, .hero-actions",
    hero
  )
  if (!animated.length) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animated.forEach((el) => el.classList.add("is-settled"))
    return
  }

  animated.forEach((el) => {
    const settle = () => el.classList.add("is-settled")
    el.addEventListener("animationend", settle, { once: true })
    window.setTimeout(settle, 2200)
  })
}

const handleFaqAccordion = () => {
  const root = $("[data-faq]")
  if (!root) return

  const replayAnswer = (item) => {
    const answer = item.querySelector(".faq-a p")
    if (!answer) return
    answer.style.animation = "none"
    void answer.offsetWidth
    answer.style.animation = ""
  }

  $$("details.faq-item", root).forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return
      $$("details.faq-item", root).forEach((other) => {
        if (other !== item) other.open = false
      })
      replayAnswer(item)
    })
  })
}

const init = () => {
  handleNavbarScroll()
  handleMobileMenu()
  handlePricingTabs()
  handlePriceAccordion()
  handleFaqAccordion()
  handleScrollReveal()
  handleTrustMotion()
  handleFooterLogo()
  handleHeroMotion()
  handleActiveNav()
  wireWhatsAppLinks()
  wireMailtoLinks()
  initLucide()
  initCoverageMap()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
