---
title: PaaS (Platform as a Service)
date: 2026-03-27
tags:
  - 디지털서비스
---

# PaaS (Platform as a Service)

---

## I. 개발 생산성 및 효율성 극대화를 위한 플랫폼 서비스, PaaS의 개요

### 가. PaaS(Platform as a Service)의 정의

- 애플리케이션 개발, 실행, 관리에 필요한 **[[OS(운영체제)|운영체제]], 미들웨어, 런타임** 등을 서비스 형태로 제공하여, 개발자가 인프라 구축 없이 **비즈니스 로직(Application & Data) 개발**에만 집중할 수 있게 하는 클라우드 서비스 모델.
### 나. PaaS의 특징

- **개발 편의성:** 개발 도구(IDE), 언어 런타임, 라이브러리 제공
- **비용 효율성:** 초기 플랫폼 구축 비용 절감, 종량제 과금(Pay-per-Use)
- **운영 자동화:** 오토 스케일링, 로드 밸런싱, [[HA(High Availability)|고가용성]](HA) 지원

---

## II. PaaS의 아키텍처 및 주요 기술요소

### 가. PaaS 서비스 아키텍처 (차별화 도식화)

```Plain Text
[ Developers ] ----(Code/Build)----> [ CI/CD Pipeline ]
                                          |
                                          v
+-------------------------------------------------------------+
|                     PaaS Layer (Managed)                    |
+-------------------------------------------------------------+
| [ Application Runtime ] (Java, Python, Node.js)             |
| [ Middleware ] (WAS, Web Server, Message Queue)             |
| [ Services ] (DBaaS, BigData, AI API)                       |
+-------------------------------------------------------------+
|               Cloud Infrastructure (IaaS)                   |
| (Compute, Storage, Network, Virtualization - Provider Managed) |
+-------------------------------------------------------------+
```

- **도식화 포인트:** 개발자가 **CI/CD 파이프라인**을 통해 소스를 배포하면, PaaS 계층(런타임, 미들웨어)이 이를 받아 실행하며, 하단 IaaS는 투명하게 관리됨을 표현. **개발자는 ’Application’과 ’Data’만 관리**함을 강조.
### 나. PaaS의 주요 기술요소

- **핵심 구성:** **런컨시데** (런타임, [[컨테이너]], 시큐리티, [[데이터베이스]])

| 구분 | 기술요소 | 설명 및 역할 |
| --- | --- | --- |
| **실행환경** | **Runtime** | - Java, Python 등 애플리케이션 실행을 위한 언어 환경 제공<br>- 동적 자원 할당 및 관리 |
|  | **Container** | - **[[도커|Docker]], Kubernetes** 기반의 경량화된 애플리케이션 격리 및 배포 환경<br>- 이식성(Portability) 보장 |
| **개발지원** | **[[DevOps]]** | - CI/CD 파이프라인 통합 지원 (Jenkins, Git 연동)<br>- 개발과 운영의 협업 및 자동화 도구 제공 |
|  | **Middleware** | - WEB/WAS, Message [[Queue]] 등 애플리케이션 구동 필수 SW 제공 |
| **서비스** | **Data/API** | - **DBaaS**(Database as a Service), BigData 분석, AI API 연동 지원<br>- **Open API**, 서비스 카탈로그 관리 |

---

## III. XaaS 모델 비교 및 발전 전망

### 가. 책임 공유 모델(Shared Responsibility Model)에 따른 비교

| 구분 | IaaS (Infrastructure) | **PaaS (Platform)** | SaaS (Software) |
| --- | --- | --- | --- |
| **제공 범위** | 서버, 스토리지, N/W, [[가상화]] | **IaaS + OS, 미들웨어, 런타임** | PaaS + 애플리케이션, 데이터 |
| **사용자 관리** | OS, 미들웨어, 앱, 데이터 | **애플리케이션, 데이터** | (사용 설정 및 데이터 일부) |
| **주요 사례** | AWS EC2, GCE | **Google App Engine, PaaS-TA** | Microsoft 365, Salesforce |

### 나. 발전 전망 (PaaS-TA 및 CaaS)

- **PaaS-TA (파스타):** 과기정통부/NIA 주도로 개발된 국내 개방형 클라우드 플랫폼, 전자정부 표준프레임워크 호환성 지원
- **CaaS (Container as a Service):** [[쿠버네티스]] 기반의 컨테이너 관리 서비스로 PaaS의 유연성을 극대화하는 방향으로 진화 중.
“끝”

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_디지털서비스_MOC|🚀 디지털서비스]]
- **세부 분류**: `1. 클라우드 컴퓨팅 & 가상화 인프라`
- **핵심 연관 토픽**:
  - [[컨테이너|컨테이너 (Container)]]
  - [[가상화]]
  - [[쿠버네티스|쿠버네티스(Kubernates)]]
  - [[도커|도커 (Docker)]]
  - [[CSP|CSP (Cloud Service Provider)]]
