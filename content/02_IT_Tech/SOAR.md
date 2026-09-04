---
title: SOAR (Security Orchestration, Automation & Response)
date: 2026-09-05
tags:
  - 보안
draft: false
aliases:
---
# SOAR (Security Orchestration, Automation & Response)

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
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
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
  <line x1="120" y1="86" x2="120" y2="143" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- IntSec -> SOA -->
  <line x1="550" y1="86" x2="550" y2="143" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="540" y="123" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="end">Alert / Log</text>

  <!-- SIRP -> TIP -->
  <line x1="120" y1="300" x2="120" y2="221" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- SIRP -> SOA -->
  <line x1="280" y1="300" x2="280" y2="221" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- SOA -> ActionResp -->
  <line x1="550" y1="214" x2="550" y2="403" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="560" y="310" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="start">Action</text>

  <!-- ActionResp -> SIRP -->
  <path d="M 460 435 L 190 435 L 190 371" fill="none" stroke="#4B5563" stroke-width="1.5" marker-end="url(#arrow)"/>
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
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
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
  <line x1="335" y1="57" x2="425" y2="57" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow)"/>
  
  <!-- SOAR 원 -->
  <circle cx="490" cy="57" r="45" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="490" y="63" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#92400E" text-anchor="middle">SOAR</text>
  
  <!-- 구분선 -->
  <line x1="40" y1="115" x2="540" y2="115" stroke="#E5E7EB" stroke-width="1.5" stroke-dasharray="4 4" />
  
  <!-- 하단 텍스트 -->
  <text x="40" y="145" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#374151" text-anchor="start">자동처리 대응 향상</text>
</svg>
- SOAR 적용 전 보안 처리 정책 사전확인 필수