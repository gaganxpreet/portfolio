// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoadingScreen();
    initTypewriter();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initCustomCursor();
    initContactForm();
    initCounterAnimation();
    initProjectCardFlip();
    initAboutSectionAnimations();
    initStatisticsSectionAnimations();
    initThemeToggle();
    
    // Add custom cursor elements if they don't exist
    if (!document.querySelector('.cursor-dot')) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);
    }
    
    if (!document.querySelector('.cursor-outline')) {
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        document.body.appendChild(cursorOutline);
    }
});

// Loading Screen - Basic version, premium version in premium-features.js
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // This function is overridden by the premium version in premium-features.js
    // The basic version is kept for compatibility
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Exit if element doesn't exist
    
    const themeIcon = themeToggle.querySelector('i');
    const rootElement = document.documentElement;
    
    // Check for saved theme preference or use default (dark theme)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on page load
    if (savedTheme === 'light') {
        rootElement.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        // Toggle theme class on root element
        rootElement.classList.toggle('light-theme');
        
        // Update icon
        if (rootElement.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        // Add a subtle animation to the page
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    });
}

// Typewriter Animation
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        'Creative Developer.',
        'UI/UX Designer.',
        'Problem Solver.',
        'Digital Craftsman.',
        'Premium Experience Creator.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        // Set typing speed based on whether we're typing or deleting
        if (isDeleting) {
            typingSpeed = 50; // Faster when deleting
        } else {
            // Vary the typing speed slightly for a more natural effect
            typingSpeed = 100 + Math.random() * 50;
        }
        
        // If we're at the end of the phrase and not deleting, start deleting
        if (charIndex === currentPhrase.length && !isDeleting) {
            // Pause at the end of the phrase
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        } else if (charIndex === 0 && isDeleting) {
            // If we've deleted the whole phrase, move to the next one
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing the next phrase
        }
        
        // Update the text
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Schedule the next update
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeEffect, 1000); // Delay start for a more dramatic effect
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (!menuToggle || !navMenu) return; // Exit if elements don't exist
    
    try {
        // Toggle menu on click
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navMenu.classList.toggle('show');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Add touch event handling for better mobile experience
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            // Detect left swipe (close menu)
            if (touchEndX < touchStartX - 50 && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Add accessibility attributes
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navMenu.setAttribute('aria-labelledby', 'menu-toggle');
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Navigation and Scroll Effects
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Initialize Mobile Menu is called in DOMContentLoaded event
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (!targetSection) {
                console.error(`Target section not found: ${targetId}`);
                return;
            }
            
            try {
                // Smooth scroll to target with error handling
                window.scrollTo({
                    top: targetSection.offsetTop - (navbar ? navbar.offsetHeight : 0),
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error during smooth scroll:', error);
                // Fallback to regular jump if smooth scroll fails
                window.location.hash = targetId;
            }
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        // Add scrolled class to navbar when scrolled down
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Initialize active link on page load
    updateActiveNavLink();
}

// Particles Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('particles.js not loaded');
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const fadeElements = document.querySelectorAll('.project-card, .section-title, .section-subtitle, .about-content > *, .contact-item, .form-group');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        
        // Add stagger delay to certain groups of elements
        if (element.classList.contains('project-card') || 
            element.classList.contains('contact-item') || 
            element.classList.contains('form-group')) {
            element.classList.add('stagger-delay');
        }
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Handle scroll animation
    function handleScrollAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('appear');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger once on load to animate elements already in viewport
    handleScrollAnimation();
}

// Custom Magnetic Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if we're on a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        // Hide custom cursor on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    // Update cursor position
    function updateCursorPosition(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Use requestAnimationFrame for smooth animation
        window.requestAnimationFrame(() => {
            // Move the dot directly to the cursor position
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            
            // Move the outline with a slight delay for a trailing effect
            cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
        });
    }
    
    // Magnetic effect for interactive elements
    function magneticEffect() {
        const magneticElements = document.querySelectorAll('a, button, .project-card, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', e => {
                const rect = element.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                // Calculate distance from cursor to element center
                const distanceX = e.clientX - elementCenterX;
                const distanceY = e.clientY - elementCenterY;
                
                // Apply magnetic effect to cursor outline
                cursorOutline.style.transform = `translate(${e.clientX - distanceX * 0.2}px, ${e.clientY - distanceY * 0.2}px)`;
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
            });
        });
    }
    
    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Apply magnetic effect
    magneticEffect();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Check server status when form is loaded
        checkServerStatus();
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (name && email && subject && message) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Send data to backend API
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    if (data.success) {
                        // Show success message
                        showFormMessage('success', data.message);
                        // Reset form
                        contactForm.reset();
                    } else {
                        // Show error message
                        showFormMessage('error', data.message || 'Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    // Show error message
                    showFormMessage('error', 'Failed to send message. Please check your connection and try again.');
                });
            } else {
                showFormMessage('error', 'Please fill in all fields.');
            }
        });
    }
    
    // Function to show form messages
    function showFormMessage(type, message) {
        // Check if message element already exists
        let messageElement = document.querySelector('.form-message');
        
        // If not, create a new one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Set message content and style
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('hide');
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 500);
        }, 5000);
    }
    
    // Function to check server status
    function checkServerStatus() {
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                console.log('Server status:', data);
                if (!data.emailConfigured) {
                    showFormMessage('error', 'Email service is not configured. Messages will be saved but not sent as emails.');
                }
            })
            .catch(error => {
                console.error('Server status check failed:', error);
                showFormMessage('error', 'Cannot connect to server. Contact form may not work properly.');
            });
    }
}

