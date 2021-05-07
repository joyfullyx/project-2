const router = require('express').Router({mergeParams: true});
const { Comment, Card } = require('../../models');
const withAuth = require('../../utils/auth');

//Retrieve Comment Route
router.get('/', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: [{ model: Card }],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.status(200).json(comments)
        console.log(comments);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})
//Post Comment Route
router.post('/:id', withAuth, async (req, res) => {
    console.log("THIS IS req.params", req.params);
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            card_id: req.params.id,
        });
        res.status(200).json(newComment);
        console.log(newComment)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
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

//Delete Comment Route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
           where: {
               id: req.params.id,
               user_id: req.session.user_id,
           },
        });
        console.log(req.params.id);
        if(!commentData) {
            res.status(404).json({ message: 'No comment found.'});
            return;
        }

        res.status(200).json(commentData);
        res.redirect('/');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;