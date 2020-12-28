import React from 'react'
import "./home.scss";

// components
import StoreCard from './store_card.jsx'

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

function StoreCardList(){
  return(
    <div className="store-card-list">
      {
        data.map((item) => {
          return(
            <StoreCard 
              {...item}
              key={item.id}
            />
          )
        })
      }
    </div>
  );
}

export default StoreCardList;