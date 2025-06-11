let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    if (index >= testimonials.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = testimonials.length - 1;
    } else {
        currentIndex = index;
    }

    // Ocultar todos los testimonios
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });

    // Mostrar el testimonio actual
    testimonials[currentIndex].style.display = 'block';
}

// Iniciar el carrusel mostrando el primer testimonio
showTestimonial(currentIndex);

// Funciones para cambiar de testimonio
function changeTestimonial(direction) {
    showTestimonial(currentIndex + direction);
}