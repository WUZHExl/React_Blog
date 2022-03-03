import React from 'react'
import {Breadcrumb} from 'antd'
import { HomeOutlined, OrderedListOutlined } from '@ant-design/icons';
export default function BreadCrumb(props) {
  return (
    <Breadcrumb className={props.className}>
    <Breadcrumb.Item href="/home">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item href={props.path}>
      <OrderedListOutlined />
      <span>{props.title}</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Application</Breadcrumb.Item>
  </Breadcrumb>
  )
}
