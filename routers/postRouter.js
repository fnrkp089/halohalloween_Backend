const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 등록 API

Router.post('/posting', authMiddleWare, async(req, res) => {
  const {user} = res.locals
  const { postingTitle, postingDate, postingComment, postingImgUrl, postingDel } = req.body;
  try {
    const posting = new Board({postingTitle, postingAuthor: user.userNickname, postingDate, postingComment, postingImgUrl, postingDel})
    await posting.save();
    res.status(201).send({ 
      message: "게시글 등록 완료"
    });
  } catch(err) {
      res.status(500).send({ 
        errorMessage: '등록 실패'
      });
  }
})

//게시글 수정 API

module.exports = Router;