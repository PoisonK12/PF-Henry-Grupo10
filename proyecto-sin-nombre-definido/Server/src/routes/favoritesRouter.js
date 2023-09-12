const { Router } = require("express");
const {
    
    createFavoriteHandler,
    deleteFavoriteHandler,
    getAllFavoriteHandler
} = require("../handlers/favoriteHandler");

const favoritesRouter = Router();

favoritesRouter.post("/like", createFavoriteHandler);
favoritesRouter.delete("/unlike", deleteFavoriteHandler);
favoritesRouter.get("/", getAllFavoriteHandler);


module.exports = favoritesRouter;
