const { User, Asset } = require('../db');


 const userAddFavorite = async (userId, assetId) => {
    try {
        const user = await User.findByPk(userId);
        if(!user){ throw new Error ("Usuario no encontrado")}
        const asset = await Asset.findByPk(assetId);
        if(!asset){ throw new Error ("Propiedad no encontrada")}
    
        const newFavorite = [...user.favorites];
        newFavorite.push(assetId);
    
        await User.update({favorites : newFavorite})
        return "Updated succesfuly"
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const userRemoveFavorite = async (userId, assetId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const favoriteIndex = user.favorites.indexOf(assetId);
        if (favoriteIndex === -1) {
            return "El asset no está en la lista de favoritos del usuario.";
        }

        const newFavorites = [...user.favorites];
        newFavorites.splice(favoriteIndex, 1);

        await user.update({ favorites: newFavorites });
        return "Eliminado exitosamente de la lista de favoritos.";
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const userAllFavorites = async (userId) => {
    try {
        const {user} = User.findByPk(userId)
        if(!user){ throw new Error("Usuario no encontrado") }
        return user.favorites
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    userAddFavorite,
    userRemoveFavorite,
    userAllFavorites
}