const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
  return res.send({resdata: 'api서버 테스트입니다'})
})

module.exports = router;