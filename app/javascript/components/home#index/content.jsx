import React from 'react'

import AppSearch from './search.jsx'
import AppCarousel from './carousel.jsx'
import AppStoreCardList from './store_card_list.jsx'
import AppCategoryCardList from './category_card_list.jsx'

import { Layout } from 'antd';

const { Content } = Layout;

const AppContent = () => {
  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <AppSearch />
        <AppCarousel />
        <AppCategoryCardList />
        <AppStoreCardList />
      </div>
    </Content>
);
}

export default AppContent;