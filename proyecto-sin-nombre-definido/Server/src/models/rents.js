const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Rent",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      onSale: {
        type: DataTypes.BOOLEAN,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkInTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkOutTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      termCon: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM("Card", "Cash"),
        allowNull: false,
      },
      guest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      guestName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guestPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
