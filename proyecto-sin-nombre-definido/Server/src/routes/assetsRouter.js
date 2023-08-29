const { Router } = require("express");

const assetsRouter = Router();

assetsRouter.get("/", (req, res) => {
  res.status(200).send("Estoy trayendo todas las propiedades");
});

assetsRouter.get("/:id", (req, res) => {
  res.status(200).send("Trayendo propiedades por id");
});

assetsRouter.put("/", (req, res) => {
  res.status(200).send("Estoy modificando una propiedad existente");
});

assetsRouter.post("/", (req, res) => {
  res.status(200).send("Estoy creando una nueva propiedad");
});

assetsRouter.delete("/:id", (req, res) => {
  res.status(200).send("Estoy eliminando una propiedad");
});

module.exports = assetsRouter;
