# 프로젝트 지침

## 작업 범위
- 이 프로젝트의 작업 범위는 현재 폴더(/프로젝트명) 및 하위 폴더로 제한합니다.
- 상위 디렉토리(../)는 절대 접근하지 마세요.
- 외부 시스템 명령 실행은 명시적으로 요청받은 경우에만 허용합니다.

## 프로젝트 개요
- 언어: HTML/CSS
- DB: Microsoft SQL Server 2008
- 구성: HTML 파일 30여 개, 정적 웹사이트
- 주요 작업: ① CSS 통합, ② HTML 구조 분석 및 DB 테이블 설계
- DB 설계 대상: 콘텐츠/게시물, 폼 입력 데이터 (회원, 문의 등)

---

## 공통 원칙

- 한 번 요청에 처리할 파일은 **3~5개 이하**로 제한
- 파일을 읽을 때 **CSS 스타일 정보와 HTML 구조 정보를 동시에 추출**하여 작업 1, 2에 함께 활용 (같은 파일을 두 번 읽지 않음)
- 작업 완료 파일은 각 섹션 체크리스트에 즉시 `[x]` 로 표시
- 세션이 바뀌어도 이 파일의 체크리스트와 산출물 섹션을 참조하여 이어서 작업

---

## 작업 1 — JavaScript 마크업 추출 및 SEO 최적화

### 목표
JavaScript 코드 내에 포함된 HTML 마크업(문자열 템플릿, innerHTML, document.write 등)을
정적 HTML로 추출하여 검색엔진이 크롤링 가능한 구조로 변환한다.

### 탐지 대상 패턴
아래 패턴이 발견되면 추출 및 변환 대상으로 처리한다:

