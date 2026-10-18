---
title: OAuth(Open Authorize) 2.0
date: 2026-04-22
tags:
  - 보안
---
# OAuth(Open Authorize) 2.0

---

## I. 안전한 자원 접근 위임, OAuth 2.0의 개요

### 가. OAuth 2.0의 정의
- 사용자의 패스워드를 직접 노출하지 않고 서드파티 애플리케이션에 보호된 자원에 대한 접근 권한(인증 및 인가)을 위임하는 IETF RFC 6749 개방형 표준 [[프로토콜]].

### 나. OAuth 2.0의 필요성 및 주요 특징
| 구분 | 내용 |
| --- | --- |
| 패스워드 비노출 | 사용자 자격 증명(ID/PW) 대신 인가 토큰(Access Token)을 발급하여 계정 탈취 위험 차단 |
| 스코프 기반 권한 제어 | 권한 범위(Scope)와 토큰 유효기간(TTL)을 세분화하여 최소 권한 부여 원칙 준수 |
| 토큰 생명주기 관리 | 단기 유효 Access Token과 장기 Refresh Token의 분리 운용으로 안전한 세션 연장 지원 |
| RESTful API 최적화 | HTTP/HTTPS 기반 웹, 모바일, 데스크톱 환경 전반의 유연한 분산 API 연동성 보장 |

---

## II. OAuth 2.0의 개념도 및 핵심 기술 요소

### 가. OAuth 2.0의 동작 원리 (Authorization Code Grant Type 기준)

```mermaid
sequenceDiagram
    autonumber
    actor RO as Resource Owner<br/>(사용자)
    participant Client as Client<br/>(애플리케이션)
    participant AS as Authorization Server<br/>(인가 서버)
    participant RS as Resource Server<br/>(자원 서버)

    RO->>Client: 1. 서비스 이용 및 접근 요청
    Client->>RO: 2. 권한 부여 요청 (AS로 Redirect)
    RO->>AS: 3. 로그인 및 권한 승인 (Consent)
    AS->>Client: 4. Authorization Code 반환
    Client->>AS: 5. Access Token 요청 (Code, Client Secret 전달)
    AS->>Client: 6. Access Token (+Refresh Token) 발급
    Client->>RS: 7. API 자원 요청 (HTTP Header에 Token 포함)
    RS->>Client: 8. Token 검증 후 보호된 자원(Resource) 응답

```

* 서드파티 앱(Client)은 브라우저를 통해 인가 코드를 먼저 발급받고, 백엔드 통신을 통해 안전하게 Access Token을 교환하여 최종 자원에 접근함

### 나. OAuth 2.0의 핵심 기술 및 구성 요소

| 분류 | 요소기술(키워드) | 세부 설명 |
| --- | --- | --- |
| **주체 (Roles)** | **Resource Owner** | 보호된 자원에 대한 접근 권한을 부여할 수 있는 주체 (일반 사용자) |
| **주체 (Roles)** | **Client** | 사용자를 대신하여 보호된 자원(API)에 접근을 요청하는 서드파티 애플리케이션 |
| **서버 구성** | **Authorization Server** | 사용자를 인증하고 접근 권한을 확인한 후 Access Token을 발급하는 인가 서버 |
| **서버 구성** | **Resource Server** | Access Token을 검증하고 사용자의 보호된 자원(데이터)을 제공하는 API 서버 |
| **토큰 (Tokens)** | **Access Token** | 자원에 접근할 수 있는 제한된 권한(Scope, 수명)을 담고 있는 자격 증명 (주로 JWT 활용) |
| **토큰 (Tokens)** | **Refresh Token** | Access Token 만료 시 사용자 개입 없이 새로운 Access Token을 갱신하기 위한 토큰 |
| **접근 제어** | **Scope** | Client가 접근할 수 있는 자원의 범위와 권한 수준을 정의 (예: read, write, profile) |
| **권한 부여** | **Authorization Code** | 토큰의 탈취 위험을 방지하기 위해 프론트엔드-백엔드 간 전달되는 임시 인증 코드 |

---

## III. OAuth 2.0과 OIDC(OpenID Connect) 비교 및 최신 보안 동향

### 가. OAuth 2.0과 OIDC 비교 (인가 vs 인증)

| 비교 항목 | OAuth 2.0 | OIDC (OpenID Connect) |
| --- | --- | --- |
| **핵심 목적** | **인가 (Authorization, 권한 위임)** | **인증 (Authentication, 신원 확인)** |
| **발급 토큰** | Access Token | **ID Token (JWT 형태)** + Access Token |
| **데이터 전달** | 자원에 대한 접근 권한 (Scope) | 사용자의 식별 정보 (Profile, Email 등) |
| **표준 계층** | 권한 위임 프레임워크 (단독 동작) | OAuth 2.0 프로토콜 위에서 동작하는 인증 계층 |

### 나. OAuth 2.0 최신 보안 동향 및 향후 전망 (OAuth 2.1)
- **PKCE(Proof Key for Code Exchange) 전면 의무화**: 인가 코드 가로채기(Code Interception) 방지를 위해 SPA 및 모바일 앱뿐 아니라 모든 클라이언트 유형에 PKCE 적용 강제화.
- **취약 권한 부여 방식(Grant Type) 폐지**: 보안 취약성이 높은 암묵적 부여(Implicit Grant) 및 비밀번호 직접 전달(Resource Owner Password Credentials) 방식을 차기 OAuth 2.1 표준에서 완전 폐기(Deprecated).
- **FAPI(Financial-grade API) 보안 규격 확산**: [[마이데이터]] 및 금융 오픈뱅킹 API 보안성 보장을 위해 상호 전송계층 보안(mTLS), JARM(JWT Secured Authorization Response Mode) 결합 금융 등급 보안 프로파일 채택.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `6. 개인정보보호 & 프라이버시 강화 기술`
- **핵심 연관 토픽**:
  - [[마이데이터]]
  - [[프레임워크]]
  - [[프로토콜]]
  - [[개인정보보호법]]
  - [[IEC 62443]]
