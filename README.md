正式开始一个项目


var crypto = require('crypto')
  , text = 'I love cupcakes'
  , key = 'abcdeg'
  , hash

hash = crypto.createHmac('sha1', key).update(text).digest('hex')

http://www.myext.cn/javascript/a_8248.html