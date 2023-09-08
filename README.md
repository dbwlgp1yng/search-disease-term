# 🔍 질병 검색어 찾기 

- [한국임상정보](https://clinicaltrialskorea.com/) 사이트의 질환명 검색 및 검색어 추천 기능을 구현하는 프로젝트입니다.
- 📆 프로젝트 기간: **2023.09.05 ~ 2023.09.07** 

<br />

## 🚀 배포 링크
- 프로젝트 배포 사이트는 **[여기](https://search-disease-term.vercel.app/)** 에서 확인하실 수 있습니다. 
- (참고) API 서버는 json Server로 배포되어 있습니다. API 배포 사이트는 [여기](https://assignment-api-rho.vercel.app/)에서 확인 가능합니다.

<br />

## 📌 기술스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br />

## 📌 실행방법

```
Clone the repo
$ git clone https://github.com/dbwlgp1yng/search-disease-term.git

Install npm packages & get start
$ npm install
$ npm start
```

<br />

## 💼 디렉토리 구조
```
src/
┣ 📂 assets/
┃   ┗ 📜 logo.svg
┣ 📂 components/
┃   ┣ 📂 common/
┃   ┗ 📂 Search/
┃       ┣ 📂 SearchBar
┃       ┣ 📂 SearchBox
┃       ┗ 📂 SearchSection
┣ 📂 hooks/
┃   ┣ 📜 useDebouces.ts
┃   ┗ 📜 useKeyDown.ts
┣ 📂 pages/
┃   ┗ 📜 NotFound.tsx
┣ 📂 router/
┃   ┗ 📜 Rotuer.tsx
┣ 📂 services/
┃   ┗ 📜 apiClient.ts
┣ 📂 types/
┃   ┗ 📜 index.d.ts
┣ 📂 styles/
┃   ┗ 📜 GlobalStyle.tsx
┣ 📂 utils/
┃   ┗ 📜 cacheUtils.ts
┣ 📜 App.tsx
┗ 📜 Index.tsx
```
<br />

## 💡 핵심 기능 구현

### 1. API 로컬 캐싱 구현
- Session Storage에 데이터를 설정하며, ```setTimeout```으로 만료 시간이 지난 후에 데이터를 자동으로 삭제할 수 있도록 합니다.
- 데이터를 가져올 때, 현재시간을 기준으로 데이터의 만료 시간을 체크하여 없거나 만료된 경우에 ```null```을 반환하여 API를 요청합니다.


### 2. API 호출 전략
-  ```useDebounce``` 커스텀 훅을 이용해 입력 값(value)과 딜레이 시간(delay)을 인자로 받습니다. 
- 입력 값이 변경될 때마다 타이머를 설정하고, 딜레이 시간동안 입력이 변경되지 않으면 최종값으로 설정하고 API 호출을 시작합니다.
- useEffect의 clean-up 함수를 활용하여 이전 타이머를 제거하기 때문에, 이전 디바운싱 작업이 중복으로 실행되는 것을 방지합니다.
```ts
import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value); // 값이 변경될 때마다 타이머 재설정
    }, delay);

    return () => {
      clearTimeout(timerId); // 이전 타이머를 제거
    };
  }, [value, delay]);

  return debouncedValue;
}

```

|                                                         **Debouncing 전**                                                          |                                                               **Debouncing 후**                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="360px" src="https://github.com/dbwlgp1yng/github-issues/assets/126330595/a638554b-58c2-4477-89ee-7f9ee39e75da" alt="디바운싱전" /> | <img width="360px" src="https://github.com/dbwlgp1yng/github-issues/assets/126330595/5b9fbb0d-c67a-4e53-96ad-eb84b54273c6" alt="디바운싱후" /> |

> **Debouncing** 선택 이유 <br />
> 한글같은 조합형 언어에는 한 글자마다 제대로 된 결과가 나오지 않는 검색어가 많습니다. 
모든 경우에 API를 요청한다면 낭비일 수 있기 때문에, 이를 그룹화할 수 있는 디바운싱을 사용하게 되었습니다. <br />
즉, 사용자가 연속적으로 입력을 하면 중간에 일정 시간 간격(300ms)을 두고 마지막 입력 이후에 작업을 수행하도록 하여 불필요한 API 중복 호출을 방지합니다. 

### 3. 키보드로 검색어 이동 기능 구현
- 키보드 방향키를 사용해 선택한 검색어를 이동할 수 있도록 함수를 커스텀 훅으로 분리했습니다.
- 선택된 인덱스를 위 아래로 이동시키고, 상태 인덱스와 일치하는 li 태그를 강조표시하여 이동하는 것처럼 보이기 위해 스타일링 했습니다. 
- ```selectedIndex```가 변경될 때 ```scrollToSelected``` 함수가 호출되어 선택한 항목이 스크롤 가능한 영역의 가운데에 위치하도록 스크롤됩니다.
  ```ts
  const scrollToSelected = () => {
    const selectedElement = document.querySelector(".selected");
  
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  ```
- 검색 결과가 있을 경우엔 data 배열에서 추천 검색어와 결과 항목들을 리스트로 표시하고, 결과가 없을 경우 “검색어 없음” 메시지를 표시합니다.


| 검색어 이동 | 
| :---------------------------------------------------------------------: | 
| <img width="600px" src="https://github.com/dbwlgp1yng/search-disease-term/assets/126330595/aaeabaf7-96b0-4e9a-a84c-555a237870d3" alt="검색어이동" /> | 
