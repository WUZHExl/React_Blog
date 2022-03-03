import React from 'react'
import head from "../../assets/head.jpg"
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './index.css'

export default function Login() {

  const formRef = React.createRef();
  const navigate= useNavigate()
  const rules={
      username:[
        {
          required: true,
          message: 'Please input your username!',
        },
      ],
      password:[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]
  }


  let onReset = () => {
    // console.log('111')
    formRef.current.resetFields();
  };

  let onFinish =async (values) => {
    // console.log(values);

    // const { username,password}=values;
    const res=await axios.post('/api/login/',values)
    // console.log(res)
    if(res.status!==200) {
      message.error('登录失败');
      return;
    }
    message.success('登录成功');
    navigate('/home',
      {
      replace:false,
      }
    )

  };

  return (
      <div className="login_container">
        <div className="login_box">
        {/* <!-- 头像区 --> */}
          <div className="header_box">
            <img src={head} alt=""/>
          </div>
          {/* 表单 */}
          <Form className="loginForm"
          labelCol={{span:5}}
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
          ref={formRef}
          onFinish={onFinish}
          >
            <Form.Item label="Username" name="username" rules={rules.username}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item  label="Password" name="password" rules={rules.password}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="btns">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Button type="primary" style={{margin:'0 8px',}} onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}


