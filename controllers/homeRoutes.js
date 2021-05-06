const router = require("express").Router();
const { User, Category, Card, Comment } = require("../models");
const withAuth = require("../utils/auth");
const geoip = require("geoip-lite");
const sequelize = require("sequelize");
const { getDistanceLatLonToMiles } = require('../utils/geo');
// let http = require('http').Server(router);
// let ip;

router.get("/", async (req, res) => {
  try {
    var forwardedIpsStr = req.header("x-forwarded-for");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // ip = req.ip;
    
    // JOY'S IP ADDRESS
    var ip = '71.231.34.183';
    
    // TEST IP ADDRESS 
    // var ip = "207.97.227.239";
    console.log('ip:', ip);
    // console.log('req.ip:', req.ip);
    var geo = geoip.lookup(ip);
    var lat = parseFloat(geo.ll[0]);
    var lon = parseFloat(geo.ll[1]);
    var city = geo.city;
    var state = geo.region;
    console.log('city, state: ', city, state, lat, lon);
    // console.log('geo:', geo);
    // =========================================================
    // console.log('req.connection.remoteAddress:', req.connection.remoteAddress)
    console.log('The IP is %s', geoip.pretty(ip));
    // =========================================================
    if (forwardedIpsStr) {
      ip = forwardedIps = forwardedIpsStr.split(",")[0];
    }
    // Get all categories and JOIN with user data
    const cardData = await Card.findAll(req.params.id, {
      include: [
        {
          model: User, 
          model: Comment
        }
      ]
    // },
  })
    // // Serialize data so the template can read it
    // const card = cardData.map((card) => card.get({ plain: true }));

    const cards = cardData.filter((card) => {
      console.log('distance between ip and event in miles: ',(getDistanceLatLonToMiles(
        lat,
        lon,
        parseFloat(card.event_location_lat),
        parseFloat(card.event_location_lon),
      )))
      if (
        getDistanceLatLonToMiles(
          lat,
          lon,
          parseFloat(card.event_location_lat),
          parseFloat(card.event_location_lon)
        ) < 5570.00
      )
        return card.get({ plain: true });
    });

    console.log("cards: ", cards);

    // console.log('cardData: ', cardData)

//     // Pass serialized data and session flag into template
    res.render("homepage", { card: cards });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// ==============================================

// router.get('/', async (req, res) => {
  // try {
  //   const cardData = await Card.findAll( {
  //     include: [
  //       {
  //         model: User,
  //         model: Comment,
  //       },
  //     ],
  //   });
  //   const card = cardData.get({ plain: true });

  //   res.render('homepage', {...card});
  // } catch (err) {
  //   res.status(500).json(err);
  //   console.log(err);
  // }
  // res.render('homepage');
// });

router.get('/cards/:id', async (req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id, {
      include: [
        {
          model: User,
          model: Comment,
        },
      ],
    });
    const card = cardData.get({ plain: true });

    res.render('viewcard', {...card});
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        { model: Card },
      ],
    });
    console.log(categoryData);
    const category = categoryData.get({ plain: true });
    console.log(category)
    res.render('category', {
      ...category,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/profile', withAuth, async(req, res) => {

  try {
    var forwardedIpsStr = req.header('x-forwarded-for');
    // JOY'S IP ADDRESS
    var ip = '71.231.34.183';
    // TEST IP ADDRESS 
    // var ip = "207.97.227.239";
    console.log('ip:', ip);

    var geo = geoip.lookup(ip);
    var lat = parseFloat(geo.ll[0]);
    var lon = parseFloat(geo.ll[1]);
    var city = geo.city;
    var state = geo.region;
    console.log('city, state: ', city, state, lat, lon);
    console.log('The IP is %s', geoip.pretty(ip));


    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
    })

    const user = await userData.get({ plain: true });
    const cardData = await Card.findAll(req.params.id, {
      include: [
        {
          model: User,
          model: Comment
        }
      ]
    })

    const cards = cardData.filter((card) => {
      console.log('distance between ip and event in miles: ', (getDistanceLatLonToMiles(
        lat, 
        lon,
        parseFloat(card.event_location_lat),
        parseFloat(card.event_location_lon),
      )))
      if (
        getDistanceLatLonToMiles(
          lat,
          lon,
          parseFloat(card.event_location_lat),
          parseFloat(card.event_location_lon)
        ) < 5570.00
      )
      return card.get({ plain: true });
    });

    console.log("cards: ", cards);
    res.render('profile', {
      card: cards,
      ...user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// ===========trying to get cards to render on profile==========

// =================keep this =====================
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   // console.log(req.session);
//   // res.send(`welcome, ${req.session.user_id}`);
  
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { 
//         exclude: ['password'] 
//       },
//     });

//     const user = await userData.get({ plain: true });
//     // const card = cardData.get({ plain: true });

//     // res.render('profile', {card});
//     res.render('profile', {
//       ...user, 
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });

// ============== ^ keep this ^ ===============================

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router
