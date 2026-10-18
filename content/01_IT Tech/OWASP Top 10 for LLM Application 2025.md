---
title: OWASP Top 10 for LLM Application 2025
date: 2026-04-22
tags:
  - 보안
---
# OWASP Top 10 for LLM Application 2025

---

## I. LLM 애플리케이션 보안 표준, OWASP Top 10 for LLM Application 2025의 개요

### 가. OWASP Top 10 for LLM 2025의 정의
- 거대 언어 모델([[초거대 언어 모델|LLM]]) 및 생성형 AI 애플리케이션 환경에서 발생하는 가장 치명적인 상위 10대 보안 위협과 취약점을 정의한 글로벌 AI 보안 표준 가이드라인.

### 나. OWASP Top 10 for LLM 2025의 등장배경 및 핵심 특징
| 구분 | 내용 |
| --- | --- |
| 에이전트·RAG 위협 반영 | 단순 질의응답 챗봇을 넘어 RAG(검색 증강 생성) 및 자율 에이전트(Agentic AI) 확산에 따른 신규 공격 표면 포괄 |
| 간접 인젝션 및 데이터 오염 | 웹 검색, 문서, 멀티모달 입력을 통한 간접 프롬프트 인젝션 및 파인튜닝/임베딩 데이터 중독 위협 심화 |
| FinOps 및 경제적 피해 통합 | 무제한 자원 소모(LLM10)를 통해 가용성 저해([[DoS (Denial of Service)\|DoS]]) 및 과도한 API 호출 과금(Denial of Wallet) 유발 통제 |

---

## II. OWASP Top 10 for LLM 2025의 개념도 및 10대 핵심 취약점

### 가. LLM 애플리케이션 보안 위협 발생 개념도

```mermaid
flowchart TD
    User("사용자 / 공격자")
    App["LLM Application<br/>(LLM07: 프롬프트 유출)"]
    RAG[("Vector DB / RAG<br/>(LLM08: 임베딩 취약점)")]
    Model{"LLM Model<br/>(LLM04: 모델 오염)"}
    Plugin["외부 API / 플러그인<br/>(LLM06: 과도한 권한)"]
    Supply["Third-Party 생태계<br/>(LLM03: 공급망 위협)"]

    User -- "악성 입력<br/>(LLM01: 인젝션)" --> App
    App -- "문맥 검색" --> RAG
    RAG -. "정보 탈취/변조" .-> App
    App -- "프롬프트 전송" --> Model
    Model -- "생성 결과<br/>(LLM02: 민감정보 유출)" --> App
    Supply -. "악성 모델/코드" .-> Model
    App -- "미검증 실행<br/>(LLM05: 출력 처리 미흡)" --> Plugin
    Plugin -. "API 과금 폭탄<br/>(LLM10: 무제한 자원 소모)" .-> User

```

* 프롬프트 입력부(LLM01)부터 RAG 검색(LLM08), 모델 추론(LLM04), 서드파티 API 연동(LLM06)에 이르는 엔드투엔드([[End-to-End]]) 공격 표면 형상화
* 모델의 환각을 이용한 가짜 정보 유포(LLM09) 및 미검증된 출력 결과물(LLM05)이 직접적인 시스템 침해로 이어지는 보안 흐름 식별

### 나. OWASP Top 10 for LLM 2025 핵심 위협 리스트

