const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Talles';
    let cols = {
        id: {
            type: dataTypes.INT(10).UNSIGNED,
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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Talles = sequelize.define(alias, cols, config)

    Talles.associate= function(models) {
            Talles.belongsToMany(models.Products, {
                as:'products',
                foreignKey:'products_id',
                timestamps: false
        })
    }
    return Talles
};