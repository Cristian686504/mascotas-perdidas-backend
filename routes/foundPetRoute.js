const express = require("express");
const router = express.Router();
const foundPetController = require("../controller/foundPetController");
const upload = require("../middleware/uploads");

router.post("", upload.single('foto_encontrada'), foundPetController.crearMascotaEncontrada);

router.post("/from-lost/:lostPetId", upload.single('foto_encontrada'), foundPetController.crearMascotaEncontradaDesdePerdida);

router.get("", foundPetController.getAllFoundPets);

router.get("/:id", foundPetController.getFoundPetById);

module.exports = router;