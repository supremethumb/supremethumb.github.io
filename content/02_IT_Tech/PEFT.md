---
title: PEFT(Parameter-Efficient Fine-Tuning)
date: 2026-09-04
tags:
  - AI
draft: false
aliases:
  - Parameter Efficient Fine Tuning
---
# Parameter-Efficient Fine-Tuning (PEFT)

## I. 거대 언어 모델의 효율적 도메인 적응, PEFT 개요

|구분|내용|
|---|---|
|**정의**|사전학습된 모델의 가중치를 대부분 고정(Freeze)하고, 최소한의 파라미터만 추가·업데이트하여 모델을 미세조정하는 효율적 학습 기법|
|**특징**|- **저비용 고효율**: 소수의 파라미터만 학습하여 연산량 및 GPU 메모리 비용 대폭 절감 - **모듈성**: 단일 기본 모델(Base Model)에 태스크별 가중치를 모듈 형태로 탈부착 가능|

## II. PEFT의 개념도 및 핵심 기술요소

### 가. PEFT의 개념도 및 동작 원리

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 320" width="100%" height="auto" style="max-width: 620px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
    </marker>
    <marker id="arrow-emerald" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#059669" />
    </marker>
    <marker id="arrow-indigo" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#4F46E5" />
    </marker>
  </defs>
  <!-- 배경 카드 -->
  <rect width="620" height="320" fill="#F9FAFB" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <!-- 상단: 입력 데이터 박스 -->
  <rect x="180" y="18" width="260" height="36" rx="6" fill="#F3F4F6" stroke="#4B5563" stroke-width="1.5"/>
  <text x="310" y="41" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1F2937" text-anchor="middle">입력 데이터 x (텍스트 / 이미지)</text>
  <!-- 분기 화살표 (좌측: Pre-trained, 우측: PEFT) -->
  <path d="M 270 54 L 160 82" fill="none" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <path d="M 350 54 L 460 82" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-emerald)"/>
  <!-- 좌측: 사전학습 가중치 (Frozen) -->
  <rect x="40" y="88" width="240" height="64" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="160" y="110" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1E40AF" text-anchor="middle">사전학습 가중치 (Frozen)</text>
  <text x="160" y="128" font-family="system-ui, sans-serif" font-size="12" fill="#1E3A8A" text-anchor="middle">Pre-trained Weight (W)</text>
  <text x="160" y="144" font-family="system-ui, sans-serif" font-size="11" fill="#6B7280" text-anchor="middle">d × k 행렬 (고정)</text>
  <!-- 우측: PEFT 학습 가중치 (Trainable) -->
  <rect x="340" y="88" width="240" height="64" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
  <text x="460" y="110" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#065F46" text-anchor="middle">PEFT 학습 가중치 (Trainable)</text>
  <text x="460" y="128" font-family="system-ui, sans-serif" font-size="12" fill="#064E3B" text-anchor="middle">PEFT Learned Weight (ΔW)</text>
  <text x="460" y="144" font-family="system-ui, sans-serif" font-size="11" fill="#047857" text-anchor="middle">저차원 어댑터 / 파라미터 갱신</text>
  <!-- 하향 화살표 -->
  <line x1="160" y1="152" x2="160" y2="178" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
  <line x1="460" y1="152" x2="460" y2="178" stroke="#059669" stroke-width="1.5" marker-end="url(#arrow-emerald)"/>
  <!-- 좌측 연산 결과 (W·x) -->
  <rect x="70" y="180" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.2"/>
  <text x="160" y="201" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1E3A8A" text-anchor="middle">W · x</text>
  <!-- 우측 연산 결과 (ΔW·x) -->
  <rect x="370" y="180" width="180" height="32" rx="4" fill="#D1FAE5" stroke="#059669" stroke-width="1.2"/>
  <text x="460" y="201" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#064E3B" text-anchor="middle">ΔW · x</text>
  <!-- 하단 병합 화살표 -->
  <path d="M 160 212 L 160 236 Q 160 242 170 242 L 210 242" fill="none" stroke="#4F46E5" stroke-width="1.5"/>
  <path d="M 460 212 L 460 236 Q 460 242 450 242 L 410 242" fill="none" stroke="#4F46E5" stroke-width="1.5"/>
  <line x1="310" y1="225" x2="310" y2="246" stroke="#4F46E5" stroke-width="1.5" marker-end="url(#arrow-indigo)"/>
  <!-- 하단 병합 박스 -->
  <rect x="170" y="250" width="280" height="48" rx="6" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
  <text x="310" y="271" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#3730A3" text-anchor="middle">학습 병합 가산 (합산 출력)</text>
  <text x="310" y="289" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#4338CA" text-anchor="middle">h = W·x + ΔW·x (W_final = W + ΔW)</text>
