const { Rent, Availability } = require("../db");
const { removeExpiredRecords } = require("../helpers/removeExpiredRecords");

// const { Op, Sequelize } = require("sequelize");
// const { filterLocation } = require("../helpers/filterLocation");

const createBook = async (assetId, userId, checkInDate, checkOutDate) => {
  let innerDate = new Date(checkInDate);

  let checkOuting = new Date(checkOutDate);
  try {
    await removeExpiredRecords();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15);

    const gathered = await Availability.findAll({
      where: { assetId },
      attributes: ["dates"],
    }).then((datess) => {
      const allDates = datess.map((element) => element.dates);
      return [].concat(...allDates);
    });
    if (innerDate >= checkOuting) {
      return "Las fechas ingresadas son incorrectas";
    } else {
      const innerDates = [];

      while (innerDate < checkOuting) {
        const innerDateFormatted = innerDate.toISOString().split("T")[0];

        console.log(innerDateFormatted);
        if (gathered.includes(innerDateFormatted)) {
          return "La propiedad está reservada para los días indicados";
        }
        innerDates.push(new Date(innerDate));
        console.log(innerDate);
        innerDate.setDate(innerDate.getDate() + 1);
      }

      const response = await Availability.create({
        dates: innerDates,
        isAvailable: "Reservada",
        assetId: assetId,
        userId: userId,
        expirationTime: expirationTime,
      });

      return response.id;
      // +" --- " +
      // `Mantendremos la propiedad reservada para vos por 15min... Pero metele porque vuela!!`
    }
  } catch (error) {
    return "El servidor está caído. Por favor intentá más tarde.";
  }
};

const createRent = async (
  req,
  res
  // bookingCode,
  // onSale,
  // userId,
  // assetId,
  // checkInDate,
  // checkInTime,
  // checkOutDate,
  // checkOutTime,
  // price,
  // termCon,
  // paymentMethod,
  // guest,
  // guestName,
  // guestPhoneNumber
) => {
  // console.log(1);
  // console.log(6);
  const bookingCode = req.params.id;
  await removeExpiredRecords();
  // console.log(2);
  // console.log(bookingCode);
  const isItAvailable = await Availability.findOne({
    where: { id: bookingCode },
  });
  // console.log(3);
  // console.log(isItAvailable);
  if (isItAvailable === null) {
    return "Debes hacer una reserva, antes de efectuar el pago";
  }
  // await pago();
  // console.log(4);

  try {
    // const createdRent = await Rent.create({
    //   bookingCode,
    //   onSale,
    //   userId,
    //   assetId,
    //   checkInDate,
    //   checkInTime,
    //   checkOutDate,
    //   checkOutTime,
    //   price,
    //   termCon,
    //   paymentMethod,
    //   guest,
    //   guestName,
    //   guestPhoneNumber,
    // });
    const booked = await Availability.findOne({ where: { id: bookingCode } });
    console.log(booked);
    console.log(5555555555555555);
    await booked.update({
      isAvailable: "Indispuesta",
      expirationTime: null,
    });
    console.log(5);
    return `Casa tomada!!`;

    // return createdRent;
  } catch (error) {
    console.error(error.message);
  }
};
// Trae una renta especificada por el id
const getRentById = async (id) => {
  try {
    const rent = await Rent.findOne({
      where: { id: id },
    });
    return rent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createRent,
  createBook,
  getRentById,
};
