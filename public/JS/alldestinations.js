// Filtros de destinos
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        destinationCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
            }
        });
    });
});

// Animación de scroll para las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    destinationCards.forEach(card => {
        observer.observe(card);
    });
});

// Animación de botón de explorar
document.querySelector('.explore-btn').addEventListener('click', () => {
    const destinationsSection = document.querySelector('.destinations');
    destinationsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Añadir efecto de animación al hacer scroll
    destinationCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-up');
        }, index * 150);
    });
});

// Hover efecto en las tarjetas
destinationCards.forEach(card => {
    const overlay = card.querySelector('.card-overlay');
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(26, 115, 232, 0.3)';
        overlay.style.opacity = '0.8';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        overlay.style.opacity = '0';
    });
});

// Animación de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    // Añadir animación de carga al header
    const header = document.querySelector('.header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 200);

    // Añadir animación al botón de explorar
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.style.opacity = '0';
    exploreBtn.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        exploreBtn.style.opacity = '1';
        exploreBtn.style.transform = 'translateY(0)';
    }, 400);
});

// Animación de botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});
