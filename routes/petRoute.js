const express = require("express");
const router = express.Router();
const petController = require("../controller/petController");
const upload = require("../middleware/uploads");

// Usa upload.array() para múltiples archivos
router.post("", upload.array('fotos_perdida', 5), petController.crearMascota);

router.get("", petController.getAllPets);

router.get("/:id", petController.getPetById);

module.exports = router;