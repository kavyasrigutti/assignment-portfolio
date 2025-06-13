// Custom JavaScript for additional interactions and animations

// Smooth scrolling utility
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Observe all sections for scroll animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add parallax effect to hero section
  const hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add typing effect to hero text (optional enhancement)
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.classList.add('animate-fade-in');
    }, 500);
  }

  // Enhanced form validation feedback
  const form = document.querySelector('#contact form');
  if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }

  // Add loading states to buttons
  const buttons = document.querySelectorAll('button[type="submit"]');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.form && button.form.checkValidity()) {
        button.classList.add('loading');
        setTimeout(() => {
          button.classList.remove('loading');
        }, 2000);
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Add custom cursor effect (optional)
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(59, 130, 246, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
});

// Utility functions for form validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateForm(formData) {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Export functions for use in React components
window.portfolioUtils = {
  smoothScrollTo,
  validateEmail,
  validateForm
};