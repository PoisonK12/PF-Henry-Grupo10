const { Router } = require("express");
const {
  getReviewHandler,
  getReviewByIdHandler,
  updateReviewHandler,
  reviewDeleteOrBanHandler,
  reviewUserHandler,
} = require("../handlers/reviewHandler");

const reviewsRouter = Router();

reviewsRouter.get("/:id", getReviewByIdHandler);

reviewsRouter.get("/", getReviewHandler);

reviewsRouter.put("/", updateReviewHandler);

// reviewsRouter.post("/assets", reviewAssetsHandler);
reviewsRouter.post("/users", reviewUserHandler);

reviewsRouter.delete("/:id", reviewDeleteOrBanHandler);

module.exports = reviewsRouter;
