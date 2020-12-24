import React from 'react'
import useRWD from '../shared/useRWD.jsx';

import NavHeaderMobile from '../shared/nav_header_mobile'
import NavHeader from '../shared/nav_header'
import AppContent from './content.jsx'
import AppSideBar from '../shared/sidebar.jsx'

import { Layout } from 'antd';

const { Footer } = Layout;

const HomeIndex = () => {

  const device=useRWD();

  const [state, setState] = React.useState(true);

  const toggle = () => {
    setState(!state);
  };

  if(device==="mobile"){
    return (
      <Layout>
        <AppSideBar
          state={state}
        />
        <Layout className="site-layout">
          <NavHeaderMobile 
            state={state}
            toggle={toggle}/>
          <AppContent />
        </Layout>
      </Layout>
    );
  } else {
    return (
      <Layout>
          <NavHeader />
          <AppContent />
          <Footer style={{ textAlign: 'center' }}>Ubayeats ©2020</Footer>
      </Layout>
    );
  }
}

export default HomeIndex;