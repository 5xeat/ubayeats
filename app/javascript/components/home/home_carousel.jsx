import React from 'react'
import { Carousel } from 'antd';
import "./home.scss";

function HomeCarousel(){
  return(
    <Carousel autoplay={true}>
      <div className="carousel">
        <img src="https://i.imgur.com/dbaXURd.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/dbaXURd.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/dbaXURd.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/dbaXURd.png" style={{width: '100%'}} />
      </div>  
    </Carousel>
  );
}

export default HomeCarousel;
