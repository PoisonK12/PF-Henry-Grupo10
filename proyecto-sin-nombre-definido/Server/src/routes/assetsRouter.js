const { Router } = require("express");
const {
  deleteAssetByIdHandler,
  getAllAssetsHandler,
  createAssetHandler,
  getAssetByIdHandler,
  updateAssetHandler,
  getAllLocationsHandler,
  getAmenitiesHandler,
  getAdminAssetsHandler,
  restoreAssetByIdHandler,
  softDeleteAssetByIdHandler,
  getAssetsFromUserHandler,
} = require("../handlers/assetHandler");

const assetsRouter = Router();
//Todas las propiedades para menu de admin
assetsRouter.get("/", getAllAssetsHandler);

//Lista de todos los lugares donde hay registradas propiedades
assetsRouter.get("/location", getAllLocationsHandler);

//Listado de todas las amenities disponibles para utilizar
assetsRouter.get("/amenities", getAmenitiesHandler);

//Trae todos los asset existentes para mostrar en panel de administrador
assetsRouter.get("/admin", getAdminAssetsHandler);

//Traigo una propiedad en especifico para mostrar en el detail
assetsRouter.get("/:id", getAssetByIdHandler);

//Traigo todos los asset del usuario para mostrar en su perfil
assetsRouter.get("/myassets/:id", getAssetsFromUserHandler);

//Creacion de asset
assetsRouter.post("/create", createAssetHandler);

//Edicion de perfil de usuario
assetsRouter.put("/:id", updateAssetHandler);

//Destruir asset 
assetsRouter.delete("/:id", deleteAssetByIdHandler);

//Pausar propiedad
assetsRouter.delete("/delete/:id", softDeleteAssetByIdHandler);

//Restaurar propiedad 
assetsRouter.get("/restore/:id", restoreAssetByIdHandler);

module.exports = assetsRouter;
