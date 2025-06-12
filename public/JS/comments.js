let currentIndex = 0;
const testimonials = document.querySelectorAll('.carousel-item');
const totalTestimonials = testimonials.length;

function moveCarousel(direction) {
    testimonials[currentIndex].classList.remove('active');
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalTestimonials - 1;
    } else if (currentIndex >= totalTestimonials) {
        currentIndex = 0;
    }
    
    testimonials[currentIndex].classList.add('active');
}

// Automatizar el carrusel para que cambie cada 5 segundos
setInterval(() => {
    moveCarousel(1);
}, 5000);