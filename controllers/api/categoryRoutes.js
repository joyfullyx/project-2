const router = require('express').Router();
const { Category } = require('../../models');

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
  try {
    const categoryData = await Category.findByPk({
      where: {
        id: req.params.id,
      },
      include: [{ model: Card }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
