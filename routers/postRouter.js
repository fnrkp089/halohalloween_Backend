<<<<<<< HEAD
const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 상세페이지 API
Router.get('/inspect/:postID', async(req, res) => {
  const { postID } = req.params;

  try {
    const postingList = await Board.findById(postID);
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: '해당 페이지에 게시글이 존재하지 않습니다.'
    });
  }
})

//게시물 불러오기 API
Router.get('/postlist', async(req, res) => {
  try {
    const postList = await Board.find({postingDel: 1}).sort("-postingDate");
    res.status(201).json({ postList : postList });
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})

//베스트 게시물 불러오기 API
Router.get('/postBest', async(req, res) => {
  try {
    const postList = await Board.find({postingDel: 1}).sort({"postingSeen": -1}).limit(4);
    res.status(201).json({ postList : postList });
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})

//게시글 등록 API

Router.post('/posting', authMiddleWare, async(req, res) => {
  const {user} = res.locals
  const { postingTitle, postingDate, postingComment, postingImgUrl, postingDel } = req.body;
  try {
    const posting = new Board({postingTitle, postingEmail:user.userEmail ,postingAuthor: user.userNickname, 
      postingDate, postingComment, postingImgUrl, postingSeen:0,
      postingDel});
      await posting.save();
      const postingOne = await Board.findOne().sort({'_id': -1});// 새로추가됨
      //리덕스의 상태를 변화시키기 위해 메세지만 보내는 것이 아닌 방금 등록한 글을 바로 보내주어
      //리덕스에 추가시켜준다. 따라서 화면에 그려지는 부분은 리덕스가 변화되었기 때문에
      //새로 갱신되게 된다.
    res.status(201).json({
      Message: '게시글 등록에 성공했습니다', 
      result: postingOne
    });
  } catch (err) {
      res.status(500).send({ 
        errorMessage: '게시글 등록에 실패했습니다.'
      });
  }
})

//게시글 수정 API
Router.patch('/postModify', async (req, res, next) => {
  try {
    const { postID, postingAuthor, postingTitle, postingComment, postingUpdate } = req.body;
      await Board.updateOne({_id: postID},{$set: { postingTitle, postingAuthor, postingComment, postingUpdate}});
      res.status(200).send({ message: '게시글 수정이 완료되었습니다!' });
  } catch (err) {
    res.status(500).send({ errorMessage: '게시글 수정 실패!, 관리자에 문의해주세요'})
  } //error found
});

//게시글 삭제 API
Router.patch('/postDelete', async(req, res) => {
  const { postID } = req.body;
  await Board.updateOne({_id: postID},{$set : {postingDel: 0}});
  res.send({ 
    Message: '게시글 삭제에 성공했습니다.' 
  });
})

//게시글 조회수 증가
Router.patch('/postClick', async(req, res) => {
  const { postID } = req.body;
  try {
    let postingSeen = await Board.findById({_id: postID});
    let count = postingSeen.postingSeen;
    await Board.updateOne({_id: postID},{$set : {postingSeen: count+1}});
    res.send({});
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})


module.exports = Router;
=======
const express = require('express');
const Router = express.Router();
const Board = require('../schemas/board');
const authMiddleWare = require("../middlewares/auth-middleware");

//게시글 상세페이지 API
Router.get('/inspect/:postID', async(req, res) => {
  const { postID } = req.params;

  try {
    const postingList = await Board.findById(postID);
    res.json({ postingList: postingList })
  } catch (err) {
    res.status(500).send({
      errorMessage: '해당 페이지에 게시글이 존재하지 않습니다.'
    });
  }
})

//게시물 불러오기 API
Router.get('/postlist', async(req, res) => {
  try {
    const postList = await Board.find({postingDel: 1}).sort("-postingDate");
    res.status(201).json({ postList : postList });
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})

//게시물 불러오기 API
Router.get('/postBest', async(req, res) => {
  try {
    const postList = await Board.find().sort("-postingSeen").limit(4);
    res.status(201).json({ postList : postList });
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})

//게시글 등록 API

Router.post('/posting', authMiddleWare, async(req, res) => {
  const {user} = res.locals
  const { postingTitle, postingDate, postingComment, postingImgUrl, postingDel } = req.body;
  try {
    const posting = new Board({postingTitle, postingEmail:user.userEmail ,postingAuthor: user.userNickname, 
      postingDate, postingComment, postingImgUrl, postingSeen:0,
      postingDel})
    await posting.save();
    res.status(201).send({ 
      message: "게시글 등록을 완료했습니다."
    });
  } catch (err) {
      res.status(500).send({ 
        errorMessage: '게시글 등록에 실패했습니다.'
      });
  }
})

//게시글 수정 API
Router.patch('/postModify', async (req, res, next) => {
  try {
    const { postID, postingAuthor, postingTitle, postingComment, postingUpdate } = req.body;
      await Board.updateOne({_id: postID},{$set: { postingTitle, postingAuthor, postingComment, postingUpdate}});
      res.status(200).send({ message: '게시글 수정이 완료되었습니다!' });
  } catch (err) {
    res.status(500).send({ errorMessage: '게시글 수정 실패!, 관리자에 문의해주세요'})
  } //error found
});

//게시글 삭제 API
Router.patch('/postDelete', async(req, res) => {
  const { postID } = req.body;
  await Board.updateOne({_id: postID},{$set : {postingDel: 0}});
  res.send({ 
    Message: '게시글 삭제에 성공했습니다.' 
  });
})

//게시글 조회수 증가
Router.patch('/postClick', async(req, res) => {
  const { postID } = req.body;
  try {
    let postingSeen = await Board.findById({_id: postID});
    let count = postingSeen.postingSeen;
    await Board.updateOne({_id: postID},{$set : {postingSeen: count+1}});
    res.send({});
  } catch (err) {
    res.status(400).send({
      errorMessage: '해당 게시물을 더이상 찾을 수 없습니다.'
    })
  }
})


module.exports = Router;
>>>>>>> d515dcf2310efa195633c3917454b3300b92e768
