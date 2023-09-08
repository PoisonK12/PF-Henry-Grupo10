const { Asset, Amenity, User } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { filterLocation } = require("../helpers/filterLocation");
const amenities = require("../models/amenities");

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

// Trae todas las propiedades
const getAllButAllAssets = async () => {
  try {
    const response = await Asset.findAll({});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
    averageScoreMin,
    averageScoreMax,
    amenities,
    sortBy,
  } = req.query;
  try {
    let page = 1;
    let size = 10;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const { query } = req;

    const sortMap = {
      sellPriceAsc: ["sellPrice", "ASC"],
      sellPriceDesc: ["sellPrice", "DESC"],
      rentPriceAsc: ["rentPrice", "ASC"],
      rentPriceDesc: ["rentPrice", "DESC"],
      averageScoreAsc: ["averageScore", "ASC"],
      averageScoreDesc: ["averageScore", "DESC"],
      numberOfReviewsAsc: ["numberOfReviews", "ASC"],
      numberOfReviewsDesc: ["numberOfReviews", "DESC"],
    };

    const order = [];
    for (const param in query) {
      if (sortMap[param] && query[param] === "yes") {
        order.push(sortMap[param]);
      }
    }

    if (order.length === 0) {
      throw new Error(
        "No se proporcionaron parámetros de ordenamiento válidos."
      );
    }
    console.log(order);
    let filter = {
      eliminado: false,
    };

    if (sellPriceMin !== 1) {
      if (sellPriceMin) {
        filter.sellPrice = { ...filter.sellPrice, [Op.gte]: sellPriceMin };
      }
      if (sellPriceMax) {
        filter.sellPrice = { ...filter.sellPrice, [Op.lte]: sellPriceMax };
      }
    }
    if (rentPriceMin) {
      filter.rentPrice = { ...filter.rentPrice, [Op.gte]: rentPriceMin };
    }
    if (rentPriceMax) {
      filter.rentPrice = { ...filter.rentPrice, [Op.lte]: rentPriceMax };
    }
    if (amenities) {
      filter.amenities = { ...filter.amenities, [Op.contains]: amenities };
    }
    if (averageScoreMin) {
      filter.averageScore = {
        ...filter.averageScore,
        [Op.gte]: averageScoreMin,
      };
    }
    if (averageScoreMax) {
      filter.averageScore = {
        ...filter.averageScore,
        [Op.lte]: averageScoreMax,
      };
    }
    if (bathrooms) {
      filter.bathrooms = bathrooms;
    }
    if (location) {
      filter.location = location;
    }
    if (onSale) {
      filter.onSale = onSale;
    }
    if (rooms) {
      filter.rooms = rooms;
    }

    const assets = await Asset.findAndCountAll({
      where: filter,
      order,
      limit: size,
      offset: (page - 1) * size,
    });
    return assets;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Trae una propiedad especificada por el id
const getAssetById = async (id) => {
  try {
    const asset = await Asset.findOne({
      where: { id: id },
    });
    return asset;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateReviewAsset = async (id, averageScore, numberOfReviews) => {
  try {
    const updateReviewAsset = await Asset.findOne({
      where: { id: id },
    });
    await updateReviewAsset.update({
      averageScore,
      numberOfReviews,
    });
    return updateReviewAsset;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
  try {
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
      coveredArea,
      amenities,
    });
    return updateAsset;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
  amenities
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
    throw error;
  }
};

const softDeleteAssetById = async (id) => {
  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAssetById = async (id) => {
  try {
    const asset = await Asset.findOne({
      where: {
        id: id,
      },
    });

    if (!asset) {
      throw new Error("You sure this asset exist?");
    }

    await asset.destroy();

    return "Asset deleted permanently successfully";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const restoreAssetById = async (id) => {
  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    throw error;
  }
};

const getAllAmenities = async () => {
  try {
    const allAmenities = await Amenity.findAll();

    return allAmenities;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  deleteAssetById,
  softDeleteAssetById,
  restoreAssetById,
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  getAllLocations,
  getAllAmenities,
  getAllButAllAssets,
  updateReviewAsset,
};
