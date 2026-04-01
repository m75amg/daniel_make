# 테이블 스키마 설계

### 테이블명: users
- 설명: 회원가입과 로그인에 사용되는 사용자 계정 정보
- 근거 파일: signup.html, login.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| name | NVARCHAR(50) | Y | — | 사용자 이름 |
| email | NVARCHAR(100) | Y | — | 로그인 이메일, UNIQUE 대상 |
| password_hash | NVARCHAR(255) | Y | — | 비밀번호 해시 |
| signup_source | VARCHAR(20) | Y | 'email' | 가입 경로(email, google, kakao) |
| terms_agreed | BIT | Y | 0 | 약관 동의 여부 |
| is_active | BIT | Y | 1 | 계정 활성 상태 |
| last_login_at | DATETIME | N | — | 마지막 로그인 시각 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE users (
  id            INT            IDENTITY(1,1) NOT NULL,
  name          NVARCHAR(50)   NOT NULL,
  email         NVARCHAR(100)  NOT NULL,
  password_hash NVARCHAR(255)  NOT NULL,
  signup_source VARCHAR(20)    NOT NULL DEFAULT 'email',
  terms_agreed  BIT            NOT NULL DEFAULT 0,
  is_active     BIT            NOT NULL DEFAULT 1,
  last_login_at DATETIME       NULL,
  created_at    DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at    DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_users PRIMARY KEY (id),
  CONSTRAINT UQ_users_email UNIQUE (email)
);