// Counter Animation Function
function initCounterAnimation() {
    // Format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Animate counter function with improved animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            // Explicitly set initial value to 0 with animation
            counter.innerText = '0';
            counter.style.opacity = '0';
            
            // Fade in the counter
            setTimeout(() => {
                counter.style.transition = 'opacity 0.5s ease';
                counter.style.opacity = '1';
            }, 100);
            
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Animation duration in milliseconds
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const easeOutQuad = t => t * (2 - t); // Easing function for smooth animation
            
            let frame = 0;
            
            // Add a small delay before starting the animation to make it more noticeable
            setTimeout(() => {
                const counter_animation = setInterval(() => {
                    frame++;
                    
                    // Calculate current count with easing
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(progress * target);
                    
                    // Update counter text
                    counter.innerText = formatNumber(currentCount);
                    
                    // If animation is complete
                    if (frame === totalFrames) {
                        clearInterval(counter_animation);
                        counter.innerText = formatNumber(target); // Ensure final value is exact
                    }
                }, frameDuration);
            }, 500); // Increased delay before starting each counter for better effect
        });
    }
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Start counter animation when scrolled into view
    let animationTriggered = false;
    
    function checkCounters() {
        const statsSection = document.getElementById('statistics');
        const heroStats = document.querySelector('.hero-stats');
        
        // Animate hero stats immediately
        if (heroStats && !animationTriggered) {
            setTimeout(animateCounters, 1500); // Delay to ensure everything is loaded
            animationTriggered = true;
        }
        
        // Animate statistics section when scrolled into view
        if (statsSection && isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            animateCounters();
        }
    }
    
    // Check on page load and scroll
    window.addEventListener('scroll', checkCounters);
    window.addEventListener('resize', checkCounters);
    checkCounters(); // Initial check
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax effect to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
    
    // Apply parallax to floating shapes in about section
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-1') ? 0.2 :
                    shape.classList.contains('shape-2') ? 0.1 : 0.15;
        const yPos = -scrollPosition * speed;
        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Project Card Flip Functionality
