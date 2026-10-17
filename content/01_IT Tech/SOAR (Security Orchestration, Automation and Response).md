---
title: SOAR (Security Orchestration, Automation and Response)
date: 2026-09-05
tags:
  - 보안
aliases:
  - SOAR
  - SOAR (Security Orchestration, Automation & Response)
---

# SOAR (Security Orchestration, Automation and Response)

---

## I. 보안 대응의 자동화, SOAR의 개요

| **구분** | **내용** |
| --- | --- |
| **정의** | SOA·SIRP·TIP을 기반으로 보안 위협 발생 시 이기종 보안 솔루션을 조율(Orchestration)하고, 표준 대응 절차(Playbook)에 따라 조치를 자동화(Automation)하는 통합 보안 플랫폼 |
| **특징** | Orchestration, Automation, Response |
| **필요성** | - 보안 이벤트 급증에 따른 분석가 피로(Alert Fatigue)<br>- 반복 작업 자동화로 MTTR(평균 대응 시간) 단축<br>- SOC 업무 표준화 |

---

## II. SOAR의 개념도 및 주요 기능

### 가. SOAR의 개념도

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 500" width="100%" height="auto" style="max-width: 680px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="soar-arrow-1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#4B5563" />
    </marker>
  </defs>
  <!-- 배경 카드 -->
  <rect width="680" height="500" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <!-- Top Row -->
  <rect x="40" y="40" width="160" height="46" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
  <text x="120" y="68" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#991B1B" text-anchor="middle">외부 위협 정보</text>
  <rect x="460" y="40" width="180" height="46" rx="6" fill="#F3F4F6" stroke="#6B7280" stroke-width="1.5"/>
  <text x="550" y="68" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#374151" text-anchor="middle">내부 보안 장비</text>
  <!-- Middle Row -->
  <rect x="40" y="150" width="160" height="64" rx="6" fill="#E0E7FF" stroke="#4F46E5" stroke-width="1.5"/>
  <text x="120" y="178" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#3730A3" text-anchor="middle">TIP</text>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#4338CA" text-anchor="middle">위협 인텔리전스</text>
  <rect x="240" y="150" width="400" height="64" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="440" y="187" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#1E3A8A" text-anchor="middle">SOA (오케스트레이션 &amp; 자동화)</text>
  <!-- Bottom Row 1 -->
  <rect x="40" y="300" width="300" height="64" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="190" y="337" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#92400E" text-anchor="middle">SIRP (사고 대응 관리)</text>
  <!-- Bottom Row 2 -->
  <rect x="460" y="410" width="180" height="50" rx="6" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="550" y="441" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#14532D" text-anchor="middle">사고 대응</text>
  <!-- Connections & Arrows -->
  <!-- ExtThreat -> TIP -->
  <line x1="120" y1="86" x2="120" y2="143" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
  <!-- IntSec -> SOA -->
  <line x1="550" y1="86" x2="550" y2="143" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
  <text x="540" y="123" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="end">Alert / Log</text>
  <!-- SIRP -> TIP -->
  <line x1="120" y1="300" x2="120" y2="221" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
  <!-- SIRP -> SOA -->
  <line x1="280" y1="300" x2="280" y2="221" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
  <!-- SOA -> ActionResp -->
  <line x1="550" y1="214" x2="550" y2="403" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
  <text x="560" y="310" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="start">Action</text>
  <!-- ActionResp -> SIRP -->
  <path d="M 460 435 L 190 435 L 190 371" fill="none" stroke="#4B5563" stroke-width="1.5" marker-end="url(#soar-arrow-1)"/>
</svg>

```Plain Text
   [ 외부 위협 정보 ]          [ 내부 보안 장비 (SIEM/FW/IPS) ]
          |                             | (Alert/Log)
          v                             v
 +-----------------------------------------------------------+
 |                       SOAR Platform                       |
 |  +----------------+     +-------------------------------+ |
 |  |      TIP       | --> |              SOA              | |
 |  | (위협 인텔리전스) |     | (오케스트레이션 & 자동화, Playbook) | |
 |  +----------------+     +-------------------------------+ |
 |          ^                              | (Action)        |
 |  +----------------+                     v                 |
 |  |      SIRP      | <-- [ 사고 대응: IP 차단, 격리, 티켓 ]     |
 |  | (사고 대응 관리)  |                                       |
 |  +----------------+                                       |
 +-----------------------------------------------------------+
```

