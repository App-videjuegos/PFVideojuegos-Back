const { Favorites } = require("../db");

async function searchFav(){
    let allFavorites = await Favorites.findAll();
    if(allFavorites.length === 0) {
        throw new Error ("No se encontraron Favoritos en la base de datos")
    }
    return allFavorites;
}

module.exports = { searchFav }