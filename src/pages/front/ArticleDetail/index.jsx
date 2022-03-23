import React,{useCallback,useRef,useLayoutEffect,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  EyeOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
import gfm from 'remark-gfm'
import './index.css'

export default function ArticleDetail() {

  let [article,setArticle] = React.useState({
                          title:'',
                          createdAt:'',
                          cate:'',
                          content:'',
                          desc:''})
  let count = useRef(0)
  let key=1
  let {id}=useParams()

  let updateCount=useCallback(async ()=>{
    let newArticle={
      id:id,
      count:count.current
    }
    const res=await axios.put('/api/article/Count',newArticle)
    //console.log(newArticle)
    if(res.status!==200) {
      return;
    }
  },[id,count])

  //#region 
  // let counts=useCallback(()=>{
  //   // 进入页面执行
  //   // 记录当前时间并转成时间戳
  //   const now = new Date().getTime();
  //   // 从缓存中获取用户上次退出的时间戳
  //   const leaveTime = parseInt(localStorage.getItem('leaveTime'), 10);
  //   // 判断是否为刷新，两次间隔在5s内判定为刷新操作
  //   const refresh = (now - leaveTime) <= 5000;
  //   // 测试alert
  //   //alert(refresh ? '刷新' : '重新登陆');
    
  //   if(!refresh) {
  //     count.current += 1;
  //     console.log(count.current);
  //     updateCount()

  //   }
            
  //   //退出当前页面执行
  //   window.onunload = function(e){ // ios 不支持 window.onbeforeunload()
  //     // 将退出时间存于localstorage中
  //     localStorage.setItem('leaveTime', new Date().getTime());
  //   }
  // },[updateCount])
  //#endregion



  useLayoutEffect(()=>{

    axios.get('/api/article/'+id)
    .then(
      response=>{
        //console.log(response.data)
        let date=new Date(response.data.createdAt).toLocaleString() 
        let counts=(response.data.viewcount||0)+1
        count.current=counts
        setArticle({title:response.data.title,
        createdAt:date,
        cate:response.data.cate.split(','),
        content:response.data.content,
        desc:response.data.desc})
        //console.log(counts)
      }
    )
  },[id,count])

  useEffect(()=>{
    return ()=>updateCount()
  },[updateCount])

  // useEffect(() =>{
  //   window.addEventListener("unload", counts())
  //   return window.removeEventListener("unload", counts())
  // },[counts])

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
      {/*console.log(count)*/}
      <div className="article_wrap">
        <div className="article_title article_detail_title">{ article.title }</div>
        <div className="article_info">
          <span className="article_info_date">发表于：{article.createdAt}</span>
          <span><EyeOutlined/>{count.current}</span>
          <span className="article_info_label">标签：
          {cate}
          </span>
        </div>
        <div className="article_gist">{article.desc}</div>
        <div className="content_dir">
        <ReactMarkdown remarkPlugins={[gfm]} children={article.content} />
        </div>
      </div>
    </div>
  )
}
