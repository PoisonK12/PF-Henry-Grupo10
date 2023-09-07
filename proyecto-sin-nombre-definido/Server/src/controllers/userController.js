const { User } = require("../db");
const { Op, Sequelize } = require("sequelize");

// Método para soft delete
//(delete) http://localhost:3001/users/id
User.prototype.softDelete = function () {
  return this.update({ hide: true });
};

// Método para restaurar
//http://localhost:3001/users/restore/id
User.prototype.restore = function () {
  return this.update({ hide: false });
};
//!-----------------------------------------------------------------------
const getUserByIdController = async (id) => {
  try {
    const response = await User.findOne({ where: { id: id } });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
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
    console.log(error);
    throw error;
  }
};

//!------------------------------------------------------------------------
const updateUser = async ({
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
  history,
}) => {
  try {
    const updateUser = await User.findOne({
      where: { userName: userName },
    });
    console.log(userName);
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
    console.log(error);
    throw error;
  }
};
const updateReviewUser = async (id, averageScore, numberOfReviews) => {
  try {
    const updateReviewUser = await User.findOne({
      where: { id: id },
    });
    console.log(updateReviewUser);
    await updateReviewUser.update({
      averageScore,
      numberOfReviews,
    });

    return updateReviewUser;
  } catch (error) {
    throw error;
  }
};

//!------------------------------------------------------------------------
const createUserController = async ({
  userName,
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
  landlord,
}) => {
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
    throw error;
  }
};

const softDeleteUserById = async (id) => {
  //Borrado logico añadido
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await user.softDelete();

  return "User deleted successfully";
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

    return "Usuario eliminado (permanentemente) con exito";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const restoreUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  await user.restore();

  return "User restored successfully";
};

module.exports = {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser,
  updateReviewUser,
  restoreUserById,
  softDeleteUserById,
};
