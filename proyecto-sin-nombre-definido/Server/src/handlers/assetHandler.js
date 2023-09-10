const { type } = require("os");

const { dataSchemePost } = require("../helpers/assetValidation.ts");
const {
  deleteAssetById,
  softDeleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities,
  getAllButAllAssets,
  getAllAssetsWithAmenities,
  getAssetsByUserId,
  restoreAssetById,
} = require("../controllers/assetController");

const getAssetsFromUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getAssetsByUserId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllButAllAssetsHandler = async (req, res) => {
  try {
    const response = await getAllButAllAssets();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAssetsHandler = async (req, res) => {
  try {
    const response = await getAllAssets(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const getAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = id ? await getAssetById(id) : await getAllAssets();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const updateAssetHandler = async (req, res) => {
  const { id } = req.params;
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
    amenities,
  } = req.body;

  try {
    // const validData = dataSchemePost.parse({
    //   body: {
    //   name,
    //   description,
    //   images,
    //   onSale,
    //   sellPrice,
    //   rentPrice,
    //   rooms,
    //   bathrooms,
    //   amenities,
    //   },
    // });
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
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//!------------------------------------------------------------------------

const createAssetHandler = async (req, res) => {
  const {
    userName,
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
  } = req.body;

  try {
    // const validData = dataSchemePost.parse({
    //   body: {
    //     name,
    //     description,
    //     address,
    //     location,
    //     country,
    //     images,
    //     onSale,
    //     sellPrice,
    //     rentPrice,
    //     rooms,
    //     bathrooms,
    //     coveredArea,
    //     totalArea,
    //     amenities,
    //   },
    // });
    const response = await createAsset(
      userName,
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
    );

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//!------------------------------------------------------------------------

const softDeleteAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await softDeleteAssetById(id);
    res.status(200).json(`La propiedad fue eliminada`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAssetById(id);
    res.status(200).json(`La propiedad fue eliminada definitivamente`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const restoreAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await restoreAssetById(id);
    res.status(200).json(`La propiedad fue restaurada`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllLocationsHandler = async (req, res) => {
  try {
    const response = await getAllLocations();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const getAmenitiesHandler = async (req, res) => {
  try {
    const response = await getAllAmenities();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const getAllAssetsWithAmenitiesHandler = async (req, res) => {
  const { amenitiesss } = req.query;
  try {
    const response = await getAllAssetsWithAmenities(amenitiesss);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  deleteAssetByIdHandler,
  softDeleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler,
  getAmenitiesHandler,
  getAllButAllAssetsHandler,
  getAllAssetsWithAmenitiesHandler,
  restoreAssetByIdHandler,
  getAssetsFromUserHandler,
};
