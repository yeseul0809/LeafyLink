# LeafyLink

- **서비스주소**: www.leafylink.co.kr/
- **기획의도**
- 식물이 단순한 상품이 아닌, 생명체이기 때문에 그 상태를 실시간으로 확인하는 것이 매우 중요하다는 점에서 출발한다.
- 일반 이커머스와 달리, 라이브커머스는 실시간 방송을 통해 판매자가 직접 식물의 현재 상태를 보여줄 수 있다.
  <br>-> 이를 통해, 고객은 식물의 생기, 건강상태, 크기 등을 눈으로 직접 확인할 수 있어 구매에 대한 신뢰를 높일 수 있다.

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

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudflare Stream](https://img.shields.io/badge/CloudflareStream-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

### 개발 관련 기술

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)

<!-- ![Zustand](https://img.shields.io/badge/Zustand-3178C6)
![Swiper](https://img.shields.io/badge/Swiper-3178C6)
![Quill](https://img.shields.io/badge/Quill-3178C6)
![DomPurify](https://img.shields.io/badge/DomPurify-3178C6) -->

### 협업 및 도구 관련 기술

![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

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

## 2.1　메인화면

- **실시간 날씨 정보**: 상단에 사용자의 현재 위치를 기반으로 한 실시간 날씨 정보 제공
- **라이브 커머스**: 판매자가 직접 진행하며 제품을 실시간으로 보여주고 판매할 수 있는 라이브 커머스 기능 제공
- **카테고리와 상품 진열**: 아기자기한 카테고리로 나뉘며, 신제품, 식집사 필수템, 이달의 추천 식물, 베스트셀러 등 타이틀에 맞는 상품들을 진열

![메인 화면](https://github.com/user-attachments/assets/17be4c83-a54e-4313-ae97-305b88889a61)

## 2.2　상품 상세 화면

- **실시간 채팅 기능**: 구매자가 실시간으로 판매자와 1:1 채팅을 통해 문의할 수 있는 기능 제공
- **구매자 리뷰**: 상품 구매자만 남길 수 있는 리뷰 기능 제공

![상품 상세 화면](https://github.com/user-attachments/assets/7a3d41a6-9f38-4198-8761-a8e33a63c22d)

## 2.3　장바구니 화면

- **호버 기능**: 메인 페이지에서 상품 카드에 호버 시, 장바구니와 결제 아이콘이 표시되며, 외각 클릭 시 상세 페이지로 이동
- **장바구니 기능**: 상세 페이지에서도 장바구니에 담기와 결제가 가능

![장바구니 화면](https://github.com/user-attachments/assets/4e50f0e4-b29c-4213-a2df-ee6dd7e45da3)

## 2.4　구매자 마이페이지

- **구매 내역 확인**: 주문 내역을 확인할 수 있는 구매 내역 카테고리 제공
- **회원정보 수정**: 회원정보(이름, 주소, 전화번호) 수정 가능
- **판매자 전환**: 사업자 번호, 대표자 성명, 상호명, 개업일자를 입력하여 인증할 경우 판매자 계정으로 전환 가능

![구매자 마이페이지](https://github.com/user-attachments/assets/09db5984-3268-4652-845b-9f35fb8f1fbc)

## 2.5　판매자 마이페이지

- **판매 관리**: 주문 내역과 판매 중인 상품, 회원정보로 구성된 카테고리 제공
- **회원정보 수정**: 회원정보(이름, 주소, 전화번호) 수정 가능
- **상품 관리**: 판매중인상품에서 상품 등록과 수정 가능

![판매자 마이페이지](https://github.com/user-attachments/assets/5f43cf3d-31e7-4b41-a8e5-2147ad24c705)

### 그 외 결제, 1:1채팅, 판매자 인증, 라이브 스트리밍등 추가적인 기능들이 있습니다 <br>

### 사이트 구경하시면 만나 볼 수 있습니다.

- **LeafyLink**
