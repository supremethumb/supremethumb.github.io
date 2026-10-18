---
title: 감리/PMO 비교표
date: 2026-04-22
tags:
  - 소프트웨어공학
---
# PMO / 감리 비교표

---

## I. 정보화 사업 성공을 위한 두 축, 감리와 PMO의 개요

| 구분 | 내용 |
| --- | --- |
| [[정보시스템 감리]] | 제3자의 독립적 관점에서 정보시스템의 구축·운영을 종합 점검하고 개선을 권고하여 품질과 안전성을 확보하는 활동 |
| [[PMO]] | 전문성이 부족한 발주기관을 대신해 사업 기획부터 종료까지 일정·품질·위험 등 사업관리를 상시 지원·통제하는 전문 조직 |
| 관계 | 감리는 **독립적 검증(사후·시점)**, PMO는 **상시 관리(사전 예방)** |

---

## II. 감리와 PMO의 역할 및 비교

### 가. 역할 및 위상 개념도

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="auto" style="max-width: 700px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <!-- 기본 화살표 마커 -->
    <marker id="arrow-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
    </marker>
  </defs>

  <!-- 전체 배경 (선택 사항: 다크모드 대응을 위해 투명 유지 혹은 명확한 흰색 배경) -->
  <rect width="100%" height="100%" fill="transparent" />

  <!-- 상단 관점 텍스트 -->
  <text x="130" y="65" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="middle">내부자 관점</text>
  <text x="570" y="65" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#4B5563" text-anchor="middle">제3자 독립적 관점</text>

  <!-- 노드: 발주 기관 -->
  <rect x="50" y="80" width="160" height="60" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
  <text x="130" y="116" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#1E3A8A" text-anchor="middle">발주 기관</text>

  <!-- 노드: PMO -->
  <rect x="490" y="80" width="160" height="60" rx="8" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="2"/>
  <text x="570" y="116" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#4C1D95" text-anchor="middle">PMO</text>

  <!-- 노드: 사업자 -->
  <rect x="50" y="320" width="160" height="60" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/>
  <text x="130" y="356" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#065F46" text-anchor="middle">사업자</text>

  <!-- 노드: 감리 법인 -->
  <rect x="490" y="320" width="160" height="60" rx="8" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/>
  <text x="570" y="356" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#92400E" text-anchor="middle">감리 법인</text>


  <!-- 상단 수평 화살표 (발주 기관 <-> PMO) -->
  <!-- 1. 사업관리 대행 (오른쪽 방향) -->
  <line x1="220" y1="95" x2="475" y2="95" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="350" y="85" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="middle">사업관리 대행</text>
  
  <!-- 2. 상시 지원 (왼쪽 방향) -->
  <line x1="480" y1="125" x2="225" y2="125" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="350" y="145" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="middle">상시 지원</text>


  <!-- 좌측 수직 화살표 (발주 기관 <-> 사업자) -->
  <!-- 3. 발주 / 계약 (아래 방향) -->
  <line x1="100" y1="150" x2="100" y2="305" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="90" y="235" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="end">발주 / 계약</text>

  <!-- 4. 산출물 / 시스템 제공 (위 방향) -->
  <line x1="160" y1="310" x2="160" y2="155" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="170" y="225" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="start">산출물 /</text>
  <text x="170" y="245" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="start">시스템 제공</text>


  <!-- 우측 수직 화살표 (PMO -> 감리 법인) -->
  <!-- 5. 일정/위험/이슈 & 상시통제 (아래 방향) -->
  <line x1="570" y1="150" x2="570" y2="305" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="560" y="225" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="end">일정 / 위험 / 이슈</text>
  <text x="560" y="245" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="end">상시통제</text>


  <!-- 하단 수평 화살표 (사업자 <-> 감리 법인) -->
  <!-- 6. 단계별 중점 점검 및 권고 (왼쪽 방향) -->
  <line x1="480" y1="335" x2="225" y2="335" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="350" y="325" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="middle">단계별 중점 점검 및 권고</text>
  
  <!-- 7. 시정 조치 이행 (오른쪽 방향) -->
  <line x1="220" y1="365" x2="475" y2="365" stroke="#6B7280" stroke-width="1.5" marker-end="url(#arrow-gray)"/>
  <text x="350" y="385" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#374151" text-anchor="middle">시정 조치 이행</text>

</svg>

### 나. 상세 비교

| 구분 | 정보시스템 감리 | PMO |
| --- | --- | --- |
| 핵심 목적 | 객관적 품질 검증, 위험 식별 | 프로젝트 완수, 발주자 지원 |
| 관점·위상 | 독립적 제3자 (검증자) | 발주자의 대리인 (관리자·조력자) |
| 조직 내 위치 | 프로젝트 조직 외부 (독립성 필수) | 프로젝트 조직 내부 (발주기관 측) |
| 수행 시기 | 특정 시점·단계별 (요구정의, 설계, 종료) | 전 기간 상시 수행 |
| 주요 활동 | 규정·표준 준수, 산출물 정합성 점검, 문제 적발 | 일정·비용·품질·위험 통합 관리, 이슈 사전 예방 |
| 문제 해결 | 개선 권고 및 시정조치 확인 | 이슈 직접 개입, 해결책 수립, 의사결정 지원 |
| 산출물 | 감리계획서, [[정보시스템 감리결과보고서\|감리결과보고서]], 시정조치확인서 | PMO 수행계획서, 주간·월간 보고서, 위험관리대장 |
| 책임 | 감리 결과의 정확성, 시정조치 확인 | 관리 부실 시 사업 결과에 대한 실질적 책임 |
| 도입 근거 (공공) | 전자정부법, 일정 규모 이상 의무 ([[정보시스템 감리 의무 대상과 관점별 점검 기준\|의무 대상]]) | 전자정부법, 발주기관 판단에 따라 선택 도입 |

---

## III. 상호 보완적 활용 및 진화 동향

### 가. 상호 보완 체계

- **역할 분담**: PMO는 매일의 이슈·일정을 통제하는 "주치의(예방)", 감리는 마일스톤마다 객관적 기준으로 진단하는 "종합검진(검증)"
- **상호 검증**: PMO의 관리 산출물도 감리 대상이며, 감리 지적 사항은 PMO가 사업자와 함께 신속히 조치
- 대형 공공 사업에서는 두 제도를 병행하여 사업 위험을 최소화하는 추세

### 나. 진화 동향

- **APMO / VMO**: [[Agile]]·[[클라우드 네이티브]] 환경에서 [[WBS]] 통제 중심 PMO가 가치 흐름(Value Stream) 정렬 중심의 Agile PMO, Value Management Office로 전환
- **AI 기반 사업관리**: Jira·GitHub 데이터를 분석해 일정 지연·인력 리스크를 예측하는 대시보드 도입
- **상시 자동 감리**: 샘플링 위주 문서 점검에서 CI/CD와 연계한 코드·산출물 전수 점검([[SAST]], [[초거대 언어 모델\|LLM]] 활용)으로 진화

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_소프트웨어공학_MOC|🏗️ 소프트웨어공학]]
- **세부 분류**: `6. 소프트웨어 테스팅 & 품질 보증 (QA/QC)`
- **핵심 연관 토픽**:
  - [[정보시스템 감리]]
  - [[PMO]]
  - [[정보시스템 감리 의무 대상과 관점별 점검 기준]]
  - [[Agile]]
  - [[WBS|WBS (Work Breakdown Structure)]]
