var express = require('express');

var router = express.Router();
var weixin = require('weixin-api');
var crypto = require('crypto');
var xml2js = require('xml2js');
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
  //console.log(req.body);
  //console.log(req.body.xml.Content[0]);
  var msg=req.body.xml;
  console.log(msg.Content[0]);
  console.log(msg.ToUserName[0]);
  console.log(msg.FromUserName[0]);
  var time = Math.round(new Date().getTime() / 1000);
  var output="";
  switch(msg.Content[0])
  {
    case "text":
    output = 
	"<xml>" + 
		 "<ToUserName><![CDATA[" + msg.FromUserName[0] + "]]></ToUserName>" + 
		 "<FromUserName><![CDATA[" + msg.ToUserName[0] + "]]></FromUserName>" + 
		 "<CreateTime>" + time + "</CreateTime>" + 
		 "<MsgType><![CDATA[text]]></MsgType>" + 
		 "<Content><![CDATA[<a href='www.baidu.com'>adfasdf</a>]]></Content>" + 
	"</xml>";
    break;
    case "link":
    output = 
	"<xml>" + 
		 "<ToUserName><![CDATA[" + msg.FromUserName[0] + "]]></ToUserName>" + 
		 "<FromUserName><![CDATA[" + msg.ToUserName[0] + "]]></FromUserName>" + 
		 "<CreateTime>" + time + "</CreateTime>" + 
		 "<MsgType><![CDATA[link]]></MsgType>" + 
     "<Title><![CDATA[链接测试]]></Title>"+
     "<Description><![CDATA[链接描述]]></Description>"+
     "<Url><![CDATA[www.baidu.com]]></Url>"+
     "<MsgId>"+msg.MsgId[0]+"</MsgId>"+ 
	"</xml>";
    break;
  }
	
 res.set('Content-Type', 'text/xml');
 res.send(output);
 //res.end();
});



module.exports = router;