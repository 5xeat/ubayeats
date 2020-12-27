import React from 'react'
import useRWD from '../shared/useRWD.jsx';

import NavHeaderMobile from '../shared/nav_header_mobile'
import NavHeader from '../shared/nav_header'
import AppContent from './content.jsx'
import AppSideBar from '../shared/sidebar.jsx'

import { Layout } from 'antd';

const { Footer } = Layout;

const HomeIndex = (props) => {
  const { history } = props
  console.log('props :Home>> ', props);

  const device = useRWD();

  const [state, setState] = React.useState(true);

  const toggle = () => {
    setState(!state);
  };
  return (
    <Layout>
      <NavHeader history={history} />
      <AppContent />
      <Footer style={{ textAlign: 'center' }}>Ubayeats ©2020</Footer>
    </Layout>
  )

  // if(device==="mobile"){
  //   return (
  //     <Layout>
  //       <AppSideBar
  //         state={state}
  //       />
  //       <Layout className="site-layout">
  //         {/* <NavHeaderMobile 
  //           state={state}
  //           toggle={toggle}/> */}
  //         <AppContent />
  //       </Layout>
  //     </Layout>
  //   );
  // } else {
  //   return (
  //     <Layout>
  //         <NavHeader history={history} />
  //         <AppContent />
  //         <Footer style={{ textAlign: 'center' }}>Ubayeats ©2020</Footer>
  //     </Layout>
  //   );
  // }
}

export default HomeIndex;