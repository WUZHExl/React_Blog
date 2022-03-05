// 引入admin表的model
const LoginModel = require ('../model/loginDb');
const Token= require('./token.js')

async function login(ctx){

  let result=await LoginModel.findOne({
    where: {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    }
  })

  if(result){

    let token=Token.createToken(
      {
        user:result.username,
        password: result.password
      }
    )
    result.dataValues.token = token
    ctx.body=result;
  }else{
    ctx.status=403
    ctx.body="没有权限"
  }
}

// 配置对象
let exportObj = {
    login
};
// 导出对象，供其它模块调用
module.exports = exportObj;