const { Router } = require("express");
const {
  // deleteRentByIdHandler,
  createRentHandler,
  createBookHandler,
} = require("../handlers/rentHandler");

const rentsRouter = Router();

rentsRouter.post("/create/:id", createRentHandler);
rentsRouter.post("/reserva", createBookHandler);

//rentsRouter.delete("/:id", deleteRentByIdHandler);

module.exports = rentsRouter;
