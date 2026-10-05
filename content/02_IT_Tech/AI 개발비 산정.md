---
title: AI 개발비 산정
date: 2026-04-22
tags:
  - 소프트웨어공학
---
# AI 개발비 산정

---
## I. AI 개발비 산정의 개요 및 패러다임 변화

| 구분 | 내용 |
| :--- | :--- |
| **정의** | [[인공지능]](AI) 기술이 적용된 정보시스템을 구축할 때 필요한 예산과 적정 대가를 산정하는 기준 |
| **필요성** | '데이터 확보/가공' 및 '[[알고리즘]] 학습/최적화' 등 불확실성이 높은 과정이 추가되어 기존 기능점수(FP) 단일 방식으로는 산정 불가 |
| **핵심 키워드** | 데이터 구축비, 모델 학습비, 투입인력(M/M) 하이브리드, KOSA 가이드라인, 불확실성(Uncertainty) |

---

## II. 전통적 SW vs AI 시스템 산정 패러다임

### 가. 비용 산정 패러다임 변화 개념도

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 310" width="100%" height="auto" style="max-width: 620px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#4B5563" />
    </marker>
  </defs>
  
  <!-- 배경 카드 -->
  <rect width="620" height="310" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  
  <!-- 왼쪽 영역: 전통적 SW 사업 -->
  <rect x="40" y="30" width="220" height="40" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="150" y="55" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1E40AF" text-anchor="middle">전통적 SW 사업</text>
  
  <rect x="60" y="100" width="180" height="170" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.2"/>
  <text x="150" y="160" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1E3A8A" text-anchor="middle">기능 구현 중심</text>
  <text x="150" y="185" font-family="system-ui, sans-serif" font-size="12" fill="#3B82F6" text-anchor="middle">명확한 입출력 기반</text>
  <rect x="80" y="210" width="140" height="30" rx="15" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1"/>
  <text x="150" y="230" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1D4ED8" text-anchor="middle">기능점수(FP) 방식</text>

  <!-- 화살표 -->
  <line x1="280" y1="160" x2="335" y2="160" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="310" y="145" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#4B5563" text-anchor="middle">패러다임 변화</text>

  <!-- 오른쪽 영역: AI 시스템 구축 사업 -->
  <rect x="360" y="30" width="220" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="470" y="55" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#92400E" text-anchor="middle">AI 시스템 구축 사업</text>
  
  <!-- AI 4대 요소 스택 -->
  <rect x="380" y="90" width="180" height="35" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.2"/>
  <text x="430" y="112" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#1E3A8A">1. 응용 SW 구현</text>
  <text x="535" y="112" font-family="system-ui, sans-serif" font-size="10" fill="#2563EB">(FP)</text>

  <rect x="380" y="140" width="180" height="35" rx="4" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.2"/>
  <text x="420" y="162" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#991B1B">2. 모델 개발/학습</text>
  <text x="530" y="162" font-family="system-ui, sans-serif" font-size="10" fill="#EF4444">(M/M)</text>

  <rect x="380" y="190" width="180" height="35" rx="4" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.2"/>
  <text x="430" y="212" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#991B1B">3. 데이터 구축</text>
  <text x="515" y="212" font-family="system-ui, sans-serif" font-size="10" fill="#EF4444">(단가, M/M)</text>

  <rect x="380" y="240" width="180" height="35" rx="4" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1.2"/>
  <text x="430" y="262" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#4B5563">4. 인프라 구축</text>
  <text x="515" y="262" font-family="system-ui, sans-serif" font-size="10" fill="#4B5563">(실비, M/M)</text>

  <!-- 불확실성 브라켓 -->
  <path d="M 570 140 L 580 140 L 580 225 L 570 225" fill="none" stroke="#DC2626" stroke-width="1.5"/>
  <text x="590" y="180" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#DC2626" transform="rotate(90, 590, 180)" text-anchor="middle">고도의 불확실성</text>
</svg>

* AI 시스템은 데이터 확보 및 알고리즘 학습이라는 본질적 불확실성으로 인해 '기능점수(FP) + 하이브리드(M/M) 방식'이 병행되어야 함.

