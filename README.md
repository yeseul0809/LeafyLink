# LeafyLink

- **서비스주소**: www.leafylink.co.kr/

## 0. 팀원 소개

<table>
   <tr>
    <td align="center"><b>한예슬</b></td>
    <td align="center"><b>강희진</b></td>
    <td align="center"><b>손서영</b></td>
    <td align="center"><b>한종섭</b></td>
    <td align="center"><b>김경아</b></td>
  </tr>
    <tr>
    <td align="center">팀장</td>
    <td align="center">팀원</td>
    <td align="center">팀원</td>
    <td align="center">팀원</td>
    <td align="center">디자이너</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yeseul0809"><img src="https://avatars.githubusercontent.com/u/166012944?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/raccoonboy0803"><img src="https://avatars.githubusercontent.com/u/112606000?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/sonsy723"><img src="https://avatars.githubusercontent.com/u/139070143?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/hanjongseop"><img src="https://avatars.githubusercontent.com/u/165746887?v=4" width="100px" /></a></td>
    <td align="center"><img src="https://cirbxzxyrghkthxdsrpe.supabase.co/storage/v1/object/public/product-image/product_imgs/designer.png" width="100px" /></td>
  </tr>
  <tr>
    <td align="center">상품 상세페이지,<br/>상품 등록페이지,<br/>1:1 채팅 서비스</td>
    <td align="center">회원가입,<br/>결제 및 장바구니,<br/>라이브 스트리밍</td>
    <td align="center">메인 페이지,<br/>헤더 및 푸터</td>
    <td align="center">구매자, 판매자<br/>마이페이지</td>
    <td align="center">디자인 QA,<br/>디자인시스템<br>UX/UI디자인</td>
  </tr>
</table>

## 0-1. 프로젝트 진행 기간

- 2024.07.16 ~ 2024.08.21

## 0-2. 사용 기술 스택

### 배포 및 서비스 백엔드 관련 기술

