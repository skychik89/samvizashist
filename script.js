(function () {
  'use strict';

  var doc = document;

  /* ---- плейсхолдеры для отсутствующих картинок ---- */
  function markMissing(img) {
    var ph = img.closest('.ph');
    if (ph) ph.classList.add('is-missing');
  }
  doc.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') markMissing(e.target);
  }, true);
  doc.querySelectorAll('.ph img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });

  /* ---- появление при скролле ---- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- закреплённая кнопка ---- */
  var sticky = doc.getElementById('sticky');
  var hero = doc.getElementById('hero');
  var final = doc.getElementById('final');
  var footer = doc.getElementById('footer');
  if (sticky && 'IntersectionObserver' in window) {
    var state = { hero: true, final: false, footer: false };
    var update = function () {
      var on = !state.hero && !state.final && !state.footer;
      sticky.classList.toggle('is-on', on);
      sticky.setAttribute('aria-hidden', on ? 'false' : 'true');
      var a = sticky.querySelector('a');
      if (a) a.tabIndex = on ? 0 : -1;
    };
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { state[en.target.id] = en.isIntersecting; });
      update();
    }, { threshold: 0.15 });
    [hero, final, footer].forEach(function (el) { if (el) so.observe(el); });
  }

  /* ---- «Показать всё» ---- */
  doc.querySelectorAll('.more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = doc.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (!open) {
        box.classList.remove('is-collapsed');
        box.style.maxHeight = box.scrollHeight + 'px';
      } else {
        box.style.maxHeight = box.scrollHeight + 'px';
        void box.offsetHeight;
        box.classList.add('is-collapsed');
        box.style.maxHeight = '';
      }
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'Показать всё' : 'Свернуть';
    });
  });

  /* ---- FAQ ---- */
  doc.querySelectorAll('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc__item');
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-open', !open);
    });
  });

  /* ---- лайтбокс ---- */
  var lb = doc.getElementById('lb');
  var lbImg = lb.querySelector('.lb__img');
  var lbPh = lb.querySelector('.lb__ph');
  var lbCount = lb.querySelector('.lb__count');
  var group = [], idx = 0, opener = null;

  function show(i) {
    idx = (i + group.length) % group.length;
    var shot = group[idx];
    var img = shot.querySelector('img');
    var ph = shot.querySelector('.ph');
    var missing = !img || !img.complete || img.naturalWidth === 0 || (ph && ph.classList.contains('is-missing'));
    if (missing) {
      lbImg.hidden = true;
      lbPh.hidden = false;
      lbPh.textContent = ph ? ph.getAttribute('data-label') : '';
    } else {
      lbPh.hidden = true;
      lbImg.hidden = false;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
    }
    lbCount.textContent = (idx + 1) + ' / ' + group.length;
  }
  function open(shot) {
    group = Array.prototype.slice.call(doc.querySelectorAll('.shot[data-gallery="' + shot.dataset.gallery + '"]'));
    opener = shot;
    lb.hidden = false;
    doc.body.style.overflow = 'hidden';
    show(group.indexOf(shot));
    lb.querySelector('.lb__close').focus();
  }
  function close() {
    lb.hidden = true;
    doc.body.style.overflow = '';
    lbImg.removeAttribute('src');
    if (opener) opener.focus();
  }
  doc.querySelectorAll('.shot').forEach(function (s) {
    s.addEventListener('click', function () { open(s); });
  });
  lb.querySelector('.lb__close').addEventListener('click', close);
  lb.querySelector('.lb__prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb__next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb__stage')) close();
  });
  doc.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
  var tx = 0, ty = 0;
  lb.addEventListener('touchstart', function (e) {
    tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
