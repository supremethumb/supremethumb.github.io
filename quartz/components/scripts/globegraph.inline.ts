import Globe from "globe.gl"

// Mock data for arcs
const ARC_REL_LEN = 0.4
const FLIGHT_TIME = 2000

const arcsData = [
  {
    startLat: 39.9042,
    startLng: 116.4074,
    endLat: 37.7749,
    endLng: -122.4194,
    color: ["#0ea5e9", "rgba(14, 165, 233, 0)"], // Electric blue with fade out
  }, // Beijing to SF
  {
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 40.7128,
    endLng: -74.006,
    color: ["#0ea5e9", "rgba(14, 165, 233, 0)"],
  }, // London to NY
  {
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 35.6762,
    endLng: 139.6503,
    color: ["#f97316", "rgba(249, 115, 22, 0)"], // Sharp orange with fade out
  }, // Sydney to Tokyo
  {
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: 48.8566,
    endLng: 2.3522,
    color: ["#f97316", "rgba(249, 115, 22, 0)"],
  }, // Sao Paulo to Paris
  {
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 25.2048,
    endLng: 55.2708,
    color: ["#0ea5e9", "rgba(14, 165, 233, 0)"],
  }, // Singapore to Dubai
]

// Determine if we are in dark mode (from Quartz class)
const isDarkMode = () => {
  if (typeof document !== "undefined") {
    return (
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("saved-theme") === "dark"
    )
  }
  return false
}

let globeInstance: any = null
let themeObserver: MutationObserver | null = null
let resizeHandler: (() => void) | null = null

function cleanup() {
  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler)
    resizeHandler = null
  }
  if (globeInstance) {
    globeInstance._destructor?.()
    globeInstance = null
  }
}

function renderGlobe() {
  cleanup() // Always clean up before rendering or when leaving the page

  const container = document.getElementById("globe-container")
  if (!container) return

  const height = parseInt(container.getAttribute("data-height") || "400")
  const width = container.clientWidth

  const dark = isDarkMode()
  const atmosphereColor = dark ? "#ffffff" : "#000000"

  // instantiate default globe instance correctly with new
  globeInstance = new (Globe as any)()(container)
    .width(width)
    .height(height)
    .backgroundColor("rgba(0,0,0,0)")
    .showAtmosphere(true)
    .atmosphereColor(atmosphereColor)
    .atmosphereAltitude(0.15)
    .showGlobe(true)
    .globeImageUrl(null) // Do not load external images
    .bumpImageUrl(null)

  // Custom globe material for minimalist look
  const globeMaterial = globeInstance.globeMaterial()
  globeMaterial.color.set(dark ? "#393639" : "#e5e5e5") // matching lightgray from config
  globeMaterial.emissive.set(dark ? "#161618" : "#faf8f8") // matching light from config
  globeMaterial.emissiveIntensity = 0.5
  globeMaterial.roughness = 0.9
  globeMaterial.metalness = 0.1
  globeMaterial.wireframe = true // Minimalist wireframe
  globeMaterial.transparent = true
  globeMaterial.opacity = 0.2 // subtle dot matrix/wireframe look

  globeInstance
    .arcsData(arcsData)
    .arcStartLat((d: any) => d.startLat)
    .arcStartLng((d: any) => d.startLng)
    .arcEndLat((d: any) => d.endLat)
    .arcEndLng((d: any) => d.endLng)
    .arcColor((d: any) => d.color)
    .arcStroke(0.5) // Thin but sharp arcs
    .arcDashLength(ARC_REL_LEN)
    .arcDashGap(2)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(FLIGHT_TIME)
    .arcsTransitionDuration(0)

  // Auto-rotation
  globeInstance.controls().autoRotate = true
  globeInstance.controls().autoRotateSpeed = 1.0
  globeInstance.controls().enableZoom = false

  // Handle Resize
  resizeHandler = () => {
    if (container && globeInstance) {
      globeInstance.width(container.clientWidth)
    }
  }
  window.addEventListener("resize", resizeHandler)

  // Listen to theme changes in Quartz
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class" || mutation.attributeName === "saved-theme") {
        renderGlobe() // re-render on theme change
      }
    })
  })

  themeObserver.observe(document.documentElement, { attributes: true })
}

// Quartz SPA initialization and navigation handling
document.addEventListener("nav", () => {
  renderGlobe() // renderGlobe intrinsically calls cleanup first. If no container exists on the new page, it will just early return after cleanup.
})

window.addEventListener("beforeunload", cleanup)
