const {
    userAddFavorite,
    userRemoveFavorite,
    userAllFavorites
} = require("../controllers/favoriteController");

const updateFavoriteHandler = async (req, res) => {
    const { userId, assetId } = req.body;
    try {
        await userAddFavorite(userId,assetId);
        res.status(200).json("La propiedad se agregó a favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const removeFavoriteHandler = async (req, res) => {
    const { userId, assetId } = req.body;
    try {
        await userRemoveFavorite(userId,assetId);
        res.status(200).json("La propiedad se eliminó de favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const getAllFavoriteHandler = async (req, res) => {
    const {userId} = req.params
    try {
        const response = await userAllFavorites(userId,assetId);
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    updateFavoriteHandler,
    removeFavoriteHandler,
    getAllFavoriteHandler
}