---
title: Belady's Anomaly
date: 2026-09-03
tags:
  - os
  - 컴퓨터아키텍처
draft: false
---
# Belady's Anomaly (FIFO 이상 현상)

---
## I. 메모리 할당의 역설적 한계, Belady's Anomaly 개념

| 구분     | 내용                                                           |
| :----- | :----------------------------------------------------------- |
| **정의** | 물리적 메모리 프레임 수가 늘었음에도 불구하고, 페이지 부재(Page Fault) 발생 횟수가 증가하는 현상 |
| **원인** | - 알고리즘의 한계<br>- 포함성 원리 결여                                    |

---

## II. Belady's Anomaly 발생 메커니즘 비교

### 가. Belady's Anomaly 발생 증명
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style="max-width: 680px; width: 100%; height: auto; display: block; margin: 1.5rem auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <defs>
    <!-- 화살표 마커 -->
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563"/>
    </marker>
  </defs>
  <!-- 배경 카드 -->
  <rect width="680" height="260" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <!-- ================= [1. 예상 Page Fault] ================= -->
  <g transform="translate(10, 10)">
    <!-- 제목 -->
    <text x="140" y="20" text-anchor="middle" font-weight="bold" font-size="14" fill="#1F2937">[예상 Page Fault]</text>
    <!-- 축 라벨 -->
    <text x="45" y="45" font-size="11" fill="#4B5563">Page Fault</text>
    <text x="280" y="215" font-size="11" fill="#4B5563">Frame 수</text>
    <!-- 좌표축 -->
    <path d="M 50 55 L 50 195 L 270 195" fill="none" stroke="#4B5563" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <!-- 예상 곡선 (단조 감소) -->
    <path d="M 70 80 Q 120 160 240 175" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
    <text x="150" y="125" font-size="11" fill="#3b82f6" font-weight="600">프레임 증가 시 감소</text>
  </g>
  <!-- ================= [2. 실제 Page Fault] ================= -->
  <g transform="translate(350, 10)">
    <!-- 제목 -->
    <text x="140" y="20" text-anchor="middle" font-weight="bold" font-size="14" fill="#1F2937">[실제 Page Fault (FIFO)]</text>
    <!-- 축 라벨 -->
    <text x="45" y="45" font-size="11" fill="#4B5563">Page Fault</text>
    <text x="280" y="215" font-size="11" fill="#4B5563">Frame 수</text>
    <!-- 좌표축 -->
    <path d="M 50 55 L 50 195 L 270 195" fill="none" stroke="#4B5563" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <!-- 실제 꺾은선 (이상현상 포함) -->
    <path d="M 70 80 L 120 150 L 165 110 L 240 175" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 이상현상 지점 포인트 및 주석 -->
    <circle cx="165" cy="110" r="4" fill="#ef4444" />
    <text x="175" y="105" font-size="12" fill="#ef4444" font-weight="bold">★ 벨레이디의 이상현상</text>
    <text x="180" y="122" font-size="10" fill="#6B7280">(Belady's Anomaly)</text>
  </g>
</svg>

- **현상 요약**: 메모리(Frame 수)를 증가시켰으나 부재율(Page Fault) 증가가 역설적으로 발생

### 나. 이상현상 해결을 위한 알고리즘 특성

|구분|비스택 알고리즘|스택 알고리즘|
|---|---|---|
|**핵심원리**|큐를 단순 시퀀스 기반 교체|참조 특성을 반영한 교체|
|**포함성 원리**|M(n) \not\subset M(n+1) (미충족)|M(n) \subset M(n+1) (항상 충족)|
|**이상현상**|Belady's Anomaly 발생|Belady's Anomaly 미발생|
|**해당 알고리즘**|[[FIFO]], Second Chance 등|[[LRU]], [[LFU]], Optimal 등|
|**비교**|구현이 단순하나 최적화 불가능|현대 OS [[가상메모리의 페이징과 세그멘테이션|가상 메모리]] 표준|
- _M(n): n개의 프레임을 가질 때 특정 시점의 메모리 적재 및 페이지 집합_

---
## III. 현대 운영체제의 이상현상 회피 및 최신 동향

### 가. Belady's Anomaly의 해결 및 한계 극복 방안

- **LRU 계열 알고리즘 채택**: 포함성 속성을 만족하는 스택 기반 알고리즘 적용
- **PFF (Page Fault Frequency) 조절**: 프로세스별 페이지 부재율 상한/하한을 모니터링하여 프레임 동적 할당

### 나. 최신 OS의 교체 알고리즘 동향

- **Active / Inactive List 기반의 2Q 알고리즘**: LRU의 오버헤드를 완화하고 Scan 저항성을 갖춘 실무형 메모리 관리 기법 적용

"끝"