/*
const { User } = require("../db")


// createUserController es una funcion, le paso los parametros que traje del  body en la ruta

const createUserController = async (
    userName,
    fullName,
    profilePic,
    birthDate,
    phoneNumber,
    verificationNumber,
    gender,
    address,
    nationality,
    email,
    password,
    review,
    landLord,
    favorites,
    history,
    asset // esto seria para poder relacionar user con asset
) => {
    // esto es para verificar si en User encuentra algun usuario que tenga el mismo nombre que el que estoy creando
    const existingUser = await User.findOne({ where: { userName } });
    //si es asi, lanza error "Usuario ya existe"
    if (existingUser) {
      throw new Error("Usuario ya existe");
    }
    // si falta algun dato : indica "datos incompletos" , son los que en el modelo figuran allownull: false // error de tipeo es: landLord y NO es landlord
    if( !userName ||!fullName || !birthDate || !verificationNumber || !phoneNumber || !gender || !address ||!nationality || !email || !password || !landLord || !favorites ||!history )
    throw Error("datos incompletos");
 


    // aca creamos con los datos indicados el nuevo usuario y lo guardamos en newUser
    const newUser = await User.create({
        userName,
        fullName,
        profilePic,
        birthDate,
        phoneNumber,
        verificationNumber,
        gender,
        address,
        nationality,
        email,
        password,
        review,
        landLord,
        favorites,
        history,
        asset
    });
    // aca seteamos asset
    await newUser.setUser(asset);
    // devuelvo newUser 
    return newUser;
};
  
module.exports = {
    createUserController,
       
    
}
*/