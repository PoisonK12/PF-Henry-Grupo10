// const {createUserController} = require("../controllers/createUserController");

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
    landlord    
   } = req.body

   try {
     const user = await createUserController(
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
     )
    res.status(200).json("Usuario creado con exito!")
   } catch (error) {
    console.log(error)
    res.status(404).json("Error en la creacion del usuario!")
   }
}

const getUserHandler = async (req, res) => {
  const { id } = req.params
  
  try {
    const user = id ? await getUserByIdController(id) : getAllUserController()
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(404).json("Error encontrando el usuario!")  
  }
}

const userPutHandler = async (req, res) => {
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
  } = req.body

  try {
    await userEditController(
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
    )
    res.status(200).json("Usuario editado con exito!")
  } catch (error) {
    console.log(error)
    res.status(404).json("Error editando el usuario!")  
  }
}

const userDeleteOrBanHandler = async (req, res) => {
  const { id } = req.params
  //por seguridad hay que modificarlo para recibirlo por body
  try {
  await deleteUserById(id);

    res.status(200).json(`El usuario fue eliminada`);
  } catch (error) {
    console.log(error)
    res.status(404).json("Error eliminando el usuario!")
  }
}


module.exports = {
  userPostHandler,
  getUserHandler,
  userPutHandler,
  userDeleteOrBanHandler
};