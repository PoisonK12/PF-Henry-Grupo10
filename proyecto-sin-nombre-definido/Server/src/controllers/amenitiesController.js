const { Amenity, Asset } = require("../db");

const getAllAmenities = async (req, res) => {
  try {
    const response = await Amenity.findAll({
      attributes: ["id", "name"],
    });
//
    return response;
  } catch (error) {
    console.error(error.message);
  }
};
const getAmenitiesById = async (id, location) => {
  const ameni = await Amenity.findOne({
    where: {
      id: id,
    },
    order: [location],
    include: {
      model: Asset,
      through: { joinTableAttributes: [] },
    },
    order: [],
  });
  return ameni;
};
// const getAmenitiesById = async (id) => {
//   const ameni = await Amenity.findOne({
//     where: {
//       id: id,
//     },
//     include: {
//       model: Asset,
//       through: { joinTableAttributes: [] },
//     },
//   });
//   return ameni;
// };

module.exports = { getAllAmenities, getAmenitiesById };
