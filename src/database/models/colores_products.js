const {INTEGER} = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "colores_products";
    let cols = {
        id:{
            type:dataTypes.INTEGER(10).UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        color_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "colores_products",
        timestamps:false
    }
    const colores_products = sequelize.define(alias,cols,config)

    return colores_products
}