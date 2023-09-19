const { Router } = require("express");
const {
  // deleteRentByIdHandler,
  createBookHandler,
  deleteBookingHandler,
  createRentHandler,
} = require("../handlers/rentHandler");

const rentsRouter = Router();

rentsRouter.post("/create/:id", createRentHandler);
rentsRouter.post("/reserva", createBookHandler);
rentsRouter.delete("/reserva/:id", deleteBookingHandler);

//rentsRouter.delete("/:id", deleteRentByIdHandler);

module.exports = rentsRouter;
