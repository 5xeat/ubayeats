import React, {useEffect} from "react";
import Rails from '@rails/ujs'

import "./home.scss";

// components
import StoreCard from './store_card.jsx'
import { useState } from 'react/cjs/react.development';

// const data = [
//   {
//     id: 1,
//     title: "天仁茗茶",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 2,
//     title: "五十嵐",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 3,
//     title: "麻古茶坊",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 4,
//     title: "可不可熟成紅茶",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 5,
//     title: "麻古茶坊",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 6,
//     title: "可不可熟成紅茶",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
// ];

function StoreCardList(){

  const [data, setData] = useState([])

  useEffect(() => {
    Rails.ajax({
      url: "/stores.json",
      type: "GET",
      success: (resp) => {
        console.log(resp.stores)
        const newData = resp.stores
        setData(newData)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }, [])
  

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