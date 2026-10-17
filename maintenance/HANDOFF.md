# 서브노트 정리 작업 인수인계 (content/01_IT Tech)

마지막 갱신: 2026-10-17. 다른 세션이 이 파일만 읽고 이어서 작업할 수 있도록 지금까지 한 일, 의도, 남은 일, 도구를 정리했다.

## 0. 배경과 목표

- `content/01_IT Tech`는 정보관리기술사 시험용 서브노트 모음이다 (Quartz 블로그, Obsidian 문법). 원래 1,141개 파일이었고 대부분 Gemini가 작성했다.
- 사용자 요청은 세 가지다.
  1. 중복 노트를 모두 정리한다.
  2. 깨진 형식을 고친다.
  3. 내용을 더 잘 쓰인 글로 다시 다듬는다.
- 사용자가 승인한 방식은 다음과 같다.
  - 중복은 링크를 가장 많이 받는 노트(정본)로 합치고, 유용한 내용은 정본에 흡수한다.
  - 삭제한 노트 이름은 정본의 `aliases`에 넣고, `[[옛이름]]` 링크는 `[[정본|옛이름]]`으로 바꾼다.
  - 내용이 틀린 노트와 여러 버전이 이어 붙은 노트는 한 버전으로 다시 쓴다.
  - 그다음 분야(MOC 도메인)별로 문장을 다듬는다.
- 주의할 점이 하나 있다. 파일을 삭제하면 인쇄본 쪽번호와 Notion 답안 스킬(gisulsa-1gyosi/2gyosi-answer)이 참조하는 서브노트 경로가 달라질 수 있다. 사용자에게는 미리 알렸다.

## 1. 완료한 작업

### 1-1. 형식 정리 (전체 대상)

- 표가 깨진 37개 파일을 복구했다.
- 채팅 흔적을 제거했다: 앞인사, "~답안입니다", "지시하신", “끝”, cite 표기.
- 568개 파일에서 하위 불릿 들여쓰기를 고쳤다.
- PROT 치환 잔여물을 정리했다.
- 표 안의 별칭 위키링크에서 파이프를 이스케이프했다: `[[A|B]]` → `[[A\|B]]` (520개 파일, 884개 링크). Quartz는 원래 처리하지만 Obsidian 표가 깨지기 때문이다.
- 수식 안의 한글을 `\text{}`로 감쌌다 (KaTeX 경고 0건).
- frontmatter 바로 뒤에 붙은 `---`와 4줄 이상 연속된 빈 줄을 정리했다.
- `$` 기호를 이스케이프했다 (위험 분석 노트의 "화폐 가치 ($, ₩)").

### 1-2. 내용이 틀린 노트 4개를 다시 씀

UML의 관계, 프로젝트 관리 지식 영역, AI TRiSM, 데이터 가치 평가 제도.

### 1-3. 여러 버전이 이어 붙은 노트 33개를 한 버전으로 정리

2PL, 5G, 5G 특화망, AI 거버넌스, Smart Factory, SW Architecture 평가, 은행가 알고리즘, 가상 메모리, 가상화, 가설 검정, 가트너 2025 전략 기술, 강화학습, 개방형 연결 데이터, 개인정보 안심구역, 개인정보보호법, 결측치, 인공지능 감리, Physical AI, 3C 4C 분석, 6G, SOAR, 기술 부채, 요구사항 명세서, 가명처리 기법, 감리 PMO 비교표, 객체지향 설계 원리, 경사하강법, 고객여정지도, 공공 데이터베이스 표준화 관리 매뉴얼, 공공데이터, 관계검정, 기능안전 표준, 암호화, 차분 프라이버시.

- `가트너 2026 전략 기술`은 2025 노트에서 분리해 새로 만들었고, 경영전략 MOC에 추가했다.

### 1-4. 중복 병합 (82개 파일 삭제)

- 매핑은 `maintenance/merges.tsv`에 있다 (형식: `옛이름<TAB>정본`).
- 정본 노트들은 모두 새로 쓰고 aliases를 추가했다.
- `scripts/apply.js`가 일괄 처리한 내용:
  - 전체 content의 링크를 정본으로 바꿨다 (206개).
  - MOC에서 중복 항목을 지우고, 정본의 소속 도메인 MOC에만 남겼다.
  - 섹션별 개수 `(N)`, 소속 토픽 수, 마스터 MOC의 표·mermaid·총계를 다시 셌다.
  - 자기 자신 링크와 연관 토픽의 중복 줄을 지웠다.
