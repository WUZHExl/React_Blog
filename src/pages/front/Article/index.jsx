import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Tag } from 'antd';
// import axios from 'axios'
import './index.css'

// import store from '../../../redux/store'
import {
  getLists
} from '../../../redux/actions'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
import {
  EyeOutlined
} from '@ant-design/icons';


function Article(props) {

  // let [articleList,setArticleList] = React.useState([])
  let key=1
  const navigate = useNavigate()
  const {getList}=props
  React.useEffect(()=>{

      getList({url:'article'})
      
  },[getList])

  let pathChange=(id)=>{
      //第一种使用方式：指定具体的路径
      navigate(`/article/${id}`, {
      replace: false,
    }) 
  }



  return (

    <div className="content">
        {/* {console.log(articleList)} */}
        {
          props.articleList.map(article=>{
            let cate
            if(article.cate.split(',').length === 0||article.cate.split(',')[0]===''){
              cate=<span>未分类</span>
            }else{
              cate=article.cate.split(',').map((item,index)=>{
                // console.log(item)
                return <Tag color="processing" key={key++}>{item}</Tag>
              })
            }
            return (
                <div className="article_wrap" key={article.id}>
                  <div className="article_title" onClick={()=>pathChange(article.id)}>{ article.title }</div>
                  <div className="article_info">
                    <span className="article_info_date">发表于：{article.createdAt }</span>
                    <span><EyeOutlined/>{article.viewcount||0}</span>
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


export default connect(
  // mapStateToProps
  state =>({
    articleList:state.articleList
  }),


  // mapDispatchToProps
  dispatch => ({
    getList:data=>dispatch(getLists(data)),
  })
)(Article)

