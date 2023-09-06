const { Router } = require("express");
const {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler,
  getAmenitiesHandler,
  getAllButAllAssetsHandler,
  getAllAssetsWithAmenitiesHandler,
  restoreAssetByIdHandler,
  softDeleteAssetByIdHandler
} = require("../handlers/assetHandler");

const assetsRouter = Router();

assetsRouter.get("/", getAllAssetsHandler);

assetsRouter.get("/location", getAllLocationsHandler);

//! Temporal, hay que desarrollar el CRUD completo de amenities
assetsRouter.get("/amenities", getAmenitiesHandler);

assetsRouter.get("/filtroporamenities", getAllAssetsWithAmenitiesHandler);

assetsRouter.get("/admin",getAllButAllAssetsHandler);

assetsRouter.get("/:id", getAssetByIdHandler);

assetsRouter.put("/:id", updateAssetHandler);

assetsRouter.post("/create", createAssetHandler);

assetsRouter.delete("/:id", deleteAssetByIdHandler);

assetsRouter.delete("/delete/:id", softDeleteAssetByIdHandler);

assetsRouter.get("/restore/:id", restoreAssetByIdHandler);

module.exports = assetsRouter;