- 노트 수: 1,128개 → 1,047개 (82개 삭제, `가트너 2026` 1개 추가).
- 일부러 합치지 않은 쌍:
  - `세션`(HTTP 세션)과 `Session Layer`(OSI 5계층)
  - `LISS (Linearly Independent Spanning Set)`(선형대수의 기저)와 `MECE와 LISS`(경영 프레임워크)
  - `추론 통계`와 `추정 이론` (추정 이론은 추론 통계의 하위 개념)

### 1-5. 사실 오류 수정 (정리 중 발견)

- 정족수 조건은 W+R>N이다.
- Bakery 알고리즘은 교착상태 처리가 아니라 상호배제 알고리즘이다.
- DB 옵티마이저(OPTIMIZER)와 ML 옵티마이저(최적화 알고리즘)를 분리했다.
- SOS랩 노트는 엉뚱한 회사(LiDAR 업체)를 설명하고 있어서 리빙랩에 합쳤다.
- ISMS-P 인증 기준은 101개 항목이다.
- O, Ω, Θ의 정의를 정확히 구분했다.
- XSS·CSRF 노트에서 `[[CSP]]`가 Content Security Policy 뜻으로 링크된 것을 고쳤다.
- 애자일 선언문의 왼쪽·오른쪽 가치 방향이 뒤바뀐 서술을 고쳤다.
- MAP 추정은 가우시안 사전분포가 L2, 라플라스 사전분포가 L1 정규화에 대응한다.
- 코사인 유사도는 거리 공리를 만족하지 않는다.
- iO(구분 불가능 난독화)는 2020년에 구성이 증명됐지만 실용 수준은 아니다.
- 그 밖의 분야별 수정 내역은 각 다듬기 세션의 보고에 있다 (3절 참고).

### 1-6. 링크 오류 수정

- `[[MAC]]`: MAC 노트는 강제적 접근통제와 메시지 인증코드를 다룬다.
  - MAC 주소 의미로 쓴 링크는 해제했다 (네트워크 노트 24개).
  - 곱셈누산 의미로 쓴 링크는 `[[MAC 배열|MAC]]`으로 바꿨다 (하드웨어 노트 12개).
- `[[캡슐화]]`: 객체지향 캡슐화 노트다. 패킷·키 캡슐화 의미로 쓴 11개 노트에서는 링크를 해제했다.
- `[[CSP]]`: SD-WAN 노트의 "통신사(CSP)"는 Communications Service Provider라서 링크를 해제했다. 나머지는 모두 Cloud Service Provider로 올바르다.
- 존재하지 않는 노트를 가리키던 링크를 정리했다.
  - TLS → SSL-TLS, PCIe → PCI Express, MMU → MMU(Memory Management Unit), 모니터 → 모니터 동기화로 연결했다.
  - TLB와 뮤텍스는 해당 노트가 없어서 링크를 해제했다.
  - RSA, LSTM, NPV IRR BCR PP는 별칭으로만 연결되던 링크라서 실제 파일명으로 바꿨다.
- 현재 상태: 해결되지 않는 링크는 3개뿐이며, 모두 `Interaction overview diagram` 노트의 mermaid `[[ref : ...]]` 노드 모양이라 실제 링크가 아니다. `01_IT Tech/블록체인` 같은 경로형 링크는 정상 작동하므로 그대로 둔다.

## 2. 문장 다듬기 기준

`maintenance/note-polish-guide.md`를 참고한다. 같은 내용이 gitignore된 `private/note-polish-guide.md`에도 있다. 요점은 다음과 같다.

- 구조: I 개요(정의 한 문장 + 2열 표) → II 개념도 + 3열 표 → III 비교표 + 동향 2~3개 → 연관 토픽 블록.
- 개조식으로 쓰고, 과장 표현("100%", "완벽", "압도적")과 장황한 표 헤더를 걷어낸다.
- 사실 검증을 최우선으로 한다. 확신이 없는 수치는 빼거나 "예:"로 표시한다.
- 링크는 동음이의어(MAC, 캡슐화, CSP)를 확인하고, 표 안에서는 `\|`로 쓴다.
- 파일은 삭제하거나 이름을 바꾸지 않는다. inline `<svg>`는 바이트 단위로 그대로 보존한다.