function initProjectCardFlip() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Change from click to hover (mouseenter/mouseleave)
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-card-inner').classList.add('flipped');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-card-inner').classList.remove('flipped');
        });
        
        // Add 3D perspective effect on mouse movement
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.left + cardRect.width / 2;
            const cardY = cardRect.top + cardRect.height / 2;
            const angleY = -(e.clientX - cardX) / 20;
            const angleX = (e.clientY - cardY) / 20;
            
            const cardInner = card.querySelector('.project-card-inner');
            if (cardInner) {
                // Apply rotation based on mouse position
                if (cardInner.classList.contains('flipped')) {
                    // When flipped, maintain the 180deg rotation and add the tilt effect
                    cardInner.style.transform = `rotateY(180deg) rotateX(${angleX}deg) rotateZ(${angleY/2}deg)`;
                } else {
                    // When not flipped, just apply the tilt effect
                    cardInner.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
                }
            }
        });
        
        // Reset transform when mouse leaves
        card.addEventListener('mouseleave', () => {
            const cardInner = card.querySelector('.project-card-inner');
            if (cardInner) {
                cardInner.style.transform = '';
            }
        });
    });
}

// About Section Premium Animations
function initAboutSectionAnimations() {
    // Text reveal animation
    const aboutTexts = document.querySelectorAll('#about .text-reveal');
    aboutTexts.forEach(text => {
        text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
        const letters = text.querySelectorAll('span');
        letters.forEach((letter, i) => {
            letter.style.animationDelay = `${i * 0.05}s`;
        });
    });

    // 3D Tilt effect
    const aboutParagraphs = document.querySelectorAll('#about .tilt-effect');
    aboutParagraphs.forEach(paragraph => {
        paragraph.addEventListener('mousemove', (e) => {
            const rect = paragraph.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            paragraph.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        paragraph.addEventListener('mouseleave', () => {
            paragraph.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Scroll progress indicator
    const about = document.getElementById('about');
    const progressBar = document.querySelector('#about .scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        if (isElementInViewport(about)) {
            const aboutRect = about.getBoundingClientRect();
            const scrollPercentage = Math.min(1, Math.max(0, (window.innerHeight - aboutRect.top) / (window.innerHeight + aboutRect.height)));
            progressBar.style.width = `${scrollPercentage * 100}%`;
        }
    });

    // Ripple effect on skill tags
    const skillTags = document.querySelectorAll('#about .ripple-effect');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            const rect = tag.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            tag.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Parallax effect on decorations and shapes
    const parallaxElements = document.querySelectorAll('#about .parallax');
    parallaxElements.forEach(element => {
        const depth = parseFloat(element.getAttribute('data-depth')) || 0.1;
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) * depth;
            const y = (window.innerHeight / 2 - e.clientY) * depth;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Statistics Section Premium Animations
function initStatisticsSectionAnimations() {
    // Text reveal animation
    const statTexts = document.querySelectorAll('#statistics .text-reveal');
    statTexts.forEach(text => {
        text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
        const letters = text.querySelectorAll('span');
        letters.forEach((letter, i) => {
            letter.style.animationDelay = `${i * 0.05}s`;
        });
    });

    // 3D Tilt effect
    const statCards = document.querySelectorAll('#statistics .tilt-effect');
    statCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Scroll progress indicator
    const statistics = document.getElementById('statistics');
    const progressBar = document.querySelector('#statistics .scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        if (isElementInViewport(statistics)) {
            const statisticsRect = statistics.getBoundingClientRect();
            const scrollPercentage = Math.min(1, Math.max(0, (window.innerHeight - statisticsRect.top) / (window.innerHeight + statisticsRect.height)));
            progressBar.style.width = `${scrollPercentage * 100}%`;
        }
    });

    // Ripple effect on CTA links
    const ctaLinks = document.querySelectorAll('#statistics .ripple-effect');
    ctaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Hover glow effect on counter values
    const counterValues = document.querySelectorAll('#statistics .counter.glow-pulse');
    counterValues.forEach(counter => {
        counter.addEventListener('mouseenter', () => {
            counter.style.animationPlayState = 'running';
        });
        counter.addEventListener('mouseleave', () => {
            counter.style.animationPlayState = 'paused';
        });
    });

    // Parallax effect on SVG decorations
    const svgDecorations = document.querySelectorAll('#statistics .svg-decoration.parallax');
    svgDecorations.forEach(svg => {
        const depth = parseFloat(svg.getAttribute('data-depth')) || 0.1;
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) * depth;
            const y = (window.innerHeight / 2 - e.clientY) * depth;
            svg.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}