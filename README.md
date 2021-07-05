# Mascota-Server
야용...냥냥😺

----------------------------------------------------

## :hammer: Avengers

|                             이솔                             |                            이현종                            |                            강수미                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/57162257/124487068-3c141680-dde9-11eb-97b3-ff82ab180239.png) | ![image](https://user-images.githubusercontent.com/57162257/124487598-e1c78580-dde9-11eb-8672-254506d3e484.png) | ![image](https://user-images.githubusercontent.com/57162257/124487807-189d9b80-ddea-11eb-88f1-4a1b2a04683d.png) |



----------------------------------------------------

## :panda_face: 프로젝트 설명

> #### "추억은 영원해도 슬픔은 영원하지 않으니까" 
>
> #### - 한권의 책으로 정리하는 반려동물의 삶과 죽음 주 기능 :  
>
> #### [1부] 
>
> #### 1) 반려동물과 이별을 준비하는 과정을 한 권의 책을 집필
>
> #### 2) 반려 동물의 일상 기록 
>
> #### 3) 건강이나 반려동물의 죽음에 관련된 정보 제공 
>
> 
>
> #### 2부] 
>
> #### 4) 이별 후, 반려동물과의 일상을 모아 회고 
>
> #### 5) 작가의 감정을 기록하고 대처법 제공 
>
> 
>
> #### -> 죽음에 대한 거부감을 줄이고 준비의 필요성을 높인다.



----------------------------------------------------

## :ice_cream: 서버 아키텍처

![image](https://user-images.githubusercontent.com/57162257/124490748-75e71c00-dded-11eb-86bd-3487d46a244f.png)

----------------------------------------------------

## :racehorse: package.json

```json
{
  "name": "mascota_server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node src",
    "build": "tsc && node dist",
    "test": "nodemon"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^15.12.5",
    "ts-node": "^10.0.0",
    "typescript": "^4.3.4"
  },
  "dependencies": {
    "@types/express": "^4.17.12",
    "bcryptjs": "^2.4.3",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.13.0",
    "nodemon": "^2.0.9"
  }
}

```

----------------------------------------------------

## 🖥 Code convention

-----------------------------

### 1.[참조(References)](https://github.com/tipjs/javascript-style-guide#%EC%B0%B8%EC%A1%B0references)

### 2.[객체(Objects)](https://github.com/tipjs/javascript-style-guide#%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8objects)

### 3. [ 배열(Arrays)](https://github.com/tipjs/javascript-style-guide#%EB%B0%B0%EC%97%B4arrays)

### 4. [구조화대입(Destructuring)](https://github.com/tipjs/javascript-style-guide#%EA%B5%AC%EC%A1%B0%ED%99%94%EB%8C%80%EC%9E%85destructuring)

### 5. [문자열(String)](https://github.com/tipjs/javascript-style-guide#%EB%AC%B8%EC%9E%90%EC%97%B4strings)

### 6.  [함수(Functions)](https://github.com/tipjs/javascript-style-guide#%EB%AC%B8%EC%9E%90%EC%97%B4strings)

### 7.  [Arrow함수(Arrow Functions)](https://github.com/tipjs/javascript-style-guide#arrow%ED%95%A8%EC%88%98arrow-functions)

### 8.  [Classes & Constructors](https://github.com/tipjs/javascript-style-guide#classes--constructors)



[Code Convention](https://github.com/tipjs/javascript-style-guide)

<u>***항상 코드 작성 중에 ctrl + k + f 로 코드 줄 정렬 필수!!**</u>

----------------------------------------------------

## 🤝Manage Commit, Branch Strategies

------------------------

### 1.Git branch

```
main
   |
   |--- develop
   |--- feature/현종
   |--- feature/솔
   |--- feature/수미
```

### 2.Git - flow

- `main` : 배포 브랜치
- `develop` : `main`으로 보내기 전 브랜치, `feature`에서 작업한 브랜치와 다른 사람이 작업한 브랜치를 `merge`하는 브랜치
- `feature` : 할당된 작업을 개인적으로 수행하는 브랜치
  - feature/`이름`/`기능명`
  - 예시 : feature/hyunjong/login
- [Reference](https://github.com/TeamMascota/Mascota-Android/wiki/1.-Git-%EC%82%AC%EC%9A%A9%EB%B2%95)

### 3. Git Commit Message Convention

- 제목

|  Title   |     Content     |
| :------: | :-------------: |
|   feat   | 새로운 기능추가 |
| refactor |  코드 리팩토링  |
|   fix    |    버그 수정    |

- 본문

- 예시

  - 새로운 기능 추가

    ```
    feat : 일기 상세보기 기능 구현
    - get메소드를 이용
    - 일기DB에서 목차id를 통해 일기를 가져옴
    ```

  - 코드 리팩토링

    ```
    refactor : 홈뷰 데이터 반환값 수정
    -반환데이터에 반려동물 img 추가
    ```

    

  



----------------------------------------------------
