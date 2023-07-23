require("dotenv").config();
const { Reviews } = require("../db");

async function searchReviews(userId, videogameId) {
  if (!userId && !videogameId) {
    let allReviews = await Reviews.findAll();
    if (allReviews.length === 0) {
      return "message: No se encontraron reviews en la Base de Datos";
    }
    return allReviews;
  } else if (userId) {
    let reviewUser = await Reviews.findAll({
      where: { userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (reviewUser.length === 0) {
      return `No se encontraron reviews con el userId: ${userId}`;
    }
    return reviewUser;
  } else if (videogameId) {
    let reviewGame = await Reviews.findAll({
      where: { videogameId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (reviewGame.length === 0) {
      return `No se encontraron reviews con el userId: ${videogameId}`;
    }
    return reviewGame;
  }
}

module.exports = { searchReviews };
