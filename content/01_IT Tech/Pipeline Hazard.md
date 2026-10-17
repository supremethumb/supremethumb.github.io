---
title: Pipeline Hazard
date: 2026-09-05
tags:
  - 컴퓨터구조
aliases:
  - 파이프라인 해저드
---

# Pipeline Hazard (파이프라인 해저드)

---

## I. 파이프라인을 멈추게 하는 원인, 파이프라인 해저드의 개요

### 가. 정의

- 파이프라인에서 **다음 명령이 예정된 클록에 실행되지 못하게 만드는 상황**으로, 구조적·데이터·제어 해저드로 구분

### 나. 특징

| 구분 | 내용 |
| --- | --- |
| 영향 | 스톨(Bubble) 발생으로 CPI가 1보다 커지고 파이프라인 효율 저하 |
| 원인 | 자원 충돌, 명령 간 데이터 의존성, 분기에 따른 흐름 변경 |
| 해결 | 하드웨어(포워딩·분기 예측)와 컴파일러(명령어 재배치) 협력 |

---

## II. 유형 및 해결 방안

### 가. 데이터 해저드와 포워딩 (5단계 파이프라인)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 480" width="100%" height="auto" style="max-width: 760px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="pipe-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
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
  <line x1="380" y1="326" x2="380" y2="375" stroke="#374151" stroke-width="2" marker-end="url(#pipe-arrow)" />
  <!-- EX/MEM to EX/MEM Arrow -->
  <line x1="430" y1="326" x2="430" y2="375" stroke="#374151" stroke-width="2" marker-end="url(#pipe-arrow)" />
  <text x="442" y="357" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="start">전용 포워딩 경로</text>
</svg>

- 앞 명령의 결과가 WB 전에 필요하면 스톨이 생기며, EX/MEM 결과를 다음 명령의 EX 입력으로 바로 넘기는 포워딩으로 대부분 해소 (Load 직후 사용은 1사이클 스톨 남음)

### 나. 유형별 해결 방안

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 구조적 해저드 | 자원 중복 | 같은 자원(메모리·ALU)을 동시에 쓰는 충돌을 자원 추가로 회피 |
| | 하버드 구조 | 명령·데이터 메모리(캐시) 분리로 IF·MEM 충돌 제거 |
| 데이터 해저드 | 포워딩 (Bypassing) | 결과를 레지스터 기록 전에 다음 명령의 입력으로 전달 |
| | 인터록 (스톨) | 의존성 검출 시 Bubble을 삽입해 대기 |
| | 명령어 [[스케줄링]] | 컴파일러가 독립 명령을 사이에 배치해 지연 은닉 |
| | 레지스터 재명명 | WAR·WAW 거짓 의존성 제거 (비순차 실행) |
| 제어 해저드 | 정적 분기 예측 | 항상 Taken/Not-taken, 역방향 분기는 Taken 등 고정 규칙 |
| | 동적 분기 예측 | 2비트 카운터·BHT·BTB 등 실행 이력으로 예측 |
| | 지연 분기 | 분기 뒤 슬롯에 항상 실행할 명령 배치 (MIPS) |

---

## III. 비교 및 동향

### 가. 해저드 유형 비교

| 비교 항목 | 구조적 해저드 | 데이터 해저드 | 제어 해저드 |
| --- | --- | --- | --- |
| 원인 | 하드웨어 자원 부족 | 명령 간 데이터 의존 (RAW·WAR·WAW) | 분기·점프로 다음 명령 불확실 |
| 예 | 단일 메모리에 IF·MEM 동시 접근 | ADD 결과를 바로 다음 SUB가 사용 | 조건 분기 결과가 EX에서 결정 |
| 주요 해결 | 자원 추가, 하버드 구조 | 포워딩, 스케줄링, 재명명 | 분기 예측, 지연 분기, 투기적 실행 |

### 나. 동향

- **고급 분기 예측**: TAGE·퍼셉트론 계열 예측기로 예측 실패에 따른 파이프라인 플러시 감소
- **비순차·투기적 실행**: 재명명·ROB로 데이터 해저드를 숨기고 분기 결과 전에 미리 실행
- **투기 실행 보안**: Spectre 등 [[부채널 공격]] 대응을 위한 투기 실행 제한·차단 명령(LFENCE 등) 적용

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_컴퓨터구조_MOC|💻 컴퓨터구조]]
- **세부 분류**: `1. CPU 프로세서 & 마이크로아키텍처`
- **핵심 연관 토픽**:
  - [[CPU 처리과정]]
  - [[CPU]]
  - [[명령문]]
  - [[스케줄링|CPU Scheduling]]
  - [[캐시 메모리]]
