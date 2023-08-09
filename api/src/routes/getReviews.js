const { Router } = require("express");
const { searchReviews } = require('../controllers/getReviews')
const express = require("express");


const router = Router();
router.use(express.json());


router.get("/", async (req, res) => {
  
  let { userId, videogameId, user } = req.query;

  try {
    let resultado = await searchReviews(userId, videogameId, user);
    res.status(200).json( resultado );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



module.exports = router;