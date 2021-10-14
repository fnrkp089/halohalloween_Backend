const express = require('express');
const authMiddleWare = require('../middlewares/auth-middleware');
const Reply = require('../schemas/reply');
const Router = express.Router();
const Joi = require("joi");

const joiReply = Joi.object({
    postID: Joi.array().items(Joi.string()).required().unique(),
    replyComment: Joi.array().items(Joi.string()).required(),
    replyDel: Joi.array().items(Joi.number()).required(),
});

Router.post('/replyPost', authMiddleWare, async(req, res) => {
    const { user } = res.locals
    try {
        const { postID, replyComment, replyDel } = joiReply.validateAsync(req.body);
        const reply = new Reply({ postID, replyNickname: user.userNickname, replyComment, replyDel });
        await reply.save();
        res.status(201).send({ result: 'success' });
    } catch (error) {
        console.error(err);
    }
});

Router.get('/replyinspect/:postID', async(req, res) => {
    try {
        const { postID } = req.body;
        const Replies = await Reply.find({ postID });
        res.json({ Replies: Replies });
        res.status(200).send({ result: 'success' });
    } catch (err) {
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