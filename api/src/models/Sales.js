const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        'Sales', {
      id: {
        type: DataTypes.STRING, // debe ser el Id que arroja el metodo de pago
        allowNull: false,
        primaryKey: true,
      },

      amount:{ // debe ser la cantidad que se va a pagar en el medio de pago
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      items:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },

      salesStatus: {
        type: DataTypes.STRING,
        defaultValue: "Aproved",
        allowNull: false
      }
    },
    );
  };