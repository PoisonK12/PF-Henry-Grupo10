const {Router} = require('express')

const propertyRouter = Router()

propertyRouter.get('/', (req, res) => {
  res.status(200).send("Estoy trayendo todas las propiedades");
});

propertyRouter.get('/:id', (req, res) => {
  res.status(200).send("Trayendo propiedades por id");
});

propertyRouter.put('/:id', (req, res) => {
  res.status(200).send("Estoy modificando una propiedad existente");
});

propertyRouter.post('/', (req, res) => {
  res.status(200).send("Estoy creando una nueva propiedad");
});

propertyRouter.delete('/:id', (req, res) => {
  res.status(200).send("Estoy eliminando una propiedad");
})

module.exports = propertyRouter;