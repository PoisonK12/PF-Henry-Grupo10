const {Router} = require('express')

const ownerRouter = Router();

ownerRouter.get('/:id', (req, res) => {
  res.status(200).send("trae una cuenta de propietario");
});

ownerRouter.put('/:id', (req, res) => {
  res.status(200).send("modificar una cuenta de propietario");
});

ownerRouter.post('/', (req, res) => {
  res.status(200).send("crear una nueva cuenta de propietario");
});

ownerRouter.delete('/:id', (req, res) => {
  res.status(200).send("eliminar cuenta de propietario");
})

module.exports = ownerRouter;