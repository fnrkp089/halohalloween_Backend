const express = require('express');
const authMiddleWare = require('../middlewares/auth-middleware');
const Reply = require('../schemas/reply');
const Router = express.Router();

Router.post('/reply/replyPost', authMiddleWare, async(req, res) => {
    const { user } = res.locals
    try {
        const { postID, replyComment, replyDel } = req.body;
        const reply = new Reply({ postID, replyNickname: user.userNickname, replyComment, replyDel });
        await reply.save();
        res.status(201).send({ result: 'success' });
    } catch (error) {
        console.error(err);
    }
});

Router.get('/reply/:postID', async(req, res) => {
    try {
        const { postID } = req.body;
        const Replies = await Reply.find({ postID });
        res.json({ Replies: Replies });
        res.status(200).send({ result: 'success' });
    } catch (err) {
        console.error(err);
    }
});

Router.patch('/reply/replyDelete', authMiddleWare, async(req, res) => {
    const { replyID } = req.body;
    const { replyDel } = req.body;
    await Reply.updateOne({ replyID } {
        $set: {
            replyDel: replyDel,
        },
    });
    res.status(201).send({ result: 'success' });
});

Router.patch('reply/replyModify', authMiddleWare, async(req, res) => {
    const { replyID, replyComment } = req.body
    await Reply.updateOne({ replyID }, {
        $set: {
            replyComment: replyComment,
        },
    });
    res.status(201).send({ result: 'success' });
});

module.exports = Router;