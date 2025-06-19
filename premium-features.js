// Premium Features and Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all premium features
    initRippleEffect();
    initEnhancedLoader();
    initScrollProgress();
    initParallaxEffect();
    initTextReveal();
    initTiltEffect();
    initPremiumFormEffects();
    initAnimatedIcons();
    initPageTransitions();
    initEnhancedFlipCards();
    createPremiumSVGDecorations();
});

// Ripple Effect for Buttons and Interactive Elements
function initRippleEffect() {
    // Add ripple effect class to all interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .contact-item');
    
    interactiveElements.forEach(element => {
        element.classList.add('ripple-effect');
        
        element.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Get position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            // Set position and size
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            // Add ripple to element
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
}

// Enhanced Loading Screen
function initEnhancedLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return; // Exit if loading screen doesn't exist
    
    const loaderContainer = document.querySelector('.loader-container');
    if (!loaderContainer) return; // Exit if loader container doesn't exist
    
    try {
        // Remove old loader
        loaderContainer.innerHTML = '';
        
        // Create premium loader
        const premiumLoader = document.createElement('div');
        premiumLoader.classList.add('premium-loader');
        premiumLoader.innerHTML = `
            <div class="premium-loader-circle"></div>
            <div class="premium-loader-circle"></div>
            <div class="premium-loader-circle"></div>
        `;
        
        // Create percentage counter
        const percentageCounter = document.createElement('div');
        percentageCounter.classList.add('percentage-counter');
        percentageCounter.innerHTML = '<span>0%</span>';
        
        // Create SVG container (hidden initially)
        const svgContainer = document.createElement('div');
        svgContainer.classList.add('portfolio-svg-container');
        svgContainer.innerHTML = `
            <svg class="portfolio-svg" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
                <path class="portfolio-path" d="M10,15 L10,5 L20,5 L20,15 L10,15 M25,15 L25,5 L35,5 C38,5 40,7 40,10 C40,13 38,15 35,15 L25,15 M45,15 L45,5 L55,5 L55,15 M60,15 L60,5 L70,5 L70,15 M75,15 L75,5 L85,5 C88,5 90,7 90,10 C90,13 88,15 85,15 L75,15" stroke="var(--accent-color)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;
        
        // Create premium loader text
        const premiumLoaderText = document.createElement('div');
        premiumLoaderText.classList.add('premium-loader-text');
        premiumLoaderText.textContent = 'Loading Experience';
        
        // Append to loader container
        loaderContainer.appendChild(premiumLoader);
        loaderContainer.appendChild(percentageCounter);
        loaderContainer.appendChild(svgContainer);
        loaderContainer.appendChild(premiumLoaderText);
        
        // Add animated gradient background to loading screen
        loadingScreen.classList.add('animated-gradient');
        
        // Animate percentage counter from 0 to 100%
        let percentage = 0;
        const percentageElement = percentageCounter.querySelector('span');
        if (!percentageElement) return; // Exit if percentage element doesn't exist
        
        const interval = setInterval(() => {
            percentage += 1;
            percentageElement.textContent = `${percentage}%`;
            
            // When reaching 100%, show SVG animation
            if (percentage === 100) {
                clearInterval(interval);
                percentageCounter.classList.add('fade-out');
                setTimeout(() => {
                    percentageCounter.style.display = 'none';
                    svgContainer.classList.add('fade-in');
                }, 500);
            }
        }, 20); // Update every 20ms for a total of ~2 seconds to reach 100%
        
        // Ensure interval is cleared if page loads before animation completes
        window.addEventListener('load', () => {
            if (percentage < 100) {
                clearInterval(interval);
                percentage = 100;
                percentageElement.textContent = '100%';
                percentageCounter.classList.add('fade-out');
                setTimeout(() => {
                    percentageCounter.style.display = 'none';
                    svgContainer.classList.add('fade-in');
                }, 500);
            }
        });
    } catch (error) {
        console.error('Error in enhanced loader:', error);
        // Fallback to basic loader if something goes wrong
        if (loaderContainer.innerHTML === '') {
            loaderContainer.innerHTML = `
                <div class="loader"></div>
                <div class="loader-text">Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
            `;
        }
    }
    
    // Extend loading time for a more dramatic effect
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Add fade-out animation
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Add page transition effect when content is shown
                document.body.classList.add('page-transition');
            }, 800);
        }, 2500); // Show loading screen for at least 2.5 seconds
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.classList.add('scroll-progress');
    document.body.appendChild(scrollProgress);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
}

// Parallax Effect
function initParallaxEffect() {
    // Add parallax effect to hero section and project images
    const parallaxElements = document.querySelectorAll('#hero .hero-content, .project-img');
    
    parallaxElements.forEach(element => {
        element.classList.add('parallax-element');
    });
    
    // Update parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // Calculate parallax offset (different for different elements)
            let speed = 0.1;
            if (element.closest('#hero')) {
                speed = 0.5;
            }
            
            const offset = scrollTop * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Text Reveal Animation
function initTextReveal() {
    // Add text reveal effect to headings
    const headings = document.querySelectorAll('h1, h2, .section-title');
    
    headings.forEach(heading => {
        // Skip if already processed
        if (heading.classList.contains('text-reveal-processed')) return;
        
        // Mark as processed
        heading.classList.add('text-reveal-processed');
        
        // Get text content
        const text = heading.textContent;
        heading.textContent = '';
        heading.classList.add('text-reveal');
        
        // Create spans for each character
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.05}s`;
            heading.appendChild(span);
        });
    });
    
    // Apply text reveal when element is in viewport
    const revealOnScroll = () => {
        const revealElements = document.querySelectorAll('.text-reveal');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();
}

