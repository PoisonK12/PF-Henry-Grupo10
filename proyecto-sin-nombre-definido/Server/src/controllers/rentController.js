const { Op } = require("sequelize");
const { Rent, Availability, Asset, User } = require("../db");
const { removeExpiredRecords } = require("../helpers/removeExpiredRecords");
const {
  emptyUserReviewCreater,
  emptyAssetReviewCreater,
} = require("../controllers/reviewController");
const { createSession } = require("../controllers/payment.controller");

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
      // includes: { model: Asset },
    });
    if (isItAvailable === null) {
      return "Debes hacer una reserva, antes de efectuar el rent";
    }
    const pay = await Asset.findOne({
      where: { id: isItAvailable.assetId },
      // attributes: ["name", "description", "rentPrice"],
      include: [{ model: User, attributes: ["userName"] }],
    });
    const stay = isItAvailable.dates.length;
    // console.log(pay);
    // console.log(pay.name);
    // console.log(isItAvailable.userId);
    // console.log(pay.userName);
    // console.log(isItAvailable.assetId);
    console.log(333333333);
    console.log(bookingCode);
    const rent = {
      name: pay.name,
      tenant: isItAvailable.userId,
      landlord: "pay.userName",
      asset: isItAvailable.assetId,
      description: pay.description,
      price: pay.rentPrice * stay,
      stay: stay,
      bookingCode: bookingCode,
    };
    const createdRent = await Rent.create(rent);

    const id = createdRent.id;
    // console.log(pay.rentPrice);
    // console.log(1111111);
    const URL = await createSession(rent, id);
    // console.log(33333333);
    return URL;
  } catch (error) {
    console.log(error.message);
  }
};
// -----------------------------------------------------------------

const final = async (req) => {
  const { id } = req;
  try {
    console.log(id);
    const rented = await Rent.findByPk(id);
    const bookingCode = rented.bookingCode;
    const booked = await Availability.findOne({
      where: { id: bookingCode, expirationTime: { [Op.not]: null } },
      includes: { model: Asset },
    });
    if (booked === null) return "Homero, ya marcaste...";
    await booked.update({
      isAvailable: "Indispuesta",
      expirationTime: null,
    });

    const tenant = await User.findOne(
      {
        where: { id: booked.userId },
      },
      { attributes: ["userName"] }
    );
    const nuevoId = rented.asset;

    const landlordData = await User.findOne({
      include: [
        {
          model: Asset,
          through: {
            where: { AssetId: nuevoId },
          },
        },
      ],
      attributes: ["id", "userName"],
    });

    await emptyUserReviewCreater(landlordData.userName, tenant.id);
    await emptyAssetReviewCreater(tenant.userName, rented.asset);
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
  final,
  getRentById,
};