## 3. 분야별 다듬기 진행 현황 (2026-10-17 중단 시점)

- 10개 세션이 도메인별로 병렬 진행하다가 사용량 한도로 반복해서 멈췄다. 사용자 지시로 이 시점에서 중단하고 커밋했다.
- 판정 기준: 다듬기 세션 시작 시각(2026-10-17 07:10 KST) 이후에 수정된 노트를 "다듬음"으로 본다 (`scripts/progress.js`).

| 도메인 | 다듬음 | 병합 세션에서 정리 | 남음 | 상태 |
| --- | --- | --- | --- | --- |
| 운영체제 | 49 | 0 | 0 | 완료 |
| 디지털서비스 | 47 | 1 | 0 | 완료 |
| 프로젝트관리 | 46 | 1 | 3 | 완료 (3개는 점검 후 수정 불필요) |
| 경영전략 | 71 | 0 | 4 | 거의 완료 |
| 컴퓨터구조 | 70 | 2 | 11 | 진행 중 중단 |
| 데이터베이스 | 75 | 4 | 20 | 진행 중 중단 |
| 네트워크 | 63 | 5 | 27 | 진행 중 중단 |
| 소프트웨어공학 | 66 | 6 | 98 | 진행 중 중단 |
| 보안 | 72 | 1 | 105 | 진행 중 중단 |
| 인공지능 | 70 | 3 | 127 | 진행 중 중단 |

- "남음" 목록에는 아래 두 종류가 섞여 있다. 그래서 작업 전에 노트를 열어 이미 기준에 맞는지 먼저 확인한다.
  - 1-3·1-4에서 이미 다시 쓴 노트 (예: AGI, BCP, CPU, CRC, XSS, OS(운영체제) 등 병합 정본)
  - 점검 후 수정이 필요 없어 그대로 둔 노트
- 남은 노트 목록은 이 파일 맨 아래 부록에 있다.

## 4. 이어서 할 일

1. 부록 목록의 노트를 도메인별로 기준에 맞춰 다듬는다.
   - 사용량 한도를 고려해 동시에 돌리는 세션은 3~4개 이하로 한다.
   - 세션별 지시: "`maintenance/note-polish-guide.md`를 따르고, 자기 도메인 MOC에 있으면서 footer의 소속 도메인이 같은 노트만 수정한다. MOC는 수정하지 않고, 삭제·이름 변경·커밋은 하지 않는다. 끝나면 수정한 노트 수와 고친 사실 오류를 보고한다."
2. 다듬기를 마치면 아래 순서로 검증한다.
   - `node maintenance/scripts/linkcheck.js content`
   - `node maintenance/scripts/scan2.js "content/01_IT Tech"`
   - `node maintenance/scripts/mathko.js "content/01_IT Tech"`
   - `npx quartz build -o <임시 폴더>`
3. MOC의 소속 토픽 수가 바뀌었으면 `node maintenance/scripts/mastercount.js "content/01_IT Tech"`를 실행한다.
4. 커밋·푸시는 사용자가 요청할 때만 한다 (브랜치 v4).

## 5. 스크립트 (`maintenance/scripts/`, Node로 실행)

| 스크립트 | 용도 |
| --- | --- |
| view.js | `node view.js <dir> "노트1" "노트2"`: SVG를 `{{SVG:n}}`으로 접어서 출력. 긴 노트를 읽을 때 사용 |
| splice.js | `node splice.js <대상.md> <새본.md>`: 새본의 `{{SVG:n}}`·`{{CODE:n}}` 자리에 대상의 n번째 SVG·코드블록을 넣어 대상을 덮어씀. SVG가 있는 노트를 다시 쓸 때 사용 |
| apply.js | `node apply.js content merges.tsv [--write]`: 병합 일괄 적용 (링크 치환, MOC 정리·재집계, 파일 삭제). `--write` 없이 실행하면 미리보기만 함. 이미 적용했으므로 다시 실행하지 말 것 |
| linkcheck.js | 해결되지 않는 위키링크, 별칭으로만 연결되는 링크, 경로형 링크를 보고 |
| scan2.js | frontmatter 뒤 `---`, 깨진 수식, 홀수 개 `$`, 빈 제목, 과도한 빈 줄을 점검 (`--fix`로 일부 자동 수정) |
| fixtblpipe.js | 표 안 위키링크의 파이프를 이스케이프 |
| mathko.js | 수식 안 한글을 `\text{}`로 감쌈 (`--fix`) |
| mastercount.js | 도메인 MOC의 토픽 수를 마스터 MOC(00_02_IT_Tech_MOC)에 반영 |
| progress.js | `node progress.js <dir> <ISO 시각> "정리된|노트|목록"`: 도메인별 진행 현황을 집계하고 todo.json을 생성 |

