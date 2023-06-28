const { Sales } = require("../db");

const addToSales = async (id, amount, items, userId) => {
    amount = amount / 100

    try {
        let sale = await Sales.create({
            id,
            amount,
            items,
            userId
        });
        for (let i = 0; i < items.length; i++) {
            const videogame = items[i].videogameId;
            const quantity = items[i].quantity;
            
            await sale.addVideogame(videogame, { through: { quantity } })
            
        }
    } catch (error) {
        console.log(error);
        return new Error ('Ha ocurrido un error al agregar la venta');        
    }
};

module.exports = { addToSales };