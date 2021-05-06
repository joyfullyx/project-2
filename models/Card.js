const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        event_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        event_location_lat: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        event_location_lon: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        event_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        event_time: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: '06:00:00',
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'card',
      }
    );
    
    module.exports = Card;