import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import galaxyViewScript from "./scripts/galaxyView.inline"

export default (() => {
  const GalaxyView: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    // Only render full galaxy viewport on main index page
    if (fileData.slug !== "index") {
      return null
    }

    return (
      <div id="galaxy-container" class="galaxy-viewport">
        <canvas id="galaxy-canvas"></canvas>

        {/* Loading Veil */}
        <div id="galaxy-loading-veil" class="galaxy-loading-veil">
          <div class="galaxy-spinner"></div>
          <div class="loading-text">지식 은하(Galaxy View) 생성 중...</div>
          <div class="loading-subtext">
            2,600+ 지식 노드와 성간 링크를 3D 공간에 정렬하고 있습니다
          </div>
        </div>

        {/* Elegant Focus Ring & Dissolve Transition Overlay */}
        <div id="galaxy-focus-overlay" class="galaxy-focus-overlay" aria-hidden="true">
          <svg class="focus-ring-svg" viewBox="0 0 100 100">
            <circle class="focus-ring-circle" cx="50" cy="50" r="46" />
          </svg>
          <div class="focus-dissolve-veil"></div>
        </div>

        {/* Top Minimal HUD */}
        <header class="galaxy-top-hud">
          <div class="galaxy-brand">
            <a href="./" class="galaxy-logo-title">
              <span>Supreme Note</span>
            </a>
            <div class="galaxy-stats-badge">
              <span class="pulse-dot"></span>
              <span id="galaxy-count-text">2,628 Stars</span>
            </div>
          </div>

          <div class="galaxy-top-controls">
            <button
              class="galaxy-hud-btn"
              id="galaxy-search-trigger"
              aria-label="지식 검색"
              title="지식 검색 (Ctrl+K)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>
                Search{" "}
                <kbd style="font-size: 0.72rem; opacity: 0.7; border: 1px solid rgba(255,255,255,0.2); padding: 0.1rem 0.3rem; border-radius: 4px;">
                  Ctrl+K
                </kbd>
              </span>
            </button>
          </div>
        </header>

        {/* Bottom Floating Navigation Dock */}
        <nav class="galaxy-bottom-dock">
          {/* Domain Category Filter Pills */}
          <div class="galaxy-domain-filters">
            <button class="domain-pill active" data-domain="all">
              <span class="pill-dot" style="color: #ffffff;"></span>
              <span>전체 은하</span>
            </button>
            <button class="domain-pill" data-domain="01_IT Tech">
              <span class="pill-dot" style="color: #38bdf8;"></span>
              <span>IT & Tech</span>
            </button>
            <button class="domain-pill" data-domain="02_Economics">
              <span class="pill-dot" style="color: #fbbf24;"></span>
              <span>경제 · 금융</span>
            </button>
            <button class="domain-pill" data-domain="03_Management">
              <span class="pill-dot" style="color: #34d399;"></span>
              <span>경영 · 전략</span>
            </button>
            <button class="domain-pill" data-domain="04_Design">
              <span class="pill-dot" style="color: #f472b6;"></span>
              <span>디자인 · UI</span>
            </button>
            <button class="domain-pill" data-domain="05_Humanities">
              <span class="pill-dot" style="color: #a78bfa;"></span>
              <span>인문 · 철학</span>
            </button>
          </div>

          {/* Action Tools */}
          <div class="galaxy-action-bar">
            <button id="btn-wander" class="action-pill-btn" title="랜덤 지식 노드로 날아가기">
              <span>Wander 탐험</span>
            </button>
            <button
              id="btn-toggle-orbit"
              class="action-pill-btn active"
              title="은하 자동 자전 토글"
            >
              <span>자동 회전</span>
            </button>
            <button id="btn-reset-view" class="action-pill-btn" title="기본 카메라 시점으로 복귀">
              <span>은하 중심</span>
            </button>
          </div>
        </nav>

        {/* Floating Node Card on Hover */}
        <div id="galaxy-node-card" class="galaxy-node-card">
          <div class="card-domain-badge">Domain</div>
          <div class="card-title">Note Title</div>
          <div class="card-meta-row">
            <span class="card-links-count">0 Links</span>
            <span class="warp-cta">노드 열기 →</span>
          </div>
        </div>
      </div>
    )
  }

  GalaxyView.afterDOMLoaded = galaxyViewScript as unknown as string

  return GalaxyView
}) satisfies QuartzComponentConstructor
