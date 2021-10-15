const express = require('express');
const authMiddleWare = require('../middlewares/auth-middleware');
const Reply = require('../schemas/reply');
const Router = express.Router();

Router.get('/replyList/:postID', async(req, res) => {
    try {
        const { postID } = req.params;
        const Replies = await Reply.find({postID : postID});
        res.status(200).json({ Replies: Replies });
    } catch (err) {
        console.error(err);
    }
});

Router.post('/replyPost', authMiddleWare, async(req, res) => {
    const { user } = res.locals
    try {
        const { postID, replyNickname, replyComment } = req.body;
        const reply = new Reply({ postID, replyNickname, replyComment, replyDel: 1 });
        await reply.save();
        res.status(201).send({ result: 'success' });
    } catch (error) {
        console.error(err);
    }
});

Router.patch('/replyDelete', authMiddleWare, async(req, res) => {
    const { replyID } = req.body;
    await Reply.updateOne({ replyID }, {
        $set: {
            replyDel: 0,
        },
    });
    res.status(201).send({ result: 'success' });
});

Router.patch('/replyModify', authMiddleWare, async(req, res) => {
    const { replyID, replyComment } = req.body
    await Reply.updateOne({ replyID }, {
        $set: {
           replyComment
        },
    });
    res.status(201).send({ result: 'success' });
});

module.exports = Router;