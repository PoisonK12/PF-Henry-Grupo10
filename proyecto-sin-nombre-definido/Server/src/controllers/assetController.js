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
    /**Validaciones en el caso de no poder usar zod */
    // if (typeof name !== "string") {
    //   throw Error("El nombre ingresado debe ser un string");
    // }
    // if (typeof description !== "string") {
    //   throw Error("La descripción ingresada debe ser un string");
    // }
        // if (typeof images !== typeof ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659301.jpg?k=2534661492111b259f5dbc7277e3f48c2e2f8232e92e9908ad81b6890b0616fa&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659315.jpg?k=499585cf667a36291b45c1e31bd4d871ee0ab0826348fdc2cfda66f4dbe8e685&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659308.jpg?k=2f921fa3038fe4c5ab2dc9f26046053866e2700b966f0e3c9acc2aed607f85f1&o=&hp=1"]) {
    //   throw Error("El formato de la imagen no es correcto")
    // }
    // if (images.length !== 3) {
    //   throw Error("Debe subir exactamente 3 imagenes de la propiedad")
    // }
    // if (typeof onSale !== "boolean") {
    //   throw Error("onSale debe ser un booleano")
    // }
    // if (typeof sellPrice !== "number") {
    //   throw Error("sellPrice debe ser un número")
    // }
    // if (sellPrice < 1) {
    //   throw Error("sellPrice no puede ser menor que 1")
    // }
    // if (typeof rentPrice !== "number") {
    //     throw Error(" El precio de renta debe ser un número")
    // }
    // if (rentPrice < 1) {
    //   throw Error("El precio de renta no puede ser menor que 1")
    // }
    // if (typeof rooms !== "number") {
    //   throw Error("habitación debe ser un número")
    // }
    // if (rooms < 1) {
    //   throw Error("Tiene que tener al menos una habitación")
    // }
    // if (typeof bathrooms !== "number") {
    //   throw Error("baño debe ser un número")
    // }
    // if (bathrooms < 1) {
    //   throw Error("Tiene que tener al menos un baño")
    // }
    // if (typeof coveredArea !== "number") {
    //   throw Error("Area cubierta debe ser un número")
    // }
    // if (coveredArea < 1) {
    //   throw Error("El área cubierta debe ser mayor a 1")
    // }


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

    /**Validaciones en el caso de no poder usar zod */

    // if (!name || !description || !address || !location || !country || !images || !rooms) {
    //   throw Error("Faltan datos")
    // }

    // if (typeof name !== "string") {
    //   throw Error("El nombre ingresado debe ser un string");
    // }
    // if (typeof description !== "string") {
    //   throw Error("La descripción ingresada debe ser un string");
    // }
    // if (typeof address !== "string") {
    //   throw Error("La dirección ingresada debe ser un string");
    // }
    // if (typeof location !== "string") {
    //   throw Error("La locación ingresada debe ser un string");
    // }
    // if (typeof country !== "string") {
    //   throw Error("El país ingresado debe ser un string");
    // }
    
    // if (typeof images !== typeof ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659301.jpg?k=2534661492111b259f5dbc7277e3f48c2e2f8232e92e9908ad81b6890b0616fa&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659315.jpg?k=499585cf667a36291b45c1e31bd4d871ee0ab0826348fdc2cfda66f4dbe8e685&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659308.jpg?k=2f921fa3038fe4c5ab2dc9f26046053866e2700b966f0e3c9acc2aed607f85f1&o=&hp=1"]) {
    //   throw Error("El formato de la imagen no es correcto")
    // }
    // if (images.length !== 3) {
    //   throw Error("Debe subir exactamente 3 imagenes de la propiedad")
    // }
    // if (typeof onSale !== "boolean") {
    //   throw Error("onSale debe ser un booleano")
    // }
    // if (typeof sellPrice !== "number") {
    //   throw Error("sellPrice debe ser un número")
    // }
    // if (sellPrice < 1) {
    //   throw Error("sellPrice no puede ser menor que 1")
    // }
    // if (typeof rentPrice !== "number") {
    //     throw Error(" El precio de renta debe ser un número")
    // }
    // if (rentPrice < 1) {
    //   throw Error("El precio de renta no puede ser menor que 1")
    // }
    // if (typeof rooms !== "number") {
    //   throw Error("habitación debe ser un número")
    // }
    // if (rooms < 1) {
    //   throw Error("Tiene que tener al menos una habitación")
    // }
    // if (typeof bathrooms !== "number") {
    //   throw Error("baño debe ser un número")
    // }
    // if (bathrooms < 1) {
    //   throw Error("Tiene que tener al menos un baño")
    // }
    // if (typeof coveredArea !== "number") {
    //   throw Error("Area cubierta debe ser un número")
    // }
    // if (coveredArea < 1) {
    //   throw Error("El área cubierta debe ser mayor a 1")
    // }
    // if (typeof totalArea !== "number") {
    //   throw Error("El área total debe ser un número")
    // }
    // if (totalArea < 1) {
    //   throw Error("El área total debe ser mayor a 1")
    // }
    
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
