// Contrôles de l'interface et validation de formulaire
const navMenu = document.getElementById('nav-menu');
const mobileToggle = document.getElementById('mobile-toggle');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const loader = document.getElementById('page-loader');

// Ouvrir / fermer le menu mobile
mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Mode sombre
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Bouton retour en haut
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validation du formulaire
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    showFeedback('Veuillez remplir tous les champs.', false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFeedback('Veuillez saisir une adresse email valide.', false);
    return;
  }

  contactForm.reset();
  showFeedback('Message envoyé avec succès ! Je vous répondrai bientôt.', true);
});

function showFeedback(message, success) {
  formFeedback.textContent = message;
  formFeedback.style.color = success ? '#2563eb' : '#dc2626';
}

// Animation au scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach(element => revealObserver.observe(element));

// Fermeture du menu mobile lors du clic sur un lien
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Loader de page
window.addEventListener('load', () => {
  loader.classList.add('hidden');
  setTimeout(() => loader.style.display = 'none', 600);
});
