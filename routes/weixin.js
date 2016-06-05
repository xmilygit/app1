var express = require('express');

var router = express.Router();
var weixin = require('weixin-api');
var crypto = require('crypto');

weixin.token = 'xmilyhh';
/* GET users listing. */
router.get('/', function (req, res, next) {
  //接入验证
  if (weixin.checkSignature(req)) {
    res.status(200).send(req.query.echostr);
    //res.send(200,req.query.echostr)
  } else {
    res.status(200).send('fail');
  }

});

router.post('/', function (req, res, next) {
  res.status(200).send('asdfasdf');
});



module.exports = router;