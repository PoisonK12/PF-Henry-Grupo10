const { Op } = require("sequelize");
const { Rent, Availability, Asset, User } = require("../db");
const { removeExpiredRecords } = require("../helpers/removeExpiredRecords");
const {
  emptyUserReviewCreater,
  emptyAssetReviewCreater,
} = require("../controllers/reviewController");

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

const createRent = async (req, res) => {
  const bookingCode = req.params.id;
  try {
    await removeExpiredRecords();

    const isItAvailable = await Availability.findOne({
      where: { id: bookingCode },
    });

    if (isItAvailable === null) {
      return "Debes hacer una reserva, antes de efectuar el pago";
    }
    // await pago();

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
    const booked = await Availability.findOne({
      where: { id: bookingCode, expirationTime: { [Op.not]: null } },
      includes: { model: Asset },
    });
    if (booked === null) return "Homero, ya marcaste...";
    await booked.update({
      isAvailable: "Indispuesta",
      expirationTime: null,
    });

    console.log(1111111);
    const tenant = await User.findOne(
      {
        where: { id: booked.userId },
      },
      { attributes: ["userName"] }
    );
    console.log(22222);
    const nuevoId = isItAvailable.assetId;

    const landlordData = await User.findOne({
      include: [
        {
          model: Asset,
          through: {
            where: { AssetId: nuevoId },
          },
        },
      ],
      // where: { "$User.id$": { [Op.eq]: id } },
      attributes: ["id", "userName"],
    });

    console.log(landlordData.userName);

    console.log(tenant.id);
    console.log(tenant.userName);
    console.log(isItAvailable.assetId);
    console.log(landlordData.id);

    await emptyUserReviewCreater(landlordData.userName, tenant.id);
    await emptyAssetReviewCreater(tenant.userName, isItAvailable.assetId);
    await emptyUserReviewCreater(tenant.userName, landlordData.id);

    return (
      "Felices vacaciones!!" +
      " " +
      "Y no te olvides de usar filtro solar." +
      " " +
      "Y no seas rata y traele algo a la abuela. Un imancito.., lo que sea. Con una boludes de dos mangos, la haces sentir re bien ;-)"
    );
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