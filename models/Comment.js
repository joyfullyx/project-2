const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Comment extends Model {}

Comment.init({
    content:{
<<<<<<< HEAD
        type:DataTypes.TEXT,
=======
        type:DataTypes.STRING,
>>>>>>> 2dbabb788b46c92a146ca0727df2ee6f0b8f058b
    },
    user_id:{
        type:DataTypes.INTEGER, 
        allowNull:false,
    },
    card_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment