const isAdmin = (req, res, next) => {
  if (req.session.userType === "admin") {
    // if (req.session.userType === "*") {
    return next();
  }
  res.status(403).send("Acceso denegado.");
};

module.exports = { isAdmin };
