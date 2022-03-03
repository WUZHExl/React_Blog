import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Tag } from 'antd';
import gfm from 'remark-gfm'
import './index.css'

export default function ArticleDetail() {

  let [article,setArticle] = React.useState({
                          title:'',
                          createdAt:'',
                          cate:'',
                          content:''})
  let key=1
  let {id}=useParams()
  React.useEffect(()=>{
    axios.get('/api/article/'+id)
    .then(
      response=>{
        setArticle({title:response.data.title,
        createdAt:response.data.createdAt,
        cate:response.data.cate.split(','),
        content:response.data.content})
      }
    )
  },[id])

  let cate=null
  if(article.cate.length === 0||article.cate[0]===''){
    cate=<span>未分类</span>
  }
  else{
    cate=article.cate.map(item=>{
      return <Tag color="processing" className="tag_margin" key={key++}>{item}</Tag>
    })
  }

  return (
    <div className="content">
      <div className="article_wrap">
        <div className="article_title article_detail_title">{ article.title }</div>
        <div className="article_info">
          <span className="article_info_date">发表于：{article.createdAt}</span>
          <span className="article_info_label">标签：
          {cate}
          </span>
        </div>
        <div className="content_dir">
        <ReactMarkdown remarkPlugins={[gfm]} children={article.content} />
        </div>
      </div>
    </div>
  )
}
