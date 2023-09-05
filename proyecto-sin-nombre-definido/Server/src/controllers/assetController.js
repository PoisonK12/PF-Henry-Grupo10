const { Asset, Amenity } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { filterLocation } = require("../helpers/filterLocation");
// const { sequelize } = require("../models/index");

// Trae todas las propiedades y paginado
//!------------------------------------------------------------------------

const getAllButAllAssets = async (req, res) => {
  try {
    const response = await Asset.findAll({});

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

//!------------------------------------------------------------------------

const getAllAssets = async (req) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const {
    location,
    rooms,
    bathrooms,
    onSale,
    rentPriceMax,
    rentPriceMin,
    sellPriceMax,
    sellPriceMin,
    sortBy,
  } = req.query;
  
const average = averageScore[0]

  let page = 1;
  let size = 10;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {page = pageAsNumber;}
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {size = sizeAsNumber;}


  const assets = await Asset.findAndCountAll({
    where:  {location,
    country,
    rooms,
    bathrooms,
    average,
    onSale,
    rentPriceMax,
    rentPriceMin,
    sellPriceMax,
    sellPriceMin,
    amenities:{ [ Op.contains ] : amenities }},
    order: [],
    limit: size,
    offset: (page - 1) * size,
  });

  return assets;
};
//!------------------------------------------------------------------------

// Trae una propiedad especificada por el id
const getAssetById = async (id) => {
  const asset = await Asset.findOne({
    where: {
      id: id,
    }
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
  averageScore,
  coveredArea,
  amenities
) => {

  const updateAsset = await Asset.findOne({where: { id: id }});

  await updateAsset.update({
    name,
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    averageScore,
    coveredArea,
    amenities,
  });

  // if (amenities) {
  //   const amenitiesToUpdate = await Amenity.findAll({
  //     where: { id: amenities },
  //   });
  //   await updateAsset.setAmenities(amenitiesToUpdate);
  // }

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
  averageScore,
  coveredArea,
  totalArea,
  amenities,
) => {
  try {
    // esto es para verificar si en Asset encuentra alguna Asset que tenga el mismo nombre que la que estoy creando
    const existingAsset = await Asset.findOne({ where: { name } });

    console.log(typeof averageScore)
    console.log(averageScore)
    if (existingAsset) {
      throw new Error("La Asset ya existe");
    }
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
      averageScore,
      coveredArea,
      totalArea,
      amenities,
    });

    // for (const findId of amenities) {
    //   const findAmen = await Amenity.findOne({
    //     where: { id: findId },
    //   });
    //   if (findAmen) {
    //     await createdAsset.addAmenity(findAmen);
    //   }
    // }

    return createdAsset;
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar la propiedad");
  }
};

const deleteAssetById = async (id) => {
  //Borrado logico añadido
  const asset = await Asset.findOne({
    where: {
      id: id,
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }
  await asset.softDelete();

  return "Asset deleted successfully";
};

const restoreAssetById = async (id) => {
  const asset = await Asset.findOne({
    where: {
      id: id,
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }
  await asset.restore();

  return "Asset restored successfully";
};

const getAllLocations = async () => {
  try {
    const allAssets = await Asset.findAll();
    // console.log(allAssets)
    const response = filterLocation(allAssets);
    // console.log(response)
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las locaciones");
  }
};

const getAllAmenities = async () => {
  try {
    const allAmenities = await Amenity.findAll();

    return allAmenities;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las amenities");
  }
};

module.exports = {
  deleteAssetById,
  restoreAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities,
  getAllButAllAssets,
  getAllAssetsWithAmenities,
};