const { Users, Videogame, Carts, CartGame } = require("../db");

async function addToCart({
    userId,
    amount,
    items,
})

{
    // Verificar si el usuario existe en la base de datos
    const user = await Users.findByPk(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    };

    // Validar los datos de entrada
    if (!Number.isInteger(amount) || !Array.isArray(items) || items.length === 0) {
        throw new Error("Datos de entrada inválidos");
    }

    
    for (let i = 0; i < items.length; i++) {
    const { videogameId, quantity } = items[i];

    // Verificar si el videojuego existe en la base de datos
    const videogame = await Videogame.findByPk(videogameId);
    if (!videogame) {
        throw new Error(`Videojuego con ID ${videogameId} no encontrado`);
        }
    }

    amount = amount / 100
    
    try {
        let cart = await Carts.create({
            UserId: userId,
            amount,
            items
        });
        for (let i = 0; i < items.length; i++) {
            const videogame = items[i].videogameId;
            const quantity = items[i].quantity;
            
            await cart.addVideogame(videogame)
            
        }
        return cart
    } catch (error) {
        console.log(error);
        return new Error ('Ha ocurrido un error al agregar el carrito');        
    }
}

module.exports = { addToCart };