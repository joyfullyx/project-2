const router = require('express').Router();
const { User } = require('../../models');
var geoip = require('geoip-lite');

router.get('/', async (req, res) => {
  var forwardedIpsStr = req.header('x-forwarded-for');
  // var ip = '';
  var ip = '207.97.227.239'
  var geo = geoip.lookup(ip);
  console.log(geo);

  if (forwardedIpsStr) {
     ip = forwardedIps = forwardedIpsStr.split(',')[0];  
  }

  const userData = await User.findAll({
    attributes: {
      exclude: ['password']
    },
  }).catch((err) => {
      res.json(err);
  });
  res.json(userData);
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      console.log(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
