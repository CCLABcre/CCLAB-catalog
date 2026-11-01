(() => {
  const archive = window.ARCHIVE;
  const main = document.querySelector('main');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const href = work => `#work/${encodeURIComponent(work.id)}`;
  const catalogHref = catalog => `#catalog/${encodeURIComponent(catalog.id)}`;
  document.querySelector('.wordmark').innerHTML = `${esc(archive.title)}<span class="mark" aria-hidden="true">✳</span>`;
  document.querySelector('.wordmark').setAttribute('aria-label', `${archive.title}, 전체 작품`);
  document.querySelector('.brand-description').textContent = archive.introduction;
  const photo = image => typeof image === 'string' ? { src: image } : image;
  const paragraphs = text => String(text || '').split(/\n\s*\n/).filter(Boolean).map(text => `<p>${esc(text)}</p>`).join('');
  const gallery = work => {
    const photos = (work.images || []).map(photo);
    if (!photos.length) return '';
    return `<section class="gallery" aria-label="작품 사진" tabindex="0">
      <div class="gallery-slides">${photos.map((item, index) => `<figure class="gallery-slide" ${index ? 'hidden' : ''}>
        <img src="${esc(item.src)}" alt="${esc(item.alt || `${work.title} — 사진 ${index + 1}`)}" ${index ? 'loading="lazy"' : ''}>
        ${item.title || item.caption ? `<figcaption>${item.title ? `<h2>${esc(item.title)}</h2>` : ''}${paragraphs(item.caption)}</figcaption>` : ''}
      </figure>`).join('')}</div>
      ${photos.length > 1 ? `<div class="gallery-controls"><button type="button" data-gallery-step="-1" aria-label="이전 사진">← 이전</button><span class="gallery-count" aria-live="polite" aria-atomic="true">1 / ${photos.length}</span><button type="button" data-gallery-step="1" aria-label="다음 사진">다음 →</button></div>
      <div class="gallery-thumbnails" aria-label="사진 선택">${photos.map((item, index) => `<button type="button" data-gallery-index="${index}" aria-label="사진 ${index + 1} 보기" aria-pressed="${index === 0}"><img src="${esc(item.src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    </section>`;
  };
  function setupGallery() {
    const root = main.querySelector('.gallery');
    if (!root) return;
    const slides = [...root.querySelectorAll('.gallery-slide')];
    const thumbnails = [...root.querySelectorAll('[data-gallery-index]')];
    let current = 0;
    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, index) => { slide.hidden = index !== current; });
      thumbnails.forEach((button, index) => button.setAttribute('aria-pressed', String(index === current)));
      const count = root.querySelector('.gallery-count');
      if (count) count.textContent = `${current + 1} / ${slides.length}`;
    };
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || !root.contains(button)) return;
      if (button.hasAttribute('data-gallery-step')) show(current + Number(button.dataset.galleryStep));
      if (button.hasAttribute('data-gallery-index')) show(Number(button.dataset.galleryIndex));
    });
    root.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let touchStart = null;
    const slidesRoot = root.querySelector('.gallery-slides');
    slidesRoot.addEventListener('touchstart', event => {
      touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    slidesRoot.addEventListener('touchend', event => {
      if (!touchStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      touchStart = null;
    }, { passive: true });
    slidesRoot.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  }
  const grid = works => works.length ? `<section class="grid" aria-label="작품 목록">${works.map((item,index) => `<a class="work" href="${href(item)}"><div class="image-wrap"><img src="${esc(photo(item.images[0]).src)}" alt="${esc(item.title)}" ${index > 2 ? 'loading="lazy"' : ''} width="800" height="1000">${item.sample ? '<span class="sample-tag">SAMPLE IMAGE</span>' : ''}</div><div class="caption"><h2>${esc(item.title)}<span class="work-arrow" aria-hidden="true">↗</span></h2><span>${esc(item.year)}</span></div><div class="work-meta">${esc(item.category)}</div></a>`).join('')}</section>` : '<section class="empty"><p>곧 이곳에 작품이 놓입니다.</p></section>';
  const bar = (title, count) => `<div class="collection-bar"><span>${esc(title)} <span aria-label="작품 수">(${String(count).padStart(2,'0')})</span></span><span>SELECTED WORKS</span></div>`;
  const positions = new Map();
  let previousRoute = null;
  let firstRender = true;
  function render() {
    if (previousRoute !== null) positions.set(previousRoute, window.scrollY);
    const route = location.hash || '#';
    const isHome = route === '#';
    let kind = '', id = '';
    try {
      const match = /^#(work|catalog)\/(.+)$/.exec(route);
      if (match) { kind = match[1]; id = decodeURIComponent(match[2]); }
    } catch { /* Malformed addresses use the missing page below. */ }
    const work = kind === 'work' && archive.works.find(item => item.id === id);
    const catalog = kind === 'catalog' && (archive.catalogs || []).find(item => item.id === id);
    if (isHome) {
      document.title = archive.title;
      const catalogs = archive.catalogs || [];
      main.innerHTML = `<section class="catalog-section" aria-labelledby="catalog-heading"><div class="section-heading"><h1 id="catalog-heading">행사별 카탈로그</h1><span>EVENT CATALOGS</span></div><div class="catalog-list">${catalogs.map((item,index) => `<a class="catalog-link" href="${catalogHref(item)}"><span class="catalog-number">${String(index+1).padStart(2,'0')}</span><span class="catalog-label"><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p></span><span class="catalog-arrow" aria-hidden="true">↗</span></a>`).join('') || '<p class="sample-note">등록된 카탈로그가 없습니다.</p>'}</div></section>${bar('전체 작품', archive.works.length)}${grid(archive.works)}`;
    } else if (catalog) {
      const works = catalog.workIds.map(workId => archive.works.find(item => item.id === workId)).filter(Boolean);
      document.title = `${catalog.title} — ${archive.title}`;
      main.innerHTML = `<a class="back" href="#">← 전체 아카이브</a><section class="catalog-intro"><p class="eyebrow">EVENT CATALOG</p><h1>${esc(catalog.title)}</h1><p>${esc(catalog.description)}</p></section>${bar('수록 작품', works.length)}${grid(works)}`;
    } else if (work) {
      const next = archive.works[(archive.works.indexOf(work)+1)%archive.works.length];
      document.title = `${work.title} — ${archive.title}`;
      main.innerHTML = `<a class="back" href="#">← 전체 작품</a>
        <article class="work-post">
          <header class="post-header"><p class="eyebrow">${esc(work.category)} / ${esc(work.year)}</p><h1>${esc(work.title)}</h1><p class="post-byline">Cre @creasentwitt · 작품 기록</p></header>
          ${gallery(work)}
          <div class="post-body"><div class="post-introduction">${paragraphs(work.description)}</div>
            ${(work.sections || []).map(section => `<section class="post-section">${section.title ? `<h2>${esc(section.title)}</h2>` : ''}${paragraphs(section.text)}${section.image ? `<figure><img src="${esc(section.image)}" alt="${esc(section.alt || section.title || work.title)}" loading="lazy">${section.caption ? `<figcaption>${esc(section.caption)}</figcaption>` : ''}</figure>` : ''}</section>`).join('')}
            <dl class="facts"><div><dt>제작 연도</dt><dd>${esc(work.year)}</dd></div><div><dt>분류</dt><dd>${esc(work.category)}</dd></div>${work.medium ? `<div><dt>재료</dt><dd>${esc(work.medium)}</dd></div>` : ''}</dl>
            ${work.sample ? '<p class="sample-note">현재 사진과 글은 구성 확인용 샘플입니다.</p>' : ''}
            ${archive.works.length > 1 ? `<a class="next" href="${href(next)}">다음 작품 <span aria-hidden="true">↗</span><br>${esc(next.title)}</a>` : ''}
          </div>
        </article>`;
      setupGallery();
    } else {
      document.title = `페이지를 찾을 수 없어요 — ${archive.title}`;
      main.innerHTML = '<section class="empty"><h1>페이지를 찾을 수 없어요.</h1><p>주소가 변경되었거나 아직 등록되지 않은 페이지입니다.</p><a class="back" href="#">← 전체 작품 보기</a></section>';
    }
    if (!firstRender) {
      window.scrollTo(0, positions.get(route) || 0);
      main.tabIndex = -1;
      main.focus({preventScroll:true});
    }
    previousRoute = route;
    firstRender = false;
  }
  window.addEventListener('hashchange', render);
  render();
})();
