---
title: VPN(Virtual Private Network)
date: 2026-04-22
tags:
  - 보안
aliases:
  - VPN
  - 가상 사설망
---
# VPN (Virtual Private Network, 가상 사설망)

---

## I. 공중망 위의 사설망, VPN의 개요

### 가. 정의

- 인터넷 같은 공중망 위에 **터널링과 [[암호화]]로 논리적 전용 통신로를 만들어 사설망처럼 안전하게 통신**하는 기술

### 나. 특징

| 구분 | 내용 |
| --- | --- |
| 비용 절감 | 전용 회선 대신 인터넷 활용 |
| 보안 | 터널 구간의 기밀성·[[무결성]]·인증 |
| 유형 | Site-to-Site(지점 간), Remote Access(원격 사용자) |
| 한계 | 접속 후 내부망 전체 접근으로 횡적 이동 위험 |

---

## II. 동작 구조 및 구성요소

### 가. 원격 접속 VPN 구조

```mermaid
flowchart LR
    C["원격 단말"] ==>|"캡슐화 · 암호화"| T["터널<br/>IPsec · TLS · WireGuard"]
    T ==>|"복호화"| GW["VPN 게이트웨이"]
    GW --> SRV["내부 서버"]
```

- 단말이 원래 패킷을 암호화해 새 헤더로 감싸 보내면, 게이트웨이가 복호화해 내부망으로 전달

### 나. 구성요소

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 터널링 | [[IP Sec\|IPsec]] | L3 패킷 단위 보호, Site-to-Site 표준 |
| | SSL/TLS VPN | [[SSL-TLS\|TLS]] 기반, 브라우저·경량 클라이언트 접속 |
| | WireGuard | Noise 프로토콜 기반 경량 VPN, ChaCha20-Poly1305·Curve25519 |
| | L2TP/IPsec | L2 터널을 IPsec으로 보호 (레거시) |
| 키 교환 | IKEv2, (EC)DH | 세션 키 합의와 상호 인증 |
| 암호 | AES-GCM, ChaCha20 | 데이터 기밀성·무결성 |
| 인증 | 인증서, MFA | 사용자·단말 인증 |
| 트래픽 제어 | 스플릿 터널링 | 업무 트래픽만 터널로 보내고 일반 인터넷은 직접 연결 |
| | NAT-T | NAT 환경에서 UDP 4500으로 IPsec 캡슐화 |

---

## III. 비교 및 동향

### 가. VPN vs ZTNA

| 비교 항목 | 전통적 VPN | ZTNA |
| --- | --- | --- |
| 신뢰 모델 | 접속 후 내부망 신뢰 | 요청마다 검증 |
| 접근 단위 | 네트워크·서브넷 | 애플리케이션 |
| 노출 | 게이트웨이가 인터넷에 노출 | 인증 전 서비스 은닉 |
| 침해 시 | 횡적 이동 용이 | 접근 범위 국소화 |

### 나. 동향

- **VPN 장비 취약점 악용**: Ivanti·Fortinet 등 VPN 장비 제로데이가 초기 침투 경로로 반복 악용
- **ZTNA·[[SASE(Secure Access Service Edge)|SASE]] 전환**: 원격 접속은 애플리케이션 단위 ZTNA로 대체 ([[제로 트러스트 보안모델|제로 트러스트]])
- **PQC 적용**: IKEv2 하이브리드 키 교환, WireGuard 양자내성 확장 연구

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_보안_MOC|🛡️ 보안]]
- **세부 분류**: `1. 정보보안 원칙 & 거버넌스 · 인증`
- **핵심 연관 토픽**:
  - [[IP Sec]]
  - [[SSL-TLS]]
  - [[SDP(Software Defined Perimeter)]]
  - [[SASE(Secure Access Service Edge)]]
  - [[제로 트러스트 보안모델|제로 트러스트 (Zero Trust) 보안모델]]
