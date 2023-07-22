const { Reviews } = require("../db");

async function createReview({
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
}) {
  try {
    let resultado = await Reviews.create({
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
    console.log(resultado);
  } catch (error) {
    //console.log(error.parent.detail)
    throw new Error(error.parent.detail);
  }
}

module.exports = { createReview };
