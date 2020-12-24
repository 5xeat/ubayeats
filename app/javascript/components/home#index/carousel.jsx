import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

const AppCarousel =  () => {
  return(
    <Carousel autoplay style={{marginTop:'20px'}}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>  
    </Carousel>
  );
}

export default AppCarousel;
