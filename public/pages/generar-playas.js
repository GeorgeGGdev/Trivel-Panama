const fs = require('fs');
const path = require('path');

// Datos de las playas que necesitan página
const playas = [
    {
        nombre: 'Red Frog Beach',
        slug: 'red-frog-beach',
        provincia: 'Bocas del Toro',
        descripcion: 'Red Frog Beach es una de las playas más famosas de Bocas del Toro, conocida por su arena blanca, aguas cristalinas y la presencia de las coloridas ranitas rojas que le dan su nombre. Es un lugar perfecto para relajarse, hacer snorkel y disfrutar de la naturaleza.',
        tiempoViaje: '1h vuelo + 35min lancha',
        tipoPlaya: 'Arena blanca, aguas turquesas',
        idealPara: 'Familias, parejas, amantes de la naturaleza',
        imagenPrincipal: 'https://bocasdeltoro.travel/wp-content/uploads/2020/06/Red-Frog-Beach-Isla-Bastimentos-Bocas-del-Toro-1.jpg',
        mapa: 'https://www.google.com/maps?q=Red+Frog+Beach+Bocas+del+Toro&output=embed',
        imagenes: [
            'https://bocasdeltoro.travel/wp-content/uploads/2020/06/Red-Frog-Beach-Isla-Bastimentos-Bocas-del-Toro-1.jpg',
            'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/red-frog-beach-bocas-del-toro.jpg',
            'https://www.bocasdeltoro.travel/wp-content/uploads/2020/06/Red-Frog-Beach-Isla-Bastimentos-Bocas-del-Toro-3.jpg'
        ],
        actividades: [
            {
                titulo: 'Snorkeling',
                descripcion: 'Explora los arrecifes de coral y la vida marina en las aguas cristalinas de Red Frog Beach.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/snorkeling-red-frog-beach.jpg'
            },
            {
                titulo: 'Senderismo',
                descripcion: 'Recorre los senderos de la selva tropical y descubre la rica biodiversidad de la isla.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/hiking-red-frog-beach.jpg'
            },
            {
                titulo: 'Observación de ranas rojas',
                descripcion: 'Conoce a las famosas ranitas rojas que habitan en la isla y que le dan nombre a esta playa.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/red-frog-beach-frogs.jpg'
            }
        ],
        instruccionesAuto: 'No es accesible en auto. Se debe llegar en lancha desde Isla Colón.',
        instruccionesBus: 'No hay servicio de autobús directo. Se debe llegar en lancha desde Isla Colón.',
        instruccionesBarco: 'Toma una lancha desde el muelle principal de Isla Colón (Bocas Town) hasta Bastimentos (10-15 min), y desde allí un taxi acuático a Red Frog Beach (5 min).'
    },
    {
        nombre: 'Starfish Beach',
        slug: 'starfish-beach',
        provincia: 'Bocas del Toro',
        descripcion: 'Starfish Beach es famosa por sus aguas poco profundas y cristalinas donde se pueden observar cientos de estrellas de mar en su hábitat natural. Es un lugar ideal para familias y para quienes buscan relajarse en un entorno paradisíaco.',
        tiempoViaje: '1h vuelo + 40min transporte local',
        tipoPlaya: 'Arena blanca, aguas poco profundas',
        idealPara: 'Familias, fotógrafos, amantes de la naturaleza',
        imagenPrincipal: 'https://www.bocasdeltoro.travel/wp-content/uploads/2020/06/Playa-Estrella-Starfish-Beach-Bocas-del-Toro-1.jpg',
        mapa: 'https://www.google.com/maps?q=Starfish+Beach+Bocas+del+Toro&output=embed',
        imagenes: [
            'https://www.bocasdeltoro.travel/wp-content/uploads/2020/06/Playa-Estrella-Starfish-Beach-Bocas-del-Toro-1.jpg',
            'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/starfish-beach-bocas-del-toro.jpg',
            'https://www.bocasdeltoro.travel/wp-content/uploads/2020/06/Playa-Estrella-Starfish-Beach-Bocas-del-Toro-3.jpg'
        ],
        actividades: [
            {
                titulo: 'Observación de estrellas de mar',
                descripcion: 'Observa las hermosas estrellas de mar en su hábitat natural en las aguas poco profundas.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/starfish-beach-starfish.jpg'
            },
            {
                titulo: 'Snorkeling',
                descripcion: 'Explora los arrecifes cercanos y descubre la vida marina de la zona.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/snorkeling-starfish-beach.jpg'
            },
            {
                titulo: 'Relajación en la playa',
                descripcion: 'Disfruta del sol y la arena en esta tranquila playa de aguas cristalinas.',
                imagen: 'https://www.bocasdeltoro.com/wp-content/uploads/2019/01/starfish-beach-relaxation.jpg'
            }
        ],
        instruccionesAuto: 'No es accesible en auto. Se debe llegar en lancha desde Isla Colón.',
        instruccionesBus: 'No hay servicio de autobús directo. Se debe llegar en lancha desde Isla Colón.',
        instruccionesBarco: 'Toma una lancha desde el muelle principal de Isla Colón (Bocas Town) hasta Starfish Beach (30-40 min).'
    },
    // Agregar más playas según sea necesario
];

