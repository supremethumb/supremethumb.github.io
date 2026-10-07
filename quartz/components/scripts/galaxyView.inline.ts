import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

interface ContentIndexEntry {
  slug: string
  filePath: string
  title: string
  links?: string[]
  tags?: string[]
  content?: string
}

interface GalaxyNode {
  index: number
  slug: string
  title: string
  filePath: string
  domain: string
  domainColor: THREE.Color
  links: string[]
  degree: number
  x: number
  y: number
  z: number
  size: number
}

// Domain definitions & palettes
const DOMAIN_CONFIG: Record<string, { label: string; color: string; armIndex: number }> = {
  "01_IT Tech": { label: "IT & Tech", color: "#38bdf8", armIndex: 0 },
  "02_Economics": { label: "Economics", color: "#fbbf24", armIndex: 1 },
  "03_Management": { label: "Management", color: "#34d399", armIndex: 2 },
  "04_Design": { label: "Design", color: "#f472b6", armIndex: 3 },
  "05_Humanities": { label: "Humanities", color: "#a78bfa", armIndex: 4 },
}

function getDomain(filePath: string): string {
  if (!filePath) return "Other"
  for (const key of Object.keys(DOMAIN_CONFIG)) {
    if (filePath.includes(key)) return key
  }
  return "Other"
}

// Generate circular radial glow particle texture
function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")!

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.95)")
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)")
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

let activeCleanup: (() => void) | null = null