// 3D Tilt Effect
function initTiltEffect() {
    // Add tilt effect to project cards
    const tiltElements = document.querySelectorAll('.project-card');
    
    tiltElements.forEach(element => {
        element.classList.add('tilt-effect');
        const inner = element.querySelector('.project-card-inner');
        if (inner) inner.classList.add('tilt-inner');
        
        // Track mouse movement for tilt effect
        element.addEventListener('mousemove', e => {
            if (!inner) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
            
            // Apply tilt effect (limited to 10 degrees)
            inner.style.transform = `rotateY(${xPercent * 10}deg) rotateX(${yPercent * -10}deg)`;
        });
        
        // Reset tilt on mouse leave
        element.addEventListener('mouseleave', () => {
            if (!inner) return;
            inner.style.transform = 'rotateY(0) rotateX(0)';
        });
    });
}

// Premium Form Effects
function initPremiumFormEffects() {
    // Enhance form inputs with premium effects
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.classList.add('premium-input');
        
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Move label if input has value
            if (input.value) {
                label.classList.add('active');
            }
            
            // Add required attribute for validation
            input.setAttribute('required', '');
            
            // Add focus and blur events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });
}

// Initialize Enhanced Flip Cards
function initEnhancedFlipCards() {
    // Convert existing project cards to enhanced flip cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add enhanced flip card class
        card.classList.add('enhanced-flip-card');
        
        // Get inner card element
        const cardInner = card.querySelector('.project-card-inner');
        if (cardInner) {
            cardInner.classList.add('enhanced-flip-card-inner');
            
            // Get front and back elements
            const cardFront = card.querySelector('.project-card-front');
            const cardBack = card.querySelector('.project-card-back');
            
            if (cardFront) cardFront.classList.add('enhanced-flip-card-front');
            if (cardBack) cardBack.classList.add('enhanced-flip-card-back');
            
            // Add decorative elements
            const topRightDecoration = document.createElement('div');
            topRightDecoration.classList.add('card-decoration', 'top-right');
            cardInner.appendChild(topRightDecoration);
            
            const bottomLeftDecoration = document.createElement('div');
            bottomLeftDecoration.classList.add('card-decoration', 'bottom-left');
            cardInner.appendChild(bottomLeftDecoration);
            
            // Enhance image container
            const imgContainer = card.querySelector('.project-img');
            if (imgContainer) {
                imgContainer.classList.add('premium-img-container');
                
                // Add image overlay
                const imgOverlay = document.createElement('div');
                imgOverlay.classList.add('premium-img-overlay');
                imgContainer.appendChild(imgOverlay);
            }
        }
    });
    
    // Add 3D perspective effect on mouse movement
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.left + cardRect.width / 2;
            const cardY = cardRect.top + cardRect.height / 2;
            const angleY = -(e.clientX - cardX) / 20;
            const angleX = (e.clientY - cardY) / 20;
            
            const cardInner = card.querySelector('.enhanced-flip-card-inner');
            if (cardInner && !card.classList.contains('flipped')) {
                cardInner.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const cardInner = card.querySelector('.enhanced-flip-card-inner');
            if (cardInner && !card.classList.contains('flipped')) {
                cardInner.style.transform = '';
            }
        });
    });
}

