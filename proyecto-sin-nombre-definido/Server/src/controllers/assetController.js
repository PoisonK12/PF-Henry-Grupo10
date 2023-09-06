const { Asset, Amenity } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { filterLocation } = require("../helpers/filterLocation");
const amenities = require("../models/amenities");
// const { sequelize } = require("../models/index");

//Prototipos de borralo logico

// Método para soft delete
//(delete) http://localhost:3001/assets/id
Asset.prototype.softDelete = function () {
  return this.update({ eliminado: true });
};

// Método para restaurar
//http://localhost:3001/assets/restore/id
Asset.prototype.restore = function () {
  return this.update({ eliminado: false });
};

// Trae todas las propiedades y paginado
//!------------------------------------------------------------------------
//
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
    averageScore,
    amenities,
    sortBy,
  } = req.query;

  let page = 1;
  let size = 10;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }
  // promedio    # de votos
  // [   4.7   ,      5    ]
  // nuevo voto: 3

  // nuevo promedio = ((4.7 * 5) + 3)/(5+1)
  // nueva # de voto = 5 +1

  let filter = {
    eliminado: false
  };
  if (rentPriceMin) {filter.rentPrice = {...filter.rentPrice, [Op.gte]: rentPriceMin };}
  if (rentPriceMax) {filter.rentPrice = {...filter.rentPrice, [Op.lte]: rentPriceMax };}
  if (sellPriceMin) {filter.rentPrice = {...filter.sellPrice, [Op.gte]: sellPriceMin };}
  if (sellPriceMax) {filter.rentPrice = {...filter.sellPrice, [Op.lte]: sellPriceMax };}
  if (amenities)    {filter.amenities = {...filter.amenities, [Op.overlap]: amenities};}
  if (averageScore) {filter.averageScore = {...filter.averageScore, [Op.gte]: averageScore };}

  if (bathrooms) {filter.bathrooms = bathrooms;}
  if (location) {filter.location = location;}
  if (onSale) {filter.onSale = onSale;}
  if (rooms) {filter.rooms = rooms;}


  

  const assets = await Asset.findAndCountAll({
    where: filter,
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
  averageScore,
  numberOfReviews,
  coveredArea,
  amenities
) => {
  const updateAsset = await Asset.findOne({ where: { id: id } });

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
    numberOfReviews,
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
  numberOfReviews,
  coveredArea,
  totalArea,
  amenities,
) => {
  try {
    // esto es para verificar si en Asset encuentra alguna Asset que tenga el mismo nombre que la que estoy creando
    const existingAsset = await Asset.findOne({ where: { name } });

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
      numberOfReviews,
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
    // console.log(error);
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

  if (!asset) {throw new Error("Asset not found");}
  
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
};
