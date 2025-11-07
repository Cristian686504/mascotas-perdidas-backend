require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require("./db/connection");
const Mascota = require('./model/Mascota');
const Encuentra = require('./model/Encuentra');

async function seedDatabase() {
    try {
        await connectDB();
        console.log('✅ Conectado a MongoDB');

        await Mascota.deleteMany({});
        await Encuentra.deleteMany({});

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

        console.log(`🐾 ${mascotas.length} mascotas perdidas creadas`);

        const encuentraDocs = await Encuentra.create([
            {
                foto_encontrada: "img/seed/luna_encontrada.jpg",
                tipo_mascota: "gato",
                ubicacion_encontrada: "En el árbol de la esquina",
                fecha_encontrada: new Date("2025-10-18"),
                contacto: "092 444 555",
                descripcion: "Gata blanca con manchas grises, sin collar rosa pero muy parecida a Luna.",
                coordenadas: [-58.0761, -32.3219],
                mascota: mascotas[0]._id
            },
            {
                foto_encontrada: "img/seed/max_encontrado.jpg",
                tipo_mascota: "perro",
                ubicacion_encontrada: "Lo tiene el vecino",
                fecha_encontrada: new Date("2025-10-20"),
                contacto: "091 222 333",
                descripcion: "Perro labrador negro con pañuelo rojo. Se ve saludable.",
                coordenadas: [-58.0830, -32.3171],
                mascota: mascotas[3]._id
            },
            {
                foto_encontrada: "img/seed/gato_encontrado.jpg",
                tipo_mascota: "gato",
                ubicacion_encontrada: "Calle Vizconde y Leandro Gómez",
                fecha_encontrada: new Date("2025-10-25"),
                contacto: "096 111 222",
                descripcion: "Gato gris sin collar, puede ser callejero.",
                coordenadas: [-58.0787, -32.3190]
            },
            {
                foto_encontrada: "img/seed/perro_encontrado.jpg",
                tipo_mascota: "perro",
                ubicacion_encontrada: "Cerca del ITS",
                fecha_encontrada: new Date("2025-10-27"),
                contacto: "097 999 888",
                descripcion: "Perro pequeño color blanco, parece perdido pero sin collar.",
                coordenadas: [-58.0829, -32.3199]
            }
        ]);

        console.log(`🐶 ${encuentraDocs.length} mascotas encontradas creadas`);

        await Mascota.findByIdAndUpdate(mascotas[0]._id, {
            $push: { posibles_coincidencias: encuentraDocs[0]._id }
        });
        await Mascota.findByIdAndUpdate(mascotas[3]._id, {
            $push: { posibles_coincidencias: encuentraDocs[1]._id }
        });


    } catch (err) {
        console.error('❌ Error al ejecutar el seed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Conexión a MongoDB cerrada');
    }
}

// Ejecutar el seed
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
