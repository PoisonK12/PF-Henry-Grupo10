const { encrypt, compare } = require('../handlers/handleBcrypt');
const {tokenSign} = require('../helpers/generateToken')
const { User } = require('../db');
const {tokenSign} = require('../helpers/generateToken')

// const registerCtrl = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     const passwordHash = await encrypt(password);
//     const registerUser = await User.create({
//       email,
//       name,
//       password: passwordHash,
//     });

//     res.send({ data: registerUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message }); 
//   }
// };

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' }); 
    }
    const checkedPassword = await compare(password, user.password);
    if (checkedPassword) {
      const tokenSession = await tokenSign(user); 
      res.send({
        data: user,
        token: tokenSession,
      });
    } else {
      res.status(503).json({ msg: 'Error' }); // 
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};


module.exports = {registerCtrl, loginCtrl}