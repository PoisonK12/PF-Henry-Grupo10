const { Router } = require("express");
const {
  userPostHandler,
  getUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  userDeleteOrBanHandler,
} = require("../handlers/userHandler");

const usersRouter = Router();

usersRouter.get("/:id", getUserByIdHandler);

usersRouter.get("/", getUserHandler);

usersRouter.put("/", updateUserHandler);

usersRouter.post("/create", userPostHandler);

usersRouter.delete("/:id", userDeleteOrBanHandler);

module.exports = usersRouter;
