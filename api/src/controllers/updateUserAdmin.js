const { Users } = require("../db");

async function updateUserAdmin (id) {

    let user = await Users.findByPk(id);
    

    // Realiza el cambio de estado de User Admin
    user.userAdmin = !user.userAdmin;
    await user.save(); 
};

module.exports = { updateUserAdmin };
