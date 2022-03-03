import React from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Tag } from 'antd';
export default function CateArticle() {

  let [article,setArticle]=React.useState([])
  let {cate}=useParams()
  let key=1
  const navigate = useNavigate()
  React.useEffect(()=>{
    axios.get('/api/article/')
    .then(
      response => {
        // console.log(response)
        let article =[]
        let temp=response.data.filter(item=>{
          return item.cate.split(',').indexOf(cate)!==-1
        })
        article.splice(0,article.length,...temp)
        article=article.reverse()
        setArticle(article)
      }
    )
  },[cate])

  let pathChange=(id)=>{
    //第一种使用方式：指定具体的路径
    navigate(`/article/${id}`, {
    replace: false,
    }) 
  }


  return (
    <div className="content">
      {
        article.length===0?<div className="article_another">
        该分类下没有相关文章
      </div>:
      article.map(article=>{
        let cate
        if(article.cate.split(',').length === 0||article.cate.split(',')[0]===''){
          cate=<span>未分类</span>
        }else{
          cate=article.cate.split(',').map((item)=>{
            // console.log(article.id+index)
            return <Tag color="processing" key={key++}>{item}</Tag>
          })
        }
        return (
            <div className="article_wrap" key={article.id}>
              <div className="article_title" onClick={()=>pathChange(article.id)}>{ article.title }</div>
              <div className="article_info">
                <span className="article_info_date">发表于：{article.createdAt }</span>
                <span className="article_info_label">标签：
                {cate}
                </span>
              </div>
              <div className="article_gist">{article.desc}</div>
              <div className="article_button article_all" onClick={()=>pathChange(article.id)}>阅读全文</div>
              <div className="article_underline"></div>
            </div>
        )
      })
      }
    </div>
  )
}

