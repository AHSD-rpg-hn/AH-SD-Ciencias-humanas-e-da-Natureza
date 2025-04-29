document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    
    initMobileMenu();
    
    initScrollAnimations();
    
    initBackToTop();
    
    initPageTransition();
});

function initParticles() {
    if (document.getElementById('particles-js')) {
        Particles.init({
            selector: '#particles-js',
            connectParticles: true,
            maxParticles: 100,
            color: ['#00f7ff', '#ff00ff', '#8a2be2'],
            responsive: [{
                breakpoint: 768,
                options: {
                    maxParticles: 60
                }
            }, {
                breakpoint: 480,
                options: {
                    maxParticles: 30
                }
            }],
            minDistance: 120,
            sizeVariations: 3,
            speed: 0.5
        });
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.card, .topic');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initPageTransition() {
    document.body.classList.add('page-transition');
    
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = targetPage;
            }, 300);
        });
    });
    
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const diffX = centerX - x;
        const diffY = centerY - y;
        
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
        
        if (distance < maxDistance * 1.5) {
            const tiltX = diffY / 20;
            const tiltY = -diffX / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
    });
});