const { Router } = require("express");
const { isAdmin } = require('../helpers/authMiddleware')
const {
  userPostHandler,
  getUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  userDeleteOrBanHandler,
  restoreUserByIdHandler,
  softDeleteUserByIdHandler
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

usersRouter.delete("/delete/:id", softDeleteUserByIdHandler);

usersRouter.get("/restore/:id", restoreUserByIdHandler);


module.exports = usersRouter;