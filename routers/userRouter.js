const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

userRouter.get('/register', async(req, res) => {
  const {userNickname} = req.body;
  let {userPassword} = req.body;
  const existUsers = await User.find({userNickname});
  if(existUsers.length){
    res.status(400).send({
      errorMessage: '이미 동일한 닉네임이 존재합니다.'
    });
    return;
  }
  const encryptedPassowrd = bcrypt.hashSync(password, 10);
  password = encryptedPassowrd;
  const user = new User({nickname, password});
  await user.save();

  res.status(201).send({
    Message: '회원가입이 완료되었습니다.'
  });
});

userRouter.post('/auth' , async(req, res) => {
  const {userNickname, userPassword} = req.body;
  const user = await User.findOne({nickname}).exec();

  if(!user){
    res.status(400).send({
      errorMessage:'이메일 또는 패스워드가 잘못되었습니다'
    })
    return;
  }

  bcrypt.compare(password, user['password'], function(err, msg){
    if(msg === true){
      const token = jwt.sign({ userId: user.userId }, process.env.TOKEN_KEY);
      res.send({
        token,
      })
    }

    else{
      res.status(400).send({
        errorMessage:'이메일 또는 패스워드가 잘못되었습니다.'
      })
      return;
    }
  })
})

module.exports = userRouter;