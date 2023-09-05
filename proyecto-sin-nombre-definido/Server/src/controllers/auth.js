const { encrypt, compare } = require('../handlers/handleBcrypt');
const { tokenSign } = require('../helpers/generateToken')
const { User } = require('../db');

const registerCtrl = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const passwordHash = await encrypt(password);
    const registerUser = await User.create({
      email,
      name,
      password: passwordHash,
    });

    res.send({ data: registerUser });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, msg: 'Correo electrónico no válido' });
    }
    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      const tokenSession = await tokenSign(user);
      res.status(200).json({ success: true, data: user, token: tokenSession });
    } else {
      res.status(401).json({ success: false, msg: 'Contraseña incorrecta' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = { registerCtrl, loginCtrl }