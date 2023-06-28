const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('carts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT
  },
  items:{
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
)}


