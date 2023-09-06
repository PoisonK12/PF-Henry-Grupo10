const { User } = require("../db");
const { Op, Sequelize } = require("sequelize");

const getUserByIdController = async (req) => {
  const { id } = req.query;
  try {
    const response = await User.findOne({ where: { id: id } });

    return response;
  } catch (error) {
    console.error(error.message);
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
    console.error(error.message);
  }
};

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
  numberOfReviews,
  favorites,
  history
) => {
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
    favorites,
    history,
  });

  return updateUser;
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
    ) {
      return res.status(400).json({ error: "Falta informacion obligatoria" });
    }

    //! validacion
    //! hash
    password = hash(password);

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
      return res.status(400).json({ error: "El nombre de usuario ya existe." });
    }

    return res.status(200).json(`Exito al crear el usuario ${userName}`);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteUserById = async (id) => {
  //TODO agregar borrado logico
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
};

module.exports = {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser,
};
