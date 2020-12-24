import React from 'react'

import AppStoreCard from './store_card.jsx'

import { List } from 'antd';

const data = [
  {
    title: "天仁茗茶",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "五十嵐",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "麻古茶坊",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "可不可熟成紅茶",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "麻古茶坊",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "可不可熟成紅茶",
    description: "珍奶好喝！",
    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
];


const AppStoreCardList = () => {
  return(
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <AppStoreCard 
            image={item.image}
            title={item.title}
            description={item.description}
            >
            Card content
          </AppStoreCard>
        </List.Item>
      )}
    />
  );
}

export default AppStoreCardList;