/* ============================================
   NAVIGATION & HEADER SCROLL EFFECTS
   ============================================ */

const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');

// Enhanced header scroll effect with threshold
let lastScrollY = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  
  // Clear previous timeout
  clearTimeout(scrollTimeout);
  
  // Add scrolled class when scroll position > 60px
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Optional: Hide header on scroll down, show on scroll up
  scrollTimeout = setTimeout(() => {
    // Debounce for performance
  }, 100);
}, { passive: true });

// Smooth scrolling for navigation links with active state handling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Remove active class from all links
      navLinks.forEach(l => l.style.color = '');
      
      // Add active state to clicked link
      link.style.color = 'var(--primary-color)';
      
      // Scroll to section
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight) {
      // Update active link
      navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === '#' + section.id) {
          link.style.color = 'var(--primary-color)';
        }
      });
    }
  });
}, { passive: true });

/* ============================================
   TYPING ANIMATION FOR ROLES
   ============================================ */

const roles = ['Ram Katikala', 'AI-ML Engineer', 'Full Stack web Developer'];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.querySelector('.role');
const typingSpeed = 120;
const erasingSpeed = 80;
const delayBetweenRoles = 2000;

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleElement.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(eraseRole, delayBetweenRoles);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 400);
  }
}

// Start typing animation
typeRole();

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
  '.education-card, .project-card, .contact-method, .skill-badge'
);

animateElements.forEach(element => {
  element.style.opacity = '0';
  element.style.animation = 'fadeInUp 0.6s ease-out forwards';
  observer.observe(element);
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

/* ============================================
   DARK MODE TOGGLE (Optional)
   ============================================ */

function initDarkMode() {
  const isDark = localStorage.getItem('darkMode') !== 'false';
  if (!isDark) {
    document.body.classList.add('light-mode');
  }
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ============================================
   FORM VALIDATION (if contact form added)
   ============================================ */

function validateForm(formData) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!formData.name || formData.name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  
  if (!emailRegex.test(formData.email)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    return { valid: false, message: 'Message must be at least 10 characters.' };
  }
  
  return { valid: true, message: 'Form is valid!' };
}

// Contact form submit handling: validate and open user's mail client
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      subject: document.getElementById('subject')?.value || '',
      message: document.getElementById('message')?.value || ''
    };

    const validation = validateForm(formData);
    if (!validation.valid) {
      if (formStatus) {
        formStatus.textContent = validation.message;
        formStatus.style.color = '#ff7b7b';
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = 'Opening your email client...';
      formStatus.style.color = '#cbd5f5';
    }

    // Construct mailto link
    const to = 'phanikatikala@gmail.com';
    const subject = formData.subject || `Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${encodeURIComponent(formData.message)}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open user's default mail client
    window.location.href = mailto;
  });
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Get element by ID safely
function getElement(id) {
  return document.getElementById(id);
}

// Add class to element
function addClass(element, className) {
  if (element) element.classList.add(className);
}

// Remove class from element
function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

// Toggle visibility with animation
function toggleVisibility(element, duration = 300) {
  if (!element) return;
  
  element.style.transition = `opacity ${duration}ms ease`;
  
  if (element.style.opacity === '0' || !element.style.opacity) {
    element.style.opacity = '1';
  } else {
    element.style.opacity = '0';
  }
}

/* ============================================
   PAGE LOAD OPTIMIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');
  
  // Add loading class
  document.body.style.opacity = '0';
  document.body.style.animation = 'fadeIn 0.8s ease-out forwards';
  
  // Initialize all components
  initDarkMode();
});

// Add fade-in animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

/* ============================================
   CONSOLE LOG
   ============================================ */

console.log('%c🚀 Welcome to Ram Katikala Portfolio!', 'color: #4f7cff; font-size: 16px; font-weight: bold;');
console.log('%cMade with ❤️ using HTML, CSS & JavaScript', 'color: #cbd5f5; font-size: 12px;');
