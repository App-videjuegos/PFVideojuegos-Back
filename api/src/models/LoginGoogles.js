const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("LoginGoogles", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    family_name: {
      type: DataTypes.STRING,
    },
    given_name: {
      type: DataTypes.STRING,
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    locale: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    verified_email: {
      type: DataTypes.BOOLEAN,
    },
  });
};
