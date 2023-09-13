const { type } = require("os");

const { assetSchemePost } = require("../helpers/validations/assetValidation.js");
const {
  deleteAssetById,
  softDeleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities,
  getAdminAssets,
  getAssetsByUserId,
  restoreAssetById,
} = require("../controllers/assetController");

const getAllAssetsHandler = async (req, res) => {
  try {
    const response = await getAllAssets(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
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

// Traigo todos los asset de un usuario para mostrar en su perfil
const getAssetsFromUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getAssetsByUserId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdminAssetsHandler = async (req, res) => {
  try {
    const response = await getAdminAssets();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Peticion de asset para detail
const getAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    // const response = id ? await getAssetById(id) : await getAllAssets();
    const response = await getAssetById(id)

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





module.exports = {
  deleteAssetByIdHandler,
  softDeleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler,
  getAmenitiesHandler,
  getAdminAssetsHandler,
  restoreAssetByIdHandler,
  getAssetsFromUserHandler,
};