## 6. 참고

- PowerShell 5.1 환경이다. Python은 없고 Node를 사용한다. 둥근 따옴표(“ ”)가 들어간 PowerShell 문자열은 파싱 오류가 나므로 Node 스크립트로 처리한다.
- 문제가 생기면 git으로 되돌릴 수 있다. 삭제한 82개 파일도 이전 커밋에 남아 있다.
- content 루트의 `테.md`, `운영체제 스케줄링.md`(추적되지 않는 파일)는 이번 작업과 무관한 사용자 파일이라 손대지 않았다.

## 부록. 남은 노트 목록 (도메인별)

### 프로젝트관리 (3)

- SCRUM
- 경제성 분석 기법
- 프로젝트 관리 지식 영역

### 경영전략 (4)

- OKR
- PDCA(Plan-Do-Check-Act, Deming Cycle)
- SLA
- 지식재산권

### 컴퓨터구조 (11)

- AVL 트리
- O-Notation (O-표기법)
- Queue
- 결함허용 컴퓨터
- 동적 계획법
- 런랭스 코딩
- 우선순위 역전현상
- 이진 탐색 트리
- 최소 신장 트리
- 트리 순회
- 힙

### 데이터베이스 (20)

- ANN(Approximate Nearest Neighbor)알고리즘
- Daap(Data as a product)
- EDM
- HDFS
- JDBC
- OPTIMIZER
- SQL(Structured Query Language)
- 공공 데이터베이스 표준화 관리 매뉴얼 (2023.04)
- 공공데이터
- 관계대수
- 관계해석
- 데이터 분석 거버넌스
- 배깅
- 부스팅
- 분류화
- 분석 모델 평가 방법
- 빅데이터 분석 기법
- 아파치 카프카
- 일반화
- 탐색적 데이터 분석과 확증적 데이터 분석

### 네트워크 (27)

