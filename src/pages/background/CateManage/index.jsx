import React,{useRef,useState,useEffect,useCallback} from 'react'
import { Card,Button, Row, Col,Modal,Input,message,Popconfirm } from 'antd';
import {Link} from 'react-router-dom'
import Breadcrumb from '../../../components/background/Breadcrumb';
import axios from 'axios'
import './index.css'
import {
  getLists
} from '../../../redux/actions'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

function CateManage(props) {

  // let [cateList,setCateList]= useState([])
  const [visible,setVisible] = useState(false)
  const [changeVisible,setChangeVisible] = useState(false)
  const [preCate,setPreCate] = useState({id:'',prename:''})
  const newCateValue=useRef()
  const changeCateValue=useRef()
  const {getList}=props

  let getAllCateLists=useCallback(()=>{
    getList({url:'cate'})
    // setCateList(props.cateList)
  },[getList])

  useEffect(() =>{
    getList({url:'cate'})
    // getAllCateLists()
  },[getList])

  const handleOk=()=>{
    let cate=newCateValue.current.state.value
    axios.post('/api/cate',{
      name:cate
    }).then(
      response=>{
        message.success('添加分类成功')
        getAllCateLists()
        newCateValue.current.state.value=''
        setVisible(false)
      }
    )
  }

  const handleCancel=()=>{
    setVisible(false)
    message.warning('取消添加分类')
  }

  const confirm=async (item)=>{

    let res=await axios.delete('/api/cate',{
      data:{
        id: item.id,
        name:item.name
        }
    })
    if(res.status!==200){
       message.error('删除过程失败')
       return;
    }
    getAllCateLists()
    message.success('删除成功')
  }

  const cancel=()=>{
    message.warning('取消删除')
  }

  const changeOk=()=>{
      let newCate=changeCateValue.current.state.value
      axios.put('/api/cate',{
        id:preCate.id,
        name:newCate,
        prename:preCate.name
      }).then(
        response=>{
           message.success('修改成功')
           getAllCateLists()
           changeCateValue.current.state.value=''
           setChangeVisible(false)
        }
      )

  }

  const changeCancel=()=>{
      setChangeVisible(false)
      message.warning('取消修改分类')
  }

  const showEditCate=(cate)=>{
      setChangeVisible(true)
      setPreCate({id:cate.id,prename:cate.name})
  }


  return (
  <React.Fragment>
      <Breadcrumb  className='bread' name="/home/cateManage" title="分类管理"></Breadcrumb>

      <Row className="row-bg">
        <Col>
          <Button type="primary" onClick={()=>setVisible(true)}>添加分类</Button>
        </Col>
      </Row>
      <div className="cateList">
          {props.cateList.map((cate=>{
            return (
            <Card key={cate.id}>
              <Row justify="space-between">
                  <Col span={5}><Link target = "_blank" to={`/article/cateArticle/${cate.name}`}><h1>{cate.name}</h1></Link></Col>
                  <Col span={4}>{cate.createdAt}</Col>
              </Row>
              <Row justify="end" className="row_space">
                  <Col span={3} className="col_space">
                  <span onClick={()=>showEditCate(cate)}>编辑</span>
                  <Link target = "_blank" to={`/article/cateArticle/${cate.name}`}><span><span>浏览</span></span></Link>
                  <Popconfirm 
                  onConfirm={()=>confirm(cate)} 
                  onCancel={cancel}
                  title="Are you sure to delete this Cate?"
                  ><span>删除</span>
                  </Popconfirm>
                  </Col>
              </Row>
            </Card>
            )
          }))}
      </div>

      <Modal title="添加分类"
        visible={visible} onOk={handleOk} onCancel={handleCancel}>
          <p>请输入新的分类：</p>
          <Input placeholder="New Cate" ref={newCateValue}></Input>
      </Modal>

      <Modal title="修改分类"
        visible={changeVisible} onOk={changeOk} onCancel={changeCancel}>
          <p>{`原来的分类是:${preCate.prename}`}</p>
          <Input placeholder="New Cate" ref={changeCateValue}></Input>
      </Modal>
  </React.Fragment>
  )
}

export default connect(

  // mapStateToProps
  state =>({
    cateList:state.cateList
  }),


  // mapDispatchToProps
  dispatch => ({
    getList:data=>dispatch(getLists(data)),
  })

)(CateManage)
