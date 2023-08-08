const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const dotenv = require('dotenv');
const path = require('path');
const { Users } = require("../db");

dotenv.config();

async function emailForgotPassword(userId, newPassword, email) {

    // const user = await Users.findByPk(userId); // Buscar el usuario por su ID
    // if (!user) { // Verificar si el usuario no existe
    //   throw new Error('Usuario no encontrado');
    // }


  // Leer el archivo HTML de la plantilla
  const source = fs.readFileSync(path.join(__dirname, "mailForgotPassword.html"), "utf-8");
 
  // Compilar la plantilla con Handlebars
  const template = handlebars.compile(source);

  // Reemplazar las variables en la plantilla con los valores deseados
  const replacements = {
    newPassword: newPassword,
  };
  const html = template(replacements);

  // Configurar el transportador de correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL || 'gamestackpf@hotmail.com', // TODO: your gmail account
      pass: process.env.PASSWORD || 'GameStack2023*' // TODO: your gmail password
    }
  });

  // Definir el mensaje de correo electrónico
  const mailOptions = {
    from: 'gamestackpf@hotmail.com', // TODO: email sender
    to: email, // Email del usuario registrado (reemplazamos "correo" por "userId")
    subject: `${userId} you have requested to recover your password`,
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
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}

module.exports = emailForgotPassword;