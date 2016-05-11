var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport')
var crypto = require('crypto')
  , key = 'xmilyxljxhh'
  , hash


var router = express.Router();

var teacher = mongoose.model('Teacher');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '成绩管理系统' });
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


router.get('/update', function (req, res, next) {
  var strname = 'jj';
  teacher.find({}, function (err, docs) {
    if (err)
      console.log(err);
    for (var index = 0; index < docs.length; index++) {
      var element = docs[index];
      hash = crypto.createHmac('sha1', key).update(element.tPassword).digest('hex');
      element.tPassword = hash;
      element.save(function (err, doc) {
        if (err)
          console.log(err);
        console.log(doc.tName + '的密码修改成功！')
      })
    }
    res.render('index', { name1: strname });
  })

  /*
  teacher.find({tName:'徐明'},'tName tSex',function (err,doc) {
    if(err) console.log(err);
    console.log('find'+res.tName);
    res.render('index',{title:doc[0].tName,name1:doc[0].tName})
  })
  */
})

function test(psw) {
  return psw + 'abadf';
}
module.exports = router;
