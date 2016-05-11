正式开始一个项目


var crypto = require('crypto')
  , text = 'I love cupcakes'
  , key = 'abcdeg'
  , hash

hash = crypto.createHmac('sha1', key).update(text).digest('hex')

http://www.myext.cn/javascript/a_8248.html


https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B