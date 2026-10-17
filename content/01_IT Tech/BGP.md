---
title: BGP(Border Gateway Protocol)
date: 2026-04-22
tags:
  - 네트워크
aliases:
  - Border Gateway Protocol
---
# BGP (Border Gateway Protocol)

---

## I. 인터넷을 하나로 묶는 AS 간 라우팅, BGP의 개요

### 가. 정의

- 서로 다른 자율 시스템(AS) 사이에서 **목적지 도달 정보(NLRI)와 경로 속성을 교환하고, 정책에 따라 최적 경로를 선택**하는 경로 벡터 방식의 외부 라우팅 [[프로토콜]] (BGP-4, RFC 4271)

### 나. 특징

| 구분 | 내용 |
| --- | --- |
| 경로 벡터 | 경로가 거쳐 온 AS 목록(AS_PATH)을 전달, 자기 AS 번호가 있으면 폐기해 루프 방지 |
| 정책 기반 | 속도·홉 수보다 사업자 간 계약·운영 정책으로 경로 선택 |
| [[TCP]] 179 | TCP 세션 위에서 동작, 신뢰성은 TCP에 위임 |
| 증분 갱신 | 최초 전체 교환 후 변경분만 UPDATE로 전송 |
| 대규모 | 인터넷 전체 경로(IPv4 약 100만 개) 처리 |

---

## II. 구조 및 구성요소

### 가. eBGP · iBGP 구성

```mermaid
flowchart LR
    subgraph AS100["AS 100"]
        R1["내부 라우터"] <-- "iBGP<br/>(Full-Mesh 또는 RR)" --> R2["경계 라우터"]
    end
    subgraph AS200["AS 200"]
        R3["경계 라우터"] <-- "iBGP" --> R4["내부 라우터"]
    end
    R2 <== "eBGP (TCP 179)<br/>AS_PATH · NEXT_HOP · MED" ==> R3
```

- TCP 연결 → OPEN 교환 → KEEPALIVE로 Established 상태가 되면 UPDATE로 경로와 속성을 교환

### 나. 구성요소

| 구분 | 요소 | 설명 |
| --- | --- | --- |
| 메시지 | OPEN · UPDATE · KEEPALIVE · NOTIFICATION | 세션 수립, 경로 광고·철회, 세션 유지, 오류 통보 |
| 피어링 | eBGP | 다른 AS 간, 보통 직접 연결 (TTL 1) |
| | iBGP | 같은 AS 내부, iBGP로 받은 경로는 다른 iBGP 피어에 재광고하지 않음 |
| 확장 | Route Reflector | iBGP Full-Mesh(n(n-1)/2 세션) 부담 해소 (RFC 4456) |
| | Confederation | 큰 AS를 하위 AS로 분할 |
| 경로 속성 | AS_PATH · NEXT_HOP | 거쳐 온 AS 목록, 다음 홉 주소 |
| | LOCAL_PREF | AS에서 나가는 출구 선택, 높을수록 우선 (AS 내부 전파) |
| | MED | 인접 AS에 들어오는 입구 선호 전달, 낮을수록 우선 |
| | Community | 경로에 태그를 붙여 정책 일괄 적용 |
| 보안 | RPKI · ROA | 접두사와 원천 AS의 정당성 검증 (Route Origin Validation) |

---

## III. 비교 및 동향

### 가. BGP vs OSPF

| 비교 항목 | BGP | OSPF |
| --- | --- | --- |
| 범주 | EGP (AS 간) | IGP (AS 내부) |
| 알고리즘 | 경로 벡터 | 링크 상태 ([[다익스트라 알고리즘\|Dijkstra]]) |
| 전송 | TCP 179 | IP 프로토콜 번호 89 |
| 경로 선택 | 속성과 정책 | 링크 비용(Cost) |
| 수렴 · 규모 | 느림, 인터넷 규모 | 빠름, AS 내부 규모 |

### 나. 동향

- **경로 보안**: 하이재킹·Route Leak 대응으로 RPKI ROV 확산, AS 경로 검증용 ASPA 표준화, BGPsec은 보급 저조
- **데이터센터 활용**: Spine-Leaf 언더레이 라우팅과 EVPN 컨트롤 플레인으로 BGP 사용 (RFC 7938)
- **MANRS**: 사업자 간 라우팅 보안 실천 규범 확산

---

### 🔗 연관 토픽

- **소속 도메인**: [[00_네트워크_MOC|🌐 네트워크]]
- **세부 분류**: `1. OSI 7계층 & 데이터링크 계층 (L1/L2)`
- **핵심 연관 토픽**:
  - [[Routing Protocol]]
  - [[링크 상태 알고리즘]]
  - [[거리 벡터 알고리즘]]
  - [[라우터]]
  - [[네트워크 계층|네트워크 계층 (Network Layer)]]
