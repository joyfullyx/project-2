const User = require('./User');
const Category = require('./Category');
const Comment = require('./Comment');
const Card = require('./Card');

User.hasMany(Card, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Card.belongsTo(User, {
    foreignKey: 'user_id',
})

Category.hasMany(Card, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Card.hasMany(Comment, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    Category,
    Comment,
    Card,
};