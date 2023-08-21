const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Colores';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
       
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Colores = sequelize.define(alias, cols, config); 

    Colores.associate = function (models) {
        Colores.belongsToMany(models.Products, { 
            through:'colores-products',
            foreignKey:'color_id',
            otherKey:'product_id'
        })
        
    }

    return Colores
};