const router = require('express').Router({mergeParams: true});
const { Comment, Card } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: [{ model: Card }],
        });
        res.status(200).json(commentData)
        console.log(commentData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.post('/:id', withAuth, async (req, res) => {
    console.log("THIS IS req.params", req.params);
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            card_id: req.params.id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
           where: {
               id: req.params.id,
               user_id: req.session.user_id,
           },
        });

        if(!commentData) {
            res.status(404).json({ message: 'No comment found.'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;