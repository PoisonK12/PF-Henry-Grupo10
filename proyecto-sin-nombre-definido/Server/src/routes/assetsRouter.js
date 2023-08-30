const { Router } = require("express");
const {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
} = require("../handlers/assetHandler");

const assetsRouter = Router();

assetsRouter.get("/", getAllAssetsHandler);

assetsRouter.get("/:id", getAssetByIdHandler);

assetsRouter.put("/edit", updateAssetHandler);

assetsRouter.post("/create", createAssetHandler);

assetsRouter.delete("/delete/:id", deleteAssetByIdHandler);

module.exports = assetsRouter;
