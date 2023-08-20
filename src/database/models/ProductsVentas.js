const {INTEGER} = requiere("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "Products-ventas";
    let cols = {
        id:{
            type:dataTypes.INT(10).INSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        ventas_id:{
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        },
        products_id:{
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps:true,
        deletedAt:false
    }
    /*const Products-ventas = sequelize.define(alias,cols,config)

    Products-ventas.hasMany(models.Ventas,{
        foreignKey:"ventas_id",
        as:"Ventas",
        timestamps: false
    }),
    Products-ventas.associate = function(models){
        Products-ventas.belongsTo(models.Products{
            foreignKey:"products_id",
            as:"Products",
            timestamps: false
        })    
    }
    return Products-ventas*/
}