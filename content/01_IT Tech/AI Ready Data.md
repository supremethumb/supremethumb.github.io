---
title: AI Ready Data
date: 2026-04-22
tags:
  - 인공지능
---
# AI Ready Data

---

## I. 신뢰할 수 있는 AI의 기반, AI Ready Data의 개요

### 가. 정의

- 특정 AI 사용 목적(파운데이션 모델 학습, RAG, 자율 에이전트 등)에 맞춰 정확성·완전성을 넘어 대표성과 적시성을 갖추고, 데이터 계보(Lineage)가 추적되며 거버넌스가 관리되는 상태로 최적화된 기계 가독형 데이터

### 나. 주요 특징

| 구분 | 주요 내용 |
| --- | --- |
| 다차원적 품질 보증 | 단순 결측치 정제를 넘어 데이터의 대표성(Representativeness), 적시성, 다양성을 확보하여 모델 편향 억제 |
| 기계 가독성 및 구조화 | 대규모 언어 모델이 즉각 활용할 수 있도록 텍스트 청킹, 고차원 벡터 임베딩, 지식 그래프(Knowledge Graph) 변환 |
| 종단 간 계보 추적 | 원본 데이터의 출처부터 전처리 변환, 모델 주입 단계까지의 변경 이력(Data Lineage) 및 메타데이터 추적성 보장 |
| 거버넌스 및 규제 준수 | EU AI Act, [[AI 기본법]] 등 규제 대응을 위한 개인정보 [[비식별화]], 저작권 라이선스 식별, 접근 권한 통제 내재화 |

---

## II. AI Ready Data의 개념도 및 핵심 구성 요소

### 가. AI Ready Data의 개념도 및 프로세스

```mermaid
flowchart TB
    subgraph RawData["Raw Data (비정형/정형)"]
        DOC["문서/텍스트"]
        DB["RDBMS/로그"]
        MEDIA["이미지/음성"]
    end

    subgraph DataProcessing["AI Ready Data 파이프라인"]
        direction TB
        PRE["전처리/정제<br/>(결측치, 중복 제거)"]
        STR["구조화/변환<br/>(Chunking, Embedding)"]
        GOV["거버넌스/계보<br/>(메타데이터, Lineage)"]
        
        PRE --> STR --> GOV
    end

    subgraph AIReady["AI Ready Data Storage"]
        VDB["Vector DB"]
        KG["Knowledge Graph"]
        LDB["Lineage & Meta DB"]
    end

    subgraph AIApp["AI Application"]
        TR["Model Training<br/>(Fine-Tuning)"]
        RAG["RAG System"]
        AGENT["AI Agent"]
    end

    RawData --> DataProcessing
    DataProcessing --> AIReady
    AIReady --> AIApp
    
    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class DataProcessing,AIReady highlight;

```

* 단순 정제를 넘어 모델이 이해할 수 있도록 구조화(임베딩, 지식 그래프)하고, 생성 및 소비 전 과정의 출처 이력을 메타데이터로 저장함

### 나. AI Ready Data의 핵심 구성 요소

| 구분 | 요소기술(키워드) | 세부 설명 |
| --- | --- | --- |
| **품질 (Quality)** | 대표성 (Representativeness) | 특정 편향에 치우치지 않고 실제 환경의 데이터 분포를 균형 있게 반영 |
| **품질 (Quality)** | 정확성 및 적시성 | 값의 사실 여부 검증 및 최신 사건·문맥을 반영하여 환각(Hallucination) 방지 |
| **구조화 (Structure)** | Chunking & Embedding | RAG 및 시맨틱 검색을 위해 문서를 의미 단위로 분할하고 다차원 벡터로 변환 |
| **구조화 (Structure)** | Knowledge Graph (Ontology) | [[엔티티\|엔티티(Entity)]] 간의 관계를 온톨로지 기반 지식망으로 연결하여 추론 성능 강화 |
| **추적 (Traceability)** | Metadata Management | 데이터 출처, 수집 목적, 소유자, 보존 기간 등 데이터에 관한 속성 정보 정의 |
| **추적 (Traceability)** | Data Lineage (계보) | 데이터의 생성부터 가공, 최종 AI 모델 주입까지의 이동 경로 및 변환 이력 시각화 |
| **거버넌스 (Governance)** | 접근 통제 (Access Control) | AI 에이전트의 데이터 쿼리 범위 및 권한을 제어하여 기밀 정보 유출 차단 |
| **거버넌스 (Governance)** | 프라이버시 마스킹 | 개인정보 및 민감정보(PII)의 [[비식별화]] 처리를 통한 규제(EU AI Act 등) 준수 |

---

## III. AI Ready Data와 전통적 깨끗한 데이터(Clean Data) 비교 및 향후 전망

### 가. 전통적 Clean Data와 AI Ready Data 비교

| 비교 항목 | 전통적 Clean Data | AI Ready Data |
| --- | --- | --- |
| **주요 목적** | 사람의 가독성 향상 및 대시보드(BI) 분석 | AI 모델의 기계 가독성, 자율적 추론 및 학습 효율성 |
| **핵심 품질 지표** | 정확성, 완전성, 일관성 중심 | 기존 지표 + **대표성, 유효성, 적시성** |
| **데이터 형태** | RDBMS 기반 정형 테이블, 스프레드시트 | 텍스트, 멀티모달, 벡터 임베딩, 그래프(Graph) |
| **추적 및 통제** | 시스템 중심의 단순 접근 제어 | **Data Lineage** 기반 이력 추적 및 [[AI 윤리]]([[편향]]) 관리 |
| **주요 활용처** | 통계 분석, 데이터 웨어하우스(DW) | LLM 파인튜닝, RAG 아키텍처, AI 에이전트 생태계 |

### 나. AI Ready Data의 향후 전망 및 시사점

- **글로벌 AI 규제 대응 필수 인프라화**: EU AI Act 및 국내 [[AI 기본법]] 본격 시행에 대응하여 고위험 AI 모델 학습 데이터의 출처 증명, 저작권 라이선스 식별, 편향성 검증 체계 의무화
- **데이터 중심 AI(Data-centric AI) 패러다임 확산**: 모델 아키텍처 개선 중심에서 고품질 데이터 구축 중심으로 패러다임이 전환됨에 따라 DataOps와 [[MLOps]]를 결합한 데이터 검증 자동화 파이프라인 필수화
- **멀티모달 및 합성 데이터(Synthetic Data) 연계 확대**: 텍스트 중심 정제를 넘어 음성, 영상, 3D 센서 데이터를 아우르는 복합 벡터화와 데이터 희소성 극복을 위한 고품질 [[합성 데이터]] 구축 체계 도입 가속화

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_인공지능_MOC|🤖 인공지능]]
- **세부 분류**: `4. 거대언어모델 (LLM) & 생성형 AI`
- **핵심 연관 토픽**:
  - [[AI TRiSM|AI TRiSM(AI Trust Risk and Security Management)]]
  - [[AI 윤리]]
  - [[편향]]
  - [[공공부문 초거대AI 도입, 활용 가이드라인 2.0(2025.04)]]
  - [[생성형AI 데이터 품질관리 가이드 v2.0]]
