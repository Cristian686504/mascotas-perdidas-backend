require('dotenv').config();
const mongoose = require('mongoose');
var connectDB = require("./db/connection");
const Mascota = require('./model/Mascota');

async function seedDatabase() {
    try {
        await connectDB();
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Mascota.deleteMany({});

        //Crear mascotas
        const mascotas = await Mascota.create([
            {
                fotos_perdida: ["img/seed/luna1.png", "img/seed/luna2.png"],
                ubicacion_perdida: "Plaza Constitución",
                nombre: "Luna",
                fecha_perdida: new Date("2025-10-10"),
                descripcion: "Gata blanca con manchas grises, muy cariñosa. Lleva collar rosa con cascabel.",
                contacto: "099 123 456",
                tipo_mascota: "gato",
                coordenadas: [-58.0756, -32.3214]
            },
            {
                fotos_perdida: [],
                ubicacion_perdida: "Parque del Puerto",
                nombre: "Rocky",
                fecha_perdida: new Date("2025-10-12"),
                descripcion: "Perro mediano de color marrón, raza mestiza. Muy juguetón y responde a su nombre.",
                contacto: "098 765 432",
                tipo_mascota: "perro",
                coordenadas: [-58.0812, -32.3189]
            },
            {
                fotos_perdida: [],
                ubicacion_perdida: "Anfiteatro del Río",
                nombre: "Michi",
                fecha_perdida: new Date("2025-10-14"),
                descripcion: "Gato naranja con ojos verdes, es tímido con extraños. Tiene una pequeña cicatriz en la oreja derecha.",
                contacto: "094 567 890",
                tipo_mascota: "gato",
                coordenadas: [-58.0795, -32.3201]
            },
            {
                fotos_perdida: ["img/seed/max1.png"],
                ubicacion_perdida: "Costanera",
                nombre: "Max",
                fecha_perdida: new Date("2025-10-15"),
                descripcion: "Perro labrador negro, grande y muy amigable. Llevaba pañuelo rojo al cuello.",
                contacto: "097 234 567",
                tipo_mascota: "perro",
                coordenadas: [-58.0823, -32.3176]
            },
            {
                fotos_perdida: ["img/seed/manchitas1.png", "img/seed/manchitas2.png"],
                ubicacion_perdida: "Plaza Artigas",
                nombre: "Manchitas",
                fecha_perdida: new Date("2025-10-16"),
                descripcion: "Jirafa joven escapada del circo, aproximadamente 3 metros de altura. Muy dócil y acostumbrada a personas.",
                contacto: "095 678 901",
                tipo_mascota: "otro",
                coordenadas: [-58.09498747192064, -32.31615451535566]
            }
        ]);

        console.log('Mascotas creadas:', mascotas.length);

    } catch (err) {
        console.error('Error al ejecutar el seed:', err);
    } finally {
        mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada');
    }
}

// Ejecutar el seed
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;