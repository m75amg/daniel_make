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
| 상태 | 정적 샘플 카드 1건 추가, JS 렌더링 로직 유지 (필터·페이지네이션 의존) |

### 원래 동작
- `var projects` 배열에 프로젝트 데이터 6건 하드코딩
- `renderCard(p)` 함수가 카드 HTML 문자열을 반환, `$('#project-grid').html(html)` 로 주입
- `statusBadge(p)`, `questBar(p)` 헬퍼 함수도 HTML 문자열 반환
- 카테고리/필터/정렬 버튼 → `filtered()` 재실행 후 `render()` 호출
- "더 보기" 버튼으로 페이지네이션 (`visible += PAGE`)

### 변환 방식
- 정적 샘플 카드 1건을 `#project-grid` 내에 추가 (JS 비활성 환경 대비)
- JS 렌더링·필터·정렬 로직은 기능 의존성이 높아 유지 (서버사이드 렌더링으로 전환 시 제거 대상)

---

## project-create.html — 기술 태그 동적 렌더링

| 항목 | 내용 |
|------|------|
| 파일 | project-create.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 정적 샘플 태그 추가, JS 렌더링 로직 유지 (선택 상태 토글 의존) |

### 원래 동작
- `var availableTags` 배열에 태그 목록 15건 하드코딩
- `renderTags()` 함수가 `$('#tag-container').html(html)` 로 태그 뱃지 동적 생성
- 태그 클릭 → `selectedTags` 배열 토글 후 `renderTags()` 재호출

### 변환 방식
- 정적 샘플 태그 7건을 `#tag-container` 내에 추가
- JS 선택 토글 로직은 UX 의존성이 높아 유지

---

## project-edit.html — 태그 편집 / 갤러리 동적 렌더링

| 항목 | 내용 |
|------|------|
| 파일 | project-edit.html |
| 처리 일시 | 2026-04-01 |
| 상태 | 정적 샘플 태그 추가, 갤러리 업로드 JS 유지 |

### 원래 동작
- `renderTags()` 함수가 `$('#tagArea').html(html)` 로 태그 목록 동적 생성
- `initForm()` 에서 URL 파라미터 `id` 기반으로 `projectDB` 객체 조회 후 폼 값 주입
- FileReader API로 업로드 이미지를 갤러리에 동적 append (`$('#galleryGrid').append(col)`)

### 변환 방식
- 정적 샘플 태그 6건을 `#tagArea` 내에 추가
- 갤러리 이미지 업로드·initForm·저장 로직은 기능 의존성이 높아 유지
- 파손된 HTML 수정: img 태그 미종료 (`class` 속성 중복, `>` 누락) → 정상 마크업으로 교체
