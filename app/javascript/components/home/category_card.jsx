import React from 'react'
import "./home.scss";

function CategoryCard({title, image}){
  return(
      <div className="card">
        <div className="image">
          <img src={image} alt=""/>
        </div>
        <p>{title}</p>
      </div>
  );
}

export default CategoryCard;