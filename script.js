document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createFloatingFlowers();
    initializeGallery();
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(heart);
    }
}

function createFloatingFlowers() {
    const container = document.getElementById('flowersContainer');
    const flowers = ['🌹', '🌺', '🌸', '🌼', '🌻', '💐', '🏵️', '🌷', '🌹', '🌸', '🌺', '💮'];
    const flowerCount = 40;
    
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        flower.className = 'floating-flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDelay = Math.random() * 20 + 's';
        flower.style.animationDuration = (Math.random() * 15 + 10) + 's';
        

        if (Math.random() > 0.5) {
            flower.classList.add('glowing-flower');
        }
        
        container.appendChild(flower);
    }
}

function initializeGallery() {
    startAutoSlide();
}
let currentSlide = 0;
let autoSlideInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active-slide');
    indicators[currentSlide].classList.remove('active-indicator');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active-slide');
    indicators[currentSlide].classList.add('active-indicator');
    
    resetAutoSlide();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active-slide');
    indicators[currentSlide].classList.remove('active-indicator');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active-slide');
    indicators[currentSlide].classList.add('active-indicator');
    
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    const slides = document.querySelectorAll('.slide');
    
    if (slides[index]) {
        const photoImg = slides[index].querySelector('img');
        const overlayText = slides[index].querySelector('.slide-overlay h3');
        
        if (photoImg) {
            img.src = photoImg.src;
            caption.textContent = overlayText ? overlayText.textContent : '';
            lightbox.style.display = 'flex';
        }
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Pause auto-slide when hovering over slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Music functionality
let isPlaying = false;
let audio = null;

function toggleMusic() {
    const musicBtn = document.getElementById('musicToggle');
    
    if (!audio) {
        audio = new Audio('music/Pallaso Ft Ratigan Era - Nsaba.mp3');
        audio.loop = true;
        audio.volume = 0.3;
    }
    
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        isPlaying = false;
    } else {
        audio.play().catch(function(error) {
            console.log('Audio playback failed:', error);
            alert('Click the music button again to start the music.');
        });
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
}

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.reason-card, .photo-card, .message-bubble');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Create sparkle effect on mouse move
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.90) { // Create sparkles more frequently (was 0.95)
        createSparkle(e.pageX, e.pageY);
    }
    
    // Add flower sparkles occasionally
    if (Math.random() > 0.97) {
        createFlowerSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

function createFlowerSparkle(x, y) {
    const flowers = ['🌸', '🌺', '🌼', '🌷'];
    const sparkle = document.createElement('div');
    sparkle.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '25px';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'flowerSparkleFloat 1.5s ease-out forwards';
    sparkle.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5);
        }
    }
    
    @keyframes flowerSparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translateY(-40px) scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.3) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add typing effect for letter (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Click the heart multiple times for surprise
let heartClickCount = 0;
document.addEventListener('DOMContentLoaded', function() {
    const finalHeart = document.querySelector('.final-heart');
    if (finalHeart) {
        finalHeart.addEventListener('click', function() {
            heartClickCount++;
            if (heartClickCount === 5) {
                createHeartExplosion();
                heartClickCount = 0;
            }
        });
    }
});

function createHeartExplosion() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5;
        
        document.body.appendChild(heart);
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        const animate = setInterval(() => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            opacity -= 0.02;
            
            heart.style.transform = `translate(${posX}px, ${posY}px)`;
            heart.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animate);
                heart.remove();
            }
        }, 20);
    }
}

// Keyboard navigation for slider
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Proposal Response Handlers
function handleYes() {
    // Redirect to WhatsApp with "Yes I will be" message
    const phoneNumber = '256706564628';
    const message = 'Yes I will be! ❤️ I want to be the mother of your kids and build our future together! 💍';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Show a sweet message before redirecting
    const confirmation = confirm('This will open WhatsApp to send your answer to Saphan. Ready to make him the happiest man? 💕');
    
    if (confirmation) {
        window.location.href = whatsappUrl;
    }
}

function handleNo() {
    // Show the reason section
    showSection('no-response');
}

function sendReason() {
    const reasonText = document.getElementById('reasonText').value.trim();
    
    if (reasonText === '') {
        alert('Please share your thoughts with me, my love. I want to understand how you feel.');
        return;
    }
    
    // Redirect to WhatsApp with the reason
    const phoneNumber = '256706564628';
    const message = `I need to think about this, Saphan. Here's why:\n\n${reasonText}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.location.href = whatsappUrl;
}

// Console message for Joyline
console.log('%c❤️ Happy Valentine\'s Day My Love Joyline! ❤️', 'color: #ff1744; font-size: 24px; font-weight: bold;');
console.log('%cYou\'re the most amazing girlfriend ever! 💕', 'color: #ff4081; font-size: 16px;');
console.log('%cWith all my love, Saphan (Sap) 💕', 'color: #ff4081; font-size: 16px; font-style: italic;');
