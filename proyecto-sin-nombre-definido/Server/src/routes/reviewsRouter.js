const { Router } = require("express");
const {
  getReviewHandler,
  getReviewByIdHandler,
  updateReviewHandler,
  reviewDeleteOrBanHandler,
  reviewUserHandler,
  reviewAssetHandler,
} = require("../handlers/reviewHandler");

const reviewsRouter = Router();

reviewsRouter.get("/:id", getReviewByIdHandler);

reviewsRouter.get("/", getReviewHandler);

reviewsRouter.put("/", updateReviewHandler);

reviewsRouter.put("/assets", reviewAssetHandler);

reviewsRouter.put("/users", reviewUserHandler);

reviewsRouter.delete("/:id", reviewDeleteOrBanHandler);

module.exports = reviewsRouter;
