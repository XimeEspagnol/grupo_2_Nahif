const {INTEGER} = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "products_ventas";
    let cols = {
        id:{
            type:dataTypes.INTEGER(10).UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        venta_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "products_ventas",
        timestamps:true,
        deletedAt:false
    }
    const products_ventas = sequelize.define(alias,cols,config)

   products_ventas.associate = function(models){
        products_ventas.belongsTo(models.Products, {
            foreignKey:"products_id",
            as:"Products",
            timestamps: false
        }),
        products_ventas.belongsTo(models.Ventas,{
        foreignKey:"ventas_id",
        as:"Ventas",
        timestamps: false
    }) 
    } 
        return products_ventas
}