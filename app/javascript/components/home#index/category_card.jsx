import React from 'react'

import { Card } from 'antd';

const { Meta } = Card;

const AppCategoryCard = (props) => {
  return(
    <Card
      cover={
        <img
          alt="example"
          src={props.image}
          style={{
            width:'30%',
            margin:'auto'
          }}
        />
      }
      style={{ 
        backgroundColor:'transparent',
        width:'100%',
        textAlign:'center'
      }}
    >
      <Meta
        title={props.title}
      />
    </Card>
  );
}

export default AppCategoryCard;