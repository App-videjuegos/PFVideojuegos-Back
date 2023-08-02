const { Router } = require("express");
const express = require("express");
const { serachIsFav } = require("../controllers/getFavoritesByUserId");

const router = Router();
router.use(express.json());

router.get("/:userId", async (req, res) => {
  
    let { userId } = req.params;
  
    try {
      let resultado = await serachIsFav(userId);
      res.status(200).json( resultado );
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  
  
  module.exports = router;