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
  user,
}) {
  try {
    console.log("estoy en el controller")
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
      user,
    });
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}

module.exports = { createReview };
