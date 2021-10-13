const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 상세페이지 API
Router.get('/inspect/:postID', async(req, res) => {
  const {postID} = req.body;

  try {
    const postingList = await Board.findById({postID});
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: '상세 목록 해당 없음'
    });
  }
})

//게시물 불러오기 API
Router.get('/postlist', async(req, res) => {
  try {
    const postList = await Board.find({}).sort("-date");
    res.status(201).send({ postList : postList });
  } catch (err) {
    res.status(500).send({
      errorMessage: 'Not found the content anymore'
    })
  }
})

//게시글 등록 API

Router.post('/posting', authMiddleWare, async(req, res) => {
  const {user} = res.locals
  const { postingTitle, postingDate, postingComment, postingImgUrl, postingDel } = req.body;
  try {
    const posting = new Board({postingTitle, postingEmail:user.userEmail ,postingAuthor: user.userNickname, postingDate, postingComment, postingImgUrl, postingDel})
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

//게시글 수정 API
Router.patch("//", async (req, res) => {

})
//게시글 삭제 API
Router.delete("//", async(req, res) => {

})
module.exports = Router;