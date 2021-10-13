const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 상세페이지 API
Router.get('/post/inspect/:postID', async(req, res) => {
  const {postID} = req.body;

  try {
    const postingList = await Board.findById({ _id: postID});
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: 'Not found the content from the list'
    });
  }
})

//게시물 불러오기 API
Router.get('/post/postList', async(req, res, next) => {
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
    const posting = new Board({postingTitle, postingAuthor: user.userNickname, postingDate, postingComment, postingImgUrl, postingDel})
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
Router.patch("/post/postModify", async (req, res, next) => {
  try {
    const postID = req.body;
    const { postingTitle, postingAuthor, postingComment, postingDate } = await req.body;

    const findPost = await Board.findOne({ _id : postID });

    if(findPost["postID"] === postID ) {
      await findPost.updateOne({ postingTitle, postingComment, postingDate });
      await findPost.save();
      res.status(201).send({ message: '게시글 수정 완료!' });
    } else {
      res.status(500).send({ errorMessage: '비밀번호 다시 입력해주세요'})
    }
  } catch (err) {
    res.status(500).send({ errorMessage: '게시글 수정 실패!'})
  } //error found
});

//게시글 삭제 API
Router.delete("/post/postDelete", async(req, res, next) => {
  const  { postID } = req.body;

  try {
    const userPost = await Board.findone({ _id : postID});

    if (userPost["postID"] === postID ) {
      await userPost.deleteOne();
      res.status(201).send({ messsage: "게시글 삭제 완료! :)"});
    } else {
      res.status(500).send({ errorMessage: "게시글 삭제 실패 :("});
    }
  } catch (err) {
    res.status(500).send({ errorMessage: "삭제한 게시물입니다"});
  }
});

module.exports = Router;


