const { User } = require('../models');

const userData = [
  {
    first_name: 'Katie',
    last_name: 'Menendez',
    organization: '',
    street: '1820 11th Ave SE',
    city: 'Olympia',
    state: 'WA',
    zip: 98501,
    email: 'kmenendez@example.com',
    password: 'password'
  },
  {
    first_name: 'Dominic',
    last_name: 'Freeman',
    organization: 'Lions Park',
    street: '800 Wilson St. SE',
    city: 'Olympia',
    state: 'WA',
    zip: 98501,
    email: 'lionspark@example.com',
    password: 'password'
  },
  {
    first_name: 'Tyson',
    last_name: 'Green',
    organization: '',
    street: '818 Decatur St SW',
    city: 'Olympia',
    state: 'WA',
    zip: 98502,
    email: 'redcarhero@example.com',
    password: 'password'
  },
  {
    first_name: 'Zoe',
    last_name: 'Franklin',
    organization: '',
    street: '822 Milroy St SW',
    city: 'Olympia',
    state: 'WA',
    zip: 98502,
    email: 'zoeisawesome@example.com',
    password: 'password'
  },
  {
    first_name: 'Hope',
    last_name: 'Gao',
    organization: 'Thurston County Food Bank',
    street: '220 Thurston Ave NE',
    city: 'Olympia',
    state: 'WA',
    zip: 98501,
    email: 'kmenendez@example.com',
    password: 'password'
  },
  {
    first_name: 'Jason',
    last_name: 'Wolfe',
    organization: '',
    street: '2926 Langridge Loop NW',
    city: 'Olympia',
    state: 'WA',
    zip: 98502,
    email: 'hungrylikethewolfe@example.com',
    password: 'password'
  },
  {
    first_name: 'Jazmine',
    last_name: 'Wilson-Brown',
    organization: '',
    street: '1611 10th Ave SW, Olympia',
    city: 'Olympia',
    state: 'WA',
    zip: 98502,
    email: 'jazzercise@example.com',
    password: 'password'
  },
  {
    first_name: 'Sakura',
    last_name: 'Fujino',
    organization: '',
    street: '4934 Donovan Dr SE',
    city: 'Olympia',
    state: 'WA',
    zip: 98501,
    email: 'sakurafujino@example.com',
    password: 'password'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = userCard;
