const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

function correoCarrito(paymentId, amount, newItems, userId, correo) {
  // Leer el archivo HTML de la plantilla
  const source = fs.readFileSync(path.join(__dirname, "carrito.html"), "utf-8");

  // Compilar la plantilla con Handlebars
  const template = handlebars.compile(source);

  // Reemplazar las variables en la plantilla con los valores deseados
  const replacements = {
    nombre: 'GameShop'
  };
  const html = template(replacements);

  // Configurar el transportador de correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL || 'backendpf@gmail.com', // TODO: your gmail account
      pass: process.env.PASSWORD || 'xbwlxczwffqyefsp' // TODO: your gmail password
    }
  });

  // Definir el mensaje de correo electrónico
  const mailOptions = {
    from: 'backendpf@gmail.com', // TODO: email sender
    to: correo, // Email del usuario registrado (reemplazamos "correo" por "userId")
    subject: 'Gracias por tu Compra GameUser',
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

module.exports = correoCarrito;