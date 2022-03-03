import React from 'react'
import { Card,Button, Row, Col,Popconfirm,message} from 'antd';
import Breadcrumb from '../../../components/background/Breadcrumb'
import {Link} from 'react-router-dom'
import './index.css'
import axios from 'axios'
export default function ArticleManage() {

  let [articleList,setArticleList]= React.useState([])
  React.useEffect(() =>{
    getAllArticle()
    // return ()=>mounted=false
    },
  [])

  const getAllArticle=()=>{
    let articleList=[]
    // let mounted=true
    axios.get('/api/article')
    .then(
      response =>{
        articleList.splice(0,articleList.length,...response.data)
        articleList=articleList.reverse()
        //  if(mounted)
         setArticleList(articleList)
      }
    )
  }

  const confirm=async(item)=>{
    let res=await axios.delete('/api/article',{
      data:{
        id: item.id,
        }
    })
    if(res.status!==200){
       message.error('删除过程失败')
       return;
    }
    message.success('删除成功')
    getAllArticle()
  }

  const cancel=()=>{
    message.warning('取消删除')
  }

  return (
  <React.Fragment>
     <Breadcrumb  className='bread' name="/home/articleManage" title="文章管理"></Breadcrumb>

    <Row className="row-bg">
      <Col>
      <Link to="/home/articleEdit"><Button type="primary"><span>写文章</span></Button></Link>
      </Col>
    </Row>
    <div className="articleList">
      {articleList.map((article=>{
        return (
        <Card key={article.id}>
          <Row justify="space-between">
              <Col span={18}><Link to={`/article/${article.id}`} target="_blank"><h1>{article.title}</h1></Link></Col>
              <Col span={4}>{article.createdAt}</Col>
          </Row>
          <Row justify="space-between" className="row_space">
              <Col span={10}>{article.desc}</Col>
              <Col span={3}>
              <Link to={`/home/articleEdit/${article.id}`}><span>编辑</span></Link>
              <span><Link to={`/article/${article.id}`} target="_blank"><span>浏览</span></Link></span>
              <Popconfirm 
              onConfirm={()=>confirm(article)} 
              onCancel={cancel}
              title="Are you sure to delete this Article?"
              ><span>删除</span></Popconfirm>
              </Col>
          </Row>
        </Card>
        )
      }))}
   </div>
   </React.Fragment>
  )
}
