const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Ventas';
    let cols = {
        id: {
            type: dataTypes.INT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        precio: {
            type: dataTypes.INT(10),
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INT(10),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
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
               
            through:'products-ventas',
            foreignKey:'venta_id',
            otherKey:'product_id'
        })
    }

    return Ventas
};