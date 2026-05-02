// Mobile Menu Toggle & Overlay
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay') || createNavOverlay();

function createNavOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  return overlay;
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
  });

  navOverlay.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
    });
  });
}

// Set Active Nav Link Based on Current Page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');

    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();

// Header Scroll Effect
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });
}

// Intersection Observer for Reveal Animations
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});

// Booking Form Handler
const bookingForm = document.querySelector('#bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const destination = formData.get('destination');
    const purpose = formData.get('purpose');
    const timeline = formData.get('timeline');
    const message = formData.get('message');

    const whatsappMsg = `Hello SATO Travel & Tours,

I am requesting professional appointment support.

🧑 Name: ${name}
📱 WhatsApp: ${phone}
📧 Email: ${email}
🌍 Destination: ${destination}
✈️ Travel Purpose: ${purpose}
📅 Timeline: ${timeline}

Additional Details:
${message}

I look forward to your guidance and support.`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/447766919721?text=${encodedMsg}`, '_blank');

    bookingForm.reset();
  });
}

// Smooth Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
