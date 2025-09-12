// Galería tipo carrusel grid con flechas

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            src: '../assets/img/BocasToro.jpeg',
            title: 'Bocas del Toro',
            desc: 'A Caribbean paradise with crystal clear waters and vibrant marine life'
        },
        {
            src: '../assets/img/SanBlas.jpg',
            title: 'San Blas',
            desc: 'Pristine islands and rich indigenous culture in this tropical paradise'
        },
        {
            src: '../assets/img/venao.jpg',
            title: 'Playa Venao',
            desc: 'Perfect waves and impressive sunsets on the Pacific coast'
        },
        {
            src: '../assets/img/Starfish Beach.jpeg',
            title: 'Starfish Beach',
            desc: 'A natural paradise with starfish and turquoise waters'
        },
        {
            src: '../assets/img/Red Frog Beach.jpg',
            title: 'Red Frog Beach',
            desc: 'A unique beach with red frogs and lush vegetation'
        },
        {
            src: '../assets/img/Isla Grande.jpg',
            title: 'Isla Grande',
            desc: 'A Caribbean island with white sand beaches and crystal clear waters'
        },
        {
            src: '../assets/img/Taboga Island.jpeg',
            title: 'Isla Taboga',
            desc: 'The island of flowers, a peaceful refuge near the city'
        }
    ];

    const grid = document.getElementById('galleryGrid');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    let current = 0;
    let perPage = 4;

    function updatePerPage() {
        if (window.innerWidth <= 600) perPage = 1;
        else if (window.innerWidth <= 900) perPage = 2;
        else if (window.innerWidth <= 1200) perPage = 3;
        else perPage = 4;
    }

    function render() {
        grid.innerHTML = '';
        for (let i = 0; i < perPage; i++) {
            const idx = (current + i) % images.length;
            const img = images[idx];
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${img.src}" alt="${img.title}">
                <div class="overlay">
                    <h3>${img.title}</h3>
                    <p>${img.desc}</p>
                </div>
            `;
            grid.appendChild(item);
        }
    }

    function next() {
        current = (current + perPage) % images.length;
        render();
    }
    function prev() {
        current = (current - perPage + images.length) % images.length;
        render();
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    window.addEventListener('resize', () => {
        updatePerPage();
        render();
    });

    updatePerPage();
    render();
}); 