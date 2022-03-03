import React from 'react'
import { Layout, Menu,Button } from 'antd';
import {UserOutlined,EditOutlined,OrderedListOutlined} from '@ant-design/icons';
import {useNavigate,Link} from 'react-router-dom'
import { Outlet } from 'react-router';
import './index.css'
export default function Home() {

  const { Header, Content, Sider } = Layout;
  const [collapsed,setCollapsed]=React.useState(false);
  const navigate = useNavigate()

  let onCollapse=(collapsed)=>{
    setCollapsed(collapsed)
  }

  let pathChange=(path)=>{
    navigate(`/home/${path}`,
      {replace:false}
      )
  }

  return (
    <Layout className="layout-container-demo">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div>
            <span>博客管理系统</span>
          </div>
          <Link to="/login"><Button>退出</Button></Link>
      </Header>
      <Layout style={{marginTop: 64 }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} 
               style={{position: 'fixed',zIndex: 1, height: '100%'}}
        >
          {/* <div className="toggle-button" onClick="toggleCollapse">|||</div> */}
          {/* defaultSelectedKeys={['2']} */}
          <Menu theme="dark">
            <Menu.Item key="2" icon={<EditOutlined/>} onClick={()=>pathChange('articleManage')}>文章管理</Menu.Item>
            <Menu.Item key="3" icon={<OrderedListOutlined/>} onClick={()=>pathChange('cateManage')}>分类管理</Menu.Item>
            <Menu.Item key="1" icon={<UserOutlined/>} onClick={()=>pathChange('userManage')}>用户管理</Menu.Item>
          </Menu>
        </Sider>
        <Content style={collapsed?{marginLeft:64}:{marginLeft:200}}><Outlet></Outlet></Content>
      </Layout>
    </Layout>
  )
}