</svg>

- 원본 거대 모델의 사전학습 가중치는 완전히 보존(동결)하고, 추가된 가중치 변화량(\Delta W)만을 학습·조절하여 효율적으로 미세조정을 수행함

### 나. PEFT의 핵심 기술요소

|구분|기술|설명|
|---|---|---|
|**재매개변수화**|**LoRA** _(Low-Rank Adaptation)_|가중치 변화량(\Delta W)을 저순위(Low-Rank) 행렬 분해(A \times B)로 근사 학습|
|**양자화 결합**|**QLoRA**|기본 모델을 **4-bit NormalFloat (NF4)**로 양자화하여 단일 GPU 메모리 내 학습 지원|
|**추가형 (Additive)**|**Adapter**|트랜스포머 레이어 사이에 병렬 또는 직렬로 소형 피드포워드 신경망을 삽입하여 학습|
||**Prefix-Tuning**|Attention 키(K)와 밸류(V) 앞에 학습 가능한 **가상 토큰 텐서를 추가**하여 최적화|
||**Prompt-Tuning**|입력 임베딩 공간에 학습 가능한 소수의 **Soft Prompt 텐서만 추가**하여 튜닝|
|**선택형 (Selective)**|**BitFit**|전체 모델 중 레이어의 **편향(Bias) 파라미터만 선택적**으로 미세조정|
|**확장형 (Advanced)**|**(IA)^3**|내부 활성화 함수에 스케일링 벡터를 요소별 곱(Element-wise Multiplication) 연산|
||**AdaLoRA**|파라미터 중요도에 따라 랭크(Rank) 할당을 동적으로 제어하는 **적응형 LoRA** 기법|

- 미세조정을 통한 효율적 튜닝 기법을 토대로 목적에 맞는 기법 선택 가능

## III. 유사 기술 비교 및 향후 전망

### 가. PEFT vs Full Fine-Tuning 비교

|항목|PEFT|Full Fine-Tuning|
|---|---|---|
|**학습 대상**|소규모 파라미터 조절 (통상 전체의 0.1% ~ 1% 미만)|모델 전체 파라미터 (100%)|
|**비용/자원**|매우 낮음 (단일 컨슈머 GPU 환경에서도 학습 가능)|매우 높음 (대규모 분산 GPU 클러스터 인프라 필수)|
|**파국적 망각**|방지 가능 (사전학습 가중치 보존으로 일반화 성능 유지)|발생 위험 높음 (새로운 데이터셋 학습 시 기존 지식 소실)|
|**배포/확장성**|기본 모델 1개에 경량 어댑터 가중치만 교체 서빙|파인튜닝 모델마다 전체 가중치를 개별 저장하여 비효율|

### 나. 향후 전망

- **RAG 시스템 고도화**: 검색 기반 정보 제공(RAG)과 도메인 특화 경량 어댑터(PEFT)의 결합을 통해 환각 현상 최소화 및 전문성 극대화
- **On-Device AI 활성화**: 모바일 및 임베디드 기기 등 리소스 제약 환경에서 실시간 개인화 로컬 파인튜닝 가속화