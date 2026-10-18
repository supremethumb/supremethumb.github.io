---
title: 에이전틱 AI(Agentic AI)
date: 2026-04-22
tags:
  - 인공지능
---
# 에이전틱 AI (Agentic AI)

---

## I. 자율적 문제 해결을 위한 능동형 인공지능, 에이전틱 AI의 개요

### 가. 에이전틱 AI(Agentic AI)의 정의
- 대규모 언어 모델(LLM)을 추론 및 의사결정의 두뇌로 삼아, 인간의 지속적 개입 없이 스스로 목표를 분할 계획하고 외부 도구를 호출하며 자기 반성을 통해 과업을 자율 완결하는 능동형 인공지능 시스템이다.

### 나. 에이전틱 AI의 등장 배경 및 주요 특징

| 구분 | 주요 내용 |
| --- | --- |
| 단발성 챗봇 한계 극복 | 1회성 프롬프트-응답의 수동적 인터랙션을 넘어, 다단계 비즈니스 프로세스를 종단간 자율 수행 |
| 자율 계획 및 자기 반성 | 복합 목표를 세부 작업으로 분할(Planning)하고, 실행 실패 시 ReAct 및 자기 수정(Self-Correction) 반복 |
| 도구 및 환경 상호작용 | 웹 검색, 코드 인터프리터, 사내 ERP/CRM API(MCP 프로토콜) 등을 능동적으로 호출하여 액션 수행 |
| 다중 에이전트 협업 | 단일 에이전트 한계를 극복하기 위해 기획-개발-검증 등 역할을 분담한 멀티 에이전트(MAS) 협력 체계 구현 |

---

## II. 에이전틱 AI의 개념도 및 핵심 기술 요소

### 가. 에이전틱 AI의 아키텍처 및 동작 원리

```mermaid
flowchart TB
    User["사용자 (User)"]
    
    subgraph Agentic_Architecture ["에이전틱 AI 코어 (Agent Core)"]
        direction TB
        LLM["대규모 언어 모델 (LLM)<br/>- 추론 및 인지 엔진"]
        
        subgraph Components ["에이전트 모듈"]
            direction LR
            Memory["메모리 (Memory)<br/>- 단기/장기 기억"]
            Planning["계획 (Planning)<br/>- 작업 분할 및 반성"]
            Tools["도구 (Tools)<br/>- API, 검색, 코드 인터프리터"]
        end
        
        LLM <--> Components
    end
    
    subgraph Environment ["외부 환경 (External Environment)"]
        direction LR
        Web["웹 검색"]
        DB["내부 데이터베이스 (Vector DB)"]
        API["외부 시스템 API (MCP 등)"]
    end

    User ==>|"추상적/복잡한 목표 제시"| Agentic_Architecture
    Agentic_Architecture ==>|"Action (실행)"| Environment
    Environment -.->|"Observation (결과 및 피드백)"| Agentic_Architecture
    
    %% Planning Feedback Loop
    Components -. "Self-Correction<br/>(반복 수행)" .-> Components

```

* 사용자가 추상적인 목표를 주면, 에이전트는 LLM을 기반으로 계획(Plan)을 세우고, 메모리를 참조하며, 외부 도구를 호출하여 액션(Action)을 수행함
* 액션의 결과를 관찰(Observation)하고 목표 달성 여부를 스스로 반성(Reflection)하여 계획을 수정하는 피드백 루프(Loop)로 동작함

### 나. 에이전틱 AI의 핵심 기술 및 구성 요소

