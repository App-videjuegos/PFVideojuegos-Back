
const { Videogame } = require("../db"); // Fuente de datos de videojuegos


// Endpoint para obtener los videojuegos ordenados

  async function orderGames (orden){ // Obtener el parámetro "orden" de la consulta
    let sortedGames = await Videogame.findAll();
    if(orden === 'asc'){
        sortedGames.sort((a, b) => a.name.localeCompare(b.name)); // Ordena los videojuegos de forma ascendente si se especifica el parámetro "orden" como "asc"
  return sortedGames;
};
  if (orden === 'desc') {
    sortedGames.sort((a, b) => b.name.localeCompare(a.name)); // Ordena los videojuegos de forma descendente si se especifica el parámetro "orden" como "desc"
    return sortedGames;
  };
  if(orden === 'ratmin') {
    sortedGames.sort((a, b) => a.rating - b.rating);

  };
  if(orden === 'ratmax') {
    sortedGames.sort((a, b) => b.rating - a.rating);

  };
  if(orden === 'pricemin') {
    sortedGames.sort((a, b) => a.price - b.price);

  };
  if(orden === 'pricemax') {
    sortedGames.sort((a, b) => b.price - a.price);

  }

  return sortedGames
}


module.exports = { orderGames }

