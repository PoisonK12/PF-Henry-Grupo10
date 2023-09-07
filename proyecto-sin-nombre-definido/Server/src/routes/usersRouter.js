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


usersRouter.get("/", getUserHandler);

usersRouter.get("/:id", getUserByIdHandler);

usersRouter.post("/create", userPostHandler);

usersRouter.put("/", updateUserHandler);

usersRouter.delete("/:id", userDeleteOrBanHandler);


module.exports = usersRouter;