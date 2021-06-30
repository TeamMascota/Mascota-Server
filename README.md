# Mascota-Server
야용...냥냥😺



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

    

  

