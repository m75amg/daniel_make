**여기에 나만의 가이드라인을 추가하세요**
<!--

시스템 가이드라인

이 파일을 사용하여 AI가 따라야 할 규칙과 지침을 제공하세요.
이 템플릿은 추가할 수 있는 몇 가지 예시를 제공합니다. 필요에 맞게 섹션을 추가하고 형식을 변경할 수 있습니다.

팁: 많은 컨텍스트가 항상 좋은 것은 아닙니다. LLM을 혼란스럽게 할 수 있습니다. 가장 중요한 규칙만 추가하세요.

# 일반 가이드라인

AI가 따르길 원하는 일반적인 규칙입니다.
예시:

* 꼭 필요한 경우에만 절대 위치 지정을 사용하세요. 기본적으로 flexbox와 grid를 사용하는 반응형의 잘 구조화된 레이아웃을 선택하세요.
* 코드를 작성하면서 리팩토링하여 코드를 깔끔하게 유지하세요.
* 파일 크기를 작게 유지하고 헬퍼 함수와 컴포넌트는 별도 파일에 배치하세요.

--------------

# 디자인 시스템 가이드라인
AI가 회사의 디자인 시스템처럼 생성물을 만들기 위한 규칙입니다.

또한, 프롬프트 박스에서 사용할 디자인 시스템을 선택하면
디자인 시스템의 컴포넌트, 토큰, 변수를 참조할 수 있습니다.
예시:

* 기본 폰트 크기는 14px을 사용하세요.
* 날짜 형식은 항상 “Jun 10” 형식으로 표기하세요.
* 하단 툴바에는 최대 4개의 항목만 포함되어야 합니다.
* 하단 툴바와 함께 플로팅 액션 버튼을 사용하지 마세요.
* 칩은 항상 3개 이상의 세트로 사용해야 합니다.
* 옵션이 2개 이하인 경우 드롭다운을 사용하지 마세요.

하위 섹션을 만들고 더 구체적인 세부 사항을 추가할 수도 있습니다.
예시:


## 버튼 (Button)
버튼 컴포넌트는 디자인 시스템의 핵심 인터랙티브 요소로, 액션을 실행하거나
사용자가 애플리케이션을 탐색할 수 있도록 설계되었습니다. 시각적 피드백과 명확한 어포던스를 제공하여 사용자 경험을 향상시킵니다.

### 사용법
버튼은 폼 제출, 선택 확인, 프로세스 시작 등 사용자가 취해야 할 중요한 액션에 사용해야 합니다.
상호작용성을 전달하며 명확하고 행동 지향적인 레이블을 가져야 합니다.

### 변형
* 기본(Primary) 버튼
  * 목적: 섹션 또는 페이지의 주요 액션에 사용
  * 시각 스타일: 굵고, 브랜드 주요 색상으로 채워짐
  * 사용법: 섹션당 하나의 기본 버튼으로 가장 중요한 액션으로 사용자를 안내
* 보조(Secondary) 버튼
  * 목적: 대안적이거나 보조적인 액션에 사용
  * 시각 스타일: 주요 색상으로 외곽선 처리, 투명한 배경
  * 사용법: 덜 중요한 액션을 위해 기본 버튼과 함께 사용 가능
* 3차(Tertiary) 버튼
  * 목적: 가장 덜 중요한 액션에 사용
  * 시각 스타일: 테두리 없는 텍스트만, 주요 색상 사용
  * 사용법: 강조하지 않고 이용 가능하게 해야 하는 액션에 사용
-->

---

**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
