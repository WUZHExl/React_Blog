import Article from '../pages/front/Article';
import Sidebar from '../pages/front/SideBar';
import About from '../pages/front/About';
import ArticleDetail from '../pages/front/ArticleDetail'
import CateArticle from '../pages/front/CateArticle'
import Login from '../pages/Login'
import Home from '../pages/background/Home'
import Welcome from '../pages/background/Home/welcome'
import UserManage from '../pages/background/UserManage'
import ArticleManage from '../pages/background/ArticleManage'
import ArticleEdit from '../pages/background/ArticleEdit'
import CateManage from '../pages/background/CateManage';
import {Navigate,Routes, Route,} from 'react-router-dom'


// import {useRoutes} from "react-router-dom";
// import { Suspense, lazy } from 'react'
// const routes=[
//   {path:'/',element:<Navigate to="/article"/>},
//   {
//     path:'/article',
//     element:<Sidebar/>,
//     index:<Article/>,
//   },
// ]

import React, { Component } from 'react'

export default class route extends Component {
  render() {
    return (
      
      <Routes>
        <Route path="/" element={<Navigate to="/article"/>}/>
        <Route path="/article/" element={<Sidebar/>}>
          <Route index element={<Article/>}/>
          <Route path="about" element={<About/>}/>
          <Route path=":id" element={<ArticleDetail/>}/>
          <Route path="cateArticle/:cate" element={<CateArticle/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home/" element={<Home/>}>
          <Route index element={<Welcome/>}/>
          <Route path="articleEdit/" element={<ArticleEdit/>}>
            <Route path=":id" element={<ArticleEdit/>}/>
          </Route>
          <Route path="userManage" element={<UserManage/>}/>
          <Route path="articleManage" element={<ArticleManage/>}/>
          <Route path="cateManage" element={<CateManage/>}></Route>
        </Route>
      </Routes>
      
    )
  }
}


