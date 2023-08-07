const { Favorites, Videogame, Users } = require("../db");

async function createFavorite({ videogameId, userId, isFav }) {
  // Verificar si el videojuego existe en la base de datos
  const videogame = await Videogame.findByPk(videogameId);
  if (!videogame) {
    throw new Error(`Videojuego con ID: ${videogameId}, no encontrado`);
  }
  // Verificar si el usuario existe en la base de datos
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new Error(`Usuario con ID: ${userId}, no encontrado`);
  }
  // Si existe videojuego y usuario, crea un nuevo item con el favorito enviado
  const existingFavorite = await Favorites.findOne({
    where: {
      userId: userId, // Reemplaza userId con el valor real del usuario que deseas buscar
      videogameId: videogameId // Reemplaza videogameId con el valor real del videojuego que deseas buscar
    }
  });

  if (existingFavorite) {
    const cambio = await Favorites.update({ isFav: isFav }, {
      where: {
        id: existingFavorite.id
      },
    })
    if (cambio > 0) {
      const updateFav = await Favorites.findByPk(existingFavorite.id);
      console.log("se encontro fav")
      return updateFav
    }

  } else {
    try {
      let favorite = await Favorites.create({
        videogameId,
        userId,
        isFav,
      })
      return favorite
    } catch (error) {
      console.log(error);
      return new Error('Ha ocurrido un error al agregar el favorito');
    }
  }
}

module.exports = { createFavorite };
