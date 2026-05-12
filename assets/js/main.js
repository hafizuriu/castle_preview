// Maine AI Center - shared site JS
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark current nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const tail = href.split('/').pop();
    if (tail === path) a.classList.add('active');
    // section pages
    if (path.startsWith('labs/') && href.endsWith('labs.html')) a.classList.add('active');
    if (path.startsWith('people/') && href.endsWith('team.html')) a.classList.add('active');
  });

  // Smooth reveal
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 })
    : null;
  if (io) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  }

  // Set year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
