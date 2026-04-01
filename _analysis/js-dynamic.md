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
