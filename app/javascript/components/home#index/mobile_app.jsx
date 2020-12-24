import React from 'react'

import AppSideBar from './sidebar.jsx'
import AppContent from './content.jsx'

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const App = () => {
  const [state, setState] = React.useState(true);

  const toggle = () => {
    setState(!state);
  };

  return (
    <Layout>
      <AppSideBar
        state={state}
      />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" onClick={toggle}>
              {
                state ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
            </Menu.Item>
            <Menu.Item key="2">
              <img src={require("../../images/logo/logo-white.png")} alt="Logo" width={150} />
            </Menu.Item>
            <Menu.Item key="3">333</Menu.Item>
          </Menu>
        </Header>
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default App;