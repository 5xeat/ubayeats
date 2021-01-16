import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
  minHeight: '300px',
  color: '#fff',
  textAlign: 'center',
  backgroundImage: 'url("https://i.imgur.com/dbaXURd.png")',
  backgroundSize: 'cover'
};

function HomeCarousel(){
  return(
    <Carousel autoplay={true}>
      <div>
        <h3 style={contentStyle} />
      </div>
      <div>
        <h3 style={contentStyle} />
      </div>
      <div>
        <h3 style={contentStyle} />
      </div>
      <div>
        <h3 style={contentStyle} />
      </div>  
    </Carousel>
  );
}

export default HomeCarousel;
