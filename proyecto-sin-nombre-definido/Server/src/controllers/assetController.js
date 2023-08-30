const { Asset, Amenity } = require("../db");
const { Op } = require("sequelize");


// Trae todas las propiedades y paginado
const getAllAssets = async () => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
<<<<<<< HEAD
    page = pageAsNumber;
=======
    page = pageAsNumber
>>>>>>> e4df15980971f826ad5efbe72b56e2c3833692b3
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
<<<<<<< HEAD
      through: { attribute: [] },
    },
  });
  return asset;
};
=======
      through: { attribute: [] }
    }
  })
  return asset
}

// Modifica las propiedades de una propiedad
const updateAsset = async ()
>>>>>>> e4df15980971f826ad5efbe72b56e2c3833692b3
