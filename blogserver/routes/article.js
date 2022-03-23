//引入路由
const router = require('koa-router')()
// 引入我们自定义的controller
const ArticleController = require('../controllers/article');
// 定义文章列表路由，GET请求
router.get ('/article', ArticleController.getArticle);
// 定义单条文章路由，GET请求
router.get ('/article/:id', ArticleController.info);
// 定义添加文章路由，POST请求
// router.post ('/', ArticleController.add);
router.post('/article', ArticleController.addArticle)
// 定义修改文章路由，PUT请求
router.put ('/article', ArticleController.updateArticle);
// 定义删除文章路由，DELETE请求
router.delete ('/article', ArticleController.remove);
// 导出路由，供app.js文件调用
router.put ('/article/Count', ArticleController.updateCount);

module.exports = router;