const User = require('./User');
const Category = require('./Category');
const Comment = require('./Comment');
const Card = require('./Card');

User.hasMany(Card, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Category.hasMany(Card, {
    foreign: 'category_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreign: 'user_id',
    onDelete: 'CASCADE'
});

Card.hasMany(Comment, {
    foreign: 'card_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Category,
    Comment,
    Card,
};