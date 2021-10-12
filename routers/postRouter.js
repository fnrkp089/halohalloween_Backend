const express = require('express');
const postRouter = express.Router();
const Board = require('../schemas/board');
const { authMiddleWare } = require("../middlewares/auth-middleware");

//리뷰 작성 api

postRouter.post('/posting', authMiddleWare, async(req, res, next) => {
    const user = res.locals.user;
    const { postingTitle, postingDate, postingComment, postingImgUrl } = req.body;
    try {
        let posting = new Board({ postingTitle, postingAuthor: user.userNickname, postingDate, postingComment, postingImgUrl })
        await posting.save();
        res.status(201).send({
            message: "게시글 등록 완료"
        });
    } catch (err) {
        res.status(500).send({
            errorMessage: '등록 실패'
        });
    }
})

module.exports = postRouter;