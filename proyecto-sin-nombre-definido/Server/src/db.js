const { Sequelize } = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/users");
const RentModel = require("./models/rents");
const AssetModel = require("./models/assets");
const ReviewModel = require("./models/reviews");
const AmenityModel = require("./models/amenities");
const ContactModel = require("./models/contacts");
const AvailabilityModel = require("./models/availability");
<<<<<<< HEAD
=======
// const GoogleUsersModel = require("./models/googleUsers");
>>>>>>> d4a0c5427448e5fe048cc9fdf86a8c233ae5cf94

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/GOAT10`,
  { logging: false }
);

UserModel(sequelize);
RentModel(sequelize);
AssetModel(sequelize);
ReviewModel(sequelize);
AmenityModel(sequelize);
ContactModel(sequelize);
AvailabilityModel(sequelize);
<<<<<<< HEAD
=======
// GoogleUsersModel(sequelize);
>>>>>>> d4a0c5427448e5fe048cc9fdf86a8c233ae5cf94

const { User, Rent, Asset, Review, Contact } = sequelize.models;

User.belongsToMany(Asset, { through: "userAssets" });
Asset.belongsTo(User, { through: "userAssets" });

User.belongsToMany(Rent, { through: "userRents" });
Rent.belongsTo(User, { through: "userRents" });

Asset.belongsToMany(Review, { through: "assetReview" });
Review.belongsTo(Asset, { through: "assetReview" });

User.belongsToMany(Review, { through: "userReview" });
Review.belongsTo(User, { through: "userReview" });

Contact.belongsToMany(User, { through: "userContact" });
User.belongsTo(Contact, { through: "userContact" });

module.exports = {
  sequelize,
  ...sequelize.models,
};
