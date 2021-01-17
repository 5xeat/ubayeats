import React from 'react'
import { Carousel } from 'antd';
import "./home.scss";

function HomeCarousel(){
  return(
    <Carousel autoplay={true}>
      <div className="carousel">
        <img src="https://i.imgur.com/IIlCdI5.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/YPJzLJB.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/exhGBGY.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/iD7kqjj.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/mn01ltg.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/aFvVBRS.png" style={{width: '100%'}} />
      </div>
    </Carousel>
  );
}

export default HomeCarousel;
