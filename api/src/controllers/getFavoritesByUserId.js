const { Favorites } = require("../db");

async function serachIsFav(userId) {
if(userId){
// Buscar los favoritos asociados al userId dado
  const favorites = await Favorites.findAll({
    where: {userId: userId},
  });  
   
if (favorites.length === 0) {
    throw new Error(`No existen favoritos para el usuario con el id: ${userId}`);
} 
return favorites;
} else {
    let allFavorites = await Favorites.findAll();
    return allFavorites;
}
}

module.exports = { serachIsFav };