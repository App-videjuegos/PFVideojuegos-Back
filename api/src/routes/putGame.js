const { Router } = require("express");
const  { updateGame } = require('../controllers/updateGame')
const express = require("express");

const router = Router();
router.use(express.json());

router.put("/:id", async (req, res) => {
    let { id } = req.params 
    try {
      let resultado = await updateGame(req.body);
      res.status(200).json({message: `El juego con el ID ${id} se ha actualizado correctamente en la base de datos`});
    } catch (error) {
      res.status(404).json({ error: error.message });
    } 
});

module.exports = router;