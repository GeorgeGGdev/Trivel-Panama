// Función para manejar el click en los botones "more information"
function handleMoreInfoClick(event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const destinationName = card.querySelector('h3').textContent;
    let destinationPage = '';

    switch (destinationName) {
        case 'Playa Estrella':
            destinationPage = 'playa-estrella.html';
            break;
        case 'Playa Veracruz':
            destinationPage = 'playa-veracruz.html';
            break;
        // Agregar más casos según sea necesario
    }

    if (destinationPage) {
        window.location.href = destinationPage;
    }
}

// Agregar listener a todos los botones "more information"
document.addEventListener('DOMContentLoaded', () => {
    const moreInfoButtons = document.querySelectorAll('.learn-more');
    moreInfoButtons.forEach(button => {
        button.addEventListener('click', handleMoreInfoClick);
    });
});
