# 작품 보관실

사진 목록에서 작품을 누르면 설명과 추가 사진을 볼 수 있는 정적 작품 아카이브입니다. 별도 설치나 빌드 없이 GitHub Pages에서 동작합니다. 현재 작품과 이미지는 모두 교체용 샘플입니다.

## 내 작품으로 바꾸기

1. 사진을 `assets` 폴더에 넣습니다. 파일명은 `my-work-01.jpg`처럼 영문 소문자와 숫자를 권장합니다.
2. `works.js`에서 사이트 제목(`title`), 큰 문구(`heading`), 소개(`introduction`)를 바꿉니다.
3. `works` 안의 샘플 항목을 실제 작품 정보로 교체합니다. `sample: false`로 바꾸면 샘플 표시가 사라집니다.

```js
{
  id: "my-first-book",
  title: "작품 제목",
  year: "2026",
  category: "책 · 인쇄물",
  medium: "A5 / 32쪽",
  images: ["assets/my-work-01.jpg", "assets/my-work-02.jpg"],
  description: "작품에 대한 설명입니다.\n\n빈 줄을 넣어 문단을 나눌 수 있어요.",
  sample: false
}
```

새 항목을 배열의 맨 앞에 넣으면 목록 맨 앞에 표시됩니다. 항목 사이에는 쉼표가 필요합니다. `id`는 작품마다 다르게 지정하고 공개 후에는 유지하세요. 작품별 주소는 `https://계정명.github.io/#work/my-first-book` 형태입니다.

첫 번째 사진이 목록의 대표 이미지입니다. 목록에서는 일정한 크기로 잘리며, 상세에서는 원래 비율로 표시됩니다. 웹용으로 줄인 사진을 사용하고 원본은 별도로 보관하세요. 사진의 EXIF 위치정보와 커밋 작성자 정보는 업로드 전에 확인하세요.

## GitHub Pages에 올리기

`index.html`, `style.css`, `app.js`, `works.js`, `assets` 폴더, `.nojekyll`을 저장소 최상위에 올립니다. `index.html`이 하위 폴더에 들어가지 않게 해주세요.

저장소의 Settings → Pages에서 Deploy from a branch를 선택하고, 업로드한 브랜치(보통 main)와 /(root)를 지정해 저장합니다. GitHub가 배포를 마치면 Pages에 표시되는 주소로 접속합니다. 이후 파일을 수정하고 커밋하면 사이트도 갱신됩니다.

## 로컬 확인

`index.html`을 브라우저에서 열어 확인할 수 있습니다. 작품 목록, 상세 화면, 뒤로 가기, 작품별 주소를 지원합니다. 로그인, 서버, 방문자 추적, 외부 폰트 및 외부 이미지 요청은 사용하지 않습니다.
