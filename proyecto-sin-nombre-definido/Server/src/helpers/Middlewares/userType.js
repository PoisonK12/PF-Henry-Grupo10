const isAdmin = (req, res, next) => {
  if (req.session.userType === "admin") {
    return next();
  }
  res.status(403).send("Acceso denegado para administradores.");
};

const isAdminOrUser = (req, res, next) => {
  if (req.session.userType === "admin" || req.session.userType === "user") {
    return next();
  }
  res.status(403).send("Acceso denegado para esta ruta.");
};

module.exports = { isAdmin, isAdminOrUser };