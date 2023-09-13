const {
    updateUserFavorite,
} = require("../controllers/favoriteController");

const updateFavoriteHandler = async (req, res) => {
    const { idUser, idAsset } = req.params;
    const {
        favorites,
    } = req.body;

    try {
        await updateUserFavorite(
            favorites
        );
        res.status(200).json(`La propiedad ${idAsset} se agregó a favoritos del user ${idUser} `)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteFavoriteHandler = async (req, res) => {
    
}
const getAllFavoriteHandler = async (req, res) => {
    
}

module.exports = {
    updateFavoriteHandler,
    deleteFavoriteHandler,
    getAllFavoriteHandler
}