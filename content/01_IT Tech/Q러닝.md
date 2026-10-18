---
title: Q러닝
date: 2026-04-13
tags:
  - 인공지능
---
# Q-러닝 (Q-Learning)

---

## I. 모델 프리 강화학습의 대표적 가치 기반 알고리즘, Q-러닝의 개요

### 가. Q-러닝의 정의
에이전트(Agent)가 환경(Environment)에 대한 사전 모델(전이/보상 확률) 없이, 시행착오를 통해 각 상태에서 특정 행동을 취했을 때 기대되는 미래 보상의 최댓값인 상태-행동 가치 함수(Q-Value)를 반복 갱신하여 최적 정책을 찾는 [[모델 프리]](Model-Free) 오프 폴리시(Off-Policy) [[강화학습]] [[알고리즘]]이다.

### 나. Q-러닝의 등장 배경 및 특징
| 구분 | 세부 특징 |
| --- | --- |
| 환경 모델 불필요 (Model-Free) | 상태 전이 확률과 보상 함수를 수학적으로 사전 정의할 수 없는 복잡한 현실 환경에 직접 상호작용 적용 |
| 오프 폴리시 (Off-Policy) 학습 | 행동 선택 정책($\epsilon$-greedy)과 무관하게 다음 상태의 최대 가치($\max Q$)를 기준으로 타깃 정책을 최적화 |
| 벨만 최적 방정식 기반 갱신 | 시간차(Temporal Difference) 학습을 통해 에피소드가 끝나기 전에도 단계별 즉각적 가치 함수 갱신 가능 |

---

## II. Q-러닝의 아키텍처 및 핵심 구성요소

### 가. Q-러닝의 동작 메커니즘 및 갱신 흐름도

```mermaid
flowchart TD
    subgraph Environment ["환경 (Environment)"]
        S_t["현재 상태 S_t"]
    end

    subgraph Agent ["에이전트 (Agent)"]
        direction TB
        Action["1. 행동 선택 (Action A_t)<br/>- ε-greedy 정책 활용"]
        Update["3. Q-값 갱신 (Q-learning Update)<br/>- 벨만 최적 방정식 적용"]
    end

    subgraph Q_Table ["Q-테이블 (Q-Table)"]
        Table[("State x Action Matrix<br/>Q(s, a) 값 저장")]
    end

    S_t --> Action
    Action -->|"행동 수행"| Env_Feedback["환경으로부터 보상 R_(t+1)<br/>및 다음 상태 S_(t+1) 수신"]
    Env_Feedback --> Update
    Table -.->|"기존 Q(s, a) 조회"| Update
    Update ==>|"최신화된 Q(s, a) 저장"| Table

    style Q_Table fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px
    style Update fill:#e8f5e9,stroke:#43a047,stroke-width:2px

```

* 에이전트는 상태 $S_t$에서 **$\epsilon$-greedy 정책** 등을 통해 행동 $A_t$를 선택하고, 환경으로부터 보상 $R_{t+1}$과 다음 상태 $S_{t+1}$을 얻음
* 얻은 경험을 바탕으로 벨만 최적 방정식(Bellman Optimality Equation)에 기반한 **TD(Temporal Difference) 오차**를 계산하여 Q-테이블의 값을 갱신함

### 나. Q-러닝의 핵심 수학적 모델링 및 구성 요소

| 분류 | 요소기술(키워드) | 세부 설명 및 공식 |
| --- | --- | --- |
| **핵심 가치** | Q-Value ($Q(s, a)$) | 상태 $s$에서 행동 $a$를 선택했을 때 얻을 수 있는 할인된 미래 누적 보상의 기댓값 |
| **갱신 규칙** | Q-Learning Update Equation | $Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha \left[ R_{t+1} + \gamma \max_{a} Q(s_{t+1}, a) - Q(s_t, a_t) \right]$ |
| **학습률** | Learning Rate ($\alpha$) | 새롭게 학습한 정보가 기존 Q-값에 반영되는 비율 ($0 < \alpha \le 1$). 값이 클수록 최신 경험을 신뢰 |
| **할인율** | Discount Factor ($\gamma$) | 미래 보상을 현재 가치로 환산하는 비율 ($0 \le \gamma < 1$). 1에 가까울수록 장기적 보상 중시 |
| **탐험 제어** | $\epsilon$-greedy 정책 | 확률 $\epsilon$으로는 무작위 행동(Exploration)을 하고, $1-\epsilon$으로는 현재 가장 높은 Q값을 가진 행동(Exploitation)을 선택 |
| **오프 폴리시** | Off-Policy 특성 | 행동을 선택하는 정책(Behavior Policy, $\epsilon$-greedy)과 최적 가치를 학습하는 정책(Target Policy, $\max$)이 서로 다름 |

---

## III. 가치 기반 강화학습 알고리즘 비교 및 최신 동향

### 가. 대표적 가치 기반 강화학습 알고리즘 비교 (Q-learning vs SARSA vs DQN)

| 비교 항목 | Q-learning | SARSA | DQN (Deep Q-Network) |
| --- | --- | --- | --- |
| **정책 유형** | **오프 폴리시 (Off-Policy)** | 온 폴리시 (On-Policy) | 오프 폴리시 (Off-Policy) |
| **갱신 기준** | 다음 상태에서의 **최대 Q값 ($\max Q$)** 이용 | 다음 상태에서 실제 취할 **행동의 Q값 ($Q(s', a')$)** 이용 | 신경망(Neural Network) 기반 비선형 Q함수 근사 |
| **대상 공간** | 이산적(Discrete) 상태-행동 공간 (테이블 형태) | 이산적 상태-행동 공간 | **고차원 연속적 상태 공간 (아타리 게임 등)** |
| **안정성** | 수렴성 보장되나 상태가 커지면 메모리 한계 | 정책 내 탐험 요소가 반영되어 안전한 경로 학습 | **경험 재현(Experience Replay)**과 타겟 네트워크로 안정성 확보 |

### 나. 한계 극복 및 최신 발전 동향

* **심층 신경망 결합(DQN)을 통한 차원의 저주 극복**: 상태-행동 공간이 무한히 확장될 때 Q-테이블의 메모리 한계를 극복하기 위해 심층 인공신경망으로 Q함수를 근사하는 심층 Q-네트워크(DQN)로 발전
* **과대평가 및 안정성 보완 알고리즘 고도화**: 최대화 연산으로 인한 Q값 과대평가를 완화하는 Double DQN, 상태 가치와 행동 이점을 분리한 Dueling DQN으로 구조적 진화
* **액터-크리틱(Actor-Critic) 및 LLM 정렬 확장**: 연속적 물리 제어를 위한 DDPG, PPO, SAC 알고리즘으로 발전하였으며 최근 거대언어모델의 인간 선호도 정렬(RLHF) 파이프라인의 핵심 기반 기술로 채택

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_인공지능_MOC|🤖 인공지능]]
- **세부 분류**: `2. 머신러닝 기초 & 핵심 알고리즘`
- **핵심 연관 토픽**:
  - [[강화학습]]
  - [[모델 프리]]
  - [[동적 계획법|동적 계획법 (Dynamic Programming)]]
  - [[초거대 언어 모델|초거대 언어 모델(Large Language Model)]]
  - [[Smart Car(자율주행)]]
