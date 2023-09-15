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
    /**Validaciones en el caso de no poder usar zod */
    
    // if (!user || !asset || !checkIn || !checkInTime || !checkOut || !checkOutTime || !price || !termCon || !paymentMethod || !guest) {
    //   throw Error("Faltan datos")
    // }
    // if (typeof onSale !== "boolean") {
    //   throw Error("onSale debe ser un booleano")
    // }
    // if (typeof user !== "string") {
    //   throw Error("El nombre de usuario ingresado debe ser un string");
    // }
    // if (typeof asset !== "string") {
    //   throw Error("La propiedad ingresada debe ser un string");
    // }
    // if (! (checkIn instanceof Date)) {
    //   throw Error("checkIn no es del tipo Date");
    // }
    // if (! (checkInTime instanceof Date)) {
    //   throw Error("checkInTime no es del tipo Date");
    // }
    // if (! (checkOut instanceof Date)) {
    //   throw Error("checkOut no es del tipo Date");
    // }
    // if (! (checkOutTime instanceof Date)) {
    //   throw Error("checkOutTime no es del tipo Date");
    // }
      // if (typeof price !== "number") {
    //     throw Error(" El precio de renta debe ser un número")
    // }
    // if (price < 1) {
    //   throw Error("El precio de renta no puede ser menor que 1")
    // }
    // if (typeof termCon !== "boolean") {
    //   throw Error("termCon debe ser un booleano")
    // }
    // if(
    //   paymentMethod !== "Card" &&
    //   paymentMethod !== "Cash" 
    // ){
    //   throw Error("El método de pago debe ser Card o Cash");
    // }
    // if (typeof guest !== "boolean") {
    //   throw Error("guest debe ser un booleano")
    // }
      

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
