const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
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
    const Roles = sequelize.define(alias, cols, config)

    Roles.associate= function(models) {
        Roles.belongsToMany(models.users, {
            as: "users",
            foreignKey: 'user_id',
            timestamps: false
    })
    }
    return Roles

};