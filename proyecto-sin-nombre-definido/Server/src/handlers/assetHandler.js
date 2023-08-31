const { type } = require("os");
const { dataSchemePost } = require('../helpers/validation.ts')
const {
  deleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities
} = require("../controllers/assetController");


const getAllAssetsHandler = async (req, res) => {

  try {
    const response = await getAllAssets(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: error.message });
  }
};

const getAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = id ? await getAssetById(id) : await getAllAssets();

    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: error.message });
  }
};
const updateAssetHandler = async (req, res) => {
  const { id } = req.params
  const {
    name,
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    coveredArea,
    amenities
  } = req.body;

  try {
    await updateAsset(
      id,
      name,
      description,
      images,
      onSale,
      sellPrice,
      rentPrice,
      rooms,
      bathrooms,
      coveredArea,
      amenities
    );
    res.status(200).json(`La propiedad ${name} fue se edito correctamente`);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

//!------------------------------------------------------------------------

const createAssetHandler = async (req, res) => {
  const {
    name,
    description,
    address,
    location,
    country,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    coveredArea,
    totalArea,
    amenities,
    userid
  } = req.body;

  try {
    const validData = dataSchemePost.parse({
  body: {
    name,
    description,
    address,
    location, 
    country,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    coveredArea,
    totalArea,
    amenities
  }
});
    const response = await createAsset(
      name,
    description,
    address,
    location,
    country,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    coveredArea,
    totalArea,
    amenities,
    userid);
    res.status(201).json(`La propiedad ${name} se creó correctamente`);
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//!------------------------------------------------------------------------


const deleteAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAssetById(id);
    res.status(200).json(`La propiedad fue eliminada`);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const getAllLocationsHandler = async (req, res) => {

  try {
    const response = await getAllLocations();
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: error.message });
  }
};

const getAmenitiesHandler = async (req, res) => {
  
  try {
    const response = await getAllAmenities();
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler,
  getAmenitiesHandler
};
