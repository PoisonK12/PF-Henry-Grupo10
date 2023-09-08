const { type } = require("os");

// const { dataSchemePost } = require("../helpers/rentValidation.ts");
const {

 createRent,

} = require("../controllers/rentController.js");


const createRentHandler = async (req, res) => {
  const {
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

  } = req.body;

  try {
    const validData = dataSchemePost.parse({
      body: {
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
      },
    });
    const response = await createRent(
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
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






module.exports = {

  createRentHandler,

};
