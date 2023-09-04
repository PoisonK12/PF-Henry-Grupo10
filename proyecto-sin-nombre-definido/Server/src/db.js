const { Sequelize } = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/users");
const RentModel = require("./models/rents");
const AssetModel = require("./models/assets");
const ReviewModel = require("./models/reviews");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
console.log(DB_HOST);
console.log(DB_PASSWORD);
console.log(DB_USER);
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/GOAT10`,
  { logging: false }
);

UserModel(sequelize);
RentModel(sequelize);
AssetModel(sequelize);
ReviewModel(sequelize);

const { User, Rent, Asset, Review } = sequelize.models;

User.belongsToMany(Asset, { through: "userAssets", foreignKey: 'userId' });
Asset.belongsTo(User, { through: "userAssets" ,foreignKey: 'assetId' });

User.belongsToMany(Rent, { through: "userRents" });
Rent.belongsTo(User, { through: "userRents" });

Asset.belongsToMany(Review, { through: "assetReview"});
Review.belongsTo(Asset, { through: "assetReview" });

User.belongsToMany(Review, { through: "userReview"});
Review.belongsTo(User, { through: "userReview" });

module.exports = {
  sequelize,
  ...sequelize.models,
};
