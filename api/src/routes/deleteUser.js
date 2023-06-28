const { Router } = require('express');
const express = require('express');
const { deleteUser } = require('../controllers/deleteUser');

const router = Router();
router.use(express.json());

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await deleteUser(id);
    res.status(200).json({ message: `El usuario con el ID ${id} se ha eliminado correctamente` });
  } catch (error) {
    res.status(400).json({ message: `No existe usuario con el id: ${id}` });
  }
});

module.exports = router;
