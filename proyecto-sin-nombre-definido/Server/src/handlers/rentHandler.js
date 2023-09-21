const { type } = require("os");
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs'); // Asegúrate de requerir fs
const templatePath = path.join(__dirname, 'mailingTemplates', 'Rentas.html');

// const { rentSchemePost } = require("../helpers/validations/rentValidation.js");
const {
  createBook,
  deleteBooking,
  createRent,
  final,
  getRentById,
} = require("../controllers/rentController.js");
// const { final } = require("../controllers/rentController.js");
const finalHandler = async (req, res) => {
  const id = req.params;
  try {
    const response = await final(id);
    fs.readFile(templatePath, 'utf8', async (err, html) => {
      if (err) {
        console.error('Error al leer el archivo de plantilla:', err);
        return res.status(500).json({ error: "Error al registrar el usuario", details: err.message });
      }
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Cambiado de "post" a "port"
      secure: true,
      auth: {
        user: "greattravel.contact@gmail.com",
        pass: "hbacczxxirmcjmht"
      },
      tls:{
        rejectUnauthorized:false
      }
    });

     // Detalles del correo
     var mailOptions = {
      from: 'greattravel.contact@gmail.com',
      to: "oscar00gaona@gmail.com", // Utiliza la dirección del destinatario proporcionada en el cuerpo de la solicitud
      subject:"Gracias por seleccionarnos",
      html: html, // Puedes cambiar esto a HTML si lo deseas
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log("Email Enviado")
        res.status(200).jsonp(req.body);
      }
    });

    res.status(200).json(response);
  })
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};


const createBookHandler = async (req, res) => {
  const { assetId, userId, checkInDate, checkOutDate } = req.body;
  try {
    const response = await createBook(
      assetId,
      userId,
      checkInDate,
      checkOutDate
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRentHandler = async (req, res) => {
  // const {
  //   onSale,
  //   user,
  //   asset,
  //   checkIn,
  //   checkInTime,
  //   checkOut,
  //   checkOutTime,
  //   price,
  //   termCon,
  //   paymentMethod,
  //   guest,
  //   guestName,
  //   guestPhoneNumber,
  // } = req.body;
  console.log(22222222);
  try {
    // const validData = dataSchemePost.parse({
    //   body: {
    //     onSale,
    //     user,
    //     asset,
    //     checkIn,
    //     checkInTime,
    //     checkOut,
    //     checkOutTime,
    //     price,
    //     termCon,
    //     paymentMethod,
    //     guest,
    //     guestName,
    //     guestPhoneNumber,
    //   },
    // });
    const response = await createRent(req, res);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBookingHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteBooking(id);
    res.status(200).json(response);
  } catch (error) {
    return "Falló la anulación de la reserva, Aguarde 15min y el sistema lo hará automaticamente";
  }
};

const getRentByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getRentById(id);


    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};



module.exports = {
  createBookHandler,
  deleteBookingHandler,
  createRentHandler,
  finalHandler,
  getRentByIdHandler,
};
