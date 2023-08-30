const { Asset, Amenity } = require('../db')
const { Op } = require('sequelize')

const getAllAssets = async () => {

  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber
  }

  const assets = await Asset.findAndCountAll({
    limit: size,
    offset: page * size
  })
  return assets
}

const getAssetById = async (id) => {
  const asset = await Asset.findOne({
    where: {
      id: id
    },
    include: {
      model: Amenity,
      through: {attribute: []}
    }
  })
  return asset
}