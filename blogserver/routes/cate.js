//引入路由
const router = require('koa-router')()
// 引入我们自定义的controller
const CateController = require('../controllers/cate');


router.get('/cate',CateController.getAllCate)

router.post('/cate',CateController.addCate)

router.delete('/cate',CateController.removeCate)

router.put('/cate',CateController.updateCate)


module.exports = router