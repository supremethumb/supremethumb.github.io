---
title: "DML"
date: 2026-04-13
tags: ["IT", "개발", "기술"]
description: "데이터베이스에 저장된 자료들을 입력, 수정, 삭제, 조회하는 언어"
---

- 데이터베이스에 저장된 자료들을 입력, 수정, 삭제, 조회하는 언어
- 유형
    - SELECT
    - INSERT
    - UPDATE
    - DELETE
- 문법
    - SELECT 명령문
        - SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY
    - SELECT 문
        - ```sql
SELECT* | {[DISTINCT]출력할 컬럼명 | 표현식, ...}
FROM 검색할 테이블명;
[WHERE 조건절들]
[ORDER BY {컬럼명, 표현식}[ASC|DESC]];
```text
        - SELECT 절
            - 검색하고자 하는 속성명, 계산식
            - 2개 이상 테이블을 대상으로 검색할 때는 '테이블 명, 속성명'으로 표현
            - 술어 부분을 ALL 이 기본 값
            - ALL
                - 모든 튜플을 검색할 때 사용
                - SELECT 뒤에 명시하지 않을 경우 ALL 로 인식
            - DISTRICT
                - 중복된 속성이 조회될 경우 그 중 한개만 검색
            - DISTINCT ROW SELECT
                - 뒤에 속성들과 상관없이 튜플 전체가 중복된 튜플을 제거
        - FROM 절
            - 질의에 의해 검색된 데이터들을 포함하는 테이블 명을 기술
        - WHERE 절
            - 검색할 조건을 기술
        - GROUP BY 절
            - 속성 값을 그룹으로 분류하고자 할 때 사용
        - HAVING 절
            - GROUP BY에 의해 분류한 후 그룹에 대한 조건 기술
        - ORDER BY 절
            - 속성 값을 정령하고자할 때 사용
            - ASC(오름차순) DESC(내림차순)키워드 생략시 오름차순으로 정렬
    - WHERE 조건
        - WHERE 절에서 조건이 상수인 경우: 상하 조건인 경우 숫자를 그대로 입력하여 비교가능
            - ```sql
SELECT 사원번호, 이름, 부서번호
FROM 사원
WHERE 부서번호 = 90;
```text
        - WHERE 절에서 조건이 문자열인 경우: 문자열 조건인 경우 작은 따옴표('')가 필요하며, 대소문자를 구별함
            - ```sql
SELECT 이름, 학번, 교실
FROM 학생
WHERE 이름 = 'GILDONG'; 
```text
        - WHERE 절에서 날짜 데이터의 경우: 작은 따옴표
            - ```sql
SELECT 이름
FROM 사원
WHERE 입사일 = '17. FEB. 96';
```text
            - 대소문자 구분 안함
            - 검색 형식 다르게 하면 검색 안됨
            - 날짜 데이터 문자열 형식의 입력 조건: 'DD-MM-YY'
        - 비교
            - =, <>/!=/^, <, <=, >, >=
        - 범위
            - BETWEEN
        - 집합
            - IN
            - NOT IN
        - 패턴
            - LIKE
        - 복합조건
            - AND
            - OR
            - NOT
        - 와일드 문자
            - +: 문자열 연결
            - %: 0 개 이상의 문자열과 일치
            - []: N 개 이상의 문자와 일치
            - [^]: 1 개 이상의 문자와 불일치
            - _: 1 개의 문자와 일
    - INSERT 명령어
        - 데이터의 내용을 삽입할 때 사용하는 명령어
        - 속성명 데이터 개수, 데이터 타입이 일치해야 함
        - 속성명 생략 가능
        - ```sql
INSERT INTO 테이블명(속성명 1, ...)
VALUE(데이터 1, ...);
```text
    - UPDATE 명령
        - 데이터의 내용을 변경할 때 사용하는 명령어
        - UPDATE 명령문을 WHERE 절을 통해 어떤 조건이 만족할 경우에만 특정 컬럼의 값을 수정하는 용도로 자주 사용됨
        - ```sql
UPDATE 테이블명
SET 속성명 = 데이터, ...
WHERE 조건;
```text
    - DELETE 명령
        - 데이터의 내용을 삭제할 때 사용하는 명령어
        - ```sql
DELETE FROM 테이블명
WHERE 조건;
```text
- 조인
    - 조인은 두개 이상의 테이블을 연결하여 데이터를 검색하는 방법
    - 논리적 조인
        - 내부 조인
            - [Aliases](~/Aliases.md) Aliases
                - Inner Join
            - 공통 존재 컬럼의 값이 같은 경우 추출하는 기법
            - ```sql
SELECT A. 컬럼1, A. 컬럼2 ... , B. 컬럼1, B.컬럼2 ...
FROM 테이블 1A [INNER] JOIN 테이블 2 ㅠ ON 조인 조건
[WHERE 검색 조건];
```text
        - 외부 조인
            - [Aliases](~/Aliases.md) Aliases
                - Outer Join
            - 외부 조인의 종류로는 왼쪽 외부 조인, 오른쪽 외부 조인, 완전 외부 조인
        - 교차 조인
            - [Aliases](~/Aliases.md) Aliases
                - Cross Join
            - 조인 조건이 없는 모든 데이터 포함을 추출하는 기법
        - 셀프 조인
            - [Aliases](~/Aliases.md) Aliases
                - Self Join
            - 자기 자신에게 별칭을 지정한 후 다시 조인하는 기법
    - 물리적 조인
        - Nested-Loop
            - [Aliases](~/Aliases.md) Aliases
                - 중첩 반복 조인
            - 2 개 이상의 테이블에서 하나의 집합을 기준으로 순차적으로 상대방 ROW 를 결합하여 원하는 결과를 조합하는 조인 방식
        - Sort-Merge
            - [Aliases](~/Aliases.md) Aliases
                - 정렬 합병 조인
            - 조인의 대상 범위가 넓을 경우 발생하는 임의 접근을 줄이기 위한 경우나 연결 고리에 마땅한 인덱스가 존재하지 않을 경우 해결하기 위한 조인 방식
        - Hash
            - [Aliases](~/Aliases.md) Aliases
                - 해시 조인
            - 해시 조인은 해싱 함수를 활용하여 테이블간 조인을 수행하는 방
