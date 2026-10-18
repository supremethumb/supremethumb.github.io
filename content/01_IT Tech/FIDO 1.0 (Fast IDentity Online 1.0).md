---
title: FIDO 1.0 (Fast IDentity Online 1.0)
date: 2026-03-27
tags:
  - 보안
---
# FIDO 1.0 (Fast IDentity Online 1.0)

---

## I. 생체 기반 패스워드리스 인증 표준, FIDO 1.0의 개요

### 가. FIDO 1.0의 정의
패스워드의 보안 취약점과 사용성 한계를 극복하기 위해 지문·홍채 등 생체인식과 공개키(PKI) 암호 메커니즘을 융합하여 모바일 기기 로컬에서 사용자를 안전하게 인증하는 초기 글로벌 인증 표준이다.

### 나. FIDO 1.0의 등장 배경 및 주요 특징
| 구분 | 내용 |
| --- | --- |
| **등장 배경** | 모바일 스마트폰 확산에 맞춰 패스워드 유출·피싱을 차단하고 생체 센서를 활용한 간편 인증 체계 구축 필요 |
| **패스워드 대체(Passwordless)** | 비밀번호 입력을 배제(UAF)하거나 하드웨어 토큰 기반 2차 인증(U2F)을 제공하여 자격증명 탈취 원천 방어 |
| **프라이버시 보호(Local Auth)** | 생체 템플릿 정보를 서버로 전송하지 않고 단말 내 안전 실행 환경(TEE/SE)에 격리 보관 |
| **비대칭키 서명 검증** | 단말에서 생성한 개인키로 서버 챌린지(Challenge)를 서명하여 전송함으로써 재전송 공격 차단 |



---

## II. FIDO 1.0의 아키텍처 및 핵심 기술 요소

### 가. FIDO 1.0의 아키텍처 및 동작 원리

```mermaid
flowchart LR
    subgraph Client_Device["사용자 단말기 (Mobile Device)"]
        direction TB
        App["Relying Party App<br/>(서비스 앱)"]
        FIDO_Client["FIDO Client<br/>(프로토콜 메시지 처리)"]
        ASM["ASM<br/>(Authenticator Specific Module)"]
        Auth["FIDO Authenticator<br/>(생체인식 및 암호키 관리)"]
        
        App --> FIDO_Client
        FIDO_Client <-->|표준 API| ASM
        ASM <--> Auth
    end

    subgraph FIDO_Server["FIDO 서버 (Relying Party)"]
        direction TB
        Server_Core["FIDO Server<br/>(공개키 관리 및 검증)"]
        DB[(사용자 DB<br/>공개키 매핑)]
        Server_Core --> DB
    end

    FIDO_Client <== "UAF / U2F 프로토콜\n(Challenge & Response 전송)" ==> Server_Core

```

* 사용자 단말에서는 앱, [[FIDO]] 클라이언트, ASM(Authenticator Specific Module), 인증기가 계층적으로 연동하여 로컬 생체 인증과 서명(Sign)을 수행함
* 인증기가 생성한 '개인키'는 단말 보안 구역에 저장되고, '공개키'만 네트워크(UAF/U2F [[프로토콜]])를 통해 서버로 전달되어 서명 값 검증에 사용됨

### 나. FIDO 1.0의 핵심 기술 및 구성 요소

| 구분 | 요소기술(키워드) | 세부 설명 |
| --- | --- | --- |
| **핵심 프로토콜** | UAF (Universal Auth. Framework) | 패스워드를 완전히 배제하고 생체 인식(지문, 음성 등)만으로 1차 인증을 수행하는 프로토콜 |
| **핵심 프로토콜** | U2F (Universal 2nd Factor) | 기존 아이디/패스워드 로그인 후 하드웨어 보안 키(USB, [[NFC]] 등)를 이용해 2차 인증을 수행하는 프로토콜 |
| **단말 구성요소** | FIDO Client | 서비스 앱(Relying Party)과 FIDO 서버 간의 메시지를 중계하고 FIDO 프로토콜 통신을 제어 |
| **단말 구성요소** | ASM (Authenticator Specific Module) | 다양한 제조사의 인증기와 FIDO 클라이언트 간의 통신을 추상화하여 연결하는 표준 인터페이스 모듈 |
| **단말 구성요소** | Authenticator (인증기) | 사용자의 생체 정보를 확인하고, [[암호화]] 키 쌍(Key Pair) 생성 및 전자서명을 수행하는 핵심 모듈 |
| **서버 구성요소** | FIDO Server | 인증기에서 생성된 공개키를 사용자 계정과 연결하여 저장하고, 전달받은 서명 값의 유효성 검증 |
| **보안 기술** | Challenge & Response | 서버가 전송한 임의의 난수(Challenge)를 단말이 개인키로 서명(Response)하여 인증하는 서명 프로토콜 |
| **보안 환경** | TEE / SE (TrustZone) | 생체 특징(Template) 데이터와 개인키가 탈취되지 않도록 격리된 하드웨어 보안 실행 환경 |

---

## III. FIDO 1.0 프로토콜 비교 및 차세대 인증(FIDO2) 진화 동향

### 가. FIDO 1.0의 두 가지 핵심 프로토콜 비교 (UAF vs U2F)

| 비교 항목 | UAF (Universal Authentication Framework) | U2F (Universal Second Factor) |
| --- | --- | --- |
| **핵심 목적** | **패스워드 대체 (Passwordless)** | **2단계 인증 (2FA) 강화** |
| **인증 방식** | 생체 정보(지문, 안면 등), PIN 입력 등 (1-Factor) | ID/PW 입력 후 + 하드웨어 보안키 (2-Factor) |
| **주요 적용 환경** | 스마트폰 등 모바일 네이티브 앱 환경 | PC 웹 브라우저 환경 (USB, NFC 동글 등 활용) |
| **사용자 경험(UX)** | 아이디 입력조차 필요 없는(Local Discovery) 간편 로그인 | 패스워드 로그인 후 하드웨어 키 터치 등 추가 행동 요구 |

### 나. 주요 동향 및 발전 전망
* **모바일 종속성 극복 및 FIDO2 전환**: 모바일 앱에 국한되던 FIDO 1.0의 한계를 넘어 브라우저 자바스크립트 표준 API(WebAuthn)와 외부 기기 통신 규격([[CTAP]])을 통합한 FIDO2/패스키로의 전면 전환
* **웹 표준 기반 플러그인 제거**: 별도 클라이언트/ASM 설치 없이 메이저 브라우저 및 OS 레벨에서 내장 인증기를 직접 호출하는 무설치 인증 환경 정착
* **단말 간 크리덴셜 동기화 지원**: FIDO 1.0의 단일 단말 종속 문제를 클라우드 백업 기반 멀티 디바이스 패스키([[패스키|Passkey]]) 표준으로 해결하여 기기 교체 시 복구 편의성 극대화

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `2. 현대 암호학 & 키 관리 · 전자서명`
- **핵심 연관 토픽**:
  - [[FIDO]]
  - [[CTAP]]
  - [[FIDO 2.0 (Fast IDentity Online 2.0)]]
  - [[패스키|패스키(Passkey)]]
  - [[암호화|암호화 (Encryption)]]
