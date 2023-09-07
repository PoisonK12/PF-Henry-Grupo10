const { User } = require("../db");
const { Op, Sequelize } = require("sequelize");

const getUserByIdController = async (id) => {
  try {
    console.log(id)
    const response = await User.findOne({ where: { id: id } });
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
};
//!------------------------------------------------------------------------
const getAllUserController = async () => {
  try {
    const response = await User.findAll();

    if (response.length === 0) {
      throw new Error("No hay usuarios registrados!");
    }
    return response;
  } catch (error) {
    console.log(error)
    throw error
  }
};

//!------------------------------------------------------------------------
const updateUser = async (
  {userName,
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
  numberOfReviews,
  favorites,
  history}
) => { 
  try {

      const updateUser = await User.findOne({
      where: { userName: userName },
    });

    await updateUser.update({
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
      numberOfReviews,
      favorites,
      history,
    });
  
    return updateUser;
} catch (error) {
  console.log(error)
  throw error
}
};

//!------------------------------------------------------------------------
const createUserController = async (
  {userName,
  fullName,
  birthDate,
  phoneNumber,
  verificationNumber,
  profilePic,
  gender,
  address,
  nationality,
  email,
  password,
  landlord,}
) => {
  try {
        
    const [createdUser, created] = await User.findOrCreate({
      where: { userName },
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
        landlord,
      },
    });

     if (!created) {
      // El nombre de usuario ya existe, debes manejarlo adecuadamente
      return `El nombre de usuario ${userName} ya existe.`;
    }

    return `Exito al crear el usuario ${userName}`;
  } catch (error) {
    console.error(error);
    throw error
  }
};

const deleteUserById = async (id) => {
  try {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  await user.destroy();

  return "Usuario eliminado con exito";
} catch (error) {
  console.log(error)
  throw error
}
};

module.exports = {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser,
};
