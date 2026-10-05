import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date as DateComponent, getDate } from "./Date"
import style from "./styles/dynamicIndex.scss"
// @ts-ignore
import script from "./scripts/dynamicIndex.inline"

interface CategoryMeta {
  id: string
  name: string
  icon: string
  description: string
  hubSlug: string
  cssClass: string
  featuredTags: string[]
}

const KNOWN_CATEGORIES: Record<string, CategoryMeta> = {
  "02_IT_Tech": {
    id: "02_IT_Tech",
    name: "02. IT & 테크 (10대 도메인)",
    icon: "💻",
    description:
      "정보관리 및 컴퓨터시스템응용기술사 표준 10대 지식 체계 (인공지능, 보안, SW공학, 네트워크 등)",
    hubSlug: "02_IT_Tech/00_02_IT_Tech_MOC",
    cssClass: "cat-tech",
    featuredTags: ["인공지능", "보안", "소프트웨어공학", "네트워크", "데이터베이스"],
  },
  "01_UX_Design": {
    id: "01_UX_Design",
    name: "01. UX & UI 디자인",
    icon: "🎨",
    description: "UX/UI 설계 방법론, 사용자 리서치, 서비스 기획, 프로덕트 디자인 심리학, AARRR",
    hubSlug: "01_UX_Design",
    cssClass: "cat-ux",
    featuredTags: ["UX", "디자인", "기획", "마케팅", "브랜드"],
  },
  "05_Humanities": {
    id: "05_Humanities",
    name: "05. 인문학 & 철학",
    icon: "📖",
    description: "동서양 철학, 사피엔스, 역사, 심리학, 자기관리론, 인문 고전 및 독서 기록",
    hubSlug: "05_Humanities",
    cssClass: "cat-phil",
    featuredTags: ["독서", "인문학", "철학", "인사이트", "자기개발"],
  },
  "06_Economics": {
    id: "06_Economics",
    name: "06. 경제 & 금융",
    icon: "📈",
    description: "가치투자, 거시경제 분석, 재테크, 주식 시장 메커니즘, 행동경제학",
    hubSlug: "06_Economics",
    cssClass: "cat-econ",
    featuredTags: ["경제", "금융", "투자", "재테크", "주식"],
  },
  "00_Meta": {
    id: "00_Meta",
    name: "00. 메타 & 색인",
    icon: "📑",
    description: "제텔카스텐 지식 관리 체계, 분류 인덱스, 템플릿",
    hubSlug: "00_Meta",
    cssClass: "cat-meta",
    featuredTags: ["메타", "템플릿"],
  },
}

const IT_DOMAINS = [
  {
    name: "인공지능",
    icon: "🤖",
    moc: "02_IT_Tech/00_인공지능_MOC",
    desc: "수학·통계, 머신러닝, 딥러닝, LLM/RAG, Vision, XAI",
  },
  {
    name: "보안",
    icon: "🛡️",
    moc: "02_IT_Tech/00_보안_MOC",
    desc: "암호학, 네트워크/시스템 보안, 웹 취약점, 침해대응",
  },
  {
    name: "소프트웨어공학",
    icon: "🏗️",
    moc: "02_IT_Tech/00_소프트웨어공학_MOC",
    desc: "SDLC, 애자일/DevOps, MSA/DDD 아키텍처, 테스팅",
  },
  {
    name: "네트워크",
    icon: "🌐",
    moc: "02_IT_Tech/00_네트워크_MOC",
    desc: "OSI 7계층, IP 라우팅, 전송제어(QoS), 5G/6G, SDN",
  },
  {
    name: "데이터베이스",
    icon: "🗄️",
    moc: "02_IT_Tech/00_데이터베이스_MOC",
    desc: "데이터 모델링, 트랜잭션, 분산 DB/NoSQL, SQL 튜닝",
  },
  {
    name: "컴퓨터구조",
    icon: "💻",
    moc: "02_IT_Tech/00_컴퓨터구조_MOC",
    desc: "CPU 아키텍처, 캐시·메모리, AI 가속기(GPU/NPU), 알고리즘",
  },
  {
    name: "경영전략",
    icon: "📈",
    moc: "02_IT_Tech/00_경영전략_MOC",
    desc: "전략 프레임워크(3C/SWOT), IT 거버넌스, DX/BPR, ERP",
  },
  {
    name: "운영체제",
    icon: "⚙️",
    moc: "02_IT_Tech/00_운영체제_MOC",
    desc: "프로세스·스레드, CPU 스케줄링, 동기화, 가상 메모리",
  },
  {
    name: "프로젝트관리",
    icon: "📋",
    moc: "02_IT_Tech/00_프로젝트관리_MOC",
    desc: "PMBOK 7판, WBS/CPM 일정, FP/EVM 원가, 감리",
  },
  {
    name: "디지털서비스",
    icon: "🚀",
    moc: "02_IT_Tech/00_디지털서비스_MOC",
    desc: "클라우드(IaaS/PaaS/SaaS), 블록체인/Web3, IoT, API",
  },
]

