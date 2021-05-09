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
        const allCards = cardData.map((card) => card.get({plain: true}));
        res.status(200).json(allCards);
        console.log(allCards);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//Finds one card
router.get('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Comment}, { model: User}, { model: Category }],
    });

    const allCards = cardData.get({plain: true});
    
    res.status(200).json(allCards);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})



// create new card
router.post('/', withAuth, async (req, res) => {
  console.log('in card post');
  try {
    const forwardedIpsStr = req.header("x-forwarded-for");

    const ip = '71.231.34.183';
    console.log('ip:', ip);

    const geo = geoip.lookup(forwardedIpsStr || ip);
    const city = geo.city;
    const state = geo.region;
    const lat = parseFloat(geo.ll[0]);
    const lon = parseFloat(geo.ll[1]);
    // console.log(city, state);

    if (forwardedIpsStr) {
      ip = forwardedIps = forwardedIpsStr.split(",")[0];
    }

    debugger
    console.log(req.body)
    console.log(req.body.event_name)

    const newCard = await Card.create({
      event_name: req.body.event_name,
      event_city: city,
      event_state: state,
      event_location_lat: lat,
      event_location_lon: lon,
      event_description: req.body.event_description,
      event_time: req.body.event_time,
      image_path: req.body.image_path,
      user_id: req.session.user_id,
    });
    console.log("newcard: ", newCard);


    const card = newCard.get({ plain: true });
    console.log('logging new card: ', card);
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//Update Card
router.put('/:id', async (req, res) => {
  try{
    const editCard = await Card.update(
      {
        where: {
          id: req.params.id,
        }
      },
      {
        event_name: req.body.event_name,
        // event_description: req.body.event_description,
        // event_date: req.body.event_date,
        // event_time: req.body.event_time,
      }
      )
    res.json(200).json(editCard);
    } catch (err) {
      res.json(err);
    }
});

//Update Comment Route
router.put('/:id', async (req, res) => {
  try{
    const editComment = await Comment.update(
      {
        where: {
          id: req.params.id,
        }
      },
      {
        content: req.body.content,
      }
      )
    res.json(200).json(editComment);
    } catch (err) {
      res.json(err);
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
