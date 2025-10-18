const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    fotos_perdida: {
        type: [String], 
        default: []
    },
    ubicacion_perdida: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_perdida: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    tipo_mascota: {
        type: String,
        required: true
    },
    coordenadas: {
        type: [Number], // [longitud, latitud]
        required: true
    }
});
const Mascota = mongoose.model('mascota', mascotaSchema);

module.exports = Mascota;