const { Router } = require("express");
const express = require("express");
const { login } = require ('../controllers/auth.js')

const router = Router();
router.use(express.json());

const secretKey = 'tu_clave_secreta'; // Reemplaza esto con tu clave secreta real


// Ruta para iniciar sesión
router.post('/', async (req, res) => {
    
  let { user, password } = req.body;
    try {

      let tokenLogin = await login( {user, password })

    // Enviar el token al frontend
    res.status(200).json({ tokenLogin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
