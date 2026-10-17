---
title: 2PL (Two-Phase Locking Protocol)
date: 2026-03-27
tags:
  - 데이터베이스
aliases:
  - 2단계 로킹
  - 2상 잠금 프로토콜
---
# 2PL (Two-Phase Locking Protocol)

---

## I. 직렬성을 보장하는 비관적 병행 제어, 2PL의 개요

### 가. 2PL의 정의

- 트랜잭션의 잠금(Lock)과 잠금 해제(Unlock)를 **확장 단계**와 **수축 단계**로 나누어, 한 번이라도 Unlock한 트랜잭션은 다시 Lock을 얻지 못하게 하는 [[병행 제어]] [[프로토콜]]
- 모든 트랜잭션이 2PL을 지키면 그 스케줄은 **충돌 직렬가능(Conflict Serializable)** 함이 보장됨

### 나. 2PL의 특징

| 구분 | 내용 |
| --- | --- |
| 장점 | 충돌 직렬성을 이론적으로 보장 → 데이터 일관성 확보 |
| 한계 ① | [[교착상태]](Deadlock) 발생 가능 → 별도 탐지·예방 기법 필요 |
| 한계 ② | 연쇄 복귀(Cascading Rollback) 가능 → Commit 전 Unlock한 데이터를 다른 트랜잭션이 읽은 경우 |

---

## II. 2PL의 동작 메커니즘 및 단계

### 가. 2PL 동작 개념도 (Lock Point 중심)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" width="100%" height="auto" style="max-width: 700px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <!-- 축 화살표 마커 정의 -->
    <marker id="axis-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
    </marker>
  </defs>

  <!-- 전체 배경 (다크모드 대응을 위한 명시적 밝은 배경) -->
  <rect width="700" height="420" fill="#FFFFFF" rx="10" stroke="#E5E7EB" stroke-width="1.5"/>

  <!-- ==========================================
       [1] 영역 배경 (확장 단계 / 수축 단계)
       ========================================== -->
  <!-- 확장 단계 (파란색 영역) -->
  <polygon points="140,360 350,120 350,360" fill="#EFF6FF" />
  <!-- 수축 단계 (노란/주황색 영역) -->
  <polygon points="350,120 560,360 350,360" fill="#FFFBEB" />

  <!-- ==========================================
       [2] 안내선 및 그래프 선
       ========================================== -->
  <!-- Max 수평 안내선 (점선) -->
  <line x1="80" y1="120" x2="350" y2="120" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="4 4" />
  <!-- Lock Point 수직 안내선 (점선) -->
  <line x1="350" y1="120" x2="350" y2="360" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="4 4" />

  <!-- 확장 단계 그래프 선 (두꺼운 파란선) -->
  <line x1="140" y1="360" x2="350" y2="120" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" />
  <!-- 수축 단계 그래프 선 (두꺼운 주황선) -->
  <line x1="350" y1="120" x2="560" y2="360" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />

  <!-- ==========================================
       [3] X축 / Y축
       ========================================== -->
  <!-- X축 (Time) -->
  <line x1="80" y1="360" x2="650" y2="360" stroke="#6B7280" stroke-width="2" marker-end="url(#axis-arrow)" />
  <!-- Y축 (Number of Locks) -->
  <line x1="80" y1="360" x2="80" y2="60" stroke="#6B7280" stroke-width="2" marker-end="url(#axis-arrow)" />

  <!-- ==========================================
       [4] 텍스트 및 라벨
       ========================================== -->
  <!-- Y축 라벨 -->
  <text x="80" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="middle">Number of Locks</text>
  <!-- X축 라벨 -->
  <text x="650" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="end">Time</text>
  
  <!-- Y축 'Max' 라벨 -->
  <text x="70" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="end">Max</text>

  <!-- X축 하단 구간 라벨 -->
  <text x="140" y="385" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="middle">Start</text>
  <text x="560" y="385" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="middle">End</text>
  <text x="350" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#6B7280" text-anchor="middle">(연산 수행)</text>

  <!-- 확장 단계 라벨 -->
  <text x="245" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold" fill="#1E40AF" text-anchor="middle">[확장 단계]</text>
  <text x="245" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#2563EB" text-anchor="middle">(Lock Only)</text>

  <!-- 수축 단계 라벨 -->
  <text x="455" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold" fill="#92400E" text-anchor="middle">[수축 단계]</text>
  <text x="455" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#D97706" text-anchor="middle">(Unlock Only)</text>

  <!-- ==========================================
       [5] Lock Point 마커 및 강조 라벨
       ========================================== -->
  <!-- Lock Point 빨간색 점 -->
  <circle cx="350" cy="120" r="5" fill="#EF4444" />
  
  <!-- Lock Point 라벨 박스 -->
  <rect x="230" y="70" width="240" height="30" rx="15" fill="#FEF2F2" stroke="#F87171" stroke-width="1.5" />
  <text x="350" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#991B1B" text-anchor="middle">Lock Point: 모든 Lock 획득 시점</text>

