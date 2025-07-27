// =================== Portfolio Web App Full Functionality Script ===================

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 1000);
    });
}

// Particles.js Background (requires particles.js included)
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {/* ...particles config here... */});
    }
}

// Typed.js Hero Text Animation (requires typed.js included)
function initTypedAnimation() {
    const el = document.getElementById('typed-skills');
    if (el && typeof Typed !== 'undefined') {
        new Typed('#typed-skills', {
            strings: [
                'SAP CPI Integration',
                'Real-time Data Sync',
                'API Management',
                'Cloud Migrations',
                'System Architecture',
                'Process Automation',
                'S/4HANA Integration',
                'BTP Development'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

// Responsive Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isActive);
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
        });
        navLinks.forEach(link =>
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            })
        );
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    }
    // Navbar scroll and active link highlighting
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        navbar.style.transform =
            currentScroll > lastScrollTop && currentScroll > 200
                ? 'translateY(-100%)'
                : 'translateY(0)';
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 100));
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', throttle(updateActiveNav, 100));
}

// Floating/parallax scroll effects for icons
function initScrollEffects() {
    const floatIcons = document.querySelectorAll('.tech-icon');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            floatIcons.forEach((icon, i) => {
                const speed = 0.3 + (i * 0.1);
                const rotation = scrolled * 0.05;
                icon.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
            });
        }, 16));
    }
}

// AOS Animations and Intersection Observer
function initAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }
    // Intersection Observer for lazy triggers
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('about-skills')) setTimeout(() => animateSkillBars(), 300);
                if (entry.target.classList.contains('hero-stats')) setTimeout(() => animateCounters(), 500);
                if (entry.target.classList.contains('skills-section')) setTimeout(() => animateProgressCircles(), 400);
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, i * 200);
                    });
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.glass-card, .about-skills, .hero-stats, .skills-section, .projects-grid').forEach(el => observer.observe(el));
}

// Animated stats/counters
function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2500, start = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            counter.textContent = current + (target === 100 ? '%' : '+');
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target + (target === 100 ? '%' : '+');
        }
        requestAnimationFrame(update);
    });
}

// Skill bar animation
function animateSkillBars() {
    document.querySelectorAll('.skill-fill[data-width]').forEach((bar, i) => {
        setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width') + '%';
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, i * 200);
    });
}

// Progress circle animation
function animateProgressCircles() {
    document.querySelectorAll('.progress-circle[data-percentage]').forEach((circle, i) => {
        setTimeout(() => {
            const perc = parseInt(circle.getAttribute('data-percentage'));
            const deg = (perc / 100) * 360;
            circle.style.setProperty('--percentage', deg + 'deg');
            circle.style.background = `conic-gradient(#6366f1 0deg, #6366f1 ${deg}deg, rgba(255,255,255,0.1) ${deg}deg)`;
        }, i * 300);
    });
}

// Contact form validation & notification
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const inputs = form.querySelectorAll('input, textarea, select');
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearErrors(input));
    });
    
}

function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    let isValid = true;
    let error = '';
    clearErrors(field);
    if (field.hasAttribute('required') && !value) {
        error = `${getFieldLabel(name)} is required.`;
        isValid = false;
    }
    if (name === 'email' && value && !isValidEmail(value)) {
        error = 'Please enter a valid email address.'; isValid = false;
    }
    if (name === 'name' && value && value.length < 2) {
        error = 'Name must be at least 2 characters long.'; isValid = false;
    }
    if (name === 'message' && value && value.length < 10) {
        error = 'Message must be at least 10 characters long.'; isValid = false;
    }
    if (!isValid) showFieldError(field, error);
    return isValid;
}
function showFieldError(field, msg) {
    const el = document.getElementById(field.name + '-error');
    if (el) {
        el.textContent = msg; el.style.display = 'block';
    }
    field.style.borderColor = '#f59e0b';
}
function clearErrors(field) {
    const el = document.getElementById(field.name + '-error');
    if (el) el.style.display = 'none';
    field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
}
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input, textarea, select').forEach(f => f.style.borderColor = 'rgba(255,255,255,0.1)');
}
function getFieldLabel(n) {
    return { name: 'Name', email: 'Email', project: 'Project Type', message: 'Message' }[n] || n;
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

// Testimonial Slider (No autoplay/touch scroll, only arrows/dots)
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    if (!slider || slides.length === 0) return;
    let currentSlide = 0, totalSlides = slides.length;
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
    }
    function nextSlide() { showSlide((currentSlide + 1) % totalSlides); }
    function prevSlide() { showSlide((currentSlide - 1 + totalSlides) % totalSlides); }
    showSlide(currentSlide);
    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;
    dots.forEach((dot, idx) => dot.onclick = () => showSlide(idx));
}

