import React,{useState,useEffect} from 'react'
import {Button,Tag, Input,message } from 'antd'
import {Link,useNavigate,useParams} from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import style from "./editor.less"
import Editor from 'for-editor'
import axios from 'axios'
import './index.css'

export default function ArticleEdit() {

  let [tags,setTags] =useState([])
  let [inputVisible,setInputVisible]=useState(false)
  let [inputValue,setInputValue]=useState('')
  let [content,setContent] = useState('')
  let [title,setTitle] = useState('')
  let [desc,setDesc] = useState('')
  const { TextArea } = Input;
  const navigate = useNavigate()
  let {id}=useParams()

  useEffect(()=>{
    if(id){
      axios.get('/api/article/'+id)
          .then(
                response =>{
                  setTitle(response.data.title)
                  setTags(response.data.cate.split(','))
                  setContent(response.data.content)
                  setDesc(response.data.desc)
                }
          )
    }
  },[id])

  const showInput=()=>{
    setInputVisible(true)
  }

  const handleInputChange =(e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    
    if(inputValue&&tags.indexOf(inputValue)===-1){
      // 若输入值不为空且不与已存在的标签重复
      // 则添加进标签数组
      tags=[...tags,inputValue]
    }
    // console.log(tags)
    setTags(tags)
    setInputValue('')
    setInputVisible(false)
  };

  const removeTag =(tag)=>{
    tags.splice(tags.indexOf(tag), 1)
    // console.log(tags)
    setTags(tags)
  }

  const saveContent =async ()=>{
      if(title===''){
        message.error('请输入标题')
        return;
      }

      if(content===''){
        message.error('请输入内容')
        return;
      }

      if(id){
        let newArticle={
          title:title,
          desc:desc,
          content:content,
          cate:tags.join(','),
          id:id,
        }

        const res=await axios.put('/api/article',newArticle)
        if(res.status!==200) {
          message.error('修改文章失败');
          return;
        }
        message.success('修改文章成功');
        navigate('/home/articleManage',{replace: false})

      }
      else{
        let newArticle={
          title:title,
          created_at:new Date(),
          desc:desc,
          content:content,
          cate:tags.join(',')
        }
        const res=await axios.post('/api/article',newArticle)
        if(res.status!==200) {
          message.error('添加文章失败');
          return;
        }
        message.success('添加文章成功');
        navigate('/home/articleManage',{replace: false})
      } 
  }

  return (
    <div className="edit_wrap">
      <div className="return_button">
        <Link to="/home/articleManage"><Button type="primary">返回</Button></Link>
      </div>
      <div className="edit_head">标题</div>
      <Input placeholder="请输入标题" size="large" onChange={(e)=>setTitle(e.target.value)} value={title}></Input>

      <div className="tag_wrap">
        <span>标签: </span>
        {
          tags.map((tag) => {
            return <Tag key={tag} closable onClose={()=>removeTag(tag)}>{tag}</Tag>
          })
        }
        {
          inputVisible? (
            <Input
              type="text"
              size="small"
              className="tag-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )
          :(
            <Tag className="site-tag-plus" onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )
        }
      </div>

      <div className="edit_head">简介</div>
      <TextArea rows={5} placeholder="请输入简介" onChange={e=>setDesc(e.target.value)} value={desc}></TextArea>

      <div className="edit_head">内容 (Markdown编辑器)</div>
      <div className={style["editor-wrap"]}>
        <Editor value={content} onChange={(value)=>setContent(value)} height="100%"></Editor>
      </div>
      <div className="save_button">
        <Button type="primary" onClick={saveContent}>保存</Button>
      </div>
    </div>
  )
}
