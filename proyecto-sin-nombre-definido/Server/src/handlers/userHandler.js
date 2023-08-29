

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
    review,
    landlord,
    favorites,
    history
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
    review,
    landlord,
    favorites,
    history)
    
    res.status(200).json("Usuario creado con exito!")

   } catch (error) {
    console.log(error)
    res.status(404).json("Error en la creacion del usuario!")
   }
}

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params
  
  try {
    const user = await getUserByIdController 

    
  } catch (error) {
    console.log(error)
    res.status(404).json("Error encontrando el usuario!")  
  }
}

const userPutHandler = async (req, res) => {}

const userDeleteOrBanHandler = async (req, res) => {}


module.exports = {
  userPostHandler,
  userByIdHandler,
  userPutHandler,
  userDeleteOrBanHandler
};