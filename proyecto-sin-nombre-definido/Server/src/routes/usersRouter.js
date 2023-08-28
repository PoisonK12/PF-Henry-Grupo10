const {Router} = require('express')

const usersRouter = Router();

usersRouter.get('/:id', (req, res) => {
  res.status(200).send("Estoy trayendo una cuenta");
});

usersRouter.put('/:id', (req, res) => {
  res.status(200).send("Estoy modificando un usuario")
});

usersRouter.post('/', (req, res) => {
  res.status(200).send("Estoy creando una cuenta nueva");
});

usersRouter.delete('/:id', (req, res) => {
  res.status(200).send("Estoy eliminando una cuenta");
})

module.exports = usersRouter;