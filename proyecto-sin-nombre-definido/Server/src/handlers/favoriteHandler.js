const {
    userAddFavorite,
    userRemoveFavorite,
    userAllFavorites
} = require("../controllers/favoriteController");

const updateFavoriteHandler = async (req, res) => {
    const { userId, assetId } = req.body;
    try {
        const response = await userAddFavorite(userId, assetId);
        res.status(200).json(response)
        // res.status(200).json("La propiedad se agregó a favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const removeFavoriteHandler = async (req, res) => {
    const { userId, assetId } = req.body;
    try {
        const response = await userRemoveFavorite(userId,assetId);
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const getAllFavoriteHandler = async (req, res) => {
    const { userId } = req.query
    console.log(userId)
    // 1448ef28-59a7-4e5e-9777-47b84e48ad7e
    try {
        const response = await userAllFavorites(userId);
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