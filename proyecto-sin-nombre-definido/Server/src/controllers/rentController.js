const { Rent } = require("../db");
const Availability = require("../models/availability");
// const { Op, Sequelize } = require("sequelize");
// const { filterLocation } = require("../helpers/filterLocation");

const createBook = async (assetId, userId, checkInDate, checkOutDate) => {
  if (checkInDate >= checkOutDate) {
    return "fechas incorrectas";
  } else {
    const innerDates = [];
    const innerDate = new Date(checkInDate);

    while (innerDate <= checkOutDate) {
      innerDates.push(new Date(innerDate));
      innerDate.setDate(innerDate.getDate() + 1);
    }
  }
  const response = await Availability.create({
    dates: innerDates,
    isAvailable: "Reservada",
    assetId: assetId,
    userId: userId,
  });
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
