const bcrypt = require('bcrypt');
const { Users } = require('../db'); // Importa el modelo de usuario



async function login (user, password) {

    try {
      // Busca al usuario en la base de datos por su nombre de usuario
      let userDb = await Users.findOne({ where: { user: user } });
    
      // Si no se encuentra al usuario, devuelve un error de autenticación
      if (!userDb) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

        // Obtener la contraseña almacenada en la base de datos
        const storedPassword = userDb.password;
    
      // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, storedPassword);
    
      // Si la contraseña no coincide, devuelve un error de autenticación
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }   

      // Devuelve el token al frontend
      return {
        id: userDb.id,
        user: userDb.user,
        fullname: userDb.fullname,
        userAdmin: userDb.userAdmin,
        email: userDb.email,
        date: userDb.date,
        image: userDb.image,
        phone: userDb.phone,
      };
    } catch (error) {
      console.error('Error de autenticación:', error);
      return ({ message: 'Error de autenticación' });
    }

}

module.exports = { login };