require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateRegistrationToken = async () => {

  return jwt.sign({
    purpose: 'registration',
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' });
};

module.exports = { generateRegistrationToken };
