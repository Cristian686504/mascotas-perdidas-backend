const Mascota = require("../model/Mascota");

// Crear una nueva mascota
const crearMascota = async function (req, res) {
    try {

        // Extraemos los campos del body
        const {
            nombre,
            tipo_mascota,
            contacto,
            ubicacion_perdida,
            fecha_perdida,
            descripcion,
            coordenadas
        } = req.body;

        // Las fotos ahora vienen en req.files
        const fotos_perdida = req.files ? req.files.map(file => {
            // Normalizar la ruta: reemplazar backslashes por forward slashes
            const normalizedPath = file.path.replace(/\\/g, '/');
            // Remover 'public/' del inicio para obtener la ruta relativa
            return normalizedPath.replace('public/', '');
        }) : [];

        // Parsear coordenadas si viene como string
        const coordenadasParsed = typeof coordenadas === 'string'
            ? JSON.parse(coordenadas)
            : coordenadas;

        // Verificar que todos los campos requeridos estén presentes
        if (
            !nombre ||
            !tipo_mascota ||
            !contacto ||
            !ubicacion_perdida ||
            !fecha_perdida
        ) {
            return res.status(400).json({
                success: false,
                error: "Todos los campos requeridos deben estar presentes"
            });
        }

        // Validar formato del nombre
        const nombreRegex = /^[a-zA-Z0-9._-áéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({
                success: false,
                error: "El nombre solo puede contener letras, números, puntos, guiones, guiones bajos y espacios"
            });
        }

        // Crear una nueva instancia del modelo Mascota
        const nuevaMascota = new Mascota({
            nombre,
            fotos_perdida,
            tipo_mascota,
            contacto,
            ubicacion_perdida,
            fecha_perdida,
            descripcion,
            coordenadas: coordenadasParsed
        });

        // Guardar en la base de datos
        await nuevaMascota.save();

        // Responder con éxito
        res.status(201).json({
            success: true,
            message: "Mascota creada exitosamente",
            data: nuevaMascota
        });

    } catch (err) {
        console.error("Error en crearMascota:", err);

        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({
                success: false,
                error: `Ya existe una mascota con este ${field}`
            });
        }

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

// Obtener todas las mascotas
const getAllPets = async function (req, res) {
    try {
        const mascotas = await Mascota.find();
        console.log("Mascotas obtenidas:", mascotas);

        res.status(200).json({
            success: true,
            count: mascotas.length,
            data: mascotas
        });
    } catch (err) {
        console.error("Error al obtener mascotas:", err);
        res.status(500).json({
            success: false,
            error: "Error del servidor al obtener mascotas"
        });
    }
};

// Obtener mascota por ID
const getPetById = async function (req, res) {
    try {
        const { id } = req.params;

        const mascota = await Mascota.findById(id);

        if (!mascota) {
            return res.status(404).json({
                success: false,
                message: "Mascota no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            data: mascota
        });
    } catch (err) {
        console.error("Error al obtener mascota:", err);
        res.status(500).json({
            success: false,
            message: "Error del servidor"
        });
    }
};

module.exports = {
    getAllPets,
    crearMascota,
    getPetById
};