![Vercel](https://img.shields.io/badge/Vercel-000000)
![Supabase](https://img.shields.io/badge/Supabase-000000)
![Cloudflare Stream](https://img.shields.io/badge/CloudflareStream-000000)

<!-- ![Cloudflare Stream](https://img.shields.io/badge/CloudflareStream-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white) -->

### 개발 관련 기술

![Next.js](https://img.shields.io/badge/Next.js-3178C6)
![React](https://img.shields.io/badge/React-3178C6)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3178C6)
![React Query](https://img.shields.io/badge/React_Query-3178C6)
![Zustand](https://img.shields.io/badge/Zustand-3178C6)
![Swiper](https://img.shields.io/badge/Swiper-3178C6)
![Quill](https://img.shields.io/badge/Quill-3178C6)
![DomPurify](https://img.shields.io/badge/DomPurify-3178C6)

### 협업 및 도구 관련 기술

![GitHub](https://img.shields.io/badge/GitHub-F05032)
![NPM](https://img.shields.io/badge/NPM-F05032)
![Figma](https://img.shields.io/badge/Figma-F05032)
![Discord](https://img.shields.io/badge/Discord-5865F2)

## 0-3. 프로젝트 GitHub 전략

### main branch

- **설명**: 최종 프로젝트 버전을 배포하는 브랜치입니다.

### dev branch

- **설명**: 개발 중인 기능과 수정 사항을 포함하는 브랜치입니다. 기능이 완성되면 이 브랜치를 통해 `main` 브랜치로 병합하여 배포 준비를 합니다. 중간 단계의 통합 브랜치로 사용됩니다.

### feature branch

- **설명**: 특정 기능 개발을 위해 개별적으로 생성되는 브랜치입니다. 기능이 완료되면 `dev` 브랜치로 병합됩니다.
- **규칙1**: 각 기능 작업에 대해 이슈를 생성하여 작업 내용과 예상 완료일을 작성하고 팀원과 공유하여 소통합니다.
- **규칙2**: `feature/#이슈번호`, `refactor/#이슈번호` 등을 따릅니다.
- **규칙3**: GitHub와 Discord를 연동하여 알림을 받고, 푸시, PR, 이슈를 관리하여 빠르게 피드백을 제공합니다.

## 0-4. 폴더 구조

## 1. 사용한 라이브러리

<details>
<summary><strong>Tanstack-Query</strong></summary>
<p>
React 애플리케이션에서 서버 상태 관리를 쉽게 할 수 있도록 도와주는 라이브러리입니다. 데이터 페칭, 캐싱, 동기화, 오류 처리 등의 기능을 제공하여, 비동기 데이터를 효율적으로 관리할 수 있습니다.
</p>
</details>

<details>
<summary><strong>Supabase</strong></summary>
<p>
실시간 데이터베이스, 인증, 스토리지 등을 제공하는 백엔드 서비스입니다.
</p>
</details>

<details>
<summary><strong>Tailwind CSS</strong></summary>
<p>
Tailwind CSS를 선택한 이유는 효율적인 유틸리티 클래스 기반으로 빠르고 일관된 스타일링이 가능하며, 불필요한 CSS를 제거하여 성능을 최적화할 수 있기 때문입니다. 또한, 커스터마이징이 용이하며, 디자인 시스템 구축에 적합한 도구로 개발 속도를 크게 향상시킬 수 있습니다.
</p>
</details>

<details>
<summary><strong>Next.js</strong></summary>
<p>
SSR과 SSG를 지원하는 React 기반의 프레임워크입니다. SEO 최적화와 페이지 로딩 속도 개선을 도와주며, 동적 라우팅 등 고급 기능을 제공합니다.
</p>
</details>

<details>
<summary><strong>Swiper</strong></summary>
<p>
모던한 터치 슬라이더 라이브러리로, 모바일 및 웹 애플리케이션에서 터치 지원 슬라이드 기능을 구현할 수 있습니다. 다양한 애니메이션 효과와 커스터마이징 옵션을 제공합니다.
</p>
</details>

<details>
<summary><strong>Quill</strong></summary>
<p>
WYSIWYG 텍스트 편집기로, 사용자 친화적인 텍스트 편집 기능을 제공합니다.
</p>
</details>

<details>
<summary><strong>DomPurify</strong></summary>
<p>
HTML 및 DOM 요소를 정화하여 XSS 공격을 방지하는 자바스크립트 라이브러리입니다. 신뢰할 수 없는 입력 데이터를 안전하게 처리하여 보안을 강화할 수 있습니다.
</p>
</details>

<details>
<summary><strong>Zustand</strong></summary>
<p>
React 애플리케이션에서 상태 관리를 위한 경량 상태 관리 라이브러리입니다. 간단하고 직관적인 API를 제공하며, 복잡한 상태 관리도 쉽게 구현할 수 있습니다.
</p>
</details>

<details>
<summary><strong>NPM</strong></summary>
<p>
패키지 관리와 의존성 관리를 위한 도구입니다. Node.js 프로젝트에서 필요한 라이브러리 설치 및 버전 관리를 용이하게 합니다.
</p>
</details>

<details>
<summary><strong>OpenWeatherAPI</strong></summary>
<p>
기상 데이터를 제공하는 API 서비스입니다. 실시간 날씨 정보, 예보 데이터를 가져올 수 있어, 날씨 관련 기능 구현에 유용합니다.
</p>
</details>

## 2. 주요 화면

### 메인화면

<img width="640" src="https://github.com/user-attachments/assets/17be4c83-a54e-4313-ae97-305b88889a61"/><br/>

- **상단에는 사용자의 현재 위치 기반 날씨 정보가 실시간으로제공**<br>
- **판매자가 직접 진행하며 제품을 보여주고 판매 할 수 있는 라이브커머스**<br>
- **판매자가 직접 진행하며 제품을 보여주고 판매 할 수 있는 라이브커머스**<br>
- **아기자기한 카테고리와 신제품, 식집사필수템, 이달의 추천 식물, 베스트셀러로 나눠져있으며, 타이틀 구성에 맞게 보여지는 상품들**

### 장바구니

<img width="640" src="https://github.com/user-attachments/assets/17be4c83-a54e-4313-ae97-305b88889a61"/><br/>

- **1**
- **1**
- **1**
- **1**

### 마이페이지

<img width="640" src="https://github.com/user-attachments/assets/17be4c83-a54e-4313-ae97-305b88889a61"/><br/>

- **1**<br>
- **2**<br>
- **3**<br>
- **4**

### 상품상세화면

<img width="640" src="https://github.com/user-attachments/assets/17be4c83-a54e-4313-ae97-305b88889a61"/><br/>

- **1**<br>
- **2**<br>
- **3**<br>
- **4**
  <br><br>

### 그 외 결제, 1:1채팅, 판매자 인증 등 기능들이 추가적으로 있습니다 <br>

### 사이트 많은 구경

- **LeafyLink**
