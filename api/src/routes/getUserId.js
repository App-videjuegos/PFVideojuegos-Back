const { Router } = require("express");
const { searchUserById } = require("../controllers/getUserId");
const express = require("express");

const router = Router();
router.use(express.json());

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await searchUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;