---
title: 2PL (Two-Phase Locking Protocol)
date: 2026-03-27
tags:
  - 데이터베이스
---
# 2PL (Two-Phase Locking Protocol)

---

## I. 트랜잭션 직렬성 보장을 위한 동시성 제어 기법, 2PL의 개요

### 가. 2PL(2단계 로킹)의 정의

- 트랜잭션의 잠금(Lock)과 잠금 해제(Unlock)를 확장 단계(Growing Phase)와 수축 단계(Shrinking Phase)로 명확히 구분하여 수행함으로써 직렬성(Serializability)을 보장하는 동시성 제어 규약.
- 데이터 무결성을 위해 모든 트랜잭션이 Lock 연산만 수행할 수 있는 단계와 Unlock 연산만 수행할 수 있는 단계로 나누어 실행하는 [[프로토콜]].
### 나. 핵심 키워드

- 직렬성(Serializability), 확장/수축 단계(Growing/Shrinking Phase), 차단 포인트(Lock Point), [[교착상태]](Deadlock).

---

## II. 2PL의 동작 메커니즘 및 단계별 특징

### 가. 2PL 동작 메커니즘 도식화 (차별화: Lock Point 중심의 그래프)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" width="100%" height="auto" style="max-width: 700px; width: 100%; height: auto; display: block; margin: 1.5rem auto;">
  <defs>
    <!-- 축 화살표 마커 정의 -->
    <marker id="axis-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
    </marker>
  </defs>

  <!-- 전체 배경 (다크모드 대응을 위한 명시적 밝은 배경) -->
  <rect width="700" height="420" fill="#FFFFFF" rx="10" stroke="#E5E7EB" stroke-width="1.5"/>

  <!-- ==========================================
       [1] 영역 배경 (확장 단계 / 수축 단계)
       ========================================== -->
  <!-- 확장 단계 (파란색 영역) -->
  <polygon points="140,360 350,120 350,360" fill="#EFF6FF" />
  <!-- 수축 단계 (노란/주황색 영역) -->
  <polygon points="350,120 560,360 350,360" fill="#FFFBEB" />

  <!-- ==========================================
       [2] 안내선 및 그래프 선
       ========================================== -->
  <!-- Max 수평 안내선 (점선) -->
  <line x1="80" y1="120" x2="350" y2="120" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="4 4" />
  <!-- Lock Point 수직 안내선 (점선) -->
  <line x1="350" y1="120" x2="350" y2="360" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="4 4" />

  <!-- 확장 단계 그래프 선 (두꺼운 파란선) -->
  <line x1="140" y1="360" x2="350" y2="120" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" />
  <!-- 수축 단계 그래프 선 (두꺼운 주황선) -->
  <line x1="350" y1="120" x2="560" y2="360" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />

  <!-- ==========================================
       [3] X축 / Y축
       ========================================== -->
  <!-- X축 (Time) -->
  <line x1="80" y1="360" x2="650" y2="360" stroke="#6B7280" stroke-width="2" marker-end="url(#axis-arrow)" />
  <!-- Y축 (Number of Locks) -->
  <line x1="80" y1="360" x2="80" y2="60" stroke="#6B7280" stroke-width="2" marker-end="url(#axis-arrow)" />

  <!-- ==========================================
       [4] 텍스트 및 라벨
       ========================================== -->
  <!-- Y축 라벨 -->
  <text x="80" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="middle">Number of Locks</text>
  <!-- X축 라벨 -->
  <text x="650" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="end">Time</text>
  
  <!-- Y축 'Max' 라벨 -->
  <text x="70" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="end">Max</text>

  <!-- X축 하단 구간 라벨 -->
  <text x="140" y="385" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="middle">Start</text>
  <text x="560" y="385" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#4B5563" text-anchor="middle">End</text>
  <text x="350" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#6B7280" text-anchor="middle">(연산 수행)</text>

  <!-- 확장 단계 라벨 -->
  <text x="245" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold" fill="#1E40AF" text-anchor="middle">[확장 단계]</text>
  <text x="245" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#2563EB" text-anchor="middle">(Lock Only)</text>

  <!-- 수축 단계 라벨 -->
  <text x="455" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold" fill="#92400E" text-anchor="middle">[수축 단계]</text>
  <text x="455" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#D97706" text-anchor="middle">(Unlock Only)</text>

  <!-- ==========================================
       [5] Lock Point 마커 및 강조 라벨
       ========================================== -->
  <!-- Lock Point 빨간색 점 -->
  <circle cx="350" cy="120" r="5" fill="#EF4444" />
  
  <!-- Lock Point 라벨 박스 -->
  <rect x="230" y="70" width="240" height="30" rx="15" fill="#FEF2F2" stroke="#F87171" stroke-width="1.5" />
  <text x="350" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#991B1B" text-anchor="middle">Lock Point: 모든 Lock 획득 시점</text>

