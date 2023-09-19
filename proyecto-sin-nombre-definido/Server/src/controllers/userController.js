const { User } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { generateRegistrationToken } = require("../helpers/token/registerToken");

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
const getAllUserController = async (req) => {
  try {
    const { query } = req;

    const sortMap = {
      userNameAsc: ["userName", "ASC"],
      userNameDesc: ["userName", "DESC"],
      averageScoreAsc: ["averageScore", "ASC"],
      averageScoreDesc: ["averageScore", "DESC"],
    };

    const order = [];
    for (const param in query) {
      if (sortMap[param] && query[param] === "si") {
        order.push(sortMap[param]);
      }
    }
    const search = [];
    for (const param in query) {
      // console.log(query[param]);
      // console.log(param);
      // console.log(query);
      if (param === "search") {
        search.push(query[param]);
      }
    }
    if (order.length === 0) {
      throw new Error(
        "No se proporcionaron parámetros de ordenamiento válidos."
      );
    }

    const response = await User.findAll({
      where: {
        [Op.or]: [
          { userName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      },
      order,
    });

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
    /**Validaciones en el caso de no poder usar zod */
    // if (typeof fullName !== "string") {
    //   throw Error("El fullName de usuario ingresado debe ser un string");
    // }   
    // if (typeof phoneNumber !== "string") {
    //   throw Error("El número de teléfono de usuario ingresado debe ser un string");
    // }
    // if (typeof verificationNumber !== "string") {
    //   throw Error("El número de verificación de usuario ingresado debe ser un string");
    // }
    // if(
    //   gender !== "Male" &&
    //   gender !== "Female" &&
    //   gender !== "agender"
    //   gender !== "No binary"
    // ){
    //   throw Error("El género debe ser Male, Female, agender o No binary");
    // }
    // if (typeof address !== "string") {
    //   throw Error("La dirección de usuario debe ser un string");
    // if(
    //   nationality !== "Argentina" &&
    //   nationality !== "Mexico" &&
    //   nationality !== "Colombia"
    //   nationality !== "Venezuela"
    // ){
    //   throw Error("La nacionalidad debe ser Argentina, Mexico, Colombia o Venezuela");
    // }    
    // }   
    // if (typeof email !== "string") {
    //   throw Error("El email debe tener formato email");
    // }
    // if (typeof password !== "string") {
    //   throw Error("La password de usuario debe ser un string");
    // }
    // if (typeof landlord !== "boolean") {
    //   throw Error("El landlord debe ser un boolean");
    // }
    
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
    /**Validaciones en el caso de no poder usar zod */
    // if (typeof averageScore !== "number") {
    //   throw Error("El averageScore debe ser un número");
    // }
    // if (typeof numberOfReviews !== "number") {
    //   throw Error("El numberOfReviews debe ser un número");
    // }

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

    /**Validaciones en el caso de no poder usar zod */
    // if (!email) {
    //   throw Error ("El email es obligatorio para crear un usuario")
    // }
    // if (typeof userName !== "string") {
    //   throw Error("El nombre de usuario ingresado debe ser un string");
    // }
    // if (typeof fullName !== "string") {
    //   throw Error("El fullName de usuario ingresado debe ser un string");
    // }
    // if (typeof birthDate !== "string") {
    //   throw Error("La fecha de cumpleaños de usuario ingresado debe ser un string");
    // }
    // if (typeof phoneNumber !== "string") {
    //   throw Error("El número de teléfono de usuario ingresado debe ser un string");
    // }
    // if (typeof verificationNumber !== "string") {
    //   throw Error("El número de verificación de usuario ingresado debe ser un string");
    // }
    // if (typeof address !== "string") {
    //   throw Error("La dirección de usuario debe ser un string");
    // }
    // if (typeof email !== "string") {
    //   throw Error("El email de usuario debe ser un string");
    // }
    // if (typeof password !== "string") {
    //   throw Error("La password de usuario debe ser un string");
    // }
    // if(
    //   gender !== "Male" &&
    //   gender !== "Female" &&
    //   gender !== "agender"
    //   gender !== "No binary"
    // ){
    //   throw Error("El género debe ser Male, Female, agender o No binary");
    // }
    // if(
    //   nationality !== "Argentina" &&
    //   nationality !== "Mexico" &&
    //   nationality !== "Colombia"
    //   nationality !== "Venezuela"
    // ){
    //   throw Error("La nacionalidad debe ser Argentina, Mexico, Colombia o Venezuela");
    // }
    // if (typeof landlord !== "boolean") {
    //   throw Error("El landlord debe ser un boolean");
    // }
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

    const registrationToken = await generateRegistrationToken();

    return { success: true, data: createdUser, registrationToken };
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
