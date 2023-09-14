const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Availability",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      assetId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      dates: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY),
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.ENUM("Disponible", "Reservada", "Indispuesta"),
        allowNull: false,
        defaultValue: "Disponible",
      },
      expirationTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
