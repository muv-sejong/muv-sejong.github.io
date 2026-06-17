
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

// v65: image lightbox with watermark overlay + lightweight copy deterrence.
// This deters casual right-click / drag-copy. It is not DRM and cannot prevent screenshots or source inspection.
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'muv-image-lightbox';
  lightbox.innerHTML = `
    <button class="muv-lightbox-close" aria-label="Close enlarged image">×</button>
    <div class="muv-lightbox-frame">
      <img alt="" draggable="false" />
      <div class="muv-lightbox-watermark" aria-hidden="true">
        <span>MUV LAB · SEJONG UNIVERSITY</span>
        <span>MUV LAB · SEJONG UNIVERSITY</span>
        <span>MUV LAB · SEJONG UNIVERSITY</span>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.muv-lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    lightboxImg.removeAttribute('src');
    lightboxImg.alt = '';
  };

  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (event) => event.preventDefault());
  });

  document.querySelectorAll('.research-image-v60 img, .research-figure-board-v60 img, .protected-image img').forEach((img) => {
    img.classList.add('is-lightbox-target');
    img.addEventListener('click', () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || 'MUV Lab research figure';
      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });

  document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('img, .protected-image, .research-image-v60, .research-figure-board-v60, .muv-image-lightbox')) {
      event.preventDefault();
    }
  });
});
