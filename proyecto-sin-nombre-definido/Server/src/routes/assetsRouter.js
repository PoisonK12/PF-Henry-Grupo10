const { Router } = require("express");
const {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler
} = require("../handlers/assetHandler");

const assetsRouter = Router();

assetsRouter.get("/", getAllAssetsHandler);

assetsRouter.get("/location", getAllLocationsHandler);

assetsRouter.get("/:id", getAssetByIdHandler);

assetsRouter.put("/:id", updateAssetHandler);

assetsRouter.post("/create", createAssetHandler);

assetsRouter.delete("/delete/:id", deleteAssetByIdHandler);

module.exports = assetsRouter;
