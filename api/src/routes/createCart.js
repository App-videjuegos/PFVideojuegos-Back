const { Router } = require("express");
const express = require("express");
const { addToCart } = require("../controllers/createCart");


const router = Router();
router.use(express.json());
  
router.post("/", async (req, res) => {
  const {userId, amount, items} = req.body;

    try {
        const response = await addToCart({userId, amount, items});
        res.status(200).json({ message: "Carrito almacenado exitosamente", response })

    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;





