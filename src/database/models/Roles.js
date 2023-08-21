const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
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
    const Roles = sequelize.define(alias, cols, config)

    Roles.associate= function(models) {
        Roles.hasMany (models.Users, {
            as: "users",
            foreignKey: 'user_id',
            timestamps: false
    })
    }
    return Roles

};