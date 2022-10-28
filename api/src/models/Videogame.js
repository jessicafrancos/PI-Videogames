const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    platform: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn.pixabay.com/photo/2021/12/16/10/15/pixel-art-6874310_1280.jpg",
    },
    genre: {
      type: DataTypes.JSON,
      defaultValue: [],
    }
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: true,
  });
};
