import React from 'react'
import {Card} from 'antd';
import Breadcrumb from '../../../components/background/Breadcrumb'
import './index.css'
export default function UserManage() {

  return (

    <React.Fragment>
      <Breadcrumb className='bread' name="/home/userManage" title="用户管理"></Breadcrumb>

      <Card className='card'>暂无内容</Card>
   </React.Fragment>
  )
}
