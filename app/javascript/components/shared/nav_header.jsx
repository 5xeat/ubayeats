import React from 'react'
import { Link } from 'react-router-dom';


import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavHeader = () => {

const atClick = (e) => {
  // window.location.href= "/" + `users/${e.key}`;

  if (e.key === "sign_up"){
    window.location.pathname ='users/sign_up';
  }
  else if (e.key === "sign_in"){
    window.location.pathname ='users/sign_in';
  }
}
  
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Link to='/'>
        <div 
          className="logo" 
          style={{float:'left', width:'180px'}}>
          <img src={require(  "../../images/logo/logo-white.png")} alt="Logo" style={{width:'100%', display:'inline'}} />
        </div>
      </Link>
      <Menu 
        theme="dark" 
        mode="horizontal" 
        style={{float:'right'}}
        defaultSelectedKeys={['sign_up']}
        onClick={atClick}>
        <Menu.Item key="sign_up">註冊</Menu.Item>
        <Menu.Item key="sign_in">登入</Menu.Item>
      </Menu>
    </Header>
  );
}

export default NavHeader;