// Función para generar el HTML de una playa
function generarPaginaPlaya(playa) {
    // Leer la plantilla
    let template = fs.readFileSync(path.join(__dirname, '_plantilla-playa.html'), 'utf8');
    
    // Reemplazar los placeholders con los datos de la playa
    let html = template
        .replace(/NOMBRE_PLAYA/g, playa.nombre)
        .replace('DESCRIPCION_HERO', `Descubre la belleza de ${playa.nombre} en ${playa.provincia}`)
        .replace('CONTENIDO_DESCRIPCION', playa.descripcion)
        .replace('UBICACION', playa.provincia)
        .replace('TIEMPO_VIAJE', playa.tiempoViaje)
        .replace('TIPO_PLAYA', playa.tipoPlaya)
        .replace('IDEAL_PARA', playa.idealPara)
        .replace('IMAGEN_PRINCIPAL', playa.imagenPrincipal)
        .replace('URL_MAPA', playa.mapa)
        .replace('IMAGEN_1', playa.imagenes[0])
        .replace('IMAGEN_2', playa.imagenes[1])
        .replace('IMAGEN_3', playa.imagenes[2])
        .replace('ACTIVIDAD_1_TITULO', playa.actividades[0].titulo)
        .replace('ACTIVIDAD_1_DESCRIPCION', playa.actividades[0].descripcion)
        .replace('ACTIVIDAD_1_IMG', playa.actividades[0].imagen)
        .replace('ACTIVIDAD_2_TITULO', playa.actividades[1].titulo)
        .replace('ACTIVIDAD_2_DESCRIPCION', playa.actividades[1].descripcion)
        .replace('ACTIVIDAD_2_IMG', playa.actividades[1].imagen)
        .replace('ACTIVIDAD_3_TITULO', playa.actividades[2].titulo)
        .replace('ACTIVIDAD_3_DESCRIPCION', playa.actividades[2].descripcion)
        .replace('ACTIVIDAD_3_IMG', playa.actividades[2].imagen)
        .replace('INSTRUCCIONES_AUTO', playa.instruccionesAuto)
        .replace('INSTRUCCIONES_BUS', playa.instruccionesBus)
        .replace('INSTRUCCIONES_BARCO', playa.instruccionesBarco);
    
    // Escribir el archivo HTML
    const nombreArchivo = `${playa.slug}.html`;
    fs.writeFileSync(path.join(__dirname, nombreArchivo), html);
    console.log(`Página generada: ${nombreArchivo}`);
}

// Generar páginas para todas las playas
playas.forEach(generarPaginaPlaya);

console.log('¡Proceso completado! Se han generado todas las páginas de playas.');
