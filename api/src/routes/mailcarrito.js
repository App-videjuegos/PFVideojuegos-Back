const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const dotenv = require('dotenv');
const path = require('path');
const { Users } = require("../db");
const { Videogame } = require("../db");

dotenv.config();

async function correoCarrito(paymentId, amount, newItems, userId) {

  console.log(newItems);
  const user = await Users.findByPk(userId); // Buscar el usuario por su ID
  if (!user) { // Verificar si el usuario no existe
    throw new Error('Usuario no encontrado');
  }


  // Leer el archivo HTML de la plantilla
  const source = fs.readFileSync(path.join(__dirname, "carrito.html"), "utf-8");
  let itemsTemplate = '';

  for (let i = 0; i < newItems.length; i++) {
    const item = newItems[i];
    const videogameId = item.videogameId;
    const videogameName = item.videogameName;
    const unitPrice = item.unitPrice;
    const quantity = item.quantity;


    const videogameFind = await Videogame.findByPk(videogameId);
    const image = videogameFind.image;

    console.log(videogameId, videogameName, unitPrice, quantity)
    let itemTemplate = `
      <tr>
      <td align="left" valign="top" width="150">
        <img id="x_product-item-image" style="width: 150px; display: block;" src=${image} alt="Cart Image" width="150" name="m_8732847656769436582_x_product-item-image" border="0">
      </td>
      <td style="text-align: left; color: #ffffff; padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: lighter;" align="left" valign="top">
        <span id="x_product-name-text" style="text-transform: uppercase;">${videogameName}
          <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling"></span>
        </span> 
        <br>
        <span id="x_product-articleno-text">Unit price:
        <span id="x_product-totalprice-text"> $${unitPrice.toFixed(2)}</span> 
        </span>
        <br>
        <span id="x_product-quantity-text">Quantity: ${quantity}</span> 
        <br>
        <span id="x_product-articleno-text">Reference N°: 
          <span class="LI ng" data-ddnwab="PR_17_0" aria-invalid="spelling">${videogameId}</span>
        </span>
        <br>
        <br>
        <span id="x_product-name-text" style="text-transform: uppercase;">_________________________
          <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling"></span>
        </span> 
        <br>
        <br>
      </td>
    </tr>
          `;
    itemsTemplate += itemTemplate;
  }



  itemsTemplate = `
  <tr>
  <td style="padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: bold;" align="left">
    <table style="color: #5c5c5c; font-family: Arial; font-size: 16px; margin-top: 26px; table-layout: fixed;" border="0" width="100%" cellspacing="0" cellpadding="0" align="left">
      <tbody>
        ${itemsTemplate}
        <br>
         <td style="text-align: left; color: #ffffff; padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 20px; font-weight: lighter;" align="left" valign="top">
        <span id="x_product-name-text" style="text-transform: uppercase;">Total paid:
          <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling"> $${(amount/100).toFixed(2)}</span>
        </span> 
        <br>
        <br>
        <br>
      </td>
      </td>
        <br>
        <br>
        <br>
      </tbody>
      `;




  // Compilar la plantilla con Handlebars
  const template = handlebars.compile(source);

  // Reemplazar las variables en la plantilla con los valores deseados
  const replacements = {
    nombre: user.dataValues.fullname,
    paymentId: paymentId,
    //itemTemplate: itemsTemplate,
    itemsTemplate: itemsTemplate
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
    to: user.dataValues.email, // Email del usuario registrado (reemplazamos "correo" por "userId")
    subject: `Thank you for your purchase, ${user.dataValues.user}`,
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
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}

module.exports = correoCarrito;