- 서브 쿼리
    - 서브 쿼리는 SQL 문 안에 포함된 또 다른 SQL 문을 의미
    - 유형
        - SELECT 절 서브 쿼리
            - 서브쿼리가 SELECT 절 안에 들어가 있는 형태
            - 스칼라 서브 쿼리라고도 불림
            - SELECT 절에 오는 서브쿼리는 반드시 단일 행을 리턴해야 함
        - FROM 절 서브 쿼리
            - 서브쿼리가 FROM 절 안에 들어있는 형태
            - 인라인 뷰라고도 불림
            - 뷰 처럼 결과가 동적으로 생성된 테이블 형태로 사용할 수 있음
        - WHERE 절 서브 쿼리
            - 서브쿼리가 WHERE 절 안에 들어있는 형태
            - 중첩 서브쿼리라고도 불림
- 집합 연산자
    - 두개 이상의 테이블에서 여러개의 질의의 결과를 연결하여 하나로 결합하는 연산자
    - 유형
        - UNION
            - 중복행이 제거된 쿼리 결과 집합
            - 중복레코드 제외
        - UNION ALL
            - 중복행이 제거되지 않은 쿼리 결과 집합
            - 중복레코드 허용
        - INTERSECT
            - 두 쿼리 결과에 공통적으로 존재하는 집합
            - 중복 레코드만 포함
        - MINUS
            - 첫 쿼리에 있고 두 번째에는 없는 집합
            - 비교 레코드 제
