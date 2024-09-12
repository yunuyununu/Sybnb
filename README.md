# 📚 SYBNB 숙박 예약 웹서비스
본 프로젝트는 국비지원 훈련과정 중 진행한 파이널 팀 프로젝트입니다.


* * *
## 📑 목차
[__1. 프로젝트 개요__](#-프로젝트-개요)
   - [주제 및 목표](#-주제-및-목표)
   - [팀 구성 및 사용기술](#-팀-구성-및-사용기술)

  
[__2. 주요 구현기능 설명__](#-주요-구현기능-설명)
   - [호스트 회원가입 및 승인](#-호스트-회원가입-및-승인)
   - [호텔등록 및 영업관리](#-호텔등록-및-영업관리)
   - [숙박예약 및 예약관리](#-숙박예약-및-예약관리)
   - [후기 및 평점관리](#-후기-및-평점관리)

    
[__3. 프로젝트 후기 및 발표자료__](#-후기)


🔗 [프레젠테이션 자료](https://docs.google.com/presentation/d/17xhSXil2K-h7-_tIEPv6zsKwHZvXYaMbxjTMpMjHYV8/edit?usp=sharing)


* * *

## 📌 프로젝트 개요
#### 📅 기간
2024.04.24 ~ 2024.06.05 (약 5주)

- 1주차 : 주제선정 및 프로젝트 기획회의. DB설계. 개발환경 세팅
- 2~3주차 : 개인별 집중 개발 진행 후 1차 통합테스트 진행
- 4주차 : 세부기능/추가기능 등 피드백 후 수정 작업 진행
- 5주차 : 2차 통합테스트 및 오류 수정
- 6주차 : 발표자료 및 프레젠테이션 준비. 6/11 최종시연
![wbs](https://github.com/mindyhere/final-project/assets/147589193/b84a3a08-e371-4b95-b87d-78565db5afc1 "WBS sheet")



#### 🖍 주제 및 목표
__[주제]__  숙박 예약 웹서비스

__[목표]__
1. Spring MVC 패턴에 기반하여 사용자 간의 상호작용이 이루어지는 웹서비스 구현
2. 결제API, 공유하기, 달력, 주소검색 등 다양한 API를 활용하고 훈련기간 동안 학습한 기술스택을 총체적으로 보여줄 수 있는 서비스 구현
3. DB구축 및 SQL 연습
4. 직관적인 UI/UX 구성


#### 👥 팀 구성 및 사용기술


__[팀 구성]__
![team1](https://github.com/mindyhere/final-project/assets/147589193/822e1218-4ab4-4b97-bb46-da5518d49584 "개인별구현기능")



__[사용기술 및 개발환경]__
- OS : Windows11
- Tools  :  Spring Tool Suite 4, Heidi SQL 12.6, Git, GitHub, Sourcetree, Draw.io
- Front-end  :  HTML/CSS, React, Javascript
- Back-end  :  Java(JDK21),Spring Framework, MariaDB 11.3
- Library  :  Lombok 1.18.30, MyBatis 3.5.15, Bootstrap 5.3, Sweetalert2, Chart.js 4.4.0, etc.


* * *


## 🕹️ 주요 구현기능 설명
#### __📜 호스트 회원가입 및 승인__
![approve](https://github.com/mindyhere/final-project/assets/147589193/153b76b9-3528-43aa-8bff-5e3f159fcc33 "flow1")


- 호스트 회원가입
  -  각 항목마다 필수 입력 Alert 표시
  -  이메일 유효성 확인 → 중복확인 버튼 활성화 → 사용가능한 이메일에 한해 회원가입 가능
![호스트 회원가입 영상](https://github.com/mindyhere/final-project/assets/147589193/570ed74d-b23d-4676-8d89-33188b9eb6e8)


- 호스트 승인요청
  -    최초 가입 시 “가입 완료” 상태 → 호스트 승인요청 시, 첨부파일 등록 필수(프로필/사업자 등록증/ 통장사본) → 승인요청 버튼 활성화
  - [승인요청] 클릭 시 완료 Alert
- 관리자 - 호스트 가입 승인
  - 신규 회원 승인 대기 상태일 때 [가입승인] 버튼 클릭 후, 사업자등록증, 통장사본 일치 확인 가입정보 일치 → 승인 완료 Alert
![approve1](https://github.com/mindyhere/final-project/assets/147589193/05c332cc-e66b-4257-9113-a34c66fcac6b)



#### __🏨 호텔등록 및 영업관리__
![hotel](https://github.com/mindyhere/final-project/assets/147589193/77fc6c98-8df6-4189-a236-e93a445f5236 "flow2")


- 호텔 신규등록
  - 기본정보 입력 후 ‘다음’ 클릭 시 편의시설, 객실정보 입력하는 페이지로 이동
  - 객실 정보 등록 시, 싱글룸은 필수 입력, 객실 사진은 최대 3장까지 첨부 가능
![숙소 등록하기](https://github.com/mindyhere/final-project/assets/147589193/6aa97fe5-4d82-4543-8845-b4f34218ac4c)


- 호텔 등록 : 이어서 작성하기 기능 적
  -  작성 중인 내용이 있을 경우 이어서 작성할 것인지 묻는 Alert
  -  "네” 선택 : 입력했던 데이터 불러온 후 이어서 작성 가능 / “아니오” 선택 : 저장되었던 데이터 삭제, 신규 데이터 입력
![신규호텔_이어서](https://github.com/mindyhere/final-project/assets/147589193/50d8226d-7e40-471e-80c1-4e9a51787a0c)


- 숙소영업관리 및 숙소승인
  - 신규등록호텔이 “승인대기” 상태일 때 → [승인] 버튼 클릭 → “영업중” 상태로 변경
![호텔 등록 승인](https://github.com/mindyhere/final-project/assets/147589193/9af3c403-4cb6-4474-b5ac-41d0bd6ec5dc)



#### __📇 숙박예약 및 예약관리__
![reservation](https://github.com/mindyhere/final-project/assets/147589193/5b56dafe-191c-49da-a502-8b3c7d65761d "flow3")


🔗 [숙박예약/결제 시연영상 보기](https://github.com/mindyhere/final-project/assets/147589193/cbf80039-e428-42be-ae34-cf464309f211)



![결제화면1](https://github.com/user-attachments/assets/25d5220e-161d-485c-8611-5be87903ac54)
- 예약하기
  - 원하는 객실 클릭(가격변동)
  - 게스트로 로그인x / 숙박날짜 미입력 시 alert
  - 달력에서 날짜선택, 인원선택 -> 총 합계정보 확인 후 예약하기 버튼 클릭하면 예약요청페이지로 넘어감
  - 해당객실 만실일 때 날짜 비활성화
- 예약요청
  - 호텔/객실정보, 주문자 정보, 선택한 예약정보 띄워짐
  - 쿠폰/포인트 : 사용금액 입력 후 버튼 클릭 시 요금세부정보에 계산되어 적용됨
  - 결제수단 선택 후 하단버튼 클릭 시 결제화면창 활성화


![결제화면](https://github.com/user-attachments/assets/42fbe15a-fea0-44dd-8bf9-6c846533b4ba)
- 숙박 예약(결제)
  - 포트원API 사용(나이스페이먼츠, 카카오페이)
  - 선택한 결제수단 바코드로 결제
  - 결제성공 시 알림창 뜨고 예약확인페이지로 이동
    - 포트원 결제내역에 데이터 입력됨
    - 결제내역 이메일/카톡으로 전송됨



![ex2](https://github.com/mindyhere/final-project/assets/147589193/4c2f9745-e179-4940-8ad4-893273566ea0)
![ex5](https://github.com/mindyhere/final-project/assets/147589193/8c010fce-1a43-4707-88cd-41238e620c53)
- 호스트 예약관리 : 예약확정/체크인완료 처리 또는 예약변경 승인/거부 처리 → 예약확정 시 바우처 이메일발송



#### __📝 후기 및 평점관리__
![reputation](https://github.com/mindyhere/final-project/assets/147589193/f4615140-0746-493b-b973-c18ecb8b512d "flow4")
![reputation1](https://github.com/mindyhere/final-project/assets/147589193/e752f61c-0bed-4d99-b36d-eae9c604c754)

- 게스트
  - 리뷰가 등록되어 있지 않은 지난 여행만 작성 가능 
  - 프로필에서 본인 작성 리뷰 조회 및 수정, 삭제 가능 
  - 호스트가 남긴 답글 조회 가능
- 호스트
  - 해당 호텔의 별점 및 리뷰 상세 조회 가능
  - 답글 등록, 수정, 삭제
- 호텔 상세페이지, 평점 및 후기란에서 조회 가능
  


* * *


## 🎓 후기
#### __🛠️ 개선사항__
- 깜박임 현상이 잦아 아쉬움. 후 axios(비동기처리)로 개선 필요
- 관리자 자동로그인 기능 추가
- 후기 작성 후 일정기간이 지나면 수정/삭제가 불가능하도록 개선 필요
- 호스트 가입승인 시 가입정보가 일치하지 않으면 ‘승인요청거부’ 메시지가 전달되도록 개선 필요


#### __💡 후기__
- Github를 활용하여 원활한 팀 프로젝트를 진행할 수 있었다.
- 안드로이드를 활용한 숙박예약어플, 관리자-호스트 매출/정산 기능 등 기획단계에서 더 많은 아이디어가 나왔었는데 여건 상 시도하거나 최종 구현하지 못한 부분들이 아쉬움으로 남는다.
- 프로젝트 기획과정에서 다양한 테이블 관계형성과 프로시저, 새로운 프론트엔드(React)를 활용할 수 있도록 노력했고 그 결과 많은 공부가 되었다. 
- 팀 프로젝트를 통해 많이 배우고 부족한 부분을 채워 성장할 수 있는 계기가 되었다. 

