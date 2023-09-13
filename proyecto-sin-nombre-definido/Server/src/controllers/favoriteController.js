const { User, Asset } = require('../db');


 const updateUserFavorite = async (idUser, idAsset) => {

//     try {
//         const user = await User.findOne({ where: { id: idUser } });
//         const asset = await Asset.findOne({ where: { id: idAsset } });
    
//         // la idea es traer los id de user y asset involucrados
//         // favorites es una propiedad del modelo de User, es un array de strings,
//         // como es un array, la idea era, crear un array nuevo al que le haya pusheado,
//         // todas las assets que estan dentro de los favorites del usuario
//         // y luego reemplazarlo por el favorites que está en el modelo

//         const newFavorite = [];
    
//         newFavorite.push(asset.name);
    
//         await user.update({
//             favorites = newFavorite //??
//         })


//         return updateUserFavorite;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }

}

module.exports = {
    updateUserFavorite,
}