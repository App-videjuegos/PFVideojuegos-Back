const { Reviews } = require("../db");

async function updateReview(review, id) {
  try {
        await Reviews.update(review, {
          where: {
            id: id
          },
          
        });
        let resultado = await Reviews.findByPk(id, {
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        });
        if(resultado){
            return resultado;
        }else{
            throw new Error(`There is no review with id ${id}`)
        }
  } catch (error) {
    throw new Error("Error updating the Review: " + error.message);
  }
}

module.exports = { updateReview };