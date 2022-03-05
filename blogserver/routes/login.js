// 引入路由对象
const router = require('koa-router')()
// 引入我们自定义的controller
const LoginController = require('../controllers/login');

const Token= require('../controllers/token.js')

// 定义文章列表路由，GET请求
router.post ('/login', LoginController.login);

router.get('/test',function(req, res) {

		Token.verifyToken(req.headers.authorization)
    .then(res => {
			next()
      res.send('11111')
		}).catch(e => {
			res.status(401).send('invalid token')
		})

  
})
// 导出路由，供app.js文件调用
module.exports = router;