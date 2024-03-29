const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Ventas';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        //created_at:  dataTypes.DATETIME,
        //updated_at:  dataTypes.DATETIME,
        precio: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        deletedAt: false
    }
    const Ventas = sequelize.define(alias, cols, config); 

    Ventas.associate = function (models) {
        Ventas.belongsTo(models.Users, { 
            as: "users",
            foreignKey: 'user_id',
            timestamps: false
        }),
        Ventas.belongsToMany(models.Products,{
               
            through:'products_ventas',
            foreignKey:'venta_id'
        })
    }

    return Ventas
};