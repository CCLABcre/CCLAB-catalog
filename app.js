(() => {
  const archive = window.ARCHIVE;
  const main = document.querySelector("main");
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const href = work => `#work/${encodeURIComponent(work.id)}`;
  document.querySelector(".wordmark").innerHTML = `${esc(archive.title)}<span class="mark" aria-hidden="true">✳</span>`;
  document.querySelector(".wordmark").setAttribute("aria-label", `${archive.title}, 전체 작품`);
  let galleryScroll = 0;
  let wasGallery = true;
  let firstRender = true;
  function render() {
    const isGallery = !location.hash || location.hash === "#";
    if (wasGallery && !isGallery) galleryScroll = window.scrollY;
    let id;
    try { id = decodeURIComponent(location.hash.replace(/^#work\//, "")); } catch { id = null; }
    const work = archive.works.find(item => item.id === id);
    if (isGallery) {
      document.title = archive.title;
      main.innerHTML = `<section class="intro"><div><h1>${esc(archive.heading).replace(/\n/g,"<br>")}</h1></div><p>${esc(archive.introduction)}</p></section><div class="collection-bar"><span>전체 작품 <span aria-label="작품 수">(${String(archive.works.length).padStart(2,"0")})</span></span><span>SELECTED WORKS</span></div>${archive.works.length ? `<section class="grid" aria-label="작품 목록">${archive.works.map((item,index) => `<a class="work" href="${href(item)}"><div class="image-wrap"><img src="${esc(item.images[0])}" alt="${esc(item.title)}" ${index > 2 ? 'loading="lazy"' : ''} width="800" height="1000">${item.sample ? '<span class="sample-tag">SAMPLE IMAGE</span>' : ''}</div><div class="caption"><h2>${esc(item.title)}<span class="work-arrow" aria-hidden="true">↗</span></h2><span>${esc(item.year)}</span></div><div class="work-meta">${esc(item.category)}</div></a>`).join("")}</section>` : '<section class="empty"><p>곧 이곳에 작품이 놓입니다.</p></section>'}`;
    } else if (work) {
      const next = archive.works[(archive.works.indexOf(work)+1)%archive.works.length];
      document.title = `${work.title} — ${archive.title}`;
      main.innerHTML = `<a class="back" href="#">← 전체 작품</a><article class="detail"><div class="detail-images">${work.images.map((src,index) => `<img src="${esc(src)}" alt="${esc(work.title)}${index ? ` — 세부 사진 ${index}` : ''}" ${index ? 'loading="lazy"' : ''}>`).join("")}</div><div class="detail-copy"><p class="eyebrow">${esc(work.category)} / ${esc(work.year)}</p><h1>${esc(work.title)}</h1><p class="description">${esc(work.description)}</p><dl class="facts"><div><dt>제작 연도</dt><dd>${esc(work.year)}</dd></div><div><dt>분류</dt><dd>${esc(work.category)}</dd></div>${work.medium ? `<div><dt>재료 · 규격</dt><dd>${esc(work.medium)}</dd></div>` : ''}</dl>${work.sample ? '<p class="sample-note">현재는 구성 확인을 위한 샘플입니다.<br>실제 작품 사진과 설명으로 교체해주세요.</p>' : ''}${archive.works.length > 1 ? `<a class="next" href="${href(next)}">다음 작품 <span aria-hidden="true">↗</span><br>${esc(next.title)}</a>` : ''}</div></article>`;
    } else {
      document.title = `작품을 찾을 수 없어요 — ${archive.title}`;
      main.innerHTML = '<section class="empty"><h1>작품을 찾을 수 없어요.</h1><p>주소가 변경되었거나 아직 등록되지 않은 작품입니다.</p><a class="back" href="#">← 전체 작품 보기</a></section>';
    }
    if (!firstRender) {
      window.scrollTo(0,isGallery ? galleryScroll : 0);
      main.tabIndex = -1;
      main.focus({preventScroll:true});
    }
    wasGallery = isGallery;
    firstRender = false;
  }
  window.addEventListener("hashchange", render);
  render();
})();