// Create Premium SVG Decorations
function createPremiumSVGDecorations() {
    // SVG patterns for tech/development themes
    const svgPatterns = [
        // Code brackets pattern
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M30,20 L10,50 L30,80" stroke="currentColor" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M70,20 L90,50 L70,80" stroke="currentColor" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        
        // Circuit pattern
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.5"/>
            <path d="M50,20 L50,40 M50,60 L50,80 M20,50 L40,50 M60,50 L80,50" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" stroke-width="2" stroke-dasharray="5,5"/>
        </svg>`,
        
        // Data flow pattern
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 C30,10 70,10 90,30 C70,50 30,50 10,30 Z" fill="currentColor" opacity="0.2"/>
            <path d="M10,70 C30,50 70,50 90,70 C70,90 30,90 10,70 Z" fill="currentColor" opacity="0.2"/>
            <circle cx="20" cy="30" r="5" fill="currentColor"/>
            <circle cx="80" cy="30" r="5" fill="currentColor"/>
            <circle cx="20" cy="70" r="5" fill="currentColor"/>
            <circle cx="80" cy="70" r="5" fill="currentColor"/>
        </svg>`,
        
        // Tech nodes pattern
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.5"/>
            <circle cx="20" cy="20" r="5" fill="currentColor"/>
            <circle cx="80" cy="20" r="5" fill="currentColor"/>
            <circle cx="20" cy="80" r="5" fill="currentColor"/>
            <circle cx="80" cy="80" r="5" fill="currentColor"/>
            <path d="M20,20 L40,40 M80,20 L60,40 M20,80 L40,60 M80,80 L60,60" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3"/>
        </svg>`
    ];
    
    // Add SVG decorations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const cardInner = card.querySelector('.project-card-inner') || card.querySelector('.enhanced-flip-card-inner');
        if (!cardInner) return;
        
        // Create top-left SVG decoration
        const topLeftSVG = document.createElement('div');
        topLeftSVG.classList.add('premium-svg-decoration', 'top-left');
        topLeftSVG.innerHTML = svgPatterns[index % svgPatterns.length];
        topLeftSVG.querySelector('svg').style.color = 'var(--accent-color)';
        cardInner.appendChild(topLeftSVG);
        
        // Create bottom-right SVG decoration
        const bottomRightSVG = document.createElement('div');
        bottomRightSVG.classList.add('premium-svg-decoration', 'bottom-right');
        bottomRightSVG.innerHTML = svgPatterns[(index + 2) % svgPatterns.length];
        bottomRightSVG.querySelector('svg').style.color = 'var(--accent-color)';
        cardInner.appendChild(bottomRightSVG);
    });
}

// Animated Icons
function initAnimatedIcons() {
    // Add animation to icons
    const icons = document.querySelectorAll('.fas, .fab, .far');
    
    icons.forEach(icon => {
        icon.classList.add('animated-icon');
    });
    
    // Add pulse animation to specific elements
    const pulseElements = document.querySelectorAll('.cta-buttons .primary-btn, .hero-stat-value');
    
    pulseElements.forEach(element => {
        element.classList.add('pulse');
    });
}

// Page Transitions
function initPageTransitions() {
    // Add smooth page transitions when navigating
    const navLinks = document.querySelectorAll('a[href^="index"], a[href^="statistics"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for internal links
            if (this.getAttribute('href').includes('#')) return;
            
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Fade out current page
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            // Navigate to new page after transition
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
    
    // Fade in on page load
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
}

// Apply gradient text effect to specific elements
function applyGradientTextEffect() {
    const gradientElements = document.querySelectorAll('.section-title, .logo');
    
    gradientElements.forEach(element => {
        element.classList.add('gradient-text');
    });
}

// Apply glow effect to buttons
function applyGlowEffect() {
    const glowElements = document.querySelectorAll('.primary-btn');
    
    glowElements.forEach(element => {
        element.classList.add('glow-effect');
    });
}

// Apply hover float effect to cards
function applyHoverFloatEffect() {
    const floatElements = document.querySelectorAll('.project-card, .contact-item');
    
    floatElements.forEach(element => {
        element.classList.add('hover-float');
    });
}

// Apply shimmer effect to specific elements
function applyShimmerEffect() {
    const shimmerElements = document.querySelectorAll('.hero-stat-item, .logo');
    
    shimmerElements.forEach(element => {
        element.classList.add('shimmer');
    });
}

// Initialize additional effects
window.addEventListener('load', () => {
    applyGradientTextEffect();
    applyGlowEffect();
    applyHoverFloatEffect();
    applyShimmerEffect();
});