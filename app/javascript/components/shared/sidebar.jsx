import React from 'react'
import Styled from "@emotion/styled";
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LoginOutlined,
  SketchOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Span = Styled.span`
  font-size:18px;
  line-height:40px;
`;

const iconStyle = {
  fontSize:'20px',
  verticalAlign:'2px',
}

const AppSideBar = (props) => {

  const atClick = (e) => {
    if (e.key === "sign_up"){
      window.location.pathname ='users/sign_up';
    }
    else if (e.key === "sign_in"){
      window.location.pathname ='users/sign_in';
    }
  }

  return (
    <Sider 
      trigger={null} 
      collapsible={true} collapsed={props.state} collapsedWidth="0" 
      style={{height:'100vh'}}
    >
      <UserOutlined 
      style={{
        fontSize:'80px',
        color:'rgba(255,255,255, .8)',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px' }}/>
      <Menu theme="dark" mode="inline" onClick={atClick}>
        <Menu.Item key="sign_up" icon={<SketchOutlined style={iconStyle}/>}>
          <Span>註冊</Span>
        </Menu.Item>
        <Menu.Item key="sign_in" icon={<LoginOutlined style={iconStyle}/>}>
          <Span>登入</Span>
        </Menu.Item>

        <Menu.Item key="1" icon={<UserOutlined style={iconStyle}/>}>
            <Span>檢視帳戶資訊</Span>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined style={iconStyle}/>}>
          <Span>訂單</Span>
        </Menu.Item>
        <Menu.Item key="3" icon={<HeartOutlined style={iconStyle}/>}>
          <Span>最愛餐廳</Span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default AppSideBar;