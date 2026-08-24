/* Motion and state for the portfolio. No dependencies.
   Everything here is a progressive enhancement: with JS off, or with
   reduced motion on, the page is fully readable and every element visible. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── theme ─────────────────────────────────────────────── */
  var KEY = 'sv-theme';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
  }

  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', stored() || (prefersLight ? 'light' : 'dark'));

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store(next);
    });
  }

  /* ── portrait ──────────────────────────────────────────── */
  // Try each candidate filename in turn so any common export works; if none
  // resolves, the frame shows its monogram rather than a broken image.
  (function () {
    var img = document.getElementById('portrait');
    if (!img) { return; }

    var sources = (img.getAttribute('data-sources') || '').split(',').filter(Boolean);
    var frame = img.closest('.portrait-frame');
    var i = 0;

    function next() {
      if (i >= sources.length) {
        if (frame) { frame.classList.add('is-empty'); }
        img.remove();
        return;
      }
      img.setAttribute('src', sources[i++]);
    }

    img.addEventListener('error', next);
    next();
  })();

  /* ── hero load sequence ────────────────────────────────── */
  // Each [data-seq] element carries its position in the opening sequence;
  // the CSS turns that into a transition-delay.
  Array.prototype.forEach.call(document.querySelectorAll('[data-seq]'), function (el) {
    el.style.setProperty('--seq', el.getAttribute('data-seq'));
  });

  function start() { document.body.classList.add('is-ready'); }
  if (document.fonts && document.fonts.ready) {
    // Wait for webfonts so the headline does not reveal mid-swap.
    document.fonts.ready.then(start);
    setTimeout(start, 900); // ...but never wait on a font that will not arrive
  } else {
    start();
  }

  /* ── nav: border + scroll progress ─────────────────────── */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('navProgress');
  var ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    if (nav) { nav.classList.toggle('is-scrolled', y > 8); }
    if (progress && !reduced) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onFrame); }
  }
  onFrame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ── scroll reveals ────────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');
  var cases = document.querySelectorAll('[data-case]');

  function showAll() {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
    Array.prototype.forEach.call(cases, function (el) { el.classList.add('is-in'); });
    var contact = document.querySelector('.contact');
    if (contact) { contact.classList.add('is-in'); }
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    Array.prototype.forEach.call(cases, function (el) { io.observe(el); });
  }

  /* ── scroll-spy ────────────────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      var best = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!best) { return; }
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + best.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── footer year ───────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
