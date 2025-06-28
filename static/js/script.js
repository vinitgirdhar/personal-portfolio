// Main JavaScript file for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initAnimatedBackground();
    initScrollEffects();
    initContactForm();
    initIntersectionObserver();
    initCertificateGallery();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Create animated 3D background
function initAnimatedBackground() {
    const animatedBg = document.getElementById('animated-bg');
    
    if (animatedBg) {
        // Create floating cubes
        for (let i = 0; i < 8; i++) {
            const cube = document.createElement('div');
            cube.className = 'floating-cube';
            
            // Random positioning
            cube.style.left = Math.random() * 100 + '%';
            cube.style.top = Math.random() * 100 + '%';
            cube.style.animationDelay = Math.random() * 5 + 's';
            cube.style.animationDuration = (Math.random() * 10 + 8) + 's';
            
            // Random size variation
            const size = Math.random() * 40 + 30;
            cube.style.width = size + 'px';
            cube.style.height = size + 'px';
            
            animatedBg.appendChild(cube);
        }
    }
}

// Scroll effects for navigation and animations
function initScrollEffects() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        // Navigation background opacity
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('bg-gray-900/95');
                nav.classList.remove('bg-gray-900/80');
            } else {
                nav.classList.add('bg-gray-900/80');
                nav.classList.remove('bg-gray-900/95');
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Contact form enhancements
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Reset button after a delay (form will redirect)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
        
        // Form validation enhancements
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidationErrors);
        });
    }
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('border-red-500');
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-400 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear validation errors
function clearValidationErrors(e) {
    const field = e.target;
    field.classList.remove('border-red-500');
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Particle effect for cursor (optional enhancement)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Theme switcher (future enhancement)
function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }
}

// Performance optimization: Lazy load images
function initLazyLoading() {
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
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.warn('Resource loading error:', e.target.src || e.target.href);
    
    // Handle missing images gracefully
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
    }
});

// Analytics and tracking (when implemented)
function trackEvent(action, category, label) {
    // Integration point for Google Analytics or other tracking
    console.log('Event tracked:', { action, category, label });
}

// Certificate Gallery functionality
function initCertificateGallery() {
    const container = document.querySelector('.certificate-container');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    const certificates = document.querySelectorAll('.certificate-card');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const cardWidth = 400 + 32; // card width + gap
    let currentIndex = 0;
    const maxIndex = Math.max(0, certificates.length - Math.floor(container.clientWidth / cardWidth));
    
    // Update navigation buttons state
    function updateNavButtons() {
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    // Scroll to specific index
    function scrollToIndex(index) {
        const scrollLeft = index * cardWidth;
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        currentIndex = index;
        updateNavButtons();
    }
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            scrollToIndex(currentIndex + 1);
        }
    });
    
    // Touch/mouse wheel scrolling
    let isScrolling = false;
    container.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        isScrolling = true;
        
        e.preventDefault();
        if (e.deltaY > 0 && currentIndex < maxIndex) {
            scrollToIndex(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
        
        setTimeout(() => { isScrolling = false; }, 500);
    });
    
    // Handle manual scrolling
    container.addEventListener('scroll', throttle(() => {
        const scrollLeft = container.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateNavButtons();
        }
    }, 100));
    
    // Certificate click for full view modal
    certificates.forEach((card, index) => {
        card.addEventListener('click', () => {
            openCertificateModal(card.querySelector('.certificate-image'));
        });
    });
    
    // Initialize
    updateNavButtons();
    
    // Handle window resize
    window.addEventListener('resize', throttle(() => {
        const newMaxIndex = Math.max(0, certificates.length - Math.floor(container.clientWidth / cardWidth));
        if (currentIndex > newMaxIndex) {
            scrollToIndex(newMaxIndex);
        }
        updateNavButtons();
    }, 250));
}

// Certificate Modal functionality
function openCertificateModal(imgElement) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.certificate-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'certificate-modal';
        modal.innerHTML = `
            <div class="certificate-modal-content">
                <button class="certificate-modal-close">&times;</button>
                <img src="" alt="Certificate">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
        
        modal.querySelector('.certificate-modal-close').addEventListener('click', closeCertificateModal);
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeCertificateModal();
            }
        });
    }
    
    // Set image and show modal
    const modalImg = modal.querySelector('img');
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.querySelector('.certificate-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add event tracking to important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    
    if (target) {
        const text = target.textContent.trim();
        const href = target.href || target.dataset.action;
        
        if (href && (href.startsWith('#') || href.includes('mailto'))) {
            trackEvent('click', 'navigation', text);
        }
    }
});
