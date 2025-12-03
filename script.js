// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate progress bars when in view
const progressBars = document.querySelectorAll('.progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// Duplicate scrolling banner content for seamless loop
const bannerContent = document.querySelector('.banner-content');
if (bannerContent) {
    const bannerHTML = bannerContent.innerHTML;
    bannerContent.innerHTML = bannerHTML + bannerHTML;
}

// Gallery image hover effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add fade-in animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to major sections
document.querySelectorAll('.background-section, .data-section, .gallery-section, .about-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Stats counter animation
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target < 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target < 100 ? '+' : '');
        }
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                animateCounter(stat, targetValue);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Card hover effect for insights
const insightCards = document.querySelectorAll('.insight-card');

insightCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#ffffff';
    });
});

// Mobile menu toggle (untuk responsiveness)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar .container');
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.style.cssText = `
            display: block;
            background: var(--secondary-green);
            color: white;
            border: none;
            padding: 10px 15px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 5px;
        `;
        
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
        
        navbar.insertBefore(toggleButton, navMenu);
        
        navMenu.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: none;
            padding: 20px;
        `;
    }
};

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);

// Smooth reveal for gallery items
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
});

// Add loading animation for Power BI embed
const powerBIContainer = document.querySelector('.powerbi-wrapper');
if (powerBIContainer) {
    const iframe = powerBIContainer.querySelector('iframe');
    if (iframe) {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: var(--secondary-green);
        `;
        loader.textContent = 'Loading Dashboard...';
        powerBIContainer.appendChild(loader);
        
        iframe.addEventListener('load', () => {
            loader.style.display = 'none';
        });
    }
}

// Console welcome message
console.log('%c🌿 Rubber Research Project', 'color: #2d5339; font-size: 20px; font-weight: bold;');
console.log('%cWebsite untuk Evaluasi Produktivitas Penyadapan Karet', 'color: #6b7c78; font-size: 14px;');

// Log page load time
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});