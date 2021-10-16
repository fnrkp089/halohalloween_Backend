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
    //왜 Delete 요청을 Patch로 구현했는가?
    //1. 복구에 용이성이 있다 왜냐하면 데이터베이스 자체의 속성을 지우면
    //백업본이 존재하지않으면? 아예 찾을수가 없다.

    //2.데이터의 무결성 보장
    //만일 하나의 필드를 삭제했다고 가정 해보자
    //그런데 만일 게시물의 번호라던지 아니면 게시물의 숫자 혹은 순서를 담당하는 필드가 사라질수잇다.
    //예를들면 10개의 글중 4번째 글을 지웟는데, 로직에 따라서 비어있는 값으로 데이터가 들어갈수있어요
    //즉 우리가 원한건 11번쨰에 들어가는걸 원햇는데, 이게 사라지니깐 4번째로 들어가서 데이터의 무결성을 보장하지 못할수 있어요.

    //이건 개인적의 견해이고, 특정상황에서는 오히려 이게 독이될수 있으니... 구현 로직을 생각하고
    //만일 복구용이성이 필요하거나, 아니면 순서의 무결성을 지켜야할 경우엔 patch를 사용하는것이 매우 괜찮은 방안이될 수있고,
    //그런 로직이 아니고, 무결성이나 아니면 순서라던지 그런게 필요없는 필드일경우엔 delete를 사용하는것이 괜찮을수 있다.
    //이거는 아마 주제보시면서 생각하시는게 나으실거같습니다.
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