const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: dataTypes.DATETIME,
        updated_at: dataTypes.DATETIME,
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        detalle: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        fotoPpal: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        fotos: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        talle_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        categoria_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Products = sequelize.define(alias, cols, config); 

    Products.associate = function (models) {
        Products.belongsTo(models.Talles, { 
            as: "talles",
            foreignKey: 'talle_id',
            timestamps: false
        }),
        Products.belongsTo(models.Categorias, { 
            as: "categorias",
            foreignKey: 'categoria_id',
            timestamps: false
        }),
        Products.belongsToMany(models.Colores,{
  
            through:'colores_products',
            foreignKey:'product_id',
            otherKey:'color_id'
        }),
        Products.belongsToMany(models.Ventas,{

            through:'products_ventas',
            foreignKey:'product_id',
            otherKey:'venta_id'
        })

    }

    return Products
};