---
title: BERT
date: 2026-04-13
tags:
  - 인공지능
---
# BERT

---

## I. 양방향 문맥 이해 기반 사전학습 언어모델, BERT의 개요

### 가. 정의

- 구글이 제안한 [[트랜스포머]](Transformer)의 인코더(Encoder) 아키텍처를 기반으로, 대규모 텍스트 코퍼스를 양방향으로 동시에 학습하여 심층적인 문맥 표현을 도출하는 사전학습(Pre-trained) 언어 모델

### 나. 주요 특징

| 구분 | 주요 내용 |
| --- | --- |
| 완전한 양방향 문맥 | 기존 단방향(GPT)이나 얕은 결합(ELMo)과 달리 단어의 좌우 양방향 문맥을 Self-Attention으로 동시 포착 |
| 혁신적 사전학습 과제 | 단어의 15%를 가리고 맞히는 마스크 언어 모델(MLM)과 문장 간 인접성을 판단하는 다음 문장 예측(NSP) 적용 |
| 사전학습-미세조정 패러다임 | 대규모 말뭉치로 범용 표현을 사전학습(Upstream)한 후, 분류·QA 등 세부 작업(Downstream)에 맞게 미세조정 |
| 서브워드 토큰화 | WordPiece 알고리즘을 적용하여 신조어 및 희귀 단어에 대한 미등록 어휘(OOV) 문제 근본적 해결 |

## II. BERT의 아키텍처 및 핵심 구성요소

### 가. BERT의 아키텍처 및 동작 원리

```mermaid
flowchart TD
    subgraph "Input Representation (입력 임베딩)"
        direction TB
        T["Token Embeddings<br/>(WordPiece, [CLS], [SEP])"]
        S["Segment Embeddings<br/>(Sentence A / B 구분)"]
        P["Position Embeddings<br/>(문장 내 위치 정보)"]
    end

    subgraph "Transformer Encoder Block"
        direction TB
        MHA["Multi-Head Attention<br/>(Self-Attention)"]
        ADD1["Add & Norm"]
        FFN["Feed Forward Network"]
        ADD2["Add & Norm"]

        MHA --> ADD1
        ADD1 --> FFN
        FFN --> ADD2
    end

    T & S & P -- "합산(Element-wise Sum)" --> SUM((+))
    SUM --> MHA

    OUT["Contextualized Representations<br/>(문맥이 반영된 최종 출력 벡터)"]
    ADD2 --> OUT

    style SUM fill:#f9f9f9,stroke:#333
    style MHA fill:#e6f3ff,stroke:#0066cc
    style FFN fill:#e6f3ff,stroke:#0066cc

```

* 입력 텍스트는 Token, Segment, Position 3가지 임베딩의 합산으로 구성되며, 여러 층의 트랜스포머 인코더 블록(Self-Attention)을 통과하며 주변 단어들과의 관계가 완벽히 반영된 벡터를 출력함.

### 나. BERT의 핵심 기술 요소

| 분류 | 요소기술(키워드) | 세부 설명 |
| --- | --- | --- |
| **핵심 아키텍처** | **Transformer Encoder** | 순환 신경망([[RNN (Recurrent Neural Network)\|RNN]]) 없이 Self-Attention 메커니즘만을 사용하여 병렬 처리를 수행하고 양방향 문맥을 동시에 파악하는 신경망 |
| **입력 처리** | **WordPiece Tokenizer** | BPE(Byte Pair Encoding) 기반으로 서브워드(Subword) 단위 토큰화를 수행하여 미등록 단어(OOV) 문제를 해결하는 기법 |
| **입력 처리** | **[CLS] / [SEP] 토큰** | [CLS]는 문장 전체의 요약 정보를 담는 분류용 토큰이며, [SEP]는 두 문장(예: 질의와 응답)을 논리적으로 분리하는 경계 토큰 |
| **사전학습(PT)** | **MLM (Masked Language Model)** | 전체 입력 토큰의 약 15%를 무작위로 마스킹([MASK])한 후, 양쪽 문맥을 모두 활용하여 가려진 원래 단어를 예측하는 방식 |
| **사전학습(PT)** | **NSP (Next Sentence Prediction)** | 두 문장(A, B)을 입력받아, 문장 B가 문장 A의 논리적인 '다음 문장'인지 여부(IsNext / NotNext)를 이진 분류로 예측 |
| **[[전이학습]]** | **Fine-tuning (미세 조정)** | 사전학습을 마친 범용 모델의 가중치를 초기값으로 사용하여, 질의응답(QA), 개체명 인식(NER) 등 특정 태스크에 맞게 파라미터를 미세 업데이트 |

---

## III. BERT와 GPT 비교 및 향후 전망

### 가. 대표적인 대규모 언어 모델 아키텍처 (BERT vs GPT) 비교

| 비교 항목 | BERT (Bidirectional Encoder Rep.) | GPT (Generative Pre-trained Transformer) |
| --- | --- | --- |
| **기반 아키텍처** | 트랜스포머의 **인코더(Encoder)** 기반 | 트랜스포머의 **디코더(Decoder)** 기반 |
| **학습 방향** | **양방향 (Bidirectional)** | **단방향 (Unidirectional, Left-to-Right)** |
| **주요 사전학습** | MLM (마스크 토큰 예측), NSP (다음 문장 예측) | 다음 단어 예측 (Autoregressive Language Modeling) |
| **강점 분야** | 자연어 이해 (NLU): 문장 분류, 감성 분석, 형태소 분석 | 자연어 생성 (NLG): 텍스트 생성, 번역, 대화(Chat) |
| **주요 변형 모델** | RoBERTa, ALBERT, DistilBERT, KoBERT | GPT-3, GPT-4, LLaMA, Claude |

### 나. BERT의 최신 트렌드 및 향후 전망

- **RAG 및 시맨틱 검색의 핵심 임베딩 엔진으로 정착**: 텍스트 생성 작업은 거대 디코더 모델(GPT 등)로 이동했으나, 벡터 검색 및 지식베이스 구축을 위한 고정밀 밀집 임베딩(Dense Embedding) 분야에서는 BERT/RoBERTa 기반 인코더가 독보적 표준으로 활용
- **경량화 및 증류(Knowledge Distillation) 고도화**: 온디바이스 및 실시간 서빙 환경을 위해 모델 크기와 추론 시간을 획기적으로 줄인 DistilBERT, MobileBERT 등 지식 증류 기반의 초경량화 모델 도입 활성화
- **도메인 특화 및 다국어 모델 확장**: 바이오/의료(BioBERT), 법률(LegalBERT), 한국어(KoBERT) 등 전문 산업 도메인 특화 사전학습 모델과 다국어 통합 모델(mBERT)을 통한 크로스링구얼 NLU 인프라 구축 지속

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_인공지능_MOC|🤖 인공지능]]
- **세부 분류**: `3. 딥러닝 핵심 아키텍처 & 신경망`
- **핵심 연관 토픽**:
  - [[트랜스포머|트랜스포머(Transformer)]]
  - [[전이학습|전이학습 (Transfer Learning)]]
  - [[초거대 언어 모델|초거대 언어 모델(Large Language Model)]]
  - [[RNN (Recurrent Neural Network)]]
  - [[자기 집중]]
