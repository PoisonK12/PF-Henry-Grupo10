const userSchemePost = require("../helpers/userValidation.ts");
const { encrypt } = require('../handlers/handleBcrypt.js');
const { dataSchemePost } = require("../helpers/userValidation.ts");
const {
  getUserByIdController,
  getAllUserController,
  deleteUserById,
  createUserController,
  updateUser,
} = require("../controllers/userController");

const getUserByIdHandler = async (req, res) => {
  try {
    const response = await getUserByIdController(req);
    res.status(200).json(response);
  } catch (error) {
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
    userType
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

    const passwordHash = await encrypt(password)
    
    const user = await createUserController(
      {userName,
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
      userType
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({error: error.message});
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await getAllUserController();
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
    averageScore,
    favorites,
    history,
  } = req.body;

  try {
    await updateUser(
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
      history
    );
    res.status(200).json("Usuario editado con exito!");
  } catch (error) {
    console.log(error);
    res.status(404).json("Error editando el usuario!");
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

module.exports = {
  userPostHandler,
  getUserHandler,
  updateUserHandler,
  userDeleteOrBanHandler,
  getUserByIdHandler,
};
