
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
  }

  const counters = document.querySelectorAll('.count');
  const runCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (target >= 40 ? '+' : '');
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        runCounter(entry.target);
      }
    });
  }, { threshold: .35 });
  counters.forEach(c => observer.observe(c));
});

// v64: lightweight image-copy deterrence for website visuals.
// This deters casual right-click / drag-copy. It is not DRM and cannot prevent screenshots or source inspection.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (event) => event.preventDefault());
  });

  document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('img, .protected-image, .research-image-v60, .research-figure-board-v60')) {
      event.preventDefault();
    }
  });
});
