const {
  deleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
} = require("../controllers/assetController");

const getAllAssetsHandler = async (req, res) => {
  try {
    const response = await getAllAssets();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssetByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = id ? await getAssetById(id) : await getAllAssets();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateAssetHandler = async (req, res) => {
  const {
    name,
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    amenities,
  } = req.body;
  try {
    await updateAsset(
      name,
      description,
      images,
      onSale,
      sellPrice,
      rentPrice,
      rooms,
      bathrooms,
      amenities
    );
    res.status(200).json(`La propiedad ${name} fue se edito correctamente`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAssetHandler = async (req, res) => {
  const {
    name,
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    amenities,
  } = req.body;
  try {
    const response = await createAsset(
      name,
      description,
      images,
      onSale,
      sellPrice,
      rentPrice,
      rooms,
      bathrooms,
      amenities
    );
    res.status(200).json(`La propiedad ${name} se creó correctamente`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssetByIdHandler = async (req, res) => {
  const { name } = req.params;
  try {
    await deleteAssetById(name);
    res.status(200).json(`La propiedad ${name} fue eliminada`);
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
};
