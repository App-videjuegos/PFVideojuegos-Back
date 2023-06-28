const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      get() {
        // Obtener la fecha en formato 'dd/mm/aaaa'
        const date = this.getDataValue('releaseDate');
        if (date) {
          const formattedDate = new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return formattedDate;
        }
        return null;
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    screenShots: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    requeriments_en: {
      type: DataTypes.JSON(DataTypes.STRING),
    },
    requeriments_ru: {
      type: DataTypes.JSON(DataTypes.STRING),
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }

  },
  );
};
