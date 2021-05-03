const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt =require("bcrypt");

class Comment extends Model {}

User.init({
    content:{
        type:DataTypes.STRING(255),
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    card_id:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize
})

module.exports = Comment