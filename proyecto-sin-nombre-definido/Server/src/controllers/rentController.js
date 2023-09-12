const { Rent, Availability } = require("../db");
const { removeExpiredRecords } = require("../helpers/removeExpiredRecords");

// const { Op, Sequelize } = require("sequelize");
// const { filterLocation } = require("../helpers/filterLocation");

const createBook = async (assetId, userId, checkInDate, checkOutDate) => {
  let innerDate = new Date(checkInDate);
  let checkOuting = new Date(checkOutDate);

  await removeExpiredRecords();
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 1);

  const gathered = await Availability.findAll({
    where: { assetId },
    attributes: ["dates"],
  }).then((datess) => {
    const allDates = datess.map((element) => element.dates);
    return [].concat(...allDates);
  });

  if (innerDate >= checkOuting) {
    return "fechas incorrectas";
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
    return `mantendremos la propiedad reservada para vos por 15min... Así que metele porque vuela!!`;
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
    // esto es para verificar si en Rent encuentra alguna Asset que tenga el mismo nombre que la que estoy creando
    //   const existingRent = await Rent.findOne({ where: { name } });

    //   if (existingRent) {
    //     throw new Error("La Rent ya existe");
    //   }
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

module.exports = {
  createRent,
  createBook,
};
