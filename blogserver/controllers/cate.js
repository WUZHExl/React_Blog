// 引入admin表的model
const CateModel = require ('../model/cateDb');
const ArticleModel = require ('../model/articleDb');
const sequelize = require('../config/db')
// const { Op } = require("sequelize");


async function getAllCate(ctx){  

  try{
    let cate= await CateModel.findAll({
      'order':[ 
        ["id"]
      ]
    })

    ctx.body=cate
  }catch(e){
    ctx.body=e
  }

}

async function addCate(ctx){

  try{
    await CateModel.create(ctx.request.body)
    ctx.body='成功添加分类'
  }
  catch(e){
    ctx.body='添加分类失败'
  }

}

async function removeCate(ctx){
 
  const t = await sequelize.transaction();
  try{
    await CateModel.destroy({where:{id:ctx.request.body.id}}, { transaction: t });
    const articleLists=await ArticleModel.findAll({attributes:['id','cate']},{'order':[ ["id"] ]}, { transaction: t })
    // console.log(articleLists)
    let article=[],num=0
    for(let key in articleLists){
      let id=articleLists[key].dataValues.id
      let cate=articleLists[key].dataValues.cate
      article[num]={}
      article[num].id=id
      article[num].cate=cate
      num++
    }
    article=article.filter(item=>{
      return item.cate.split(',').includes(ctx.request.body.name)
    })
    // console.log(article)
    for(let a of article){
        a.cate=a.cate.split(',').filter(c=>c!==ctx.request.body.name).join(',')
        await ArticleModel.update({cate:a.cate},{where:{id:a.id}} ,{ transaction: t });
    }
    // console.log(article)
    await t.commit();
    ctx.body='成功删除分类'
  }catch{
    await t.rollback();  
    ctx.body='删除分类失败'
  }
}

async function updateCate(ctx){
    const req=ctx.request
    const t = await sequelize.transaction();
    try{
        await CateModel.update(req.body,{where:{id:req.body.id}})
        const articleLists=await ArticleModel.findAll({attributes:['id','cate']},{'order':[ ["id"] ]}, { transaction: t })
        // console.log(articleLists)
        let article=[],num=0
        for(let key in articleLists){
          let id=articleLists[key].dataValues.id
          let cate=articleLists[key].dataValues.cate
          article[num]={}
          article[num].id=id
          article[num].cate=cate
          num++
        }
        article=article.filter(item=>{
          return item.cate.split(',').includes(req.body.prename)
        })
        // console.log(article)

        for(let a of article){
          a.cate=a.cate.split(',').map(item=>{
            return item===req.body.prename?req.body.name:item
          }).join(',')
          await ArticleModel.update({cate:a.cate},{where:{id:a.id}} ,{ transaction: t });
        }

        await t.commit();
        ctx.body='成功更新分类'
    }
    catch{
      await t.rollback();  
      ctx.body='更新分类失败'
    }

}


let Cate={
  getAllCate,
  addCate,
  removeCate,
  updateCate
}
// 导出对象，供其它模块调用
module.exports = Cate;