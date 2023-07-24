const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const dotenv = require('dotenv');
const path = require('path');
const { Users } = require("../db");

dotenv.config();

async function correoCarrito(paymentId, amount, newItems, userId) {

    const user = await Users.findByPk(userId); // Buscar el usuario por su ID
    if (!user) { // Verificar si el usuario no existe
      throw new Error('Usuario no encontrado');
    }


  // Leer el archivo HTML de la plantilla
  const source = fs.readFileSync(path.join(__dirname, "carrito.html"), "utf-8");
  // const itemsTemplate = ` <tr>
  // <td style="padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: bold;" align="left">
  //   <table style="color: #5c5c5c; font-family: Arial; font-size: 16px; margin-top: 26px; table-layout: fixed;" border="0" width="100%" cellspacing="0" cellpadding="0" align="left">
  //     <tbody>
  //       <tr>
  //         <td align="left" valign="top" width="150">
  //           <img id="x_product-item-image" style="width: 150px; display: block;" src="https://ci4.googleusercontent.com/proxy/byuWbgrrcMPyN97dDnIENFeumPklJ36Ka9CZgWwSsTW3_uawZZoDWD7KwxiBJzh6JxJoEnT4wzJwrc0SzAHAmqwUklZHlI_DVQ9c7G790NR5LO30XWVfmzqVQBCBPVhoLfTRiOU3K6BnmWv2zYEdBzapbH4sI0USd2KEAUhQUz0weBwcr0DGI4moRggyHYJykEsAba-iWGMrlUZY-lxl0NxQelc=s0-d-e1-ft#https://assets.adidas.com/images/w_142,h_142,f_auto,q_auto:sensitive/eed497208ed64dc18a9baf540092a101_9366/HP7558_590_HP7558_01_standard.jpg.jpg" alt="Cart Image" width="150" name="m_8732847656769436582_x_product-item-image" border="0">
  //         </td>
  //         <td style="text-align: left; color: #5c5c5c; padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: lighter;" align="left" valign="top">
  //           <span id="x_product-name-text" style="text-transform: uppercase;">Tenis 
  //             <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling">Runfalcon</span> 2.0
  //           </span> 
  //           <br>
  //           <span id="x_product-totalprice-text">$280.458</span> 
  //           <span id="x_product-grossprice-text" style="text-decoration: line-through; color: #ff0000;">$329.950</span> 
  //           <br>
  //           <br>
  //           <span id="x_product-color-text">Color: Core Black / Core Black / Carbon</span> 
  //           <br>
  //           <span id="x_product-size-text">Talla: US H 7 / M 8</span> 
  //           <br>
  //           <span id="x_product-quantity-text">Cantidad: 1</span> 
  //           <br>
  //           <span id="x_product-articleno-text">Artículo N°: 
  //             <span class="LI ng" data-ddnwab="PR_17_0" aria-invalid="spelling">HP7558</span>
  //           </span>
  //         </td>
  //       </tr>
  //       <br>
  //     </tbody>
  //     <br>
  //     <br>
  //     <br>
  //     <tr>
  // <td style="padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: bold;" align="left">
  //   <table style="color: #5c5c5c; font-family: Arial; font-size: 16px; margin-top: 26px; table-layout: fixed;" border="0" width="100%" cellspacing="0" cellpadding="0" align="left">
  //     <tbody>
  //       <tr>
  //         <td align="left" valign="top" width="150">
  //           <img id="x_product-item-image" style="width: 150px; display: block;" src="https://ci4.googleusercontent.com/proxy/byuWbgrrcMPyN97dDnIENFeumPklJ36Ka9CZgWwSsTW3_uawZZoDWD7KwxiBJzh6JxJoEnT4wzJwrc0SzAHAmqwUklZHlI_DVQ9c7G790NR5LO30XWVfmzqVQBCBPVhoLfTRiOU3K6BnmWv2zYEdBzapbH4sI0USd2KEAUhQUz0weBwcr0DGI4moRggyHYJykEsAba-iWGMrlUZY-lxl0NxQelc=s0-d-e1-ft#https://assets.adidas.com/images/w_142,h_142,f_auto,q_auto:sensitive/eed497208ed64dc18a9baf540092a101_9366/HP7558_590_HP7558_01_standard.jpg.jpg" alt="Cart Image" width="150" name="m_8732847656769436582_x_product-item-image" border="0">
  //         </td>
  //         <td style="text-align: left; color: #5c5c5c; padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: lighter;" align="left" valign="top">
  //           <span id="x_product-name-text" style="text-transform: uppercase;">Tenis 
  //             <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling">Runfalcon</span> 2.0
  //           </span> 
  //           <br>
  //           <span id="x_product-totalprice-text">$280.458</span> 
  //           <span id="x_product-grossprice-text" style="text-decoration: line-through; color: #ff0000;">$329.950</span> 
  //           <br>
  //           <br>
  //           <span id="x_product-color-text">Color: Core Black / Core Black / Carbon</span> 
  //           <br>
  //           <span id="x_product-size-text">Talla: US H 7 / M 8</span> 
  //           <br>
  //           <span id="x_product-quantity-text">Cantidad: 1</span> 
  //           <br>
  //           <span id="x_product-articleno-text">Artículo N°: 
  //             <span class="LI ng" data-ddnwab="PR_17_0" aria-invalid="spelling">HP7558</span>
  //           </span>
  //         </td>
  //       </tr>
  //       <br>
  //     </tbody>
  //     <br>
  //     <br>
  //     <br>
  //     <tr>
  //     <td style="padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: bold;" align="left">
  //       <table style="color: #5c5c5c; font-family: Arial; font-size: 16px; margin-top: 26px; table-layout: fixed;" border="0" width="100%" cellspacing="0" cellpadding="0" align="left">
  //         <tbody>
  //           <tr>
  //             <td align="left" valign="top" width="150">
  //               <img id="x_product-item-image" style="width: 150px; display: block;" src="https://ci4.googleusercontent.com/proxy/byuWbgrrcMPyN97dDnIENFeumPklJ36Ka9CZgWwSsTW3_uawZZoDWD7KwxiBJzh6JxJoEnT4wzJwrc0SzAHAmqwUklZHlI_DVQ9c7G790NR5LO30XWVfmzqVQBCBPVhoLfTRiOU3K6BnmWv2zYEdBzapbH4sI0USd2KEAUhQUz0weBwcr0DGI4moRggyHYJykEsAba-iWGMrlUZY-lxl0NxQelc=s0-d-e1-ft#https://assets.adidas.com/images/w_142,h_142,f_auto,q_auto:sensitive/eed497208ed64dc18a9baf540092a101_9366/HP7558_590_HP7558_01_standard.jpg.jpg" alt="Cart Image" width="150" name="m_8732847656769436582_x_product-item-image" border="0">
  //             </td>
  //             <td style="text-align: left; color: #5c5c5c; padding-right: 20px; padding-left: 20px; font-family: Arial; font-size: 16px; font-weight: lighter;" align="left" valign="top">
  //               <span id="x_product-name-text" style="text-transform: uppercase;">Tenis 
  //                 <span class="LI ng" data-ddnwab="PR_16_0" aria-invalid="spelling">Runfalcon</span> 2.0
  //               </span> 
  //               <br>
  //               <span id="x_product-totalprice-text">$280.458</span> 
  //               <span id="x_product-grossprice-text" style="text-decoration: line-through; color: #ff0000;">$329.950</span> 
  //               <br>
  //               <br>
  //               <span id="x_product-color-text">Color: Core Black / Core Black / Carbon</span> 
  //               <br>
  //               <span id="x_product-size-text">Talla: US H 7 / M 8</span> 
  //               <br>
  //               <span id="x_product-quantity-text">Cantidad: 1</span> 
  //               <br>
  //               <span id="x_product-articleno-text">Artículo N°: 
  //                 <span class="LI ng" data-ddnwab="PR_17_0" aria-invalid="spelling">HP7558</span>
  //               </span>
  //             </td>
  //           </tr>
  //           <br>
  //         </tbody>
  //         <br>
  //         <br>
  //         <br>
  //     `;


  // Compilar la plantilla con Handlebars
  const template = handlebars.compile(source);

  // Reemplazar las variables en la plantilla con los valores deseados
  const replacements = {
    nombre: user.dataValues.fullname,
    paymentId: paymentId,
    //itemTemplate: itemsTemplate,
    payTotal: amount/100
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
    to: user.dataValues.email, // Email del usuario registrado (reemplazamos "correo" por "userId")
    subject: `Gracias por tu Compra ${user.dataValues.user}`,
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