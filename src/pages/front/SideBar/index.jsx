import React, { Component } from 'react'
import header from "../../../assets/header.jpg"
import {
  GithubOutlined,
  WechatOutlined,
  MailOutlined,
  PhoneFilled
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Outlet} from 'react-router';
import {NavLink} from 'react-router-dom'
import './index.css'
import axios from 'axios';

import store from '../../../redux/store'
import {
  getLists
} from '../../../redux/actions'


export default class SideBar extends Component {


  state={articleNum:0,cateName:[]}


  //组件挂载完毕的钩子
  componentDidMount(){
    // const {articleNum}=this.state
    axios.get('/api/article/')
    .then(
      response => this.setState({articleNum:response.data.length})
    )
    this.getAllCateLists()

    store.subscribe(()=>{
			this.setState({})
		})
  }

  getAllCateLists=()=>{
    store.dispatch(getLists({url:'cate'}))
  }

  pathChange=(path)=>{
    this.props.history.push(`/article/${path}`)
  }

  render() {
    const cateName=store.getState().cateList
    return (
      <React.Fragment>
        <div className="left_me">
            <div className="menu_title">
              <div className="title">Arz'S NOTES</div>
              <div className="note">桃李春风一杯酒，江湖夜雨十年灯</div>
            </div>
            <nav>
              <ul>
                <NavLink to="/article">
                <li className="nav">
                  <span>首页</span>
                </li>
                </NavLink>
                <NavLink to="/article/about">
                <li className="nav">
                  <span>关于</span>
                </li>
                </NavLink>
                <li className="nav">
                  <span>分类</span>
                </li>
                <ul>
                  {
                    cateName.map(cate=>{
                      return (<NavLink to={`/article/cateArticle/${cate.name}`}>
                        <li key={cate.id} className="childList">{cate.name}</li>
                        </NavLink>)
                    })
                  }
                </ul>
              </ul>
            </nav>
            <div className="info">
              <img src={header} alt="head"/>
              <div className="info_name">Arz</div>
              <div className="archive">
                <ul>
                  <li>
                    <span className="archive_count">{this.state.articleNum}</span>
                    <span className="archive_name">文章</span>
                  </li>
                </ul>
              </div>
              <ul className="communication">
                <li className="communication_item item_github">
                  <Tooltip title="https://github.com/WUZHExl">
                  <a href="https://github.com/WUZHExl" target="_blank" rel="noopener noreferrer">
                    <GithubOutlined/>
                  </a>
                  </Tooltip>
                </li>
                <li className="communication_item">
                  <Tooltip title="wz394319">
                    <WechatOutlined />
                  </Tooltip>
                </li>
                <li className="communication_item">
                  <Tooltip title="553531290@qq.com">
                    <MailOutlined />
                  </Tooltip>
                </li>
                <li className="communication_item">
                  <Tooltip title="17821255446">
                    <PhoneFilled />
                  </Tooltip>
                </li>
              </ul>
            </div>
        </div>
        <Outlet/>
      </React.Fragment>
    )
  }
}
