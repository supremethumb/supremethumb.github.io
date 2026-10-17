---
title: HBM (High Bandwidth Memory)
date: 2026-09-04
tags:
  - 컴퓨터구조
aliases:
  - High Bandwidth Memory
  - 고대역폭 메모리
---

# HBM (High Bandwidth Memory)

---

## I. 넓은 버스로 대역폭을 키운 적층 DRAM, HBM의 개요

### 가. 정의

- 여러 DRAM 다이를 **TSV로 수직 적층하고 실리콘 인터포저 위에서 GPU·NPU 옆에 배치해 1024비트 이상의 넓은 버스로 연결**한 고대역폭 메모리 (JEDEC 표준, 2013년 HBM1)

### 나. 특징

| 구분 | 내용 |
| --- | --- |
| 넓은 버스 | 스택당 1024비트(HBM4는 2048비트)로 낮은 핀 속도에서도 TB/s급 대역폭 |
| 짧은 배선 | 프로세서 바로 옆 배치, 비트당 전력 감소 |
| 고집적 | 수직 적층으로 실장 면적 절감, 스택당 수십 GB |
| 비용·발열 | TSV·적층 공정으로 고가, 적층 다이의 열 관리 어려움 |

---

## II. 구조 및 구성요소

### 가. 2.5D 패키징 구조

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 350" width="100%" height="auto" style="max-width: 620px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="arrow-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#4B5563" />
    </marker>
    <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
    </marker>
  </defs>
  <!-- 배경 카드 -->
  <rect width="620" height="350" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <!-- 상단 핵심 메시지 헤더 -->
  <rect x="160" y="12" width="300" height="26" rx="13" fill="#EEF2FF" stroke="#6366F1" stroke-width="1"/>
  <text x="310" y="29" font-family="system-ui, sans-serif" font-size="11.5" font-weight="bold" fill="#4338CA" text-anchor="middle">"DRAM 다층 수직 적층 및 Logic IC 수평 배치 (2.5D)"</text>
  <!-- 좌측 HBM 스택 그룹 -->
  <g id="hbm-stack">
    <!-- HBM 바운딩 박스 라벨 -->
    <text x="145" y="55" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1E40AF" text-anchor="middle">HBM</text>
    <!-- DRAM Core Die 2 -->
    <rect x="50" y="65" width="190" height="24" rx="4" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.2"/>
    <text x="145" y="81" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#1E3A8A" text-anchor="middle">DRAM Core Die</text>
    <!-- DRAM Core Die 1 -->
    <rect x="50" y="94" width="190" height="24" rx="4" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.2"/>
    <text x="145" y="110" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#1E3A8A" text-anchor="middle">DRAM Core Die</text>
    <!-- Base Die -->
    <rect x="50" y="123" width="190" height="24" rx="4" fill="#BFDBFE" stroke="#2563EB" stroke-width="1.5"/>
    <text x="145" y="139" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#1D4ED8" text-anchor="middle">Base Die (Logic/Control)</text>
    <!-- DRAM 내부 TSV 관통 비아 표시 -->
    <line x1="85" y1="65" x2="85" y2="123" stroke="#93C5FD" stroke-width="1.8" stroke-dasharray="2 2"/>
    <line x1="125" y1="65" x2="125" y2="123" stroke="#93C5FD" stroke-width="1.8" stroke-dasharray="2 2"/>
    <line x1="165" y1="65" x2="165" y2="123" stroke="#93C5FD" stroke-width="1.8" stroke-dasharray="2 2"/>
    <line x1="205" y1="65" x2="205" y2="123" stroke="#93C5FD" stroke-width="1.8" stroke-dasharray="2 2"/>
  </g>
  <!-- 우측 GPU/NPU (Logic IC) -->
  <rect x="300" y="65" width="260" height="82" rx="6" fill="#F3F4F6" stroke="#4B5563" stroke-width="1.5"/>
  <text x="430" y="103" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#111827" text-anchor="middle">GPU / NPU</text>
  <text x="430" y="122" font-family="system-ui, sans-serif" font-size="12" fill="#4B5563" text-anchor="middle">(Logic IC)</text>
  <!-- 수직 적층 화살표 및 설명 -->
  <path d="M 285,60 L 250,92" fill="none" stroke="#2563EB" stroke-width="1.2" marker-end="url(#arrow-blue)"/>
  <text x="350" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#2563EB">TSV / Bump 수직 적층</text>
  <!-- 마이크로 범프 (Micro-bumps) -->
  <g fill="#6B7280">
    <circle cx="65" cy="154" r="2.5"/><circle cx="85" cy="154" r="2.5"/><circle cx="105" cy="154" r="2.5"/>
    <circle cx="125" cy="154" r="2.5"/><circle cx="145" cy="154" r="2.5"/><circle cx="165" cy="154" r="2.5"/>
    <circle cx="185" cy="154" r="2.5"/><circle cx="205" cy="154" r="2.5"/><circle cx="225" cy="154" r="2.5"/>
    <circle cx="320" cy="154" r="2.5"/><circle cx="350" cy="154" r="2.5"/><circle cx="380" cy="154" r="2.5"/>
    <circle cx="410" cy="154" r="2.5"/><circle cx="440" cy="154" r="2.5"/><circle cx="470" cy="154" r="2.5"/>
    <circle cx="500" cy="154" r="2.5"/><circle cx="530" cy="154" r="2.5"/>
  </g>
  <!-- 실리콘 인터포저 -->
  <rect x="40" y="160" width="535" height="52" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="307" y="184" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#92400E" text-anchor="middle">실리콘 인터포저 (Silicon Interposer)</text>
  <text x="307" y="201" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#D97706" text-anchor="middle">(초고속 I/O 통로 · 초미세 배선)</text>
  <!-- 초고속 데이터 경로 표시선 -->
  <line x1="205" y1="168" x2="330" y2="168" stroke="#D97706" stroke-width="2" stroke-dasharray="3 3"/>
  <!-- 인터포저 하부 TSV / Solder Bump 연결 화살표 -->
  <line x1="307" y1="212" x2="307" y2="242" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="375" y="231" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#4B5563">TSV / Solder Bump</text>
  <!-- 메인 기판 (PCB) -->
  <rect x="40" y="250" width="535" height="46" rx="6" fill="#E5E7EB" stroke="#4B5563" stroke-width="1.5"/>
  <text x="307" y="278" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1F2937" text-anchor="middle">메인기판 (PCB Substrate)</text>
