const router = require('express').Router();
const { Card, Category, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const geoip = require('geoip-lite');

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
    var forwardedIpsStr = req.header("x-forwarded-for");

    var ip = '71.231.34.183';
    console.log('ip:', ip);

    var geo = geoip.lookup(ip);
    var city = geo.city;
    var state = geo.region;
    // console.log(city, state);

    if (forwardedIpsStr) {
      ip = forwardedIps = forwardedIpsStr.split(",")[0];
    }

    const newCard = await Card.create({
      event_name: req.body.event_name,
      event_city: geo.city,
      event_state: geo.region,
      event_description: req.body.event_description,
      event_time: req.body.event_time,
      user_id: req.session.user_id,
    });
    console.log(newCard);


    const card = newCard.get({ plain: true });
    console.log('logging new card: ', card);
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
