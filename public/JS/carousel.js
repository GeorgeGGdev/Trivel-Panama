document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayInterval;

    // Initialize carousel
    function initCarousel() {
        images[0].classList.add('active');
        updateDots();
        startAutoplay();
    }

    // Update dots navigation
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Slide to specific index
    function slideTo(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from current image
        images[currentIndex].classList.remove('active');

        // Update current index
        currentIndex = index;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;

        // Add active class to new image
        images[currentIndex].classList.add('active');

        // Animate slide
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        updateDots();

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Next slide
    function nextSlide() {
        slideTo(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        slideTo(currentIndex - 1);
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            slideTo(index);
            startAutoplay();
        });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        }
    });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initialize carousel
    initCarousel();
}); 