// Back to Top button
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    }, 100));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const section = document.querySelector(targetId);
            if (section) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const pos = section.offsetTop - navHeight - 20;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}

// Performance: Lazy load, preload
function initPerformanceOptimizations() {
    // Images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
    // Preload resources
    [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    ].forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload'; link.as = 'style'; link.href = href;
        document.head.appendChild(link);
    });
}

// Notification function
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';
    if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon"><i class="${iconClass}"></i></div>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    const styles = {
        success: 'rgba(16, 185, 129, 0.9)',
        error: 'rgba(239, 68, 68, 0.9)',
        info: 'rgba(59, 130, 246, 0.9)',
        warning: 'rgba(245, 158, 11, 0.9)'
    };
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: ${styles[type] || styles.info};
        color: white; padding: 16px 20px; border-radius: 12px;
        backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,.3);
        animation: slideInRight .3s ease; max-width: 400px; min-width: 300px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Throttle/Debounce
function throttle(func, limit) {
    let inThrottle; return function() {
        const args = arguments, context = this;
        if (!inThrottle) {
            func.apply(context, args); inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Additional enhancements (if desired: cursor/tilt/analytics etc.)
// Optional: see last code snippets for advanced UI/UX

// Init all features on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initParticles();
    initTypedAnimation();
    initNavigation();
    initScrollEffects();
    initAnimations();
    animateCounters();
    animateSkillBars();
    initContactForm();
    initSmoothScrolling();
    initTestimonialSlider();
    initBackToTop();
    initPerformanceOptimizations();
    animateProgressCircles();
    // ...add optional custom effects if desired...
});

// Notification CSS keyframes injected for use
const notifStyles = document.createElement('style');
notifStyles.textContent = `
@keyframes slideInRight {from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideOutRight {from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
.notification-content{display:flex;align-items:center;gap:12px;}
.notification-icon{flex-shrink:0;}
.notification-text{flex:1;font-size:14px;line-height:1.5;}
.notification-close{background:none;border:none;color:white;cursor:pointer;padding:4px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;flex-shrink:0;}
.notification-close:hover{background:rgba(255,255,255,0.1);}
@media(max-width:480px){
    .notification{right:10px!important;left:10px!important;max-width:none!important;min-width:auto!important;}
}
`;document.head.appendChild(notifStyles);

window.addEventListener('error', function(e) {
    console.warn('Portfolio script error:', e.message);
    if (e.message.includes('particlesJS')) console.log('Particles.js not loaded, skipping particle animation');
    if (e.message.includes('Typed')) {
        console.log('Typed.js not loaded, skipping typing animation');
        const typedElement = document.getElementById('typed-skills');
        if (typedElement) typedElement.textContent = 'SAP CPI Integration';
    }
    if (e.message.includes('AOS')) console.log('AOS not loaded, skipping scroll animations');
});
// Service worker/analytics can be registered here as needed

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // (Optional) Add your client-side validation here
    var form = this;
    var formData = new FormData(form);
  
    var submitBtn = form.querySelector('.submit-btn');
    var originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
  
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (result.success) {
          showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
          form.reset();
          // (Optional) Hide the form or show a custom thank-you section here.
        } else {
          showNotification('There was an error sending your message.', 'error');
        }
      })
      .catch(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('There was an error sending your message.', 'error');
      });
  });

  
  document.addEventListener('DOMContentLoaded', function() {
    // Create the cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  
    // Variables for mouse/cursor position
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorX = mouseX, cursorY = mouseY;
  
    // Only show on desktop
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) { cursor.style.display = 'none'; return; }
  
    // Show/hide on mouse move/leave
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = 1;
    });
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
    });
  
    // Animate cursor towards mouse
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  
    // Grow cursor when over links & buttons
    const hoverEls = [...document.querySelectorAll('a, button, .glass-card, .cta-btn, input, textarea, select')];
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  });
  