1. **템플릿 리터럴** — `` ` `` 백틱 안의 HTML 문자열
   ```js
   element.innerHTML = `<div class="card">...</div>`
   ```
2. **문자열 연결** — `+` 로 이어붙인 HTML 문자열
   ```js
   html += '<li><a href="' + url + '">' + title + '</a></li>'
   ```
3. **document.write** — 페이지 로드 시 마크업 출력
   ```js
   document.write('<section>...</section>')
   ```
4. **JS 템플릿 엔진** — Mustache, Handlebars, EJS 등 템플릿 문법
   ```js
   {{#each items}}<li>{{title}}</li>{{/each}}
   ```

### 처리 규칙
1. JS에서 마크업 추출 → 해당 위치에 정적 HTML로 삽입
2. 동적으로 반복 생성되는 구조(리스트, 카드 등)는 대표 샘플 1개를 정적으로 작성하고 주석으로 표시
   ```html
   <!-- TODO: 동적 렌더링 → 서버사이드 또는 SSG로 전환 필요 -->
   ```
3. SEO 필수 태그 누락 시 추가
   - `<title>` — 페이지별 고유 타이틀
   - `<meta name="description">` — 140자 이내 요약
   - `<meta property="og:*">` — OG 태그 (title, description, image, url)
   - heading 계층 구조 (`<h1>` 1개, `<h2>` ~ 순차적)
   - 이미지 `alt` 속성 누락 시 추가
   - `<a>` 태그 의미 없는 텍스트("click here", "더보기" 단독) → 구체적 텍스트로 교체 권고
4. JS로만 렌더링되어 정적 변환이 불가한 경우 별도 목록(`_analysis/js-dynamic.md`)에 기록

### SEO 체크 항목 (파일당)
- [ ] `<title>` 고유 여부
- [ ] `<meta description>` 존재 여부
- [ ] OG 태그 존재 여부
- [ ] `<h1>` 1개 사용 여부
- [ ] heading 계층 순서 준수 여부
- [ ] 이미지 `alt` 속성 여부
- [ ] JS 마크업 → 정적 변환 완료 여부

### 진행 체크리스트
- [ ] index.html
- [ ] (파일 목록 확인 후 추가)

---

## 작업 2 — HTML 분석 및 DB 테이블 설계

### 목표
각 HTML 파일을 분석하여 페이지에 담긴 데이터 구조를 파악하고,
이를 기반으로 DB 테이블 스키마를 설계한다.
결과물은 `_analysis/` 폴더에 마크다운 파일로 저장한다.

### 파일 1회 열람 시 추출 항목 (작업 1·2 동시 처리)
- `<title>`, `<meta>` 정보
- 전체 섹션 구조 (`<header>`, `<main>`, `<section>`, `<footer>` 등)
- `<style>` 블록 전체 및 `style=""` 인라인 스타일 전체 (CSS는 디자이너 완료, 참고용)
- `<script>` 내부 HTML 마크업 패턴 (작업 1용)
- `<form>` — 입력 필드명, type, name, required 속성 → 회원/문의 테이블 후보
- `<table>`, 반복되는 리스트/카드 구조 → 콘텐츠/게시물 테이블 후보
- 링크/버튼에서 유추되는 관계 (예: 상세보기 → 1:N 관계)
- 페이징, 검색, 카테고리 UI → 관련 컬럼 및 인덱스 후보

---

### DB 설계 산출물 구성

#### 1단계 — 엔티티 도출 (`_analysis/entities.md`)
HTML 전체를 훑은 후 도출된 엔티티(테이블 후보) 목록

| 컬럼명 | 설명 |
|--------|------|
| `entity_name` | 엔티티명 (영문, 단수형. 예: `user`, `post`, `inquiry`) |
| `description` | 설명 |
| `source_files` | 근거가 된 HTML 파일 목록 |
| `key_attributes` | 주요 속성 후보 (콤마 구분) |
| `relations` | 연관 엔티티 (예: `user 1:N post`) |
| `priority` | 설계 우선순위 (High / Mid / Low) |

---

#### 2단계 — 테이블 스키마 설계 (`_analysis/schema.md`)
엔티티별 DDL 및 컬럼 명세

각 테이블마다 아래 형식으로 작성:

```
### 테이블명: {table_name}
- 설명: {용도 설명}
- 근거 파일: {HTML 파일명}

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id     | INT IDENTITY(1,1) | Y | — | PK |
| ...    | ...  | ...      | ...     | ... |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE {table_name} (
  id          INT           IDENTITY(1,1) NOT NULL,
  ...
  created_at  DATETIME      NOT NULL DEFAULT GETDATE(),
  updated_at  DATETIME      NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_{table_name} PRIMARY KEY (id)
);
```

설계 규칙 (MSSQL 2008 기준):
- 모든 테이블에 `id` (PK, `INT IDENTITY(1,1)`), `created_at`, `updated_at` 포함
- `created_at`, `updated_at` 타입은 `DATETIME`, 기본값 `GETDATE()`
- 외래키는 `{참조테이블단수형}_id` 형식 (예: `user_id`)
- 컬럼명은 snake_case
- 문자열 타입: 한글 포함 시 `NVARCHAR`, 영문 전용 `VARCHAR`
- `NVARCHAR(MAX)` — 본문/내용처럼 길이 제한 없는 컬럼
- `BIT` — Y/N, 노출여부, 사용여부 등 Boolean 성격 컬럼
- `<form>` 의 `name` 속성을 컬럼명 후보로 우선 사용
- HTML에 노출되는 텍스트 길이를 보고 NVARCHAR 길이 추정
- MSSQL 2008은 `OFFSET-FETCH` 미지원 → 페이징은 `ROW_NUMBER()` 방식으로 설계
- `AUTO_INCREMENT`, `SERIAL`, `JSON` 타입 사용 금지 (미지원)

---

#### 3단계 — ERD 요약 (`_analysis/erd.md`)
텍스트 기반 관계도 (Mermaid 형식)

```
erDiagram
  USER ||--o{ POST : writes
  POST ||--o{ COMMENT : has
  ...
```

---

#### 4단계 — dbdiagram.io 스크립트 (`_analysis/dbdiagram.dbml`)
https://dbdiagram.io 에 그대로 붙여넣어 ERD를 시각화할 수 있는 DBML 스크립트

작성 규칙:
- `schema.md` 의 테이블 설계를 기반으로 DBML 형식으로 변환
- 외래키 관계는 `Ref:` 로 명시
- 컬럼 주석은 `note:` 로 추가
- 형식 예시:

```
Table users {
  id         int         [pk, increment, note: 'PK']
  username   nvarchar(50) [not null, note: '사용자명']
  email      nvarchar(100) [not null]
  created_at datetime    [default: `GETDATE()`, note: '등록일']
  updated_at datetime    [default: `GETDATE()`, note: '수정일']
}

Table posts {
  id         int          [pk, increment]
  user_id    int          [not null, note: 'FK → users']
  title      nvarchar(200) [not null]
  content    nvarchar(max)
  is_visible bit          [default: 1, note: '노출여부']
  created_at datetime     [default: `GETDATE()`]
  updated_at datetime     [default: `GETDATE()`]
}

Ref: posts.user_id > users.id
```

---

### 진행 체크리스트
- [ ] index.html
- [ ] (파일 목록 확인 후 추가)

---

## 작업 히스토리

### 저장 위치
작업 유형별 + 날짜별 1개 파일로 누적 기록

```
_history/
  work1-YYYY-MM-DD.md   ← 작업1 (JS 마크업 추출 및 SEO 최적화)
  work2-YYYY-MM-DD.md   ← 작업2 (HTML 분석 및 DB 테이블 설계)
```

### 기록 시점
- 배치 작업 완료 시마다 즉시 기록
- 세션 종료 전 반드시 저장
- 같은 날 동일 작업을 여러 배치 진행한 경우 같은 파일에 이어서 추가

### 파일 형식

```markdown
# 작업1 히스토리 — YYYY-MM-DD
(작업2의 경우 "작업2 히스토리"로 표기)

---

## [HH:MM] 배치N

| 항목 | 내용 |
|------|------|
| 작업 일시 | YYYY-MM-DD HH:MM |
| 처리 파일 | index.html, about.html |

### 변경 내용
- index.html: JS 템플릿 리터럴 3건 → 정적 HTML 변환, `<meta description>` 추가
- about.html: `document.write` 1건 제거, `<h1>` 누락 추가

### 오류/예외 사항
- contact.html: 동적 렌더링 구조로 정적 변환 불가 → `_analysis/js-dynamic.md` 기록
- (없으면 "없음" 으로 표기)

---

## [HH:MM] 배치N+1
...
```

### 히스토리 파일 목록
- [ ] (작업 시작 후 자동 생성)

---

## 산출물 현황

| 항목 | 상태 | 마지막 업데이트 |
|------|------|----------------|
| `/assets/css/make2026-styles.css` 생성 | ✅ 디자이너 완료 | — |
| `_history/work1-YYYY-MM-DD.md` | ☐ | — |
| `_history/work2-YYYY-MM-DD.md` | ☐ | — |
| `_analysis/js-dynamic.md` | ☐ | — |
| `_analysis/entities.md` | ☐ | — |
| `_analysis/schema.md` | ☐ | — |
| `_analysis/erd.md` | ☐ | — |
| `_analysis/dbdiagram.dbml` | ☐ | — |

---

## 세션 이어받기

새 세션 시작 시 아래와 같이 요청:
```
CLAUDE.md 의 체크리스트를 확인하고,
처리되지 않은 파일 중 다음 배치를 진행해줘.
[작업1 CSS통합 / 작업2 테이블분석] 중 {선택}
```