- 5G 특화망
- 6G
- C-RAN(Centralized Cloud RAN)
- CRC
- FEC(Forward Error Correction) BEC(Backward Error Correction)
- IBN(Intent-Based Networking)
- NFC
- NFV
- NWDAF(Network Data Analytics Function)
- O-RAN
- QAM(Quadrature Amplitude Modulation)--
- QoS
- RAN(Radio Access Network) Sharing
- RFID
- SDR (Software Defined Radio)
- Sliding Window & 네이글(Nagle's) 알고리즘
- TCP 연결의 설정 및 해제
- Traffic Policing (트래픽 정책처리)
- Traffic Shaping (트래픽 쉐이핑)
- VAN
- Wi-Fi 7
- 링크 상태 알고리즘
- 망 중립성
- 매터
- 비지상네트워크
- 비직교 다중접속
- 저궤도 위성

### 소프트웨어공학 (98)

- 3R
- AI 개발비 산정
- AJAX
- Annotation
- AOP (Aspect Oriented Programming)
- API Gateway
- ARID
- ATAM
- Back to Back 테스트
- CBAM
- CMMI 3.0
- CMMI
- DDD (Domain Driven Design)
- Debugging
- EDA
- ETA (Event Tree Analysis)
- Factory Method (생성 위임)
- FTA (Fault Tree Analysis)
- Function Point
- GS 인증
- Interaction overview diagram
- ISO 29119-11
- ISO IEC 25010 2023
- ISO IEC IEEE 42010 2022
- JSON
- Keyword Driven Testing
- McCabe 회전 복잡도
- MSA (Micro Service Architecture)
- MVC 패턴 (Model-View-Controller Pattern)
- MVI (Model-View-Intent) 패턴
- MVVM (Model, View, View Model)
- Observer (상태 변화 통지)
- Proxy Pattern
- SAAM
- SAGA패턴
- SBOM
- Singleton (전역 인스턴스)
- SP 인증
- Strategy (알고리즘 교체)
- SW Architecture 구축 절차
- SW Architecture 평가
- SW 규모산정
- SW 안전성(SW Safety) 및 분석 개념
- Test 일반
- Timeout
- UML의 4+1 View Model
- UML의 관계
- XML
- 감리 PMO 비교표
- 객체지향 설계 원리
- 결합도
- 공공기관 정보화사업 예비타당성
- 공공소프트웨어사업 과업심의 가이드
- 기능안전 표준
- 다형성
- 디자인 패턴
- 리그레션 테스트
- 모듈화
- 무중단 배포
- 사용성 평가
- 상속성
- 상용 소프트웨어 직접구매 제도
- 상용 소프트웨어 품질성능 평가 시험
- 서비스 매쉬
- 성능 테스트 도구
- 소프트웨어 리팩토링
- 소프트웨어 아키텍처 스타일
- 소프트웨어 프로덕트 라인
- 소프트웨어사업 영향평가
- 어댑터 패턴
- 오픈소스 SW 보안위협
- 오픈소스 거버넌스
- 워터폴
- 위험 기반 테스트
- 응답시간
- 응집도
- 인스턴스
- 재사용
- 정량적 위험 분석
- 정보시스템 감리 의무 대상과 관점별 점검 기준
- 정보시스템 감리
- 정보시스템 운영 성과관리
- 정보시스템 운영 유지보수 감리
- 정보은닉
- 추상화
- 캡슐화
- 컴퓨팅적 사고능력
- 코드 커버리지
- 클래스 다이어그램
- 클래스
- 테스트 통제 도구
- 통합 테스트
- 튜링 테스트
- 퍼징 테스트
- 폐쇄형 라이선스
- 프레임워크
- 프로시저
- 화이트박스 테스트

### 보안 (105)

- AES
- APT(Advanced Persistent Threat) 공격
- BPF(Berkeley Packet Filter) Door
- C2
- C2PA
- CBPR
- CSRF
- CTAP
- CTI
- CVE
- CVSS
- CWE
- DAST
- DevSecOps
- DLP
- DMARC(Domain-based Message Authentication, Reporting and Conformance)
- DNS 싱크홀(Sinkhole)
- DRM(Digital Right Management)
- ECC
- ECDHE
- EDR(Endpoint Detection and Response)
- Elgamel
- Exploit
- FIDO 1.0 (Fast IDentity Online 1.0)
- FIDO 2.0 (Fast IDentity Online 2.0)
- FIDO
- FIPS (Federal Information Processing Standards)
- IAM
- IEC 62443
- IoT 보안 위협
- ISO 27017
- ISO 27018
- ISO IEC 20889
- Land Attack
- MITRE ATT&CK (Adversarial Tactics, Techniques & Common Knowledge)
- OAuth(Open Authorize) 2.0
- OWASP Top 10 2025
- OWASP Top 10 for LLM Application 2025
- PbD 인증제도
- PEC(Privacy-Enhancing Computation)
- RaaS(Ransomware as a Service)
- RSA (Rivest Shamir Adleman)
- SASE(Secure Access Service Edge)
- SDP(Software Defined Perimeter)
- SecaaS (Security as a Service)
- Secure Software Development Framework(SSDF)
- Shannon의 암호 설계 원칙
- SIEM
- SOAR (Security Orchestration, Automation and Response)
- SQL Injection
- SSRF(Server-Side Request Forgery)
- STRIDE
- WAAP
- XDR
- XSS
- 가명정보 처리 가이드라인
- 가명처리 기법
- 개인정보 보호기술
- 개인정보보호법
- 공격 표면 관리
- 공급망 공격
- 국가 망 보안체계
- 기밀컴퓨팅
- 데이터 안심구역
- 데이터 전송요구권
- 드라이브 바이 다운로드
- 드론 취약점 및 대응
- 디지털 면역 시스템
- 디피-헬만 알고리즘
- 딥보이스 피싱
- 루트킷
- 방화벽
- 버퍼 오버 플로우
- 비식별화
- 사이버 게놈
- 사이버 디셉션
- 사이버 레질리언스
- 사이버 보안 성숙도 모델 인증
- 사이버 킬 체인
- 사이버전
- 샌드박스
- 생체정보 보호 안내서(24.12)
- 스마트시티 보안취약점 및 대응방안
- 스마트카 보안 취약점 및 대응방안
- 시큐어코딩
- 암호화
- 양자내성암호
- 위험분석 방법론
- 위협 모델링
- 위협 헌팅
- 적대적 공격
- 전자기파 이용 공격
- 전자증거개시제도
- 정보보호 공시제도
- 정보보호제품 평가·인증 제도
- 지속적인 위협 노출 관리
- 차량 사이버 보안 국제 표준(ISO 21434)
- 차분 프라이버시
- 큐싱
- 클라우드 컴퓨팅 취약점 및 대응기술
- 클라우드 포렌식
- 핑거프린팅
- 해시 솔트와 키 스트레칭
- 행위기반 탐지기법
- 휴리스틱 탐지기법

### 인공지능 (127)

- Active Learning
- AEI
- AGI
- AI Agent
- AI Ready Data
- AI TRiSM
- AI 거버넌스
- AI 기본법
- AI 레드팀(Red team) 테스트
- AI 신뢰성 인증
- AI 윤리
- Atros Convolution
- AutoML (Automated Machine Learning)
- AX (AI Transformation)
- BERT
- BrainBody LLM
- COT
- CRISP-DM
- DCGAN
- Downstream Task
- Episodic Memory
- Feature Pyramid Network
- Fine-Tuning
- GradCAM
- Graph of Thought (GoT)
- GraphRAG (Graph Retrieval-Augmented Generation)
- ISO IEC TS 42119-2
- LAM(Large Action Model)
- LangGraph
- LAS
- LDA(Linear Discriminant Analysis)
- LIME
- LLMOps
- LRP
- LSTM (Long Short-Term Memory)
- MAS (Multi Agent System)
- MCP 보안취약점 및 대응방안
- MCP
- MLPerf
- MNIST
- MOE(Mixture of Experts)
- PEFT
- Physical AI
- Q러닝
- RAG (Retrieval Augmented Generation) 검색 증강 생성 AI
- RIG(Retrieval Interleaved Generation)
- RNN (Recurrent Neural Network)
- RNN-T
- RPN
- seq2seq
- sLLM (Smaller Large Language Model)
- Sovereign AI (소버린 AI)
- TF-IDF (Term Frequency - Inverse Document Frequency)
- ToT
- VAE
- XAI
- Z-검정
- 강화학습
- 경사하강법
- 공공부문 초거대AI 도입, 활용 가이드라인 2.0(2025.04)
- 과적합 문제
- 광학문자인식
- 기울기 소실과 기울기 폭주
- 대규모 언어 모델 성능 향상 기술
- 데이터 라벨링과 어노테이션
- 딥러닝
- 딥뷰
- 딥페이크
- 랜덤 포레스트
- 랭체인
- 마르코프 결정 프로세스
- 머신 언러닝
- 머신러닝 학습과정에서의 적대적 공격
- 머신러닝 학습방법
- 멀티모달 AI
- 멀티에이전트 강화학습
- 메타학습
- 모델 구조
- 모방 강화학습
- 바이브코딩
- 배치 정규화
- 버티컬 AI
- 범용 인공지능 위험관리 프레임워크
- 블랙박스 모델
- 생성형 AI 위협 및 대응방안
- 생성형 인공지능 서비스 이용자 보호 가이드라인
- 생성형 인공지능 저작권
- 생성형AI 데이터 품질관리 가이드 v2.0
- 심볼릭 추론
- 앙상블 학습
- 어텐션 메커니즘
- 에이전틱 AI
- 역전파
- 연합 학습
- 온디바이스 AI
- 유전 알고리즘
- 이미지넷
- 인공지능 감리
- 인공지능 경영시스템
- 인공지능 도입 사업비 산정 절차
- 인공지능 생성물 워터마크 적용 기술
- 인공지능 학습용 데이터 품질관리 가이드라인 v3.1
- 인공지능
- 자기 지도 증강
- 자기 집중
- 자기지도학습
- 장면 그래프
- 전용 인공지능
- 전이학습
- 정규화, 규제화, 표준화
- 지도학습
- 지식 증류
- 지식그래프
- 지지도
- 초거대 언어 모델
- 초대규모 AI 모델
- 컨텍스트 엔지니어링
- 테스트 타임 스케일링
- 트랜스포머
- 파운데이션 모델
- 편향
- 퓨샷러닝
- 프롬프트 엔지니어링
- 프롬프트 인젝션
- 프롬프트 튜닝
- 혼동행렬
- 활성화함수
