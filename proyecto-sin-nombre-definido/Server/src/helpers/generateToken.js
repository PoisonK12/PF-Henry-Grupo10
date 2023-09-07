const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
  return jwt.sign({
    _id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' });
};

module.exports = { tokenSign };
