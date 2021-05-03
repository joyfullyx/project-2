const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

// find all categories
router.get('/', withAuth, async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
            include: [{ model: Card }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create new category
router.post('/', withAuth, async (req, res) => {
  try {
    const newCategory = await Category.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete category
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
