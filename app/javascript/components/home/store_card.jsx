import React from 'react'
import "./home.scss";

function StoreCard({name, image, description}){
  return(
      <div className="card">
        <div className="heart">
          <i className="far fa-heart"></i>
        </div>
        <div className="image">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt=""/>
        </div>
        <div className="text">
          <p className="title">{name}</p>
          <p className="description">{description}</p>
          <div className="star">
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>
  );
}

export default StoreCard;