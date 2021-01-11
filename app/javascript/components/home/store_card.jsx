import React from 'react'
import "./home.scss";

function StoreCard({store_name, store_photo, description, id, onClick}){
  return(
      <div className="card" onClick={()=>onClick(id)}>
        <div className="image">
          <img src={store_photo.url} alt=""/>
        </div>
        <div className="text">
          <p className="title">{store_name}</p>
          <p className="description">{description}</p>
          <div className="heart">
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
  );
}

export default StoreCard;