| 분류 | 취약점 (요소기술) | 세부 설명 및 주요 위험 |
| --- | --- | --- |
| **입력 통제** | **LLM01: Prompt Injection** | 사용자의 악의적 입력이나 이미지 등 멀티모달 데이터를 통해 모델의 행동을 의도적으로 조작 (직접/간접 인젝션) |
| **정보 유출** | **LLM02: Sensitive Info. Disclosure** | PII, API 크리덴셜, 비공개 비즈니스 데이터 등 민감 정보가 모델의 훈련 데이터나 출력물에 노출 |
| **공급망/데이터** | **LLM03: Supply Chain** | 취약한 서드파티 오픈소스 모델, 라이브러리, 데이터셋, 플러그인을 통해 백도어 및 악성코드 유입 |
| **공급망/데이터** | **LLM04: Data & Model Poisoning** | 학습, 파인튜닝, 임베딩 데이터를 오염시켜 모델의 편향성, 오작동 및 보안 우회 백도어 생성 |
| **출력/실행** | **LLM05: Improper Output Handling** | LLM의 출력값을 적절한 검증/필터링 없이 다운스트림 시스템으로 전달하여 [[XSS]], [[SSRF(Server-Side Request Forgery)\|SSRF]], RCE 등 유발 |
| **출력/실행** | **LLM06: Excessive Agency** | 에이전트에 불필요하게 광범위한 기능, 권한, 자율성을 부여하여 의도치 않은 파괴적 [[트랜잭션]] 수행 허용 |
| **시스템/구조** | **LLM07: System Prompt Leakage** | 시스템 역할, 보안 지침, 백엔드 로직이 담긴 '시스템 프롬프트'를 탈취하여 애플리케이션의 방어 체계 우회 |
| **시스템/구조** | **LLM08: Vector & Embedding Weaknesses** | RAG 아키텍처에서 벡터 검색을 우회하거나 임베딩 역전(Inversion) 공격을 통해 기밀 원본 데이터 대량 유출 |
| **품질/[[HA(High Availability)\|가용성]]** | **LLM09: Misinformation** | 모델이 생성한 거짓/편향된 정보([[할루시네이션]])를 사용자가 과도하게 신뢰하여 발생하는 기업 평판 및 법적 피해 |
| **품질/가용성** | **LLM10: Unbounded Consumption** | 모델 API의 무제한 자원 소모를 유발해 서비스 거부([[DoS (Denial of Service)\|DoS]]) 및 막대한 클라우드 요금(Denial of Wallet) 발생 |

---

## III. 이전 버전(2023)과의 주요 차이점 및 보안 대응 전략

### 가. 2023 버전 대비 2025 버전 주요 트렌드 변경사항

| 비교 항목 | 2023 버전 (v1.1) | 2025 버전 (v2.0) | 핵심 변경 사유 및 의미 |
| --- | --- | --- | --- |
| **시스템 설정 탈취** | LLM01에 일부 포함 | **LLM07: 시스템 프롬프트 유출** | 시스템 통제 지침(System Prompt) 자체가 공격 대상의 핵심 자산으로 격상됨 |
| **데이터 연동망** | 없음 (미분류) | **LLM08: 벡터/임베딩 취약점** | RAG 기술의 보편화로 인해 [[벡터 데이터베이스]] 및 검색 품질 조작 등 공격 표면 세분화 |
| **자원 고갈 공격** | LLM04: Model DoS | **LLM10: 무제한 자원 소모** | 컴퓨팅 과부하(DoS) 뿐만 아니라, API 요금 폭탄을 노리는 경제적 타격(FinOps 리스크) 관점 통합 |

### 나. 안전한 LLM 서비스 구축을 위한 향후 대응 동향
- **RAG 및 벡터 DB 심층 방어**: 벡터 데이터베이스 접근 제어([[RBAC]])를 적용하고 임베딩 역전(Inversion) 공격 방어를 위한 차분 프라이버시 노이즈 주입 및 메타데이터 필터링 내재화.
- **Human-in-the-Loop 에이전트 통제**: 자율 에이전트의 과도한 권한(Excessive Agency) 행사를 통제하기 위해 데이터 삭제, 금융 거래, 외부 전송 등 고위험 액션에 대한 사람의 사전 승인(Approval) 게이트웨이 필수 구축.
- **AI 전용 가드레일 및 레드팀 운영**: NeMo Guardrails, Llama Guard 등 입출력 안전 필터링 레이어를 도입하고, MITRE ATLAS 기반 지속적인 적대적 프롬프트 공격 시뮬레이션(Red Teaming) 수행.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `4. 웹 & 애플리케이션 보안 · 취약점 점검`
- **핵심 연관 토픽**:
  - [[DoS (Denial of Service)]]
  - [[벡터 데이터베이스|벡터 데이터베이스(Vector Database)]]
  - [[위협 모델링|위협 모델링(Threat Modeling) - Secure SDLC]]
  - [[End-to-End]]
  - [[할루시네이션|할루시네이션(Hallucination)]]
