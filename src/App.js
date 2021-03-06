import Routes from './routes'
import React from 'react'
import './assets/global.css'
import 'antd/dist/antd.min.css';
import Login from './pages/Login'
import {useLocation} from 'react-router-dom'


function App() {

  const path=useLocation()
  
  return (
    <React.Fragment>
    {
    path.pathname.startsWith('/article')||path.pathname==='/'?
    <div className="main">
      <Routes/>
    </div>:
    (path.pathname.startsWith('/home'))&&sessionStorage.getItem('token')?
    <Routes/>:
    <Login/>
    // <Navigate to="/login"/>
    }
    </React.Fragment>
  );
}

export default App;
