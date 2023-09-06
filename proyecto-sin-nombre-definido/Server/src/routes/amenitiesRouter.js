const { Router } = require("express");

const {
  getAllAmenitiesHandler,
  getAmenitiesByIdHandler,
} = require("../handlers/amenitiesHandler");

const amenitiesRouter = Router();

amenitiesRouter.get("/", getAllAmenitiesHandler);
amenitiesRouter.get("/:id", getAmenitiesByIdHandler);

module.exports = amenitiesRouter;
//