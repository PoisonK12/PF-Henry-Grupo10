const { Sequelize } = require('sequelize')
require("dotenv").config();

const UserModel = require('./models/users')
const RentModel = require('./models/rents')
const AssetModel = require('./models/assets')

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/GOAT10`, { logging: false })

UserModel(sequelize);
RentModel(sequelize);
AssetModel(sequelize);

const { User, Rent, Asset, Amenity } = sequelize.models

User.hasMany(Asset, { through: 'userAssets' })
Asset.belongsTo(User, { through: 'userAssets' })

User.hasMany(Rent, { through: 'userRents' })
Rent.belongsTo(User, { through: 'userRents' })

Asset.hasMany(Amenity, { through: 'assetAmenities' })
Amenity.hasMany(Asset, { through: 'assetAmenities' })

module.exports = { sequelize }