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
        allowNull: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      asset: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      checkInTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      checkOutTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      termCon: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.ENUM("Card", "Cash"),
        allowNull: true,
      },
      guest: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
