---
title: "String Type"
date: 2026-04-13
description: "String Type은 여러 문자를 순서대로 묶어 저장하는 자료형으로, 텍스트 처리의 기본 단위입니다."
tags: ["IT", "개발", "기술"]
---

# String Type

String Type(문자열형)은 여러 개의 문자를 순서대로 묶어 저장하는 자료형이다. 글자 한 개를 다루는 [[Char Type]]과 달리, 사람이 읽고 쓰는 거의 모든 텍스트 데이터를 담는 그릇이다.

## 내부 표현

대부분의 언어에서 문자열은 *문자(Char)의 배열*로 표현된다.

- **C**: `char` 배열 + null 종료 문자(`\0`)
- **Java/JavaScript**: 불변(immutable) 객체
- **Python**: 불변, UTF-8 기반 유니코드
- **Rust**: `String`(가변)과 `&str`(슬라이스)을 구분

## 인코딩

같은 글자라도 인코딩이 다르면 다른 바이트열이 된다.

- **ASCII**: 영문/숫자 위주, 1바이트
- **UTF-8**: 유니코드 가변 길이(1~4바이트), 웹 표준
- **UTF-16**: 자바·윈도우 등에서 사용
- **EUC-KR / CP949**: 한국어 레거시 인코딩

인코딩 오류는 한글 깨짐의 가장 흔한 원인이다.

## 자주 쓰는 연산

- 길이 측정 (단, *바이트 수* vs *문자 수* 구분)
- 부분 문자열 추출(`substring`, slice)
- 검색·치환·정규식
- 결합·분리(`split`, `join`)

## 성능 주의

- 불변 문자열에 `+`로 반복 결합하면 매번 새 객체 생성 → 큰 루프에서는 `StringBuilder` 류 사용
- 정규식은 강력하지만 복잡한 패턴은 느릴 수 있다 (catastrophic backtracking)

## 관련 노트

- [[Data Type]]: 자료형 전반
- [[Char Type]]: 한 글자 단위 자료형
- [[Int Type]] · [[Float Type]] · [[Boolean Type]]: 기본 자료형
