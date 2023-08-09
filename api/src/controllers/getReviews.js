require("dotenv").config();
const { Reviews } = require("../db");
const { Op } = require("sequelize");

async function searchReviews(userId, videogameId, user) {
  console.log("estoy en el otro controlador-----------")
  try {
    if (!userId && !videogameId && !user) {
      let allReviews = await Reviews.findAll();
      if (allReviews.length === 0) {
        throw new Error("No se encontraron reviews en la Base de Datos");
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
        throw new Error(`No se encontraron reviews con el userId: ${userId}`);
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
        throw new Error(`No se encontraron reviews con el userId: ${videogameId}`);
      }
      return reviewGame;
    } else if (user) {
      let reviwsUserName = await Reviews.findAll({ // si se envia nombre, buscar en la DB por nombre

        where: { [Op.or]: [
          { user: { [Op.iLike]: `%${user}%` } },
          { comment: { [Op.iLike]: `%${user}%` } }
        ] },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      if (reviwsUserName.length === 0) {
        throw new Error(`No se encontraron reviews con el nombre: ${user}`);
      }
      return reviwsUserName;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { searchReviews };
