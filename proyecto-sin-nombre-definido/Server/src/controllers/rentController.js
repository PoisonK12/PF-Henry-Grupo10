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
        if (gathered.includes(innerDateFormatted))
          return "La propiedad está reservada para los días indicados";
        innerDates.push(new Date(innerDate));
        innerDate.setDate(innerDate.getDate() + 1);
      }

      await Availability.create({
        dates: innerDates,
        isAvailable: "Reservada",
        assetId: assetId,
        userId: userId,
        expirationTime: expirationTime,
      });
      return `Mantendremos la propiedad reservada para vos por 15min... Pero metele porque vuela!!`;
    }
  } catch (error) {
    return "El servidor está caído. Por favor intentá más tarde.";
  }
};

const createRent = async (
  onSale,
  user,
  asset,
  checkIn,
  checkInTime,
  checkOut,
  checkOutTime,
  price,
  termCon,
  paymentMethod,
  guest,
  guestName,
  guestPhoneNumber
) => {
  try {
    const createdRent = await Rent.create({
      onSale,
      user,
      asset,
      checkIn,
      checkInTime,
      checkOut,
      checkOutTime,
      price,
      termCon,
      paymentMethod,
      guest,
      guestName,
      guestPhoneNumber,
    });

    return createdRent;
  } catch (error) {
    // console.log(error);
    throw new Error("Error al registrar la renta");
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
