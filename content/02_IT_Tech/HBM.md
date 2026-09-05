---
title: HBM (High Bandwidth Memory)
date: 2026-09-04
tags:
  - 컴퓨터아키텍처
draft: false
---
# HBM (High Bandwidth Memory)

## I. AI 시대의 메모리 병목 해소, HBM의 개요

|구분|내용|
|---|---|
|**정의**|다수의 DRAM을 TSV 기술로 수직 적층하고 실리콘 인터포저를 통해 고대역폭을 제공하는 초고속 메모리|
|**특징**|• **초고대역폭**: 수천 개의 I/O 핀을 통한 병렬 데이터 전송 • **저전력·초소형**: 데이터 전송 경로 단축으로 전력 소모 절감 및 실장 면적 축소|

## II. HBM의 아키텍처 및 핵심 구성요소

### 가. HBM의 동작원리 및 2.5D 패키징 아키텍처 개념도

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

- 여러 겹의 DRAM을 수직 적층한 후 실리콘 인터포저 상에서 [[GPU]]와 함께 2.5D 수평 배치

### 나. HBM의 핵심 기술요소

|구분|요소기술|특징|
|---|---|---|
|**적층 기술**|**TSV** _(Through Silicon Via)_|• 웨이퍼에 미세 전도성 관통 홀을 형성하여 상하 칩 직접 연결 • 배선 길이 단축 및 고속 전송 실현|
||**Micro-bump**|• 상하 다이 사이를 전기적으로 결속하는 초미세 솔더볼|
|**접합 / 패키징**|**MR-MUF** _(Mass Reflow Molded Underfill)_|• 칩 적층 후 액상 보호재를 일괄 주입 및 경화하여 방열·수율 개선|
||**TC-NCF** _(Thermal Compression NCF)_|• 필름 형태의 비전도성 필름을 다이 사이에 두고 열압착 접합|
||**Hybrid Bonding**|• 범프 없이 구리(Cu) 전극 간 직접 결합하여 간격 극소화 및 대역폭 극대화|
|**구조 설계**|**Base Die** _(Logic Die)_|• 최하단에서 수직 적층된 DRAM 제어, 테스트, I/O 라우팅 수행|
|**시스템 통합**|**2.5D / 3D 패키징**|• 인터포저 상 병렬 배치(2.5D) 및 수직 직접 적층(3D) 지원|
|**인터페이스**|**Wide I/O 인터페이스**|• 1024-bit 이상의 광대역 병렬 버스를 통한 초고속 데이터 전송|

- HBM3E 양산 성숙에 이어 HBM4 세대 진입에 따른 기술 전환 가속화

## III. HBM 세대 발전 전송 특성 및 향후 전망

|구분|HBM3E|HBM4|
|---|---|---|
|**최대 대역폭**|**1.2 TB/s 이상**|**2 TB/s 이상**|
|**I/O 버스 폭**|**1024-bit**|**2048-bit (2배 확장)**|
|**적층 단수**|**8-Hi / 12-Hi**|**16-Hi (초고밀도 적층)**|
|**핵심 기술**|방열 제어 최적화 (Advanced MR-MUF)|Custom Base Die (파운드리 첨단 로직 공정 결합)|

- **커스텀 HBM 시대 도래**: 고객 맞춤형 Custom Base Die 적용으로 GPU·[[NPU]] 시스템 최적화 가속
- **하이브리드 본딩(Hybrid Bonding) 수율 안정화**: 범프리스(Bumpless) 패키징을 통한 적층 두께 한계 극복
- **[[PIM]](Processing-In-Memory)으로의 융합 가속**: 메모리 내부 연산 기능 탑재를 통한 폰 노이만 병목의 원천 해소