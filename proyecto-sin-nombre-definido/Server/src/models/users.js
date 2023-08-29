const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: {
        type: DataTypes.TEXT,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      verificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING, // Cambiado: NUMBER a STRING si incluye caracteres no numéricos
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Undefined", "No apply"),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.ENUM("Argentina", "Mexico", "Colombia", "Venezuela"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Agregado: para asegurarse de que los correos electrónicos sean únicos
        validate: {
          isEmail: true, // Agregado: para validar que sea un formato de correo electrónico válido
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.JSON, // Cambiado de ARRAY(DataTypes.STRING) a JSON
        defaultValue: {},
      },
      landLord: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      history: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
