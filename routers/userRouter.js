const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
require('dotenv').config();

const joiUser = Joi.object({
    userEmail: Joi.array().items(Joi.string().email({ minDomainSegments: 2 })).unique().required(),
    userNickname: Joi.array().items(Joi.string()).required().unique(),
    userPassword: Joi.array().items(Joi.string()).required().unique(),
});

userRouter.post('/register', 어스미들웨어, 일치하는지 아닌지 미들웨어, async(req, res) => {
    const { userEmail, userNickname } = joiUser.validateAsync(req.body);

    let { userPassword } = joiUser.validateAsync(req.body);
    const existNickname = await User.find({ userNickname });
    const existEmail = await User.find({ userEmail });

    if (existEmail.length) {
        res.status(400).send({
            errorMessage: '이미 이메일이 존재합니다.'
        });
        return;
    }
    if (existNickname.length) {
        res.status(400).send({
            errorMessage: '이미 동일한 닉네임이 존재합니다.'
        });
        return;
    }
    const encryptedPassowrd = bcrypt.hashSync(userPassword, 10);
    userPassword = encryptedPassowrd;
    const user = new User({ userEmail, userNickname, userPassword });
    await user.save();

    res.status(201).send({
        Message: '회원가입이 완료되었습니다.'
    });
});

userRouter.post('/auth', async(req, res) => {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail }).exec();

    if (!user) {
        res.status(400).send({
            errorMessage: '이메일 또는 패스워드가 잘못되었습니다'
        })
        return;
    }

    bcrypt.compare(userPassword, user['userPassword'], function(err, msg) {
        if (msg === true) {
            const token = jwt.sign({ userID: user.userID }, process.env.TOKEN_KEY);
            res.send({
                token,
                userNickname: user.userNickname,
                Message: '해시값과 비밀번호 동일, 로그인 완료'
            })
        } else {
            res.status(400).send({
                errorMessage: '이메일 또는 패스워드가 잘못되었습니다.'
            })
            return;
        }
    })
})

module.exports = userRouter;