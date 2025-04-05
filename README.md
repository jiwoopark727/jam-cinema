# JAM CINEMA(잼 시네마) - 영화 종합 정보 플랫폼

## 🚀 프로젝트 소개

**JAM CINEMA**는 고전 영화부터 최신 영화까지 영화를 좋아하는 모든 사람들이 영화에 대한 정보를 얻고 소통할 수 있는 플랫폼입니다.

## 🎯 주요 기능

- **회원 관리**: 자체 DB로 회원가입 시스템 구축, 회원가입 시 나만의 캐릭터를 선택하게 하여 재미 요소를 추가, 이메일과 패스워드에 정규식 검사를 통해 정규성 검사, 로컬스토리지에 액세스 토큰을 사용하여 로그인 상태 유지 기능 구현
- **뉴스**: 딥서치 뉴스 API를 사용하여 영화 키워드를 가진 최신 뉴스 기사들을 리스트 형식으로 제공, 무한 스크롤 방식으로 5개 씩 리스트업, 100개를 최대로 보여주고 DB 효율성을 위해 100개 이후의 것은 삭제함으로써 최신화 상태를 유지
- **커뮤니티**: 자체 커뮤니티를 구축해 게시글 조회 및 글 쓰기 등을 할 수 있으며 조회수와 글 작성 시간을 바탕으로 인기 게시글과 최신 게시글을 따로 표시
- **다양한 종류의 영화 정보 제공**: 영화포스터, 제작사, 배우, 관련영상 등 다양한 종류의 영화 정보를 제공
- **다양한 카테고리별 영화 분류**: 장르별 영화, 에디터 추천 영화, 주간 인기 영화, 평점 높은순 영화, 현재 상영, 개봉 예정 영화 등 다양한 카테고리 별로 영화를 분류하여 기호에 따라 쉽게 탐색 가능
- **동적인 검색 기능**: 입력값 하나마다 포함하는 영화들을 띄워주고 로그인을 한 상태라면 검색 기록을 저장

## 🛠 기술 스택

- **Frontend**: `React`, `TypeScript`, `Vite`, `styled-components`
- **Backend**: `Node.js`, `mariaDB`, `HeidiSQL`
- **API**: `Intersection Observer API`, `Deep Search News API`
- **Deployment**: `Vercel`

## 🎬 데모 배포 사이트 및 스크린샷

🚀 **[JAM CINEMA 배포 사이트](https://job-nest-iota.vercel.app)**

<table>
  <tr>
    <td align="center">
      <p>로그인 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="로그인 화면">
    </td>
    <td align="center">
      <p>즐겨찾기 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="즐겨찾기 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>주소검색 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="주소검색 화면">
    </td>
    <td align="center">
      <p>지도 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="지도 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>매물관리 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="매물관리 화면">
    </td>
    <td align="center">
      <p>등기대장 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="등기대장 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>계약서 화면</p>
      <img src="./src/assets/images/jamcinema_login.png" height="230" alt="계약서 화면">
    </td>
  </tr>
</table>

## 🏗 프로젝트 구조

````plaintext
📦 root
├── 📁 client              # 프론트엔드 프로젝트 (React)
│   └── 📁 src
│       ├── 📁 assets      # 이미지, 아이콘 등 정적 파일
│       ├── 📁 components  # 재사용 가능한 UI 컴포넌트
│       ├── 📁 store       # 상태 관리 (Redux toolkit)
│       └── 📁 views       # 페이지 단위 컴포넌트
│
└── 📁 server              # 백엔드 프로젝트 (Node.js)
    ├── 📁 routers         # API 라우터 정의
    └── 📁 types           # TypeScript 타입 정의


## 🔧 설치 및 실행 방법

```bash
# 레포지토리 클론
git clone [https://github.com/JIWOO/jobnest.git](https://github.com/jiwoopark727/job-nest.git)
cd jobnest

# 패키지 설치
npm install

# 환경 변수 설정 (.env 파일 생성 후 환경 변수 추가)
(생략... 필요시 문의 메일 부탁드립니다)

# 개발 서버 실행
npm run dev
````

## 📜 라이선스

본 프로젝트는 **MIT 라이선스**를 따릅니다.
