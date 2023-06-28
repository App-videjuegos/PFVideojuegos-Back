const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false // desabilita la auto-incrementacion
      },
      
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // hace que el atributo "user" sea único
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      userAdmin: {
        type: DataTypes.BOOLEAN,
        default: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },     

      image: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.STRING,
        unique: true,
      },

      tac: {
        type: DataTypes.BOOLEAN,
      },

      newsLetter: {
        type: DataTypes.BOOLEAN,
      },
      deleted: {
        type: DataTypes.BOOLEAN,     
        defaultValue: false,
      }
    });
  };