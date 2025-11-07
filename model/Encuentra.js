const mongoose = require('mongoose');

const encuentraSchema = new mongoose.Schema({
    foto_encontrada: {
        type: String,
        required: true
    },
    tipo_mascota: {
        type: String,
        required: true
    },
    ubicacion_encontrada: {
        type: String,
        required: true
    },
    fecha_encontrada: {
        type: Date,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    coordenadas: {
        type: [Number], // [longitud, latitud]
        required: true
    },
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascota'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 24 * 60 * 60
    }
});

const Encuentra = mongoose.model('encuentra', encuentraSchema);

module.exports = Encuentra;