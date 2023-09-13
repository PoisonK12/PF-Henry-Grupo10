const { Router } = require("express");
const {
    
   updateFavoriteHandler,
   deleteFavoriteHandler,
   getAllFavoriteHandler
} = require("../handlers/favoriteHandler");

const favoritesRouter = Router();

favoritesRouter.put("/like", updateFavoriteHandler);
favoritesRouter.delete("/unlike", deleteFavoriteHandler);
favoritesRouter.get("/", getAllFavoriteHandler);


module.exports = favoritesRouter;
