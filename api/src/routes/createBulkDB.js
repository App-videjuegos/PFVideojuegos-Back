const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const express = require("express");

const router = Router();
router.use(express.json());

router.post("/createBulkDB", async (req, res) => {
    try {
      // const response = await axios.get(
      //     "https://api.rawg.io/api/games?page_size=10&key=6df927ecdff443ffa74507df2223a6ad&page_size=40"); // ? solicita los datos a la api externa
    
      let games1 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=1");
      let games2 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=2");
      let games3 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=3");
      let games4 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=4");
      let games5 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=5");
      let games6 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=6");
      let games7 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=7");
      let games8 = await axios.get("https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=8");
      const gamesTotal = games1.data.results.concat(games2.data.results, games3.data.results, games4.data.results, games5.data.results, games6.data.results, games7.data.results, games8.data.results );
      const gamesDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      const response = gamesTotal.concat(gamesDB);
      const allGames = response.map((game) => ({
        //? trae los datos unificando el formato
        id: game.id,
        name: game.name,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.name),
        releaseDate: game.released,
        image: game.background_image,      
        genre: game.genres.map((genre) => genre.name),
        tags: game.tags.map((tag) => tag.name),
        screenShots: game.short_screenshots.map((screen) => screen.image),
        requeriments_en: game.platforms
        .filter((requeriment) => requeriment.requirements_en !== null)
        .map((requeriment) => requeriment.requirements_en),
        requeriments_ru: game.platforms
        .filter((requeriment) => requeriment.requirements_en !== null)
        .map((requeriment) => requeriment.requirements_ru),
        price: (Math.random() * (100 - 45 )).toFixed(2),
      }));
  
      const savedGames = await Videogame.bulkCreate(allGames);
      return res.status(200).json(savedGames);
  } catch (error) {
      return res
      .status(500)
      .json({ message: "Error interno del servidor" + error.message });
  }
  });

  module.exports = router;