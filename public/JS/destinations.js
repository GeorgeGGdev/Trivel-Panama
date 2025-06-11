// Obtener el contenedor de tarjetas
const cardsContainer = document.getElementById('cards-container');

// Crear una nueva tarjeta
const card = document.createElement('div');
card.classList.add('card');

// Agregar contenido a la tarjeta
card.innerHTML = `
    <div class="card-image">
        <img src="https://via.placeholder.com/300x200" alt="Destino">
    </div>
    <div class="card-content">
        <h3>Destino Ejemplo</h3>
        <p>Una descripción breve del destino turístico.</p>
    </div>
`;

// Insertar la tarjeta en el contenedor
cardsContainer.appendChild(card);
