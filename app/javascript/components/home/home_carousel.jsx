import React from 'react'
import { Carousel } from 'antd';
import "./home.scss";

function HomeCarousel(){
  return(
    <Carousel autoplay={true}>
      <div className="carousel">
        <img src="https://i.imgur.com/YK3rLhP.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/X3pL5Xw.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/1rjxcBs.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/jjnQSCQ.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/Mz1EbnX.png" style={{width: '100%'}} />
      </div>
      <div className="carousel">
        <img src="https://i.imgur.com/2sIHNm6.png" style={{width: '100%'}} />
      </div>
    </Carousel>
  );
}

export default HomeCarousel;
