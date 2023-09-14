const { type } = require("os");

// const { rentSchemePost } = require("../helpers/validations/rentValidation.js");
const {
  createRent,
  createBook,
  getRentById,
} = require("../controllers/rentController.js");

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
  // } = req.body;
  // console.log(req.params.id);
  try {
    // const validData = dataSchemePost.parse({
    //   body: {
    //     bookingCode,
    //     onSale,
    //     userId,
    //     assetId,
    //     checkInDate,
    //     checkInTime,
    //     checkOutDate,
    //     checkOutTime,
    //     price,
    //     termCon,
    //     paymentMethod,
    //     guest,
    //     guestName,
    //     guestPhoneNumber,
    //   },
    // });
    const response = await createRent(
      req,
      res
      // bookingCode,
      // onSale,
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
    );
    res.status(201).json(response);
    console.log("bbb");
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  createRentHandler,
  createBookHandler,
  getRentByIdHandler,
};
