---
title: SSRF(Server-Side Request Forgery)
date: 2026-04-22
tags:
  - 보안
---
# SSRF (Server-Side Request Forgery)

---

## I. 웹 서버의 신뢰성을 악용한 내부 인프라 침해 취약점, SSRF의 개요

### 가. SSRF의 정의
- 공격자가 웹 애플리케이션의 리소스 요청 기능을 조작하여, 서버로 하여금 인가되지 않은 내부망 사설 IP나 외부 시스템으로 악의적인 HTTP 요청을 전송하게 만드는 서버 측 요청 위조 공격.

### 나. SSRF의 공격 영향 및 주요 특징
| 구분 | 내용 |
| --- | --- |
| 서버 신뢰성 악용 | 외부 인터넷에 노출되지 않은 내부망 시스템(Intranet)에 서버의 높은 신뢰 수준을 이용해 침투 |
| 클라우드 자격증명 탈취 | AWS/GCP 등 클라우드 메타데이터 서비스(IMDS: 169.254.169.254)에 접근하여 임시 [[IAM]] 토큰 탈취 |
| 내부 정찰 및 RCE 연계 | 내부 IP/포트 스캐닝을 통해 취약한 관리자 페이지, Redis, DB 등을 탐색하고 원격 코드 실행으로 확장 |
| API 및 웹훅 확산 | MSA 마이크로서비스, 웹훅(Webhook), 파일 다운로드 등 Server-to-Server 통신 증가로 공격 표면 급증 |



---

## II. SSRF의 아키텍처 및 핵심 기술 요소

### 가. SSRF의 취약점 발생 메커니즘 및 동작 원리

```mermaid
flowchart TD
    subgraph Attacker["공격자 (Attacker)"]
        Payload["악의적 URL 요청 주입<br/>(예: http://169.254.169.254/latest/meta-data/)"]
    end

    subgraph Server["취약한 웹 애플리케이션 서버"]
        direction TB
        InputVal["입력값 검증 부재<br/>(URL 검증 로직 누락)"]
        HTTPClient["서버 측 HTTP 요청 발생<br/>(CURL / HttpClient)"]
        
        InputVal --> HTTPClient
    end

    subgraph Internal["내부 인프라 및 클라우드 자원"]
        direction TB
        CloudMeta["Cloud Metadata Service<br/>(IMDS: IAM Credentials)"]
        InternalAPI["내부 마이크로서비스 / DB 관리 툴"]
    end

    Payload -->|HTTP 요청 전송| InputVal
    HTTPClient ==>|내부 IP/메타데이터 접근| CloudMeta
    HTTPClient -.->|사내 내부망 스캔| InternalAPI
    CloudMeta -->|민감 정보 반환| HTTPClient
    HTTPClient -->|공격자에게 응답 유출| Attacker

    style HTTPClient fill:#f9f,stroke:#333,stroke-width:2px
    style CloudMeta fill:#f9f,stroke:#333,stroke-width:2px

```

* 공격자가 웹 서버의 URL 입력 기능에 내부망 주소나 메타데이터 IP를 주입하고, 서버가 이를 검증 없이 실행하여 내부 민감 데이터를 취득 후 공격자에게 반환함

### 나. SSRF의 핵심 기술 및 대응 요소

| 분류 (Category) | 요소기술 (키워드) | 세부 설명 |
| --- | --- | --- |
| **취약점 유형** | Basic SSRF | 서버가 외부 공격자의 지정 서버로 요청을 보내게 하여 포트 스캔이나 응답 지연 유발 |
| **취약점 유형** | Blind SSRF | 응답 결과가 화면에 노출되지 않으나, 비동기 로그 등을 통해 내부망 상태를 유추하는 방식 |
| **주요 타겟** | Cloud Metadata (IMDS) | AWS/GCP 등 클라우드 인스턴스의 [[IAM]] 권한 토큰 및 자격 증명 탈취 |
| **우회 기법** | [[DNS(Domain Name System)\|DNS]] Rebinding | 초기 검증 시에는 안전한 도메인이나 실제 연결 시 악성 내부 IP로 변조하는 공격 기법 |
| **방어 기법** | URL Whitelisting | 허용된 도메인 또는 IP 대역만 명시적으로 허용하고 사설 IP 대역(RFC 1918) 차단 |
| **방어 기법** | Egress Filtering | 방화벽을 통해 웹 서버가 외부로 나가는 아웃바운드 트래픽(Outbound)의 대역 및 포트 엄격 통제 |
| **클라우드 대응** | IMDSv2 도입 | 토큰 기반 인증 세션을 요구하여 기존의 단순한 메타데이터 접근 요청 차단 |
| **아키텍처 대응** | [[제로 트러스트 보안모델\|Zero Trust]] Network | 내부 서비스 간 통신 시 상호 인증(mTLS) 및 네트워크 세분화(Segmentation) 적용 |

---

## III. CSRF와 SSRF 비교 및 향후 전망

### 가. CSRF vs SSRF 비교

| 비교 항목 | [[CSRF]] (Cross-Site Request Forgery) | SSRF (Server-Side Request Forgery) |
| --- | --- | --- |
| **공격 주체** | 피해자의 브라우저 (Victim's Browser) | 백엔드 웹 애플리케이션 서버 (Backend Server) |
| **공격 대상** | 사용자가 인증된 웹 서비스의 상태 변경 기능 | 백엔드 서버가 접근 가능한 내부 및 외부 네트워크 리소스 |
| **주요 권한** | 일반 사용자(Victim)의 [[세션]] 및 권한 | 서버(Server)가 가진 네트워크 및 클라우드 권한 |
| **주요 피해** | 사용자 계정 도용, 비밀번호 변경 등 개인 권한 남용 | 내부망 인프라 장악, 클라우드 자격 증명 탈취, RCE |

### 나. 향후 전망 및 발전 방향
- **클라우드 IMDSv2 전환 의무화**: 단순 HTTP GET 요청만으로 자격 증명이 반환되던 IMDSv1을 폐기하고, 세션 토큰 헤더 검증(PUT)을 강제하는 IMDSv2 적용 표준화.
- **클라우드 네이티브 이그레스(Egress) 통제**: [[쿠버네티스]](Kubernetes) 환경에서 NetworkPolicy 및 서비스 메시(Istio) 기반 Egress Gateway를 통해 백엔드 파드의 임의 아웃바운드 연결 원천 차단.
- **DevSecOps 및 API 가드레일 자동화**: CI/CD 파이프라인 단계에서 [[SAST]]/[[DAST]] 스캔을 통해 DNS 리바인딩 및 SSRF 취약점을 사전 식별하고, 내부 호출 API에 대한 상호 TLS(mTLS) 인증 강제.

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `2. 현대 암호학 & 키 관리 · 전자서명`
- **핵심 연관 토픽**:
  - [[IAM]]
  - [[OWASP Top 10 2025]]
  - [[CSRF]]
  - [[DAST]]
  - [[제로 트러스트 보안모델|제로 트러스트 (Zero Trust) 보안모델]]
