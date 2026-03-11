/* ============================================
   121212 GBM — Global Black Marketplace
   ============================================ */

// ── Scroll Progress Bar ──
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct   = (window.scrollY / total) * 100;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
});

// ── Nav scroll shadow ──
const navEl = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ── Animated Stats Counter ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = formatNumber(Math.floor(current));
  }, 16);
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n.toString();
}

// Trigger counters when stats section enters viewport
const statsSection = document.querySelector('.stats-wrapper');
let countersFired = false;
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersFired) {
      countersFired = true;
      document.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
    }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ── Newsletter Form ──
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Subscribing...';

    // Replace with real endpoint (Formspree, Mailchimp, etc.)
    setTimeout(() => {
      newsletterStatus.textContent = "You're in. Welcome to the movement.";
      newsletterStatus.style.display = 'block';
      newsletterForm.reset();
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }, 800);
  });
}