| 구분 | 요소 기술 (키워드) | 세부 설명 |
| --- | --- | --- |
| **두뇌 / 인지** | **LLM (Large Language Model)** | 에이전트의 중심에서 컨텍스트를 이해하고 의사결정(Reasoning)을 수행하는 지능 코어 엔진 |
| **추론 및 계획** | **Planning & Reflection** | 복잡한 작업을 하위 태스크로 분할([[COT\|CoT]], [[ToT]])하고, 실행 결과를 평가하여 스스로 오류를 수정하는 자기 반성 기법 |
| **도구 활용** | **Function Calling / Tool Use** | LLM이 외부 웹 검색, 계산기, 코드 실행기, 사내 시스템 API 등을 스스로 호출하고 결과를 해석하는 기술 |
| **기억 장치** | **Memory (단기 / 장기)** | 단기 기억(현재 세션의 프롬프트 컨텍스트)과 장기 기억(Vector DB를 통한 과거 경험 및 지식)의 통합 관리 |
| **실행 및 관찰** | **Action & Observation** | ReAct(Reasoning and Acting) 프레임워크를 기반으로 환경과 상호작용하고 상태 변화를 인지하는 메커니즘 |
| **협업 체계** | **Multi-Agent System ([[MAS (Multi Agent System)\|MAS]])** | 코더, 리뷰어, 기획자 등 각기 다른 역할을 부여받은 다수의 에이전트가 상호 소통하며 협업 (AutoGen, CrewAI) |
| **데이터 연동** | **[[MCP\|MCP (Model Context Protocol)]]** | AI 에이전트가 안전하고 표준화된 방식으로 외부 데이터 소스 및 로컬 환경과 통신하기 위한 개방형 [[프로토콜]] |
| **[[프레임워크]]** | **LangChain / LlamaIndex** | 에이전틱 워크플로우를 구현하고 LLM과 다양한 도구, 메모리를 결합하기 위한 애플리케이션 개발 프레임워크 |

---

## III. 전통적 생성형 AI와의 비교 및 최신 동향

### 가. 전통적 생성형 AI(대화형)와 에이전틱 AI 비교

| 비교 항목 | 전통적 생성형 AI (Chatbot) | 에이전틱 AI (Autonomous Agent) |
| --- | --- | --- |
| **작동 방식** | 수동적 (사용자의 프롬프트에 단발성 응답) | **능동적 / 자율적** (스스로 목표 달성 시까지 순환 실행) |
| **문제 해결 방식** | 단일 스텝 추론 (Single-step) | **다단계 계획 및 실행 (Multi-step Planning)** |
| **외부 연동성** | 제한적 (사전 학습된 가중치에 주로 의존) | **적극적** (외부 도구, API, 코드 인터프리터 주도적 활용) |
| **오류 제어** | 사용자의 후속 프롬프트를 통한 수동 정정 | **자기 반성(Self-Reflection)을 통한 자동 오류 수정** |

### 나. 에이전틱 AI의 최신 트렌드 및 향후 전망
- **에이전틱 워크플로우(Agentic Workflow)의 표준화**: 단순한 제로샷 프롬프팅을 넘어 반성(Reflection), 도구 활용(Tool Use), 계획(Planning), 멀티에이전트 협업(Multi-agent Collaboration)의 4대 설계 패턴이 엔터프라이즈 AI의 사실상 표준 아키텍처로 정착.
- **멀티 에이전트 협업 체계 확산**: 단일 거대 모델의 환각과 문맥 길이 한계를 극복하기 위해 AutoGen, CrewAI 등을 활용하여 'PM-아키텍트-개발자-QA' 형태의 전문화된 자율 에이전트 조직화 급증.
- **범용 인공지능([[AGI]]) 및 초자동화 촉매**: 기존 단순 규칙 기반 RPA를 대체하여 예외 상황에 자율적으로 적응·대처하는 지능형 하이퍼오토메이션(Hyperautomation)으로 진화하며 실질적 AGI 구현의 핵심 마일스톤으로 부상.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_인공지능_MOC|🤖 인공지능]]
- **세부 분류**: `2. 머신러닝 기초 & 핵심 알고리즘`
- **핵심 연관 토픽**:
  - [[인공지능]]
  - [[AGI|범용 인공지능]]
  - [[전용 인공지능]]
  - [[MAS (Multi Agent System)]]
