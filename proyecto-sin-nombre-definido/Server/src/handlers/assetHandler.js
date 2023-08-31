const { type } = require("os");
const {
  deleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations
} = require("../controllers/assetController");


const getAllAssetsHandler = async (req, res) => {

  try {
    const response = await getAllAssets(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = id ? await getAssetById(id) : await getAllAssets();

    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
const updateAssetHandler = async (req, res) => {
  const {id} = req.params
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
    res.status(500).json({ error: error.message });
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
    userId
  } = req.body;
 
  try {
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
      userId
    );
    res.status(200).json(`La propiedad ${name} se creó correctamente`);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};


//!------------------------------------------------------------------------


const deleteAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAssetById(id);
    res.status(200).json(`La propiedad fue eliminada`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLocationsHandler = async (req, res) => {
  
  try {
    const response = await getAllLocations();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler
};