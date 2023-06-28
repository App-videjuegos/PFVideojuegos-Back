const { Router } = require("express");
const { orderGames } = require('../controllers/sortedGames')
const express = require("express");


const router = Router();
router.use(express.json());


router.get("/:orden", async (req, res) => {
  
    let { orden } = req.params;
  
    try {
      let resultado = await orderGames(orden);
      res.status(200).json( resultado );
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });


module.exports = router;