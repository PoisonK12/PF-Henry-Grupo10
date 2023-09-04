const { User} = require("../db");
const { Op, Sequelize } = require("sequelize");



const getUserByIdController = async (req) => {
   const { id } = req.query;
try {
  const assets = await Asset.findOne({where: {id : id}});
  
  return assets;

} catch (error) {
  console.log(error)
 throw new Error ("Error en el getUserByIdController")
}
  
};
//!------------------------------------------------------------------------
const getAllUserController = async () => {
 try {
  const users = await User.findAll()

  if (users.length === 0) {
    throw new Error("No hay usuarios registrados!");
  }
  return users;

 } catch (error) {
  console.log(error)
 throw new Error ("Error en el getAllUserController")
 }
}

//!------------------------------------------------------------------------
const updateUser = async (
  userName,
  //edicion por usuario
  fullName,
  profilePic,
  phoneNumber,
  verificationNumber,
  gender,
  address,
  nationality,
  email,
  password,
  landlord,
  //edicion por sistema
  averageScore,
  favorites,
  history,
) => {
  const updateAsset = await Asset.findOne({
    where: { userName: userName },
  });
  await updateAsset.update({
    //edicion por usuario
  fullName,
  profilePic,
  phoneNumber,
  verificationNumber,
  gender,
  address,
  nationality,
  email,
  password,
  landlord,
  //edicion por sistema
  averageScore,
  favorites,
  history,
  });
  
  return updateAsset;
};

//!------------------------------------------------------------------------
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
      landlord
) => {
  try {
    if (
      !userName ||
      !fullName ||
      !birthDate ||
      !phoneNumber ||
      !gender ||
      !address ||
      !nationality ||
      !email ||
      !password ||
      !landlord
    ) {return res.status(400).json({ error: "Falta informacion obligatoria" })}
    
    const [createdUser, created] = await User.findOrCreate({
      where:{userName},
      defaults: {
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
        landlord
      }
    })
    if(!created)
    {return res.status(400).json({error: "El nombre de usuario ya existe."})}
    
    return res.status(200).json(`Exito al crear el usuario ${userName}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error en createUserController");
  }
};

const deleteUserById = async (id) => {
  //TODO agregar borrado logico
  const asset = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!asset) {
    throw new Error("Usuario no encontrado");
  }
  await asset.destroy();

  return "Usuario eliminado con exito";
};



module.exports = {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser
};
