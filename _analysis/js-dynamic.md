# JS 동적 렌더링 기록

정적 변환 시 참고용 기록. 해당 JS 로직은 파일에서 제거되었거나 show/hide 방식으로 교체되었습니다.

---

## faq.html — FAQ 카테고리 필터 / 검색

| 항목 | 내용 |
|------|------|
| 파일 | faq.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 정적 HTML 변환 완료, JS는 show/hide 방식으로 유지 |

### 원래 동작
- `var faqs` 배열에 FAQ 데이터(카테고리, 질문, 답변) 8건 하드코딩
- `renderFaqs()` 함수가 `$('#faqAccordion').html(...)` 로 아코디언 HTML을 동적 생성
- 카테고리 버튼 클릭 → `currentCat` 변경 후 `renderFaqs()` 재호출
- 검색 input → `faqs` 배열 필터 후 `renderFaqs()` 재호출

### 변환 방식
- FAQ 8건을 정적 HTML `<div class="faq-item" data-cat="...">` 으로 변환
- 카테고리 필터 / 검색: `$('.faq-item').toggleClass('d-none', ...)` 방식으로 교체
- 검색 기능 (`#faq-search`)은 JS show/hide 로 유지 (정적 HTML 기반)

---

## projects.html — 프로젝트 카드 동적 렌더링

| 항목 | 내용 |
|------|------|
| 파일 | projects.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 정적 카드 6건 변환 완료, JS는 DOM 필터·정렬·페이지네이션만 유지 |

### 원래 동작
- `var projects` 배열에 프로젝트 데이터 6건 하드코딩
- `renderCard(p)` 함수가 카드 HTML 문자열을 반환, `$('#project-grid').html(html)` 로 주입
- `statusBadge(p)`, `questBar(p)` 헬퍼 함수도 HTML 문자열 반환
- 카테고리/필터/정렬 버튼 → `filtered()` 재실행 후 `render()` 호출
- "더 보기" 버튼으로 페이지네이션 (`visible += PAGE`)

### 변환 방식
- 프로젝트 카드 6건을 `#project-grid` 내 정적 HTML로 이동
- 카드 클릭, 필터, 검색, 정렬, 더보기는 기존 DOM 요소 show/hide 및 재정렬 방식으로 교체
- `renderCard()`, `statusBadge()`, `questBar()` 및 `$('#project-grid').html(...)` 제거

---

## project-create.html — 기술 태그 동적 렌더링

| 항목 | 내용 |
|------|------|
| 파일 | project-create.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 정적 태그 목록 15건 변환 완료, JS는 선택 상태 토글만 유지 |

### 원래 동작
- `var availableTags` 배열에 태그 목록 15건 하드코딩
- `renderTags()` 함수가 `$('#tag-container').html(html)` 로 태그 뱃지 동적 생성
- 태그 클릭 → `selectedTags` 배열 토글 후 `renderTags()` 재호출

### 변환 방식
- 태그 15건을 `#tag-container` 내 정적 HTML로 이동
- 스크립트는 `data-tag` 기반으로 클래스와 텍스트만 갱신
- 유효성 경고 목록도 문자열 주입 대신 DOM append 방식으로 변경

---

## project-edit.html — 태그 편집 / 갤러리 동적 렌더링

| 항목 | 내용 |
|------|------|
| 파일 | project-edit.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 템플릿 기반 DOM 복제로 전환 완료, 문자열 마크업 제거 |

### 원래 동작
- `renderTags()` 함수가 `$('#tagArea').html(html)` 로 태그 목록 동적 생성
- `initForm()` 에서 URL 파라미터 `id` 기반으로 `projectDB` 객체 조회 후 폼 값 주입
- FileReader API로 업로드 이미지를 갤러리에 동적 append (`$('#galleryGrid').append(col)`)

### 변환 방식
- 태그 기본 마크업을 문서에 두고 `template#project-tag-template` 복제로 렌더링 변경
- 갤러리 업로드는 `template#project-gallery-item-template` 복제로 변경
- 갤러리 삭제 버튼 중복 `class` 속성 제거 및 파손 마크업 정리 완료

---

## project-detail.html — 댓글 추가 UI

| 항목 | 내용 |
|------|------|
| 파일 | project-detail.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 댓글 템플릿 기반 DOM 복제로 전환 완료 |

### 원래 동작
- 댓글 작성 시 HTML 문자열을 조합해 `#comment-list` 에 append
- 댓글 수 표시도 버튼 전체 HTML 문자열 재주입 방식으로 갱신

### 변환 방식
- `template#comment-item-template` 를 실제 마크업으로 추가
- 새 댓글은 템플릿 복제 후 텍스트만 주입하는 방식으로 변경
- 댓글 수는 배지 텍스트와 제목 텍스트만 갱신하도록 단순화