</svg>

- 시간에 따른 보유 Lock 수가 Lock Point에서 정점을 찍는 삼각형 형태
- Lock Point 왼쪽은 획득만, 오른쪽은 해제만 가능

### 나. 2PL의 단계별 수행 내용

| 단계 | 가능한 연산 | 제약 및 특징 |
| --- | --- | --- |
| 확장 단계<br>(Growing Phase) | Lock 획득 | 새 Lock(S-lock, X-lock)을 얻을 수 있으나 보유 Lock은 해제 불가 |
| Lock Point<br>(잠금점) | - | 필요한 Lock을 모두 획득한 시점, 확장 → 수축 단계의 경계 |
| 수축 단계<br>(Shrinking Phase) | Lock 해제 | 보유 Lock을 점진적으로 해제할 수 있으나 새 Lock 획득 불가 |

---

## III. 2PL의 한계 보완을 위한 변형 기법 및 동향

### 가. 2PL 변형 기법 비교

| 유형 | 핵심 원리 | 해결 문제 / 특징 |
| --- | --- | --- |
| Strict 2PL<br>(엄격한 2PL) | 모든 **X-lock**을 Commit/Abort 시점까지 유지 | **연쇄 복귀 방지**, 대부분의 상용 [[DBMS]]가 채택 |
| Rigorous 2PL<br>(강건한 2PL) | **S-lock·X-lock 모두**를 트랜잭션 종료 시점까지 유지 | 직렬화 순서 = Commit 순서, 구현 단순 / 동시성 저하 |
| Conservative 2PL<br>(보수적·정적 2PL) | 트랜잭션 시작 전에 필요한 Lock을 **한꺼번에 선점**(Pre-claiming) | **교착상태 예방** / 자원 활용도 낮음 |

### 나. 최신 동향

- **MVCC + 2PL 하이브리드**: 읽기는 MVCC로 비차단 처리하고, 쓰기 충돌만 Strict 2PL로 제어하여 [[Locking]] 오버헤드를 줄임
- **분산 DB(NewSQL)**: Google Spanner, [[CockroachDB]] 등은 노드 내 동시성은 Strict 2PL, 노드 간 원자성은 2PC(Two-Phase Commit)로 보장

### 다. 적용 시 고려사항

- 교착상태는 2PL만으로 막을 수 없으므로 [[Wait-Die와 Wound-Wait]] 같은 예방 기법이나 탐지(Wait-for Graph) 기법과 함께 사용
- 무결성과 동시성의 트레이드오프를 고려해 실무에서는 Strict 2PL + MVCC 조합이 일반적

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_데이터베이스_MOC|🗄️ 데이터베이스]]
- **세부 분류**: `2. 트랜잭션 & 동시성 제어 (Concurrency)`
- **핵심 연관 토픽**:
  - [[병행 제어|병행 제어 (Concurrency control)]]
  - [[트랜잭션]]
  - [[CockroachDB|CockroachDB(코크로치DB)]]
  - [[Locking]]
  - [[타임스탬프 순서 기법|Timestamp Ordering]]
