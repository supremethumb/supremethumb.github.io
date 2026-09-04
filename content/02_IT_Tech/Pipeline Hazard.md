---
title: Pipeline Hazard
date: 2026-09-05
tags:
  - 컴퓨터아키텍처
draft: false
---
# Pipe line Hazard

## I. 프로세서 성능 저하의 주범, 파이프라인 해저드 개요

| **구분** | **내용**                                                         |
| ------ | -------------------------------------------------------------- |
| **정의** | [[CPU]] 파이프라인 처리 환경에서 자원 충돌 등으로 명령어의 연속적인 실행이 방해받고 지연이 발생하는 현상 |
| **특징** | - 파이프라인의 효율성 저하 및 클럭 낭비 유발<br>- 스케줄링, 분기 예측 등 복합 해결 매커니즘       |

---
## II. 파이프라인 해저드의 유형 및 핵심 해결 방안

### 가. 파이프라인 해저드 발생 개념도 및 분류
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 480" width="100%" height="auto" style="max-width: 760px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#374151" />
    </marker>
  </defs>

  <!-- 배경 카드 -->
  <rect width="760" height="480" fill="#F9FAFB" rx="12" stroke="#E5E7EB" stroke-width="1"/>

  <!-- ==================== Section 1: 데이터 해저드에 의한 지연 ==================== -->
  <text x="380" y="45" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle">[ 데이터 해저드에 의한 지연 ]</text>

  <!-- Row 1 -->
  <!-- IF -->
  <rect x="80" y="70" width="70" height="36" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="115" y="94" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">IF</text>
  <!-- ID -->
  <rect x="150" y="70" width="70" height="36" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
  <text x="185" y="94" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#831843" text-anchor="middle">ID</text>
  <!-- EX -->
  <rect x="220" y="70" width="70" height="36" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
  <text x="255" y="94" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#713F12" text-anchor="middle">EX</text>
  <!-- MEM -->
  <rect x="290" y="70" width="70" height="36" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="325" y="94" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#14532D" text-anchor="middle">MEM</text>
  <!-- WB -->
  <rect x="360" y="70" width="70" height="36" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
  <text x="395" y="94" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#581C87" text-anchor="middle">WB</text>

  <!-- Row 2 (Offset by 1) -->
  <!-- IF -->
  <rect x="150" y="106" width="70" height="36" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="185" y="130" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">IF</text>
  <!-- ID -->
  <rect x="220" y="106" width="70" height="36" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
  <text x="255" y="130" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#831843" text-anchor="middle">ID</text>
  <!-- Stall 1 -->
  <rect x="290" y="106" width="70" height="36" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
  <text x="325" y="130" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#991B1B" text-anchor="middle">Stall</text>
  <!-- Stall 2 -->
  <rect x="360" y="106" width="70" height="36" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
  <text x="395" y="130" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#991B1B" text-anchor="middle">Stall</text>
  <!-- EX -->
  <rect x="430" y="106" width="70" height="36" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
  <text x="465" y="130" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#713F12" text-anchor="middle">EX</text>
  <!-- MEM -->
  <rect x="500" y="106" width="70" height="36" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="535" y="130" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#14532D" text-anchor="middle">MEM</text>
  <!-- WB -->
  <rect x="570" y="106" width="70" height="36" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
  <text x="605" y="130" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#581C87" text-anchor="middle">WB</text>

  <!-- Row 3 (Pipeline Register States / Bubbles) -->
  <!-- IF/ID (Spans IF & ID) -->
  <rect x="150" y="142" width="140" height="36" fill="#FFFFFF" stroke="#6B7280" stroke-width="1.5"/>
  <text x="220" y="166" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#374151" text-anchor="middle">IF/ID</text>
  <!-- X X (Spans Stalls) -->
  <rect x="290" y="142" width="140" height="36" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.5"/>
  <text x="360" y="166" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#4B5563" text-anchor="middle">X<tspan dx="25">X</tspan></text>
  <!-- X -->
  <rect x="430" y="142" width="70" height="36" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.5"/>
  <text x="465" y="166" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#4B5563" text-anchor="middle">X</text>
  <!-- IF/ID -->
  <rect x="500" y="142" width="70" height="36" fill="#FFFFFF" stroke="#6B7280" stroke-width="1.5"/>
  <text x="535" y="166" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#374151" text-anchor="middle">IF/ID</text>
  <!-- Bubble -->
  <rect x="570" y="142" width="70" height="36" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.5"/>
  <text x="605" y="166" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="middle">Bubble</text>

  <!-- 구분선 -->
  <line x1="40" y1="215" x2="720" y2="215" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round" />

  <!-- ==================== Section 2: 데이터 포워딩 ==================== -->
  <text x="380" y="260" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle">[ 데이터 포워딩 ]</text>

  <!-- Row 1 (Top Data Path) -->
  <!-- IF -->
  <rect x="130" y="280" width="100" height="46" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="180" y="309" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1E3A8A" text-anchor="middle">IF</text>
  <!-- ID -->
  <rect x="230" y="280" width="100" height="46" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
  <text x="280" y="309" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#831843" text-anchor="middle">ID</text>
  <!-- EX -->
  <rect x="330" y="280" width="100" height="46" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
  <text x="380" y="309" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#713F12" text-anchor="middle">EX</text>
  <!-- MEM -->
  <rect x="430" y="280" width="100" height="46" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="480" y="309" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#14532D" text-anchor="middle">MEM</text>
  <!-- WB -->
  <rect x="530" y="280" width="100" height="46" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
  <text x="580" y="309" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#581C87" text-anchor="middle">WB</text>

  <!-- Row 2 (Bottom Data Path) -->
  <!-- IF -->
  <rect x="130" y="380" width="100" height="46" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="180" y="409" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1E3A8A" text-anchor="middle">IF</text>
  <!-- ID -->
  <rect x="230" y="380" width="100" height="46" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5"/>
  <text x="280" y="409" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#831843" text-anchor="middle">ID</text>
  <!-- EX -->
  <rect x="330" y="380" width="100" height="46" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
  <text x="380" y="409" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#713F12" text-anchor="middle">EX</text>
  <!-- MEM -->
  <rect x="430" y="380" width="100" height="46" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="480" y="409" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#14532D" text-anchor="middle">MEM</text>
  <!-- WB -->
  <rect x="530" y="380" width="100" height="46" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
  <text x="580" y="409" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#581C87" text-anchor="middle">WB</text>

  <!-- Forwarding Arrows -->
  <!-- EX to EX Arrow -->
  <line x1="380" y1="326" x2="380" y2="375" stroke="#374151" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- EX/MEM to EX/MEM Arrow -->
  <line x1="430" y1="326" x2="430" y2="375" stroke="#374151" stroke-width="2" marker-end="url(#arrow)" />
  <text x="442" y="357" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="start">전용 포워딩 경로</text>

</svg>
- 데이터 포워딩, 스톨 및 포워딩 사용으로 문제 해소

### 나. 파이프라인 해저드 세부 유형 및 핵심 해결방안

| **해저드 유형**  | **요소기술**   | **설명**         |
| ----------- | ---------- | -------------- |
| **구조적 해저드** | - 자원 중복    | - 동시 접근 충돌 회피  |
|             | - 하버드 아키텍처 | - 명령어 데이터 분리   |
| **데이터 해저드** | - 포워딩      | - 다음 명령어 직접 전달 |
|             | - 명령어 스케줄링 | - 지연주기 은닉      |
|             | - 인터록      | - Bubble 삽입    |
| **제어 해저드**  | - 정적 분기 예측 | - 고정하여 예측      |
|             | - 동적 분기 예측 | - 런타임 확률적 예측   |
|             | - 지연 분기    | - 파이프라인 빈공간 활용 |
- 효율적 자원 분배를 위한 포워딩 및 행위 제어

	---
## III. 최신 프로세서의 해저드 극복 기술 및 향후 전망

- 인공지능 기반 분기 예측, 비순차 실행 아키텍처 보편화, 보안 취약점 대응을 위한 추측 실행 제어