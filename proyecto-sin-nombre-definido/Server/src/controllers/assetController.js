const { Asset, Amenity } = require("../db");
const { Op } = require("sequelize");

// Trae todas las propiedades y paginado
const getAllAssets = async () => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  const assets = await Asset.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  return assets;
};

// Trae una propiedad especificada por el id
const getAssetById = async (id) => {
  const asset = await Asset.findOne({
    where: {
      id: id,
    },
    include: {
      model: Amenity,
      through: { attribute: [] },
    },
  });
  return asset;
};

const updateAsset = async (
  name,
  description,
  images,
  onSale,
  sellPrice,
  rentPrice,
  rooms,
  bathrooms,
  amenities
) => {
  const updateAsset = await Asset.findOne({
    where: { name: name },
    include: Amenity,
  });
  await updateAsset.update({
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    amenities,
  });
  const amenitiesToUpdate = await Amenity.findAll({
    where: { id: amenities },
  });
  await updateAsset.setAssets(amenitiesToUpdate);
  return updateAsset;
};
const createAsset = async (
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
) => {
  try{
  console.log(123)
  const createdAsset = await Asset.create({
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
    userId,
  });
  console.log(1)
  
  for (const findId of amenities) {    
    const findAmen = await Amenity.findOne({
      where: { id: findId },
    });
    if (findAmen) {
      await createdAsset.addAmenity(findAmen);
      
    }
  }
  
  return "createAsset";}
   catch (error) {
    console.log(error);
    throw new Error("Error al postear el perro");
  }
  
};

const deleteAssetById = async (id) => {
  const asset = await Asset.findOne({
    where: {
      id: id,
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }

  await asset.destroy();

  return "Asset deleted successfully";
};
module.exports = {
  deleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
};
