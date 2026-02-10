// ==================== TYPING EFFECT ====================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== STATS COUNTER ANIMATION ====================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ==================== SKILLS PROGRESS BARS ====================

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', progress + '%');
        
        // Add animated class to trigger CSS transition
        setTimeout(() => {
            bar.classList.add('animated');
            bar.style.width = progress + '%';
        }, 100);
    });
}

// ==================== INTERSECTION OBSERVER ====================

function setupIntersectionObserver() {
    const options = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when hero section is in view
                if (entry.target.classList.contains('hero')) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                }
                
                // Animate skill bars when skills section is in view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe sections
    const hero = document.querySelector('.hero');
    const skills = document.querySelector('.skills');
    
    if (hero) observer.observe(hero);
    if (skills) observer.observe(skills);
}

// ==================== SMOOTH SCROLL ====================

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for non-section links
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 80px offset for better positioning
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== PARALLAX SCROLL EFFECT ====================

function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
        });
    });
}

// ==================== HOVER EFFECTS ====================

function setupHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    // Tagline typing effect
    const taglineElement = document.getElementById('tagline');
    const taglineText = 'First-Year CS Student | Open Source Contributor | Building the Decentralized Future';
    
    if (taglineElement) {
        setTimeout(() => {
            typeWriter(taglineElement, taglineText, 50);
        }, 500);
    }
    
    // Setup observers and effects
    setupIntersectionObserver();
    setupSmoothScroll();
    setupHoverEffects();
    
    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================

// Debounce scroll events
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    // Add any scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ==================== ACCESSIBILITY ====================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--bitcoin-orange);
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// ==================== CONSOLE MESSAGE ====================

console.log('%c🚀 Summer of Bitcoin Portfolio', 
    'font-size: 20px; font-weight: bold; color: #F7931A;');
console.log('%cBuilt with passion by Lucky Singh', 
    'font-size: 14px; color: #8B5CF6;');
console.log('%c🔗 GitHub: https://github.com/luckyxhq', 
    'font-size: 12px; color: #A0A0B8;');
