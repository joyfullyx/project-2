// Category

const router = require('express').Router();
const { Card } = require('../../models');


router.post('/', async (req, res) => {
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


// Update Card
router.put('/:id', async (req, res) => {
    try {
      const cardData = await Card.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!cardData) {
        res.status(404).json({ message: 'Unable to update event!' });
        return;
      }
  
      res.status(200).json(cardData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.delete('/:id', async (req, res) => {
  try {
    const cardData = await Card.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!cardData) {
      res.status(404).json({ message: 'No event found!' });
      return;
    }

    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;