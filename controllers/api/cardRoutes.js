const router = require('express').Router();
const { Card, Category, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// find all cards
router.get('/', withAuth, async (req, res) => {
    try {
        const cardData = await Card.findAll({
            include: [{ model: Category, model: Comment }],
        });
        res.status(200).json(cardData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// create new card
router.post('/', withAuth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete card
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Project.destroy({
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
