const { Router } = require("express");
const express = require("express");
const { createReview } = require("../controllers/reviews");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  let {
    id,
    token,
    userId,
    videogameId,
    rating,
    comment,
    playtime,
    title,
    reviewDate,
    recommendation,
    hashtags,
  } = req.body;

  try {
    let newReview = await createReview({
      id,
      token,
      userId,
      videogameId,
      rating,
      comment,
      playtime,
      title,
      reviewDate,
      recommendation,
      hashtags,
    });

    res
      .status(201)
      .json({ message: "Review creada exitosamente", data: newReview });
  } catch (Error) {
    console.log(Error.message);
  }
});

module.exports = router;
