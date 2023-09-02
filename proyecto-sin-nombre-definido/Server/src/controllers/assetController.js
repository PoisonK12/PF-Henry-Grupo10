const { Asset, Amenity } = require("../db");
const { Op } = require("sequelize");
const { filterLocation } = require("../helpers/filterLocation");

// Trae todas las propiedades y paginado
const getAllAssets = async (req) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const {
    location,
    rooms,
    bathrooms,
    onSale,
    amenities,
    rentPriceMax,
    rentPriceMin,
    sellPriceMax,
    sellPriceMin,
    // sortBy,
  } = req.query;

  let amenityIds = [];

  console.log(typeof amenities);
  amenityIds = amenities ? amenities.split(",").map(Number) : [];

  let filter = {};

  // if (amenityIds.length > 0) {
  //   filter.id = {
  //     [Op.in]: amenityIds,
  //   };
  // }

  if (rentPriceMin) {
    filter.rentPrice = { ...filter.rentPrice, [Op.gte]: rentPriceMin };
  }
  if (rentPriceMax) {
    filter.rentPrice = { ...filter.rentPrice, [Op.lte]: rentPriceMax };
  }
  if (sellPriceMin) {
    filter.rentPrice = { ...filter.sellPrice, [Op.gte]: sellPriceMin };
  }
  if (sellPriceMax) {
    filter.rentPrice = { ...filter.sellPrice, [Op.lte]: sellPriceMax };
  }

  if (location) {
    filter.location = location;
  }
  if (rooms) {
    filter.rooms = rooms;
  }
  if (bathrooms) {
    filter.bathrooms = bathrooms;
  }
  if (onSale) {
    filter.onSale = onSale;
  }
  console.log(filter);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }
  const assets = await Asset.findAndCountAll({
    where: filter,
    order: [],
    limit: size,
    offset: (page - 1) * size,
    include: {
      model: Amenity,
      through: { joinTableAttributes: [] },
    },
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
      through: { joinTableAttributes: [] },
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
    amenities,
  });
  if (amenities) {
    const amenitiesToUpdate = await Amenity.findAll({
      where: { id: amenities },
    });
    await updateAsset.setAmenities(amenitiesToUpdate);
  }
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

    return createdAsset;
  } catch (error) {
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
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities,
};
