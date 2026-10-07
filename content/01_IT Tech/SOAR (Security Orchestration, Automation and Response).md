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

## I. Security 조치의 Automation, SOAR

|**구분**|**내용**|
|---|---|
|**정의**|SOA, SIRP, TIP 기반으로 보안위협 발생 시 전체 시스템 조율, 조치 자동화 보안 플랫폼|
|**특징**|Orchestration, Automation, Response|

---
## II. SOAR의 개념도 및 주요기능

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

- 보안 관제/조치의 능률성 향상 목표

### 나. SOAR의 주요기능

| **구분**            | **주요기능**        | **설 명**                      |
| ----------------- | --------------- | ---------------------------- |
| **Orchestration** | - [[SIEM]]<br>  | - 시스템 보안모듈<br>               |
|                   | - [[EDR]]       | - 보안 탐지 및 전달                 |
| **Automation**    | - Playbook<br>  | - 보안조치 발생시 Rule Based 대응<br> |
|                   | - 연관자 통보        | - 보안 체계 기반 공유                |
| **Response**      | - Filtering<br> | - 이상 패킷/트래픽<br>              |
|                   | - Block         | - 조치, 처리                     |
- 기업보안이 비즈니스 목표 달성에 중요하여 SOAR를 통한 효율적 보안관리 사례 증가
---
## III. SOAR 적용 고려 사항
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

- SOAR 적용 전 보안 처리 정책 사전확인 필수

---

## I. 보안 관제의 복잡성 해결 및 자동화, SOAR의 개요

### 가. SOAR의 정의

- 다양한 보안 위협에 대해 대응 수준을 자동으로 분류하고, 표준화된 업무 [[프로세스]](Playbook)에 따라 보안 담당자와 솔루션이 유기적으로 협력하여 대응을 **자동화(Automation)** 및 **오케스트레이션(Orchestration)**하는 통합 보안 플랫폼.
- 기존 보안 관제의 한계(이벤트 과다, 분석 시간 소요)를 극복하기 위해 **SOC(Security Operation Center)** 업무를 최적화하는 기술.
### 나. 필요성

- **보안 위협 급증:** 수많은 보안 이벤트 발생으로 인한 분석가의 피로도(Alert Fatigue) 증가.
- **대응 속도 향상:** 단순 반복적인 작업을 자동화하여 MTTR(평균 대응 시간) 단축 필요.

---

---

## II. SOAR의 핵심 아키텍처 및 주요 기능

### 가. SOAR 아키텍처 도식화 (차별화: 3대 요소 SIT의 유기적 연동 표현)

```Plain Text
       [ 외부 위협 정보 ]         [ 내부 보안 장비 (SIEM/FW/IPS) ]
              |                             | (Alert/Log)
              v                             v
    +-------------------------------------------------------------+
    |                         SOAR Platform                       |
    |  +------------------+   +-------------------------------+   |
    |  |       TIP        |-->|             SOA               |   |
    |  | (위협 인텔리전스)|   | (오케스트레이션 & 자동화)     |   |
    |  +------------------+   |  - Workflow / Playbook 실행   |   |
    |          ^              +-------------------------------+   |
    |          |                            | (Action)            |
    |  +------------------+                 v                     |
    |  |      SIRP        |<-- [ 사고 대응 (Response) ]           |
    |  | (사고 대응 관리) |    - IP 차단, 격리, 티켓 생성     |   |
    |  +------------------+                                       |
    +-------------------------------------------------------------+
```

- **도식화 포인트:** **TIP**에서 위협 정보를 분석하고, **SOA**가 **Playbook**에 따라 자동화된 명령을 내리며, **SIRP**가 전체 사고 대응 프로세스를 관리하는 흐름을 **‘SIT (SOA, SIRP, TIP)’** 구조로 명확히 표현.
### 나. 핵심 구성요소 (핵심 키워드: 소.시.티 / SIT)

| 구성요소 | 상세 설명 |
| --- | --- |
| **SOA**<br>(Security Orchestration & Automation) | - 다양한 이기종 보안 솔루션을 연동(Orchestration)하고, 반복적인 작업을 자동화(Automation).<br>- **Playbook**: 대응 절차를 시나리오화한 워크플로우 적용. |
| **SIRP**<br>(Security Incident Response Platform) | - 보안 사고의 접수부터 대응, 보고까지의 **전체 수명주기**를 관리.<br>- 협업 도구 및 케이스 관리(Case Management) 기능 제공. |
| **TIP**<br>(Threat Intelligence Platform) | - 외부의 최신 위협 정보(IoC, 평판 정보 등)를 수집 및 분석하여 내부 이벤트와 상관 분석 수행. |

---

---

## III. SOAR와 SIEM의 비교 및 연계

### 가. SOAR와 SIEM 비교

| 비교 항목 | [[SIEM]] (탐지 중심) | SOAR (대응 중심) |
| --- | --- | --- |
| **주요 목적** | 로그 수집, 상관 분석, **위협 탐지** | **대응 자동화**, 프로세스 표준화, 협업 |
| **핵심 기능** | 로그 중앙화, 경고(Alert) 생성 | **Playbook** 실행, 워크플로우, 오케스트레이션 |
| **데이터** | 대용량 로그 및 패킷 데이터 | 위협 인텔리전스, 사건(Case) 정보 |
| **역할** | 위협을 **식별(Identify)**하는 도구 | 식별된 위협에 **대응(Respond)**하는 도구 |

### 나. 활용 방안

- **SIEM + SOAR 연동:** SIEM에서 탐지된 경보를 SOAR로 전달하여, SOAR가 Playbook에 따라 [[방화벽]] 차단 등 즉각적인 대응 수행.
- **관제 효율화:** 단순 반복 업무는 SOAR가 자동 처리하고, 보안 전문가는 고도화된 위협 분석(Threat Hunting)에 집중.
“끝”

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
