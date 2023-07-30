const { Sales } = require("../db");
const { Videogame } = require("../db");

const addToSales = async (id, amount, items, userId) => {
  amount = amount / 100;

  try {
    for (let i = 0; i < items.length; i++) {
      const videogame = items[i].videogameId;
      const quantity = parseInt(items[i].quantity);
      try {
        const videogameFind = await Videogame.findByPk(videogame);
        if (videogameFind) {
          if (quantity > videogameFind.stock) {
            //console.log("es mayor al stock");
            throw new Error('The quantity exceeded the stock.');
          }
        } else {
          throw new Error('Videogame not found.');
        }
      } catch (error) {
        //console.log(`Error al buscar el videojuego con ID ${videogame}: ${error.message}`);
        throw error;
      }
    }

    let sale;
    try {
      sale = await Sales.create({
        id,
        amount,
        items,
        userId
      });
    } catch (error) {
      // Manejo de errores al crear la venta
      console.log(`Error al crear la venta: ${error.message}`);
      throw error;
    }

    for (let i = 0; i < items.length; i++) {
      //console.log("entra al for dos");
      const videogame = items[i].videogameId;
      const quantity = parseInt(items[i].quantity);
      const videogameFind = await Videogame.findByPk(videogame);
      //console.log("Despues de buscar el videojuego");
      videogameFind.stock = videogameFind.stock - quantity;
      //console.log("este es el stock que se actualiza ---> " + videogameFind.stock);

      try {
        await videogameFind.save();
      } catch (error) {
        console.log(`Error al guardar el videojuego: ${error.message}`);
        throw error;
      }

      try {
        await sale.addVideogame(videogame, { through: { quantity } });
      } catch (error) {
        console.log(`Error al agregar el videojuego a la tabla aux: ${error.message}`);
        throw error;
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { addToSales };
