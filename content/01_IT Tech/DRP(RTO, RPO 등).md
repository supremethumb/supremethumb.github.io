---
title: DRP(RTO, RPO 등)
date: 2026-04-22
tags:
  - 경영전략
aliases:
  - DRP
  - Disaster Recovery Plan
  - 재해복구계획
---
# DRP (Disaster Recovery Plan)

---

## I. 목표 시간·시점 안에 IT를 되살리는, DRP의 개요

### 가. 정의

- 재해·장애로 IT 시스템이 중단될 때 **목표 복구 시간(RTO)과 목표 복구 시점(RPO) 안에 시스템과 데이터를 복구**하기 위한 절차·자원·조직 계획

### 나. 필요성 및 특징

| 구분 | 내용 |
| --- | --- |
| 필요성 | 업무의 IT 의존도 증가, 금융·공공 분야 재해복구 규제 (예: 전자금융감독규정) |
| BIA 기반 | [[BIA (Business Impact Analysis)\|업무 영향 분석]]으로 업무별 RTO·RPO 산정 |
| BCP 하위 계획 | 전사 [[BCP]] 중 IT 복구를 담당하는 기술·운영 계획 |
| 비용 균형 | 목표가 엄격할수록(RTO·RPO ↓) 복구 센터 비용 ↑ |

---

## II. DRP의 핵심 지표 및 구성요소

### 가. RPO와 RTO

```mermaid
flowchart LR
    B["마지막 백업·복제 시점"] -->|"RPO: 데이터 손실 허용 범위"| X(("재해 발생"))
    X -->|"RTO: 서비스 중단 허용 시간"| R["서비스 재개"]
```

- RPO는 재해 시점에서 과거 방향으로 잃어도 되는 데이터 범위로, 백업·복제 주기를 결정
- RTO는 재해 시점부터 서비스 재개까지 허용 시간으로, 복구 센터 유형과 절차를 결정

### 나. 구성요소

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 복구 지표 | RTO (Recovery Time Objective) | 서비스 중단부터 복구까지 허용되는 최대 시간 |
| | RPO (Recovery Point Objective) | 복구 시 되돌아갈 수 있는 데이터 시점, 손실 허용 범위 |
| | RSO (Recovery Scope Objective) | 우선 복구할 업무·시스템의 범위 |
| | RCO (Recovery Communication Objective) | 비상 연락·통신 체계 복구 목표 |
| 복구 센터 | Mirror Site | 주 센터와 동일 시스템을 Active-Active로 운영, RTO ≈ 0 |
| | Hot Site | 동일 장비 대기, 데이터 실시간 복제, 수 시간 이내 복구 |
| | Warm Site | 주요 장비만 보유, 데이터는 주기적 백업, 수일~수주 |
| | Cold Site | 전원·공조 등 시설만 확보, 수주~수개월 |
| 운영 | 복구 절차·훈련 | 비상 조직, 복구 매뉴얼, 정기 모의훈련 |

---

## III. BCP 비교 및 동향

### 가. DRP vs BCP

| 구분 | DRP | BCP |
| --- | --- | --- |
| 목적 | IT 시스템·데이터의 기술적 복구 | 사업 전체의 연속성 유지 |
| 범위 | 인프라, 애플리케이션, [[데이터베이스]] | 인력, 시설, 공급망, 업무 프로세스 |
| 성격 | 기술·운영 계획 | 전략·관리 계획 |
| 주요 지표 | RTO, RPO | MTPD(최대 허용 중단 기간), MBCO(최소 사업 연속성 목표) |
| 구현 수단 | [[DRS (Disaster Recovery System)\|DRS]], [[DRaaS]], 백업·복제 | 비상 대응 조직, 대체 업무 절차 |

### 나. 동향

- **DRaaS 확산**: 원격 복구 센터 구축 대신 [[클라우드 컴퓨팅]]을 이용해 초기 투자 없이 사용량 기반으로 재해복구 구성
- **랜섬웨어 대응 (Cyber Recovery)**: 백업까지 암호화하는 [[랜섬웨어]]에 대비해 불변(Immutable) 백업, 에어갭 격리 보관(3-2-1-1 규칙) 도입
- **다중 지역 상시 운영**: 클라우드 리전을 활용한 [[다중지역 A-A DRS|Active-Active]] 구성으로 RTO 단축

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_경영전략_MOC|📈 경영전략]]
- **세부 분류**: `1. 경영 환경 분석 & 전략 수립 프레임워크`
- **핵심 연관 토픽**:
  - [[BCP|BCP (Business Continuity Planning)]]
  - [[BIA (Business Impact Analysis)]]
  - [[DRS (Disaster Recovery System)]]
  - [[DRaaS]]
  - [[ISO 22301]]
