const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias';
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
       
    };

    let config = {
        timestamps: false
    }
    
    const Categorias = sequelize.define(alias, cols, config); 

    Categorias.associate = function (models) {
        Categorias.hasMany(models.Products, { 
            as: "productos",
            foreignKey: 'categoria_id',
            timestamps: false
        })
        
    }

    return Categorias
};