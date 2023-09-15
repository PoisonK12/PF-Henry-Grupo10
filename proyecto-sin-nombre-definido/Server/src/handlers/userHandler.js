const { encrypt } = require("../handlers/handleBcrypt.js");
const { userSchemePost } = require("../helpers/validations/userValidation.js");
const {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser,
  softDeleteUserById,
  restoreUserById,
} = require("../controllers/userController");

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserByIdController(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: message.error });
  }
};

const userPostHandler = async (req, res) => {
  const {
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
    landlord,
    userType,
  } = req.body;

  try {
    // const validData = userSchemePost.parse({
    //   body: {
    //     userName,
    //     fullName,
    //     birthDate,
    //     phoneNumber,
    //     verificationNumber,
    //     profilePic,
    //     gender,
    //     address,
    //     nationality,
    //     email,
    //     password,
    //     landlord,
    //   },
    // });

    const passwordHash = await encrypt(password);

    const user = await createUserController({
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
      password: passwordHash,
      landlord,
      userType,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await getAllUserController(req);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json("Error encontrando el usuario!");
  }
};

const updateUserHandler = async (req, res) => {
  const {
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
    userType,
    averageScore,
    numberOfReviews,
    favorites,
    history,
  } = req.body;

  try {
    if(password){
      password = await encrypt(password);
    }

    const response = await updateUser({
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
      userType,
      averageScore,
      numberOfReviews,
      favorites,
      history,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(404).json({ error: error.message });
    // res.status(404).json("Error editando el usuario!");
  }
};

const userDeleteOrBanHandler = async (req, res) => {
  const { id } = req.params;
  //por seguridad hay que modificarlo para recibirlo por body
  try {
    await deleteUserById(id);

    res.status(200).json(`El usuario fue eliminada`);
  } catch (error) {
    console.log(error);
    res.status(404).json("Error eliminando el usuario!");
  }
};

const softDeleteUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await softDeleteUserById(id);
    res.status(200).json(`La propiedad fue eliminada`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const restoreUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await restoreUserById(id);
    res.status(200).json(`La propiedad fue restaurada`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userPostHandler,
  getUserHandler,
  updateUserHandler,
  userDeleteOrBanHandler,
  getUserByIdHandler,
  softDeleteUserByIdHandler,
  restoreUserByIdHandler,
};
