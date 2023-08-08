const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const dotenv = require('dotenv');
const path = require('path');

// const html = require('../templatemails/registro.jsx');

dotenv.config();

// Leer el archivo HTML de la plantilla
// const source = fs.readFileSync("registro.jsx", 'utf8');

const source = fs.readFileSync(path.join(__dirname, "registro.html"), "utf-8");


// Compilar la plantilla con Handlebars
const template = handlebars.compile(source);

// Reemplazar las variables en la plantilla con los valores deseados
router.post('/correo-registro', (req, res) => {
    const { correo, user, fullname } = req.body;
    // Reemplazar las variables en la plantilla con los valores deseados
    const replacements = {
      nombre: fullname
    };
const html = template(replacements);

// Configurar el transportador de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL || 'gamestackpf@hotmail.com', // TODO: yrouter.use('/correo-registro', );our gmail account
        pass: process.env.PASSWORD || 'GameStack2023*' // TODO: your gmail password
    }
});
// Definir el mensaje de correo electrónico
const mailOptions = {
    from: 'gamestackpf@hotmail.com', // TODO: email sender
    to: correo, // Email del usuario registrado
    subject: 'Welcome to GameStack.',
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Bienvenido GameUser</title>
      </head>
      <body>
      ${html}
      </body>
      </html>`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
    }
  });
});

module.exports = router;