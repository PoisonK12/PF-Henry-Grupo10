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
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePic: {
        type: DataTypes.TEXT,
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING, // Cambiado: NUMBER a STRING si incluye caracteres no numéricos
        allowNull: true,
      },
      verificationNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "agender", "No binary"),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.ENUM("Argentina", "Mexico", "Colombia", "Venezuela"),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // Agregado: para asegurarse de que los correos electrónicos sean únicos
        validate: {
          isEmail: true, // Agregado: para validar que sea un formato de correo electrónico válido
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      userType: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: true,
        defaultValue: "user",
      },
      averageScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      numberOfReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      favorites: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      history: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Modelo de datos de Google
      githubId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};