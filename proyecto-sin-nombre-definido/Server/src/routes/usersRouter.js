const { Router } = require("express");
const { isAdmin } = require('../helpers/authMiddleware')
const {
  userPostHandler,
  getUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  userDeleteOrBanHandler,
} = require("../handlers/userHandler");

const usersRouter = Router();

//Solo con privilegios de administrador
// usersRouter.delete("/:id",isAdmin,  userDeleteOrBanHandler);

// usersRouter.get("/",isAdmin, getUserHandler);

usersRouter.delete("/:id", userDeleteOrBanHandler);

usersRouter.get("/", getUserHandler);

//Rutas generales de
usersRouter.put("/", updateUserHandler);

usersRouter.post("/create", userPostHandler);

usersRouter.get("/:id", getUserByIdHandler);


module.exports = usersRouter;