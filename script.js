// Contrôles de l'interface et validation de formulaire
const navMenu = document.getElementById('nav-menu');
const mobileToggle = document.getElementById('mobile-toggle');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formFeedback = document.getElementById('form-feedback');
const fromEmailHidden = document.getElementById('from_email');
const userNameHidden = document.getElementById('user_name');
const userEmailHidden = document.getElementById('user_email');
const userMessageHidden = document.getElementById('user_message');
const senderEmailHidden = document.getElementById('sender_email');
const loader = document.getElementById('page-loader');

// Sélection aléatoire de l'image de profil
const profileImage = document.querySelector('.avatar-frame img');
const profileImages = ['images/profile1.jpg', 'images/profile2.jpg'];
const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
profileImage.src = randomImage;

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

// EmailJS initialization
emailjs.init('BmtigXxh0fUEjozTA');

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
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    showFeedback('Veuillez remplir tous les champs.', false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFeedback('Veuillez saisir une adresse email valide.', false);
    return;
  }

  if (fromEmailHidden) fromEmailHidden.value = email;
  if (userNameHidden) userNameHidden.value = name;
  if (userEmailHidden) userEmailHidden.value = email;
  if (userMessageHidden) userMessageHidden.value = message;
  if (senderEmailHidden) senderEmailHidden.value = email;

  showFeedback('Envoi du message en cours...', true);

  emailjs.sendForm('service_1ixeqao', 'template_39v59sr', contactForm)
    .then(() => {
      contactForm.reset();
      showFeedback('Message envoyé avec succès ! Je vous répondrai bientôt.', true);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      showFeedback('Erreur lors de l\'envoi. Vérifiez votre configuration EmailJS.', false);
    });
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
