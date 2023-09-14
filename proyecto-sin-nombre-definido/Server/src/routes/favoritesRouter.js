const { Router } = require("express");
const {
    
   updateFavoriteHandler,
   removeFavoriteHandler,
   getAllFavoriteHandler
} = require("../handlers/favoriteHandler");

const favoritesRouter = Router();

favoritesRouter.put("/like", updateFavoriteHandler);
favoritesRouter.put("/unlike", removeFavoriteHandler);
favoritesRouter.get("/", getAllFavoriteHandler);


module.exports = favoritesRouter;
