const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Talles';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        timestamps: true,
        deletedAt: false
    };
    const Talles = sequelize.define(alias, cols, config)

    Talles.associate= function(models) {
            Talles.hasMany(models.Products, {
                as:'products',
                foreignKey:'products_id',
                timestamps: false
        })
    }
    return Talles
};