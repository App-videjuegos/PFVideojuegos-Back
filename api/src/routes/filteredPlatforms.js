const { Router } = require("express");
const { filteredPlatforms } = require('../controllers/filteredPlatforms')
const express = require("express");


 const router = Router();
 router.use(express.json());


 router.get("/:platform", async (req, res) => {
  
     let { platform } = req.params;
  
    try {
      let resultado = await filteredPlatforms(platform);
      if(!resultado.length) {
      res.status(200).json({ message: "no se encontraron resultados"})
      
    } else {
        res.status(200).json(resultado);
    }   
    } catch (error) {
      res.status(404).json({ error: error.message });    
    }
  })

  module.exports = router;


