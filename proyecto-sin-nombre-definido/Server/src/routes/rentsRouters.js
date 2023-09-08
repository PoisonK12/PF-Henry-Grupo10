const { Router } = require("express");
const {
  deleteRentByIdHandler,
  createRentHandler
} = require("../handlers/assetHandler");

const rentsRouter = Router();


rentsRouter.post("/create", createRentHandler);

rentsRouter.delete("/:id", deleteRentByIdHandler);

module.exports = rentsRouter;
