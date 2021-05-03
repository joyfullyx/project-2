const router = require('express').Router();
const { Category } = require('../../models/Category');

// find all categories
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            where: {
                id: req.params.id,
            },
            include: [{ model: Card }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  const categories = categoryData.get({ plain: true });
  res.json(categories);
});

module.exports = router;
