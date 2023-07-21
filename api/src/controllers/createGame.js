const { Videogame, Genre } = require("../db");

async function createGame({
  id,
  name,
  releaseDate,  
  platforms,
  description,
  image,
  price,
  genre,
  screenShots,
  requeriments_en,
}) {
  if (!name || !genre || !platforms)
    throw new Error("El nombre, el genero y la plataforma deben estar completos");


  let resultado = await Videogame.create({
    id,
    name,
    releaseDate, 
    platforms,
    description,
    image,
    price,
    genre,
    screenShots,
    requeriments_en,
  });
  
  for (const gen of genre) {
    let genres = await Genre.findOne({
      where: {
        name: gen,
      },
    });

    await resultado.addGenre(genres);
  }
}

module.exports = { createGame };
