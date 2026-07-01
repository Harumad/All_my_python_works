'use strict';

/* ==========================================
   TABLE OF CONTENTS
   1. DOM Ready
   2. Preloader
   3. Hero Image Slideshow
   4. Mobile Navigation
   5. Sticky Header
   6. Active Nav Link Highlighting
   7. Smooth Scrolling
   8. Scroll Reveal Animations
   9. Counter Animation
   10. FAQ Accordion
   11. Testimonials Slider
   12. Contact Form Validation
   13. Newsletter Form
   14. Back to Top Button
   15. Image Lazy Loading (native)
   16. Initialize
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ===================== 2. Preloader ===================== */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', function () {
      loader.classList.add('loaded');
    });
    setTimeout(function () {
      if (!loader.classList.contains('loaded')) {
        loader.classList.add('loaded');
      }
    }, 1500);
  }

  /* ===================== 3. Hero Image Slideshow ===================== */
  const heroSlideshow = (function () {
    const slides = document.querySelectorAll('.hero-slide');
    const indicatorsContainer = document.getElementById('heroIndicators');
    if (!slides.length || !indicatorsContainer) return;

    let currentIndex = 0;
    let interval;
    const totalSlides = slides.length;
    const INTERVAL_MS = 5000;

    function createIndicators() {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'hero-indicator' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        indicatorsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      if (index === currentIndex) return;
      slides[currentIndex].classList.remove('active');
      indicatorsContainer.children[currentIndex].classList.remove('active');
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      indicatorsContainer.children[currentIndex].classList.add('active');
    }

    function next() { goTo((currentIndex + 1) % totalSlides); }

    function start() { interval = setInterval(next, INTERVAL_MS); }
    function stop() { clearInterval(interval); }

    createIndicators();
    start();

    document.querySelector('.hero').addEventListener('mouseenter', stop);
    document.querySelector('.hero').addEventListener('mouseleave', start);

    return { goTo: goTo, next: next, start: start, stop: stop };
  })();

  /* ===================== 4. Mobile Navigation ===================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  /* ===================== 5. Sticky Header ===================== */
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ===================== 6. Active Nav Link Highlighting ===================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });
  window.addEventListener('load', highlightNavLink);

  /* ===================== 7. Smooth Scrolling ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===================== 8. Scroll Reveal Animations ===================== */
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealThreshold = 100;

    revealElements.forEach(function (element) {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealThreshold) {
        element.classList.add('visible');
      }
    });
  }

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });

  /* ===================== 9. Counter Animation ===================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const heroRect = heroContent.getBoundingClientRect();
    if (heroRect.bottom < 0) return;

    countersAnimated = true;

    statNumbers.forEach(function (stat) {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      let current = 0;
      const increment = Math.ceil(target / 60);
      const duration = 2000;
      const stepTime = Math.floor(duration / 60);

      function updateCounter() {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          return;
        }
        stat.textContent = current;
        setTimeout(updateCounter, stepTime);
      }

      updateCounter();
    });
  }

  window.addEventListener('scroll', function () {
    if (!countersAnimated) {
      animateCounters();
    }
  }, { passive: true });

  setTimeout(animateCounters, 500);

  /* ===================== 10. FAQ Accordion ===================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      faqQuestions.forEach(function (q) {
        q.parentElement.classList.remove('active');
        q.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        faqItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===================== 11. Testimonials Slider ===================== */
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (track && dotsContainer) {
    const slides = track.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayInterval;

    function createDots() {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () {
          goToSlide(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(currentIndex);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    createDots();

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoplay();
      });
    }

    startAutoplay();

    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', function () {
        clearInterval(autoplayInterval);
      });
      sliderContainer.addEventListener('mouseleave', function () {
        startAutoplay();
      });
    }
  }

  /* ===================== 12. Contact Form Validation ===================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const phoneInput = document.getElementById('phone');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    function validateName() {
      if (!fullNameInput.value.trim()) {
        fullNameInput.classList.add('error');
        fullNameError.textContent = 'Full name is required';
        return false;
      }
      if (fullNameInput.value.trim().length < 2) {
        fullNameInput.classList.add('error');
        fullNameError.textContent = 'Name must be at least 2 characters';
        return false;
      }
      fullNameInput.classList.remove('error');
      fullNameError.textContent = '';
      return true;
    }

    function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        emailError.textContent = 'Email address is required';
        return false;
      }
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        return false;
      }
      emailInput.classList.remove('error');
      emailError.textContent = '';
      return true;
    }

    function validateMessage() {
      if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        messageError.textContent = 'Message is required';
        return false;
      }
      if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('error');
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
      }
      messageInput.classList.remove('error');
      messageError.textContent = '';
      return true;
    }

    fullNameInput.addEventListener('blur', validateName);
    fullNameInput.addEventListener('input', function () {
      if (fullNameInput.classList.contains('error')) validateName();
    });

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function () {
      if (emailInput.classList.contains('error')) validateEmail();
    });

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', function () {
      if (messageInput.classList.contains('error')) validateMessage();
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(function () {
          formSuccess.classList.remove('show');
        }, 5000);
      }
    });
  }

  /* ===================== 13. Newsletter Form ===================== */
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!newsletterEmail.value.trim()) {
        newsletterMessage.textContent = 'Please enter your email address';
        newsletterMessage.className = 'newsletter-message error';
        return;
      }

      if (!emailRegex.test(newsletterEmail.value.trim())) {
        newsletterMessage.textContent = 'Please enter a valid email address';
        newsletterMessage.className = 'newsletter-message error';
        return;
      }

      newsletterMessage.textContent = 'Thank you for subscribing!';
      newsletterMessage.className = 'newsletter-message success';
      newsletterForm.reset();

      setTimeout(function () {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
      }, 5000);
    });
  }

  /* ===================== 14. Back to Top Button ===================== */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ===================== 15. Image Lazy Loading (native) ===================== */
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(function (img) {
    img.setAttribute('loading', 'lazy');
  });

  /* ===================== 16. Initialize ===================== */
  console.log('Tuba Senior High School - Website initialized successfully');
});