- TIP이 위협 정보를 분석하고, SOA가 Playbook에 따라 자동 조치하며, SIRP가 사고 대응 전 과정을 관리 (SIT 구조)

### 나. 핵심 구성요소 (SIT)

| **구성요소** | **설명** |
| --- | --- |
| **SOA** (Security Orchestration & Automation) | 이기종 보안 솔루션 연동, 반복 작업 자동화, Playbook 기반 워크플로우 |
| **SIRP** (Security Incident Response Platform) | 사고 접수 → 대응 → 보고까지 수명주기 관리, 케이스 관리·협업 |
| **TIP** (Threat Intelligence Platform) | 외부 위협 정보(IoC, 평판)를 수집해 내부 이벤트와 상관 분석 ([[CTI]]) |

### 다. 주요 기능

| **구분** | **주요 기능** | **설명** |
| --- | --- | --- |
| **Orchestration** | [[SIEM]] 연동 | 탐지 경보를 수신하여 대응 흐름 시작 |
| | [[EDR(Endpoint Detection and Response)\|EDR]] 연동 | 단말 위협 탐지 정보 전달·격리 |
| **Automation** | Playbook | 위협 유형별 Rule 기반 자동 대응 |
| | 관련자 통보 | 보안 담당자·조직에 자동 공유 |
| **Response** | Filtering | 이상 패킷·트래픽 차단 |
| | Block | IP 차단, 계정 잠금 등 조치 |

---

## III. SOAR와 SIEM 비교 및 적용 고려사항

### 가. SIEM vs SOAR

| 비교 항목 | [[SIEM]] (탐지 중심) | SOAR (대응 중심) |
| --- | --- | --- |
| 목적 | 로그 수집·상관 분석, 위협 탐지 | 대응 자동화, 절차 표준화, 협업 |
| 핵심 기능 | 로그 중앙화, 경보 생성 | Playbook 실행, 오케스트레이션 |
| 데이터 | 대용량 로그·이벤트 | 위협 인텔리전스, 사건(Case) 정보 |
| 역할 | 위협 식별 (Identify) | 식별된 위협 대응 (Respond) |

### 나. 적용 고려사항

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 170" width="100%" height="auto" style="max-width: 580px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="soar-arrow-2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#4B5563" />
    </marker>
  </defs>
  <!-- 배경 카드 -->
  <rect width="580" height="170" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <!-- Security Rule 박스 -->
  <rect x="40" y="25" width="120" height="64" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="100" y="51" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">Security</text>
  <text x="100" y="73" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">Rule</text>
  <!-- + 기호 -->
  <text x="180" y="65" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" fill="#6B7280" text-anchor="middle">+</text>
  <!-- 조직 역할 박스 -->
  <rect x="200" y="25" width="120" height="64" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
  <text x="260" y="51" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">조직</text>
  <text x="260" y="73" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#1E3A8A" text-anchor="middle">역할</text>
  <!-- 화살표 -->
  <line x1="335" y1="57" x2="425" y2="57" stroke="#4B5563" stroke-width="2" marker-end="url(#soar-arrow-2)"/>
  <!-- SOAR 원 -->
  <circle cx="490" cy="57" r="45" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="490" y="63" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#92400E" text-anchor="middle">SOAR</text>
  <!-- 구분선 -->
  <line x1="40" y1="115" x2="540" y2="115" stroke="#E5E7EB" stroke-width="1.5" stroke-dasharray="4 4" />
  <!-- 하단 텍스트 -->
  <text x="40" y="145" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#374151" text-anchor="start">자동처리 대응 향상</text>
</svg>

- **사전 정책 정립**: 자동화 전에 보안 처리 정책과 대응 절차를 먼저 정의해야 오탐에 의한 업무 중단 방지
- **SIEM + SOAR 연동**: SIEM 경보를 SOAR가 받아 [[방화벽]] 차단 등 즉시 대응
- **관제 효율화**: 반복 업무는 SOAR가 처리하고, 전문가는 [[위협 헌팅]] 등 고도화 분석에 집중

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `3. 네트워크 & 엔드포인트 · 인프라 보안`
- **핵심 연관 토픽**:
  - [[SIEM]]
  - [[위협 헌팅|위협 헌팅(Threat Hunting)]]
  - [[APT(Advanced Persistent Threat) 공격]]
  - [[방화벽]]
  - [[CTI]]