</svg>


- 도식화 포인트: 시간(Time)에 따른 락의 개수(Number of Locks) 변화를 삼각형 형태로 표현. 정점(Lock Point)을 기준으로 좌측은 락 획득만 가능하고(Unlock 불가), 우측은 락 해제만 가능함(Lock 불가)을 시각적으로 강조.
### 나. 2PL의 2단계 구성

| 단계 | 영문 명칭 | 수행 내용 및 특징 |
| --- | --- | --- |
| 1. 확장 단계 | Growing Phase<br>(Expanding) | - 트랜잭션은 새로운 Lock(S-lock, X-lock)을 획득할 수만 있고, 해제(Unlock)할 수는 없는 단계.<br>- 필요한 모든 자원을 확보해 나가는 과정. |
| 2. 차단 포인트 | Lock Point | - 트랜잭션이 필요한 모든 Lock을 획득한 시점.<br>- 이 시점 이후부터는 Lock 해제만 가능함. |
| 3. 수축 단계 | Shrinking Phase | - 보유한 Lock을 해제(Unlock)할 수만 있고, 새로운 Lock을 획득할 수는 없는 단계.<br>- 점진적으로 자원을 반납하는 과정. |

---

## III. 2PL의 한계점 및 고도화 유형 (변형 기법)

### 가. 2PL의 한계: 연쇄 복귀(Cascading Rollback) 및 교착상태(Deadlock)

- 단순 2PL은 직렬성은 보장하지만, 교착상태(Deadlock) 발생 가능성이 있으며, 연쇄 복귀(Cascading Rollback) 문제를 완벽히 해결하지 못함.
### 나. 2PL의 고도화 유형 비교 (S.R.S)

| 유형 | 특징 및 차별점 | 해결 문제 |
| --- | --- | --- |
| Strict 2PL<br>(엄밀한 2PL) | - 모든 전용 락(Exclusive Lock)을 트랜잭션이 완료(Commit/Abort)될 때까지 유지.<br>- 대부분의 상용 [[DBMS]]가 채택. | 연쇄 복귀 방지<br>(Cascading Rollback) |
| Rigorous 2PL<br>(엄격한 2PL) | - 모든 락(S-lock, X-lock)을 [[트랜잭션]] 완료 시까지 유지.<br>- Strict 2PL보다 더 제한적이며 구현이 단순함. | 직렬화 완벽 보장<br>구현 용이성 |
| Static 2PL<br>(정적 2PL) | - 트랜잭션 시작 전 필요한 모든 자원을 미리 Lock (Pre-claiming).<br>- 실행 중 추가 Lock 요청 없음. | 교착상태(Deadlock)<br>예방 |

---
## IV. 결론 및 제언

- 교착상태 해결: 2PL은 교착상태를 발생시킬 수 있으므로 Wait-Die, Wound-Wait 기법이나 교착상태 탐지(Detection) 기법과 병행하여 사용해야 함.
- 실무 적용: 성능과 무결성의 트레이드오프를 고려하여 Strict 2PL이 주로 사용되며, 최근에는 MVCC(다중버전 동시성 제어)와 결합하여 동시성을 극대화하는 추세임.

---
# 2상 잠금 프로토콜 (Two-Phase Locking Protocol, 2PL / 2PLP)

---

## I. 2상 잠금 프로토콜(2PL)의 개요

**정의:** 트랜잭션의 직렬성(Serializability)을 보장하기 위해, 모든 트랜잭션이 데이터 항목에 대한 잠금(Lock) 획득과 해제(Unlock)를 두 개의 독립된 위상(Phase)으로 명확히 구분하여 수행하도록 규제하는 대표적인 비관적 [[병행 제어]] 기법입니다.

**주요 특징:**

- **직렬가능성 보장:** 2PL 규약을 준수하는 모든 트랜잭션 일정(Schedule)은 충돌 직렬가능(Conflict Serializable)함이 수학적으로 증명되어 데이터 일관성을 강력히 보장합니다.
- **[[교착상태]](Deadlock) 발생 가능성:** 두 개 이상의 트랜잭션이 서로 잠금을 해제하기를 기다리는 교착상태가 구조적으로 발생할 수 있으므로, 별도의 탐지 및 회복 기법이 요구됩니다.
- **[[연쇄 롤백]](Cascading Rollback) 위험:** 기본 2PL은 잠금 해제 후 트랜잭션이 실패할 경우, 해당 데이터를 읽어간 다른 트랜잭션들까지 연쇄적으로 취소해야 하는 문제가 발생할 수 있습니다.

