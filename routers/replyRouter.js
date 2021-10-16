const express = require('express');
const authMiddleWare = require('../middlewares/auth-middleware');
const Reply = require('../schemas/reply');
const Router = express.Router();

Router.get('/replyList/:postID', async(req, res) => {
    try {
        const { postID } = req.params;
        const Replies = await Reply.find({postID : postID, replyDel: 1});
        res.status(200).json({ Replies: Replies });
        console.log(Replies);
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
        const replyOne = await Reply.findOne({postID: postID}).sort({'_id': -1});
        res.status(201).json({ result: replyOne });
    } catch (error) {
        console.error(err);
    }
});

Router.patch('/replyDelete', authMiddleWare, async(req, res) => {
    const { replyID } = req.body;
    await Reply.updateOne({ _id: replyID }, {
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