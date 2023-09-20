const { Sequelize } = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/users");
const RentModel = require("./models/rents");
const AssetModel = require("./models/assets");
const ReviewModel = require("./models/reviews");
const AmenityModel = require("./models/amenities");
const ContactModel = require("./models/contacts");
const AvailabilityModel = require("./models/availability");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgresql://postgres:078ntp8pGH28rcJaDiA4@containers-us-west-123.railway.app:5720/railway`,
  { logging: false }
);

UserModel(sequelize);
RentModel(sequelize);
AssetModel(sequelize);
ReviewModel(sequelize);
AmenityModel(sequelize);
ContactModel(sequelize);
AvailabilityModel(sequelize);

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
