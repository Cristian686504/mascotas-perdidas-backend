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
    },
    posibles_coincidencias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'encuentra'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 24 * 60 * 60
    }
});

const Mascota = mongoose.model('mascota', mascotaSchema);

module.exports = Mascota;