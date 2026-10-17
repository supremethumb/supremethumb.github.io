---
title: DRDOS
date: 2026-04-22
tags:
  - 보안
aliases:
  - DRDoS(Distributed Reflection DoS)
  - DRDoS
  - 반사 공격
---
# DRDoS (Distributed Reflection Denial of Service)

---

## I. 정상 서버를 무기로, DRDoS의 개요

### 가. 정의

- 출발지 IP를 **표적 IP로 위조한 요청을 다수의 정상 서버(반사체)에 보내, 반사체들의 응답이 표적으로 몰리게** 하는 분산 반사 서비스 거부 공격

### 나. 특징

| 구분 | 내용 |
| --- | --- |
| 추적 회피 | 표적에는 반사체 IP만 보여 실제 공격 출발지 파악 어려움 |
| 증폭 | 작은 요청으로 큰 응답을 유도해 공격 트래픽을 수십~수만 배로 증폭 |
| 차단 곤란 | 반사체가 정상 DNS·NTP 서버라 무조건 차단 시 부작용 |
| UDP 악용 | 핸드셰이크 없는 UDP 특성상 위조 출발지에 그대로 응답 |

---

## II. 공격 구조 및 구성요소

### 가. 반사·증폭 구조

```mermaid
flowchart LR
    ATK["공격자 · 봇넷"] ==>|"1. 출발지 = 표적 IP로 위조한 작은 요청"| REF
    subgraph REF["반사체 (정상 서버)"]
        direction TB
        D["오픈 리졸버 DNS (UDP 53)"]
        N["NTP (UDP 123)"]
        M["Memcached (UDP 11211)"]
    end
    REF ==>|"2. 증폭된 응답"| T["표적<br/>대역폭 고갈"]
```

- 봇넷이 표적 IP로 위조한 질의를 반사체에 보내면, 반사체의 큰 응답이 모두 표적으로 전달

### 나. 구성요소

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 기반 | IP 스푸핑 | 출발지 IP를 표적 IP로 위조 |
| | UDP | 연결 확인 없이 응답하는 비연결형 프로토콜 |
| 매개체 | 반사체 | 오픈 리졸버 DNS, 공개 NTP·Memcached·SSDP·CLDAP 서버 |
| 증폭 벡터 | DNS ANY·DNSSEC 응답 | 큰 레코드 응답 유도 (수십 배) |
| | NTP monlist | 최근 접속 IP 최대 600개 응답 (수백 배) |
| | Memcached | 최대 약 5만 배 증폭 (2018년 1.35Tbps 공격) |
| TCP 반사 | SYN-ACK 반사 | 위조 SYN에 대한 SYN-ACK를 표적으로 반사 |
| 대응 | Ingress 필터링 (BCP 38) | ISP·라우터에서 위조 출발지 패킷 차단 |
| | 반사체 설정 강화 | 오픈 리졸버 차단, monlist 비활성화, Memcached UDP 비활성화 |

---

## III. 비교 및 동향

### 가. DDoS vs DRDoS

| 비교 항목 | [[DDOS\|DDoS]] | DRDoS |
| --- | --- | --- |
| 표적에 도달하는 트래픽 출처 | 봇넷 | 반사체 (정상 서버) |
| 출발지 위조 | 선택적 | 필수 |
| 역추적 | 봇 IP로 일부 추적 가능 | 반사체 뒤에 숨어 어려움 |
| 트래픽 규모 | 봇넷 대역폭에 의존 | 증폭률만큼 확대 |
| 방어 | 봇 IP 차단·스크러빙 | 반사 프로토콜 필터링·스크러빙, 반사체 제거 |

### 나. 동향

- **BCP 38 확산**: 위조 출발지 차단이 근본 대책이나 전 세계 ISP 적용률이 낮아 여전히 유효한 공격
- **신규 반사 벡터**: CLDAP, SSDP, WS-Discovery, TP240PhoneHome 등 새 UDP 서비스 악용
- **클라우드 방어**: Anycast·스크러빙 센터 기반 대용량 흡수 ([[CDN|CDN(Contents Delivery Network)]])

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `1. 정보보안 원칙 & 거버넌스 · 인증`
- **핵심 연관 토픽**:
  - [[DDOS]]
  - [[DoS (Denial of Service)]]
  - [[DNS(Domain Name System)]]
  - [[스니핑, 스푸핑|스니핑(Sniffing) & 스푸핑(Spoofing)]]
  - [[CDN|CDN(Contents Delivery Network)]]
