const { Router } = require("express");
const express = require("express");
const { searchFav } = require("../controllers/getAllFavorites");

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
try {
    let resultado = await searchFav();
    res.status(200).json(resultado);
} catch (error) {
    res.status(400).json({ message: error.message })
}
})

module.exports = router;