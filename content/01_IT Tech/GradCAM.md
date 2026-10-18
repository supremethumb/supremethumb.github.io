---
title: GradCAM
date: 2026-04-13
tags:
  - 인공지능
---
# Grad-CAM (Gradient-weighted Class Activation Mapping)

---

## I. 딥러닝 비전 모델의 블랙박스를 해소하는 시각적 설명 기법, Grad-CAM의 개요

### 가. Grad-CAM의 정의
[[딥러닝]] 비전 모델([[CNN]])의 예측 결과를 설명하기 위해, 특정 [[클래스]](Class) 예측 시 마지막 합성곱 계층(Convolution Layer)으로 흐르는 기울기(Gradient)를 계산하여 원본 이미지 상의 중요 영역을 히트맵(Heatmap) 형태로 시각화하는 설명 가능한 AI ([[XAI]]) [[알고리즘]]이다.

### 나. Grad-CAM의 필요성 및 특징
| 구분 | 세부 특징 |
| --- | --- |
| 모델 구조 무관성 | 기존 CAM과 달리 GAP 계층 강제나 네트워크 구조 변경 없이 다양한 CNN 백본에 즉시 적용 가능 |
| 설명 가능성 확보 | 특정 클래스 도출의 시각적 판단 근거를 히트맵으로 제시하여 모델 편향 검출 및 신뢰성 증대 |
| 긍정적 영향 필터링 | ReLU 활성화 함수를 통해 클래스 예측 점수를 높이는 데 기여한 양(+)의 활성화 영역만 직관적으로 추출 |

---

## II. Grad-CAM의 개념도 및 핵심 기술 요소

### 가. Grad-CAM의 생성 메커니즘 개념도

```mermaid
flowchart TD
    subgraph Forward_Pass ["순전파 (Forward Pass)"]
        direction LR
        Input["입력 이미지"] --> CNN["CNN 아키텍처"]
        CNN --> FMap["마지막 Feature Map<br/>(채널 k개: A_k)"]
        FMap --> FC["Dense / 분류기"]
        FC --> Score["타겟 클래스 예측 점수<br/>(Class Score, y^c)"]
    end

    subgraph Backward_Pass ["역전파 및 히트맵 생성 (Backward Pass)"]
        direction TB
        Grad["특징맵에 대한 기울기<br/>(∂y^c / ∂A_k)"]
        GAP["Global Average Pooling<br/>채널별 중요도 가중치(α_k^c) 산출"]
        WSum["가중합 (Weighted Sum)<br/>Σ (α_k^c × A_k)"]
        ReLU["ReLU 함수 적용<br/>(긍정적 영향만 필터링)"]
        Heatmap["Grad-CAM 히트맵"]
    end
    
    Score -. "특정 클래스 기준 역전파" .-> Grad
    FMap -. "특징맵 원본 전달" .-> WSum
    Grad --> GAP
    GAP --> WSum
    WSum --> ReLU
    ReLU --> Heatmap
    
    Input ===> Overlay["원본 이미지 위에 히트맵 오버레이<br/>(보간법 통한 크기 복원)"]
    Heatmap ===> Overlay

```

* 모델이 타겟 클래스를 예측한 점수($y^c$)를 기준으로 역전파를 수행하여, 마지막 합성곱 계층의 특징 맵들이 이 예측에 미치는 영향(기울기)을 구함
* 이 기울기들을 GAP(공간 평균) 처리하여 각 채널의 가중치를 구한 뒤, 원래의 특징 맵과 가중합 연산을 수행하고 ReLU로 음의 값을 제거하여 최종 히트맵을 생성함

### 나. Grad-CAM의 핵심 기술 및 구성 요소

| 구분 | 요소기술(키워드) | 세부 설명 및 산출 공식 |
| --- | --- | --- |
| **추출 대상** | Feature Map ($A^k$) | 이미지의 공간적(Spatial) 특징을 유지하고 있는 마지막 합성곱(Conv) 계층의 $k$번째 채널 출력값 |
| **중요도 지표** | Gradient (기울기) | 특정 클래스 점수($y^c$)를 특징 맵 원소로 편미분($\frac{\partial y^c}{\partial A^k}$)하여 구한 국소적 영향력 |
| **가중치 연산** | Global Average Pooling | 계산된 기울기 값들을 너비와 높이 공간(Width $\times$ Height)에 대해 평균을 내어 하나의 가중치 값($\alpha_k^c$)으로 압축 |
| **조합 연산** | Weighted Sum (가중합) | 특징 맵의 각 채널($A^k$)에 산출된 중요도 가중치($\alpha_k^c$)를 선형 결합(곱셈 후 덧셈)하는 과정 |
| **직관성 확보** | ReLU 함수 | 가중합 결과에 $\max(0, x)$ 형태의 ReLU를 통과시켜, 클래스 예측을 방해하는 음(-)의 영향력을 0으로 제거하고 양의 영역만 강조 |
| **시각화 적용** | Bilinear Interpolation | 마지막 합성곱 계층은 원본보다 해상도가 크게 축소되어 있으므로, 이중 선형 보간법을 통해 원본 이미지 크기로 히트맵을 업샘플링(Upsampling) |

---

## III. CAM 아키텍처 비교 및 최신 XAI 동향

### 가. CAM과 Grad-CAM 아키텍처 비교

| 비교 항목 | CAM (Class Activation Mapping) | Grad-CAM |
| --- | --- | --- |
| **가중치 추출 소스** | GAP 계층 이후의 Fully Connected 가중치 | 예측 점수에 대한 **기울기(Gradient)** |
| **아키텍처 제약** | 모델 마지막에 반드시 **GAP(Global Average Pooling) 계층이 존재해야 함** | 제약 없음 (**어떤 형태의 CNN 모델이든 무관**) |
| **모델 재학습 필요성** | GAP가 없는 모델은 구조 변경 후 **재학습(Retraining) 필수** | 구조 변경이 없으므로 **재학습 불필요 (사전 학습 모델 즉시 적용)** |
| **성능 및 유연성** | 특정 구조에 한정되나 결과는 상대적으로 정교함 | 이미지 분류뿐만 아니라 캡셔닝, VQA 등 다양한 멀티모달 태스크에 적용 가능 |

### 나. Grad-CAM의 진화 및 최신 산업 동향

* **고도화된 파생 알고리즘으로의 진화**: 미세 객체 및 다중 타깃 포착을 위해 2차·3차 미분을 반영하는 Grad-CAM++ 및 기울기 소실 영향을 배제한 Score-CAM 등으로 지속 고도화
* **고신뢰성 산업 도메인 필수 탑재**: 의료 영상 진단(X-ray, MRI 병변 추적) 및 [[Smart Car(자율주행)|자율주행]] 인지 모델에서 오작동 방지 및 디버깅을 위한 필수 XAI 검증 도구로 활용
* **규제 대응 및 MLOps 내재화**: EU AI Act 등 글로벌 AI 신뢰성·설명요구권 규제 준수를 위해 모델 배포 전 편향 검증 파이프라인의 핵심 검증 지표로 자동화 연계

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_인공지능_MOC|🤖 인공지능]]
- **세부 분류**: `3. 딥러닝 핵심 아키텍처 & 신경망`
- **핵심 연관 토픽**:
  - [[딥러닝]]
  - [[편향]]
  - [[XAI]]
  - [[CNN|CNN (Convolutional Neural Network)]]
  - [[알고리즘]]
