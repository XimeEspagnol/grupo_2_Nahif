const sequelize = require ("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        apellido: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        fotoPerfil: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        contrasenia: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        rol_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        created_at: dataTypes.DATE,
        updated_at: dataTypes.DATE
    };
    
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Users = sequelize.define ("Users", cols, config); 
    
  Users.associate = function (models) {
    Users.hasMany (models.Ventas, {
       as: "Ventas",
       foreignKey: "Venta_id",
       timestamps: false
    }),

    Users.belongsTo (models.Roles, {
        as: "Roles",
        foreignKey: "rol_id",
        timestamps: false
     })  
      
  }  

  return Users;

}
