const {INTEGER} = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "colores_products";
    let cols = {
        id:{
            type:dataTypes.INT(10).INSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        color_id:{
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps:true,
        deletedAt:false
    }
    const colores_products = sequelize.define(alias,cols,config)

    colores_products.associate = function(models){
        colores_products.belongsTo(models.Products, {
            foreignKey:"product_id",
            as:"Products",
            timestamps: false
        }),
        colores_products.belongsTo(models.Colores,{
        foreignKey:"color_id",
        as:"Color",
        timestamps: false
    }) 
    }
    return colores_products
}