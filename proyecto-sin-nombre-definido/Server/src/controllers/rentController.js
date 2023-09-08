const { Rent } = require("../db");
// const { Op, Sequelize } = require("sequelize");
// const { filterLocation } = require("../helpers/filterLocation");


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
    guestPhoneNumber,
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
}