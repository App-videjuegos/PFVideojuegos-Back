const bcrypt = require('bcrypt');
const { Users } = require('../db'); // Importa el modelo de usuario
const generateToken = require('./generatorJwt')



async function login (user, password) {

    
      // Busca al usuario en la base de datos por su nombre de usuario
      let userDb = await Users.findOne({ where: { user: user } });
    
      // Si no se encuentra al usuario, devuelve un error de autenticación
      if (!userDb) {
        throw new Error("Credenciales inválidas");
      }

        // Obtener la contraseña almacenada en la base de datos
        const storedPassword = userDb.password;
    
      // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, storedPassword);
    
      // Si la contraseña no coincide, devuelve un error de autenticación
      if (!isPasswordValid) {
        throw new Error ("Credenciales inválidas");
      }   

      // Devuelve el token al frontend
      const token = generateToken(user,password)
      
  
      return {
        token:token,
        id: userDb.id,
        user: userDb.user,
        fullname: userDb.fullname,
        userAdmin: userDb.userAdmin,
        email: userDb.email,
        date: userDb.date,
        image: userDb.image,
      };
}
    
  

module.exports = { login };