const { Comments } = require('../models');

const commentsData = [
  {
    user_id: 3,
    comments: 'Do you happen to be selling a toaster?',
    card_id: 1
  },
  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },  {
    user_id: 3,
    comments: '',
    card_id: 1
  },
];

const commentsCard = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;