const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "VideogameSales",
        {
            quantity: {
                type: DataTypes.INTEGER, //debe ser el Id que arroja el metodo de pago
                allowNull: false,
            },
        },
    );
};