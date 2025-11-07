const Encuentra = require("../model/Encuentra");
const Mascota = require("../model/Mascota");

const crearMascotaEncontrada = async function (req, res) {
    try {
        const {
            tipo_mascota,
            ubicacion_encontrada,
            fecha_encontrada,
            contacto,
            descripcion,
            coordenadas
        } = req.body;

        const foto_encontrada = req.file ? req.file.path.replace(/\\/g, '/').replace('public/', '') : '';

        const coordenadasParsed = typeof coordenadas === 'string'
            ? JSON.parse(coordenadas)
            : coordenadas;

        if (
            !tipo_mascota ||
            !ubicacion_encontrada ||
            !fecha_encontrada ||
            !contacto ||
            !foto_encontrada
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos requeridos deben estar presentes"
            });
        }

        const nuevaMascotaEncontrada = new Encuentra({
            foto_encontrada,
            tipo_mascota,
            ubicacion_encontrada,
            fecha_encontrada,
            contacto,
            descripcion,
            coordenadas: coordenadasParsed
        });

        await nuevaMascotaEncontrada.save();

        res.status(201).json({
            success: true,
            message: "Mascota encontrada reportada exitosamente",
            data: nuevaMascotaEncontrada
        });

    } catch (err) {
        console.error("Error en crearMascotaEncontrada:", err);

        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                error: "Error de validación",
                details: errors
            });
        }

        return res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

const crearMascotaEncontradaDesdePerdida = async function (req, res) {
    try {
        const { lostPetId } = req.params;
        const {
            ubicacion_encontrada,
            fecha_encontrada,
            contacto,
            descripcion,
            coordenadas
        } = req.body;

        const foto_encontrada = req.file ? req.file.path.replace(/\\/g, '/').replace('public/', '') : '';

        const mascotaPerdida = await Mascota.findById(lostPetId);
        if (!mascotaPerdida) {
            return res.status(404).json({
                success: false,
                error: "Mascota perdida no encontrada"
            });
        }

        const coordenadasParsed = typeof coordenadas === 'string'
            ? JSON.parse(coordenadas)
            : coordenadas;

        if (
            !ubicacion_encontrada ||
            !fecha_encontrada ||
            !contacto ||
            !foto_encontrada
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos requeridos deben estar presentes"
            });
        }

        const nuevaMascotaEncontrada = new Encuentra({
            foto_encontrada,
            tipo_mascota: mascotaPerdida.tipo_mascota,
            ubicacion_encontrada,
            fecha_encontrada,
            contacto,
            descripcion,
            coordenadas: coordenadasParsed,
            mascota_original: mascotaPerdida._id,
            nombre_original: mascotaPerdida.nombre,
            fotos_originales: mascotaPerdida.fotos_perdida
        });

        await nuevaMascotaEncontrada.save();

        if (!mascotaPerdida.posibles_coincidencias) {
            mascotaPerdida.posibles_coincidencias = [];
        }
        mascotaPerdida.posibles_coincidencias.push(nuevaMascotaEncontrada._id);
        await mascotaPerdida.save();

        res.status(201).json({
            success: true,
            message: "Reporte de mascota encontrada creado exitosamente",
            data: nuevaMascotaEncontrada
        });

    } catch (err) {
        console.error("Error en crearMascotaEncontradaDesdePerdida:", err);

        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                error: "Error de validación",
                details: errors
            });
        }

        return res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

const getAllFoundPets = async function (req, res) {
    try {
        const mascotasEncontradas = await Encuentra.find();
        console.log("Mascotas encontradas obtenidas:", mascotasEncontradas);

        res.status(200).json({
            success: true,
            count: mascotasEncontradas.length,
            data: mascotasEncontradas
        });
    } catch (err) {
        console.error("Error al obtener mascotas encontradas:", err);
        res.status(500).json({
            success: false,
            error: "Error del servidor al obtener mascotas encontradas"
        });
    }
};

const getFoundPetById = async function (req, res) {
    try {
        const { id } = req.params;

        const mascotaEncontrada = await Encuentra.findById(id);

        if (!mascotaEncontrada) {
            return res.status(404).json({
                success: false,
                message: "Mascota encontrada no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            data: mascotaEncontrada
        });
    } catch (err) {
        console.error("Error al obtener mascota encontrada:", err);
        res.status(500).json({
            success: false,
            message: "Error del servidor"
        });
    }
};

module.exports = {
    getAllFoundPets,
    crearMascotaEncontrada,
    getFoundPetById,
    crearMascotaEncontradaDesdePerdida
};