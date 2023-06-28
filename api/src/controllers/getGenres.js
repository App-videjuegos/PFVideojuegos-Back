const { Genre } = require("../db");

async function allGenres() {
  let genres = [
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Puzzle",  
  ];

  let buscar = await Genre.findAll();

  if (buscar.length === 0) {
    for (const genre of genres) {
      let create = await Genre.create({ name: genre });
    }

    let resultado = await Genre.findAll();
    return resultado;
  }
  return buscar;
}

module.exports = allGenres;