---

### 나. AI 사업 개발비의 4대 핵심 구성요소 (실무 기준)

| 분류 | 주요 활동 내용 | 대가 산정 방식 |
| :--- | :--- | :--- |
| **1. 데이터 구축비** | 원시 데이터 구매/수집, 정제(Cleansing) 및 익명화, 라벨링 및 어노테이션 | **단가 산정 방식** (건/MB당) 또는<br>가공인력 **투입인력(M/M) 방식** |
| **2. 모델 개발 및 학습비** | 알고리즘 선택 및 아키텍처 설계, 피처 엔지니어링, 학습 및 파라미터 튜닝 | 데이터 과학자/엔지니어 **투입인력(M/M)**<br>*(최근 복잡도·학습횟수 가중치 연구 중)* |
| **3. 응용 SW 구현비** | 학습된 모델 서빙 API 개발, 관리자/사용자 UI/UX, 레거시 연동([[EAI]]/API) | 전통적인 **기능점수(FP) 방식** 적용 |
| **4. 인프라 및 환경 구축비** | [[GPU]] 서버, 대용량 스토리지 및 분산 처리, [[MLOps]] 파이프라인 구축 | 클라우드 **종량제 실비** 또는<br>온프레미스 **장비 원가 및 구축비(M/M)** |

---

## III. AI 시스템 도입 산정 체계 및 한계점 극복

### 가. [초핵심] 인공지능(AI) 서비스 도입 사업비 산정 체계 (KOSA)

1. **AI 서비스 도입 사업유형 3가지**
   * **단순 AI 서비스 도입형:** 정기 이용료(구독료)만 지불 (서비스 이용료)
   * **커스터마이징형:** 목적에 맞는 데이터 구축, 파인튜닝 요구 (이용료 + 커스터마이징 비용)
   * **시스템통합형:** 커스터마이징 + SW 개발 및 레거시 통합 (이용료 + 커스터마이징 + 구축/개발 비용)

2. **AI 서비스 도입 사업비 산정 [[PMBOK 프로세스 그룹 (5단계)|5단계]] 절차 (사·이·커·구·사)**
   | 단계 | 활동 | 설명 |
   | :--- | :--- | :--- |
   | **1단계** | **사**전준비 | 대상 AI 서비스 식별 및 세부 항목/추가 활동 정의 |
   | **2단계** | **이**용료 계산 | 서비스 특성 및 사용기간/규모 고려 연간 이용료 산정 |
   | **3단계** | **커**스터마이징 계산 | 데이터 수집/가공, 모델 학습 등 투입공수 방식 산정 |
   | **4단계** | **구**축·개발 계산 | 추가 SW 개발 및 통합 (기능점수 FP 또는 투입공수 산정) |
   | **5단계** | **사**업비 산정 | 총합 계산 (이용료 + 커스터마이징 + 구축·개발 비용) |

### 나. AI 개발비 산정 시 실무적 고려사항

* **성능(정확도) 미달성 리스크 관리:** 사전에 목표 성능 달성을 보장하기 어려우므로, **PoC(개념 증명)** 선행 및 현실적인 Trade-off 지표 협의가 필수적입니다.
* **하이브리드 비용 산정 적용:** 완전한 정량적 표준이 정착되기 전까지는 실무적으로 **'기능점수(FP) + 데이터/AI 인력(M/M) + 실비'** 형태를 가장 합리적인 대안으로 활용합니다.
* **MLOps 및 지속적 [[유지보수]]:** Data Drift(데이터 분포 변화)로 인한 모델 성능 저하를 방지하기 위해, 주기적 재학습(Retraining)을 위한 **MLOps 인프라 유지관리비**를 예산에 반드시 별도 편성해야 합니다.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_소프트웨어공학_MOC|🏗️ 소프트웨어공학]]
- **세부 분류**: `6. 소프트웨어 테스팅 & 품질 보증 (QA/QC)`
- **핵심 연관 토픽**:
  - [[인공지능]]
  - [[MLOps]]
  - [[알고리즘]]
  - [[GPU]]
  - [[유지보수]]
