const { Router } = require("express");
const {
  reviewPostHandler,
  getReviewHandler,
  getReviewByIdHandler,
  updateReviewHandler,
  reviewDeleteOrBanHandler,
} = require("../handlers/reviewHandler");

const usersRouter = Router();

usersRouter.get("/:id", getReviewByIdHandler);

usersRouter.get("/", getReviewHandler);

usersRouter.put("/", updateReviewHandler);

usersRouter.post("/", reviewPostHandler);

usersRouter.delete("/:id", reviewDeleteOrBanHandler);

module.exports = usersRouter;
