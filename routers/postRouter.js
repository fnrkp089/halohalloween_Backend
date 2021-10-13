const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 상세페이지 API
<<<<<<< HEAD
Router.get('/inspect/:postID', async(req, res) => {
  const { postID } = req.body;

  try {
    const postingList = await Board.findById({postID});
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: '해당 페이지에서 게시글을 찾을 수 없습니다.'
=======
Router.get('/post/inspect/:postID', async(req, res) => {
  const {postID} = req.body;

  try {
    const postingList = await Board.findById({ _id: postID});
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: 'Not found the content from the list'
>>>>>>> 24a11ff780e7f57998bcbbf50242a4c1a284ee49
    });
  }
})

//게시물 불러오기 API
<<<<<<< HEAD
Router.get('/postlist', async(req, res) => {
  try {
    const postList = await Board.find({postingDel: 1}).sort("-date");
    res.status(201).json({ postList : postList });
  } catch (err) {
    res.status(500).send({
      errorMessage: '해당 게시물을 찾을 수 없습니다!'
=======
Router.get('/post/postList', async(req, res, next) => {
  try {
    const postList = await Board.find({}).sort("-date");
    res.status(201).send({ postList : postList });
  } catch (err) {
    res.status(500).send({
      errorMessage: 'Not found the content anymore'
>>>>>>> 24a11ff780e7f57998bcbbf50242a4c1a284ee49
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
      message: "게시글 등록을 완료했습니다."
    });
  } catch (err) {
      res.status(500).send({ 
        errorMessage: '게시글 등록을 실패했습니다.'
      });
  }
})

//게시글 수정 API
<<<<<<< HEAD
Router.patch("/postModify", async (req, res, next) => {
  try {
    const { postID ,postingTitle, postingComment, postingUpdate } = req.body;
      await Board.updateOne({_id: postID},{ postingTitle, postingComment, postingUpdate });
      res.status(200).send({ message: '게시글 수정 완료했습니다!' });
  } catch (err) {
    res.status(500).send({ errorMessage: '게시글 수정 실패!, 관리자에게 문의해주세요.'})
  } //error found
});

//게시글 삭제 API
Router.delete("/postDelete", async(req, res) => {
  const { postID } = req.body;
  await Board.updateOne({_id: postID},{$set : {postingDel: 0}});
  res.send({ 
    Message: "게시글 삭제에 성공했습니다." 
  });
})
module.exports = Router;
=======
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


>>>>>>> 24a11ff780e7f57998bcbbf50242a4c1a284ee49
