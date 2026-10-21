// Code Geass Fan App — navegación, slider, personajes y momentos
// Rainer Cruz — ITLA 2025-0061
(function () {
  const D = window.GEASS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Navegación ---------- */
  function go(name) {
    $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
    $$('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.go === name));
    if (name === 'portada') startSlider(); else stopSlider();
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go]');
    if (t) go(t.dataset.go);
  });

  /* ---------- Slider de portada ---------- */
  const slides = $('#slides');
  const dots = $('#dots');
  const count = $$('.slide', slides).length;
  let idx = 0, timer = null;
  for (let i = 0; i < count; i++) dots.appendChild(document.createElement('i'));
  function show(i) {
    idx = (i + count) % count;
    slides.style.transform = `translateX(${-idx * 100}%)`;
    $$('i', dots).forEach((d, k) => d.classList.toggle('on', k === idx));
  }
  function startSlider() { stopSlider(); timer = setInterval(() => show(idx + 1), 4000); }
  function stopSlider() { if (timer) clearInterval(timer); timer = null; }
  let x0 = null;
  slides.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; stopSlider(); }, { passive: true });
  slides.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    x0 = null; startSlider();
  });
  show(0); startSlider();

  /* ---------- Utilidades ---------- */
  function emblem(color, glyph) {
    return `<div class="emblem" style="background:linear-gradient(135deg, ${color}, #0b0712 130%)">${glyph}</div>`;
  }
  function photoHTML(src, color, glyph, alt) {
    // Si la imagen no existe, queda visible el emblema original que está debajo.
    return emblem(color, glyph) + `<img src="${src}" alt="${alt}" onerror="this.remove()">`;
  }
  function youtubeId(url) {
    if (!url) return '';
    const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(url) ? url : '');
  }

  /* ---------- Modal ---------- */
  const modal = $('#modal'), body = $('#modal-body');
  function openModal(html) { body.innerHTML = html; modal.hidden = false; modal.querySelector('.sheet').scrollTop = 0; }
  function closeModal() { modal.hidden = true; body.innerHTML = ''; } // al vaciar se detiene el video
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  /* ---------- Personajes ---------- */
  const list = $('#char-list');
  D.characters.forEach(c => {
    const b = document.createElement('button');
    b.className = 'char';
    b.innerHTML = `<div class="pic">${photoHTML(c.photo, c.color, c.glyph, c.name)}</div>
      <div class="meta"><b>${c.name}</b><span>${c.alias}</span></div>`;
    b.addEventListener('click', () => openModal(`
      <div class="d-photo">${photoHTML(c.photo, c.color, c.glyph, c.name)}</div>
      <h3>${c.name}</h3>
      <div class="alias">${c.alias}</div>
      <div class="info"><b>Rol:</b> ${c.role}<br><b>Voz:</b> ${c.voice}</div>
      <p>${c.bio}</p>
      <div class="chips">${c.traits.map(t => `<span>${t}</span>`).join('')}</div>`));
    list.appendChild(b);
  });

  /* ---------- Momentos ---------- */
  const mlist = $('#moment-list');
  D.moments.forEach(m => {
    const vid = youtubeId(m.video);
    const thumb = vid ? `https://i.ytimg.com/vi/${vid}/hqdefault.jpg` : '';
    const b = document.createElement('button');
    b.className = 'moment';
    b.innerHTML = `<div class="pic">${emblem(m.color, m.glyph)}${thumb ? `<img src="${thumb}" alt="${m.title}" onerror="this.remove()">` : ''}<div class="play">▶</div></div>
      <div class="meta"><b>${m.title}</b><span>${m.season}</span></div>`;
    b.addEventListener('click', () => {
      const player = vid
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${vid}?playsinline=1&rel=0&modestbranding=1&autoplay=1&start=${parseInt(m.start || 0, 10)}"
             title="${m.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
             referrerpolicy="strict-origin-when-cross-origin"></iframe>`
        : `<div class="novideo">Video no disponible todavía.</div>`;
      openModal(`
        <h3>${m.title}</h3>
        <div class="alias">${m.season}</div>
        <div class="player">${player}</div>
        ${m.spoiler ? '<div class="warn">⚠ Spoilers del final de la serie</div>' : ''}
        <p>${m.detail}</p>`);
    });
    mlist.appendChild(b);
  });

  /* ---------- Acerca de ---------- */
  $('#about-list').innerHTML = D.about.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#about-premise').textContent = D.premise;

  window.GeassNav = { go };
})();
