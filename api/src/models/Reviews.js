const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Reviews", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    videogameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    comment : {
        type: DataTypes.TEXT,
      },
      playtime: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.TEXT,
      },
      reviewDate: {
        type: DataTypes.DATE,
      },
      recommendation: {
        type: DataTypes.BOOLEAN,
      },
      hashtags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      token: {
        type: DataTypes.STRING,
      },
      user: {
        type: DataTypes.STRING,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
  });
};
