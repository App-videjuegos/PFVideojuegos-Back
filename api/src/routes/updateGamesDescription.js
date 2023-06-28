const { Router } = require("express");
const {updateGamesDescription} = require('../controllers/updateGamesDescription');
const express = require("express");



// Ruta para actualizar las descripciones de los juegos masivamente
const router = Router();
router.use(express.json());

router.put("/update-descriptions", async (req, res) => {
    try {
      let resultados = await updateGamesDescription(gamesData);
      res.status(200).json({ message: 'Las descripciones de los juegos se han actualizado correctamente'});
    } catch (error) {
      console.error("Error al actualizar las descripciones de los juegos:", error);
      res.status(500).json({
        error: "Ha ocurrido un error al actualizar las descripciones de los juegos"
      });
}});

module.exports = router;
