const { encrypt, compare } = require('../handlers/handleBcrypt')
const { User } = require('../db')

const registerCtrl = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const passwordHash = await encrypt(password)
    const registerUser = await userModel.create({
      email,
      name,
      password: passwordHash
    })

    res.send({ data: registerUser })
  } catch (error) {

  }
}