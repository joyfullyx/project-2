const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Yard Sale',
  },
  {
    category_name: 'Event',
  },
  {
    category_name: 'Volunteer',
  },
  {
    category_name: 'Service',
  },
  {
    category_name: 'Trade',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;