### 테이블명: user_sessions
- 설명: 로그인 세션 및 로그인 상태 유지 정보
- 근거 파일: login.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| user_id | INT | Y | — | FK → users |
| session_token | VARCHAR(255) | Y | — | 세션 토큰 |
| remember_me | BIT | Y | 0 | 로그인 상태 유지 여부 |
| login_ip | VARCHAR(45) | N | — | 로그인 IP |
| user_agent | NVARCHAR(255) | N | — | 접속 브라우저 정보 |
| expires_at | DATETIME | Y | — | 세션 만료 일시 |
| last_seen_at | DATETIME | N | — | 마지막 활동 일시 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE user_sessions (
  id            INT            IDENTITY(1,1) NOT NULL,
  user_id       INT            NOT NULL,
  session_token VARCHAR(255)   NOT NULL,
  remember_me   BIT            NOT NULL DEFAULT 0,
  login_ip      VARCHAR(45)    NULL,
  user_agent    NVARCHAR(255)  NULL,
  expires_at    DATETIME       NOT NULL,
  last_seen_at  DATETIME       NULL,
  created_at    DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at    DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_user_sessions PRIMARY KEY (id),
  CONSTRAINT FK_user_sessions_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

### 테이블명: inquiries
- 설명: 문의하기 페이지에서 접수되는 문의 데이터
- 근거 파일: contact.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| user_id | INT | N | — | 로그인 사용자 문의 시 FK → users |
| name | NVARCHAR(50) | Y | — | 문의자 이름 |
| email | NVARCHAR(100) | Y | — | 문의자 이메일 |
| inquiry_type | NVARCHAR(30) | Y | '일반 문의' | 문의 유형 |
| subject | NVARCHAR(200) | Y | — | 문의 제목 |
| message | NVARCHAR(MAX) | Y | — | 문의 내용 |
| attachment_path | NVARCHAR(255) | N | — | 첨부 파일 경로 |
| status | VARCHAR(20) | Y | 'received' | 문의 처리 상태 |
| answered_at | DATETIME | N | — | 답변 완료 일시 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE inquiries (
  id              INT            IDENTITY(1,1) NOT NULL,
  user_id         INT            NULL,
  name            NVARCHAR(50)   NOT NULL,
  email           NVARCHAR(100)  NOT NULL,
  inquiry_type    NVARCHAR(30)   NOT NULL DEFAULT N'일반 문의',
  subject         NVARCHAR(200)  NOT NULL,
  message         NVARCHAR(MAX)  NOT NULL,
  attachment_path NVARCHAR(255)  NULL,
  status          VARCHAR(20)    NOT NULL DEFAULT 'received',
  answered_at     DATETIME       NULL,
  created_at      DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at      DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_inquiries PRIMARY KEY (id),
  CONSTRAINT FK_inquiries_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

### 테이블명: sponsorship_plans
- 설명: 후원 페이지에 표시되는 후원 플랜 콘텐츠 관리
- 근거 파일: support.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| name | NVARCHAR(100) | Y | — | 플랜명 |
| slug | VARCHAR(50) | Y | — | 고유 식별 슬러그 |
| monthly_amount | INT | Y | 0 | 월 후원 금액 |
| badge_name | NVARCHAR(50) | N | — | 배지명 |
| benefit_summary | NVARCHAR(MAX) | N | — | 혜택 요약 |
| is_featured | BIT | Y | 0 | 대표 노출 여부 |
| is_active | BIT | Y | 1 | 사용 여부 |
| support_contact_email | NVARCHAR(100) | N | — | 후원 문의 메일 |
| sort_order | INT | Y | 0 | 노출 순서 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE sponsorship_plans (
  id                    INT            IDENTITY(1,1) NOT NULL,
  name                  NVARCHAR(100)  NOT NULL,
  slug                  VARCHAR(50)    NOT NULL,
  monthly_amount        INT            NOT NULL DEFAULT 0,
  badge_name            NVARCHAR(50)   NULL,
  benefit_summary       NVARCHAR(MAX)  NULL,
  is_featured           BIT            NOT NULL DEFAULT 0,
  is_active             BIT            NOT NULL DEFAULT 1,
  support_contact_email NVARCHAR(100)  NULL,
  sort_order            INT            NOT NULL DEFAULT 0,
  created_at            DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at            DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_sponsorship_plans PRIMARY KEY (id),
  CONSTRAINT UQ_sponsorship_plans_slug UNIQUE (slug)
);

### 테이블명: projects
- 설명: 프로젝트 목록, 상세, 완료 페이지에 노출되는 프로젝트 기본 정보
- 근거 파일: projects.html, project-create.html, project-edit.html, project-detail.html, project-completed.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| user_id | INT | N | — | FK → users |
| title | NVARCHAR(200) | Y | — | 프로젝트 제목 |
| summary | NVARCHAR(255) | Y | — | 한 줄 요약 |
| description | NVARCHAR(MAX) | Y | — | 프로젝트 상세 설명 |
| category | NVARCHAR(50) | Y | — | 카테고리 |
| author_name | NVARCHAR(50) | Y | — | 작성자 표시명 |
| project_type | VARCHAR(20) | Y | 'personal' | personal, contest |
| status | VARCHAR(20) | Y | 'draft' | draft, in_progress, completed |
| contest_name | NVARCHAR(100) | N | — | 연결 콘테스트명 |
| award_name | NVARCHAR(100) | N | — | 수상명 |
| github_url | NVARCHAR(255) | N | — | GitHub 링크 |
| demo_url | NVARCHAR(255) | N | — | 데모 영상 링크 |
| reference_url | NVARCHAR(255) | N | — | 참고 링크 |
| cover_image_path | NVARCHAR(255) | N | — | 대표 이미지 경로 |
| like_count | INT | Y | 0 | 좋아요 수 |
| view_count | INT | Y | 0 | 조회 수 |
| comment_count | INT | Y | 0 | 댓글 수 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE projects (
  id               INT            IDENTITY(1,1) NOT NULL,
  user_id          INT            NULL,
  title            NVARCHAR(200)  NOT NULL,
  summary          NVARCHAR(255)  NOT NULL,
  description      NVARCHAR(MAX)  NOT NULL,
  category         NVARCHAR(50)   NOT NULL,
  author_name      NVARCHAR(50)   NOT NULL,
  project_type     VARCHAR(20)    NOT NULL DEFAULT 'personal',
  status           VARCHAR(20)    NOT NULL DEFAULT 'draft',
  contest_name     NVARCHAR(100)  NULL,
  award_name       NVARCHAR(100)  NULL,
  github_url       NVARCHAR(255)  NULL,
  demo_url         NVARCHAR(255)  NULL,
  reference_url    NVARCHAR(255)  NULL,
  cover_image_path NVARCHAR(255)  NULL,
  like_count       INT            NOT NULL DEFAULT 0,
  view_count       INT            NOT NULL DEFAULT 0,
  comment_count    INT            NOT NULL DEFAULT 0,
  created_at       DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at       DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_projects PRIMARY KEY (id),
  CONSTRAINT FK_projects_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

### 테이블명: project_tags
- 설명: 프로젝트별 기술 태그 연결
- 근거 파일: project-create.html, project-edit.html, project-detail.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| project_id | INT | Y | — | FK → projects |
| tag_name | NVARCHAR(50) | Y | — | 태그명 |
| sort_order | INT | Y | 0 | 노출 순서 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE project_tags (
  id         INT           IDENTITY(1,1) NOT NULL,
  project_id INT           NOT NULL,
  tag_name   NVARCHAR(50)  NOT NULL,
  sort_order INT           NOT NULL DEFAULT 0,
  created_at DATETIME      NOT NULL DEFAULT GETDATE(),
  updated_at DATETIME      NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_project_tags PRIMARY KEY (id),
  CONSTRAINT FK_project_tags_project_id FOREIGN KEY (project_id) REFERENCES projects (id)
);

### 테이블명: project_comments
- 설명: 프로젝트 상세 페이지 댓글 및 답글 데이터
- 근거 파일: project-detail.html

| 컬럼명 | 타입 | NOT NULL | DEFAULT | 설명 |
|--------|------|----------|---------|------|
| id | INT IDENTITY(1,1) | Y | — | PK |
| project_id | INT | Y | — | FK → projects |
| user_id | INT | N | — | FK → users |
| parent_comment_id | INT | N | — | 자기참조 FK, 답글용 |
| author_name | NVARCHAR(50) | Y | — | 작성자 표시명 |
| content | NVARCHAR(MAX) | Y | — | 댓글 내용 |
| like_count | INT | Y | 0 | 댓글 좋아요 수 |
| created_at | DATETIME | Y | GETDATE() | 등록일 |
| updated_at | DATETIME | Y | GETDATE() | 수정일 |

CREATE TABLE project_comments (
  id                INT            IDENTITY(1,1) NOT NULL,
  project_id        INT            NOT NULL,
  user_id           INT            NULL,
  parent_comment_id INT            NULL,
  author_name       NVARCHAR(50)   NOT NULL,
  content           NVARCHAR(MAX)  NOT NULL,
  like_count        INT            NOT NULL DEFAULT 0,
  created_at        DATETIME       NOT NULL DEFAULT GETDATE(),
  updated_at        DATETIME       NOT NULL DEFAULT GETDATE(),
  CONSTRAINT PK_project_comments PRIMARY KEY (id),
  CONSTRAINT FK_project_comments_project_id FOREIGN KEY (project_id) REFERENCES projects (id),
  CONSTRAINT FK_project_comments_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT FK_project_comments_parent_id FOREIGN KEY (parent_comment_id) REFERENCES project_comments (id)
);