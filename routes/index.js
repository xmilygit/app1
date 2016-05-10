var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var teacher = mongoose.model('Teacher');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '成绩管理系统' });
});


router.get('/update', function (req, res, next) {
  var strname='jj';
  teacher.find({}, function (err, docs) {
    if (err)
      console.log(err);
    for (var index = 0; index < docs.length; index++) {
      var element = docs[index];
      strname=strname+element.tName;      
    }
  })
  res.render('index', { name1: strname });
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
