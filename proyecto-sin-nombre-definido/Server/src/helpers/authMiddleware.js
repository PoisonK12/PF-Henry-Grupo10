const isAdmin = (req, res, next) => {
  if (req.session.userType === 'admin') {
    return next();
  }
  res.status(403).send('Acceso denegado.');
}

module.exports = { isAdmin };