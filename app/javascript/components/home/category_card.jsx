import React from 'react'
import "./home.scss";

function CategoryCard({title, image, onClick}){
  return(
      <div className="card" onClick={()=>onClick(title)}>
        <div className="image">
          <img src={image} alt=""/>
        </div>
        <p>{title}</p>
      </div>
  );
}

export default CategoryCard;