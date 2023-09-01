const { Sequelize } = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/users");
const RentModel = require("./models/rents");
const AssetModel = require("./models/assets");
const AmenityModel = require("./models/amenities");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// console.log(DB_HOST);
// console.log(DB_PASSWORD);
// console.log(DB_USER);
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/GOAT10`,
  { logging: false }
);

UserModel(sequelize);
RentModel(sequelize);
AssetModel(sequelize);
AmenityModel(sequelize);

const { User, Rent, Asset, Amenity } = sequelize.models;

User.belongsToMany(Asset, { through: "userAssets" });
Asset.belongsTo(User, { through: "userAssets" });

User.belongsToMany(Rent, { through: "userRents" });
Rent.belongsTo(User, { through: "userRents" });

Asset.belongsToMany(Amenity, { through: "assetAmenities" });
Amenity.belongsToMany(Asset, { through: "assetAmenities" });

module.exports = {
  sequelize,
  ...sequelize.models,
};
