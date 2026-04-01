# 엔티티 도출

| entity_name | description | source_files | key_attributes | relations | priority |
|--------|------|------|------|------|------|
| user | 회원가입 및 로그인에 사용되는 사용자 계정 | login.html, signup.html | name, email, password_hash, signup_source, terms_agreed, last_login_at | user 1:N user_session, user 1:N inquiry(optional) | High |
| user_session | 로그인 상태 유지와 세션 추적 정보 | login.html | user_id, session_token, remember_me, expires_at, last_seen_at | user_session N:1 user | Mid |
| inquiry | 문의하기 폼으로 접수되는 고객 문의 | contact.html | user_id, name, email, inquiry_type, subject, message, attachment_path, status | inquiry N:1 user(optional) | High |
| sponsorship_plan | 후원 페이지에 노출되는 후원 플랜 콘텐츠 | support.html | name, slug, monthly_amount, badge_name, benefit_summary, is_featured, sort_order | 없음 | Low |
| project | 프로젝트 목록/등록/수정/상세에 사용되는 핵심 프로젝트 정보 | projects.html, project-create.html, project-edit.html, project-detail.html, project-completed.html | title, summary, description, category, author_name, project_type, status, cover_image_path | user 1:N project, project 1:N project_tag, project 1:N project_comment | High |
| project_tag | 프로젝트에 연결되는 기술 태그 | project-create.html, project-edit.html, project-detail.html | project_id, tag_name, sort_order | project_tag N:1 project | Mid |
| project_comment | 프로젝트 상세 댓글 데이터 | project-detail.html | project_id, user_id, author_name, content, like_count, parent_comment_id | project_comment N:1 project, project_comment N:1 user(optional) | Mid |