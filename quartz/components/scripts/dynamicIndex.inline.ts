function setupDynamicIndex() {
  const container = document.querySelector(".dynamic-explorer")
  if (!container) return

  const tabButtons = container.querySelectorAll<HTMLButtonElement>(".explorer-tab-btn")
  const panels = container.querySelectorAll<HTMLElement>(".explorer-panel")
  const searchInput = container.querySelector<HTMLInputElement>("#index-note-search")
  const noteLinks = container.querySelectorAll<HTMLAnchorElement>(".explorer-note-link")

  // Tab switching
  tabButtons.forEach((btn) => {
    const clickHandler = () => {
      const targetTab = btn.getAttribute("data-tab")
      tabButtons.forEach((b) => b.classList.toggle("active", b === btn))
      panels.forEach((p) => {
        const isTarget = p.getAttribute("data-panel") === targetTab
        p.classList.toggle("active", isTarget)
      })
    }
    btn.addEventListener("click", clickHandler)
    window.addCleanup(() => btn.removeEventListener("click", clickHandler))
  })

  // Quick note search
  if (searchInput) {
    const inputHandler = () => {
      const query = searchInput.value.trim().toLowerCase()
      noteLinks.forEach((link) => {
        const title = link.getAttribute("data-title")?.toLowerCase() || ""
        const tags = link.getAttribute("data-tags")?.toLowerCase() || ""
        const match = title.includes(query) || tags.includes(query)
        link.style.display = match ? "flex" : "none"
      })
    }
    searchInput.addEventListener("input", inputHandler)
    window.addCleanup(() => searchInput.removeEventListener("input", inputHandler))
  }
}

document.addEventListener("nav", () => {
  setupDynamicIndex()
})
