# 🎃 HaloHalloween

## ✍🏻 서비스 소개

할로할로윈은 10월에 다가오는 할로윈 행사에 대해 정보를 알고,</br> 
친숙하게 다가가고자 생각한 프로젝트입니다.</br> 
자신만의 할로윈을 어떻게 독특하게 보냈는지,</br>게시판 형식의 모임  프로젝트입니다



## ⛅️ 팀원 소개

- **Back End**
  - 이병관(팀장)([https://github.com/fnrkp089](https://github.com/fnrkp089))
  - 홍성현([https://github.com/Jenny9197](https://github.com/Jenny9197)
- **Front End**
  - 석지선([https://github.com/sunysty](https://github.com/sunysty))
  - 이미다([https://github.com/dam-lee](https://github.com/dam-lee))
  - 고규식([https://github.com/kokyusik91](https://github.com/kokyusik91))


## ❄️ Project Architecture

![Architecture](./readme_images/project_architecture0.2.png)

## 🛠 Tech Stack

- Node.js
- Express.js
- MogoDB
- Mongoose
- Swagger
- EC2
- S3


## 🌧 Library

|       library       |                         description                         |
| :-----------------: | :---------------------------------------------------------: |
|       dotenv        |            보안적으로 문제가 있는 데이터 숨기기             |
|        cors         |            CORS보안 정책을 해결하기 위하여 사용.            |
|       bcrypt        |         해시함수를 사용하여 암호화 하기 위해 사용.          |
|         joi         |                    Validate를 위해 사용.                    |
|       express       |       빠르고 개방적인 개발을 위해 웹 프레임워크 사용.       |
|    jsonwebtoken     |                    JWT Token 위해 사용.                     |
|     Mongoose        |           Node.js에서 MonogoDB 데이터베이스를 지원하는 노드의 확장 모듈         |
|      artillery      |             서버 부하테스트 하기 위해 사용한다.             |
|       multer        |                         파일 업로드                         |
|      multer-s3      |                      S3에 파일 업로드                       |
|    swagger-jsdoc    | 주석에 Swagger 태그를 추가하여 API를 문서화 하기 위해 사용. |
| swagger-ui-express  |            API 문서를 UI 렌더링 하기 위해 사용.             |

## 🔎 API

[Notion API Address](https://brave-countess-7ec.notion.site/99-Front-Backend-5bebd34178804db5878f1456f4418a7d)


## 📋 ERD
![유저](https://user-images.githubusercontent.com/44608012/146629134-6b17d7cc-404f-4588-9806-ed820e190240.png)
![게시판](https://user-images.githubusercontent.com/44608012/146629136-aa622953-1c06-4d54-b339-901dc908e196.png)
![댓글](https://user-images.githubusercontent.com/44608012/146629137-8c45b783-6b18-471c-a91c-f94d4c237cfc.png)



## ✅ 향후 프로젝트의 목표

- **에러 로그 관리**

   
- **테스트 코드 작성**
    <p align="center"><img src="https://user-images.githubusercontent.com/86820463/144460650-409b1351-e12d-4a62-818a-8973590786b3.png" width="500" height="200"></p>
  - 테스트 코드 작성하는 이유.

  - 서버를 실행하는 등의 시간을 절약할 수 있다.
  - 필요한 데이터를 미리 기입하고, 테스트가 끝나고 정리하는 등의 행동을 하지 않아도 된다.
  - 단위테스트의 경우 수십 ms 이기 때문에 테스트가 매우 빠르다.
  - 문서로서의 역할이 가능하다.
  - 깔끔한 인터페이스를 얻어낼 수 있다.

