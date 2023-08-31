const { Asset, Amenity } = require("../db");
const { Op } = require("sequelize");
const {filterLocation} = require("../helpers/filterLocation");
const assets = require("../models/assets");

// Trae todas las propiedades y paginado
const getAllAssets = async (req) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  // const pageAsNumber = 1
  // const sizeAsNumber= 30
  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  const assets = await Asset.findAndCountAll({
    limit: size,
    offset: (page-1) * size,
  });
  
  return assets;
};
//!------------------------------------------------------------------------
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
//!------------------------------------------------------------------------
const updateAsset = async (
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
) => {
  const updateAsset = await Asset.findOne({
    where: { id: id },
    include: Amenity,
  });
  await updateAsset.update({
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
  });
  const amenitiesToUpdate = await Amenity.findAll({
    where: { id: amenities },
  });
  await updateAsset.setAmenities(amenitiesToUpdate);
  return updateAsset;
};

//!------------------------------------------------------------------------
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
  
  for (const findId of amenities) {    
    const findAmen = await Amenity.findOne({
      where: { id: findId },
    });
    if (findAmen) {
      await createdAsset.addAmenity(findAmen);
      
    }
  }
  
  return createAsset;}
   catch (error) {
    console.log(error);
    throw new Error("Error al registrar la propiedad");
  }
  
};

const deleteAssetById = async (id) => {
  //TODO agregar borrado logico
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

const getAllLocations = async () => {
try {
  const allAssets = await Asset.findAll()
  // console.log(allAssets)
  const response = filterLocation(allAssets)
  // console.log(response)
  return response
} catch (error) {
  console.log(error);
    throw new Error("Error al obtener las locaciones");
}
};
module.exports = {
  deleteAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations
};
