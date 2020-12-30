import React from 'react'
import "./home.scss";

function StoreCard({title, image, description}){
  return(
      <div className="card">
        <div className="heart">
          <i className="far fa-heart"></i>
        </div>
        <div className="image">
          <img src={image} alt=""/>
        </div>
        <div className="text">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
          <div className="star">
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>
  );
}

export default StoreCard;