function initGalaxy() {
  const container = document.getElementById("galaxy-container")
  const canvas = document.getElementById("galaxy-canvas") as HTMLCanvasElement | null
  if (!container || !canvas) return

  // Cleanup existing instance if any
  if (activeCleanup) {
    activeCleanup()
    activeCleanup = null
  }

  const tooltip = document.getElementById("galaxy-node-card")
  const loadingVeil = document.getElementById("galaxy-loading-veil")

  // Scene setup
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x020308, 0.0008)

  const width = window.innerWidth
  const height = window.innerHeight
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 4000)
  camera.position.set(0, 320, 650)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x020308, 1)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.6
  controls.zoomSpeed = 0.8
  controls.maxDistance = 1800
  controls.minDistance = 30
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.35
  controls.target.set(0, 0, 0)

  // Starfield backdrop
  const starCount = 3500
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    const r = 800 + Math.random() * 1800
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    starPositions[i * 3 + 2] = r * Math.cos(phi)

    const tint = 0.7 + Math.random() * 0.3
    starColors[i * 3] = tint
    starColors[i * 3 + 1] = tint * 0.95
    starColors[i * 3 + 2] = tint * 1.1
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
  starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

  const starMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const starfield = new THREE.Points(starGeometry, starMaterial)
  scene.add(starfield)

  // Load contentIndex.json (using Quartz window.fetchData promise when available)
  const glowTexture = createGlowTexture()
  let nodes: GalaxyNode[] = []
  let pointsMesh: THREE.Points | null = null
  let linesMesh: THREE.LineSegments | null = null
  let defaultNodeColors: Float32Array | null = null
  let nodePositions: Float32Array | null = null
  let selectedDomain: string | null = null
  let hoveredIndex: number | null = null

  // @ts-ignore
  const dataPromise: Promise<Record<string, ContentIndexEntry>> =
    // @ts-ignore
    (window.fetchData as Promise<Record<string, ContentIndexEntry>>) ??
    fetch("./static/contentIndex.json").then((res) => res.json())

  dataPromise
    .then((indexMap: Record<string, ContentIndexEntry>) => {
      // Filter out non-notes (tag indexes, 404, index itself)
      const entries = Object.values(indexMap).filter(
        (e) =>
          e &&
          e.slug &&
          e.title &&
          e.slug !== "index" &&
          e.slug !== "404" &&
          !e.slug.startsWith("tags/") &&
          !e.slug.endsWith("/index"),
      )
      const count = entries.length

      // Build quick slug index
      const slugToIndex = new Map<string, number>()
      entries.forEach((e, idx) => slugToIndex.set(e.slug, idx))

      // Galaxy Spiral Math
      const arms = 5
      const armSpread = 0.5
      const coreRadius = 40
      const maxRadius = 550
      const armTwist = 3.6

      nodes = entries.map((entry, idx) => {
        const domain = getDomain(entry.filePath)
        const config = DOMAIN_CONFIG[domain]
        const arm = config ? config.armIndex : idx % arms
        const colorHex = config ? config.color : "#94a3b8"
        const color = new THREE.Color(colorHex)

        const degree = entry.links?.length ?? 1
        // High-degree hubs cluster closer to the galactic core
        const rFrac = Math.pow(Math.random(), degree > 5 ? 2.5 : 1.2)
        const radius = coreRadius + rFrac * (maxRadius - coreRadius)
        const angle =
          (arm * (Math.PI * 2)) / arms + rFrac * armTwist + (Math.random() - 0.5) * armSpread

        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 20
        const y = (Math.random() - 0.5) * Math.max(12, 120 * Math.exp(-radius / 220))
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 20

        const size = Math.min(22, Math.max(5.5, 5.5 + Math.sqrt(degree) * 2.2))

        return {
          index: idx,
          slug: entry.slug,
          title: entry.title,
          filePath: entry.filePath,
          domain,
          domainColor: color,
          links: entry.links ?? [],
          degree,
          x,
          y,
          z,
          size,
        }
      })

      // Points Buffer Geometry
      const geometry = new THREE.BufferGeometry()
      nodePositions = new Float32Array(count * 3)
      defaultNodeColors = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      nodes.forEach((node, i) => {
        nodePositions![i * 3] = node.x
        nodePositions![i * 3 + 1] = node.y
        nodePositions![i * 3 + 2] = node.z

        defaultNodeColors![i * 3] = node.domainColor.r
        defaultNodeColors![i * 3 + 1] = node.domainColor.g
        defaultNodeColors![i * 3 + 2] = node.domainColor.b

        sizes[i] = node.size
      })

      geometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3))
      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(defaultNodeColors), 3),
      )
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const pointsMaterial = new THREE.PointsMaterial({
        size: 14,
        vertexColors: true,
        map: glowTexture,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      })

      pointsMesh = new THREE.Points(geometry, pointsMaterial)
      scene.add(pointsMesh)

      // Filament Links (LineSegments)
      const linkPositions: number[] = []
      const linkColors: number[] = []

      nodes.forEach((sourceNode) => {
        if (!sourceNode.links) return
        for (const targetSlug of sourceNode.links) {
          const targetIdx = slugToIndex.get(targetSlug)
          if (targetIdx !== undefined && targetIdx !== sourceNode.index) {
            const targetNode = nodes[targetIdx]
            linkPositions.push(sourceNode.x, sourceNode.y, sourceNode.z)
            linkPositions.push(targetNode.x, targetNode.y, targetNode.z)

            // Desaturated filament color
            const lr = (sourceNode.domainColor.r + targetNode.domainColor.r) * 0.5 * 0.4
            const lg = (sourceNode.domainColor.g + targetNode.domainColor.g) * 0.5 * 0.4
            const lb = (sourceNode.domainColor.b + targetNode.domainColor.b) * 0.5 * 0.4
            linkColors.push(lr, lg, lb, lr, lg, lb)
          }
        }
      })

      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3))
      lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(linkColors, 3))

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
      scene.add(linesMesh)

      // Update HUD count
      const countEl = document.getElementById("galaxy-count-text")
      if (countEl) countEl.innerText = `${count.toLocaleString()} Stars`

      // Hide loading veil with smooth fade
      if (loadingVeil) {
        loadingVeil.classList.add("hidden")
      }
    })
    .catch((err) => {
      console.error("Failed to load galaxy data:", err)
      if (loadingVeil) loadingVeil.classList.add("hidden")
    })

  // Raycasting for Hover & Click
  const raycaster = new THREE.Raycaster()
  raycaster.params.Points = { threshold: 7.5 }
  const mouse = new THREE.Vector2(-999, -999)

  function showTooltip(node: GalaxyNode, clientX: number, clientY: number) {
    if (!tooltip) return
    const domainBadge = tooltip.querySelector(".card-domain-badge") as HTMLElement
    const titleEl = tooltip.querySelector(".card-title") as HTMLElement
    const linksEl = tooltip.querySelector(".card-links-count") as HTMLElement

    if (domainBadge) {
      domainBadge.innerText = node.domain.replace(/^\d+_/, "").replace(/_/g, " ")
      domainBadge.style.color = `#${node.domainColor.getHexString()}`
      domainBadge.style.background = `rgba(${node.domainColor.r * 255}, ${node.domainColor.g * 255}, ${node.domainColor.b * 255}, 0.15)`
    }
    if (titleEl) titleEl.innerText = node.title
    if (linksEl) linksEl.innerText = `${node.degree} Connected Notes`

    tooltip.style.left = `${clientX}px`
    tooltip.style.top = `${clientY}px`
    tooltip.classList.add("visible")
  }

  function hideTooltip() {
    if (tooltip) tooltip.classList.remove("visible")
  }

  function navigateToNode(slug: string) {
    const targetUrl = `./${slug}`
    // @ts-ignore
    if (typeof window.spaNavigate === "function") {
      try {
        // @ts-ignore
        window.spaNavigate(new URL(targetUrl, window.location.toString()))
        return
      } catch (e) {}
    }
    window.location.href = targetUrl
  }

  function onPointerMove(e: MouseEvent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    if (tooltip && hoveredIndex !== null) {
      tooltip.style.left = `${e.clientX}px`
      tooltip.style.top = `${e.clientY}px`
    }
  }

  function onClick(e: MouseEvent) {
    // Also raycast on click so touch taps work immediately
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    if (pointsMesh && nodes.length > 0) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(pointsMesh)
      if (intersects.length > 0) {
        const hitIdx = intersects[0].index
        if (hitIdx !== undefined && hitIdx < nodes.length) {
          const target = nodes[hitIdx]
          navigateToNode(target.slug)
          return
        }
      }
    }

    if (hoveredIndex !== null && nodes[hoveredIndex]) {
      const target = nodes[hoveredIndex]
      navigateToNode(target.slug)
    }
  }

  window.addEventListener("pointermove", onPointerMove)
  canvas.addEventListener("click", onClick)

  if (tooltip) {
    tooltip.addEventListener("click", () => {
      if (hoveredIndex !== null && nodes[hoveredIndex]) {
        navigateToNode(nodes[hoveredIndex].slug)
      }
    })
  }

  // Domain Filter Buttons
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(".domain-pill")
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const domain = btn.dataset.domain ?? null
      selectedDomain = domain === "all" ? null : domain
      applyDomainFilter()
    })
  })

  function applyDomainFilter() {
    if (!pointsMesh || !defaultNodeColors || !nodePositions) return
    const colors = pointsMesh.geometry.attributes.color.array as Float32Array

    nodes.forEach((node, i) => {
      const isMatch = !selectedDomain || node.domain === selectedDomain
      const factor = isMatch ? 1 : 0.08
      colors[i * 3] = defaultNodeColors![i * 3] * factor
      colors[i * 3 + 1] = defaultNodeColors![i * 3 + 1] * factor
      colors[i * 3 + 2] = defaultNodeColors![i * 3 + 2] * factor
    })
    pointsMesh.geometry.attributes.color.needsUpdate = true

    if (linesMesh) {
      ;(linesMesh.material as THREE.LineBasicMaterial).opacity = selectedDomain ? 0.06 : 0.18
    }

    // Camera fly to selected domain arm
    if (selectedDomain && DOMAIN_CONFIG[selectedDomain]) {
      const armIdx = DOMAIN_CONFIG[selectedDomain].armIndex
      const angle = (armIdx * (Math.PI * 2)) / 5 + 1.2
      const targetX = Math.cos(angle) * 320
      const targetZ = Math.sin(angle) * 320
      flyCameraTo(targetX, 120, targetZ, 0, 0, 0)
    }
  }

  // Action Buttons
  const orbitBtn = document.getElementById("btn-toggle-orbit")
  if (orbitBtn) {
    orbitBtn.addEventListener("click", () => {
      controls.autoRotate = !controls.autoRotate
      orbitBtn.classList.toggle("active", controls.autoRotate)
    })
  }

  const resetBtn = document.getElementById("btn-reset-view")
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      flyCameraTo(0, 320, 650, 0, 0, 0)
      controls.autoRotate = true
      if (orbitBtn) orbitBtn.classList.add("active")
    })
  }

  const wanderBtn = document.getElementById("btn-wander")
  if (wanderBtn) {
    wanderBtn.addEventListener("click", () => {
      if (nodes.length === 0) return
      const randomIdx = Math.floor(Math.random() * nodes.length)
      const target = nodes[randomIdx]
      flyCameraTo(target.x * 1.3, target.y + 40, target.z * 1.3, target.x, target.y, target.z)
    })
  }

  // Search HUD Control
  const searchTrigger = document.getElementById("galaxy-search-trigger")
  if (searchTrigger) {
    searchTrigger.addEventListener("click", () => {
      const searchBtn = document.querySelector(".search-button") as HTMLElement | null
      if (searchBtn) {
        searchBtn.click()
      }
    })
  }

  // Smooth camera flight
  let isFlying = false
  let flyProgress = 0
  const flyStartPos = new THREE.Vector3()
  const flyTargetPos = new THREE.Vector3()
  const flyStartLook = new THREE.Vector3()
  const flyTargetLook = new THREE.Vector3()

  function flyCameraTo(cx: number, cy: number, cz: number, tx: number, ty: number, tz: number) {
    isFlying = true
    flyProgress = 0
    flyStartPos.copy(camera.position)
    flyTargetPos.set(cx, cy, cz)
    flyStartLook.copy(controls.target)
    flyTargetLook.set(tx, ty, tz)
  }

  // Animation Loop
  let animationFrameId: number
  const clock = new THREE.Clock()

  function animate() {
    animationFrameId = requestAnimationFrame(animate)

    const delta = clock.getDelta()

    // Smooth camera glide
    if (isFlying) {
      flyProgress += delta * 1.5
      if (flyProgress >= 1) {
        flyProgress = 1
        isFlying = false
      }
      const ease = 0.5 - Math.cos(flyProgress * Math.PI) / 2
      camera.position.lerpVectors(flyStartPos, flyTargetPos, ease)
      controls.target.lerpVectors(flyStartLook, flyTargetLook, ease)
    }

    controls.update()

    // Gentle starfield drift
    starfield.rotation.y += 0.0001
    starfield.rotation.x += 0.00005

    // Raycast check
    if (pointsMesh && nodes.length > 0 && !isFlying) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(pointsMesh)

      if (intersects.length > 0) {
        const hitIdx = intersects[0].index
        if (hitIdx !== undefined && hitIdx < nodes.length) {
          hoveredIndex = hitIdx
          const node = nodes[hitIdx]
          canvas!.style.cursor = "pointer"
          showTooltip(
            node,
            (mouse.x + 1) * 0.5 * window.innerWidth,
            (-mouse.y + 1) * 0.5 * window.innerHeight,
          )
        }
      } else {
        if (hoveredIndex !== null) {
          hoveredIndex = null
          canvas!.style.cursor = "grab"
          hideTooltip()
        }
      }
    }

    renderer.render(scene, camera)
  }

  animate()

  // Resize Handler
  function onResize() {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener("resize", onResize)

  // Cleanup handler for SPA navigation
  activeCleanup = () => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener("pointermove", onPointerMove)
    canvas.removeEventListener("click", onClick)
    window.removeEventListener("resize", onResize)
    controls.dispose()
    renderer.dispose()
  }

  // @ts-ignore
  if (typeof window.addCleanup === "function") {
    // @ts-ignore
    window.addCleanup(() => {
      if (activeCleanup) {
        activeCleanup()
        activeCleanup = null
      }
    })
  }
}

// Attach to DOM load & Quartz SPA nav events
if (typeof document !== "undefined") {
  document.addEventListener("nav", () => {
    const isIndex = document.body.dataset.slug === "index"
    if (isIndex) {
      initGalaxy()
    } else if (activeCleanup) {
      activeCleanup()
      activeCleanup = null
    }
  })

  // Run on initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.body.dataset.slug === "index") initGalaxy()
    })
  } else {
    if (document.body.dataset.slug === "index") initGalaxy()
  }
}

export default initGalaxy
