import React from 'react'

import { Layout, Menu } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const NavHeader = (props) => {
  return (
    <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" onClick={props.toggle}>
          {
            props.state ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
        </Menu.Item>
        <div key="2"
        style={{
          position:'absolute', 
          right:'37%',
          margin:'auto',
          top:0,
          width:'180px'}}>
          <img src={require(  "../../images/logo/logo-white.png")} alt="Logo" style={{width:'100%'}} />
        </div>
      </Menu>
    </Header>
  );
}

export default NavHeader;