</svg>

- DRAM 코어 다이를 TSV로 쌓아 베이스 다이 위에 올리고, 실리콘 인터포저에서 [[GPU]]와 나란히 배치(2.5D)해 미세 배선으로 연결

### 나. 구성요소

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 적층 | TSV (Through Silicon Via) | 실리콘을 관통하는 전극으로 상하 다이를 직접 연결 |
| | 마이크로 범프 | 다이 사이를 잇는 미세 솔더 접점 |
| 접합 공정 | MR-MUF | 적층 후 액상 보호재를 한 번에 주입·경화, 방열·생산성 유리 (SK hynix) |
| | TC-NCF | 다이마다 비전도성 필름을 두고 열압착 (삼성전자 등) |
| | 하이브리드 본딩 | 범프 없이 구리 전극을 직접 접합, 적층 높이·간격 축소 |
| 다이 구성 | 베이스 다이 | 최하단 로직 다이, I/O·테스트·제어 담당 (HBM4는 파운드리 로직 공정 적용) |
| | 코어 다이 | 실제 데이터를 저장하는 DRAM 다이 (8·12·16단) |
| 패키징 | 실리콘 인터포저 | 프로세서와 HBM 간 수천 개 미세 배선 제공 (예: TSMC CoWoS) |
| 인터페이스 | 채널·의사 채널 | 독립 채널로 나눠 병렬 접근 (HBM4 스택당 32채널) |

---

## III. 비교 및 동향

### 가. HBM3E vs HBM4

| 구분 | HBM3E | HBM4 (JEDEC 2025) |
| --- | --- | --- |
| 인터페이스 폭 | 1024비트 | 2048비트 |
| 스택당 대역폭 | 약 1.2TB/s | 약 2TB/s 이상 |
| 적층 | 8단·12단 | 최대 16단 |
| 베이스 다이 | DRAM 공정 | 파운드리 로직 공정, 고객 맞춤 가능 |
| 적용 (예) | NVIDIA H200·B200, AMD MI300 계열 | NVIDIA Rubin 등 차세대 가속기 |

### 나. 동향

- **커스텀 HBM**: 베이스 다이에 고객 로직을 넣는 맞춤형 HBM으로 [[GPU]]·[[NPU]]와 공동 최적화
- **하이브리드 본딩 도입**: 16단 이상 고단 적층의 높이 제한(JEDEC 패키지 높이)과 발열 대응
- **[[PIM]] 결합**: HBM-PIM처럼 메모리 내부에 연산기를 넣어 데이터 이동 감소

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_컴퓨터구조_MOC|💻 컴퓨터구조]]
- **세부 분류**: `2. 캐시 & 메모리 계층 구조 · 스토리지`
- **핵심 연관 토픽**:
  - [[메모리 반도체|메모리 반도체 (Memory Semiconductor)]]
  - [[PIM|PIM(Processing-In-Memory)]]
  - [[칩렛|칩렛 (Chiplet)]]
  - [[GPU]]
  - [[메모리 인터리빙]]
