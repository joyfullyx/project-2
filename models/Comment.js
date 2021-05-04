const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Comment extends Model {}

Comment.init({
    content:{
        type:DataTypes.STRING(255),
    },
    user_id:{
        type:DataTypes.INTEGER, 
        allowNull:false,
    },
    card_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize
})

module.exports = Comment