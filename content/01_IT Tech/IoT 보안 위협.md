---
title: IoT 보안 위협
date: 2026-04-22
tags:
  - 보안
aliases:
  - IoT 보안 위협 (2)
---
# IoT 보안 위협

---

## I. 초연결 시대의 양날의 검, IoT 보안 위협의 개요

### 가. IoT 보안 위협의 정의
제한된 컴퓨팅 자원(CPU, 메모리)을 가진 다수의 사물 인터넷 기기가 개방형 네트워크로 연결된 환경에서 디바이스·네트워크·플랫폼 전 계층을 표적으로 발생하는 물리적·논리적 보안 취약점 악용 및 침해 시도이다.

### 나. IoT 보안 위협의 등장 배경 및 주요 특징
| 구분 | 내용 |
| --- | --- |
| **경량 기기의 자원 제약** | 저전력·저사양 하드웨어 특성상 고강도 암호화 모듈, 백신(EPP/EDR) 탑재가 어려워 보안 통제 구현 한계 |
| **공격 표면(Attack Surface) 급증** | 대규모 연결 단말과 개방형 무선 통신(Wi-Fi, BLE, Zigbee)으로 인해 봇넷(Mirai 등) 및 대규모 [[DDOS\|DDoS]] 진원지로 악용 |
| **물리적 안전(Safety) 직결** | 스마트홈, 자율주행차, 의료기기, 스마트팩토리 등 사이버 침해가 인명 피해와 설비 파괴 등 물리적 안전 위협으로 직결 |
| **디폴트 계정 및 패치 부재** | 초기 출고 패스워드 방치, 펌웨어 무선 업데이트(OTA) 부재로 인한 취약점 영구 노출 위험 상존 |



---

## II. IoT 아키텍처 계층별 보안 위협의 개념도 및 핵심 기술 요소

### 가. IoT 아키텍처 기반 보안 위협의 개념도

```mermaid
flowchart TD
    subgraph Platform["Platform / Service Layer (플랫폼/서비스)"]
        direction TB
        Cloud["IoT Cloud / Data Center"]
        App["Web / Mobile Application"]
        Cloud -. "데이터 유출 / 비인가 API 접근 / SQLi" .-> App
    end

    subgraph Network["Network Layer (네트워크/게이트웨이)"]
        direction TB
        Internet((Internet / 5G / Wi-Fi))
        Gateway["IoT Gateway / Edge Node"]
        Cloud <== "대규모 DDoS (Mirai 봇넷) / MITM" ==> Internet
        Internet <== "Sniffing / Rogue AP (불법 AP)" ==> Gateway
    end

    subgraph Device["Device Layer (센서/단말)"]
        direction LR
        D1["Smart Home<br/>(CCTV 등)"]
        D2["Industrial IoT<br/>(PLC 등)"]
        D3["Medical IoT"]
    end
    
    Gateway <--> Device

    Attacker(("Attacker<br/>(해커)"))
    Attacker -. "Default 패스워드 무차별 대입 (Brute Force)" .-> Gateway
    Attacker -. "펌웨어 추출 / 물리적 훼손 / 부채널 공격" .-> D1

```

* 사물인터넷 환경은 단말(Device) - 네트워크(Network) - 플랫폼(Platform)의 3계층으로 구성되며, 각 계층의 취약점을 노리는 복합적이고 [[다형성]] 있는 공격이 발생함.

### 나. IoT 계층별 핵심 보안 위협 요소

| 구분 | 위협 요소(키워드) | 세부 설명 |
| --- | --- | --- |
| **디바이스 계층** | **펌웨어 위/변조** | 디버깅 포트(JTAG, UART)가 열려있거나 [[무결성]] 검증이 없는 점을 악용하여 악성 펌웨어로 교체 |
| **디바이스 계층** | **물리적 훼손 (Tampering)** | 기기 자체를 절취하거나 분해하여 내부에 하드코딩된 암호화 키나 인증 정보를 추출 |
| **디바이스 계층** | **[[부채널 공격]] (Side-Channel)** | 암호화 연산 시 발생하는 전력 소모량, 전자파, 연산 시간 등의 물리적 누출 정보를 분석하여 암호키 유추 |
| **[[네트워크 계층]]** | **DDoS (봇넷 악용)** | 출고 초기(Default) 관리자 비밀번호를 방치한 기기를 웜 바이러스로 감염시켜 대규모 좀비 봇넷(Mirai 등) 구성 |
| **네트워크 계층** | **중간자 공격 (MITM)** | 암호화되지 않은 평문 통신(HTTP, [[MQTT (Message Queuing Telemetry Transport)\|MQTT]] 등)의 취약점을 노려 통신 패킷을 탈취하거나 변조 |
| **네트워크 계층** | **Rogue AP (불법 AP)** | 정상적인 IoT 게이트웨이나 AP로 위장하여 센서 데이터 및 연결 [[세션]] 권한을 탈취 |
| **플랫폼 계층** | **Insecure API** | 플랫폼과 연동하는 백엔드 API의 인증/인가 결여를 악용하여 기기 제어권 탈취 및 [[데이터베이스]] 무단 접근 |
| **관리적/운영** | **패치 관리 부재** | 제품 수명 주기(Lifecycle) 동안 보안 업데이트 기능이 제공되지 않아 취약점이 영구적으로 방치되는 문제 |

---

## III. IoT 보안 위협 대응 방안 및 동향

### 가. 일반 IT 보안과 IoT 보안의 대응 기술 비교

| 비교 항목 | 전통적 IT 보안 | IoT 환경 보안 (대응 방안) |
| --- | --- | --- |
| **암호화 기술** | 표준 암호화 ([[AES]], [[RSA (Rivest Shamir Adleman)\|RSA]] 등 고성능 요구) | **초경량 암호화 [[알고리즘]] (LWC)** 적용 (국내 LEA, HIGHT 등) |
| **보안 아키텍처** | 경계 기반 방어 ([[방화벽]], IPS) | **[[제로 트러스트 보안모델\|Zero Trust]] 기반** 상호 인증 및 마이크로 [[세그멘테이션]] 적용 |
| **인증 방식** | ID/PW, OTP, PKI 인증서 | **PUF (물리적 복제 방지 기능)** 반도체 칩 기반 하드웨어 인증 |
| **개발 방법론** | 사후 보안 패치 중심 | **Security by Design** (설계 단계부터 보안 내재화) |

### 나. 주요 동향 및 발전 전망
* **온디바이스 경량 AI 기반 침해 탐지**: 해커의 AI 기반 자동화 취약점 스캐닝에 맞서 엣지([[EDGE|Edge]]) 게이트웨이 및 단말 레벨에서 이상 트래픽을 실시간 감지하는 TinyML/경량 AI 보안 솔루션 도입
* **글로벌 IoT 보안 법제화 및 인증 의무화**: EU 사이버복원력법(CRA), 미 백악관 사이버 트러스트 마크(U.S. Cyber Trust Mark), 국내 IoT 보안인증제도 등 기본 패스워드 금지 및 보안 업데이트 기능 탑재 법제화
* **하드웨어 기반 신뢰점(RoT) 내재화**: PUF(물리적 복제 방지 기능) 반도체 및 경량 암호(LWC) 칩을 단말에 기본 탑재하여 펌웨어 변조 방지 및 제로 트러스트 상호 인증 구현

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `2. 현대 암호학 & 키 관리 · 전자서명`
- **핵심 연관 토픽**:
  - [[RSA (Rivest Shamir Adleman)]]
  - [[AES]]
  - [[부채널 공격|부채널 공격(Side Channel Attack)]]
  - [[암호화|암호화 (Encryption)]]
  - [[제로 트러스트 보안모델|제로 트러스트 (Zero Trust) 보안모델]]
