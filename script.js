const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
const links = [...document.querySelectorAll('.site-nav a')];
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  });
}, {rootMargin: '-25% 0px -65% 0px'});
sections.forEach(section => observer.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();


// Align maker labels only among cards on the same horizontal row.
// Unlike a global three-line heading minimum, this preserves compact spacing.
(function alignFacilityMakersByRow() {
  const cards = Array.from(document.querySelectorAll('.facilities-grid .facility-card'));
  if (!cards.length) return;
  let frame = 0;
  function update() {
    frame = 0;
    const headings = cards.map(card => card.querySelector('.facility-copy h3'));
    headings.forEach(h => { if (h) h.style.minHeight = ''; });
    const rows = new Map();
    cards.forEach((card, i) => {
      const rowTop = Math.round(card.getBoundingClientRect().top);
      if (!rows.has(rowTop)) rows.set(rowTop, []);
      if (headings[i]) rows.get(rowTop).push(headings[i]);
    });
    rows.forEach(group => {
      const height = Math.max(...group.map(h => h.getBoundingClientRect().height));
      group.forEach(h => { h.style.minHeight = height + 'px'; });
    });
  }
  function schedule() {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }
  schedule();
  window.addEventListener('resize', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
})();
