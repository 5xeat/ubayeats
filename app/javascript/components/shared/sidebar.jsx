import React from 'react'

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSideBar = (props) => {

  return (
    <Sider trigger={null} 
    collapsible collapsed={props.state} collapsedWidth="0" 
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <span>檢視帳戶資訊</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />}>
        <span>訂單</span>
        </Menu.Item>
        <Menu.Item key="3" icon={<HeartOutlined />}>
        <span>最愛餐廳</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default AppSideBar;