const { Router } = require("express");
const express = require("express");
const {createGame} = require("../controllers/createGame");
const verifyToken = require("../controllers/verifyToken")

const router = Router();
router.use(express.json());

router.post("/", verifyToken, async (req, res) => {
 
  let { id, name, releaseDate, platforms, description, image, price, genre, screenShots, requeriments_en } = req.body;
  try {
    let resultado = await createGame({
      id,
      name,
      releaseDate,    
      platforms,
      description,
      image,
      price,
      genre,
      screenShots,
      requeriments_en
    });
    res.status(200).json({message: "Su juego se ha creado con éxito. Gracias por compartirlo!"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;