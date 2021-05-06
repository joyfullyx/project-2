const router = require('express').Router();
const { Card, Category, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// find all cards
router.get('/', withAuth, async (req, res) => {
    console.log(req);
    try {
        const cardData = await Card.findAll({
            include: [{ model: Comment}, {model: User}, {model: Category}],
        });
        res.status(200).json(cardData);
        console.log(cardData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Comment}, { model: User}, { model: Category }],
    });
    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

// create new card
router.post('/', withAuth, async (req, res) => {
  console.log();
  try {
    const newCard = await Card.create({
      event_name: req.body.event_name,
      event_description: req.body.event_description,
      event_time: req.body.event_time,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCard);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// delete card
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!cardData) {
      res.status(404).json({ message: 'No card found with this id!' });
      return;
    }

    res.status(200).json(cardData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
