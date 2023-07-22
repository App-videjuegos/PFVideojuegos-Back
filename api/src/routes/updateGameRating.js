const { Router } = require("express");
const express = require("express");
const { updateGameRating } = require("../controllers/updateGameRating");

const router = Router();
router.use(express.json());

router.put("/update-rating", async (req, res) => {
  const { gameId, score, actualRating } = req.body;
  try {
    let resultados = await updateGameRating(gameId, score, actualRating);
    res
      .status(200)
      .json({
        message:
          "Las valoraciones de los juegos se han actualizado correctamente",
      });
  } catch (error) {
    console.error("Error al actualizar las valoraciones de los juegos:", error);
    res.status(500).json({
      error:
        "Ha ocurrido un error al actualizar las valoraciones de los juegos",
    });
  }
});

module.exports = router;
