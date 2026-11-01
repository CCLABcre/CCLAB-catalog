// 새 작품을 배열 맨 앞에 추가하면 첫 번째로 표시됩니다.
// id는 작품마다 다르게 지정하고, 공개 후에는 유지해주세요(상세 주소에 사용).
window.ARCHIVE = {
  title: "CCLAB",
  introduction: "Cre @creasentwitt 의 작품 및 작품 설명이 올라오는 저장소입니다. 사진을 클릭하시면 각 작품들에 대한 설명과 작례, 기믹들을 볼 수 있습니다.",
  // 행사 카탈로그: workIds에 포함할 작품 id를 순서대로 넣으세요.
  catalogs: [
    {
      id: "bluearchive5th",
      title: "Blue Archive 5주년 페스티벌",
      workIds: ["sample-01", "sample-02", "sample-03", "sample-04", "sample-05", "sample-06", "sample-07", "sample-08", "sample-09", "sample-10"]
    }
  ],
  works: [
    {
      id: "sample-01", title: "「티파티 테이블」 ", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "작품의 재료와 규격",
      // 첫 사진은 목록의 대표 이미지입니다. 사진마다 제목과 설명을 붙일 수 있습니다.
      images: [
        { src: "assets/sample-01.svg", title: "작품 전체 모습", caption: "전체 모습을 보여주는 사진과 소개를 넣는 자리입니다." },
        { src: "assets/sample-gimmick.svg", title: "기믹 살펴보기", caption: "기믹이 어떻게 움직이는지, 어떤 순서로 조작하는지 설명해주세요.\n\n현재 이미지는 교체용 샘플입니다." },
        { src: "assets/sample-detail.svg", title: "가까이에서 보는 디테일", caption: "가까이에서 보여주고 싶은 부분과 제작할 때 신경 쓴 점을 적어주세요." }
      ],
      description: "여기에 작품에 대한 이야기를 적어주세요.\n\n작업을 시작한 계기, 담고 싶었던 장면, 제작하며 기억에 남았던 일을 자유롭게 기록할 수 있어요.",
      // 소제목, 본문, 사진을 원하는 만큼 추가하면 블로그 글처럼 이어집니다.
      sections: [
        { title: "기믹과 사용 방법", text: "어떤 기믹이 있는지 소개하는 자리입니다.\n\n조작 순서와 사용 예시를 문단별로 적고, 아래에 사진을 붙일 수 있습니다.", image: "assets/sample-gimmick.svg", caption: "기믹을 보여주는 사진으로 교체해주세요." },
        { title: "디테일과 제작 이야기", text: "작은 장식, 표면의 질감, 부품 구성 등 자세히 보여주고 싶은 부분을 기록해주세요.", image: "assets/sample-detail.svg", caption: "디테일 사진으로 교체해주세요." }
      ],
      sample: false
    },
    { id: "sample-02", title: "「첫 번째 아방가르드」 ", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA", images: ["assets/첫번째아방가르드메인.jpg"], description: "작품의 세부 설명이 들어갈 자리입니다.\n\n추가 사진이 있다면 images에 사진 경로를 차례로 넣어주세요.", sample: false },
    { id: "sample-03", title: "「아케이드 게임기」 ", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA", images: ["assets/아케이드게임기메인.jpg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-04", title: "「현룡문 옥좌」 ", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA", images: ["assets/현룡문의자메인.jpg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-05", title: "카페 호감도 세트", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA, PETG", images: ["assets/sample-05.svg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-06", title: "「반짝이는 꽃다발」 선물", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA", images: ["assets/sample-06.svg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-07", title: "「게임걸 컬러 복각판」 선물", year: "2026", category: "3D프린팅 넨도로이드 스케일 피규어", medium: "PLA", images: ["assets/sample-06.svg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-08", title: "카페 호감도 세트", year: "2026", category: "3D프린팅 초코푸니 스케일 피규어", medium: "PLA, PETG", images: ["assets/sample-04.svg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-09", title: "「반짝이는 꽃다발」 선물", year: "2026", category: "3D프린팅 초코푸니 스케일 피규어", medium: "PLA", images: ["assets/sample-05.svg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false },
    { id: "sample-10", title: "「게임걸 컬러 복각판」 선물", year: "2026", category: "3D프린팅 초코푸니 스케일 피규어", medium: "PLA", images: ["assets/초코푸니게임걸복각메인.jpg"], description: "작품의 세부 설명이 들어갈 자리입니다.", sample: false }
  ]
};
