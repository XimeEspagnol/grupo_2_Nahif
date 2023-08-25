const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'FotosProd';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        nombreFoto: {
            type: dataTypes.TEXT(100),
            allowNull: false
        }
    }
    let config = {
        tableName: 'FotosProd',
        timestamps: false
    };
    const FotosProd = sequelize.define(alias, cols, config)

    FotosProd.associate= function(models) {
            FotosProd.belongsTo(models.Products, {
                as:'fotosprod',
                foreignKey:'product_id',
                timestamps: false
        })
    }
    return FotosProd
};