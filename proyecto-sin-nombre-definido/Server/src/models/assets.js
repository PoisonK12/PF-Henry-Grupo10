const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Asset",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      country: {
        type :DataTypes.STRING,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
      },
      onSale: {
        type: DataTypes.BOOLEAN,
      },
      sellPrice: {
        type: DataTypes.INTEGER,
      },
      rentPrice: {
        type: DataTypes.INTEGER,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bathrooms: {
        type: DataTypes.INTEGER,
      },
      reviews: {
        type: DataTypes.JSON
      },
      nearby: {
        type: DataTypes.JSON
      },
      nearbyScore: {
        type: DataTypes.INTEGER
      },
      coveredArea: {
        type: DataTypes.FLOAT
      },
      totalArea: {
        type: DataTypes.FLOAT
      }
    },
    { timestamps: false }
  );
};