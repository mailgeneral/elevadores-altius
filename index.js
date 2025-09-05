// Set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navigation bar style change on scroll
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});


// Scroll reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// We create a general animation class in CSS and apply it here
const animationStyles = document.createElement('style');
animationStyles.innerHTML = `
    .prepare-animation {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-on-scroll {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);


// Select all elements we want to animate
document.querySelectorAll('section .container > div').forEach(el => {
    el.classList.add('prepare-animation');
    observer.observe(el);
});

// Image Lightbox Logic
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const imageTriggers = document.querySelectorAll('.lightbox-trigger');

if (lightboxModal && lightboxImage && lightboxClose && imageTriggers.length > 0) {
    
    const openLightbox = (e) => {
        // Use currentTarget to ensure we're referencing the element with the listener
        const triggerElement = e.currentTarget; 
        let imgSrc;

        // Check if the trigger itself is an image
        if (triggerElement.tagName === 'IMG') {
            imgSrc = triggerElement.src;
        } else {
            // Otherwise, find the image within the trigger element
            const img = triggerElement.querySelector('img');
            if (img) {
                imgSrc = img.src;
            }
        }
        
        if (imgSrc) {
            lightboxImage.setAttribute('src', imgSrc);
            lightboxModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    const closeLightbox = () => {
        lightboxModal.classList.add('hidden');
        lightboxImage.setAttribute('src', '');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    imageTriggers.forEach(trigger => {
        trigger.addEventListener('click', openLightbox);
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on clicking the background overlay
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}

// WhatsApp Button Visibility
const whatsappButton = document.getElementById('whatsapp-button');

if (whatsappButton) {
    window.addEventListener('scroll', () => {
        // Show button after scrolling down 200px
        if (window.scrollY > 200) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    });
}
