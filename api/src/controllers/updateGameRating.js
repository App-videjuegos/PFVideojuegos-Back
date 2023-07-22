const { Videogame } = require("../db.js"); // esto es para poder usar el modelo Videogame que se trae desde la base de datos

async function updateGameRating(gameId, score, actualRating) {
  // gameId: id del juego a actualizar, score: valoración del juego

  // Como hacer la logica para que solo puedan votar el ranking solamente 100 personas?
  let actuallRating = (actualRating * 100 + score) / 101;

  try {
    const rowsAffected = await Videogame.update(
      { rating: actuallRating.toFixed(2) },
      { where: { id:gameId } }
    );

    if (rowsAffected > 0) {
      console.log("Rating actualizado exitosamente.");
      return

    } else {
      console.log("El rating no se ha podido actualizar.");
    }
  } catch (error) {
    console.error("Error al actualizar el rating:", error);
  }
}

module.exports = {
  updateGameRating,
};
