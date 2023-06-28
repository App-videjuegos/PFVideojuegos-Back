const { Router } = require('express');
const express = require ("express");
const { updateUserAdmin } = require ("../controllers/updateUserAdmin");

const router = Router();
router.use(express.json());


router.delete("/:id", async (req, res) => {
    let { id } = req.params;
       try {
        let user = await updateUserAdmin(id);
        res.status(200).json({message: "Estado de userAdmin actualizado correctamente"});
      } catch (error) {
        res.status(400).json({ message: `Error al actualizar el estado de userAdmin con ID: ${id}` });
      } 
  });
  
  module.exports = router;

