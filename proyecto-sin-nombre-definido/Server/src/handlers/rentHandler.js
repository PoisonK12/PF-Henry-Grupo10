const { type } = require("os");

// const { rentSchemePost } = require("../helpers/validations/rentValidation.js");
const {
  createRent,
  createBook,
  getRentById,
  final,
} = require("../controllers/rentController.js");
// const { final } = require("../controllers/rentController.js");

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

    res.status(201).json(response);
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

const finalHandler = async (req, res) => {
  const id = req.params;
  try {
    const response = await final(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createRentHandler,
  finalHandler,
  createBookHandler,
  getRentByIdHandler,
};