export default (() => {
  const DynamicIndex: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, cfg } = props
    const currentSlug = fileData.slug! as FullSlug

    // Filter valid notes (exclude index itself, tag pages, and 404)
    const contentNotes = allFiles.filter(
      (f) => f.slug && f.slug !== "index" && !f.slug.startsWith("tags/") && f.slug !== "404",
    )

    const totalNotes = contentNotes.length

    // Discover all top-level folders
    const folderMap = new Map<string, QuartzPluginData[]>()
    const tagMap = new Map<string, number>()

    for (const note of contentNotes) {
      const parts = note.slug!.split("/")
      const folder = parts.length > 1 ? parts[0] : "기타"
      if (!folderMap.has(folder)) {
        folderMap.set(folder, [])
      }
      folderMap.get(folder)!.push(note)

      const tags = note.frontmatter?.tags ?? []
      for (const t of tags) {
        tagMap.set(t, (tagMap.get(t) ?? 0) + 1)
      }
    }

    const totalTags = tagMap.size

    // Build categories data
    const categories = Array.from(folderMap.keys()).map((folderId) => {
      const notes = folderMap.get(folderId)!
      const known = KNOWN_CATEGORIES[folderId]
      if (known) {
        return {
          id: folderId,
          name: known.name,
          icon: known.icon,
          description: known.description,
          count: notes.length,
          link: resolveRelative(currentSlug, known.hubSlug as FullSlug),
          cssClass: known.cssClass,
          featuredTags: known.featuredTags,
          notes,
        }
      } else {
        return {
          id: folderId,
          name: folderId.replace(/^0\d_/, "").replace(/_/g, " "),
          icon: "📁",
          description: `${folderId} 카테고리에 속한 지식 노트 모음입니다.`,
          count: notes.length,
          link: resolveRelative(currentSlug, folderId as SimpleSlug),
          cssClass: "cat-meta",
          featuredTags: [],
          notes,
        }
      }
    })

    // Sort categories: 02_IT_Tech first, then 01_UX_Design, 05_Humanities, 06_Economics, 00_Meta
    const categoryOrder = ["02_IT_Tech", "01_UX_Design", "05_Humanities", "06_Economics", "00_Meta"]
    categories.sort((a, b) => {
      const idxA = categoryOrder.indexOf(a.id)
      const idxB = categoryOrder.indexOf(b.id)
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return a.name.localeCompare(b.name)
    })

    // Build IT 10 domains data
    const itNotes = folderMap.get("02_IT_Tech") ?? []
    const itTotalCount = itNotes.length || 1
    const domainsData = IT_DOMAINS.map((domain) => {
      const matchingNotes = itNotes.filter((n) => (n.frontmatter?.tags ?? []).includes(domain.name))
      const count = matchingNotes.length
      const percent = Math.min(100, Math.round((count / itTotalCount) * 100))
      return {
        ...domain,
        count,
        percent,
        link: resolveRelative(currentSlug, domain.moc as FullSlug),
      }
    })

    // Recent Notes (latest 8)
    const recentNotes = [...contentNotes]
      .sort((a, b) => {
        const dateA = getDate(cfg, a)?.getTime() ?? 0
        const dateB = getDate(cfg, b)?.getTime() ?? 0
        return dateB - dateA
      })
      .slice(0, 8)

    // Top 24 Tags
    const topTags = Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)

    return (
      <div class="dynamic-index">
        {/* Dynamic Stats Bar */}
        <div class="dynamic-stats-bar">
          <div class="stat-item">
            <span class="stat-number">{totalNotes.toLocaleString()}</span>
            <span class="stat-label">Notes</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{categories.length}</span>
            <span class="stat-label">Categories</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{IT_DOMAINS.length}</span>
            <span class="stat-label">IT Domains</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{totalTags}</span>
            <span class="stat-label">Tags</span>
          </div>
        </div>

        {/* Major Categories Grid */}
        <div class="section-header">
          <h2>📚 지식 도메인 분류</h2>
          <p class="section-desc">디지털 가든의 {categories.length}대 핵심 카테고리 실시간 현황</p>
        </div>

        <div class="dynamic-category-grid">
          {categories.map((cat) => (
            <a href={cat.link} class={`dynamic-cat-card ${cat.cssClass}`}>
              <div class="card-top">
                <span class="card-icon">{cat.icon}</span>
                <span class="card-badge">{cat.count.toLocaleString()} Notes</span>
              </div>
              <h3 class="card-title">{cat.name}</h3>
              <p class="card-desc">{cat.description}</p>
              {cat.featuredTags.length > 0 && (
                <div class="card-subtopics">
                  {cat.featuredTags.map((t) => (
                    <span class="subtopic-tag">#{t}</span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        {/* 10 IT Knowledge Domains Detailed Hub */}
        <div class="section-header">
          <h2>🌐 IT & 테크 10대 지식 도메인</h2>
          <p class="section-desc">
            정보관리 및 컴퓨터시스템응용기술사 표준 지식 체계 (총 {itTotalCount.toLocaleString()}개
            노트)
          </p>
        </div>

        <div class="domains-matrix">
          {domainsData.map((d) => (
            <a href={d.link} class="domain-tile">
              <div class="tile-header">
                <span class="tile-title">
                  <span>{d.icon}</span> {d.name}
                </span>
                <span class="tile-count">{d.count}개</span>
              </div>
              <div class="tile-bar-container">
                <div class="tile-bar-fill" style={{ width: `${Math.max(d.percent, 4)}%` }} />
              </div>
              <p class="tile-topics">{d.desc}</p>
            </a>
          ))}
        </div>

        {/* Interactive Explorer Section */}
        <div class="section-header">
          <h2>🔍 하위 내용 동적 탐색기</h2>
          <p class="section-desc">카테고리별 주요 태그와 핵심 노트를 바로 확인하세요</p>
        </div>

        <div class="dynamic-explorer">
          <div class="explorer-controls">
            <div class="explorer-tabs">
              <button class="explorer-tab-btn active" data-tab="all">
                🌟 전체 둘러보기
              </button>
              {categories.map((cat) => (
                <button class="explorer-tab-btn" data-tab={cat.id}>
                  {cat.icon} {cat.name.replace(/^\d+_/, "")}
                </button>
              ))}
            </div>
            <div class="explorer-search-box">
              <input
                type="text"
                id="index-note-search"
                placeholder="노트 제목 또는 키워드 필터..."
                aria-label="노트 필터"
              />
            </div>
          </div>

          {/* Panel: All */}
          <div class="explorer-panel active" data-panel="all">
            <h4 style={{ margin: "1rem 0 0.5rem 0", fontSize: "0.95rem", color: "var(--dark)" }}>
              🏷️ 인기 태그 클라우드 (Top 24)
            </h4>
            <div class="explorer-tag-cloud">
              {topTags.map(([tag, count]) => (
                <a
                  href={resolveRelative(currentSlug, `tags/${tag}` as FullSlug)}
                  class="explorer-tag-item"
                >
                  <span>#{tag}</span>
                  <span class="tag-count">({count})</span>
                </a>
              ))}
            </div>

            <h4 style={{ margin: "1.5rem 0 0.5rem 0", fontSize: "0.95rem", color: "var(--dark)" }}>
              ⭐ 대표 허브 & 추천 노트
            </h4>
            <div class="explorer-notes-grid">
              <a
                href={resolveRelative(currentSlug, "02_IT_Tech/00_02_IT_Tech_MOC" as FullSlug)}
                class="explorer-note-link"
                data-title="IT & 테크 10대 도메인 마스터 맵"
                data-tags="IT,MOC"
              >
                <span>🌐 IT & 테크 마스터 MOC</span>
                <span class="note-badge">1,139개</span>
              </a>
              <a
                href={resolveRelative(currentSlug, "01_UX_Design/AARRR" as FullSlug)}
                class="explorer-note-link"
                data-title="AARRR 그로스 해킹 프레임워크"
                data-tags="UX,마케팅,비즈니스"
              >
                <span>🎯 AARRR 프레임워크</span>
                <span class="note-badge">UX/기획</span>
              </a>
              <a
                href={resolveRelative(currentSlug, "05_Humanities/제텔카스텐" as FullSlug)}
                class="explorer-note-link"
                data-title="제텔카스텐 지식 관리 원칙"
                data-tags="제텔카스텐,독서,인문학"
              >
                <span>🧠 제텔카스텐 지식 관리</span>
                <span class="note-badge">메타/학습</span>
              </a>
              <a
                href={resolveRelative(currentSlug, "05_Humanities/사피엔스" as FullSlug)}
                class="explorer-note-link"
                data-title="사피엔스 유발 하라리"
                data-tags="인문학,역사,독서"
              >
                <span>📖 사피엔스 요약</span>
                <span class="note-badge">인문학</span>
              </a>
              <a
                href={resolveRelative(currentSlug, "06_Economics/가치투자" as FullSlug)}
                class="explorer-note-link"
                data-title="가치투자 벤저민 그레이엄 워런 버핏"
                data-tags="경제,투자,금융"
              >
                <span>📈 가치투자 원칙</span>
                <span class="note-badge">경제/금융</span>
              </a>
              <a
                href={resolveRelative(currentSlug, "05_Humanities/인간관계론" as FullSlug)}
                class="explorer-note-link"
                data-title="데일 카네기 인간관계론"
                data-tags="인간관계,자기개발"
              >
                <span>🤝 인간관계론</span>
                <span class="note-badge">인사이트</span>
              </a>
            </div>
          </div>

          {/* Panels for each category */}
          {categories.map((cat) => {
            // Find top tags for this category
            const catTagMap = new Map<string, number>()
            for (const note of cat.notes) {
              for (const t of note.frontmatter?.tags ?? []) {
                catTagMap.set(t, (catTagMap.get(t) ?? 0) + 1)
              }
            }
            const catTopTags = Array.from(catTagMap.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 12)

            // Select sample notes (up to 12)
            const sampleNotes = cat.notes.slice(0, 12)

            return (
              <div class="explorer-panel" data-panel={cat.id}>
                <h4
                  style={{ margin: "1rem 0 0.5rem 0", fontSize: "0.95rem", color: "var(--dark)" }}
                >
                  🏷️ {cat.name} 소속 주요 태그
                </h4>
                <div class="explorer-tag-cloud">
                  {catTopTags.map(([tag, count]) => (
                    <a
                      href={resolveRelative(currentSlug, `tags/${tag}` as FullSlug)}
                      class="explorer-tag-item"
                    >
                      <span>#{tag}</span>
                      <span class="tag-count">({count})</span>
                    </a>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "1.5rem 0 0.5rem 0",
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--dark)" }}>
                    📑 주요 노트 목록 (총 {cat.count}개 중 일부)
                  </h4>
                  <a href={cat.link} style={{ fontSize: "0.82rem", color: "var(--secondary)" }}>
                    전체 {cat.count}개 노트 탐색하기 →
                  </a>
                </div>

                <div class="explorer-notes-grid">
                  {sampleNotes.map((note) => {
                    const title = note.frontmatter?.title ?? note.slug!.split("/").pop() ?? ""
                    const tags = note.frontmatter?.tags ?? []
                    const primaryTag = tags[0] ?? ""
                    return (
                      <a
                        href={resolveRelative(currentSlug, note.slug! as FullSlug)}
                        class="explorer-note-link"
                        data-title={title}
                        data-tags={tags.join(",")}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {title}
                        </span>
                        {primaryTag && <span class="note-badge">#{primaryTag}</span>}
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Updates Grid */}
        <div class="section-header">
          <h2>🕒 최근 업데이트된 지식 노트</h2>
          <p class="section-desc">가장 최근에 수정되거나 새로 작성된 지식 노트입니다</p>
        </div>

        <div class="recent-updates-grid">
          {recentNotes.map((note) => {
            const title = note.frontmatter?.title ?? note.slug!.split("/").pop() ?? ""
            const folder = note.slug!.split("/")[0]
            const catName = KNOWN_CATEGORIES[folder]?.name.replace(/^\d+_/, "") ?? folder
            const noteDate = getDate(cfg, note)

            return (
              <a
                href={resolveRelative(currentSlug, note.slug! as FullSlug)}
                class="recent-update-card"
              >
                <div class="update-meta">
                  <span class="update-cat">{catName}</span>
                  {noteDate && (
                    <span class="update-date">
                      <DateComponent date={noteDate} locale={cfg.locale} />
                    </span>
                  )}
                </div>
                <h4 class="update-title">{title}</h4>
              </a>
            )
          })}
        </div>

        {/* Quick Nav Pills */}
        <div class="section-header">
          <h2>⚡ 빠른 탐색 바로가기</h2>
        </div>

        <div class="quick-nav-pills">
          <a
            href={resolveRelative(currentSlug, "02_IT_Tech/00_02_IT_Tech_MOC" as FullSlug)}
            class="quick-nav-pill"
          >
            🌐 IT & 테크 10대 도메인 마스터 맵
          </a>
          <a
            href={resolveRelative(currentSlug, "05_Humanities/제텔카스텐" as FullSlug)}
            class="quick-nav-pill"
          >
            🧠 제텔카스텐 지식 관리 원칙
          </a>
          <a
            href={resolveRelative(currentSlug, "05_Humanities/사피엔스" as FullSlug)}
            class="quick-nav-pill"
          >
            📚 인문학 핵심: 사피엔스
          </a>
          <a
            href={resolveRelative(currentSlug, "06_Economics/가치투자" as FullSlug)}
            class="quick-nav-pill"
          >
            📈 경제 & 금융 핵심: 가치투자
          </a>
          <a
            href={resolveRelative(currentSlug, "01_UX_Design/AARRR" as FullSlug)}
            class="quick-nav-pill"
          >
            🎯 UX & 비즈니스: AARRR
          </a>
        </div>
      </div>
    )
  }

  DynamicIndex.css = style
  DynamicIndex.afterDOMLoaded = script

  return DynamicIndex
}) satisfies QuartzComponentConstructor
