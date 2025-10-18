const mongoose = require('mongoose');

const encuentraSchema = new mongoose.Schema({
    fotos_encontrada: {
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
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascota'
    }
});
const Encuentra = mongoose.model('encuentra', encuentraSchema);

module.exports = Encuentra;