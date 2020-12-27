import React from 'react'
import { Link } from 'react-router-dom';

import Styled from "@emotion/styled";

import { Layout, Menu } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const Logo = Styled.div`
  position: absolute;
  top: 0;
  right: calc(50% - 90px);
  width: 180px;
`;

const NavHeader = (props) => {
  return (
    <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" onClick={props.toggle}>
          {
            props.state ? <MenuUnfoldOutlined style={{fontSize:'20px'}}/> : <MenuFoldOutlined style={{fontSize:'20px'}}/>
          }
        </Menu.Item>
        <Logo>
          <Link to='/'>
            <img src={require(  "../../images/logo/logo-white.png")} alt="Logo" style={{width:'100%'}} />
          </Link>
        </Logo>
      </Menu>
    </Header>
  );
}

export default NavHeader;