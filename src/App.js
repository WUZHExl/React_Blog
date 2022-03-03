import Routes from './routes'
import React from 'react'
import './assets/global.css'
import 'antd/dist/antd.min.css';
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
    <Routes/>
    }
    </React.Fragment>
  );
}

export default App;
