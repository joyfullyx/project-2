const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;