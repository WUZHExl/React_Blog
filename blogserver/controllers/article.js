// 引入admin表的model
const ArticleModel = require ('../model/articleDb');
const CateModel = require ('../model/cateDb');
// const Token= require('./token.js')
const sequelize = require('../config/db')


async function getArticle(ctx){
  let articleLists=await ArticleModel.findAll({
    'order':[ 
      ["id"]
     ]
  })

  ctx.body=articleLists;
  
}

async function info(ctx){
  try{
    let article=await ArticleModel.findOne({
      where: {'id':ctx.params.id}
    })

    ctx.body=article
  }catch(e){
    ctx.body='查询失败'
  }
}

async function addArticle(ctx){
   
  // console.log(req.body)
  const t = await sequelize.transaction();
  try {

    // Then, we do some calls passing this transaction as an option:
    const article = await ArticleModel.create(ctx.request.body, { transaction: t });
    let {cate}=ctx.request.body;
    cate=cate.split(',')

    const cateLists=await CateModel.findAll({'order':[ ["id"]]}, { transaction: t })
    // console.log(cate);
    let cateList=[]
    // console.log(cateLists)
    for(let key in cateLists){
      cateList.push(cateLists[key].dataValues.name)
    }
    // console.log(cateList)
    cate=cate.filter(item=>{
      return !cateList.includes(item)
    })

    if(cate!==['']){
      for(let c of cate){
        await CateModel.create({name:c}, { transaction: t })
      }
    }
    // console.log(cate);  
    await t.commit();
    ctx.body='成功添加文章'
  
  } catch (error) {
    await t.rollback();  
    ctx.body='添加文章失败'
  }

}

async function updateArticle(ctx){

  const t = await sequelize.transaction();
  try {
    // Then, we do some calls passing this transaction as an option:
    const article = await ArticleModel.update(ctx.request.body,{where:{id:ctx.request.body.id}} ,{ transaction: t });
    let {cate}=ctx.request.body;
    cate=cate.split(',')

    const cateLists=await CateModel.findAll({'order':[ ["id"]]}, { transaction: t })
    // console.log(cate);
    let cateList=[]
    // console.log(cateLists)
    for(let key in cateLists){
      cateList.push(cateLists[key].dataValues.name)
    }
    // console.log(cateList)
    cate=cate.filter(item=>{
      return !cateList.includes(item)
    })

    if(cate!==['']){
      for(let c of cate){
        await CateModel.create({name:c}, { transaction: t })
      }
    }
    // console.log(cate);  
    await t.commit();
    ctx.body='成功更新文章'
  
  } catch (error) {
    await t.rollback();  
    ctx.body='更新文章失败'
  }
}

async function updateCount(ctx){
  try {
    console.log(ctx.request.body)
    const article = await ArticleModel.update({viewcount:ctx.request.body.count},{where:{id:ctx.request.body.id}});
    console.log(article);
    ctx.body='成功更新文章'
  }
  catch (error) {
    ctx.body='更新文章失败'
  }
}

async function remove(ctx){

  // console.log(req)
  try{
    await ArticleModel.destroy({
      where:{
        id:ctx.request.body.id
      }
    })
    ctx.body='成功删除文章'
  }
  catch(error) {
     ctx.body=error
  }
}

// 配置对象
let exportObj = {
  getArticle,
  info,
  addArticle,
  updateArticle,
  remove,
  updateCount
};
// 导出对象，供其它模块调用
module.exports = exportObj;
