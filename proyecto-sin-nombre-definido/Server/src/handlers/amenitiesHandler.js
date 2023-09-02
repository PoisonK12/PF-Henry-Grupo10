const {
  getAllAmenities,
  getAmenitiesById,
} = require("../controllers/amenitiesController");

const getAllAmenitiesHandler = async (req, res) => {
  try {
    const response = await getAllAmenities(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
const getAmenitiesByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { dato } = req.query;
  try {
    const response = await getAmenitiesById(id, dato);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllAmenitiesHandler, getAmenitiesByIdHandler };
