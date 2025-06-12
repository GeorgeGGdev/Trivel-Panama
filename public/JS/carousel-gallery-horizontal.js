// Carrusel horizontal animado para galería

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            src: '../assets/img/BocasToro.jpeg',
            title: 'Bocas del Toro',
            desc: 'Un paraíso caribeño con aguas cristalinas y vida marina vibrante'
        },
        {
            src: '../assets/img/SanBlas.jpg',
            title: 'San Blas',
            desc: 'Islas prístinas y rica cultura indígena en este paraíso tropical'
        },
        {
            src: '../assets/img/venao.jpg',
            title: 'Playa Venao',
            desc: 'Olas perfectas y atardeceres impresionantes en la costa del Pacífico'
        },
        {
            src: '../assets/img/Starfish Beach.jpeg',
            title: 'Starfish Beach',
            desc: 'Un paraíso natural con estrellas de mar y aguas turquesas'
        },
        {
            src: '../assets/img/Red Frog Beach.jpg',
            title: 'Red Frog Beach',
            desc: 'Una playa única con ranas rojas y exuberante vegetación'
        },
        {
            src: '../assets/img/Isla Grande.jpg',
            title: 'Isla Grande',
            desc: 'Una isla caribeña con playas de arena blanca y aguas cristalinas'
        },
        {
            src: '../assets/img/Taboga Island.jpeg',
            title: 'Isla Taboga',
            desc: 'La isla de las flores, un refugio pacífico cerca de la ciudad'
        }
    ];

    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    let current = 0;
    let visible = 4;
    let itemWidth = 270 + 24; // ancho + gap

    function updateVisible() {
        if (window.innerWidth <= 600) {
            visible = 2;
            itemWidth = 140 + 24;
        } else if (window.innerWidth <= 900) {
            visible = 3;
            itemWidth = 200 + 24;
        } else {
            visible = 4;
            itemWidth = 270 + 24;
        }
    }

    function render() {
        track.innerHTML = '';
        images.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${img.src}" alt="${img.title}">
                <div class="overlay">
                    <h3>${img.title}</h3>
                    <p>${img.desc}</p>
                </div>
            `;
            track.appendChild(item);
        });
        moveTo(current);
    }

    function moveTo(idx) {
        // Evita overflow
        if (idx < 0) idx = 0;
        if (idx > images.length - visible) idx = images.length - visible;
        current = idx;
        const offset = -current * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        moveTo(current - 1);
    });
    nextBtn.addEventListener('click', () => {
        moveTo(current + 1);
    });
    window.addEventListener('resize', () => {
        updateVisible();
        render();
    });

    // Animación de entrada
    track.style.opacity = 0;
    setTimeout(() => {
        track.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)';
        track.style.opacity = 1;
    }, 200);

    updateVisible();
    render();
}); 