const { Asset, Amenity, User, userAssets } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { filterLocation } = require("../helpers/filterLocation");

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

// Trae todas las propiedades para mostrar en el menu de administrador
const getAdminAssets = async (req) => {
  const { query } = req;
  const pageAsNumber = Number.parseInt(query.page);
  const sizeAsNumber = Number.parseInt(query.size);
  const { name, eliminado } = query;

  try {
    
    let page = 1;
    let size = 10;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {page = pageAsNumber;}
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {size = sizeAsNumber;}
    const sortMap = {
      sellPriceAsc: ["sellPrice", "ASC"],
      sellPriceDesc: ["sellPrice", "DESC"],
      rentPriceAsc: ["rentPrice", "ASC"],
      rentPriceDesc: ["rentPrice", "DESC"],
      averageScoreAsc: ["averageScore", "ASC"],
      averageScoreDesc: ["averageScore", "DESC"],
      numberOfReviewsAsc: ["numberOfReviews", "ASC"],
      numberOfReviewsDesc: ["numberOfReviews", "DESC"],
      nameAsc: ["name", "ASC"],
      nameDesc: ["name", "DESC"],
    };
    
    const order = [];
    for (const param in query) {
      if (sortMap[param] && query[param] === "yes") {
        order.push(sortMap[param]);
      }}
      
      if (order.length === 0) {
        throw new Error("No se proporcionaron parámetros de ordenamiento válidos.");
      }
      
      let filter = {};
      if (eliminado) {
        filter.eliminado = eliminado
      }
      if (name ) {
        filter.name = { ...filter.name, [Op.iLike]:`%${name}%` };
      }



    const response = await Asset.findAndCountAll({
      where: filter,
      order,
      limit: size,
      offset: (page - 1) * size,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllAssets = async (req) => {
  const { query } = req;
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
    // console.log(order);
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

    const amenitiess = [];
    if (amenities) {
      if (typeof amenities === "string") {
        amenitiess.push(amenities);

        filter.amenities = {
          ...filter.amenities,
          [Op.contains]: amenitiess,
        };
      } else {
        filter.amenities = {
          ...filter.amenities,
          [Op.contains]: amenities,
        };
      }
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

// Trae todas las propiedades de un usuario especifico

const getAssetsByUserId = async (id) => {
  // Buscar todas las filas en la tabla userAssets que tienen el userId proporcionado
  const userAss = await userAssets.findAll({
    where: { UserId: id },
  });

  // Extraer los IDs de las propiedades desde las filas encontradas
  const assetIds = userAss.map((a) => a.AssetId);
  console.log(assetIds);
  // Buscar las propiedades correspondientes a los IDs obtenidos
  const assets = await Asset.findAll({
    where: { id: assetIds },
  });

  return assets;
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
) => {
  try {
    // esto es para verificar si en Asset encuentra alguna Asset que tenga el mismo nombre que la que estoy creando
    const existingAsset = await Asset.findOne({ where: { name } });
    if (existingAsset) {
      throw new Error("Ya existe una publicacion con ese nombre");
    }
    const createdAsset = await Asset.create({
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
    });

    const findOwner = await User.findOne({
      where: { userName: userName },
    });
    if (findOwner) {
      await findOwner.addAsset(createdAsset);
    }

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
      throw new Error("Propiedad no encontrada");
    }

    await asset.softDelete();

    return "Propiedad eliminada con exito!";
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
      throw new Error("Estas seguro de que esta propiedad existe?");
    }

    await asset.destroy();

    return "La propiedad ha sido eliminada permanentemente";
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
      throw new Error("Propiedad no encontrada");
    }
    await asset.restore();

    return "Propiedad restaurada exitosamente";
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
  getAdminAssets,
  updateReviewAsset,
  getAssetsByUserId,
};
