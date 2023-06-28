const { Router } = require('express');
const express = require ("express")
const { deleteGame } = require("../controllers/deleteGame")


const router = Router();
router.use(express.json());

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
     try {
      let resultado = await deleteGame(id);
      res.status(200).json({ message: `El juego con el ID ${id} se ha eliminado correctamente`, resultado });
    } catch (error) {
      res.status(404).json({error: `No existe juego con el id: ${id}`});
    } 
});

module.exports = router;