---

## II. 2PL의 핵심 동작 메커니즘 (2가지 단계)

2PL은 트랜잭션의 실행을 **확장 단계**와 **수축 단계**로 나누며, 한 번 잠금을 해제하기 시작하면 더 이상 새로운 잠금을 획득할 수 없다는 단일 규칙을 적용합니다.

| **위상 (Phase)**              | **수행 가능 연산**   | **제약 사항 및 특징**                                                             |
| --------------------------- | -------------- | -------------------------------------------------------------------------- |
| **확장 단계 (Growing Phase)**   | 잠금 획득 (Lock)   | 새로운 데이터 항목에 대해 Lock(공유/배타)을 획득할 수 있으나, **기존에 보유한 Lock을 해제(Unlock)할 수는 없음** |
| **잠금점 (Lock Point)**        | -              | 트랜잭션이 필요로 하는 모든 Lock을 획득한 시점 (확장 단계가 끝나고 수축 단계로 넘어가는 경계점)                  |
| **수축 단계 (Shrinking Phase)** | 잠금 해제 (Unlock) | 보유하고 있던 Lock을 점진적으로 해제할 수 있으나, **새로운 Lock을 다시 획득할 수는 없음**                  |

---

## III. 2PL의 한계 극복을 위한 변형 기법 및 최신 동향

**1. 2PL의 문제점 해결을 위한 확장(변형) 프로토콜**

기본 2PL의 '연쇄 롤백' 및 '교착상태' 문제를 해결하기 위해 다음과 같은 변형 기법들이 상용 RDBMS에 적용되고 있습니다.

| **변형 기법** | **핵심 원리** | **해결되는 문제 및 특징** |
| --- | --- | --- |
| **Strict 2PL (엄격한 2PL)** | 모든 **배타적 잠금(Exclusive Lock)**을 트랜잭션이 커밋(Commit)되거나 롤백(Rollback)될 때까지 해제하지 않고 유지 | 완료되지 않은 갱신 데이터를 타 트랜잭션이 읽는 것을 방지하여 **연쇄 롤백을 원천 차단** (대부분의 상용 DBMS 채택) |
| **Rigorous 2PL (강건한 2PL)** | 배타적 잠금뿐만 아니라 **공유 잠금(Shared Lock)**을 포함한 모든 잠금을 트랜잭션 종료 시점까지 유지 | 구현이 단순하고 트랜잭션 간의 직렬화 순서가 커밋 순서와 일치함 (동시성은 다소 저하됨) |
| **Conservative 2PL (보수적 2PL)** | 트랜잭션 시작 시점에 필요한 **모든 데이터의 잠금을 한 번에 미리 획득** (사전 획득 실패 시 대기) | 실행 중 잠금을 기다릴 필요가 없으므로 **교착상태(Deadlock)가 발생하지 않음** (단, 자원 활용도가 낮음) |

### 2. 분산 데이터베이스(NewSQL) 환경에서의 2PL 기술 동향

- **2PC(Two-Phase Commit)와의 결합:** Google Spanner, [[CockroachDB]] 등 최신 글로벌 분산 데이터베이스는 분산 트랜잭션의 원자성을 보장하기 위해 2PC를 사용하며, 각 노드 내의 동시성 제어를 위해 Strict 2PL을 결합한 아키텍처를 주로 사용합니다.
- **MVCC + 2PL 하이브리드 아키텍처:** 2PL의 최대 단점인 '읽기-쓰기 간의 블로킹([[Locking]] Overhead)' 현상을 극복하기 위해, 최근 시스템들은 읽기 작업에는 **MVCC(비차단 읽기)**를 적용하고 쓰기 작업 간의 충돌 해결에만 제한적으로 **Strict 2PL**을 혼용하는 하이브리드 방식으로 성능과 정합성을 동시에 확보하고 있습니다.
끝.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_데이터베이스_MOC|🗄️ 데이터베이스]]
- **세부 분류**: `2. 트랜잭션 & 동시성 제어 (Concurrency)`
- **핵심 연관 토픽**:
  - [[병행 제어|병행 제어 (Concurrency control)]]
  - [[트랜잭션]]
  - [[CockroachDB|CockroachDB(코크로치DB)]]
  - [[Locking]]
  - [[Timestamp Ordering]]
